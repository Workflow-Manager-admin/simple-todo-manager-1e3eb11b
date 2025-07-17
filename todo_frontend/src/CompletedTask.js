import React from "react";
import "./styles.css";

export default function CompletedTask({ onBack }) {
  return (
    <div className="page completed-page">
      <div className="status-bar"></div>
      <div className="app-bar">
        <span className="app-bar-title">Completed</span>
      </div>
      <div className="completed-todos-group">
        <div className="todo-item completed">
          <span className="todo-title">Morning Jog</span>
          <span className="todo-desc">5km in the park</span>
        </div>
        <div className="todo-item completed">
          <span className="todo-title">Call Mom</span>
          <span className="todo-desc">Wish happy birthday</span>
        </div>
        {/* More completed todos */}
      </div>
      <button className="secondary-btn" onClick={onBack}>
        Back
      </button>
    </div>
  );
}
