import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo, clearCompleted }) {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <button className="clear-completed-btn" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default TodoList;
