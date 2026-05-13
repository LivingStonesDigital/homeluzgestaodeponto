"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { X, User, Mail, Lock, Building2, Calendar } from "lucide-react";

interface RegisterEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterEmployeeModal({
  isOpen,
  onClose,
}: RegisterEmployeeModalProps) {
  const registerEmployee = useMutation(api.employees.registerEmployee);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    department: "",
    role: "employee" as "employee" | "admin",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerEmployee({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        birthDate: formData.birthDate || undefined,
        role: formData.role,
        department: formData.department || undefined,
      });

      toast.success("Funcionário cadastrado com sucesso!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        department: "",
        role: "employee",
      });
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao cadastrar funcionário."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-on-surface">
              Cadastrar Funcionário
            </h2>
            <button
              className="p-2 rounded-full hover:bg-surface-container transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5 text-on-surface-variant" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Nome do funcionário"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="email@empresa.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Mínimo 6 caracteres"
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Repita a senha"
                  required
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                Data de Nascimento
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                Departamento
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Ex: TI, RH, Marketing"
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                Cargo
              </label>
              <div className="flex gap-3">
                <button
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    formData.role === "employee"
                      ? "bg-primary text-white"
                      : "bg-surface-container-low text-on-surface-variant"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "employee" })}
                  type="button"
                >
                  Funcionário
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    formData.role === "admin"
                      ? "bg-primary text-white"
                      : "bg-surface-container-low text-on-surface-variant"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "admin" })}
                  type="button"
                >
                  Administrador
                </button>
              </div>
            </div>

            <button
              className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-150 disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
