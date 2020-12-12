import { useState, useReducer } from 'react';
import './App.css';

export const elementListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const newElement = action.payload.trim();
      if (newElement !== '') {
        const id = Date.now();
        return [...state, { id, name: newElement }];
      }
      return state;
    }
    case 'MODIFY': {
      const id = action.el.id;
      const newName = action.payload.trim();
      const newState = state.map((el) =>
        el.id === id ? { id, name: newName } : el
      );
      return newState;
    }
    case 'DELETE': {
      return state.filter((el) => el.id !== action.payload.id);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(elementListReducer, []);

  return (
    <div className="App">
      <h1>My Elements List</h1>
      <Form dispatch={dispatch} />
      <List state={state} dispatch={dispatch} />
    </div>
  );
}

export const Form = ({ dispatch }) => {
  const [value, setValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'ADD', payload: e.target.elements.element.value });
        setValue('');
      }}
    >
      <label htmlFor="element" aria-label="element"></label>
      <input
        type="text"
        id="element"
        value={value}
        placeholder="Add an element"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export const List = ({ state, dispatch }) => {
  return (
    <>
      {!state.length ? (
        <div className="msg">No elements in your list yet!</div>
      ) : (
        <ul>
          {state.map((el) => (
            <li key={el.id}>
              <p
                contentEditable="true"
                suppressContentEditableWarning="true"
                onBlur={(e) =>
                  dispatch({
                    type: 'MODIFY',
                    payload: e.target.textContent,
                    el,
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
              >
                {el.name}
              </p>
              <button onClick={() => dispatch({ type: 'DELETE', payload: el })}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
