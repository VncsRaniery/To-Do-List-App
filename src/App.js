import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      addItem(inputValue);
      setInputValue('');
    }
  };

  const addItem = (text) => {
    const newItem = { text, id: Date.now() };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const toggleItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="container">
      <div className="box">
        <h2>To do List</h2>
        <input
          id="inputBx"
          type="text"
          placeholder="Digite aqui sua tarefa..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
        <ul>
          {items.map((item) => (
            <li key={item.id} className={item.done ? 'done' : ''} onClick={() => toggleItem(item.id)}>
              {item.text}
              <i onClick={() => removeItem(item.id)}></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;