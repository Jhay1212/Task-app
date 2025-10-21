import React, { type FC } from "react";
import type Task from "../typings/task";


const TaskCard: FC<Task> = ({ title, description, created_at, completed}) => {
  return (
      <div className='w-60 h-80 md:w-82 bg-white rounded-2xl shadow-sm p-4 flex flex-col'>
          
          <div className="flex flex-col  justify-center gap-2 my-2">
              <h1 className="text-blue-700 text-sm font-bolder hover:underline underline-offset-4">{title}</h1>
              <p className="pl-6 text-black text-md text-left">{description}</p>
              <p>{completed}</p>
              
              <small>{new Date(created_at).toLocaleDateString()}</small>
              
          </div>
    </div>
  )
}
interface CardProps {
    tasks: Task[] | Task | null
}
const Cards: FC<{ tasks: Task[] }> = ({tasks}) => (
    <div className="m-10 flex flex-wrap gap-4 justify-center items-stretch">
        {tasks.map((task, index) => (
            <TaskCard key={task.id ?? index}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                created_at={new Date(task.created_at).toLocaleString()} />
        ))}
    </div>
)

export default Cards
