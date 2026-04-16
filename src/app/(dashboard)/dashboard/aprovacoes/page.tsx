"use client";

import { useState } from "react";
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
import { format } from "date-fns";
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
  const approveRecord = useMutation(api.timeRecords.approveRecord);
  const rejectRecord = useMutation(api.timeRecords.rejectRecord);
  const requestRevision = useMutation(api.timeRecords.requestRevision);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  const handleApprove = async (recordIds: string[]) => {
    setProcessingIds(new Set(recordIds));
    try {
      for (const id of recordIds) {
        await approveRecord({ recordId: id as any });
      }
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

    setProcessingIds(new Set(recordIds));
    try {
      for (const id of recordIds) {
        await rejectRecord({ recordId: id as any, note });
      }
      toast.success("Registros rejeitados!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao rejeitar");
    } finally {
      setProcessingIds(new Set());
    }
  };

  const handleRequestRevision = async (recordIds: string[]) => {
    const note = prompt("Motivo da revisão (o funcionário poderá editar):");
    if (!note) return;

    setProcessingIds(new Set(recordIds));
    try {
      for (const id of recordIds) {
        await requestRevision({ recordId: id as any, note });
      }
      toast.success("Revisão solicitada!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao solicitar revisão",
      );
    } finally {
      setProcessingIds(new Set());
    }
  };

  // Group records by date and user
  const groupedData =
    pendingRecords?.reduce((acc: any, record: any) => {
      const key = `${record.date}-${record.userId}`;
      if (!acc[key]) {
        acc[key] = {
          date: record.date,
          user: record.user,
          records: [],
        };
      }
      acc[key].records.push(record);
      return acc;
    }, {}) || {};

  const groups = Object.values(groupedData);
  const totalPending = pendingRecords?.length || 0;

  const isProcessing = (ids: string[]) =>
    ids.some((id) => processingIds.has(id));

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
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
            12
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
      <div className="space-y-6">
        <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center group transition-all hover:shadow-md border border-transparent hover:border-outline-variant/10">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 overflow-hidden shrink-0">
              <img
                className="w-full h-full object-cover"
                data-alt="Portrait of Ana Silva, female employee, professional headshot with warm lighting and a soft neutral background."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtJ9epEhnl7QGo-kBWKSfo3xyw2ruSJYvO1fyXjvAV5g0ZBEH9EqYSCRTZ2YAglUmZQrLl_XOEntCKspUA2ltUUKEHWTHKs00t9xL_V7EH6cxJTp-uYpBX2DLQbqHMl6jc6UtJ-1GrsmeNTZErEWnqOK7o--FYt-FRjFJEV55a21PXwDOuMhumc4szPxYYTL7Agh2wuNrpWtT1DupZMKo6z0MNT2-eLtjfYtZDJSyBWKCf7mIm5asNKkpwD_wUi59dhU26jRseTek"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg text-on-surface">Ana Silva</h4>
              <p className="text-on-surface-variant text-sm font-medium">
                Departamento de Vendas
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Calendar />
              <span className="text-sm font-medium">12 de Outubro, 2023</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <CircleAlert />
              <span className="text-sm">Esquecimento de registro</span>
            </div>
          </div>
          <div className="bg-surface-container px-4 py-2 rounded-2xl flex items-center gap-3 shrink-0">
            <span className="text-on-surface-variant line-through text-xs font-mono">
              08:00
            </span>
            <ArrowRight />
            <span className="text-primary font-bold text-base font-mono">
              08:15
            </span>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-150">
              Aprovar
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-surface-container-high text-error rounded-xl font-bold text-sm hover:bg-error/5 transition-colors active:scale-95 duration-150">
              Reprovar
            </button>
          </div>
        </div>
      </div>
      <div className="hidden flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-outline">
            verified
          </span>
        </div>
        <h4 className="font-manrope font-bold text-xl mb-2">Tudo em dia!</h4>
        <p className="text-on-surface-variant max-w-xs">
          Não há solicitações de ajuste pendentes no momento. Aproveite seu
          tempo focado!
        </p>
      </div>
    </main>
  );
}

export default AprovacoesPage;
