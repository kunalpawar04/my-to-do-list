import React, { useState } from "react";
import "./TodoList.css"; // Import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Task 1", completed: false, backgroundColor: "#E0E3DE" },
    { id: 2, text: "Task 2", completed: false, backgroundColor: "#E0E3DE" },
    // Add more initial tasks with different background colors as needed
  ]);

  const [showOptions, setShowOptions] = useState(false); // Control the visibility of additional icons

  const handleEdit = (id, newText) => {
    // Implement editing logic here
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, droppedIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const newTodos = [...todos];
    const [draggedTodo] = newTodos.splice(draggedIndex, 1);
    newTodos.splice(droppedIndex, 0, draggedTodo);
    setTodos(newTodos);
  };

  const handleCheckboxToggle = (id) => {
    // Implement checkbox marking logic here
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleOptionsClick = () => {
    // Toggle the visibility of additional icons
    setShowOptions(!showOptions);
  };

  const handleDeleteClick = () => {
    // Handle task deletion
    setTodos([]);
  };

  const handleAddTaskClick = () => {
    // Handle adding a new task with default background color
    const newTask = {
      id: todos.length + 1,
      text: "New Task",
      completed: false,
      backgroundColor: "#E0E3DE", // Set the default background color
    };
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  return (
    <div>
      {/* Apply the blurred background class */}
      <div className="blurred-background"></div>

      <div className="todo-list-container">
        <div className="title-box">
          <h1 className="title">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => handleOptionsClick()}
              className="icon-hover"
            />
            To-Do List
            {showOptions && (
              <div className="options-menu">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleDeleteClick()}
                  className="icon-hover"
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => handleAddTaskClick()}
                  className="icon-hover"
                />
              </div>
            )}
          </h1>
        </div>
        <ul className="list-group-item">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              style={{ backgroundColor: todo.backgroundColor }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxToggle(todo.id)}
                style={{ verticalAlign: "middle", marginRight: "10px" }}
              />
              <span
                contentEditable
                onBlur={(e) => handleEdit(todo.id, e.target.innerText)}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
