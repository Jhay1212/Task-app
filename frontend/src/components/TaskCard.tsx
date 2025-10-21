import React, { type FC } from "react";
import type Task from "../typings/task";
import { Link } from "react-router";

export const TaskCard: FC<Task> = ({ title, description, created_at, completed}) => {
  return (
    <div className="h-50 bg-white rounded-2xl shadow-lg p-5 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
    <div className="flex flex-col gap-3">
      <h1 className="text-blue-600 text-lg font-semibold hover:underline underline-offset-4">
        {title}
      </h1>
  
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
  
      {completed !== undefined && (
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            completed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      )}
  
      <small className="text-gray-400 text-xs mt-auto">
        {new Date(created_at).toLocaleDateString()}
      </small>
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
        <Link to={`/tasks/${task.id}`}>
            <TaskCard key={task.id ?? index}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
            created_at={new Date(task.created_at).toLocaleString()} />
            </Link>
        ))}
    </div>
)

export default Cards
