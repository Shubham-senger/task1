
import React from "react";
import Dragula from "react-dragula";


export default function App() {

  const DnD = ()=>{
    Dragula([
      document.getElementById("to-do"),
      document.getElementById("doing"),
      document.getElementById("done"),
      document.getElementById("trash")
    ]);
    removeOnSpill: false
      .on("drag", function(el) {
        el.className.replace("ex-moved", "");
      })
      .on("drop", function(el) {
        el.className += "ex-moved";
      })
      .on("over", function(el, container) {
        container.className += "ex-over";
      })
      .on("out", function(el, container) {
        container.className.replace("ex-over", "");
      });
    
    
    function addTask() {
    
      var inputTask = document.getElementById("taskText").value;
    
      document.getElementById("to-do").innerHTML +=
        "<li class='task'><p>" + inputTask + "</p></li>";
    
      document.getElementById("taskText").value = "";
    }
    
    
    function emptyTrash() {
    
      document.getElementById("trash").innerHTML = "";
    }
  }


  return (
    <div>

<header>
  <h1> KT Kanban board <br/><span></span></h1>
</header>

<div className="add-task-container">
  <input type="text" maxlength="12" id="taskText" placeholder="New Task..." onkeydown="if (event.keyCode == 13)
                        document.getElementById('add').click()"/>
  <button id="add" className="button add-button" onclick="addTask()">Add New Task</button>
</div>

<div className="main-container">
  <ul className="columns">

    <li className="column to-do-column">
      <div className="column-header">
        <h4>Orders</h4>
      </div>
      <ul className="task-list" id="to-do">
        <li className="task">
          <p>Order #1</p>
        </li>
        <li className="task">
          <p>Order #2</p>
        </li>
        <li className="task">
          <p>Order #3</p>
        </li>
        <li className="task">
          <p>order #4</p>
        </li>
      </ul>
    </li>

    <li className="column doing-column">
      <div className="column-header">
        <h4>Doing</h4>
      </div>
      <ul className="task-list" id="doing">
        <li className="task">
          <p>Order 10 </p>
        </li>
        <li className="task">
          <p>Order 15</p>
        </li>
        <li className="task">
          <p>order 21</p>
        </li>
            <li className="task">
          <p>order 25</p>
        </li>
      </ul>
    </li>

    <li className="column done-column">
      <div className="column-header">
        <h4>Done</h4>
      </div>
      <ul className="task-list" id="done">
        <li className="task">
          <p>Order 1000</p>
        </li>
        <li className="task">
          <p>order 500</p>
        </li>
      </ul>
    </li>

    <li className="column trash-column">
      <div className="column-header">
        <h4>CANCELLED</h4>
      </div>
      <ul className="task-list" id="trash">
        <li className="task">
          <p>Order #2132</p>
        </li>
        <li className="task">
          <p>order #222</p>
        </li>

      </ul>
      <div className="column-button">
        <button className="button delete-button" onclick="emptyTrash()">Delete</button>
      </div>
    </li>

  </ul>
</div>




</div>
  );
}
