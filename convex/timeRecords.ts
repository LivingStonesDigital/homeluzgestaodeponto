// convex/timeRecords.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

type TimeRecordType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dateStringFromTimestamp(timestamp = Date.now()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestamp));

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function todayString(): string {
  return dateStringFromTimestamp();
}

function getTypeLabel(type: TimeRecordType): string {
  const labels: Record<TimeRecordType, string> = {
    work_start: "Entrada",
    lunch_start: "Início do intervalo",
    lunch_end: "Retorno do intervalo",
    work_end: "Saída",
  };
  return labels[type];
}

async function requireUser(ctx: any) {
  const authId = await getAuthUserId(ctx);
  if (!authId) throw new Error("Não autenticado.");

  const user = await ctx.db.get(authId);
  if (!user || !user.isActive) throw new Error("Usuário não encontrado ou inativo.");
  return user;
}

async function requireAdmin(ctx: any) {
  const user = await requireUser(ctx);
  if (user.role !== "admin") throw new Error("Acesso restrito a administradores.");
  return user;
}

async function getRevisionPermission(ctx: any, userId: any, date: string) {
  return await ctx.db
    .query("revisionPermissions")
    .withIndex("by_user_and_date", (q: any) =>
      q.eq("userId", userId).eq("date", date)
    )
    .first();
}

function getNextType(currentTypes: TimeRecordType[]): TimeRecordType {
  if (!currentTypes.includes("work_start")) return "work_start";
  if (!currentTypes.includes("lunch_start")) return "lunch_start";
  if (!currentTypes.includes("lunch_end")) return "lunch_end";
  if (!currentTypes.includes("work_end")) return "work_end";
  return "work_end";
}

function getStatusFromType(type: TimeRecordType): "online" | "pausa" | "ausente" {
  switch (type) {
    case "work_start":
      return "online";
    case "lunch_start":
      return "pausa";
    case "lunch_end":
      return "online";
    case "work_end":
      return "ausente";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MUTATIONS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── updateUserStatus ─────────────────────────────────────────────────────────────
export const updateUserStatus = mutation({
  args: {
    userId: v.id("users"),
    status: v.union(v.literal("online"), v.literal("pausa"), v.literal("ausente")),
  },
  handler: async (ctx, { userId, status }) => {
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("Usuário não encontrado.");

    await ctx.db.patch(userId, { status });
  },
});

// ─── registerTime ─────────────────────────────────────────────────────────────
export const registerTime = mutation({
  args: {
    type: v.union(
      v.literal("work_start"),
      v.literal("lunch_start"),
      v.literal("lunch_end"),
      v.literal("work_end")
    ),
    timestamp: v.optional(v.number()),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { type, timestamp, userId }) => {
    const currentUser = await requireUser(ctx);
    const time = timestamp || Date.now();
    const today = dateStringFromTimestamp(time);

    // If userId is provided, admin is registering for another user
    let targetUser = currentUser;
    if (userId) {
      const admin = await requireAdmin(ctx);
      targetUser = await ctx.db.get(userId);
      if (!targetUser) throw new Error("Funcionário não encontrado.");
    }

    // Get all records for today
    const todayRecords = await ctx.db
      .query("timeRecords")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", targetUser._id).eq("date", today)
      )
      .collect();

    const currentTypes = todayRecords.map((r) => r.type as TimeRecordType);

    // Validate the sequence
    const expectedType = getNextType(currentTypes);
    if (type !== expectedType) {
      throw new Error(`Você deve registrar: ${getTypeLabel(expectedType)}`);
    }

    // Check if this specific type already exists
    if (currentTypes.includes(type)) {
      throw new Error(`${getTypeLabel(type)} já registrado hoje.`);
    }

    return await ctx.db.insert("timeRecords", {
      userId: targetUser._id,
      type,
      timestamp: time,
      date: today,
      status: "pending",
    }).then(async (recordId) => {
      // Atualiza o status do usuário baseado no tipo de registro
      const newStatus = getStatusFromType(type);
      await ctx.db.patch(targetUser._id, { status: newStatus });
      return recordId;
    });
  },
});

// ─── editTimeRecord ────────────────────────────────────────────────────────────
export const editTimeRecord = mutation({
  args: {
    recordId: v.id("timeRecords"),
    newTimestamp: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { recordId, newTimestamp, note }) => {
    const user = await requireUser(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");
    if (record.userId !== user._id) throw new Error("Este registro não é seu.");
    if (record.status === "approved") throw new Error("Registro já aprovado não pode ser alterado.");

    await ctx.db.patch(recordId, {
      originalTimestamp: record.originalTimestamp ?? record.timestamp,
      timestamp: newTimestamp,
      date: dateStringFromTimestamp(newTimestamp),
      status: "pending",
      ...(note && { note }),
    });
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── todayStatus ───────────────────────────────────────────────────────────────
export const todayStatus = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);
    const today = todayString();

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", today)
      )
      .collect();

    const currentTypes = records.map((r) => r.type as TimeRecordType);
    const nextType = getNextType(currentTypes);

    return {
      records,
      nextType,
      nextTypeLabel: getTypeLabel(nextType),
      isComplete: currentTypes.length === 4,
    };
  },
});

// ─── myTimeRecords ─────────────────────────────────────────────────────────────
export const myTimeRecords = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit = 10 }) => {
    const user = await requireUser(ctx);

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(limit);

    // Group by date
    const grouped: Record<string, typeof records> = {};
    for (const record of records) {
      if (!grouped[record.date]) {
        grouped[record.date] = [];
      }
      grouped[record.date].push(record);
    }

    return Object.entries(grouped).map(([date, recs]) => ({
      date,
      records: recs.sort((a, b) => a.timestamp - b.timestamp),
    }));
  },
});

// ─── myTimeRecordDayDetails ──────────────────────────────────────────────────
export const myTimeRecordDayDetails = query({
  args: {
    recordId: v.id("timeRecords"),
  },
  handler: async (ctx, { recordId }) => {
    const user = await requireUser(ctx);

    const selectedRecord = await ctx.db.get(recordId);
    if (!selectedRecord || selectedRecord.userId !== user._id) return null;

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", selectedRecord.date)
      )
      .collect();

    return {
      date: selectedRecord.date,
      selectedRecord,
      records: records.sort((a, b) => a.timestamp - b.timestamp),
    };
  },
});

// ─── myTimeRecordsByDate ─────────────────────────────────────────────────────
export const myTimeRecordsByDate = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, { date }) => {
    const user = await requireUser(ctx);

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", date)
      )
      .collect();

    const recordsWithOpenCorrections = await Promise.all(
      records.map(async (record) => {
        const openCorrection = await ctx.db
          .query("correctionRequests")
          .withIndex("by_record", (q) => q.eq("recordId", record._id))
          .filter((q) => q.eq(q.field("status"), "open"))
          .first();

        return {
          ...record,
          openCorrection,
        };
      })
    );

    return recordsWithOpenCorrections.sort((a, b) => a.timestamp - b.timestamp);
  },
});

// ─── myRevisionPermissionByDate ──────────────────────────────────────────────
export const myRevisionPermissionByDate = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, { date }) => {
    const user = await requireUser(ctx);
    const permission = await getRevisionPermission(ctx, user._id, date);

    return {
      enabled: permission?.enabled ?? false,
      permission,
    };
  },
});

// ─── myTimeRecordsWithRevision ────────────────────────────────────────────────
export const myTimeRecordsWithRevision = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit = 20 }) => {
    const user = await requireUser(ctx);

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("status"), "revision_requested"))
      .order("desc")
      .take(limit);

    // Group by date
    const grouped: Record<string, typeof records> = {};
    for (const record of records) {
      if (!grouped[record.date]) {
        grouped[record.date] = [];
      }
      grouped[record.date].push(record);
    }

    return Object.entries(grouped).map(([date, recs]) => ({
      date,
      records: recs.sort((a, b) => a.timestamp - b.timestamp),
    }));
  },
});

// ─── approveRecord ────────────────────────────────────────────────────────────
export const approveRecord = mutation({
  args: {
    recordId: v.id("timeRecords"),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { recordId, note }) => {
    const admin = await requireAdmin(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");
    if (record.status !== "pending") throw new Error("Registro não está pendente.");

    await ctx.db.patch(recordId, {
      status: "approved",
      reviewedBy: admin._id,
      reviewedAt: Date.now(),
      ...(note && { note }),
    });
  },
});

// ─── rejectRecord ─────────────────────────────────────────────────────────────
export const rejectRecord = mutation({
  args: {
    recordId: v.id("timeRecords"),
    note: v.string(),
  },
  handler: async (ctx, { recordId, note }) => {
    const admin = await requireAdmin(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");
    if (record.status !== "pending") throw new Error("Registro não está pendente.");

    await ctx.db.patch(recordId, {
      status: "rejected",
      reviewedBy: admin._id,
      reviewedAt: Date.now(),
      note,
    });
  },
});

// ─── requestRevision ─────────────────────────────────────────────────────────
export const requestRevision = mutation({
  args: {
    recordId: v.id("timeRecords"),
    note: v.string(),
  },
  handler: async (ctx, { recordId, note }) => {
    const admin = await requireAdmin(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");
    if (record.status !== "pending") throw new Error("Registro não está pendente.");

    await ctx.db.patch(recordId, {
      status: "revision_requested",
      reviewedBy: admin._id,
      reviewedAt: Date.now(),
      note,
    });
  },
});

// ─── updateRecordByEmployee ───────────────────────────────────────────────────
export const updateRecordByEmployee = mutation({
  args: {
    recordId: v.id("timeRecords"),
    newTimestamp: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { recordId, newTimestamp, note }) => {
    const user = await requireUser(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");
    if (record.userId !== user._id) throw new Error("Este registro não é seu.");
    if (record.status !== "revision_requested") throw new Error("Este registro não está em revisão.");

    await ctx.db.patch(recordId, {
      originalTimestamp: record.originalTimestamp ?? record.timestamp,
      timestamp: newTimestamp,
      date: dateStringFromTimestamp(newTimestamp),
      status: "pending",
      ...(note && { note }),
    });
  },
});

// ─── editRecord ───────────────────────────────────────────────────────────────
export const editRecord = mutation({
  args: {
    recordId: v.id("timeRecords"),
    newTimestamp: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { recordId, newTimestamp, note }) => {
    const admin = await requireAdmin(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");

    await ctx.db.patch(recordId, {
      originalTimestamp: record.originalTimestamp ?? record.timestamp,
      timestamp: newTimestamp,
      date: dateStringFromTimestamp(newTimestamp),
      status: "approved",
      reviewedBy: admin._id,
      reviewedAt: Date.now(),
      ...(note && { note }),
    });
  },
});

// ─── editPendingRecord ───────────────────────────────────────────────────────────
export const editPendingRecord = mutation({
  args: {
    recordId: v.id("timeRecords"),
    newTimestamp: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { recordId, newTimestamp, note }) => {
    const user = await requireUser(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");
    if (record.userId !== user._id) throw new Error("Este registro não é seu.");
    if (record.status !== "pending") throw new Error("Este registro não está pendente.");

    await ctx.db.patch(recordId, {
      originalTimestamp: record.originalTimestamp ?? record.timestamp,
      timestamp: newTimestamp,
      date: dateStringFromTimestamp(newTimestamp),
      status: "pending",
      ...(note && { note }),
    });
  },
});

// ─── requestCorrection ────────────────────────────────────────────────────────
export const requestCorrection = mutation({
  args: {
    recordId: v.id("timeRecords"),
    reason: v.string(),
    suggestedTimestamp: v.optional(v.number()),
  },
  handler: async (ctx, { recordId, reason, suggestedTimestamp }) => {
    const user = await requireUser(ctx);

    const record = await ctx.db.get(recordId);
    if (!record) throw new Error("Registro não encontrado.");
    if (record.userId !== user._id) throw new Error("Este registro não é seu.");
    if (record.status !== "approved") {
      throw new Error("Só é possível solicitar revisão de registros já aprovados.");
    }

    const permission = await getRevisionPermission(ctx, user._id, record.date);
    if (!permission?.enabled) {
      throw new Error("A solicitação de revisão desse dia ainda não foi liberada pelo administrador.");
    }

    // Impede duplicata de pedido em aberto para o mesmo registro
    const existing = await ctx.db
      .query("correctionRequests")
      .withIndex("by_record", (q) => q.eq("recordId", recordId))
      .filter((q) => q.eq(q.field("status"), "open"))
      .first();

    if (existing) throw new Error("Já existe uma solicitação em aberto para este registro.");

    return await ctx.db.insert("correctionRequests", {
      recordId,
      requestedBy: user._id,
      reason,
      status: "open",
      ...(suggestedTimestamp && { suggestedTimestamp }),
    });
  },
});

// ─── resolveCorrection ────────────────────────────────────────────────────────
export const resolveCorrection = mutation({
  args: {
    correctionId: v.id("correctionRequests"),
    approve: v.boolean(),
    adminNote: v.optional(v.string()),
  },
  handler: async (ctx, { correctionId, approve, adminNote }) => {
    const admin = await requireAdmin(ctx);

    const correction = await ctx.db.get(correctionId);
    if (!correction) throw new Error("Solicitação não encontrada.");
    if (correction.status !== "open") throw new Error("Solicitação já resolvida.");

    await ctx.db.patch(correctionId, {
      status: approve ? "approved" : "rejected",
      resolvedBy: admin._id,
      resolvedAt: Date.now(),
      ...(adminNote && { adminNote }),
    });

    if (approve && correction.suggestedTimestamp) {
      const record = await ctx.db.get(correction.recordId);
      if (record) {
        await ctx.db.patch(correction.recordId, {
          originalTimestamp: record.originalTimestamp ?? record.timestamp,
          timestamp: correction.suggestedTimestamp,
          date: dateStringFromTimestamp(correction.suggestedTimestamp),
          status: "approved",
          reviewedBy: admin._id,
          reviewedAt: Date.now(),
        });
      }
    }
  },
});

// ─── setRevisionPermission — admin ───────────────────────────────────────────
export const setRevisionPermission = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    enabled: v.boolean(),
  },
  handler: async (ctx, { userId, date, enabled }) => {
    const admin = await requireAdmin(ctx);
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("Funcionário não encontrado.");

    const existing = await getRevisionPermission(ctx, userId, date);
    if (existing) {
      await ctx.db.patch(existing._id, {
        enabled,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("revisionPermissions", {
      userId,
      date,
      enabled,
      createdBy: admin._id,
      createdAt: Date.now(),
    });
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── pendingRecords — admin ───────────────────────────────────────────────────
export const pendingRecords = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("asc")
      .collect();

    return await Promise.all(
      records.map(async (r) => ({
        ...r,
        user: await ctx.db.get(r.userId),
        revisionPermission: await getRevisionPermission(ctx, r.userId, r.date),
      }))
    );
  },
});

// ─── allEmployees — admin ─────────────────────────────────────────────────────
export const allEmployees = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "employee"))
      .collect();
  },
});

// ─── employeeHistory — admin ──────────────────────────────────────────────────
export const employeeHistory = query({
  args: {
    userId: v.id("users"),
    month: v.string(),
  },
  handler: async (ctx, { userId, month }) => {
    await requireAdmin(ctx);

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("Funcionário não encontrado.");

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.gte(q.field("date"), `${month}-01`))
      .filter((q) => q.lte(q.field("date"), `${month}-31`))
      .order("desc")
      .collect();

    return { user, records };
  },
});

// ─── openCorrections — admin ──────────────────────────────────────────────────
export const openCorrections = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const corrections = await ctx.db
      .query("correctionRequests")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .order("asc")
      .collect();

    return await Promise.all(
      corrections.map(async (c) => {
        const record = await ctx.db.get(c.recordId);
        const user = record ? await ctx.db.get(record.userId) : null;
        return {
          ...c,
          record: record ? {
            _id: record._id,
            type: record.type,
            timestamp: record.timestamp,
            date: record.date,
            status: record.status,
          } : null,
          user: user ? {
            _id: user._id,
            name: user.name,
            avatarUrl: user.avatarUrl,
            department: user.department,
          } : null,
        };
      })
    );
  },
});

// ─── allRecordsByDate — admin ──────────────────────────────────────────────────
export const allRecordsByDate = query({
  args: {
    date: v.optional(v.string()),
    department: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, { date, department, search }) => {
    await requireAdmin(ctx);

    // Busca todos os usuários ativos
    let users = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "employee"))
      .collect();

    // Filtra por departamento se fornecido
    if (department) {
      users = users.filter((u) => u.department === department);
    }

    // Filtra por busca se fornecido
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter((u) =>
        u.name.toLowerCase().includes(searchLower) ||
        (u.department && u.department.toLowerCase().includes(searchLower))
      );
    }

    // Se não houver data, usa hoje
    const targetDate = date || todayString();

    // Busca registros para a data alvo
    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_date", (q) => q.eq("date", targetDate))
      .collect();

    // Agrupa por usuário
    const result = users.map((user) => {
      const userRecords = records.filter((r) => r.userId === user._id);
      const workStart = userRecords.find((r) => r.type === "work_start");
      const workEnd = userRecords.find((r) => r.type === "work_end");
      const lunchStart = userRecords.find((r) => r.type === "lunch_start");
      const lunchEnd = userRecords.find((r) => r.type === "lunch_end");

      // Determina status
      let status = "absent";
      if (workStart && workEnd) {
        status = "finished";
      } else if (workStart && lunchStart && !lunchEnd) {
        status = "on_break";
      } else if (workStart) {
        status = "present";
      }

      return {
        user: {
          _id: user._id,
          name: user.name,
          avatarUrl: user.avatarUrl,
          department: user.department,
          role: user.role,
        },
        workStart,
        workEnd,
        lunchStart,
        lunchEnd,
        status,
      };
    });

    return result;
  },
});

// ─── allDepartments — admin ───────────────────────────────────────────────────
export const allDepartments = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const users = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "employee"))
      .collect();

    const departments = new Set<string>();
    users.forEach((u) => {
      if (u.department) departments.add(u.department);
    });

    return Array.from(departments).sort();
  },
});
