/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

import styling from './tag-bar.css';

class TagBar extends React.Component {
  constructor() {
    super();
    this.state = {
      newTag: '',
    };
    this.tagInput = 'tagInput';
  }

  /*
  If either tab or enter is pressed..

  - prevent the usual behaviour of those keys
  - attempt to add the new tag to our store state
  - clear the input box
  */
  handleKeyDown = e => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      this.props.addTag(this.state.newTag);
      this.setState({ newTag: '' });
    } else if (e.key === 'Backspace') {
      if (!e.target.value) {
        e.preventDefault();
        const lastTagIndex = this.props.tags.length - 1;
        this.props.removeTag(lastTagIndex);
      }
    }
  }

  // Keep a track of the newly entered tag. This is a controlled component.
  handleInput = e => {
    this.setState({ newTag: e.target.value });
  }

  removeTag = index => () => {
    this.props.removeTag(index);
  }

  handleClick = () => {
    /* eslint-disable react/no-string-refs */
    this.refs.tagInput.focus();
    /* eslint-enable react/no-string-refs */
  }

  render() {
    /*
    Generate a series of tag components from the array of tags.

    Setup handler to remove a tag if the link on that tag is clicked.
    */
    const tagComponents = this.props.tags.map((tag, index) => (
      <span key={index} className={styling.tag} onClick={e => { e.stopPropagation(); }}>
        {tag} <a onClick={this.removeTag(index)}>&times;</a>
      </span>
    ));

    const placeholderText = (tagComponents.length === 0) ? '+ add a tag' : '+ another tag?';

    return (
      <div className={styling['tag-bar']}>
        <div
          className={styling['tag-input-component']} onClick={this.handleClick}>
          <span>
            {tagComponents}
            <input
              ref={this.tagInput}
              type="text"
              value={this.state.newTag}
              placeholder={placeholderText}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleInput}
              autoFocus={false} />
          </span>
        </div>
      </div>
    );
  }
}

TagBar.propTypes = {

  tags: React.PropTypes.array.isRequired,

  /* functions */
  addTag: React.PropTypes.func.isRequired,
  removeTag: React.PropTypes.func.isRequired,
};

export default TagBar;
