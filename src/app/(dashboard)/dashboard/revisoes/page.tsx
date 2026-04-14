"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Loader2, Clock, Coffee, Sunset, AlertCircle } from "lucide-react";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

const typeConfig: Record<TimeType, { label: string; icon: React.ReactNode; color: string }> = {
  work_start: { label: "Entrada", icon: <Clock className="h-4 w-4" />, color: "bg-green-500" },
  lunch_start: { label: "Início do intervalo", icon: <Coffee className="h-4 w-4" />, color: "bg-yellow-500" },
  lunch_end: { label: "Retorno do intervalo", icon: <Coffee className="h-4 w-4" />, color: "bg-blue-500" },
  work_end: { label: "Saída", icon: <Sunset className="h-4 w-4" />, color: "bg-red-500" },
};

export default function RevisoesPage() {
  const currentUser = useQuery(api.employees.currentUser);
  const myTimeRecords = useQuery(api.timeRecords.myTimeRecordsWithRevision);
  const updateRecordByEmployee = useMutation(api.timeRecords.updateRecordByEmployee);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [newTime, setNewTime] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const recordsWithRevision = myTimeRecords?.flatMap((dayGroup: any) =>
    dayGroup.records.filter((r: any) => r.status === "revision_requested")
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Revisões Solicitadas</h1>
        <Badge variant="outline" className="text-orange-500 border-orange-500">
          {recordsWithRevision.length} registro{recordsWithRevision.length !== 1 ? "s" : ""} para revisar
        </Badge>
      </div>

      {recordsWithRevision.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma revisão solicitada.</p>
            <p className="text-sm">Seus registros estão em dia!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {recordsWithRevision.map((record: any) => {
            const config = typeConfig[record.type as TimeType];
            
            return (
              <Card key={record._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className={`p-2 rounded-full ${config.color} text-white`}>
                        {config.icon}
                      </div>
                      {config.label}
                    </CardTitle>
                    <Badge variant="outline" className="text-orange-500 border-orange-500">
                      Revisão solicitada
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Data</p>
                      <p className="font-medium">
                        {format(new Date(record.date), "dd/MM/yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Horário atual</p>
                      <p className="font-medium">
                        {format(new Date(record.timestamp), "HH:mm")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Motivo da revisão</p>
                      <p className="font-medium text-orange-600">
                        {record.note || "Sem observação"}
                      </p>
                    </div>
                  </div>

                  {editingRecord?._id === record._id ? (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Novo horário
                        </label>
                        <Input
                          type="time"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="max-w-[200px]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Observação (opcional)
                        </label>
                        <Input
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Justificativa para a mudança..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveEdit}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Salvando...
                            </>
                          ) : (
                            "Salvar"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingRecord(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => handleStartEdit(record)}>
                      Editar Registro
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}