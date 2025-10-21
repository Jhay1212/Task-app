import { type FC } from 'react';
import type Task from '../typings/task';
import Cards from '../components/TaskCard';
import { useParams, useNavigate } from 'react-router';
import useFetchTask from '../hooks/useFetchTask';

const Detail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, isLoading, error } = useFetchTask(id);

  const normalizedTasks: Task[] = Array.isArray(tasks)
    ? tasks
    : tasks
    ? [tasks]
    : [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const handleDelete = () => {
    // navigate to delete route or implement delete logic
    navigate(`/tasks/delete/${id}`);
  };

  const handleUpdate = () => {
    navigate(`/tasks/update/${id}`);
  };

  return (
    <div className="w-full h-full">
      <Cards tasks={normalizedTasks} />

      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Detail;
