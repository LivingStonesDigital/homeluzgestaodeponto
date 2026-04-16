"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { Calendar, Clock, Coffee, File, LogIn, LogOut, Sunset, Timer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
    label: "Início do intervalo",
    icon: <Coffee className="h-4 w-4" />,
    color: "bg-yellow-500",
  },
  lunch_end: {
    label: "Retorno do intervalo",
    icon: <Coffee className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  work_end: {
    label: "Saída",
    icon: <Sunset className="h-4 w-4" />,
    color: "bg-red-500",
  },
};

export default function RevisoesPage() {
  const currentUser = useQuery(api.employees.currentUser, {});
  const myTimeRecords = useQuery(api.timeRecords.myTimeRecordsWithRevision, {});
  const updateRecordByEmployee = useMutation(
    api.timeRecords.updateRecordByEmployee,
  );
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [newTime, setNewTime] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const recordsWithRevision =
    myTimeRecords?.flatMap((dayGroup: any) =>
      dayGroup.records.filter((r: any) => r.status === "revision_requested"),
    ) || [];

  const handleStartEdit = (record: any) => {
    setEditingRecord(record);
    setNewTime(format(new Date(record.timestamp), "HH:mm"));
    setNewNote(record.note || "");
  };

  const handleSaveEdit = async () => {
    if (!editingRecord) return;

    setIsSaving(true);
    try {
      const [hours, minutes] = newTime.split(":").map(Number);
      const date = new Date(editingRecord.timestamp);
      date.setHours(hours, minutes, 0, 0);

      await updateRecordByEmployee({
        recordId: editingRecord._id,
        newTimestamp: date.getTime(),
        note: newNote || undefined,
      });

      toast.success("Registro atualizado com sucesso!");
      setEditingRecord(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="pt-10 px-6 max-w-md mx-auto">
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-medium uppercase tracking-widest opacity-80 mb-1">
            Status Atual
          </p>
          <h2 className="text-2xl font-bold headline">Solicitação Pendente</h2>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-sm opacity-90">
              Preencha os detalhes abaixo para revisão.
            </span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm mb-6">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1">
              Data do Evento
            </label>
            <div className="relative">
              <input
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all"
                type="date"
                value="2023-10-27"
              />
             {/* <Calendar /> */}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-3 ml-1">
              Tipo de Ajuste
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-primary bg-primary/5 text-primary"
                type="button"
              >
               <LogIn className="mb-1" />
                <span className="text-[10px] font-bold uppercase">Entrada</span>
              </button>
              <button
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-transparent bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors"
                type="button"
              >
                <Coffee className="mb-1" />
                <span className="text-[10px] font-bold uppercase">
                  Intervalo
                </span>
              </button>
              <button
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-transparent bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors"
                type="button"
              >
                <LogOut className="mb-1" />
                <span className="text-[10px] font-bold uppercase">Saída</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1">
              Horário Solicitado
            </label>
            <div className="relative">
              <input
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-bold text-lg"
                type="time"
                value="09:00"
              />
              {/* <Timer /> */}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1">
              Motivo da Solicitação
            </label>
            <select className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
              <option value="forgot">Esquecimento de registro</option>
              <option value="error">Erro no sistema/dispositivo</option>
              <option value="meeting">Reunião externa</option>
              <option value="other">Outro motivo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1">
              Evidência / Justificativa (Opcional)
            </label>
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors cursor-pointer">
              <File />
              <p className="text-xs font-medium text-on-surface-variant">
                Toque para anexar arquivos ou fotos
              </p>
              <p className="text-[10px] text-outline mt-1">
                PDF, JPG ou PNG (Máx 5MB)
              </p>
            </div>
          </div>
        </form>
      </div>
      <button className="w-full bg-gradient-to-r from-primary to-primary-container text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-transform duration-150 headline">
        Enviar Solicitação
      </button>
      <p className="text-center text-xs text-outline mt-6 mb-12 px-8">
        Sua solicitação será encaminhada para aprovação do gestor direto e do
        setor de RH.
      </p>
    </main>
  );
}
