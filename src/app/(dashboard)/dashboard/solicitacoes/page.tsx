import { Calendar, Clock, CloudUpload, Coffee, LogIn, LogOut } from "lucide-react";
import React from "react";

function page() {
  return (
    <main className="pt-8 px-6 max-w-md mx-auto min-h-screen">
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
              <Calendar className="absolute top-1/2 right-4 -translate-y-1/2" />
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
                <LogIn />
                <span className="text-[10px] font-bold uppercase">Entrada</span>
              </button>
              <button
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-transparent bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors"
                type="button"
              >
                <Coffee />
                <span className="text-[10px] font-bold uppercase">
                  Intervalo
                </span>
              </button>
              <button
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-transparent bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors"
                type="button"
              >
                <LogOut />
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
              <Clock className="absolute top-1/2 right-4 -translate-y-1/2" />
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
              <CloudUpload className="mb-3" />
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
        Sua solicitação será encaminhada para aprovação.
      </p>
    </main>
  );
}

export default page;
