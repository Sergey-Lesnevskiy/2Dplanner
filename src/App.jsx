import './App.css';
import ItemList from './ItemList.jsx';
import DraggableItem from './DraggableItem.jsx';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveItemPositions } from './actions';

const App = () => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [itemPositions, setItemPositions] = useState({});

  const handleDragStop = (id, data) => {
    setItemPositions(prev => ({
      ...prev,
      [id]: { x: data.x, y: data.y },
    }));
  };

  const savePositionsToFile = () => {
    const arrPositions = items.map((item) => { return item.position });

    const data = JSON.stringify({ ...arrPositions }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'item_positions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const savePositionsInStore = () => {
    dispatch(saveItemPositions(itemPositions));
    savePositionsToFile();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const parsedPositions = JSON.parse(content);
          setItemPositions(parsedPositions); // Обновляем координаты
          // Здесь произойдет перерисовка компонента, так как состояние обновляется
        } catch (error) {
          alert("Ошибка при загрузке файла: некорректный формат JSON");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <ItemList />
      <button onClick={savePositionsInStore} style={{ marginBottom: '20px' }}>
        Save Positions
      </button>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ marginBottom: '20px' }}
      />
      <div
        style={{
          border: '1px dashed gray',
          height: '500px',
          marginTop: '20px',
          width: '300px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {items.map((item) => {
          const position = itemPositions[item.id] || { x: 0, y: 0 };
          return (
            <DraggableItem
              key={item.id}
              item={{ ...item, position }} 
              position= {{...item.position}}
              onStop={handleDragStop}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
