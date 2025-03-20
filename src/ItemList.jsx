import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import table from './assets/table.svg';
import chair from './assets/chair.svg';
import partition from './assets/partition.svg';

const ItemList = () => {
  const [itemsP, setItemsP] = useState([
    { id: 1, name: 'Стол', image: table, checked: false },
    { id: 2, name: 'Стул', image: chair, checked: false },
    { id: 3, name: 'Перегородка', image: partition, checked: false },

  ]);

  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  
  const itemRefs = useRef(new Map());

  const toggleCheckbox = (id) => {
    setItemsP((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addCheckedItems = () => {
    const data = itemsP
      .filter(item => item.checked)
      .map((item, index) => {
        const coords = itemRefs.current.get(item.id)?.getBoundingClientRect();
        return {
          ...item,
          id: index + (items === undefined ? 0 : items.length + 1),
          position: coords ? { x: coords.x, y: coords.y } : { x: 0, y: 0 }
        };
      });

    dispatch({ type: 'ADD_ITEMS', payload: data });
    resetCheckboxes();
  };

  const resetCheckboxes = () => {
    setItemsP(prevItems => prevItems.map(item => ({ ...item, checked: false })));
  };



  return (
    <div>
      <div className="item-list">
        {itemsP.map(item => (
          <div 
            key={item.id} 
            className="item-card" 
            ref={el => itemRefs.current.set(item.id, el)}
          >
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckbox(item.id)}
              />
              {item.name}
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