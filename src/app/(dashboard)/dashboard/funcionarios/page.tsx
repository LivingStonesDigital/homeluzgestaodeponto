"use client";

import ContactsTable from "@/components/contacts-table";
import { StatsGrid } from "@/components/stats-grid";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

function page() {
  const employees = useQuery(api.employees.listEmployees);

  if (!employees) {
    return <div>Loading...</div>;
  }



  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      {/* Page intro */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Minha Equipe</h1>
          <p className="text-sm text-muted-foreground">
            Aqui está uma visão geral de seus colaboradores. Gerencie ou crie
            novos com facilidade!
          </p>
        </div>
        <Button className="px-3">Add Contact</Button>
      </div>
      {/* Numbers */}
      
      {/* Table */}
      <div className="min-h-[100vh] flex-1 md:min-h-min">
        <ContactsTable  />
      </div>
    </div>
  );
}

export default page;
