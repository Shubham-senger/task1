
import React from "react";
import KanbanBoard from "./components/KanbanBoard";


export default function App() {
  return (
    <div className="App">
      <header>
        <h1 className="text-4xl text-center mt-10">KT Kanban board</h1>
      </header>
      <KanbanBoard />
    </div>
  );
}
