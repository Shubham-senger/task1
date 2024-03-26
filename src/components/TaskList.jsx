import Dragula from "react-dragula"
import React, { useState } from "react";

const TaskList = ({ column, tasks, addTask, emptyTrash }) => {
  const [taskText, setTaskText] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask(taskText);
      setTaskText("");
    }
  };
  Dragula([
    document.getElementById("to-do"),
    document.getElementById("doing"),
    document.getElementById("done"),
    document.getElementById("trash")
  ]);
  const dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };
  return (
    <div className="border p-4 rounded-lg bg-gray-200">
      <h4 className="text-center">{column}</h4>
      <ul className="mt-4" ref={this.dragulaDecorator}>
        {tasks.map((task, index) => (
          <li key={index} className="bg-white border p-2 mb-2">
            {task}
          </li>
        ))}
      </ul>
      {column === "trash" && (
        <div className="text-center">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={emptyTrash}
          >
            Delete
          </button>
        </div>
      )}
      {column === "todo" && (
        <div className="mt-4">
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            placeholder="New Task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
