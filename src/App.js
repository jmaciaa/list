import { useState } from 'react';
import './App.css';

// TO DO -> accesibility, Redux/useReducer, modificarrrr

function App() {
  const [elements, setElements] = useState({});
  const [value, setValue] = useState('');

  const addElement = (e) => {
    e.preventDefault();
    const newElement = e.target.elements.element.value.trim();
    if (newElement !== '') {
      const id = Date.now();
      setElements({ ...elements, [id]: newElement });
      setValue('');
    }
  };

  const modifyElement = (e, id) => {
    const newElement = e.target.textContent;
    setElements({ ...elements, [id]: newElement });
  };

  const deleteElement = (e, id) => {
    const newElements = { ...elements };
    delete newElements[id];
    setElements(newElements);
  };

  return (
    <div className="App">
      <Form addElement={addElement} value={value} setValue={setValue} />
      <List
        elements={elements}
        deleteElement={deleteElement}
        modifyElement={modifyElement}
      />
    </div>
  );
}

const Form = ({ addElement, value, setValue }) => {
  return (
    <form onSubmit={addElement}>
      <label htmlFor="element"></label>
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

const List = ({ elements, deleteElement, modifyElement }) => {
  const ids = Object.keys(elements);
  return (
    <>
      {!ids.length ? (
        <div>No elements in your list yet!</div>
      ) : (
        <ul>
          {ids.map((id) => (
            <li key={id}>
              <p
                contentEditable="true"
                suppressContentEditableWarning="true"
                onBlur={(e) => modifyElement(e, id)}
                onKeyPress={(e) => e.key === 'Enter' && e.target.blur()}
              >
                {elements[id]}
              </p>
              <button onClick={(e) => deleteElement(e, id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
