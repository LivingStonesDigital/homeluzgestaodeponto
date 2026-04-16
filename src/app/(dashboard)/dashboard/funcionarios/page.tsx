"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ArrowRight, Calendar, CircleCheck, Search, Users } from "lucide-react";

function page() {
  const employees = useQuery(api.employees.listEmployees);

  if (!employees) {
    return <div>Loading...</div>;
  }

  return (
    <main className="px-6 max-w-7xl mx-auto space-y-8 mt-4">
      <div className=" pb-4 max-w-7xl mx-auto  ">
        <div className="relative group">
          
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
          <input
            className="w-full shadow border border-black bg-white border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-sm"
            placeholder="Buscar por nome ou cargo..."
            type="text"
          />
        </div>
      </div>
      <section>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar scroll-smooth">
          <div className="flex-none w-40 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-3">
              <Users />
              <span className="text-xs font-bold text-outline uppercase tracking-wider">
                Total
              </span>
            </div>
            <div className="text-3xl font-extrabold text-on-surface">45</div>
          </div>
          <div className="flex-none w-40 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-3">
              <CircleCheck className="text-green-500" />
              <span className="text-xs font-bold text-outline uppercase tracking-wider">
                Ativos
              </span>
            </div>
            <div className="text-3xl font-extrabold text-on-surface">38</div>
          </div>
          <div className="flex-none w-40 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="text-red-500" />
              <span className="text-xs font-bold text-outline uppercase tracking-wider">
                Ausentes
              </span>
            </div>
            <div className="text-3xl font-extrabold text-on-surface">07</div>
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-on-surface">
            Equipe Precision
          </h2>
          <button className="text-primary text-sm font-semibold hover:underline">
            Ver todos
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 group hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
            <div className="relative">
              <img
                alt="Ricardo Mendonça"
                className="w-14 h-14 rounded-full object-cover"
                data-alt="Modern close-up portrait of a professional man with beard, soft office interior lighting, vibrant colors"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgXM-OGtRI7U9Wfak3fkPuTMi_aOiyTEAr00Hlj0nPL3PTCUpRJ7XnnoCTKlraLzRTmKa39LWaTt8Gyr0OWMdtBOVH6pf3hwmItoMvRyXE4CHlw2RNROaSKH7dba2XyzDxMWQJj_j9QOtKTWAyLsnEvF5bNE_cjQbnLG8Nt9BAf2acov1fccNa_MePnmNeQXCuJ8oITQo5xb45E0lDclWJJxmdKzPBPvs-zQmILneIGszJCDWe8m0GDKZEl20I2RUTMXrEY2aG7n0"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-tertiary border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-on-surface truncate">
                Ricardo Mendonça
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Product Designer | Design
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase rounded-full">
                Ativo
              </span>
              <ArrowRight className="text-outline" />
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 group hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
            <div className="relative">
              <img
                alt="Ana Luíza Castro"
                className="w-14 h-14 rounded-full object-cover"
                data-alt="Professional corporate headshot of a woman smiling warmly, light airy office setting with depth of field"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdmcbgjvVQ-OE2pdqYQBsVmbIbSci41MRCHqgzgfU02nzDvXbgDbzNH727iCDIGgDgognssjbdVxml6HjccuE99aMR-34lIJuMUKVJkAWQJlU5rlEAYuWEKQmMwuXDaScx8wSj205xDOy282fNA1YjfWf6K-C976TavLhmoyOiA2EXHlRs316TcqcLU5lYPVjftouWtgGudF3HFYVFnkw8wtYmMHD-2NyLLpD0ad2BAC6Pho6XfL5Pn8YacLdm8FmOmccY9MHHuh4"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-error border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-on-surface truncate">
                Ana Luíza Castro
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Fullstack Dev | Tech
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-error/10 text-error text-[10px] font-bold uppercase rounded-full">
                Ausente
              </span>
             <ArrowRight className="text-outline" />
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 group hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
            <div className="relative">
              <img
                alt="Marcelo Silva"
                className="w-14 h-14 rounded-full object-cover"
                data-alt="Candid shot of a young professional male looking away, modern minimal studio lighting with blue tint"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYsIUkrYDHlD-PQskSSs-cIU0UGG4tmW-sJ8A0xQl23ZFCjnYphAPUwDyk3l6Rgzk0tHcPc0uOZZ0QoldtStk7LbB0pQLkiZDekh2G3cFperZ3RY5Q960d7_ty0gu_GRCMxVw2hnGK87fRLByqJN6-8MTw1d1RP9_bUE2rt85tpNx5WDVqHJZBzBsIVFE9TbYZ5OsCl5gGHRGGjqed71zvfP_go4RH0pyBoxaIILfD2sVGKNvmouolMSQh4M3DzgCfljluUdht8qI"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-on-surface truncate">
                Marcelo Silva
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Project Manager | Ops
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                Em Pausa
              </span>
              <ArrowRight className="text-outline" />
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 group hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
            <div className="relative">
              <img
                alt="Beatriz Costa"
                className="w-14 h-14 rounded-full object-cover"
                data-alt="Confident woman in professional attire, cinematic corporate lighting with a soft blue and grey color palette"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrsSNMwEjm1LH-tKFbBUpc9KYJAvDW9YWZ4zee8zw25yAYBUpisOgo7C2IGjpmY2WDECpcLv8SiVbxcdTsMCnvRzV21ZzUC8aFLYmpECDGMxFTkzDjw-emJc8uTHfNt3p8zO9DNt3j8KlnqMH7SM-DR5EFPtrjQQAiVnoRrFfqiTlVANmgjza4l1_5I9rttmP6cSl-0qGYDLiLwTziYgbqV9HY4mFP1fAsmO-csOtQDjWzOuiBdmf17wiH4XKYoFsq7z-flwDiMH4"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-tertiary border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-on-surface truncate">
                Beatriz Costa
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Head of HR | People
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase rounded-full">
                Ativo
              </span>
              <ArrowRight className="text-outline" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary bg-gradient-to-br from-[#00488d] to-[#005fb8] p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-1">
                Visão Geral Mensal
              </h4>
              <p className="text-2xl font-extrabold font-headline">
                94% Produtividade
              </p>
            </div>
            {/* <span
              className="material-symbols-outlined text-white/30 text-4xl"
              data-icon="trending_up"
            >
              trending_up
            </span> */}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-300"></div>
              <div className="w-8 h-8 rounded-full bg-slate-400"></div>
              <div className="w-8 h-8 rounded-full bg-slate-500"></div>
            </div>
            <span className="text-xs font-medium text-white">
              +40 colaboradores ativos hoje
            </span>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </section>
    </main>
  );
}

export default page;
