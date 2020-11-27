import { render, screen, fireEvent } from '@testing-library/react';
import App, { Form, List } from './App';

const elements = { 1: 'Book', 2: 'Table' };
const event = { target: { value: 'Keyboard' } };
const addElements = () => {
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

  test('an element can be deleted', () => {
    render(<App />);
    addElements();
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('Keyboard')).not.toBeInTheDocument();
  });

  test('an element can be modified', () => {
    render(<App />);
    addElements();
    fireEvent.blur(screen.getByText('Keyboard'), {
      target: { textContent: 'Mouse' },
    });
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    screen.getByText('Mouse').focus();
    fireEvent.keyPress(screen.getByText('Mouse'), {
      key: 'Enter',
    });
    expect(screen.getByText('Mouse')).toHaveFocus();
    screen.debug();
    // expect(screen.getByText('Screen')).toBeInTheDocument();
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
    render(<List elements={elements} />);
    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
  });

  test('when there are no elements, a message should show', async () => {
    render(<List elements={{}} />);
    expect(screen.getByText(/no elements/i)).toBeInTheDocument();
  });
});
