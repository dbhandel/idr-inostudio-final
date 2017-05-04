import React from 'react';
import cn from 'classnames';

import PinIcon from 'views/icons/pin';
import HighLightIcon from 'views/icons/highLight';
import MarqueeIcon from 'views/icons/marquee';
import HidePinIcon from 'views/icons/hidePin';
import EditIcon from 'views/icons/edit';

import css from './pdf.css';

class PdfToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
    };
  }

  handleClickIcon = action => this.setState({ action });
  render() {
    const isActive = id => cn(css['icon-wrap'], {
      [css['icon-wrap--active']]: id === this.state.action,
    });

    const renderLeftGroupIcon = (
      <div className={css['group-icons_left']}>
        <button className={isActive('pin')} onClick={() => this.handleClickIcon('pin')}>
          <PinIcon /> Pin
        </button>
        <button className={isActive('highlight')} onClick={() => this.handleClickIcon('highlight')}>
          <HighLightIcon /> Highlight
        </button>
        <button className={isActive('marquee')} onClick={() => this.handleClickIcon('marquee')}>
          <MarqueeIcon /> Marquee
        </button>
      </div>
    );
    const renderPrompt = (
      <div className={css['panel-prompt']}>
        <span>Tap to add a pin.</span>
        <span>Long tap the pin</span>
        <span>to reposition</span>
      </div>
    );
    const renderRightGroupIcon = (
      <div className={css['group-icons_right']}>
        <button className={isActive('hide_pin')} onClick={() => this.handleClickIcon('hide_pin')}>
          <HidePinIcon /> HIDE PINS
        </button>
        <button className={isActive('edit')} onClick={() => this.handleClickIcon('edit')}>
          <EditIcon /> EDIT
        </button>
      </div>
    );
    return (
      <div className={css.panel}>
        <div className={css['panel-title']}>
          create recall From:
        </div>
        {renderLeftGroupIcon}
        {renderPrompt}
        {renderRightGroupIcon}
      </div>
    );
  }
}

export default PdfToolbar;
