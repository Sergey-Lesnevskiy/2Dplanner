
import './App.css';
import ItemList from './ItemList.jsx';
import React from 'react';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';

class DraggableItem extends React.Component {
  draggableRef = React.createRef();

  render() {
    return (
      <Draggable nodeRef={this.draggableRef} bounds="parent">
        <div
          ref={this.draggableRef}
          style={{
            padding: '20px',
            border: '1px solid black',
            margin: '10px',
            backgroundColor: 'lightblue',
            width: '30px',
          }}
        >
          {this.props.item}
        </div>
      </Draggable>
    );
  }
}

const App = () => {
  const items = useSelector((state) => state.items); // Получаем items из Redux store

  return (
    <div>
      <ItemList />
      <div
        style={{
          border: '1px dashed gray',
          height: '500px',
          marginTop: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {items?.map((item) => (
          <DraggableItem key={item.id} item={item.name} />
        ))}
      </div>
    </div>
  );
};

export default App;
