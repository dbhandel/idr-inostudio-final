// React libraries
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import env from 'shared/env';
import bottomPanel from 'shared/bottomPanel';

// Custom styling for `react-dates` component via NPM
import './react-dates.scss';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  onFocusChange = obj => {
    this.setState({ focused: obj.focused });
    if (env.isAnyMobile) {
      if (obj.focused) {
        bottomPanel.hide();
        bottomPanel.stopHandler();
      } else {
        bottomPanel.startHandler();
        bottomPanel.show();
      }
    }
  }

  render() {
    const date = this.props.date && moment(this.props.date);

    return (
      <SingleDatePicker
        {...this.props}
        id="date_input"
        numberOfMonths={1}
        withPortal={!!env.isAnyMobile}
        date={date}
        focused={this.state.focused}
        onDateChange={this.props.onDateChange}
        onFocusChange={this.onFocusChange} />
    );
  }
}

Calendar.propTypes = {
  /* date */
  date: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Date),
    React.PropTypes.string,
  ]),

  /* functions */
  onDateChange: React.PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  date: null,
};

export default Calendar;
