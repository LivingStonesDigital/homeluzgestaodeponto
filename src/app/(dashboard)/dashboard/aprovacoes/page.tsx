import { Badge } from "@/components/ui/badge";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

function AprovacoesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Canvas */}
      <main className="flex-1 p-4 rounded-2xl bg-surface">
        {/* Header Section */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary headline-font mb-2">
              Aprovações da Equipe
            </h1>
            <p className="text-on-surface-variant font-medium">
              Review and validate employee time records for the current period.
            </p>
          </div>
          <div className="flex space-x-3 ">
            <div className="bg-surface-container-low rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium text-secondary">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="filter_list"
              >
                filter_list
              </span>
              <span>Department: All</span>
            </div>
            <div className="bg-surface-container-low rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium text-secondary">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="date_range"
              >
                date_range
              </span>
              <span>Oct 1 - Oct 15</span>
            </div>
          </div>
        </header>
        {/* Summary Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="col-span-1 bg-surface-container-lowest p-8 rounded-xl shadow-sm shadow-blue-900/5 border-l-4 border-primary transition-all hover:scale-[1.02]">
            <span className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-4 block">
              Total Pending Approvals
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-primary headline-font">
                24
              </span>
              <span className="text-sm font-bold text-premium-gold-dark bg-premium-gold-light/50 border border-premium-gold/30 px-2 py-0.5 rounded-md">
                +5 today
              </span>
            </div>
          </div>
          <div className="max-w-[28rem] col-span-2 bg-primary-container p-8 rounded-xl shadow-sm overflow-hidden relative group">
            <div className="relative z-10 flex h-full items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary-fixed/60 uppercase tracking-widest mb-4 block">
                  Last Period Summary
                </span>
                <div className="flex gap-12">
                  <div>
                    <span className="block text-2xl font-bold text-white headline-font">
                      1,240h
                    </span>
                    <span className="text-xs text-primary-fixed/80">
                      Approved Hours
                    </span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white headline-font">
                      98.2%
                    </span>
                    <span className="text-xs text-primary-fixed/80">
                      Accuracy Rate
                    </span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white headline-font">
                      12m
                    </span>
                    <span className="text-xs text-primary-fixed/80">
                      Avg. Approval Time
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-container to-blue-900 opacity-90"></div>
          </div>
        </section>
        {/* Request List */}
        <section className="space-y-6">
          <h3 className="headline-font font-bold text-on-surface-variant uppercase tracking-widest text-xs mb-6">
            Aprovações Pendentes
          </h3>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="w-full group bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-12 h-12 rounded-full bg-secondary-container overflow-hidden ring-2 ring-surface-container">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Portrait of a young female employee with glasses and a friendly expression in a modern professional setting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHugjy9V-1QlANggQ3iTZ9uYrE79xsr3EkdDJc7RANIVKu5cNmHaofGpo_NM7QDHaxBUUAC64EiJoKrFtzH9_QQhb-IsUG5Tu3t-khD4tKEhlnNakZju_bM8ID_7bOHLx2G9-ycwRlqEgWiVoOetdH5FKaNWlCJVvrz9_mrGN-JUA9XdcJgB-xee6PFUkyXlZgObSKokAdN4NFXAr-WPnt2XbVJu39Ynfz1dnQzbbsTnXyZkzwcyFKp6cjtnLfb28l9BneZ8VLFhY"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary headline-font">
                        Sofia Martins
                      </h4>
                      <p className="text-xs text-on-surface-variant font-medium">
                        Design Department
                      </p>
                    </div>
                    <div className="ml-12">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        Date
                      </span>
                      <span className="text-sm font-semibold text-on-surface">
                        Oct 12, 2023
                      </span>
                    </div>
                    <div className="ml-12">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        Requested Hours
                      </span>
                      <span className="text-sm font-black text-primary">
                        08:45h
                      </span>
                    </div>
                    <div className="ml-12 flex-1 max-w-xs">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        Note
                      </span>
                      <span className="text-sm text-on-surface-variant truncate block italic">
                        "Completed final revisions for Project Chronos
                        branding."
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low text-primary text-sm font-bold hover:bg-surface-container-high transition-colors">
                      <MoreHorizontal />
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-surface-container-low/50 px-24 py-8 border-t border-outline-variant/10 flex flex-col  justify-between">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-b-2 border-premium-gold/30">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Check-In
                      </span>
                      <span className="text-lg font-bold text-primary headline-font">
                        08:15 AM
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Break Start
                      </span>
                      <span className="text-lg font-bold text-slate-600 headline-font">
                        12:30 PM
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Break End
                      </span>
                      <span className="text-lg font-bold text-slate-600 headline-font">
                        01:30 PM
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-b-2 border-premium-gold/30">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Check-Out
                      </span>
                      <span className="text-lg font-bold text-primary headline-font">
                        07:45 PM
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-x-4 items-center justify-center mt-4">
                    <Button variant="destructive" className="px-4 py-2 rounded-lg ">
                      Rejeitar
                    </Button>
                    <Button className="px-6 py-2 rounded-xl ">
                      Approve
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
}

export default AprovacoesPage;

{
  /* Request Item 1 */
}
// <div className="group bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5">
//   <div className="flex items-center gap-6 flex-1">
//     <div className="w-12 h-12 rounded-full bg-secondary-container overflow-hidden ring-2 ring-surface-container">
//       <img
//         className="w-full h-full object-cover"
//         data-alt="Portrait of a young female employee with glasses and a friendly expression in a modern professional setting"
//         src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHugjy9V-1QlANggQ3iTZ9uYrE79xsr3EkdDJc7RANIVKu5cNmHaofGpo_NM7QDHaxBUUAC64EiJoKrFtzH9_QQhb-IsUG5Tu3t-khD4tKEhlnNakZju_bM8ID_7bOHLx2G9-ycwRlqEgWiVoOetdH5FKaNWlCJVvrz9_mrGN-JUA9XdcJgB-xee6PFUkyXlZgObSKokAdN4NFXAr-WPnt2XbVJu39Ynfz1dnQzbbsTnXyZkzwcyFKp6cjtnLfb28l9BneZ8VLFhY"
//       />
//     </div>
//     <div>
//       <h4 className="font-bold text-primary headline-font">
//         Sofia Martins
//       </h4>
//       <p className="text-xs text-on-surface-variant font-medium">
//         Design Department
//       </p>
//     </div>
//     <div className="ml-12">
//       <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
//         Date
//       </span>
//       <span className="text-sm font-semibold text-on-surface">
//         Oct 12, 2023
//       </span>
//     </div>
//     <div className="ml-12">
//       <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
//         Requested Hours
//       </span>
//       <span className="text-sm font-black text-primary">
//         08:45h
//       </span>
//     </div>
//     <div className="ml-12 flex-1 max-w-xs">
//       <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
//         Note
//       </span>
//       <span className="text-sm text-on-surface-variant truncate block italic">
//         "Completed final revisions for Project Chronos branding."
//       </span>
//     </div>
//   </div>
//   <div className="flex items-center gap-3">
//     <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low text-primary text-sm font-bold hover:bg-surface-container-high transition-colors">
//       <span
//         className="material-symbols-outlined text-lg"
//         data-icon="visibility"
//       >
//         visibility
//       </span>
//       Details
//     </button>
//     <button className="px-4 py-2 rounded-lg border border-error/20 text-error text-sm font-bold hover:bg-error/5 transition-colors">
//       Reject
//     </button>
//     <button className="px-6 py-2 rounded-xl bg-amber-300 text-white text-sm font-bold shadow-sm active:scale-95 duration-200">
//       Approve
//     </button>
//   </div>
// </div>

{
  /* Request Item 4 (Expanded View Mockup) */
}
// <div className="bg-surface-container-lowest rounded-xl overflow-hidden border-l-4 border-premium-gold">
//   <div className="p-6 flex items-center justify-between">
//     <div className="flex items-center gap-6 flex-1">
//       <div className="w-12 h-12 rounded-full bg-secondary-container overflow-hidden ring-2 ring-surface-container">
//         <img
//           className="w-full h-full object-cover"
//           data-alt="Senior male executive with a professional demeanor and thoughtful expression in a corporate environment"
//           src="https://lh3.googleusercontent.com/aida-public/AB6AXuBggAHppx3cWF5D-hSD_iHJWs8qYaTtghSElNZxRkepcieNNO8oZ5bF9dBpQV9fZxs7h6fzaUeni8PEEihQB5GHKJjUrqVadqr60F7DIH4i6jmS7yYOEU1XyHTxrplSP-f1ttGI3gd9tTyacMVwB1aavfbwcy0CHpBKsetrEZx7EKh-HEtiZpirY4bW7h35eMJ4PIE68rr56rNxWVEbqMA7IiwRnck6f2itPVHojTGzUzz8Rj3s5To4GNAWeRUqxwoFIxjNYS7_pnE"
//         />
//       </div>
//       <div>
//         <h4 className="font-bold text-primary headline-font">
//           Marcos Oliveira
//         </h4>
//         <p className="text-xs text-on-surface-variant font-medium">
//           Sales Management
//         </p>
//       </div>
//       <div className="ml-12">
//         <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
//           Date
//         </span>
//         <span className="text-sm font-semibold text-on-surface">
//           Oct 11, 2023
//         </span>
//       </div>
//       <div className="ml-12">
//         <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
//           Requested Hours
//         </span>
//         <span className="text-sm font-black text-primary">
//           10:30h
//         </span>
//       </div>
//       <div className="ml-12 flex-1 max-w-xs">
//         <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter">
//           Note
//         </span>
//         <span className="text-sm text-on-surface-variant truncate block italic">
//           "Client dinner and quarterly planning session."
//         </span>
//       </div>
//     </div>
//     <div className="flex items-center gap-3">
//       <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-primary text-sm font-bold">
//         <span
//           className="material-symbols-outlined text-lg"
//           data-icon="expand_less"
//         >
//           expand_less
//         </span>
//         Hide Logs
//       </button>
//       <button className="px-4 py-2 rounded-lg border border-error/20 text-error text-sm font-bold">
//         Reject
//       </button>
//       <button className="px-6 py-2 rounded-xl bg-linear-to-br from-tertiary-container to-on-tertiary-container text-white text-sm font-bold shadow-sm active:scale-95 duration-200">
//         Approve
//       </button>
//     </div>
//   </div>
//   {/* Detailed Entry/Exit Logs */}
//   <div className="bg-surface-container-low/50 px-24 py-8 border-t border-outline-variant/10">
//     <div className="grid grid-cols-4 gap-4 text-center">
//       <div className="bg-white p-4 rounded-lg shadow-sm border-b-2 border-premium-gold/30">
//         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
//           Check-In
//         </span>
//         <span className="text-lg font-bold text-primary headline-font">
//           08:15 AM
//         </span>
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow-sm">
//         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
//           Break Start
//         </span>
//         <span className="text-lg font-bold text-slate-600 headline-font">
//           12:30 PM
//         </span>
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow-sm">
//         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
//           Break End
//         </span>
//         <span className="text-lg font-bold text-slate-600 headline-font">
//           01:30 PM
//         </span>
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow-sm border-b-2 border-premium-gold/30">
//         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
//           Check-Out
//         </span>
//         <span className="text-lg font-bold text-primary headline-font">
//           07:45 PM
//         </span>
//       </div>
//     </div>
//   </div>
// </div>
