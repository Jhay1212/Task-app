import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import type Task from "../typings/task";

type UseFetchTaskReturn = {
  tasks: Task[] | Task | null;
  isLoading: boolean;
  error: string | null;
};

const useFetchTask = (id: number | null = null): UseFetchTaskReturn => {
  const [tasks, setTasks] = useState<Task[] | Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = id
          ? `http://127.0.0.1:8000/api/tasks/${id}/`
          : "http://127.0.0.1:8000/api/tasks/";

        const response = await axios.get(url, { signal: controller.signal });
        setTasks(response.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        const axiosErr = err as AxiosError;
        setError(axiosErr.message || "Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();

    return () => controller.abort();
  }, [id]);

  return { tasks, isLoading, error };
};

export default useFetchTask;
