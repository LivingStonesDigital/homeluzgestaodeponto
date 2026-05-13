"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Textarea } from "../ui/textarea";

function PedirRevicao({
  selectedIds,
  setProcessingIds,
}: {
  selectedIds: string[];
  setProcessingIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const requestRevision = useMutation(api.timeRecords.requestRevision);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestRevision = async (recordIds: string[]) => {
    const trimmedNote = note.trim();
    if (!trimmedNote) {
      toast.error("Informe o motivo da revisão.");
      return;
    }

    setIsSubmitting(true);
    setProcessingIds(new Set(recordIds));
    try {
      await Promise.all(recordIds.map(id => requestRevision({ recordId: id as any, note: trimmedNote })));
      toast.success("Revisão solicitada!");
      setNote("");
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao solicitar revisão",
      );
    } finally {
      setIsSubmitting(false);
      setProcessingIds(new Set());
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex-1 md:flex-none px-6 py-3 bg-amber-300 rounded-xl font-bold text-sm hover:bg-error/5 transition-colors active:scale-95 duration-150 disabled:opacity-50">
          Pedir Revisão
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedir Revisão</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-on-surface-variant">
          Insira o motivo para solicitar a revisão dos registros selecionados.
        </p>
        <Textarea
          className="mt-4 h-40"
          onChange={(event) => setNote(event.target.value)}
          placeholder="Motivo"
          value={note}
        />
        <div className="mt-4 flex gap-2">
          <button
            disabled={isSubmitting || !note.trim()}
            onClick={() => handleRequestRevision(selectedIds)}
            className="flex-1 px-6 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PedirRevicao;
