import { useState, type FormEvent } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import useFetchTask from "../hooks/useFetchTask";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { tasks, isLoading, error } = useFetchTask();
  console.log(tasks, isLoading, error)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tasks/", {
        title,
        description,
        is_completed: status,
      });

      if (response.status === 201) {
        setMessage("Task created successfully!");
        setTitle("");
        setDescription("");
        setStatus(false);
      }
    } catch (error: any) {
      setMessage("Failed to create task.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-amber-50">
      <main className="flex justify-center items-center w-full h-full bg-blue-400">
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-full max-w-md p-4 bg-white border border-gray-200 
            rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create a new task
              </h5>

              {/* ✅ Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your task title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

{/*  */}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a short description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 
                  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                   dark:text-white"
                />
              </div>

              {/* ✅ Status */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="status"
                  id="status"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                  rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                  focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Completed
                </label>
              </div>

              {/* ✅ Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>

              {message && (
                <p
                  className={`text-sm text-center text-green-400`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
