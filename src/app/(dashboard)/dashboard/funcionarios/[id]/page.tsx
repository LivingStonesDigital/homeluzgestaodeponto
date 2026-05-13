import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
  params: Promise<{ id: string }>;
}

type FuncionariosType = {
  _id: Id<"users">;
  _creationTime: number;
  birthDate?: string | undefined;
  department?: string | undefined;
  tokenIdentifier?: string | undefined;
  name: string;
  email: string;
  role: "employee" | "admin";
  isActive: boolean;
};

async function FuncionariosId({ params }: Props) {
  const resolvedParams = await params;

  const preloadedTasks = await preloadQuery(api.employees.getEmployeeById, {
    id: resolvedParams.id as Id<"users">,
  });

  console.log(preloadedTasks);

  return (
    <div className="h-screen grid place-items-center">
      {preloadedTasks._valueJSON.name}
    </div>
  );
}

export default FuncionariosId;
