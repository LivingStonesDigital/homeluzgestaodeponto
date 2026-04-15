import BottomBar from "@/components/bottom-bar";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ChevronRight, HelpCircle, HelpCircleIcon, IdCard, LogOut, Mail, MessageCircleQuestion, Palette, Pencil, ShieldCheck, User2 } from "lucide-react";

function page() {
  return (
    <main className="bg-surface text-on-surface min-h-screen pb-32">
      <section className="pt-14 px-6 max-w-md mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-blue-500 mb-4">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-surface-container-lowest">
                <img
                  alt="João Silva"
                  className="w-full h-full object-cover"
                  data-alt="Professional studio portrait of a middle-aged man with short hair wearing a clean white shirt against a neutral background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgaONO1oCU_o50KuaJKb3iCFjB4BE5Vc4pwe0DnZBHogbEKCxpQKy3DB3wlbiG0Ks31u4m8VOGZD-fGYl9abHbf4RhOpwTBl_QjWljaedWcTWOO8tJTFMghESS96SiKIFhzuDH4w-f-ut9d6PuJUB9szTQ3ZFhqgq7WkOoc0sfoghgMNfNCsWGD_4qkUCjwvKLl6t4zzkEznb2JAbXz_8pBSgf1rZXaPj4sQ2yRWvvLjXWJcUu7szoYoLobeqehpavl_KOlskO82k"
                />
              </div>
            </div>
            <button className="absolute bottom-4 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">
            João Silva
          </h1>
          <p className="text-on-surface-variant font-medium">Analista de RH</p>
        </div>
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4 px-1">
            Dados Pessoais
          </h2>
          <div className="bg-surface-container-lowest rounded-xl p-1 overflow-hidden">
            <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
               <User2 />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">
                  Nome Completo
                </p>
                <p className="text-on-surface font-medium">
                  João Paulo da Silva
                </p>
              </div>
              <ChevronRight className="opacity-50" />
            </div>
            <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Mail />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">
                  E-mail Corporativo
                </p>
                <p className="text-on-surface font-medium">
                  joao.silva@empresa.com
                </p>
              </div>
              <ChevronRight className="opacity-50" />
            </div>
            <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <IdCard   />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">
                  ID do Funcionário
                </p>
                <p className="text-on-surface font-medium">#882910-A</p>
              </div>
             <ChevronRight className="opacity-50" />
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4 px-1">
            Configurações da Conta
          </h2>
          <div className="bg-surface-container-lowest rounded-xl p-1 overflow-hidden">
            <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <ShieldCheck />
              </div>
              <div className="flex-1">
                <p className="text-on-surface font-semibold">
                  Segurança e Senha
                </p>
              </div>
               <ChevronRight className="opacity-50" />
            </div>
            <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
               <Palette />
              </div>
              <div className="flex-1">
                <p className="text-on-surface font-semibold">Aparência</p>
              </div>
              
              <ChevronRight className="opacity-50" />
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4 px-1">
            Suporte
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-colors group cursor-pointer">
              <HelpCircleIcon />
              <span className="text-sm font-bold text-on-surface">
                Central de Ajuda
              </span>
            </div>
            {/* <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-colors group cursor-pointer">
              <MessageCircleQuestion />
              <span className="text-sm font-bold text-on-surface">
                Falar com TI
              </span>
            </div> */}
          </div>
        </section>
        <Button variant={'destructive'} size={'lg'} className="w-full py-4 flex items-center justify-center gap-2  transition-all active:scale-[0.98] mb-8">
          <LogOut />
          Sair da Conta
        </Button>
      </section>
    </main>
  );
}

export default page;
