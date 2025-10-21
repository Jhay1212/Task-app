import React, { type FC } from "react";
import { Database, Hourglass, XCircle, CheckSquare } from "lucide-react";
import useFetchTask from "../hooks/useFetchTask";
import type Task from "../typings/task";
type ColorKey = "blue" | "purple" | "red" | "green";

interface StatusCardProps {
  title: string;
  value: number;
  percent: string;
  icon: React.ReactNode;
  color: ColorKey;
}


const COLOR_STYLES: Record<
  ColorKey,
  {
    border: string;
    badgeBg: string;
    badgeText: string;
    iconText: string;
  }
> = {
  blue: {
    border: "border-l-4 border-blue-400",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    iconText: "text-blue-600",
  },
  purple: {
    border: "border-l-4 border-violet-300",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    iconText: "text-violet-600",
  },
  red: {
    border: "border-l-4 border-rose-300",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    iconText: "text-rose-600",
  },
  green: {
    border: "border-l-4 border-emerald-300",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    iconText: "text-emerald-600",
  },
};

const StatusCard: FC<StatusCardProps> = ({ title, value, percent, icon, color }) => {
  const style = COLOR_STYLES[color];
  

  return (
    <div
      role="region"
      aria-label={`${title} card`}
          className={`relative w-44 md:w-52 bg-white rounded-2xl
         shadow-sm p-4 flex flex-col justify-center items-center ${style.border}`}
    >
      {/* Percentage badge */}
      <div
        className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full ${style.badgeBg} ${style.badgeText}`}
      >
        {percent}
      </div>

      {/* Icon */}
      <div className={`mb-3 ${style.iconText}`}>{icon}</div>

      {/* Main number */}
      <div className="text-3xl md:text-4xl font-extrabold leading-none text-blue-400">{value}</div>

      {/* Title */}
      <div className="mt-1 text-sm text-gray-500">{title}</div>
    </div>
  );
};

const StatusCards: FC = () => {
  // console.log(tasks.length)
  const { tasks, isLoading, error } = useFetchTask();

  const normalizedTasks: Task[] = Array.isArray(tasks) // turn tasks into regular array
    ? tasks
    : tasks
    ? [tasks]
    : [];
  const completed = normalizedTasks.filter(task => task.completed).length;
  const inProgress = normalizedTasks.filter(task => !task.completed).length;
  const progressPercentage = Math.round((inProgress / normalizedTasks.length) * 100);
  const completedPercentage = Math.round((completed / normalizedTasks.length) * 100)
  
  return (
    <div className="flex flex-wrap gap-4 justify-center items-stretch">
      <StatusCard
        title="Total"
        value={normalizedTasks.length}
        percent="100%"
        color="blue"
        icon={<Database size={28} />}
      />
      <StatusCard
        title="In Progress"
        value={inProgress}
        percent={progressPercentage + "%"}
        color="purple"
        icon={<Hourglass size={28} />}
      />
  
      <StatusCard
        title="Completed"
        value={completed}
        percent={completedPercentage + "%"}
        color="green"
        icon={<CheckSquare size={28} />}
      />
    </div>
  );
};

export default StatusCards;
