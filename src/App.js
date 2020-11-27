import { useState, useReducer } from 'react';
import './App.css';

const elementListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const newElement = action.payload.trim();
      if (newElement !== '') {
        const id = Date.now();
        return { ...state, [id]: newElement };
      }
      break;
    }
    case 'MODIFY': {
      const newElement = action.payload.trim();
      return { ...state, [action.id]: newElement };
    }
    case 'DELETE': {
      const newElements = { ...state };
      delete newElements[action.id];
      return newElements;
    }
    default: {
      return state;
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(elementListReducer, {});

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
  const ids = Object.keys(state);
  return (
    <>
      {!ids.length ? (
        <div className="msg">No elements in your list yet!</div>
      ) : (
        <ul>
          {ids.map((id) => (
            <li key={id}>
              <p
                contentEditable="true"
                suppressContentEditableWarning="true"
                onBlur={(e) =>
                  dispatch({
                    type: 'MODIFY',
                    payload: e.target.textContent,
                    id,
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
              >
                {state[id]}
              </p>
              <button onClick={() => dispatch({ type: 'DELETE', id })}>
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
