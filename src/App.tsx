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
import type { TaskListItem } from "./lib/taskPagination";

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
    refreshCurrentPage,
    goToPrevPage,
    goToNextPage,
  } = useTasks();
  const { userName } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskListItem | null>(null);

  useEffect(() => {
    if (!userName) {
      setShowForm(false);
      setEditingTask(null);
    }
  }, [userName]);

  function closeForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  return (
    <>
      <Nav
        onAddClick={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
      />
      <div className="w-full bg-white/15 h-px" />
      <Intro pendingTasks={pendingTasks} />
      <section className="max-w-6xl grid grid-cols-3 gap-6 py-10 min-h-96">
        {loading && tasks.length === 0 && (
          <p className="col-span-full text-center text-sm text-neutral-500">
            Carregando tarefas...
          </p>
        )}
        {!loading && tasks.length === 0 && page === 1 && (
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
            onEdit={() => {
              setShowForm(false);
              setEditingTask(task);
            }}
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

      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask ?? undefined}
          onClose={closeForm}
          onSuccess={editingTask ? refreshCurrentPage : refetch}
        />
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
