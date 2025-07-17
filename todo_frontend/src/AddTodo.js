import React, { useState } from "react";
import "./styles.css";

export default function AddTodo({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className="page add-todo-page">
      <div className="status-bar"></div>
      <div className="app-bar">
        <span className="app-bar-title">Add Todo</span>
      </div>
      <div className="titles-group">
        <span className="titles-main">What do you need to do?</span>
        <span className="titles-sub">Add your important task</span>
      </div>
      <input
        className="form-input"
        placeholder="Todo title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ marginTop: 40 }}
      />
      <input
        className="form-input"
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        style={{ marginTop: 10 }}
      />
      <button className="primary-btn add-btn" onClick={() => onAdd({ title, desc })}>
        Add
      </button>
      <button className="secondary-btn cancel-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
