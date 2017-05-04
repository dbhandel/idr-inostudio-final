import React from 'react';
import Pin from './pin';
import MenuPin from './menuPin';
import Draggable from './draggable';
import EditRecall from './editRecall';

import css from './pin.css';

class PinComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      action: '',
      pin: '',
      pageY: 0,
    };
  }

  handleClick = action => this.setState({ action });
  handleMenuClick = pin => this.setState({ pin });
  handlePositionY = pageY => this.setState({ pageY });

  render() {
    const { action, pin, pageY } = this.state;
    const diff = document.documentElement.clientHeight - pageY;
    const isReverse = diff < 250 || false;

    const renderMenuPin = <MenuPin handleMenuClick={this.handleMenuClick} />;
    const renderDraggable = (
      <Draggable handlePositionY={this.handlePositionY}>
        {pin === 'notes' ? <EditRecall reverse={isReverse} handleClick={this.props.handleEditClick} /> : renderMenuPin}
      </Draggable>
    );
    return (
      <div className={css.container}>
        <Pin handleClick={this.handleClick} action={this.state.action} />
        <div className={css.content}>
          here will pdf layout
          {action === 'pin' ? renderDraggable : null}
        </div>
      </div>
    );
  }
}

PinComponent.propTypes = {
  handleEditClick: React.PropTypes.func,
};

export default PinComponent;
