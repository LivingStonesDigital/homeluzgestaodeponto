"use client";

import BottomBar from "@/components/bottom-bar";
import Navbar from "@/components/navbar";
import { ChartColumnStacked } from "@hugeicons/core-free-icons";
import {
  Calendar,
  ChartColumnStackedIcon,
  Check,
  Coffee,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";
import React, { useState, useMemo, useCallback, useDeferredValue } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  format,
  parseISO,
  startOfWeek,
  addDays,
  eachDayOfInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import PedirRevicao from "@/components/modals/pedir-revicao";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

type StatusType = "present" | "on_break" | "absent" | "finished";

const statusConfig: Record<
  StatusType,
  { label: string; icon: React.ReactNode; bgColor: string; textColor: string }
> = {
  present: {
    label: "Presente",
    icon: <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>,
    bgColor: "bg-primary/10",
    textColor: "text-primary",
  },
  on_break: {
    label: "Em Intervalo",
    icon: <Coffee className="size-4" />,
    bgColor: "bg-tertiary/10",
    textColor: "text-tertiary",
  },
  absent: {
    label: "Ausente",
    icon: <Calendar className="size-4" />,
    bgColor: "bg-error/10",
    textColor: "text-error",
  },
  finished: {
    label: "Finalizado",
    icon: <Check className="size-4" />,
    bgColor: "bg-secondary-container",
    textColor: "text-on-secondary-container",
  },
};

function page() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return format(today, "yyyy-MM-dd");
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);

  // Estados para seleção de mês e ano - lazy initialization
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState(() =>
    new Date().getFullYear(),
  );
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Estados para modais de ação
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lista de meses em português
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Lista de anos (atual - 5 até atual + 5)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Função auxiliar para criar data a partir de string yyyy-MM-dd no timezone local
  const parseLocalDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Dias da semana baseados no selectedDate (não no mês/ano selecionados)
  const weekStart = startOfWeek(parseLocalDate(selectedDate), {
    weekStartsOn: 0,
  });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  const today = new Date();
  const isToday = (day: Date) => {
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (day: Date) => {
    const selected = parseLocalDate(selectedDate);
    return (
      day.getDate() === selected.getDate() &&
      day.getMonth() === selected.getMonth() &&
      day.getFullYear() === selected.getFullYear()
    );
  };

  // Atualiza selectedDate quando mês ou ano mudam
  const handleMonthYearChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    // Mantém o mesmo dia se possível, senão vai para o último dia do mês
    const currentSelectedDate = parseLocalDate(selectedDate);
    const newDate = new Date(
      year,
      month,
      Math.min(
        currentSelectedDate.getDate(),
        new Date(year, month + 1, 0).getDate(),
      ),
    );
    setSelectedDate(format(newDate, "yyyy-MM-dd"));
  };

  const allRecordsByDate = useQuery(api.timeRecords.allRecordsByDate, {
    date: selectedDate,
    department: selectedDepartment || undefined,
    search: searchQuery || undefined,
  });

  const allDepartments = useQuery(api.timeRecords.allDepartments);

  // Mutations
  const setRevisionPermission = useMutation(
    api.timeRecords.setRevisionPermission,
  );

  const records = allRecordsByDate || [];

  // Calcula estatísticas - memoized
  const stats = useMemo(() => {
    const totalEmployees = records.length;
    const presentCount = records.filter(
      (r) =>
        r.status === "present" ||
        r.status === "on_break" ||
        r.status === "finished",
    ).length;
    const onBreakCount = records.filter((r) => r.status === "on_break").length;
    const absentCount = records.filter((r) => r.status === "absent").length;
    const presentPercentage =
      totalEmployees > 0
        ? Math.round((presentCount / totalEmployees) * 100)
        : 0;

    return {
      totalEmployees,
      presentCount,
      onBreakCount,
      absentCount,
      presentPercentage,
    };
  }, [records]);

  const formatTime = useCallback((timestamp?: number) => {
    if (!timestamp) return "--:--";
    return format(new Date(timestamp), "HH:mm");
  }, []);

  const getInitials = useCallback((name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const getAvatarColor = useCallback((name: string) => {
    const colors = [
      "bg-primary-fixed",
      "bg-tertiary-fixed",
      "bg-secondary-fixed",
      "bg-error-fixed",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }, []);

  // Handler para liberar edição
  const handleReleaseEditing = async () => {
    if (!selectedRecordId) return;

    // Find the record by checking if any of the time record IDs match
    const record = records.find(
      (r) =>
        r.workStart?._id === selectedRecordId ||
        r.workEnd?._id === selectedRecordId ||
        r.lunchStart?._id === selectedRecordId ||
        r.lunchEnd?._id === selectedRecordId,
    );
    if (!record) return;

    setIsSubmitting(true);
    try {
      await setRevisionPermission({
        userId: record.user._id as any,
        date: selectedDate,
        enabled: true,
      });
      toast.success("Edição liberada com sucesso!");
      setShowReleaseModal(false);
      setSelectedRecordId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao liberar edição",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para navegar entre dias
  const navigateDate = (days: number) => {
    const newDate = parseLocalDate(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    const newDateStr = format(newDate, "yyyy-MM-dd");
    setSelectedDate(newDateStr);
    // Atualiza mês e ano para manter sincronia
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  // Função para navegar entre semanas
  const navigateWeek = (weeks: number) => {
    const newDate = parseLocalDate(selectedDate);
    newDate.setDate(newDate.getDate() + weeks * 7);
    const newDateStr = format(newDate, "yyyy-MM-dd");
    setSelectedDate(newDateStr);
    // Atualiza mês e ano para manter sincronia
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  // Função para ir para hoje
  const goToToday = () => {
    const today = new Date();
    setSelectedDate(format(today, "yyyy-MM-dd"));
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  };

  return (
    <main className="bg-surface dark:bg-zinc-900 text-on-background min-h-screen pb-24">
      <section className="pt-12 px-6 max-md:px-4 max-w-md mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="md:col-span-2 p-6 rounded-3xl bg-primary-container dark:bg-blue-700 text-white flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <span className="text-white font-medium text-sm">
                Resumo do Dia
              </span>
              <h2 className="text-4xl font-extrabold mt-2 tracking-tight">
                {stats.presentPercentage}% Presentes
              </h2>
              <p className="text-white mt-4 text-sm max-w-[200px]">
                {stats.presentCount} de {stats.totalEmployees} colaboradores
                ativos no turno atual.
              </p>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
              <ChartColumnStackedIcon className="size-40" />
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-zinc-800 flex flex-col justify-between">
            <span className="text-on-surface-variant dark:text-white text-sm font-medium">
              Em Intervalo
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-tertiary dark:text-[var(--custom-bg-primary)]">
                {String(stats.onBreakCount).padStart(2, "0")}
              </span>
              <span className="text-on-surface-variant dark:text-white text-xs">
                pessoas
              </span>
            </div>
            <div className="h-1 bg-surface-container dark:bg-zinc-800 mt-4 rounded-full overflow-hidden">
              <div
                className="bg-tertiary dark:bg-[var(--custom-bg-primary)] h-full"
                style={{
                  width: `${stats.totalEmployees > 0 ? (stats.onBreakCount / stats.totalEmployees) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-zinc-800 flex flex-col justify-between">
            <span className="text-on-surface-variant text-sm font-medium">
              Ausências
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-error">
                {String(stats.absentCount).padStart(2, "0")}
              </span>
              <span className="text-on-surface-variant text-xs">pessoas</span>
            </div>
            <div className="h-1 bg-surface-container dark:bg-zinc-800 mt-4 rounded-full overflow-hidden">
              <div
                className="bg-error h-full"
                style={{
                  width: `${stats.totalEmployees > 0 ? (stats.absentCount / stats.totalEmployees) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <section className="mb-8 space-y-4">
          {/* Dropdowns de Mês e Ano */}
          <div className="flex items-center gap-4 mb-4">
            {/* Dropdown de Mês */}
            <div className="relative">
              <button
                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest dark:bg-zinc-800 rounded-xl border border-outline-variant/10 hover:bg-surface-container-low dark:hover:bg-zinc-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span className="font-semibold text-on-surface dark:text-white">
                  {months[selectedMonth]}
                </span>
              </button>
              {showMonthDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-surface-container-lowest dark:bg-zinc-800 rounded-xl shadow-lg border border-outline-variant/10 py-2 z-10 max-h-60 overflow-y-auto">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => {
                        handleMonthYearChange(index, selectedYear);
                        setShowMonthDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-surface-container-low dark:hover:bg-zinc-700 transition-colors ${
                        selectedMonth === index
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-on-surface dark:text-white"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown de Ano */}
            <div className="relative">
              <button
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest dark:bg-zinc-800 rounded-xl border border-outline-variant/10 hover:bg-surface-container-low dark:hover:bg-zinc-700 transition-colors"
              >
                <span className="font-semibold text-on-surface dark:text-white">
                  {selectedYear}
                </span>
              </button>
              {showYearDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-surface-container-lowest dark:bg-zinc-800 rounded-xl shadow-lg border border-outline-variant/10 py-2 z-10 max-h-60 overflow-y-auto">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        handleMonthYearChange(selectedMonth, year);
                        setShowYearDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-surface-container-low dark:hover:bg-zinc-700 transition-colors ${
                        selectedYear === year
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-on-surface dark:text-white"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dias da Semana com Navegação */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 rounded-xl bg-surface-container-lowest dark:bg-zinc-800 hover:bg-surface-container-low dark:hover:bg-zinc-700 transition-colors"
              title="Semana anterior"
            >
              <ChevronLeft className="w-5 h-5 text-on-surface dark:text-white" />
            </button>
            <div className="flex-1 grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <button
                  key={day.toISOString()}
                  onClick={() => {
                    setSelectedDate(format(day, "yyyy-MM-dd"));
                    setSelectedMonth(day.getMonth());
                    setSelectedYear(day.getFullYear());
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                    isSelectedDate(day)
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : isToday(day)
                        ? "bg-primary/20 text-primary dark:bg-primary/30 dark:text-white"
                        : "bg-surface-container-lowest dark:bg-zinc-800 hover:bg-surface-container-low dark:hover:bg-zinc-700 text-on-surface dark:text-white"
                  }`}
                >
                  <span className="text-[10px] font-medium uppercase mb-1">
                    {format(day, "EEE", { locale: ptBR }).slice(0, 3)}
                  </span>
                  <span className="text-sm font-bold">{format(day, "dd")}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 rounded-xl bg-surface-container-lowest dark:bg-zinc-800 hover:bg-surface-container-low dark:hover:bg-zinc-700 transition-colors"
              title="Próxima semana"
            >
              <ChevronRight className="w-5 h-5 text-on-surface dark:text-white" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-zinc-800 dark:text-zinc-500" />
              </div>
              <input
                className="w-full dark:placeholder:text-zinc-500 dark:text-zinc-300 bg-surface-container-low dark:bg-zinc-800 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-outline"
                placeholder="Buscar colaborador ou cargo..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-12 px-8 py-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            <div className="col-span-5">Colaborador</div>
            <div className="col-span-2">Entrada</div>
            <div className="col-span-2">Saída</div>
            <div className="col-span-3 text-right">Status</div>
          </div>
          {records.map((record) => {
            const status = statusConfig[record.status as StatusType];
            return (
              <div
                key={record.user._id}
                className={`bg-surface-container-lowest rounded-3xl p-4 md:px-8 md:py-6 transition-all hover:scale-[1.01] hover:shadow-xl shadow-sm border border-outline-variant/10 ${
                  record.status === "absent" ? "opacity-70" : ""
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="col-span-5 flex items-start gap-4">
                      <div
                        className={cn(`w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-amber-400`)}
                      >
                        <span className="text-white font-bold text-sm">
                          {getInitials(record.user.name)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface">
                          {record.user.name}
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                          {record.user.department || "Sem departamento"}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-start gap-4 md:block">
                      <div className="flex gap-2  items-center">
                        <span className="text-xs font-medium text-on-surface-variant md:hidden">
                          Entrada
                        </span>
                        <span className="font-bold text-on-surface">
                          {formatTime(record.workStart?.timestamp)}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center ">
                        <span className="text-xs font-medium text-on-surface-variant md:hidden">
                          Saída
                        </span>
                        <span className="font-medium text-outline">
                          {formatTime(record.workEnd?.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex flex-col md:block"></div>
                  <div>
                    <div className="col-span-3 flex justify-between md:justify-end items-center">
                      <span className="text-xs font-medium text-on-surface-variant md:hidden">
                        Status
                      </span>
                      <div
                        className={`flex items-center gap-2 ${status.bgColor} ${status.textColor} px-4 py-2 rounded-full`}
                      >
                        {status.icon}
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-12 flex gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => {
                          // Use the workStart record ID if available, otherwise workEnd
                          const recordId =
                            record.workStart?._id ||
                            record.workEnd?._id ||
                            record.lunchStart?._id ||
                            record.lunchEnd?._id;
                          if (recordId) {
                            setSelectedRecordId(recordId);
                            setShowReleaseModal(true);
                          }
                        }}
                        className="flex-1 md:flex-none px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm hover:bg-primary/20 transition-colors active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Liberar Edição
                      </button>


                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {records.length === 0 && (
            <div className="bg-surface-container-lowest rounded-3xl p-8 text-center">
              <div className="flex items-center justify-center gap-3 text-on-surface-variant">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-semibold italic">
                  Nenhum registro encontrado
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Liberar Edição */}
        <Dialog open={showReleaseModal} onOpenChange={setShowReleaseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Liberar Edição</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-on-surface-variant">
              Tem certeza que deseja liberar a edição do horário de ponto para
              este funcionário nesta data?
            </p>
            <p className="text-xs text-on-surface-variant mt-2">
              O funcionário poderá solicitar correções para seus registros
              aprovados.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                disabled={isSubmitting}
                onClick={handleReleaseEditing}
                className="flex-1 px-6 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Liberando..." : "Liberar Edição"}
              </button>
              <button
                onClick={() => {
                  setShowReleaseModal(false);
                  setSelectedRecordId(null);
                }}
                className="px-6 py-3 bg-surface-container-low dark:bg-zinc-800 rounded-xl font-bold text-sm hover:bg-surface-container-low dark:hover:bg-zinc-700 transition-colors active:scale-95 duration-150"
              >
                Cancelar
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Solicitar Revisão */}
        {/* <PedirRevicao
          selectedIds={selectedIds}
          setProcessingIds={setProcessingIds}
        /> */}
      </section>
    </main>
  );
}

export default page;
