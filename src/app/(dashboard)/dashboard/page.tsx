"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Clock, LucideFingerprint, Pin, ArrowUpRight, ArrowDownLeft, Coffee, Sunset } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

const typeConfig: Record<TimeType, { label: string; icon: React.ReactNode; color: string }> = {
  work_start: { label: "Entrada", icon: <ArrowUpRight className="w-4 h-4" />, color: "bg-blue-500" },
  lunch_start: { label: "Pausa", icon: <Coffee className="w-4 h-4" />, color: "bg-amber-500" },
  lunch_end: { label: "Retorno", icon: <ArrowUpRight className="w-4 h-4" />, color: "bg-green-500" },
  work_end: { label: "Saída", icon: <Sunset className="w-4 h-4" />, color: "bg-red-500" },
};

function DashboardPage() {
  const currentUser = useQuery(api.employees.currentUser);
  const todayStatus = useQuery(api.timeRecords.todayStatus);
  const registerTime = useMutation(api.timeRecords.registerTime);
  const [isRegistering, setIsRegistering] = useState(false);

  const { nextType, nextTypeLabel, records: todayRecords, isComplete } = todayStatus || {
    nextType: "work_start" as TimeType,
    nextTypeLabel: "Entrada",
    records: [],
    isComplete: false,
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await registerTime({ type: nextType });
      toast.success(`${nextTypeLabel} registrado!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao registrar");
    } finally {
      setIsRegistering(false);
    }
  };

  const calculateWorkedHours = () => {
    if (!todayRecords || todayRecords.length === 0) return "00:00";
    
    let totalMs = 0;
    let lastEntry = null;
    
    const sorted = [...todayRecords].sort((a, b) => a.timestamp - b.timestamp);
    
    for (const record of sorted) {
      if (record.type === "work_start") {
        lastEntry = record.timestamp;
      } else if (record.type === "work_end" && lastEntry) {
        totalMs += record.timestamp - lastEntry;
        lastEntry = null;
      }
    }
    
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const workedHours = calculateWorkedHours();

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <main className="bg-surface font-body text-on-surface min-h-screen pb-32">
      <section className="pt-12 px-6 max-md:px-4 max-w-md mx-auto space-y-8">
        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-white shadow p-6 rounded-3xl flex items-center justify-between">
            <div>
              <p className="text-on-surface-variant text-sm font-medium mb-1 font-label">
                Horas Trabalhadas
              </p>
              <p className="text-3xl font-extrabold text-foreground font-headline">
                {workedHours}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Clock className="w-6 h-6"></Clock>
            </div>
          </div>
          <div className="bg-white shadow p-5 rounded-3xl">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2 font-label">
              Próxima Ação
            </p>
            <p className="text-xl font-bold text-blue-500 font-headline">
              {nextTypeLabel}
            </p>
          </div>
          <div className="bg-white shadow p-5 rounded-3xl">
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2 font-label">
              Status
            </p>
            <p className={cn(
              "text-xl font-bold font-headline",
              isComplete ? "text-green-500" : "text-blue-500"
            )}>
              {isComplete ? "Concluído" : "Em andamento"}
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center py-10 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <svg height="280" viewBox="0 0 100 100" width="280">
              <circle
                className="text-amber-400"
                cx="50"
                cy="50"
                fill="none"
                r="45"
                stroke="currentColor"
                stroke-width="8"
              ></circle>
              <circle
                className="text-amber-400"
                cx="50"
                cy="50"
                fill="none"
                r="45"
                stroke="currentColor"
                stroke-dasharray="283"
                stroke-dashoffset={isComplete ? "0" : "70"}
                stroke-width="8"
              ></circle>
            </svg>
          </div>
          <div className="relative z-10 group">
            <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-2xl group-active:scale-110 transition-transform"></div>
            <button
              onClick={handleRegister}
              disabled={isRegistering || isComplete}
              className={cn(
                "relative w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 border-8 border-white/20",
                isComplete 
                  ? "bg-green-500 cursor-not-allowed" 
                  : "bg-blue-400 hover:bg-blue-500"
              )}
            >
              {isRegistering ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
              ) : (
                <>
                  <LucideFingerprint className="w-12 h-12 text-white" />
                  <span className="text-white font-bold text-lg font-headline">
                    {isComplete ? "Dia Completo" : "Bater Ponto"}
                  </span>
                  <span className="text-blue-100/70 text-sm mt-1 font-label">
                    {isComplete ? "Turno encerrado" : `Toque para registrar ${nextTypeLabel}`}
                  </span>
                </>
              )}
            </button>
          </div>
          
          <div className="mt-12 z-10 bg-white px-6 py-3 rounded-full flex items-center gap-3 border border-white/30 shadow-sm">
            <div className="relative flex h-3 w-3">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                isComplete ? "bg-green-500" : "bg-blue-500"
              )}></span>
              <span className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                isComplete ? "bg-green-500" : "bg-blue-500"
              )}></span>
            </div>
            <span className={cn(
              "font-bold tracking-wide font-headline",
              isComplete ? "text-green-500" : "text-blue-500"
            )}>
              {isComplete ? "Turno Concluído" : "Em Trabalho"}
            </span>
            {todayRecords && todayRecords.length > 0 && (
              <span className="text-on-surface-variant font-medium font-body text-sm border-l border-outline-variant pl-3">
                {format(new Date(todayRecords[0].timestamp), "HH:mm")}
              </span>
            )}
          </div>
        </section>

        {todayRecords && todayRecords.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-on-surface font-bold font-headline">Registros de Hoje</h3>
            <div className="grid grid-cols-4 gap-2">
              {(["work_start", "lunch_start", "lunch_end", "work_end"] as TimeType[]).map((type) => {
                const record = todayRecords.find((r: any) => r.type === type);
                const config = typeConfig[type];
                
                return (
                  <div 
                    key={type}
                    className={cn(
                      "p-3 rounded-xl text-center",
                      record ? "bg-white shadow" : "bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white",
                      record ? config.color : "bg-gray-300"
                    )}>
                      {record ? config.icon : config.icon}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{config.label}</p>
                    <p className="text-sm font-bold">
                      {record ? format(new Date(record.timestamp), "HH:mm") : "--:--"}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <div className="bg-surface-container-high/50 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                <Pin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface font-headline leading-tight">
                  GPS Ativo
                </p>
                <p className="text-xs text-on-surface-variant font-body">
                  Av. Paulista, São Paulo - SP
                </p>
              </div>
            </div>
            <div className="bg-tertiary/10 px-3 py-1 rounded-lg">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">
                Verificado
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-on-surface font-bold font-headline">
                Meta Diária
              </h3>
              <span className="text-blue-500 font-extrabold text-lg font-headline">
                {isComplete ? "100%" : "84%"}
              </span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: isComplete ? "100%" : "84%" }}
              ></div>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 font-body">
              {isComplete 
                ? "Turno concluído com sucesso!"
                : `Faltam <span className="font-bold text-on-surface">01:18</span> para concluir seu turno.`
              }
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;