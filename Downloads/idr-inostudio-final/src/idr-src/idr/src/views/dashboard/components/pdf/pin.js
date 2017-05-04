import React from 'react';
import cn from 'classnames';

// import PinIcon from 'views/icons/pin';
import LeafAddIcon from 'views/icons/leafAdd';
import HighLightIcon from 'views/icons/highLight_';
import RecIcon from 'views/icons/rec';

import css from './pin.css';

class PdfToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
    };
  }

  handleClickIcon = action => this.setState({ action });

  render() {
    const { handleClick, action } = this.props;
    const isActive = id => cn(css['icon-wrap'], {
      [css['icon-wrap--active']]: id === action,
    });

    const renderLeftGroupIcon = (
      <div className={css['group-icons_left']}>
        <button className={isActive('pin')} onClick={() => handleClick('pin')}>
          <LeafAddIcon />
        </button>
        <button className={isActive('highlight')} onClick={() => handleClick('highlight')}>
          <HighLightIcon style={{ width: 20 }} />
        </button>
        <button className={isActive('marquee')} onClick={() => handleClick('marquee')}>
          <RecIcon />
        </button>
      </div>
    );
    const renderPrompt = (
      <div className={css['panel-prompt']}>
        <span>Long tap the pin.</span>
        <span>to reposition</span>
      </div>
    );
    return (
      <div className={css.panel}>
        {renderLeftGroupIcon}
        {renderPrompt}
      </div>
    );
  }
}

PdfToolbar.propTypes = {
  handleClick: React.PropTypes.func,
  action: React.PropTypes.string,
};

export default PdfToolbar;
