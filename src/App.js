import { useState } from 'react';
import './App.css';

// TO DO -> accesibility, Redux/useReducer, modificarrrr

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    const task = e.target.elements.task.value.trim();
    if (task !== '') {
      setTodos([...todos, { id: Date.now(), task }]);
      setValue('');
    }
  };

  const modifyTask = (e, id) => {
    const newTask = e.target.textContent;
    const newTodo = { id, task: newTask };
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos([...updated, newTodo]);
  };

  const deleteTask = (e, id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <Form addTask={addTask} value={value} setValue={setValue} />
      <TodoList todos={todos} deleteTask={deleteTask} modifyTask={modifyTask} />
    </div>
  );
}

const Form = ({ addTask, value, setValue }) => {
  return (
    <form action="" onSubmit={addTask}>
      <label htmlFor="task"></label>
      <input
        type="text"
        id="task"
        value={value}
        placeholder="Add a task to your list"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const TodoList = ({ todos, deleteTask, modifyTask }) => {
  return (
    <ul>
      {!todos.length
        ? 'No tasks in your list yet!'
        : todos.map((todo) => (
            <li key={todo.id}>
              <p contentEditable="true" onBlur={(e) => modifyTask(e, todo.id)}>
                {todo.task}
              </p>
              <button onClick={(e) => deleteTask(e, todo.id)}>Delete</button>
            </li>
          ))}
    </ul>
  );
};

export default App;
