import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Intro from "./components/Intro";
import RegisterPage from "./routes/RegisterPage";
import LoginPage from "./routes/LoginPage";
import Card from "./components/Card";
import { useTasks } from "./hooks/useTasks";
import { useState } from "react";
import TaskForm from "./components/TaskForm";

const Home = () => {
  const { tasks, handleToggle, refetch } = useTasks();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Nav onAddClick={() => setShowForm(true)} />
      <span className="bg-white/15 w-screen h-px" />
      <Intro pendingTasks={tasks.filter((t) => !t.completed).length} />
      <section className="max-w-6xl grid grid-rows-3 grid-cols-3 gap-6 py-10">
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.title}
            description={task.description ?? ""}
            priority={task.priority}
            completed={task.completed}
            date={new Date(task.createdAt).toLocaleDateString("pt-BR")}
            onToggle={() => handleToggle(task._id, task.completed)}
          />
        ))}
      </section>
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
