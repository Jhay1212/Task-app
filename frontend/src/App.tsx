import useFetchTask from "./hooks/useFetchTask";
import { Route, Routes, useParams } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";

import Create from "./pages/Create";

const App = () => {

  return (
    <div className="w-screen h-screen relative flex bg-amber-50">
      <Navbar />
      <main className="flex justify-center items-center w-full h-full bg-blue-400">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/create" element={<Create />} />
          <Route path="/tasks/update" element={<UpdateTask />} />

        </Routes>
      </main>
    </div>
  );
};

export default App;