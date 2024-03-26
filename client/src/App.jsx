import React, { useState, useEffect, useRef } from "react";
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

  const toDoRef = useRef(null);
  const doingRef = useRef(null);
  const doneRef = useRef(null);
  const trashRef = useRef(null);

  useEffect(() => {

    const drake = Dragula([toDoRef.current, doingRef.current, doneRef.current, trashRef.current]);

    drake.on('drop', (el, target, source) => {
      const targetId = target.id;
      const sourceId = source.id;

      if (targetId !== sourceId) {
        const taskText = el.innerText;
        el.remove();

        switch (targetId) {
          case 'to-do':
            setToDoTasks([...toDoTasks, taskText]);
            break;
          case 'doing':
            setDoingTasks([...doingTasks, taskText]);
            break;
          case 'done':
            setDoneTasks([...doneTasks, taskText]);
            break;
          case 'trash':
            setTrashTasks([...trashTasks, taskText]);
            break;
          default:
            break;
        }
      }
    });

    return () => {
      drake.destroy();
    };
  }, [toDoTasks, doingTasks, doneTasks, trashTasks]);

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

      <div className="main-container">
        <ul className="columns">
          <li className="column to-do-column">
            <div className="column-header">
              <h4>Orders</h4>
            </div>
            <ul className="task-list" id="to-do" ref={toDoRef}>
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
            <ul className="task-list" id="doing" ref={doingRef}>
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
            <ul className="task-list" id="done" ref={doneRef}>
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
            <ul className="task-list" id="trash" ref={trashRef}>
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
