import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface Props {
  params: Promise<{ id: string }>;
}

async function FuncionariosId({ params }: Props) {
  const resolvedParams = await params;

  const preloadedTasks = await preloadQuery(api.employees.getEmployeeById, {
    id: resolvedParams.id,
  });

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Funcionário ID: {resolvedParams.id}
        </h1>
        <p className="text-gray-600">
          Aqui você pode exibir detalhes do funcionário, editar informações ou
          realizar outras ações relacionadas a este funcionário específico.
        </p>
      </div>
      {JSON.stringify(preloadedTasks)}
    </div>
  );
}

export default FuncionariosId;
