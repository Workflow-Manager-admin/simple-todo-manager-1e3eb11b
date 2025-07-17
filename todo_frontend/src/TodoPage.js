import React from "react";
import "./styles.css";

export default function TodoPage({ onAddTodo }) {
  return (
    <div className="page todo-page">
      <div className="status-bar"></div>
      <div className="app-bar">
        <span className="app-bar-title">Todo App</span>
      </div>
      <div className="todos-group">
        {/* Example todos */}
        <div className="todo-item">
          <span className="todo-title">Buy groceries</span>
          <span className="todo-desc">Milk, Bread, Cheese</span>
        </div>
        <div className="todo-item">
          <span className="todo-title">Read book</span>
          <span className="todo-desc">Finish chapter 5</span>
        </div>
        {/* Add more todo items as needed */}
      </div>
      <div className="fab-add-todo" onClick={onAddTodo} title="Add New Todo">
        <span className="fab-plus">+</span>
      </div>
      <div className="navigation-bar"></div>
    </div>
  );
}
