import React from 'react';
import cn from 'classnames';

/* css */
import css from 'views/common/forms.css';

/* components */
import TextField from 'views/common/form/text-field';
import ButtonComponent from 'views/common/form/button';

class ForgotPasswordForm extends React.Component {

  constructor() {
    super();
    this.state = {
      successResponse: null,
      email: '',
    };

    this.handleUpdateField = this.handleUpdateField.bind(this);
    this.handelOnSend = this.handelOnSend.bind(this);
    this.handleOnResend = this.handleOnResend.bind(this);
  }

  handleUpdateField(field, val) {
    this.setState({ email: val });
    this.props.updateField(field, val);
  }

  handelOnSend() {
    this.setState({ successResponse: this.props.sendResetPassword() });
  }

  handleOnResend() {
    this.setState({ email: '' });
    this.setState({ successResponse: false });
  }

  render() {
    let view;

    if (this.state.successResponse) {
      view = (
        <div className={css['success-block']}>
          <div className={css['legend-outter']}>
            <div className={css['legend-inner']}>
              <div className={css.text}>
                Success!
              </div>
              <div className={css.text}>
                We&#39;ve just send an email to
                <span> <span className={css.highlighted}>{this.state.email}</span> </span>
                with a link and instructions to reset your IDR password. It should
                arrive shortly. See you inside.
              </div>
            </div>
          </div>
          <div className={cn(css.buttons)}>
            <ButtonComponent
              success
              label="RESEND"
              onClick={this.handleOnResend} />
          </div>
        </div>
      );
    } else {
      view = (
        <div>
          <div className={css['above-title']}>
            Forgot password? Enter your e-mail:
          </div>
          <div className={css['send-email-input']}>
            <TextField
              type="text"
              name="email"
              value={this.props.fields.email}
              onChange={this.handleUpdateField}
              errorMessage={this.props.errors.email}
              isTransparent />
          </div>
          <div className={cn(css.buttons, 'no-margin')}>
            <ButtonComponent
              success
              disabled={!this.props.hasChanged}
              label="RESET PASSWORD"
              onClick={this.handelOnSend} />
          </div>
        </div>
       );
    }

    return (
      <div className={css.form}>
        {view}
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  hasChanged: React.PropTypes.bool,

  /* objects */
  fields: React.PropTypes.object,
  errors: React.PropTypes.object,

  /* functions */
  updateField: React.PropTypes.func.isRequired,
  sendResetPassword: React.PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
