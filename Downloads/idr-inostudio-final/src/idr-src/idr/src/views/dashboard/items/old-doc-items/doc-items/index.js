/* eslint-disable arrow-body-style */

import React from 'react';

/* components */
import DocItem from 'views/dashboard/items/old-doc-items/doc-item';

class DocItems extends React.Component {

  constructor() {
    super();
    this.state = {
      leftActionActive: null,
      rightActionActive: null,
    };
  }

  setLeftAction = val => {
    this.setState({ leftActionActive: val });
  }

  setRightAction = val => {
    this.setState({ rightActionActive: val });
  }

  render() {
    return (
      <div>
        {this.props.items.map((it, i) => {
          return (
            <DocItem
              id={it.id}
              key={i}
              /* on select */
              toggleSelected={() => this.props.toggleSelected(it)}
              isSelected={this.props.isSelected(it)}
              /* on click */
              onClick={() => this.props.onClick(it.id)}
              createClick={() => this.props.createClick(it.id)}
              deleteClick={() => this.props.deleteClick(it.id)}
              /* swipeout */
              leftActionActive={this.state.leftActionActive}
              rightActionActive={this.state.leftActionActive}
              setLeftAction={this.setLeftAction}
              setRightAction={this.setLeftAction}>
              {it.text}
            </DocItem>);
        })}
      </div>
    );
  }

}

DocItems.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.any),

  /* swipeout action */
  isSelected: React.PropTypes.func,
  toggleSelected: React.PropTypes.func,
  createClick: React.PropTypes.func,
  deleteClick: React.PropTypes.func,
  onClick: React.PropTypes.func,
};

export default DocItems;
