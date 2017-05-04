import Hammer from 'hammerjs';

function dirProp(direction, hProp, vProp) {
  return (direction === Hammer.DIRECTION_HORIZONTAL) ? hProp : vProp;
}

export default class HammerCarousel {
  constructor(container, direction, activeClassName, getRatingCallback) {
    this.getRatingCallback = getRatingCallback;

    this.show = this.show.bind(this);
    this.onPan = this.onPan.bind(this);
    this.showNext = this.showNext.bind(this);

    this.container = container;
    this.direction = direction;
    this.activeClassName = activeClassName;
    this.panes = Array.prototype.slice.call(this.container.children, 0) || [];
    this.containerSize = this.container[dirProp(direction, 'offsetWidth', 'offsetHeight')];

    this.hammer = new Hammer.Manager(this.container);
    this.hammer.add(new Hammer.Pan({ direction: this.direction, threshold: 10 }));
    this.hammer.on('panstart panmove panend pancancel', Hammer.bindFn(this.onPan, this));

    this.currentIndex = 0;
    this.show(this.currentIndex);
  }

  // show current pane
  show(showIndexParam, percentParam, animate) {
    const showIndex = Math.max(0, Math.min(showIndexParam, this.panes.length - 1));
    const percent = percentParam || 0;

    const className = this.container.className;
    if (animate) {
      if (className.indexOf(this.activeClassName) === -1) {
        this.container.className += ` ${this.activeClassName}`;
      }
    } else if (className.indexOf(this.activeClassName) !== -1) {
      this.container.className = className.replace(this.activeClassName, '').trim();
    }

    for (let paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
      if (this.currentIndex === paneIndex && percent <= 0 && this.getRatingCallback() > 0) {
        const currentPos = (this.containerSize / 100) * (((paneIndex - showIndex) * 100) + percent);
        this.panes[paneIndex].style.left = `${currentPos}px`;
      } else {
        const defaultPos = (this.containerSize / 100) * (((paneIndex - showIndex) * 100));
        this.panes[paneIndex].style.left = `${defaultPos}px`;
      }
    }

    this.currentIndex = showIndex;
  }

  // show next pane
  showNext() {
    this.show(this.currentIndex + 1, 0, true);
  }

  // handle pan event
  onPan(event) {
    if (this.currentIndex === this.panes.length - 1) return;

    const delta = dirProp(this.direction, event.deltaX, event.deltaY);
    let percent = (100 / this.containerSize) * delta;
    let animate = false;

    if (event.type === 'panend' || event.type === 'pancancel') {
      if (percent < 0 && Math.abs(percent) > 25 && event.type === 'panend' && this.getRatingCallback() > 0) {
        this.currentIndex += 1;
      }
      percent = 0;
      animate = true;
    }

    // check event.type, event.direction if need
    this.show(this.currentIndex, percent, animate);
  }

  /* reinit practices position by window resize */
  setPosition(showIndex) {
    let pos;
    this.containerSize = this.container.offsetWidth;
    for (let paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
      pos = (this.container.offsetWidth / 100) * (((paneIndex - showIndex) * 100));
      this.panes[paneIndex].style.transition = 'none';
      this.panes[paneIndex].style.left = `${pos}px`;
    }
    for (let paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
      this.panes[paneIndex].style.transition = '';
    }
  }
}
