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
import { Loader2, Check, X, AlertCircle, Clock, Coffee, Sunset } from "lucide-react";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

const typeConfig: Record<TimeType, { label: string; icon: React.ReactNode; color: string }> = {
  work_start: { label: "Entrada", icon: <Clock className="h-4 w-4" />, color: "bg-green-500" },
  lunch_start: { label: "Saída", icon: <Coffee className="h-4 w-4" />, color: "bg-yellow-500" },
  lunch_end: { label: "Entrada", icon: <Coffee className="h-4 w-4" />, color: "bg-blue-500" },
  work_end: { label: "Saída", icon: <Sunset className="h-4 w-4" />, color: "bg-red-500" },
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
      toast.error(error instanceof Error ? error.message : "Erro ao solicitar revisão");
    } finally {
      setProcessingIds(new Set());
    }
  };

  // Group records by date and user
  const groupedData = pendingRecords?.reduce((acc: any, record: any) => {
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
    ids.some(id => processingIds.has(id));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 rounded-2xl bg-surface">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">
              Aprovações da Equipe
            </h1>
            <p className="text-muted-foreground">
              Revise e valide os registros de ponto dos funcionários.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
            <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest block mb-2">
              Pendentes
            </span>
            <span className="text-3xl font-bold text-yellow-700">
              {groups.length}
            </span>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-2">
              Total Registros
            </span>
            <span className="text-3xl font-bold text-green-700">
              {totalPending}
            </span>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
              Hoje
            </span>
            <span className="text-3xl font-bold text-blue-700">
              {format(new Date(), "dd/MM", { locale: ptBR })}
            </span>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-sm">
            Registros Pendentes de Aprovação
          </h3>
          
          {groups.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum registro pendente de aprovação.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible>
              {groups.map((group: any) => (
                <AccordionItem key={`${group.date}-${group.user?._id}`} value={`${group.date}-${group.user?._id}`}>
                  <AccordionTrigger className="bg-muted/50 hover:bg-muted px-4">
                    <div className="flex items-center gap-6 flex-1 w-full">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {group.user?.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-semibold">{group.user?.name || "Funcionário"}</span>
                        {/* <span className="text-xs text-muted-foreground ml-2">
                          {group.user?.department || "Sem departamento"}
                        </span> */}
                      </div>
                      <div className="text-right">
                        <span className="text-sm">
                          {format(new Date(group.date), "dd/MM/yyyy")}
                        </span>
                      </div>
                     
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-white">
                    <div className="w-full  rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                        {(Object.keys(typeConfig) as TimeType[]).map((type) => {
                          const recordOfType = group.records.find((r: any) => r.type === type);
                          const config = typeConfig[type];
                          return (
                            <div
                              key={type}
                              className={`p-3 rounded-lg ${
                                recordOfType ? "bg-muted" : "bg-muted/30"
                              }`}
                            >
                              <div className={`inline-flex p-2 rounded-full ${config.color} text-white mb-2`}>
                                {config.icon}
                              </div>
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                                {config.label}
                              </span>
                              <span className="text-lg font-semibold">
                                {recordOfType
                                  ? format(new Date(recordOfType.timestamp), "HH:mm")
                                  : "--:--"}
                              </span>
                              {recordOfType && (
                                <Badge 
                                  variant={recordOfType.status === "approved" ? "default" : "secondary"} 
                                  className={`mt-2 text-xs ${
                                    recordOfType.status === "approved" ? "bg-green-500" : ""
                                  }`}
                                >
                                  {recordOfType.status === "approved" ? "Aprovado" : "Pendente"}
                                </Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {group.records.some((r: any) => r.note) && (
                        <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
                          <span className="font-medium">Observação: </span>
                          {group.records.find((r: any) => r.note)?.note || "Sem observações"}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => handleRequestRevision(group.records.map((r: any) => r._id))}
                        disabled={isProcessing(group.records.map((r: any) => r._id))}
                      >
                        {isProcessing(group.records.map((r: any) => r._id)) ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <AlertCircle className="h-4 w-4 mr-2" />
                        )}
                        Solicitar Revisão
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(group.records.map((r: any) => r._id))}
                        disabled={isProcessing(group.records.map((r: any) => r._id))}
                      >
                        {isProcessing(group.records.map((r: any) => r._id)) ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <X className="h-4 w-4 mr-2" />
                        )}
                        Rejeitar Todos
                      </Button>
                      <Button
                        onClick={() => handleApprove(group.records.map((r: any) => r._id))}
                        disabled={isProcessing(group.records.map((r: any) => r._id))}
                      >
                        {isProcessing(group.records.map((r: any) => r._id)) ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Check className="h-4 w-4 mr-2" />
                        )}
                        Aprovar Todos
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>
      </main>
    </div>
  );
}

export default AprovacoesPage;