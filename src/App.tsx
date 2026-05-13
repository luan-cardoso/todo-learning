import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Intro from "./components/Intro";
import RegisterPage from "./routes/RegisterPage";
import LoginPage from "./routes/LoginPage";

const Home = () => (
  <>
    <Nav />
    <span className="bg-white/15 w-screen h-px" />
    <Intro pendingTasks={4} />
  </>
);

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
