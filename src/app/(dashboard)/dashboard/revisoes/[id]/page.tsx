"use client";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Coffee,
  FileText,
  LogIn,
  LogOut,
  Timer,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

type TimeRecordType = "work_start" | "lunch_start" | "lunch_end" | "work_end";
type TimeRecordStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "revision_requested";

const typeConfig: Record<
  TimeRecordType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  work_start: {
    label: "Entrada",
    icon: <LogIn className="h-5 w-5" />,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
  },
  lunch_start: {
    label: "Início do intervalo",
    icon: <Coffee className="h-5 w-5" />,
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
  },
  lunch_end: {
    label: "Retorno do intervalo",
    icon: <Coffee className="h-5 w-5" />,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  },
  work_end: {
    label: "Saída",
    icon: <LogOut className="h-5 w-5" />,
    color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
  },
};

const statusConfig: Record<
  TimeRecordStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  pending: {
    label: "Pendente",
    icon: <Clock className="h-4 w-4" />,
    className: "bg-amber-100 text-amber-700 dark:bg-amber-950/40",
  },
  approved: {
    label: "Aprovado",
    icon: <CheckCircle2 className="h-4 w-4" />,
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40",
  },
  rejected: {
    label: "Rejeitado",
    icon: <XCircle className="h-4 w-4" />,
    className: "bg-red-100 text-red-700 dark:bg-red-950/40",
  },
  revision_requested: {
    label: "Revisão solicitada",
    icon: <FileText className="h-4 w-4" />,
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950/40",
  },
};

function calculateDailyHours(records: { type: string; timestamp: number }[]) {
  let totalMs = 0;
  let lastEntry: number | null = null;

  for (const record of records) {
    if (record.type === "work_start") {
      lastEntry = record.timestamp;
    }

    if (record.type === "work_end" && lastEntry) {
      totalMs += record.timestamp - lastEntry;
      lastEntry = null;
    }
  }

  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

export default function MeuHistoricoDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const recordId = params.id as Id<"timeRecords"> | undefined;

  const details = useQuery(
    api.timeRecords.myTimeRecordDayDetails,
    recordId ? { recordId } : "skip",
  );

  if (details === undefined) {
    return (
      <main className="min-h-screen bg-surface px-6 py-10 text-on-surface">
        <section className="mx-auto max-w-md space-y-4">
          <div className="h-10 w-28 animate-pulse rounded-xl bg-surface-container" />
          <div className="h-40 animate-pulse rounded-2xl bg-surface-container" />
          <div className="h-72 animate-pulse rounded-2xl bg-surface-container" />
        </section>
      </main>
    );
  }

  if (details === null) {
    return (
      <main className="min-h-screen bg-surface px-6 py-10 text-on-surface">
        <section className="mx-auto max-w-md">
          <button
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-on-surface-variant"
            onClick={() => router.back()}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <div className="rounded-2xl bg-surface-container-lowest p-6 text-center shadow-sm">
            <h1 className="text-xl font-bold">Registro não encontrado</h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Não foi possível carregar os detalhes desse ponto.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const records = details.records;
  const selectedRecord = details.selectedRecord;
  const selectedStatus = statusConfig[selectedRecord.status as TimeRecordStatus];
  const dailyHours = calculateDailyHours(records);
  const date = new Date(`${details.date}T00:00:00`);
  const lunchStart = records.find((record) => record.type === "lunch_start");
  const lunchEnd = records.find((record) => record.type === "lunch_end");
  const lunchMinutes =
    lunchStart && lunchEnd
      ? Math.round((lunchEnd.timestamp - lunchStart.timestamp) / 60000)
      : null;

  return (
    <main className="min-h-screen bg-surface px-6 pb-28 pt-10 text-on-surface">
      <section className="mx-auto max-w-md">
        <button
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-on-surface-variant"
          onClick={() => router.back()}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <header className="mb-6 rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-600/20">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/75">
                Detalhes do ponto
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
                {format(date, "dd 'de' MMMM", { locale: ptBR })}
              </h1>
              <p className="mt-1 text-sm font-medium capitalize text-white/80">
                {format(date, "EEEE, yyyy", { locale: ptBR })}
              </p>
            </div>
            <CalendarDays className="h-8 w-8 text-white/80" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/12 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                Total
              </p>
              <p className="mt-1 text-2xl font-extrabold">{dailyHours}</p>
            </div>
            <div className="rounded-xl bg-white/12 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                Registros
              </p>
              <p className="mt-1 text-2xl font-extrabold">{records.length}</p>
            </div>
          </div>
        </header>

        <section className="mb-6 rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Status do dia</h2>
              <p className="text-sm text-on-surface-variant">
                Situação do registro selecionado.
              </p>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold",
                selectedStatus.className,
              )}
            >
              {selectedStatus.icon}
              {selectedStatus.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-surface-container-low p-4">
              <div className="mb-2 flex items-center gap-2 text-on-surface-variant">
                <Timer className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Intervalo</span>
              </div>
              <p className="text-lg font-extrabold">
                {lunchMinutes !== null ? `${lunchMinutes}m` : "--"}
              </p>
            </div>
            <div className="rounded-xl bg-surface-container-low p-4">
              <div className="mb-2 flex items-center gap-2 text-on-surface-variant">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Selecionado</span>
              </div>
              <p className="text-lg font-extrabold">
                {format(new Date(selectedRecord.timestamp), "HH:mm")}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-bold">Linha do tempo</h2>
          <div className="space-y-4">
            {records.map((record) => {
              const config = typeConfig[record.type as TimeRecordType];
              const status = statusConfig[record.status as TimeRecordStatus];
              const isSelected = record._id === selectedRecord._id;

              return (
                <div
                  className={cn(
                    "rounded-xl border p-4",
                    isSelected
                      ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/20"
                      : "border-outline-variant/20 bg-surface-container-low",
                  )}
                  key={record._id}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("rounded-xl p-3", config.color)}>
                        {config.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{config.label}</h3>
                        <p className="text-xs text-on-surface-variant">
                          {isSelected ? "Registro selecionado" : "Registro do dia"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold">
                        {format(new Date(record.timestamp), "HH:mm")}
                      </p>
                      <span
                        className={cn(
                          "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold",
                          status.className,
                        )}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {(record.note || record.originalTimestamp) && (
                    <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm dark:bg-zinc-900/40">
                      {record.originalTimestamp && (
                        <p className="text-on-surface-variant">
                          Horário original:{" "}
                          <span className="font-bold text-on-surface">
                            {format(new Date(record.originalTimestamp), "HH:mm")}
                          </span>
                        </p>
                      )}
                      {record.note && (
                        <p className="mt-1 text-on-surface-variant">
                          Observação:{" "}
                          <span className="font-medium text-on-surface">
                            {record.note}
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
