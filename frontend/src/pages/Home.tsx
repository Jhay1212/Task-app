import {type FC} from 'react'
import type Task from '../typings/task';
import { useParams } from 'react-router';
import StatusCards from '../components/StatusCard';
import useFetchTask from '../hooks/useFetchTask';
import Cards from '../components/TaskCard';

const Home: FC = () => {
  const { id } = useParams();
  const { tasks, isLoading, error } = useFetchTask();
  console.log(tasks, typeof tasks, Array.isArray(tasks))
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
  
  
    if (error)
      return (
        <div className="flex items-center justify-center h-screen text-red-500 text-lg">
          Error loading tasks
        </div>
      );
  
  return (
    <div className='h-full w-full'>
      <div className="w-full mx-auto my-10">
        <StatusCards />
      <Cards tasks={normalizedTasks} />
      </div>
    </div>
  )
}

export default Home
