
import React, { useState } from 'react';
const items = [
  { id: 1, name: 'Стол', image: '/images/стол.jpg' },
  { id: 2, name: 'Стул', image: '/images/стул.jpg' },
  { id: 3, name: 'Перегородка', image: '/images/перегородка.jpg' },
];
const Board = () => {
  const [itemsOnBoard, setItemsOnBoard] = useState([]);

  const handleDrop = (e) => {
    const id = e.dataTransfer.getData("id");
    const newItem = { id, x: e.clientX, y: e.clientY };
    setItemsOnBoard(prevItems => [...prevItems, newItem]);
  };

  return (
    <div 
      className="board" 
      onDrop={handleDrop} 
      onDragOver={(e) => e.preventDefault()} 
      style={{ position: 'relative', width: '800px', height: '600px', border: '1px solid black' }}
    >
      {itemsOnBoard.map(item => (
        <div key={item.id} style={{ position: 'absolute', left: item.x, top: item.y }}>
          <img src={items.find(i => i.id === item.id).image} 
              alt={items.find(i => i.id === item.id).name} 
              draggable 
              onDragStart={(e) => e.dataTransfer.setData('id', item.id)}
          />
        </div>
      ))}
    </div>
  );
};