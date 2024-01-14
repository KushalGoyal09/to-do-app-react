import { useState } from 'react'
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

  const addItem = (text) => {
    const newItem = new Item(counter, text);
    const updatedItems = [...items, newItem];
    setItems(() => updatedItems)
    setCounter(counter + 1);
    console.log(updatedItems);
  }

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setCounter(counter - 1);
  }

  const toggleItem = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  }

  const editItem = (id, text) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, text: text } : item
    );
    setItems(updatedItems);
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
