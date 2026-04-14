// convex/schema.ts
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  // ─── Usuários ────────────────────────────────────────────────────────────
  users: defineTable({
    name: v.string(),
    email: v.string(),
    birthDate: v.optional(v.string()),
    role: v.union(v.literal("employee"), v.literal("admin")),
    department: v.optional(v.string()),
    isActive: v.boolean(),
    // ID externo do Convex Auth (ligação com a tabela de autenticação)
    tokenIdentifier: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_token", ["tokenIdentifier"])
    .index("by_role", ["role"]),

  // ─── Registros de ponto ───────────────────────────────────────────────────
  timeRecords: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("work_start"),    // Início do trabalho
      v.literal("lunch_start"),   // Início do intervalo (almoço)
      v.literal("lunch_end"),     // Fim do intervalo (almoço)
      v.literal("work_end")       // Fim do trabalho
    ),
    // Timestamp em milissegundos (Date.now())
    timestamp: v.number(),
    // Data no formato "YYYY-MM-DD" — facilita filtros por dia/mês
    date: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("revision_requested")
    ),
    // Preenchido quando um admin edita ou aprova/rejeita o registro
    reviewedBy: v.optional(v.id("users")),
    reviewedAt: v.optional(v.number()),
    note: v.optional(v.string()),
    // Horário original antes de edição (auditoria)
    originalTimestamp: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "date"])
    .index("by_status", ["status"])
    .index("by_date", ["date"]),

  // ─── Solicitações de correção ─────────────────────────────────────────────
  correctionRequests: defineTable({
    recordId: v.id("timeRecords"),
    requestedBy: v.id("users"),
    reason: v.string(),
    // Horário que o funcionário sugere como correto
    suggestedTimestamp: v.optional(v.number()),
    status: v.union(
      v.literal("open"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    // Preenchido pelo admin ao resolver
    resolvedBy: v.optional(v.id("users")),
    resolvedAt: v.optional(v.number()),
    adminNote: v.optional(v.string()),
  })
    .index("by_record", ["recordId"])
    .index("by_user", ["requestedBy"])
    .index("by_status", ["status"]),
});