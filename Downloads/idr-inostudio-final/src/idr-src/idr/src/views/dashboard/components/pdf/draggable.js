import React from 'react';

import css from './draggable.css';

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: this.props.initialPos,
      dragging: false,
      rel: { x: 300, y: 300 },
    };
  }
  componentWillMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  onMouseDown = e => {
    const pos = this.drag;
    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.offsetLeft,
        y: e.pageY - pos.offsetTop,
      },
    });
    e.stopPropagation();
    e.preventDefault();
  }
  onMouseUp = e => {
    this.setState({ dragging: false });
    e.stopPropagation();
    e.preventDefault();
  }
  onMouseMove = e => {
    if (!this.state.dragging) return;
    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y,
      },
    });
    this.props.handlePositionY(e.pageY);
    e.stopPropagation();
    e.preventDefault();
  }
  render() {
    const left = `${this.state.pos.x}px`;
    const top = `${this.state.pos.y}px`;

    return (
      <div
        ref={drag => { this.drag = drag; }}
        onMouseDown={this.onMouseDown}
        className={css.draggable}
        style={{ left, top }}>
        {this.props.children}
      </div>
    );
  }
}

Draggable.defaultProps = {
  initialPos: { x: 300, y: 300 },
  handlePositionY: pageY => pageY,
};

Draggable.propTypes = {
  initialPos: React.PropTypes.object,
  children: React.PropTypes.object,

  handlePositionY: React.PropTypes.func,
};

export default Draggable;
