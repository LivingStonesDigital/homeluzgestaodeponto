"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DirectionalTransition } from "@/components/directional-transition";
import { IconifyIcon } from "@/components/ui/iconify-icon";

type TimeType = "work_start" | "lunch_start" | "lunch_end" "work_end";

const typeConfig: Record<
  TimeType,
  { label: string; icon: string; color: string; gradient: string; description: string }
> = {
  work_start: {
    label: "Entrada",
    icon: "solar:arrow-up-linear",
    color: "from-[#2d322f] to-[#4ba3e3]",
    gradient: "bg-gradient-to-br from-[#2d322f] to-[#4ba3e3]",
    description: "Início do expediente",
  },
  lunch_start: {
    label: "Início do intervalo",
    icon: "solar:coffee-linear",
    color: "from-[#4ba3e3] to-[#2d322f]",
    gradient: "bg-gradient-to-br from-[#4ba3e3] to-[#2d322f]",
    description: "Hora do almoço",
  },
  lunch_end: {
    label: "Retorno do intervalo",
    icon: "solar:arrow-up-linear",
    color: "from-[#2d322f] to-[#4ba3e3]",
    gradient: "bg-gradient-to-br from-[#2d322f] to-[#4ba3e3]",
    description: "Volta ao trabalho",
  },
  work_end: {
    label: "Saída",
    icon: "solar:home-2-linear",
    color: "from-[#4ba3e3] to-[#2d322f]",
    gradient: "bg-gradient-to-br from-[#4ba3e3] to-[#2d322f]",
    description: "Fim do expediente",
  },
};

const statusConfig: Record<
  string,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    icon: string;
  }
> = {
  pending: {
    label: "Pendente",
    color: "text-[#fbbf24]",
    bg: "bg-[#fbbf24]/10",
    border: "border-[#fbbf24]/30",
    icon: "solar:clock-circle-linear",
  },
  approved: {
    label: "Aprovado",
    color: "text-[#4ba3e3]",
    bg: "bg-[#4ba3e3]/10",
    border: "border-[#4ba3e3]/30",
    icon: "solar:check-circle-linear",
  },
  rejected: {
    label: "Rejeitado",
    color: "text-[#ef4444]",
    bg: "bg-[#ef4444]/10",
    border: "border-[#ef4444]/30",
    icon: "solar:close-circle-linear",
  },
  revision_requested: {
    label: "Revisão solicitada",
    color: "text-[#f97316]",
    bg: "bg-[#f97316]/10",
    border: "border-[#f97316]/30",
    icon: "solar:refresh-circle-linear",
  },
};

export default function PontoPage() {
  const currentUser = useQuery(api.employees.currentUser);
  const allUsers = useQuery(api.employees.listAllUsers);
  const todayStatus = useQuery(api.timeRecords.todayStatus);
  const myTimeRecords = useQuery(api.timeRecords.myTimeRecords, { limit: 10 });
  const registerTime = useMutation(api.timeRecords.registerTime);

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  const handleRegister = async (type: TimeType) => {
    setIsRegistering(true);
    try {
      const userId =
        isAdmin && selectedUserId && selectedUserId !== "self"
          ? selectedUserId
          : undefined;
      await registerTime({
        type,
        userId: userId as any,
      });
      toast.success("Ponto registrado com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao registrar ponto",
      );
    } finally {
      setIsRegistering(false);
    }
  };

  const {
    nextType,
    nextTypeLabel,
    records: todayRecords,
    isComplete,
  } = todayStatus || {
    nextType: "work_start" as TimeType,
    nextTypeLabel: "Entrada",
    records: [],
    isComplete: false,
  };

  const nextConfig = typeConfig[nextType];

  // Calculate progress
  const totalSteps = 4;
  const completedSteps = todayRecords?.length || 0;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <DirectionalTransition>
      <div className="min-h-screen bg-[#ebedea]">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[#1e2420] rounded-b-[3rem] pb-20 pt-12 px-6">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoNzUsMTYzLDIyNywwLjEpIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ba3e3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4ba3e3]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4ba3e3]/20 to-[#4ba3e3]/5 backdrop-blur-md flex items-center justify-center border border-[#4ba3e3]/30">
                    <IconifyIcon icon="solar:clock-circle-linear" className="text-3xl text-[#4ba3e3]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4ba3e3] animate-pulse" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl tracking-tight uppercase text-white font-playfair font-normal leading-[0.9]">
                    Bater Ponto
                  </h1>
                  <p className="text-white/50 text-sm uppercase tracking-widest mt-2">
                    {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={cn(
                "inline-flex items-center gap-3 px-5 py-3 rounded-full border backdrop-blur-md text-sm tracking-widest uppercase transition-all duration-500",
                isComplete
                  ? "bg-[#4ba3e3]/20 border-[#4ba3e3]/30 text-[#4ba3e3]"
                  : "bg-white/10 border-white/20 text-white/70"
              )}>
                <span className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  isComplete ? "bg-[#4ba3e3]" : "bg-white/50"
                )} />
                {isComplete ? "Dia Completo" : "Em Andamento"}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 text-xs uppercase tracking-widest">
                  Progresso do dia
                </span>
                <span className="text-[#4ba3e3] text-xs uppercase tracking-widest font-medium">
                  {completedSteps}/{totalSteps} registros
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700 ease-out",
                    isComplete ? "bg-[#4ba3e3]" : "bg-gradient-to-r from-[#4ba3e3] to-[#2d322f]"
                  )}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 -mt-12">
          {/* Admin: Select Employee */}
          {isAdmin && (
            <div className="mb-8 bg-white rounded-2xl p-6 border border-[#2d322f]/10 shadow-[0_8px_30px_rgba(45,50,47,0.04)] hover:shadow-[0_12px_40px_rgba(45,50,47,0.08)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#2d322f]/10 flex items-center justify-center">
                  <IconifyIcon icon="solar:user-circle-linear" className="text-xl text-[#2d322f]" />
                </div>
                <div>
                  <h3 className="text-lg uppercase tracking-tight text-[#2d322f] font-playfair font-normal">
                    Registrar para outro funcionário
                  </h3>
                  <p className="text-[#2d322f]/50 text-xs uppercase tracking-widest">
                    Selecione o funcionário desejado
                  </p>
                </div>
              </div>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full bg-[#ebedea] border border-[#2d322f]/20 text-[#2d322f] rounded-full px-6 py-4 text-sm focus:outline-none focus:border-[#4ba3e3] focus:ring-2 focus:ring-[#4ba3e3]/20 transition-all"
              >
                <option value="">Selecione um funcionário</option>
                <option value="self">Próprio funcionário (eu)</option>
                {allUsers?.map((user: any) => (
                  <option key={user._id} value={user._id}>
                    {user.name} - {user.department || "Sem departamento"}
                  </option>
                ))}
              </select>
              {selectedUserId && selectedUserId !== "self" && (
                <div className="mt-3 flex items-center gap-2 text-sm text-[#2d322f]/60">
                  <IconifyIcon icon="solar:info-circle-linear" className="text-base" />
                  <span>
                    Registrando ponto para:{" "}
                    <strong className="text-[#2d322f]">
                      {allUsers?.find((u: any) => u._id === selectedUserId)?.name}
                    </strong>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Today's Records Grid */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {["work_start", "lunch_start", "lunch_end", "work_end"].map((type, index) => {
                const record = todayRecords?.find((r: any) => r.type === type);
                const config = typeConfig[type as TimeType];
                const isNext = type === nextType;
                const isCompleted = !!record;
                const isPrevious = !isNext && !isCompleted;

                return (
                  <div
                    key={type}
                    className={cn(
                      "relative overflow-hidden rounded-2xl p-6 border transition-all duration-500 group",
                      isCompleted
                        ? "bg-white border-[#2d322f]/10 hover:border-[#4ba3e3]/20 hover:shadow-[0_8px_32px_rgba(75,163,227,0.1)]"
                        : isNext
                        ? "bg-[#1e2420] border-[#4ba3e3]/30 shadow-[0_12px_40px_rgba(75,163,227,0.2)] hover:shadow-[0_16px_48px_rgba(75,163,227,0.3)]"
                        : "bg-white/50 border-[#2d322f]/5"
                    )}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMyZDMyMmYiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                    </div>

                    {/* Step Number */}
                    <div className={cn(
                      "absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      isCompleted
                        ? "bg-[#4ba3e3] text-white"
                        : isNext
                        ? "bg-[#4ba3e3]/20 text-[#4ba3e3] border border-[#4ba3e3]/50"
                        : "bg-[#2d322f]/10 text-[#2d322f]/40"
                    )}>
                      {index + 1}
                    </div>

                    <div className="relative">
                      {/* Icon */}
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
                        isCompleted
                          ? config.gradient
                          : isNext
                          ? "bg-[#4ba3e3]/20 border border-[#4ba3e3]/50"
                          : "bg-[#2d322f]/10"
                      )}>
                        <IconifyIcon
                          icon={config.icon}
                          className={cn(
                            "text-3xl transition-colors",
                            isCompleted || isNext ? "text-white" : "text-[#2d322f]/40"
                          )}
                        />
                      </div>

                      {/* Label */}
                      <h3 className={cn(
                        "text-sm uppercase tracking-widest font-medium mb-1",
                        isCompleted || isNext ? "text-white" : "text-[#2d322f]/50"
                      )}>
                        {config.label}
                      </h3>

                      {/* Description */}
                      <p className={cn(
                        "text-xs mb-4",
                        isCompleted || isNext ? "text-white/60" : "text-[#2d322f]/40"
                      )}>
                        {config.description}
                      </p>

                      {/* Time or Status */}
                      {isCompleted ? (
                        <div className="space-y-3">
                          <p className="text-3xl font-playfair font-normal text-white">
                            {format(new Date(record.timestamp), "HH:mm")}
                          </p>
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider border",
                            statusConfig[record.status].bg,
                            statusConfig[record.status].color,
                            statusConfig[record.status].border
                          )}>
                            <IconifyIcon icon={statusConfig[record.status].icon} className="text-sm" />
                            {statusConfig[record.status].label}
                          </span>
                        </div>
                      ) : isNext ? (
                        <div className="space-y-2">
                          <p className="text-[#4ba3e3] text-xs uppercase tracking-widest font-medium">
                            Próximo registro
                          </p>
                          <div className="flex items-center gap-2 text-white/50 text-xs">
                            <IconifyIcon icon="solar:clock-circle-linear" className="text-sm" />
                            <span>Aguardando</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#2d322f]/30 text-xs">
                          <IconifyIcon icon="solar:lock-linear" className="text-sm" />
                          <span>Bloqueado</span>
                        </div>
                      )}
                    </div>

                    {/* Glow effect for next */}
                    {isNext && (
                      <>
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#4ba3e3]/20 to-transparent rounded-2xl blur-xl -z-10" />
                        <div className="absolute -inset-1 bg-gradient-to-l from-[#4ba3e3]/20 to-transparent rounded-2xl blur-xl -z-10" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Register Button - Only show if not complete */}
          {!isComplete && (
            <div className="mb-8">
              <button
                onClick={() => handleRegister(nextType)}
                disabled={isRegistering}
                className={cn(
                  "w-full group relative overflow-hidden rounded-full px-8 py-6 text-sm font-normal uppercase tracking-widest transition-all duration-500",
                  "bg-[#2d322f] text-white hover:bg-[#4ba3e3]",
                  "shadow-[0_12px_40px_rgba(45,50,47,0.3)] hover:shadow-[0_16px_48px_rgba(75,163,227,0.4)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-3">
                  {isRegistering ? (
                    <>
                      <IconifyIcon icon="solar:refresh-circle-linear" className="text-2xl animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <IconifyIcon icon="solar:check-circle-linear" className="text-2xl" />
                      Registrar {nextTypeLabel}
                    </>
                  )}
                </div>
              </button>
            </div>
          )}

          {/* Action Buttons - Only show when day is complete */}
          {isComplete && (
            <div className="mb-8 space-y-4">
              <div className="bg-[#4ba3e3]/10 border border-[#4ba3e3]/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <IconifyIcon icon="solar:check-circle-linear" className="text-2xl text-[#4ba3e3]" />
                  <h3 className="text-lg uppercase tracking-tight text-[#4ba3e3] font-playfair font-normal">
                    Ciclo do dia concluído
                  </h3>
                </div>
                <p className="text-[#2d322f]/60 text-sm">
                  Todos os registros do dia foram completados. Você pode solicitar revisão ou confirmar os registros.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className="group relative overflow-hidden rounded-2xl px-6 py-5 text-sm font-normal uppercase tracking-widest transition-all duration-500 bg-white border border-[#2d322f]/10 hover:border-[#4ba3e3]/30 hover:shadow-[0_12px_40px_rgba(75,163,227,0.15)]"
                >
                  <div className="relative flex items-center justify-center gap-3 text-[#2d322f] group-hover:text-[#4ba3e3]">
                    <IconifyIcon icon="solar:pen-new-square-linear" className="text-xl" />
                    Solicitar Revisão
                  </div>
                </button>

                <button
                  className="group relative overflow-hidden rounded-2xl px-6 py-5 text-sm font-normal uppercase tracking-widest transition-all duration-500 bg-[#4ba3e3] text-white hover:bg-[#2d322f] shadow-[0_12px_40px_rgba(75,163,227,0.3)] hover:shadow-[0_12px_40px_rgba(45,50,47,0.3)]"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <IconifyIcon icon="solar:shield-check-linear" className="text-xl" />
                    Confirmar Registros
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* History Section */}
          <div className="bg-white rounded-2xl p-8 border border-[#2d322f]/10 shadow-[0_8px_30px_rgba(45,50,47,0.04)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#2d322f]/10 flex items-center justify-center">
                <IconifyIcon icon="solar:document-text-linear" className="text-xl text-[#2d322f]" />
              </div>
              <div>
                <h3 className="text-2xl uppercase tracking-tight text-[#2d322f] font-playfair font-normal">
                  Histórico de Registros
                </h3>
                <p className="text-[#2d322f]/50 text-xs uppercase tracking-widest">
                  Últimos 10 dias
                </p>
              </div>
            </div>

            {myTimeRecords && myTimeRecords.length > 0 ? (
              <div className="space-y-5">
                {myTimeRecords.map((dayGroup: any, index: number) => (
                  <div
                    key={dayGroup.date}
                    className={cn(
                      "relative overflow-hidden rounded-xl p-6 border transition-all duration-500 group",
                      index === 0
                        ? "bg-[#1e2420] border-white/10 hover:border-white/20"
                        : "bg-[#ebedea]/50 border-[#2d322f]/10 hover:border-[#4ba3e3]/20"
                    )}
                  >
                    {/* Background Pattern */}
                    {index === 0 && (
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                      </div>
                    )}

                    <div className="relative">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            index === 0 ? "bg-white/10" : "bg-white"
                          )}>
                            <IconifyIcon
                              icon="solar:calendar-linear"
                              className={cn(
                                "text-xl",
                                index === 0 ? "text-white" : "text-[#2d322f]"
                              )}
                            />
                          </div>
                          <div>
                            <h4 className={cn(
                              "text-sm uppercase tracking-widest font-medium",
                              index === 0 ? "text-white" : "text-[#2d322f]/70"
                            )}>
                              {format(new Date(dayGroup.date), "dd 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })}
                            </h4>
                            <p className={cn(
                              "text-xs uppercase tracking-wider",
                              index === 0 ? "text-white/50" : "text-[#2d322f]/40"
                            )}>
                              {dayGroup.records.length} registros
                            </p>
                          </div>
                        </div>
                        {dayGroup.isComplete && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4ba3e3]/20 border border-[#4ba3e3]/30 text-[#4ba3e3] text-xs uppercase tracking-wider">
                            <IconifyIcon icon="solar:check-circle-linear" className="text-sm" />
                            Completo
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {dayGroup.records.map((record: any) => {
                          const config = typeConfig[record.type as TimeType];
                          return (
                            <div
                              key={record._id}
                              className={cn(
                                "relative overflow-hidden rounded-xl p-4 border transition-all duration-300 group",
                                index === 0
                                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                                  : "bg-white border-[#2d322f]/10 hover:border-[#4ba3e3]/20"
                              )}
                            >
                              <div className="flex flex-col items-center text-center">
                                <div className={cn(
                                  "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
                                  config.gradient
                                )}>
                                  <IconifyIcon icon={config.icon} className="text-xl text-white" />
                                </div>
                                <p className={cn(
                                  "text-xs uppercase tracking-wider font-medium mb-1",
                                  index === 0 ? "text-white/70" : "text-[#2d322f]/70"
                                )}>
                                  {config.label}
                                </p>
                                <p className={cn(
                                  "text-xl font-playfair font-normal",
                                  index === 0 ? "text-white" : "text-[#2d322f]"
                                )}>
                                  {format(new Date(record.timestamp), "HH:mm")}
                                </p>
                                <span className={cn(
                                  "mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider border",
                                  statusConfig[record.status].bg,
                                  statusConfig[record.status].color,
                                  statusConfig[record.status].border
                                )}>
                                  <IconifyIcon icon={statusConfig[record.status].icon} className="text-xs" />
                                  {statusConfig[record.status].label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-[#2d322f]/5 flex items-center justify-center mx-auto mb-4">
                  <IconifyIcon icon="solar:calendar-linear" className="text-4xl text-[#2d322f]/20" />
                </div>
                <p className="text-[#2d322f]/50 text-sm uppercase tracking-widest">
                  Nenhum registro encontrado
                </p>
                <p className="text-[#2d322f]/30 text-xs uppercase tracking-wider mt-2">
                  Comece a registrar seu ponto hoje
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DirectionalTransition>
  );
}
