"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FuncionariosTable } from "@/components/tables/funcionarios/data-table";
import { columns } from "@/components/tables/funcionarios/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RegisterEmployeeForm } from "@/components/register-employee-form";

function page() {
  const employees = useQuery(api.employees.listEmployees);

  if (!employees) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Canvas */}
      <main className="flex-1 p-4 rounded-2xl bg-surface">
        <header className="mb-4 flex justify-between items-center md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary headline-font mb-2">
              Minha Equipe
            </h1>
            <p className="hidden md:blocktext-on-surface-variant font-medium">
              Review and validate employee time records for the current period.
            </p>
          </div>
          <div className="flex space-x-3 ">
            
          </div>
        </header>
        <FuncionariosTable data={employees as any} columns={columns} />
      </main>
    </div>
  );
}

export default page;
