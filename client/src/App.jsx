import React, { useState, useEffect, useRef } from "react";
import Dragula from "react-dragula";

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [toDoTasks, setToDoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [trashTasks, setTrashTasks] = useState([]);

  const toDoRef = useRef(null);
  const doingRef = useRef(null);
  const doneRef = useRef(null);
  const trashRef = useRef(null);

  useEffect(() => {
    fetchTasks();
    addDemoTasks();

    const drake = Dragula([toDoRef.current, doingRef.current, doneRef.current, trashRef.current]);

    drake.on('drop', (el, target, source) => {
      const targetId = target.id;
      const sourceId = source.id;

      if (targetId !== sourceId) {
        const taskId = el.dataset.taskId;
        const newStatus = targetId === 'to-do' ? 'todo' : 
                         targetId === 'doing' ? 'doing' :
                         targetId === 'done' ? 'done' :
                         'trash';

        updateTaskStatus(taskId, newStatus);
      }
    });

    return () => {
      drake.destroy();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setToDoTasks(data.filter(task => task.status === 'todo'));
      setDoingTasks(data.filter(task => task.status === 'doing'));
      setDoneTasks(data.filter(task => task.status === 'done'));
      setTrashTasks(data.filter(task => task.status === 'trash'));
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (taskText.trim() !== "") {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: taskText, status: 'todo' }),
        });
        const data = await response.json();
        setToDoTasks([...toDoTasks, data]);
        setTaskText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const emptyTrash = async () => {
    try {
      await fetch(`/api/tasks`, {
        method: 'DELETE',
      });
      setTrashTasks([]);
    } catch (error) {
      console.log(error);
    }
  };

  const addDemoTasks = () => {
    const demoTasks = [
      { _id: 1, text: "order 1", status: "todo" },
      { _id: 2, text: "order 2", status: "doing" },
      { _id: 3, text: "order 3", status: "done" },
      { _id: 4, text: "order 4", status: "trash" }
    ];
    setToDoTasks(demoTasks.filter(task => task.status === 'todo'));
    setDoingTasks(demoTasks.filter(task => task.status === 'doing'));
    setDoneTasks(demoTasks.filter(task => task.status === 'done'));
    setTrashTasks(demoTasks.filter(task => task.status === 'trash'));
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
                <li key={task._id} className="task" data-task-id={task._id}>
                  <p>{task.text}</p>
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
                <li key={task._id} className="task" data-task-id={task._id}>
                  <p>{task.text}</p>
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
                <li key={task._id} className="task" data-task-id={task._id}>
                  <p>{task.text}</p>
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
                <li key={task._id} className="task" data-task-id={task._id}>
                  <p>{task.text}</p>
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
