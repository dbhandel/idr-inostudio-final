import React from 'react';
import cn from 'classnames';

// components
import EyeIcon from 'views/icons/eye';
import cssFront from './text-field-front.css';
import cssDashboard from './text-field-dashboard.css';

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
    };
  }

  onChange = event => {
    this.props.onChange(event.target.name, event.target.value);
  }

  changeType = type => () => {
    this.setState({ type });
  }

  render() {
    const css = this.props.variant === 'dashboard' ? cssDashboard : cssFront;
    let errorMessage;
    let errorClass;

    if (this.props.errorMessage) {
      errorMessage = <div className={css['error-message']}>{this.props.errorMessage}</div>;
      errorClass = 'has-error';
    }

    const icon = (this.props.hasIcon)
      ? <EyeIcon onMouseDown={this.changeType('text')} onMouseUp={this.changeType('password')} />
      : '';

    const className = cn(
      css['input-component'],
      {
        [css['not-transparent']]: !this.props.isTransparent,
      },
      {
        [css['has-icon']]: this.props.hasIcon,
      },
    );

    return (
      <div className={className}>
        {icon}
        <input
          name={this.props.name}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          type={this.state.type}
          value={this.props.value}
          className={css[errorClass]} />
        {errorMessage}
      </div>
    );
  }
}

TextField.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  hasIcon: React.PropTypes.bool,
  isTransparent: React.PropTypes.bool,
  variant: React.PropTypes.string,
};
