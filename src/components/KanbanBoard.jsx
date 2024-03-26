
import React, { useState } from "react";
import TaskList from "./TaskList";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: ["Order #1", "Order #2", "Order #3", "order #4"],
    doing: ["Order 10", "Order 15", "order 21", "order 25"],
    done: ["Order 1000", "order 500"],
    trash: ["Order #2132", "order #222"]
  });
  
  const addTask = (taskText) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, taskText]
    }));
  };

  const emptyTrash = () => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      trash: []
    }));
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex space-x-4">
        {Object.keys(tasks).map((column) => (
          <TaskList
            key={column}
            column={column}
            tasks={tasks[column]}
            addTask={addTask}
            emptyTrash={emptyTrash}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
