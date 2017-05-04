/* eslint-disable global-require */
import React from 'react';
import cn from 'classnames';

/* components */
import menuPinIco from './img/pin-ico.svg';
import menuHighlightIco from './img/highlight-ico.svg';
import menuMarqueeIco from './img/marquee-ico.svg';
import hidePinIco from './img/hide-pin-ico.svg';
import editIco from './img/edit-ico.svg';

/* styles */
import css from './panel.css';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: this.props.type, showPins: true };
    this.onTogglePins = this.onTogglePins.bind(this);
  }

  render() {
    const type = this.state.type;
    const showPinsText = this.state.showPins ? 'HIDE PINS' : 'SHOW PINS';
    return (
      <div className={css['bottom-panel']}>
        <div className={css['bottom-panel__menu']}>
          <div className={css['menu-item']}>
            <div className={css['menu-item__label']}>Create recall from:</div>
          </div>
          <div
            className={cn(css['menu-item'], css['--clickable'], { [css['--active']]: type === 'pin' })}
            onClick={this.handlerChangeType.bind(this, "pin")}>
            <div className={css['menu-item__icon']}>
              <img src={menuPinIco} alt='PIN' />
            </div>
            <div className={css['menu-item__label']}>Pin</div>
          </div>
          <div
            className={cn(css['menu-item'], css['--clickable'], { [css['--active']]: type === 'highlight' })}
            onClick={this.handlerChangeType.bind(this, 'highlight')}>
            <div className={css['menu-item__icon']}>
              <img src={menuHighlightIco} alt='HIGHLIGHT' />
            </div>
            <div className={css['menu-item__label']}>Highlight</div>
          </div>
          <div
            className={cn(css['menu-item'], css['--clickable'], { [css['--active']]: type === 'marquee' })}
            onClick={this.handlerChangeType.bind(this, 'marquee')}>
            <div className={css['menu-item__icon']}>
              <img src={menuMarqueeIco} alt='MARQUEE' />
            </div>
            <div className={css['menu-item__label']}>Marquee</div>
          </div>
          <div className={cn(css['menu-item'], css['--desc'])}>
            <div className={css['menu-item__label']}>{'Tap to add a pin.\nLong tap the pin\nto resolution'}</div>
          </div>
        </div>
        <div className={cn(css['bottom-panel__menu'], css['--right'])}>
          <div
            className={cn(css['menu-item'], css['--clickable'])}
            onClick={this.onTogglePins}>
            <div className={css['menu-item__icon']}>
              <img src={hidePinIco} alt={showPinsText} />
            </div>
            <div className={css['menu-item__label']}>{showPinsText}</div>
          </div>
          <div
            className={cn(css['menu-item'], css['--clickable'])}
            onClick={this.props.onEdit}>
            <div className={css['menu-item__icon']}>
              <img src={editIco} alt='EDIT' />
            </div>
            <div className={css['menu-item__label']}>EDIT</div>
          </div>
        </div>
      </div>);
  }

  onTogglePins = () => {
    this.setState({ showPins: !this.state.showPins });
    this.props.onTogglePins();
  };

  handlerChangeType = type => {
    this.setState({ type: type });
    this.props.onChangeType(type);
  };
}

Panel.propTypes = {
  type: React.PropTypes.oneOf(['pin', 'highlight', 'marquee']),
  onChangeType: React.PropTypes.func,
  onTogglePins: React.PropTypes.func,
  onEdit: React.PropTypes.func,
};

export default Panel;
