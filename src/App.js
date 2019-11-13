import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showItens, setShowItens] = useState('all');

  function addTodo(e) {
    e.preventDefault();
    setTodos([...todos, { name: newTodo, status: 'active' }]);
    setNewTodo('');
  }
  function deleteTodo(selectedTodo) {
    setTodos(todos.filter(e => e.name !== selectedTodo))
  }
  function changeStatusTodo(selectedTodo) {
    setTodos(todos.filter(e => {
      if (e.name === selectedTodo)
        e.status = (e.status === 'active') ? 'completed' : 'active';
      return e;
    }))
  }
  useEffect(() => {
    const toDoList = localStorage.getItem('todos');
    if (toDoList) {
      setTodos(JSON.parse(toDoList));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <form onSubmit={addTodo}>
        <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      </form>
      <ul>
        {todos.map(todo =>
          (showItens === todo.status || showItens === 'all') && (
            <li key={todo.name}>
              {todo.name}
              <button onClick={() => changeStatusTodo(todo.name)} className="statusBtn">
                {todo.status === 'active' ? 'Marcar como feito' : 'Marcar como não feito'}
              </button>
              <button onClick={() => deleteTodo(todo.name)} className="deleteBtn">Deletar</button>
            </li>
          )
        )}
      </ul>
      <span>
        Você tem {(showItens !== 'all') ?
          todos.filter(e => e.status === showItens).length
          :
          todos.length
        } itens</span>
      <div>
        <button onClick={() => setShowItens('all')}>Todos</button>
        <button onClick={() => setShowItens('active')}>Ativos</button>
        <button onClick={() => setShowItens('completed')}>Completados</button>
      </div>
    </div>
  );
}

export default App;
