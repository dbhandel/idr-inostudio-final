/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import cn from 'classnames';

import css from './toggle.css';

const Check = () => (
  <svg width="14" height="11" viewBox="0 0 14 11">
    <title>
      switch-check
    </title>
    <path d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0" fill="#fff" fillRule="evenodd" />
  </svg>
);

const X = () => (
  <svg width="10" height="10" viewBox="0 0 10 10">
    <title>
      switch-x
    </title>
    <path d="M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12" fill="#fff" fillRule="evenodd" />
  </svg>
);

export default class Toggle extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      hasFocus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  storeCheckboxRef = ref => {
    this.checkbox = ref;
  }

  handleClick = event => {
    if (event.target !== this.checkbox) {
      event.preventDefault();
      this.checkbox.focus();
      this.checkbox.click();
      return;
    }
    if (!('checked' in this.props)) {
      this.setState({
        checked: this.checkbox.checked,
      });
    }
  }

  handleFocus = () => {
    this.setState({
      hasFocus: true,
    });
  }

  handleBlur = () => {
    this.setState({
      hasFocus: false,
    });
  }

  render() {
    const classes = cn(css['react-toggle'], {
      [css['react-toggle--checked']]: this.state.checked,
      [css['react-toggle--focus']]: this.state.hasFocus,
      [css['react-toggle--disabled']]: this.props.disabled,
    });

    return (
      <div className={classes} onClick={this.handleClick}>
        <div className={css['react-toggle-track']}>
          <div className={css['react-toggle-track-check']}>
            <Check />
          </div>
          <div className={css['react-toggle-track-x']}>
            <X />
          </div>
        </div>
        <div className={css['react-toggle-thumb']} />
        <input
          ref={this.storeCheckboxRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className={css['react-toggle-screenreader-only']}
          type="checkbox"
          {...this.props} />
      </div>
    );
  }
}

Toggle.propTypes = {
  disabled: React.PropTypes.bool,
};
