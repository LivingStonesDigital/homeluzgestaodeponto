"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FuncionariosTable } from "@/components/tables/funcionarios/data-table";
import { columns } from "@/components/tables/funcionarios/columns";

function page() {
  const employees = useQuery(api.employees.listEmployees);

  if (!employees) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Canvas */}
      <main className="flex-1 p-4 rounded-2xl bg-surface">
        <header className="mb-4 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary headline-font mb-2">
              Minha equipe
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
        <FuncionariosTable data={employees as any} columns={columns} />
      </main>
    </div>
  );
}

export default page;
