import React from "react";
import { Home, RefreshCw, Trash2 } from "lucide-react";
import { Link } from "react-router";

const Navbar: React.FC = () => {
  return (
    <aside className="w-[280px] h-screen bg-blue-900 text-white flex flex-col justify-between shadow-xl">
      <div>
        <div className="text-center py-8 border-b border-blue-300">
          <h1 className="text-2xl font-extrabold tracking-wide px-8">TaskApp</h1>
        </div>

        <nav className="mt-8">
          <ul className="flex flex-col space-y-2">
            <li className="flex items-center gap-3 py-4 px-6 hover:bg-blue-500 rounded-lg transition-all cursor-pointer">
              <Home size={22} />
              <Link to="/"  className="text-white font-semibold text-lg">Home</Link >
            </li>

            <li className="flex items-center gap-3 py-4 px-6 hover:bg-blue-500 rounded-lg transition-all cursor-pointer">
              <RefreshCw size={22} />
              <Link to="/tasks/create"  className="font-semibold text-lg">Create</Link >

            </li>

            <li className="flex items-center gap-3 py-4 px-6 hover:bg-blue-500 rounded-lg transition-all cursor-pointer">
              <Trash2 size={22} />
              <Link to="/tasks/delete" className="text-white font-semibold text-lg">Delete</Link>
            </li>
          </ul>
        </nav>
      </div>

     
    </aside>
  );
};

export default Navbar;
