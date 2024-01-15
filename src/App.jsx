import { useEffect, useState } from 'react'
import Heading from './components/Heading'
import ToDoItem from './components/ToDoItem'
import Input from './components/Input'

class Item {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

function App() {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('items');
    if (data) {
      setItems(JSON.parse(data));
    }
    const count = localStorage.getItem('counter');
    if (count) {
      setCounter(JSON.parse(count));
    }
  }, []);

  const addItem = (text) => {
    const newItem = new Item(counter, text);
    const updatedItems = [...items, newItem];
    setItems(() => updatedItems)
    setCounter((prev) => prev + 1);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    localStorage.setItem('counter', JSON.stringify(counter + 1));
  }

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }

  const toggleItem = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }

  const editItem = (id, text) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, text: text } : item
    );
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }

  return (
    <>
      <Heading />
      <Input addItem={addItem} />
      <div>
        {items.map(item => (
          <ToDoItem key={item.id} item={item} onDelete={deleteItem} onToggle={toggleItem} onEdit={editItem} />
        ))}
      </div>
    </>
  )
}

export default App
