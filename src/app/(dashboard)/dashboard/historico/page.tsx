import React from "react";

function page() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
      
        <div className="p-4 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold tracking-tight text-primary">
                Attendance History
              </h2>
              <p className="text-on-surface-variant max-w-md">
                Review and manage your historical time records with precision.
                Audit logs are kept for compliance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 bg-surface-container-low p-2 rounded-2xl">
              <div className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm">
                <span
                  className="material-symbols-outlined text-outline mr-2 text-sm"
                  data-icon="calendar_month"
                >
                  calendar_month
                </span>
                <select className="bg-transparent border-none text-sm font-semibold text-on-surface focus:ring-0 cursor-pointer">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Q3 2023</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm">
                <span
                  className="material-symbols-outlined text-outline mr-2 text-sm"
                  data-icon="filter_list"
                >
                  filter_list
                </span>
                <select className="bg-transparent border-none text-sm font-semibold text-on-surface focus:ring-0 cursor-pointer">
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>
              <button className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-container transition-colors active:scale-95 duration-200 shadow-md shadow-primary/10">
                <span className="material-symbols-outlined" data-icon="search">
                  search
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2 bg-primary-container rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 space-y-4">
                <p className="font-manrope text-white/70 uppercase tracking-widest text-xs font-bold">
                  Total Hours this Period
                </p>
                <h3 className="text-5xl font-extrabold text-white">
                  164.5{" "}
                  <span className="text-xl font-normal opacity-60">hrs</span>
                </h3>
                <div className="flex items-center space-x-2 text-tertiary-fixed">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="trending_up"
                  >
                    trending_up
                  </span>
                  <span className="text-sm font-semibold">
                    +12% from last month
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-highest rounded-3xl p-8 flex flex-col justify-between">
              <p className="font-manrope text-on-surface-variant uppercase tracking-widest text-xs font-bold">
                Pending Approval
              </p>
              <div>
                <h3 className="text-3xl font-extrabold text-primary">08</h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  Entries waiting
                </p>
              </div>
            </div>
            <div className="bg-surface-container-highest rounded-3xl p-8 flex flex-col justify-between">
              <p className="font-manrope text-on-surface-variant uppercase tracking-widest text-xs font-bold">
                Approved
              </p>
              <div>
                <h3 className="text-3xl font-extrabold text-gold-premium-dark">
                  42
                </h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  Verified records
                </p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-3xl shadow-sm shadow-blue-900/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-8 py-5 font-manrope text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                      Date
                    </th>
                    <th className="px-6 py-5 font-manrope text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                      Session 1
                    </th>
                    <th className="px-6 py-5 font-manrope text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                      Session 2
                    </th>
                    <th className="px-6 py-5 font-manrope text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                      Total Hours
                    </th>
                    <th className="px-6 py-5 font-manrope text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                      Status
                    </th>
                    <th className="px-8 py-5 font-manrope text-[10px] uppercase tracking-widest font-black text-on-surface-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary">
                          Oct 24, 2023
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Tuesday
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">08:52</span>
                        <span
                          className="material-symbols-outlined text-[10px] text-outline"
                          data-icon="arrow_forward"
                        >
                          arrow_forward
                        </span>
                        <span className="text-sm font-medium">12:30</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">13:15</span>
                        <span
                          className="material-symbols-outlined text-[10px] text-outline"
                          data-icon="arrow_forward"
                        >
                          arrow_forward
                        </span>
                        <span className="text-sm font-medium">17:45</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-headline font-bold text-primary">
                        8.15 hrs
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-premium-light text-gold-premium-dark text-[10px] font-bold uppercase tracking-wider border border-gold-premium/20">
                        <span className="w-1 h-1 rounded-full bg-gold-premium-dark mr-1.5"></span>
                        Approved
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="visibility"
                          >
                            visibility
                          </span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="edit"
                          >
                            edit
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary">
                          Oct 23, 2023
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Monday
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">09:05</span>
                        <span
                          className="material-symbols-outlined text-[10px] text-outline"
                          data-icon="arrow_forward"
                        >
                          arrow_forward
                        </span>
                        <span className="text-sm font-medium">13:00</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">14:00</span>
                        <span
                          className="material-symbols-outlined text-[10px] text-outline"
                          data-icon="arrow_forward"
                        >
                          arrow_forward
                        </span>
                        <span className="text-sm font-medium">18:15</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-headline font-bold text-primary">
                        8.20 hrs
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1 h-1 rounded-full bg-outline mr-1.5"></span>
                        Pending
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="visibility"
                          >
                            visibility
                          </span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="edit"
                          >
                            edit
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary">
                          Oct 20, 2023
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Friday
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">08:45</span>
                        <span
                          className="material-symbols-outlined text-[10px] text-outline"
                          data-icon="arrow_forward"
                        >
                          arrow_forward
                        </span>
                        <span className="text-sm font-medium">12:30</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2 text-on-surface-variant italic">
                        <span className="text-xs">No second session</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-headline font-bold text-primary">
                        3.75 hrs
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-premium-light text-gold-premium-dark text-[10px] font-bold uppercase tracking-wider border border-gold-premium/20">
                        <span className="w-1 h-1 rounded-full bg-gold-premium-dark mr-1.5"></span>
                        Approved
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="visibility"
                          >
                            visibility
                          </span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors">
                          <span
                            className="material-symbols-outlined"
                            data-icon="edit"
                          >
                            edit
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-8 py-6 bg-surface-container-low flex items-center justify-between border-t border-surface-container">
              <p className="text-sm text-on-surface-variant">
                Showing{" "}
                <span className="font-semibold text-on-surface">1-10</span> of{" "}
                <span className="font-semibold text-on-surface">42</span>{" "}
                entries
              </p>
              <div className="flex space-x-2">
                <button
                  className="p-2 rounded-lg border border-outline-variant hover:bg-white transition-colors disabled:opacity-50"
                  disabled
                >
                  <span
                    className="material-symbols-outlined"
                    data-icon="chevron_left"
                  >
                    chevron_left
                  </span>
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm shadow-primary/20">
                  1
                </button>
                <button className="px-4 py-2 rounded-lg hover:bg-white text-sm font-bold transition-colors">
                  2
                </button>
                <button className="px-4 py-2 rounded-lg hover:bg-white text-sm font-bold transition-colors">
                  3
                </button>
                <button className="p-2 rounded-lg border border-outline-variant hover:bg-white transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-high rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="flex-1 space-y-6 relative z-10">
              <h4 className="text-3xl font-extrabold text-primary leading-tight">
                Need to adjust a past entry?
              </h4>
              <p className="text-lg text-on-surface-variant font-medium">
                Our precision system allows for retroactive corrections within a
                48-hour window. For older records, please contact your
                department lead for override approval.
              </p>
              <div className="flex space-x-4">
                <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold tracking-tight hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 duration-200">
                  Request Correction
                </button>
                <button className="px-8 py-4 text-primary font-bold tracking-tight hover:underline">
                  View Compliance Policy
                </button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-sm">
              <img
                alt="Compliance Documentation"
                className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                data-alt="Close-up of high-quality financial ledger papers and a luxury pen on a clean minimalist desk with soft morning shadows"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo7wKyWMtiHKyDK3pkmfMdrw4EZpmzgTnRG2Gdc2xPBbaL45DuhObudALjOr5MYRqwYvnS-6_b0stZn1rbWZrC0-6Q-PBNA3qvSABO3wutMz4sC_JLcODfJ7nMrqyGA7AKJBuNNn3j812wpVybt1FFGmMQpSwuS0hIPvGZ5rE3XcigZJpHSutQNpzAjLPYLFavmve7u-XgsotjI80cgZtqf3ptfw1zs0DKoXYR1NrfaEw9wJPBA8JoFoZ44OcxkMk6z7htI8zP2Y8"
              />
            </div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
        <footer className="mt-auto px-8 py-10 border-t border-surface-container-high bg-white/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-lg font-black tracking-tighter text-primary">
                Executive Ledger
              </span>
              <p className="text-xs text-on-surface-variant/70 font-medium">
                © 2023 Executive Precision Systems Ltd. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <a className="hover:text-primary transition-colors" href="#">
                Security
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Privacy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Audit Support
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default page;
