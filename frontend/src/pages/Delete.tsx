import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Cards from '../components/TaskCard';
import useFetchTask from '../hooks/useFetchTask';
import type Task from '../typings/task';

const Delete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const taskId = Number(id);
  const navigate = useNavigate();
  const { tasks, isLoading, error } = useFetchTask(id);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const normalizedTasks: Task[] = Array.isArray(tasks)
    ? tasks
    : tasks
    ? [tasks]
    : [];

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    try {
      setLoadingDelete(true);
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
      alert('Task deleted successfully!');
      navigate('/tasks'); 
    } catch (err: any) {
      console.error(err);
      setDeleteError(err.message || 'Failed to delete task');
    } finally {
      setLoadingDelete(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;
  if (!normalizedTasks.length) return <p>No task found</p>;

  return (
    <div className="w-full h-full flex flex-col items-center py-10">

      <div className="mb-6 w-full max-w-md">
        <Cards tasks={normalizedTasks} />
      </div>

      {deleteError && <p className="text-red-500 mb-4">{deleteError}</p>}

      <button
        onClick={handleDelete}
        disabled={loadingDelete}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
      >
        {loadingDelete ? 'Deleting...' : 'Delete Task'}
      </button>
    </div>
  );
};

export default Delete;
