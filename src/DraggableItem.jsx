
import React from 'react';
import Draggable from 'react-draggable';


class DraggableItem extends React.Component {
  draggableRef = React.createRef();
  constructor(props) {
    super(props);

console.log(props);
    this.state = {
      position: { x: props.item.position.x, y: props.item.position.y } // Инициализируем начальную позицию
    };
  }
  
  handleStop = (e, data) => {
    const { onStop, item } = this.props;
    this.setState({ position: { x: data.x, y: data.y } }); // Обновляем позицию в состоянии
    onStop(item.id, data); 

  };
  componentDidUpdate(prevProps) {
    if (prevProps.item.position.x !== this.props.item.position.x || prevProps.item.position.y !== this.props.item.position.y) {
      console.log('this.props',this.props);
      this.setState({
        position: { x: this.props.item.position.x, y: this.props.item.position.y }
      });
    }
  }

  render() {
    const { position } = this.state;
    return (
      <Draggable
        nodeRef={this.draggableRef}
        bounds="parent"
        position={position}
        onStop={this.handleStop}
      >
        <div
          ref={this.draggableRef}
          style={{
            textAlign: 'center',
            border: '1px solid black',
            margin: '10px',
            fontSize: '14px',
            backgroundColor: 'lightblue',
            maxWidth: '50px',
          }}
        >
          {this.props.item.image}
        </div>
      </Draggable>
    );
  }
}

export default DraggableItem;