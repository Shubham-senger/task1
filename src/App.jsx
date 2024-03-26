import React, { useState } from "react";
import Dragula from "react-dragula";

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [toDoTasks, setToDoTasks] = useState([
    "Order #1",
    "Order #2",
    "Order #3",
    "Order #4"
  ]);
  const [doingTasks, setDoingTasks] = useState([
    "Order 10",
    "Order 15",
    "Order 21",
    "Order 25"
  ]);
  const [doneTasks, setDoneTasks] = useState(["Order 1000", "Order 500"]);
  const [trashTasks, setTrashTasks] = useState([
    "Order #2132",
    "Order #222"
  ]);

  // Initialize Dragula
  const DnD = () => {
    Dragula([
      document.getElementById("to-do"),
      document.getElementById("doing"),
      document.getElementById("done"),
      document.getElementById("trash")
    ]);
  };

  const addTask = () => {
    if (taskText.trim() !== "") {
      setToDoTasks([...toDoTasks, taskText]);
      setTaskText("");
    }
  };

  const emptyTrash = () => {
    setTrashTasks([]);
  };

  return (
    <div>
      <header>
        <h1>KT Kanban board</h1>
      </header>

      <div className="add-task-container">
        <input
          type="text"
          maxLength="12"
          id="taskText"
          placeholder="New Task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button className="button add-button" onClick={addTask}>
          Add New Task
        </button>
      </div>

      <div className="main-container" onLoad={DnD()}>
        <ul className="columns">
          <li className="column to-do-column">
            <div className="column-header">
              <h4>Orders</h4>
            </div>
            <ul className="task-list" id="to-do">
              {toDoTasks.map((task, index) => (
                <li key={index} className="task">
                  <p>{task}</p>
                </li>
              ))}
            </ul>
          </li>

          <li className="column doing-column">
            <div className="column-header">
              <h4>Doing</h4>
            </div>
            <ul className="task-list" id="doing">
              {doingTasks.map((task, index) => (
                <li key={index} className="task">
                  <p>{task}</p>
                </li>
              ))}
            </ul>
          </li>

          <li className="column done-column">
            <div className="column-header">
              <h4>Done</h4>
            </div>
            <ul className="task-list" id="done">
              {doneTasks.map((task, index) => (
                <li key={index} className="task">
                  <p>{task}</p>
                </li>
              ))}
            </ul>
          </li>

          <li className="column trash-column">
            <div className="column-header">
              <h4>CANCELLED</h4>
            </div>
            <ul className="task-list" id="trash">
              {trashTasks.map((task, index) => (
                <li key={index} className="task">
                  <p>{task}</p>
                </li>
              ))}
            </ul>
            <div className="column-button">
              <button className="button delete-button" onClick={emptyTrash}>
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
