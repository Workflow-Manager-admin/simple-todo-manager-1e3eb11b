import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './styles.css'; // now inside src/, allowed by CRA

// PUBLIC_INTERFACE
function App() {
  /**
   * A React todo app matching a modern, minimal, light-themed design.
   * Features: Display todos, Add/Edit/Delete, Complete toggle.
   */
  const [todos, setTodos] = useState([
    { id: 1, text: "Welcome to your TODO list", completed: false },
  ]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [theme, setTheme] = useState('light');

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  // Effect for system theme toggle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  };

  // Handlers
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (val.length === 0) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: val, completed: false },
    ]);
    setInput("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleEditStart = (id, text) => {
    setEditingId(id);
    setEditingText(text);
    setTimeout(() => {
      if (editInputRef.current) editInputRef.current.focus();
    }, 1);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSave = (id) => {
    const val = editingText.trim();
    if (val.length === 0) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: val }
          : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") handleEditSave(id);
    if (e.key === "Escape") handleEditCancel();
  };

  // PUBLIC_INTERFACE
  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "var(--bg-primary)" }}>
      <div className="todo-page-frame" style={{ margin: '0 auto', maxWidth: 414, minHeight: 580, boxShadow: "0 2px 12px rgba(26,32,44,0.08)" }}>
        <button
          className="theme-toggle"
          style={{
            position: "absolute",
            top: 24, right: 24,
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            zIndex: 2
          }}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <header style={{
          textAlign: "left",
          padding: "36px 24px 10px 24px",
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
          background: "transparent",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: 12,
        }}>
          <h1 style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "2rem",
            color: "var(--text-primary)",
            letterSpacing: "-1px",
          }}>
            Todo List
          </h1>
          <p style={{
            margin: "8px 0 0 0",
            fontSize: 14,
            color: "#888",
            fontWeight: 400,
            opacity: 0.85,
          }}>
            Stay organized and productive – Add, check, edit or remove your tasks.
          </p>
        </header>
        <main style={{ padding: "0 24px 32px 24px", fontFamily: "Inter, Helvetica, Arial, sans-serif" }}>
          {/* Add Todo Form */}
          <form
            className="todo-add-form"
            onSubmit={handleAdd}
            style={{
              display: "flex",
              margin: "20px 0 28px 0",
              gap: 10,
            }}
            autoComplete="off"
          >
            <input
              ref={inputRef}
              type="text"
              className="todo-add-input"
              placeholder="What do you need to do?"
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: 17,
                background: "#f8f9fa",
                border: "1px solid #e4e7ec",
                borderRadius: 8,
                boxSizing: "border-box",
                outline: "none",
                fontWeight: 400,
                color: "#222",
                transition: "border 0.2s",
              }}
              value={input}
              onChange={handleInputChange}
              maxLength={120}
            />
            <button
              type="submit"
              className="todo-add-btn"
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "0 18px",
                fontSize: 15,
                height: 44,
                cursor: "pointer",
                transition: "background 0.2s",
                outline: "none",
              }}
              aria-label="Add todo"
            >
              Add
            </button>
          </form>
          {/* Todo List */}
          <ul className="todo-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {todos.length === 0 ? (
              <li style={{
                textAlign: "center",
                color: "#bbb",
                padding: "36px 0",
                fontSize: 17,
                letterSpacing: 0,
                opacity: 0.8
              }}>
                No todos yet! Add a new task above.
              </li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`todo-list-item${todo.completed ? " completed" : ""}`}
                  style={{
                    background: "#fff",
                    border: "1px solid #e4e7ec",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px 10px 10px",
                    marginBottom: 14,
                    boxShadow: todo.completed ? "none" : "0 1px 4px rgba(0,0,0,0.03)",
                    opacity: todo.completed ? 0.62 : 1,
                    transition: "opacity 0.2s"
                  }}
                >
                  <button
                    className="todo-complete-btn"
                    aria-label={todo.completed ? "Mark as incomplete" : "Mark as completed"}
                    title={todo.completed ? "Mark as incomplete" : "Mark as completed"}
                    style={{
                      border: "none",
                      outline: "none",
                      background: "none",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "none",
                      fontSize: 20,
                      transition: "background 0.18s"
                    }}
                    onClick={() => handleToggleCompleted(todo.id)}
                  >
                    {todo.completed ? (
                      <span style={{ color: "#1976d2", fontWeight: 700 }}>✔</span>
                    ) : (
                      <span style={{
                        width: 19, height: 19,
                        display: "inline-block",
                        border: "2px solid #bdbdbd",
                        borderRadius: "50%"
                      }}></span>
                    )}
                  </button>
                  {editingId === todo.id ? (
                    <form
                      style={{
                        flex: 1,
                        display: "flex",
                        gap: 8,
                        alignItems: "center"
                      }}
                      onSubmit={(e) => { e.preventDefault(); handleEditSave(todo.id); }}
                    >
                      <input
                        ref={editInputRef}
                        type="text"
                        className="todo-edit-input"
                        value={editingText}
                        onChange={handleEditChange}
                        onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                        maxLength={120}
                        style={{
                          flex: 1,
                          fontSize: 16,
                          padding: "10px 8px",
                          border: "1px solid #ccc",
                          borderRadius: 6,
                          outline: "none",
                        }}
                      />
                      <button type="submit" aria-label="Save" style={{
                        background: "#1976d2",
                        color: "#fff",
                        fontWeight: 600,
                        border: "none",
                        borderRadius: 7,
                        fontSize: 14,
                        height: 36,
                        padding: "0 14px",
                        cursor: "pointer"
                      }}>Save</button>
                      <button type="button" aria-label="Cancel edit" onClick={handleEditCancel} style={{
                        background: "#eee",
                        color: "#666",
                        border: "none",
                        borderRadius: 7,
                        fontSize: 13,
                        height: 36,
                        padding: "0 11px",
                        cursor: "pointer"
                      }}>
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <span
                        className="todo-text"
                        style={{
                          flex: 1,
                          fontSize: 16.6,
                          textDecoration: todo.completed ? "line-through" : "none",
                          color: todo.completed ? "#959595" : "#242424",
                          wordBreak: "break-word",
                          opacity: todo.completed ? 0.5 : 1,
                          cursor: "default",
                          padding: "0 4px"
                        }}
                        onDoubleClick={() => handleEditStart(todo.id, todo.text)}
                        tabIndex={0}
                        aria-label={todo.text}
                      >
                        {todo.text}
                      </span>
                      <button
                        className="todo-edit-btn"
                        aria-label="Edit"
                        style={{
                          background: "#f5f6f8",
                          color: "#1976d2",
                          border: "none",
                          borderRadius: 7,
                          fontSize: 13,
                          fontWeight: 500,
                          height: 36,
                          padding: "0 12px",
                          marginLeft: 3,
                          cursor: "pointer",
                          transition: "background 0.18s"
                        }}
                        onClick={() => handleEditStart(todo.id, todo.text)}
                      >Edit</button>
                      <button
                        className="todo-delete-btn"
                        aria-label="Delete"
                        style={{
                          background: "#fff0f0",
                          border: "none",
                          color: "#d32f2f",
                          borderRadius: 7,
                          fontSize: 13,
                          height: 36,
                          fontWeight: 500,
                          padding: "0 13px",
                          marginLeft: 2,
                          cursor: "pointer",
                          transition: "background 0.18s"
                        }}
                        onClick={() => handleDelete(todo.id)}
                      >Delete</button>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </main>
        <footer style={{
          textAlign: "center",
          color: "#aaa",
          fontSize: 13.5,
          borderTop: "1px solid var(--border-color)",
          padding: "18px 4px 8px 4px",
          background: "transparent"
        }}>
          <span>Simple Todo App &middot; Minimal design &copy; 2024</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
