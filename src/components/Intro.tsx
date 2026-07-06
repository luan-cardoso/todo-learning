interface IntroProps {
  pendingTasks: number;
}
export default function Intro({ pendingTasks }: IntroProps) {
  return (
    <div className="h-full w-full bg-grid py-20">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-12">
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-5xl font-bold">Todo Learning</h1>
          <p className="text-xl font-normal text-gray-500">
            Crie e gerencie seus temas de estudos para sempre <br /> manter uma
            rotina saudável.
          </p>
        </div>
        <p className="text-sm tracking-wider font-semibold mt-4">
          <span className="bg-blue-200 rounded-full h-1.5 w-1.5 inline-block mb-0.5" />{" "}
          Temas pendentes: {pendingTasks}
        </p>
      </div>
    </div>
  );
}
