"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Coffee,
  FileText,
  Loader2,
  LogIn,
  LogOut,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

const typeConfig: Record<
  TimeType,
  { label: string; shortLabel: string; icon: React.ReactNode }
> = {
  work_start: {
    label: "Entrada",
    shortLabel: "Entrada",
    icon: <LogIn className="h-5 w-5" />,
  },
  lunch_start: {
    label: "Início do intervalo",
    shortLabel: "Início",
    icon: <Coffee className="h-5 w-5" />,
  },
  lunch_end: {
    label: "Retorno do intervalo",
    shortLabel: "Retorno",
    icon: <Coffee className="h-5 w-5" />,
  },
  work_end: {
    label: "Saída",
    shortLabel: "Saída",
    icon: <LogOut className="h-5 w-5" />,
  },
};

const reasonOptions = [
  { value: "forgot", label: "Esquecimento de registro" },
  { value: "error", label: "Erro no sistema/dispositivo" },
  { value: "external", label: "Atividade externa" },
  { value: "other", label: "Outro motivo" },
];

function todayString() {
  return format(new Date(), "yyyy-MM-dd");
}

export default function RevisoesPage() {
  const [selectedDate, setSelectedDate] = useState(todayString());
  const [selectedType, setSelectedType] = useState<TimeType>("work_start");
  const [requestedTime, setRequestedTime] = useState(
    format(new Date(), "HH:mm"),
  );
  const [reason, setReason] = useState(reasonOptions[0].value);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRevisionId, setEditingRevisionId] = useState<string | null>(
    null,
  );
  const [revisionTime, setRevisionTime] = useState("");
  const [revisionNote, setRevisionNote] = useState("");
  const [isSavingRevision, setIsSavingRevision] = useState(false);

  const recordsForDate = useQuery(api.timeRecords.myTimeRecordsByDate, {
    date: selectedDate,
  });

  const revisionPermission = useQuery(api.timeRecords.myRevisionPermissionByDate, {
    date: selectedDate,
  });

  const myTimeRecordsWithRevision = useQuery(
    api.timeRecords.myTimeRecordsWithRevision,
    {},
  );

  const requestCorrection = useMutation(api.timeRecords.requestCorrection);
  
  const updateRecordByEmployee = useMutation(
    api.timeRecords.updateRecordByEmployee,
  );

  const editPendingRecord = useMutation(api.timeRecords.editPendingRecord);

  const selectedRecord = useMemo(
    () => recordsForDate?.find((record) => record.type === selectedType),
    [recordsForDate, selectedType],
  );

  const selectedRecordHasOpenCorrection = Boolean(
    selectedRecord?.openCorrection,
  );
  
  const selectedRecordIsApproved = selectedRecord?.status === "approved";
  const selectedRecordIsPending = selectedRecord?.status === "pending";
  const selectedDateRevisionAllowed = revisionPermission?.enabled ?? false;

  const selectedReasonLabel =
    reasonOptions.find((option) => option.value === reason)?.label ||
    "Solicitação de revisão";
  const recordsWithRevision =
    myTimeRecordsWithRevision?.flatMap((dayGroup: any) => dayGroup.records) ||
    [];

  const handleStartRevision = (record: any) => {
    setEditingRevisionId(record._id);
    setRevisionTime(format(new Date(record.timestamp), "HH:mm"));
    setRevisionNote("");
  };

  const handleSaveRevision = async (record: any) => {
    if (!revisionTime) {
      toast.error("Informe o horário corrigido.");
      return;
    }

    const [hours, minutes] = revisionTime.split(":").map(Number);
    const nextDate = new Date(record.timestamp);
    nextDate.setHours(hours, minutes, 0, 0);

    if (Number.isNaN(nextDate.getTime())) {
      toast.error("Horário corrigido inválido.");
      return;
    }

    setIsSavingRevision(true);
    try {
      await updateRecordByEmployee({
        recordId: record._id,
        newTimestamp: nextDate.getTime(),
        note: revisionNote.trim() || undefined,
      });

      toast.success("Revisão enviada para aprovação!");
      setEditingRevisionId(null);
      setRevisionTime("");
      setRevisionNote("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao enviar revisão",
      );
    } finally {
      setIsSavingRevision(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRecord) {
      toast.error("Não existe registro desse tipo na data selecionada.");
      return;
    }

    if (selectedRecordHasOpenCorrection) {
      toast.error("Esse registro já possui uma solicitação em análise.");
      return;
    }

    if (!requestedTime) {
      toast.error("Informe o horário solicitado.");
      return;
    }

    const newTimestamp = new Date(
      `${selectedDate}T${requestedTime}:00`,
    ).getTime();

    if (Number.isNaN(newTimestamp)) {
      toast.error("Horário solicitado inválido.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Se o registro está pending, edita diretamente
      if (selectedRecordIsPending) {
        await editPendingRecord({
          recordId: selectedRecord._id,
          newTimestamp,
          note: details.trim() || undefined,
        });
        toast.success("Registro atualizado com sucesso!");
      } else {
        // Se está approved, solicita correção
        if (!selectedDateRevisionAllowed) {
          toast.error("A revisão desse dia ainda não foi liberada pelo administrador.");
          return;
        }

        await requestCorrection({
          recordId: selectedRecord._id,
          suggestedTimestamp: newTimestamp,
          reason: details.trim()
            ? `${selectedReasonLabel}: ${details.trim()}`
            : selectedReasonLabel,
        });
        toast.success("Solicitação de revisão enviada!");
      }
      setDetails("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao solicitar revisão",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-6 pb-28 pt-10 text-on-surface">
      <section className="mx-auto max-w-md">
        <header className="mb-8 rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-600/20">
          <p className="text-xs font-bold uppercase tracking-widest text-white/75">
            Revisão de ponto
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Solicitar ajuste
          </h1>
          <p className="mt-3 text-sm font-medium text-white/80">
            Selecione um registro existente e informe o horário correto.
            Registros pendentes são atualizados diretamente.
          </p>
        </header>

        {recordsWithRevision.length > 0 && (
          <section className="mb-8 rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Ação necessária
              </p>
              <h2 className="mt-1 text-xl font-extrabold">
                Revisões solicitadas
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Seu gestor pediu ajuste nos registros abaixo.
              </p>
            </div>

            <div className="space-y-4">
              {recordsWithRevision.map((record: any) => {
                const config = typeConfig[record.type as TimeType];
                const isEditing = editingRevisionId === record._id;

                return (
                  <div
                    className="rounded-xl border border-blue-500/20 bg-blue-50/60 p-4 dark:bg-blue-950/20"
                    key={record._id}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="rounded-xl bg-blue-600 p-3 text-white">
                          {config.icon}
                        </div>
                        <div>
                          <h3 className="font-bold">{config.label}</h3>
                          <p className="text-xs font-medium text-on-surface-variant">
                            {format(new Date(`${record.date}T00:00:00`), "dd/MM/yyyy")}
                          </p>
                          {record.note && (
                            <p className="mt-2 text-sm font-medium text-amber-700">
                              {record.note}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-lg font-extrabold text-blue-600">
                        {format(new Date(record.timestamp), "HH:mm")}
                      </span>
                    </div>

                    {isEditing ? (
                      <div className="mt-4 space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                            Horário corrigido
                          </label>
                          <input
                            className="w-full rounded-xl border-none bg-white px-4 py-3 font-bold text-on-surface focus:ring-2 focus:ring-primary/20 dark:bg-zinc-900"
                            onChange={(event) =>
                              setRevisionTime(event.target.value)
                            }
                            type="time"
                            value={revisionTime}
                          />
                        </div>
                        <textarea
                          className="min-h-24 w-full resize-none rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm outline-none focus:border-primary/50 dark:bg-zinc-900"
                          onChange={(event) =>
                            setRevisionNote(event.target.value)
                          }
                          placeholder="Observação opcional"
                          value={revisionNote}
                        />
                        <div className="flex gap-2">
                          <button
                            className="flex-1 rounded-xl bg-primary-container px-4 py-3 text-sm font-bold text-white disabled:opacity-50"
                            disabled={isSavingRevision}
                            onClick={() => handleSaveRevision(record)}
                            type="button"
                          >
                            {isSavingRevision ? "Enviando..." : "Enviar revisão"}
                          </button>
                          <button
                            className="rounded-xl bg-surface-container px-4 py-3 text-sm font-bold text-on-surface-variant"
                            disabled={isSavingRevision}
                            onClick={() => setEditingRevisionId(null)}
                            type="button"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
                        onClick={() => handleStartRevision(record)}
                        type="button"
                      >
                        Revisar registro
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="mb-6 rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
          <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
            <div>
              <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                Data do evento
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3.5 pr-11 text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  onChange={(event) => setSelectedDate(event.target.value)}
                  type="date"
                  value={selectedDate}
                />
                <Calendar className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
              </div>
            </div>

            <div>
              <label className="mb-3 ml-1 block text-sm font-semibold text-on-surface-variant">
                Registro para revisar
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(typeConfig) as TimeType[]).map((type) => {
                  const config = typeConfig[type];
                  const record = recordsForDate?.find((item) => item.type === type);
                  const active = selectedType === type;
                  const hasOpenCorrection = Boolean(record?.openCorrection);
                  const isApproved = record?.status === "approved";
                  const isPending = record?.status === "pending";
                  const unavailable = Boolean(
                    record &&
                      (hasOpenCorrection ||
                        (!isApproved && !isPending) ||
                        (isApproved && !selectedDateRevisionAllowed)),
                  );

                  return (
                    <button
                      className={cn(
                        "flex min-h-24 flex-col items-center justify-center rounded-xl border-2 p-3 text-center transition-colors",
                        active
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-transparent bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest",
                        !record && "opacity-50",
                        unavailable &&
                          "cursor-not-allowed opacity-45 hover:bg-surface-container-high",
                      )}
                      disabled={unavailable}
                      key={type}
                      onClick={() => setSelectedType(type)}
                      type="button"
                    >
                      {config.icon}
                      <span className="mt-2 text-[10px] font-bold uppercase">
                        {config.shortLabel}
                      </span>
                      <span className="mt-1 text-xs font-semibold">
                        {record ? format(new Date(record.timestamp), "HH:mm") : "--:--"}
                      </span>
                      {hasOpenCorrection && (
                        <span className="mt-1 text-[10px] font-bold uppercase text-amber-600">
                          Em análise
                        </span>
                      )}
                      {record && !hasOpenCorrection && isPending && (
                        <span className="mt-1 text-[10px] font-bold uppercase text-blue-600">
                          Pendente
                        </span>
                      )}
                      {record && !hasOpenCorrection && !isApproved && !isPending && (
                        <span className="mt-1 text-[10px] font-bold uppercase text-zinc-500">
                          Não aprovado
                        </span>
                      )}
                      {record &&
                        !hasOpenCorrection &&
                        isApproved &&
                        !selectedDateRevisionAllowed && (
                          <span className="mt-1 text-[10px] font-bold uppercase text-zinc-500">
                            Bloqueado
                          </span>
                        )}
                    </button>
                  );
                })}
              </div>
              {recordsForDate && recordsForDate.length === 0 && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                  Nenhum registro encontrado nessa data.
                </p>
              )}
              {selectedRecordHasOpenCorrection && (
                <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
                  Esse registro já possui uma solicitação aberta. Aguarde a
                  aprovação ou reprovação para solicitar novamente.
                </p>
              )}
              {selectedRecord && !selectedRecordHasOpenCorrection && !selectedRecordIsApproved && !selectedRecordIsPending && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                  Esse registro não está em um estado que permite revisão.
                </p>
              )}
              {selectedRecord &&
                selectedRecordIsApproved &&
                !selectedDateRevisionAllowed && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                    A solicitação de revisão desse dia ainda não foi liberada
                    pelo administrador.
                  </p>
                )}
            </div>

            <div>
              <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                Horário solicitado
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3.5 pr-11 text-lg font-bold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  onChange={(event) => setRequestedTime(event.target.value)}
                  type="time"
                  value={requestedTime}
                />
                <Clock className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
              </div>
            </div>

            <div>
              <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                Motivo da solicitação
              </label>
              <select
                className="w-full appearance-none rounded-xl border-none bg-surface-container-low px-4 py-3.5 text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                onChange={(event) => setReason(event.target.value)}
                value={reason}
              >
                {reasonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                Justificativa
              </label>
              <textarea
                className="min-h-32 w-full resize-none rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low/30 px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary/50"
                onChange={(event) => setDetails(event.target.value)}
                placeholder="Explique o que precisa ser revisado."
                value={details}
              />
            </div>
          </form>
        </div>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container py-4 font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={
            isSubmitting ||
            !selectedRecord ||
            selectedRecordHasOpenCorrection ||
            (!selectedRecordIsApproved && !selectedRecordIsPending) ||
            (selectedRecordIsApproved && !selectedDateRevisionAllowed)
          }
          onClick={handleSubmit}
          type="button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enviando
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5" />
              {selectedRecordIsPending ? "Atualizar registro" : "Enviar solicitação"}
            </>
          )}
        </button>

        <p className="mx-auto mt-6 max-w-xs text-center text-xs text-outline">
          {selectedRecordIsPending
            ? "Registros pendentes são atualizados diretamente e continuam aguardando aprovação."
            : "A solicitação fica aberta para avaliação do gestor e não altera o ponto automaticamente."}
        </p>

        {selectedRecord && (
          <div className="mt-6 rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {typeConfig[selectedRecord.type as TimeType].label}
                </p>
                <p className="text-xs text-on-surface-variant">
                  Registro atual em{" "}
                  {format(new Date(selectedRecord.timestamp), "HH:mm")} de{" "}
                  {format(new Date(selectedRecord.timestamp), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
