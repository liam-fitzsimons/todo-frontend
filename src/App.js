import { useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Backend API base URL
  // const API_URL = 'http://localhost:5000/api/tasks';
  const API_URL = process.env.REACT_APP_API_URL;
  console.log('API_URL:', process.env.REACT_APP_API_URL);

  // Fetch tasks from backend when app loads
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  // Add new task via POST request
  const addTodo = () => {
    if (task.trim() === '') return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: task })
    })
      .then(res => res.json())
      .then(newTask => {
        setTodos(prev => [...prev, newTask]);
        setTask('');
      })
      .catch(err => console.error('Error adding task:', err));
  };

  // Delete task from backend and update state
  const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete');
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error('Error deleting task:', err));
  };

  // Toggle task completion locally (optional: can be synced with backend if you add PUT for completed)
  const toggleTodo = (id) => {
    const updated = todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  // Update task text on backend and update state
  const updateTodo = (id, newText) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTodos(prev => prev.map(todo => (todo._id === id ? updatedTask : todo)));
        setEditingId(null);
      })
      .catch(err => console.error('Error updating task:', err));
  };

  // Handle drag and drop reorder locally
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(todos);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setTodos(reordered);
  };

  // Filtered todos according to filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h1>To-Do List</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') addTodo();
          }}
          placeholder="Enter a task"
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filter buttons */}
      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
        >
          Completed
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: 'none', padding: 0 }}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 8,
                        background: '#f9f9f9',
                        padding: '10px 12px',
                        borderRadius: 4,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        ...provided.draggableProps.style
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo._id)}
                      />

                      {editingId === todo._id ? (
                        <input
                          type="text"
                          value={editingText}
                          onChange={e => setEditingText(e.target.value)}
                          onBlur={() => updateTodo(todo._id, editingText)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              updateTodo(todo._id, editingText);
                            } else if (e.key === 'Escape') {
                              setEditingId(null);
                            }
                          }}
                          autoFocus
                          style={{ marginLeft: 10, flex: 1, padding: 4 }}
                        />
                      ) : (
                        <span
                          style={{
                            marginLeft: 10,
                            flex: 1,
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            cursor: 'pointer'
                          }}
                          onDoubleClick={() => {
                            setEditingId(todo._id);
                            setEditingText(todo.text);
                          }}
                        >
                          {todo.text}
                        </span>
                      )}

                      <button
                        onClick={() => deleteTodo(todo._id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
