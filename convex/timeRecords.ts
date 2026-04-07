// convex/timeRecords.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayString(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

async function requireUser(ctx: any) {
  const authId = await getAuthUserId(ctx);
  if (!authId) throw new Error("Não autenticado.");

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q: any) => q.eq("tokenIdentifier", authId))
    .unique();

  if (!user || !user.isActive) throw new Error("Usuário não encontrado ou inativo.");
  return user;
}

async function requireAdmin(ctx: any) {
  const user = await requireUser(ctx);
  if (user.role !== "admin") throw new Error("Acesso restrito a administradores.");
  return user;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MUTATIONS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── clockIn ──────────────────────────────────────────────────────────────────
export const clockIn = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);
    const today = todayString();

    // Impede dupla entrada no mesmo dia
    const existing = await ctx.db
      .query("timeRecords")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", today)
      )
      .filter((q) => q.eq(q.field("type"), "entry"))
      .first();

    if (existing) throw new Error("Entrada já registrada hoje.");

    return await ctx.db.insert("timeRecords", {
      userId: user._id,
      type: "entry",
      timestamp: Date.now(),
      date: today,
      status: "pending",
    });
  },
});

// ─── clockOut ─────────────────────────────────────────────────────────────────
export const clockOut = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);
    const today = todayString();

    // Exige que exista uma entrada antes de registrar saída
    const entry = await ctx.db
      .query("timeRecords")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", today)
      )
      .filter((q) => q.eq(q.field("type"), "entry"))
      .first();

    if (!entry) throw new Error("Nenhuma entrada registrada hoje.");

    // Impede dupla saída no mesmo dia
    const existingExit = await ctx.db
      .query("timeRecords")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", today)
      )
      .filter((q) => q.eq(q.field("type"), "exit"))
      .first();

    if (existingExit) throw new Error("Saída já registrada hoje.");

    return await ctx.db.insert("timeRecords", {
      userId: user._id,
      type: "exit",
      timestamp: Date.now(),
      date: today,
      status: "pending",
    });
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
      date: new Date(newTimestamp).toISOString().slice(0, 10),
      status: "approved",
      reviewedBy: admin._id,
      reviewedAt: Date.now(),
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

    // Se aprovado e funcionário sugeriu um horário, aplica a edição no registro
    if (approve && correction.suggestedTimestamp) {
      const record = await ctx.db.get(correction.recordId);
      if (record) {
        await ctx.db.patch(correction.recordId, {
          originalTimestamp: record.originalTimestamp ?? record.timestamp,
          timestamp: correction.suggestedTimestamp,
          date: new Date(correction.suggestedTimestamp).toISOString().slice(0, 10),
          status: "approved",
          reviewedBy: admin._id,
          reviewedAt: Date.now(),
        });
      }
    }
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── todayStatus — funcionário ────────────────────────────────────────────────
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

    const entry = records.find((r) => r.type === "entry") ?? null;
    const exit = records.find((r) => r.type === "exit") ?? null;

    return { entry, exit, canClockIn: !entry, canClockOut: !!entry && !exit };
  },
});

// ─── myRecords — funcionário ──────────────────────────────────────────────────
export const myRecords = query({
  args: {
    month: v.string(), // "YYYY-MM"
  },
  handler: async (ctx, { month }) => {
    const user = await requireUser(ctx);

    const records = await ctx.db
      .query("timeRecords")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.gte(q.field("date"), `${month}-01`))
      .filter((q) => q.lte(q.field("date"), `${month}-31`))
      .order("desc")
      .collect();

    return records;
  },
});

// ─── myCorrections — funcionário ──────────────────────────────────────────────
export const myCorrections = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);

    return await ctx.db
      .query("correctionRequests")
      .withIndex("by_user", (q) => q.eq("requestedBy", user._id))
      .order("desc")
      .collect();
  },
});

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

    // Enriquece cada registro com os dados do funcionário
    return await Promise.all(
      records.map(async (r) => ({
        ...r,
        user: await ctx.db.get(r.userId),
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
    month: v.string(), // "YYYY-MM"
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

    // Enriquece com dados do registro e do funcionário
    return await Promise.all(
      corrections.map(async (c) => {
        const record = await ctx.db.get(c.recordId);
        const user = record ? await ctx.db.get(record.userId) : null;
        return { ...c, record, user };
      })
    );
  },
});