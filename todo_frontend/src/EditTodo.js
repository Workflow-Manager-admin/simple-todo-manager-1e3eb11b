import React, { useState } from "react";
import "./styles.css";

export default function EditTodo({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [desc, setDesc] = useState(initial?.desc || "");
  return (
    <div className="page edit-todo-page">
      <div className="status-bar"></div>
      <div className="app-bar">
        <span className="app-bar-title">Edit Todo</span>
      </div>
      <div className="titles-group">
        <span className="titles-main">Edit your task</span>
        <span className="titles-sub">Change title or description</span>
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
      <div className="edit-btns">
        <button className="primary-btn add-btn" onClick={() => onSave({ title, desc })}>
          Save
        </button>
        <button className="secondary-btn cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
