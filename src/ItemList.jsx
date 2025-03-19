import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ItemList = () => {
  const [itemsP, setItemsP ]= useState([
    { id: 1, name: 'Стол', image: import('./assets/icon.jpg'), checked: false },
    { id: 2, name: 'Стул', image: import('./assets/icon.jpg'), checked: false },
    { id: 3, name: 'Перегородка', image: import('./assets/icon.jpg'), checked: false },
    { id: 4, name: 'Перегородка', image: import('./assets/icon.jpg'), checked: false },
    { id: 5, name: 'Перегородка', image: import('./assets/icon.jpg'), checked: false },
  ])
  const items = useSelector((state) => state.items); 
  const dispatch = useDispatch();

  const toggleCheckbox = (id) => {
    setItemsP(prevItems =>
      prevItems.map(item => 
          item.id === id ? { ...item, checked: !item.checked } : item
      )
  );
  };

  const addCheckedItems = () => {
    const data = itemsP
      .filter(item => item.checked)
      .map((item, index) => ({ ...item, id: index + (items==undefined? 0 :items.length + 1) })); // Генерируем новый id
      console.log(data);
    dispatch({ type: 'ADD_ITEMS', payload: data }); 
  };

  return (
    <div>
      <div className="item-list">
        {itemsP.map(item => (
          <div key={item.id} className="item-card">
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckbox(item.id)}
              />
            </label>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
          </div>
        ))}
      </div>
      <button onClick={addCheckedItems}>Добавить</button>
    </div>
  );
};

export default ItemList;