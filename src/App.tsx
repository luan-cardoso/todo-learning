import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Intro from "./components/Intro";
import RegisterPage from "./routes/RegisterPage";
import LoginPage from "./routes/LoginPage";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import { useTasks } from "./hooks/useTasks";
import { useAuth } from "./hooks/useAuth";
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";

const Home = () => {
  const {
    tasks,
    page,
    totalPages,
    hasNextPage,
    pendingTasks,
    loading,
    handleToggle,
    handleDelete,
    refetch,
    goToPrevPage,
    goToNextPage,
  } = useTasks();
  const { userName } = useAuth();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!userName) setShowForm(false);
  }, [userName]);

  return (
    <>
      <Nav onAddClick={() => setShowForm(true)} />
      <div className="w-full bg-white/15 h-px" />
      <Intro pendingTasks={pendingTasks} />
      <section className="max-w-6xl grid grid-rows-3 grid-cols-3 gap-6 py-10 min-h-[24rem]">
        {loading && tasks.length === 0 && (
          <p className="col-span-full text-center text-sm text-neutral-500">
            Carregando tarefas...
          </p>
        )}
        {!loading &&
          tasks.length === 0 &&
          page === 1 && (
            <p className="col-span-full text-center text-sm text-neutral-500">
              Nenhuma tarefa encontrada.
            </p>
          )}
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.title}
            subject={task.subject}
            description={task.description ?? ""}
            priority={task.priority}
            completed={task.completed}
            date={new Date(task.createdAt).toLocaleDateString("pt-BR")}
            onToggle={() => handleToggle(task._id, task.completed)}
            onDelete={() => handleDelete(task._id)}
          />
        ))}
      </section>
      <Pagination
        page={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        loading={loading}
        onPrev={goToPrevPage}
        onNext={goToNextPage}
      />

      {showForm && (
        <TaskForm onClose={() => setShowForm(false)} onCreated={refetch} />
      )}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <main className="flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
