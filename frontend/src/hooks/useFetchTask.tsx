import { useState, useEffect } from "react";
import axios from "axios";
type Tasks = {
    id: number,
    title: string,
    description: string,
    date_created: Date
}

const useFetchTask = (id: number | null = null) => {
    const [tasks, setTasks] = useState<Tasks[] | Tasks>([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        try {
            const fetchTasks = async () => {
                setIsLoading(true)
                const response = await axios.get(id? `http://127.0.0.1:8000/api/tasks/${id}` : "http://127.0.0.1:8000/api/tasks/")
                setTasks(response.data)
            }
            fetchTasks();
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    return [tasks, isLoading, error]
}

export default useFetchTask;