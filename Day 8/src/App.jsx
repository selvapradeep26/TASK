import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  
  // Function to add a new task
  const addTodo = (e) => {
    e.preventDefault();
    if (task) {
      setTodos([...todos, { task, completed: false, id: Date.now() }]);
      setTask('');
    }
  };

  // Function to toggle task completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a task
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to clear completed tasks
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      
      {/* Form to add a new task */}
      <form onSubmit={addTodo} className="todo-form">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button type="submit">Add</button>
      </form>

      {/* List of tasks */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.task}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Button to clear completed tasks */}
      <button className="clear-completed-btn" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default App;
