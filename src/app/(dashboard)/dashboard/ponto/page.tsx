"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Loader2,
  Clock,
  Coffee,
  Sunset,
  CheckCircle,
  User,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

const typeConfig: Record<
  TimeType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  work_start: {
    label: "Entrada",
    icon: <ArrowUp className="h-4 w-4" />,
    color: "bg-primary",
  },
  lunch_start: {
    label: "Início do intervalo",
    icon: <ArrowDown className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  lunch_end: {
    label: "Retorno do intervalo",
    icon: <ArrowUp className="h-4 w-4" />,
    color: "bg-primary",
  },
  work_end: {
    label: "Saída",
    icon: <ArrowDown className="h-4 w-4" />,
    color: "bg-blue-500",
  },
};

const statusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "approved" | "destructive";
    color: "bg-green-500" | "bg-yellow-500" | "bg-red-500" | "bg-orange-500";
  }
> = {
  pending: {
    label: "Pendente",
    variant: "default" as const,
    color: "bg-yellow-500",
  },
  approved: {
    label: "Aprovado",
    variant: "approved" as const,
    color: "bg-green-500",
  },
  rejected: {
    label: "Rejeitado",
    variant: "destructive" as const,
    color: "bg-red-500",
  },
  revision_requested: {
    label: "Revisão solicitada",
    variant: "default" as const,
    color: "bg-orange-500",
  },
};

export default function PontoPage() {
  const currentUser = useQuery(api.employees.currentUser);
  const allUsers = useQuery(api.employees.listAllUsers);
  const todayStatus = useQuery(api.timeRecords.todayStatus);
  const myTimeRecords = useQuery(api.timeRecords.myTimeRecords, { limit: 10 });
  const registerTime = useMutation(api.timeRecords.registerTime);

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  const handleRegister = async (type: TimeType) => {
    setIsRegistering(true);
    try {
      const userId =
        isAdmin && selectedUserId && selectedUserId !== "self"
          ? selectedUserId
          : undefined;
      await registerTime({
        type,
        userId: userId as any,
      });
      toast.success("Ponto registrado com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao registrar ponto",
      );
    } finally {
      setIsRegistering(false);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bater Ponto</h1>
        <Badge
          variant={isComplete ? "default" : "outline"}
          className={isComplete ? "bg-green-500" : ""}
        >
          {isComplete ? "Dia completo" : "Em andamento"}
        </Badge>
      </div>

      {/* Admin: Select Employee */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Registrar ponto para outro funcionário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um funcionário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Próprio funcionário (eu)</SelectItem>
                {allUsers?.map((user: any) => (
                  <SelectItem key={user._id} value={user._id}>
                    {user.name} - {user.department || "Sem departamento"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedUserId && selectedUserId !== "self" && (
              <p className="text-sm text-muted-foreground mt-2">
                Registrando ponto para:{" "}
                <strong>
                  {allUsers?.find((u: any) => u._id === selectedUserId)?.name}
                </strong>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Current Day Status */}
      <Card>
        <CardHeader>
          <CardTitle>
            Hoje -{" "}
            {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayRecords && todayRecords.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {todayRecords.map((record: any) => {
                const config = typeConfig[record.type as TimeType];
                return (
                  <div
                    key={record._id}
                    className="flex flex-col items-center p-4 rounded-lg bg-muted"
                  >
                    <div
                      className={`p-2 rounded-full ${config.color} text-white mb-2`}
                    >
                      {config.icon}
                    </div>
                    <span className="text-sm font-medium">{config.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(record.timestamp), "HH:mm")}
                    </span>
                    <Badge
                      variant={statusConfig[record.status].variant as any}
                      className={cn(
                        "text-xs mt-2",
                        statusConfig[record.status].color,
                      )}
                    >
                      {statusConfig[record.status].label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Nenhum registro hoje. Comece seu dia!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Register Button */}
      {!isComplete && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground">
                Próximo registro:{" "}
                <span className="font-medium text-foreground">
                  {nextTypeLabel}
                </span>
              </p>
              <Button
                size="lg"
                onClick={() => handleRegister(nextType)}
                disabled={isRegistering}
                className="w-full max-w-md"
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Registrar {nextTypeLabel}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Registros</CardTitle>
        </CardHeader>
        <CardContent>
          {myTimeRecords && myTimeRecords.length > 0 ? (
            <div className="space-y-6">
              {myTimeRecords.map((dayGroup: any) => (
                <div key={dayGroup.date}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {format(new Date(dayGroup.date), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {dayGroup.records.map((record: any) => {
                      const config = typeConfig[record.type as TimeType];
                      return (
                        <div
                          key={record._id}
                          className="flex items-center gap-2 p-2 rounded border flex-col"
                        >
                          <div
                            className={`p-1 rounded ${config.color} text-white`}
                          >
                            {config.icon}
                          </div>
                          <div className="flex-1 text-center">
                            <p className="text-xs font-medium">
                              {config.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(record.timestamp), "HH:mm")}
                            </p>
                          </div>
                          <Badge
                            variant={statusConfig[record.status].variant as any}
                            className={cn(
                              "text-xs mt-2",
                              statusConfig[record.status].color,
                            )}
                          >
                            {statusConfig[record.status].label}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Nenhum registro encontrado.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
