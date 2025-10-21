import { type FC, useState, useEffect } from 'react';
import axios from 'axios';
import type Task from '../typings/task';
import useFetchTask from '../hooks/useFetchTask';
import { useParams } from 'react-router';



const Update: FC = () => {
  const { id } = useParams<{ id: string }> (); 
  const taskId = Number(id);
  const { tasks, isLoading, error } = useFetchTask();
  const [task, setTask] = useState<Task | null>(null);
  const [updating, setUpdating] = useState(false);

  // Find the task from fetched tasks
  useEffect(() => {
    if (tasks) {
      const foundTask = Array.isArray(tasks)
        ? tasks.find((t) => t.id === taskId) || null
        : tasks.id === taskId
        ? tasks
        : null;
      setTask(foundTask);
    }
  }, [tasks, taskId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!task) return <p>Task not found</p>;

  // Full update
  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const res = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, task);
      setTask(res.data);
      alert('Task updated successfully!');
    } catch (err: any) {
      console.error(err);
      alert('Failed to update task');
    } finally {
      setUpdating(false);
    }
  };

  // Toggle completed
  const toggleCompleted = async () => {
    try {
      const res = await axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`);
      setTask(res.data);
    } catch (err: any) {
      console.error(err);
      alert('Failed to toggle status');
    }
  };

  return (
    <div className="max-w-md text-black mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Task</h2>

      <input
        type="text"
        className="border p-2 rounded w-full mb-3"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Title"
      />

      <textarea
        className="border p-2 rounded w-full mb-3"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
      />

      <div className="flex items-center mb-4">
        <label className="mr-2">Completed:</label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompleted}
        />
      </div>

      <button
        onClick={handleUpdate}
        disabled={updating}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {updating ? 'Updating...' : 'Update Task'}
      </button>
    </div>
  );
};

export default Update;
