import { render, screen, fireEvent } from '@testing-library/react';
import App, { Form, List, elementListReducer } from './App';

const elements = [
  { id: 1, name: 'Book' },
  { id: 2, name: 'Table' },
];
const event = { target: { value: 'Keyboard' } };

const addElement = () => {
  fireEvent.change(screen.getByPlaceholderText('Add an element'), event);
  fireEvent.click(screen.getByText('Add'));
};

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('My Elements List')).toBeTruthy();
  });

  test('an element can be created', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Add an element'), event);
    expect(screen.getByPlaceholderText('Add an element').value).toBe(
      'Keyboard'
    );
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
  });

  test('an element is not created if input is empty', () => {
    render(<App />);
    const fakeEvent = { target: { value: ' ' } };
    fireEvent.change(screen.getByPlaceholderText('Add an element'), fakeEvent);
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText(/no elements/i)).toBeInTheDocument();
  });

  test('an element can be deleted', () => {
    render(<App />);
    addElement();
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('Keyboard')).not.toBeInTheDocument();
  });

  test('an element can be modified', () => {
    render(<App />);
    addElement();
    fireEvent.change(screen.getByPlaceholderText('Add an element'), {
      target: { value: 'Headphones' },
    });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.blur(screen.getByText('Keyboard'), {
      target: { textContent: 'Mouse' },
    });
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    screen.getByText('Mouse').focus();
    fireEvent.keyDown(screen.getByText('Mouse'), {
      key: 'Enter',
    });
    expect(screen.getByText('Mouse')).not.toHaveFocus();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
  });

  test('the state is kept if an action that does not exist is dispatched', () => {
    const action = { type: 'DO_SOMETHING' };
    expect(() => elementListReducer([], action)).toThrow();
  });
});

describe('Form', () => {
  test('renders input and "Add" buttton', () => {
    render(<Form />);
    expect(screen.getByText(/add/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add an element/i)).toBeInTheDocument();
  });
});

describe('List', () => {
  test('renders elements', () => {
    render(<List state={elements} />);
    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
  });

  test('when there are no elements, a message should show', async () => {
    render(<List state={[]} />);
    expect(screen.getByText(/no elements/i)).toBeInTheDocument();
  });
});
