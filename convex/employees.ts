import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId, createAccount } from "@convex-dev/auth/server";

async function requireAdmin(ctx: any) {
  const authId = await getAuthUserId(ctx);
  if (!authId) throw new Error("Não autenticado.");

  const user = await ctx.db.get(authId);
  if (!user) throw new Error("Usuário não encontrado.");
  if (user.role !== "admin") throw new Error("Acesso restrito a administradores.");
  return user;
}

async function requireUser(ctx: any) {
  const authId = await getAuthUserId(ctx);
  if (!authId) return null;

  const user = await ctx.db.get(authId);
  return user;
}

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      isActive: user.isActive,
    };
  },
});

export const registerEmployee = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    birthDate: v.optional(v.string()),
    role: v.union(v.literal("employee"), v.literal("admin")),
    department: v.optional(v.string()),
  },
  handler: async (ctx, { name, email, password, birthDate, role, department }) => {
    await requireAdmin(ctx);

    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) throw new Error("Email já cadastrado.");

    const { user } = await createAccount(ctx as any, {
      provider: "password",
      account: {
        id: email,
        secret: password,
      },
      profile: {
        email,
        name,
        role,
        isActive: true,
        ...(birthDate && { birthDate }),
        ...(department && { department }),
      },
    });

    return user._id;
  },
});

export const listEmployees = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "employee"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return users;
  },
});

export const listAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);
    if (!user || user.role !== "admin") {
      return [];
    }

    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "employee"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return users;
  },
});

export const getEmployeeById = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, { id }) => {
    const user = await ctx.db.get(id);
    if (!user || user.role !== "employee") throw new Error("Funcionário não encontrado.");
    return user;
  },
});