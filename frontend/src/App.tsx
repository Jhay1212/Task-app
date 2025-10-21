
import { useState, useEffect } from "react";
import useFetchTask from "./hooks/useFetchTask";
import axios from "axios";
import { useParams } from "react-router";


const App = () => {
  const { id } = useParams();
  const [tasks, isLoading, errors] = useFetchTask(2);
  console.log(tasks)
  console.log(errors);
  return (
    <div className="w-full h-full">
      
    </div>
  )
}

export default App
