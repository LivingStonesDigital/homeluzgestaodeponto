"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  format,
  startOfWeek,
  addDays,
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Loader2,
  Check,
  X,
  AlertCircle,
  Clock,
  Coffee,
  Sunset,
  ClipboardPasteIcon,
  Calendar,
  CircleAlert,
  ArrowLeft,
  ArrowRight,
  Eye,
} from "lucide-react";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

const typeConfig: Record<
  TimeType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  work_start: {
    label: "Entrada",
    icon: <Clock className="h-4 w-4" />,
    color: "bg-green-500",
  },
  lunch_start: {
    label: "Saída",
    icon: <Coffee className="h-4 w-4" />,
    color: "bg-yellow-500",
  },
  lunch_end: {
    label: "Entrada",
    icon: <Coffee className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  work_end: {
    label: "Saída",
    icon: <Sunset className="h-4 w-4" />,
    color: "bg-red-500",
  },
};

function AprovacoesPage() {
  const pendingRecords = useQuery(api.timeRecords.pendingRecords);
  const openCorrections = useQuery(api.timeRecords.openCorrections);
  const approveRecord = useMutation(api.timeRecords.approveRecord);
  const rejectRecord = useMutation(api.timeRecords.rejectRecord);
  const resolveCorrection = useMutation(api.timeRecords.resolveCorrection);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const handleApprove = async (recordIds: string[]) => {
    if (!recordIds.length) return;
    setProcessingIds(new Set(recordIds));
    try {
      await Promise.all(
        recordIds.map((id) => approveRecord({ recordId: id as any })),
      );
      toast.success("Todos os registros aprovados!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao aprobar");
    } finally {
      setProcessingIds(new Set());
    }
  };

  const handleReject = async (recordIds: string[]) => {
    const note = prompt("Motivo da rejeição:");
    if (!note) return;

    if (!recordIds.length) return;
    setProcessingIds(new Set(recordIds));
    try {
      await Promise.all(
        recordIds.map((id) => rejectRecord({ recordId: id as any, note })),
      );
      toast.success("Registros rejeitados!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao rejeitar");
    } finally {
      setProcessingIds(new Set());
    }
  };

  const handleApproveCorrection = async (correctionId: string) => {
    setProcessingIds(new Set([correctionId]));
    try {
      await resolveCorrection({
        correctionId: correctionId as any,
        approve: true,
      });
      toast.success("Correção aprovada!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao aprovar correção",
      );
    } finally {
      setProcessingIds(new Set());
    }
  };

  const handleRejectCorrection = async (correctionId: string) => {
    const note = prompt("Motivo da rejeição:");
    if (!note) return;

    setProcessingIds(new Set([correctionId]));
    try {
      await resolveCorrection({
        correctionId: correctionId as any,
        approve: false,
        adminNote: note,
      });
      toast.success("Correção rejeitada!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao rejeitar correção",
      );
    } finally {
      setProcessingIds(new Set());
    }
  };

  // Group records by date and user - optimized with single-pass Map
  const groups = useMemo(() => {
    if (!pendingRecords?.length) return [];

    const map = new Map<string, any>();
    pendingRecords.forEach((record: any) => {
      const key = `${record.date}-${record.userId}`;
      if (!map.has(key)) {
        map.set(key, {
          date: record.date,
          user: record.user,
          records: [],
        });
      }
      map.get(key).records.push(record);
    });
    return Array.from(map.values());
  }, [pendingRecords]);

  const totalPending = (pendingRecords?.length || 0) + (openCorrections?.length || 0);

  const isProcessing = useMemo(
    () => (ids: string[]) => ids.some((id) => processingIds.has(id)),
    [processingIds],
  );

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr + "T00:00:00"), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp), "HH:mm");
  };

  return (
    <main className="bg-surface dark:bg-zinc-900 font-body text-on-surface min-h-screen pb-32">
      <section className="pt-12 px-6 max-md:px-4 max-w-md mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2 bg-primary-container p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="relative z-10">
              <h2 className="font-manrope font-extrabold text-3xl mb-2">
                Aprovações
              </h2>
              <p className="opacity-80 font-medium">
                Você possui 12 solicitações aguardando sua revisão hoje.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <ClipboardPasteIcon className="size-40" />
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-sm border border-outline-variant/10">
            <span className="text-4xl font-manrope font-extrabold text-primary mb-1">
              {totalPending}
            </span>
            <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest">
              Pendentes
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="font-manrope font-bold text-xl text-on-surface">
            Solicitações Recentes
          </h3>
          <button className="text-primary font-semibold text-sm hover:underline">
            Ver Histórico
          </button>
        </div>

        {/* Seção de Registros Pendentes */}
        <div className="space-y-6 mb-8">
          <h4 className="font-manrope font-bold text-lg text-on-surface">
            Registros Pendentes
          </h4>
          <div className="space-y-6">
          {groups.length > 0 ? (
            groups.map((group: any) => {
              const recordIds = group.records.map((r: any) => r._id);
              const isGroupProcessing = isProcessing(recordIds);

              return (
                <div
                  key={`${group.date}-${group.user._id}`}
                  className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center group transition-all hover:shadow-md border border-transparent hover:border-outline-variant/10"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt={group.user.name}
                        src={
                          group.user.avatarUrl ||
                          `https://avatar.vercel.sh/${group.user.name}`
                        }
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-on-surface">
                        {group.user.name}
                      </h4>
                      <p className="text-on-surface-variant text-sm font-medium">
                        {group.user.department || "Sem departamento"}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Calendar />
                      <span className="text-sm font-medium">
                        {formatDate(group.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <CircleAlert />
                      <span className="text-sm">
                        {group.records.length} registro(s) pendente(s)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => setSelectedGroup(group)}
                      className="flex-1 md:flex-none px-4 py-3 bg-surface-container text-on-surface rounded-xl font-bold text-sm hover:bg-surface-container-high transition-colors active:scale-95 duration-150 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Detalhes
                    </button>
                    <button
                      onClick={() => handleApprove(recordIds)}
                      disabled={isGroupProcessing}
                      className="flex-1 md:flex-none px-6 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-150 disabled:opacity-50"
                    >
                      {isGroupProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Aprovar"
                      )}
                    </button>
                    <button
                      onClick={() => handleReject(recordIds)}
                      disabled={isGroupProcessing}
                      className="flex-1 md:flex-none px-6 py-3 bg-surface-container-high text-error rounded-xl font-bold text-sm hover:bg-error/5 transition-colors active:scale-95 duration-150 disabled:opacity-50"
                    >
                      {isGroupProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Reprovar"
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-6">
                <Check className="w-12 h-12 text-outline" />
              </div>
              <h4 className="font-manrope font-bold text-xl mb-2">
                Tudo em dia!
              </h4>
              <p className="text-on-surface-variant max-w-xs">
                Não há solicitações de ajuste pendentes no momento. Aproveite
                seu tempo focado!
              </p>
            </div>
          )}
        </div>
        </div>

        {/* Seção de Correções Solicitadas */}
        <div className="space-y-6">
          <h4 className="font-manrope font-bold text-lg text-on-surface">
            Correções Solicitadas
          </h4>
          <div className="space-y-6">
            {openCorrections && openCorrections.length > 0 ? (
              openCorrections.map((correction: any) => {
                const isProcessing = processingIds.has(correction._id);
                return (
                  <div
                    key={correction._id}
                    className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center group transition-all hover:shadow-md border border-transparent hover:border-outline-variant/10"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 overflow-hidden shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          alt={correction.user?.name || "Usuário"}
                          src={
                            correction.user?.avatarUrl ||
                            `https://avatar.vercel.sh/${correction.user?.name || "user"}`
                          }
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-on-surface">
                          {correction.user?.name || "Usuário"}
                        </h4>
                        <p className="text-on-surface-variant text-sm font-medium">
                          {correction.user?.department || "Sem departamento"}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <Calendar />
                        <span className="text-sm font-medium">
                          {formatDate(correction.record?.date || "")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <CircleAlert />
                        <span className="text-sm">
                          {correction.reason}
                        </span>
                      </div>
                      {correction.suggestedTimestamp && (
                        <div className="flex items-center gap-2 text-tertiary font-semibold">
                          <Clock />
                          <span className="text-sm">
                            Sugerido: {formatTime(correction.suggestedTimestamp)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        onClick={() => handleApproveCorrection(correction._id)}
                        disabled={isProcessing}
                        className="flex-1 md:flex-none px-6 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-150 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Aprovar"
                        )}
                      </button>
                      <button
                        onClick={() => handleRejectCorrection(correction._id)}
                        disabled={isProcessing}
                        className="flex-1 md:flex-none px-6 py-3 bg-surface-container-high text-error rounded-xl font-bold text-sm hover:bg-error/5 transition-colors active:scale-95 duration-150 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Reprovar"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-outline" />
                </div>
                <p className="text-on-surface-variant text-sm">
                  Nenhuma correção solicitada
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Detalhes */}
        {selectedGroup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-on-surface">
                      {selectedGroup.user.name}
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                      {formatDate(selectedGroup.date)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedGroup(null)}
                    className="p-2 rounded-xl hover:bg-surface-container-low transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {selectedGroup.records.map((record: any) => {
                  const config = typeConfig[record.type as TimeType];
                  return (
                    <div
                      key={record._id}
                      className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${config.color} text-white`}
                        >
                          {config.icon}
                        </div>
                        <div>
                          <p className="font-medium text-on-surface">
                            {config.label}
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            {formatTime(record.timestamp)}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {record.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <div className="p-6 border-t border-outline-variant/10 flex gap-3">
                <button
                  onClick={() => {
                    handleApprove(selectedGroup.records.map((r: any) => r._id));
                    setSelectedGroup(null);
                  }}
                  className="flex-1 px-6 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Aprovar Todos
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedGroup.records.map((r: any) => r._id));
                    setSelectedGroup(null);
                  }}
                  className="flex-1 px-6 py-3 bg-surface-container-high text-error rounded-xl font-bold text-sm hover:bg-error/5 transition-colors"
                >
                  Reprovar Todos
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default AprovacoesPage;
