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
  const [deleteHoverId, setDeleteHoverId] = useState(null);

  // Backend API base URL
  const API_BASE = process.env.REACT_APP_API_URL;
  const API_URL = `${API_BASE}/api/tasks`;

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, [API_URL]);

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

  const toggleTodo = (id) => {
    const updated = todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(todos);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setTodos(reordered);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Futuristic styles object
  const styles = {
    appContainer: {
      backgroundColor: '#0f141d',
      minHeight: '100vh',
      padding: 20,
      maxWidth: 480,
      margin: '40px auto',
      borderRadius: 12,
      boxShadow: '0 0 30px #00ffe7',
      color: '#00ffe7',
      fontFamily: "'Orbitron', sans-serif",
      userSelect: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      fontSize: 36,
      fontWeight: '900',
      letterSpacing: '0.15em',
      marginBottom: 20,
      color: '#00ffe7',
      textShadow: '0 0 12px #00ffe7',
    },
    inputContainer: {
      display: 'flex',
      width: '100%',
      gap: 10,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      padding: '10px 15px',
      borderRadius: 30,
      border: 'none',
      outline: 'none',
      fontSize: 16,
      color: '#0f141d',
      fontWeight: '600',
      boxShadow: 'inset 0 0 10px #00ffe7',
      transition: 'box-shadow 0.3s ease',
    },
    inputFocus: {
      boxShadow: '0 0 15px 3px #00ffe7',
    },
    addButton: {
      padding: '10px 25px',
      borderRadius: 30,
      border: 'none',
      backgroundColor: '#00ffe7',
      color: '#0f141d',
      fontWeight: '700',
      fontSize: 16,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 0 15px #00ffe7',
    },
    addButtonHover: {
      backgroundColor: '#00c6b3',
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 30,
    },
    filterButton: (active) => ({
      padding: '6px 18px',
      borderRadius: 20,
      border: '2px solid #00ffe7',
      backgroundColor: active ? '#00ffe7' : 'transparent',
      color: active ? '#0f141d' : '#00ffe7',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      boxShadow: active ? '0 0 10px #00ffe7' : 'none',
    }),
    list: {
      listStyle: 'none',
      padding: 0,
      width: '100%',
    },
    listItem: (isDragging) => ({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#1c2533',
      padding: '12px 20px',
      marginBottom: 12,
      borderRadius: 12,
      boxShadow: isDragging
        ? '0 0 20px 5px #00ffe7'
        : '0 0 10px 1px rgba(0, 255, 231, 0.4)',
      transition: 'box-shadow 0.3s ease',
      userSelect: 'none',
    }),
    checkbox: {
      width: 20,
      height: 20,
      cursor: 'pointer',
      accentColor: '#00ffe7',
      borderRadius: 5,
      flexShrink: 0,
    },
    taskText: (completed) => ({
      flex: 1,
      marginLeft: 15,
      color: completed ? '#555' : '#00ffe7',
      textDecoration: completed ? 'line-through' : 'none',
      fontSize: 18,
      fontWeight: '600',
      cursor: 'pointer',
      userSelect: 'text',
      transition: 'color 0.3s ease',
    }),
    editInput: {
      flex: 1,
      marginLeft: 15,
      fontSize: 18,
      padding: '6px 10px',
      borderRadius: 8,
      border: '2px solid #00ffe7',
      outline: 'none',
      backgroundColor: '#121a28',
      color: '#00ffe7',
      fontWeight: '600',
      boxShadow: '0 0 10px #00ffe7',
    },
    deleteButton: {
      marginLeft: 20,
      backgroundColor: '#ff004d',
      border: 'none',
      borderRadius: 12,
      padding: '6px 14px',
      color: '#fff',
      fontWeight: '700',
      fontSize: 14,
      cursor: 'pointer',
      boxShadow: '0 0 10px #ff004d',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      userSelect: 'none',
    },
    deleteButtonHover: {
      backgroundColor: '#cc003d',
      boxShadow: '0 0 20px #ff004d',
    },
  };

  // Hover state for add button
  const [addHover, setAddHover] = useState(false);

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.header}>To-Do List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') addTodo();
          }}
          placeholder="Enter a task..."
          style={{
            ...styles.input,
            ...(addHover ? styles.inputFocus : {}),
          }}
          onFocus={() => setAddHover(true)}
          onBlur={() => setAddHover(false)}
        />
        <button
          onClick={addTodo}
          style={{
            ...styles.addButton,
            ...(addHover ? styles.addButtonHover : {}),
          }}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          aria-label="Add new task"
        >
          Add
        </button>
      </div>

      <div style={styles.filterContainer}>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={styles.filterButton(filter === f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={styles.list}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...styles.listItem(snapshot.isDragging),
                        ...provided.draggableProps.style,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo._id)}
                        style={styles.checkbox}
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
                          style={styles.editInput}
                        />
                      ) : (
                        <span
                          style={styles.taskText(todo.completed)}
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
                          ...styles.deleteButton,
                          ...(deleteHoverId === todo._id ? styles.deleteButtonHover : {})
                        }}
                        onMouseEnter={() => setDeleteHoverId(todo._id)}
                        onMouseLeave={() => setDeleteHoverId(null)}
                        aria-label={`Delete task: ${todo.text}`}
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
