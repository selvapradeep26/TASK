import React, { useState } from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.task);

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText) {
      todo.task = editText;
      setIsEditing(false);
    }
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input 
            type="text" 
            value={editText} 
            onChange={handleEditChange} 
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <span onClick={() => toggleTodo(todo.id)}>{todo.task}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
