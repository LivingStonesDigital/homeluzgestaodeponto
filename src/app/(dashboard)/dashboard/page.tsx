"use client";

import { Suspense } from "react";
import Loader from "@/components/loader";
import Notification from "@/components/notification";
import { DotmCircular14 } from "@/components/ui/dotm-circular-14";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import {
  ArrowUpRight,
  ClipboardPasteIcon,
  Clock,
  Coffee,
  LucideFingerprint,
  Sunset,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

const typeConfig: Record<
  TimeType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  work_start: {
    label: "Entrada",
    icon: <ArrowUpRight className="w-4 h-4" />,
    color: "bg-blue-500",
  },
  lunch_start: {
    label: "Pausa",
    icon: <Coffee className="w-4 h-4" />,
    color: "bg-amber-500",
  },
  lunch_end: {
    label: "Retorno",
    icon: <ArrowUpRight className="w-4 h-4" />,
    color: "bg-green-500",
  },
  work_end: {
    label: "Saída",
    icon: <Sunset className="w-4 h-4" />,
    color: "bg-red-500",
  },
};

function DashboardPage() {
  const currentUser = useQuery(api.employees.currentUser);
  const todayStatus = useQuery(api.timeRecords.todayStatus);
  const registerTime = useMutation(api.timeRecords.registerTime);
  const [isRegistering, setIsRegistering] = useState(false);

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
        continue;
      }
      if (record.type === "work_end" && lastEntry) {
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
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <main className="bg-surface dark:bg-zinc-900 font-body text-on-surface min-h-screen pb-32">
        <section className="pt-12 px-6 max-md:px-4 max-w-md mx-auto space-y-8">
          <div className="md:col-span-2 bg-primary-container p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="relative z-10">
              <h2 className="font-manrope font-extrabold text-3xl mb-2">
                Olá {currentUser.name}
              </h2>
              <p className="opacity-80 font-medium">
                Você possui 12 solicitações aguardando sua revisão hoje.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <Clock className="size-40" />
            </div>
          </div>

          <aside className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-white dark:bg-zinc-800 shadow p-6 rounded-3xl flex items-center justify-between">
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
            <div className="bg-white dark:bg-zinc-800 shadow p-5 rounded-3xl">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2 font-label">
                Próxima Ação
              </p>
              <p className="text-xl font-bold text-blue-500 font-headline">
                {nextTypeLabel}
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 shadow p-5 rounded-3xl">
              <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2 font-label">
                Status
              </p>
              <p
                className={cn(
                  "text-xl font-bold font-headline",
                  isComplete ? "text-green-500" : "text-blue-500",
                )}
              >
                {isComplete ? "Concluído" : "Em andamento"}
              </p>
            </div>
          </aside>

          <aside className="flex flex-col items-center justify-center py-10 relative">
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
            <div className="relative z-0 group">
              <div className="absolute  inset-0 bg-blue-500 opacity-20 rounded-full blur-2xl group-active:scale-110 transition-transform"></div>
              <button
                onClick={handleRegister}
                disabled={isRegistering || isComplete}
                className={cn(
                  "relative w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 border-8 border-white/20",
                  isComplete
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-400 dark:bg-blue-800 hover:bg-blue-500 dark:hover:bg-blue-900",
                )}
              >
                {isRegistering ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white dark:border-zinc-700" />
                ) : (
                  <>
                    <LucideFingerprint className="w-12 h-12 text-white" />
                    <span className="text-white font-bold text-lg font-headline">
                      {isComplete ? "Dia Completo" : "Bater Ponto"}
                    </span>
                    <span className="text-blue-100/70 text-sm mt-1 font-label">
                      {isComplete
                        ? "Turno encerrado"
                        : `Toque para registrar ${nextTypeLabel}`}
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-12 z-0 bg-white dark:bg-zinc-800 px-6 py-3 rounded-full flex items-center gap-3 border border-white/30 dark:border-zinc-700 shadow-sm">
              <div className="relative flex h-3 w-3">
                <span
                  className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    isComplete
                      ? "bg-green-500"
                      : "bg-blue-500 dark:bg-blue-700",
                  )}
                ></span>
                <span
                  className={cn(
                    "relative inline-flex rounded-full h-3 w-3",
                    isComplete
                      ? "bg-green-500"
                      : "bg-blue-500 dark:bg-blue-700",
                  )}
                ></span>
              </div>
              <span
                className={cn(
                  "font-bold tracking-wide font-headline",
                  isComplete
                    ? "text-green-500"
                    : "text-blue-500 dark:text-blue-700",
                )}
              >
                {isComplete ? "Turno Concluído" : "Em Trabalho"}
              </span>
              {todayRecords && todayRecords.length > 0 ? (
                <span className="text-on-surface-variant font-medium font-body text-sm border-l border-outline-variant pl-3">
                  {format(new Date(todayRecords[0].timestamp), "HH:mm")}
                </span>
              ) : null}
            </div>
          </aside>

          {todayRecords && todayRecords.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-on-surface font-bold font-headline">
                Registros de Hoje
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    "work_start",
                    "lunch_start",
                    "lunch_end",
                    "work_end",
                  ] as TimeType[]
                ).map((type) => {
                  const record = todayRecords.find((r: any) => r.type === type);
                  const config = typeConfig[type];

                  return (
                    <div
                      key={type}
                      className={cn(
                        "p-3 rounded-xl text-center",
                        record ? "bg-white shadow" : "bg-muted/50",
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white",
                          record ? config.color : "bg-gray-300",
                        )}
                      >
                        {record ? config.icon : config.icon}
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {config.label}
                      </p>
                      <p className="text-sm font-bold">
                        {record
                          ? format(new Date(record.timestamp), "HH:mm")
                          : "--:--"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <aside className="space-y-4">
            <div className="bg-surface-container-lowest dark:bg-zinc-800 p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-on-surface dark:text-white font-bold font-headline">
                  Meta Diária
                </h3>
                <span className="text-blue-500 font-extrabold text-lg font-headline">
                  {isComplete ? "100%" : "84%"}
                </span>
              </div>
              <div className="w-full bg-surface-container-high dark:bg-zinc-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: isComplete ? "100%" : "84%" }}
                ></div>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-white mt-3 font-body">
                {isComplete ? "Turno concluído com sucesso!" : `Faltam ${12}`}
              </p>
            </div>
          </aside>
        </section>
      </main>
    </Suspense>
  );
}

export default DashboardPage;
