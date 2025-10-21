type Task = {
    id: number;
    title: string;
    description: string;
    created_at: string; // Django returns ISO string
    completed: boolean
};
  
export default Task