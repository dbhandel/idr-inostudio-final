/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Hammer from 'hammerjs';

/* stories */
import { connect } from 'shared/store';
import RecallStore from 'stores/dashboard/recall';
import DocStore from 'stores/doc';

/* components */
import CreateRecallMain from 'views/dashboard/recalls/create/main';
import Pin from './pin';
import BottomPanel from './panel';

/* styles */
import css from './style.css';

class PdfViewer extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.panelType = 'pin';
    this.state = { isCreateRecall: false };
    this.docs = ctx.store(DocStore);
    this.currentPin = null;
    this.getMousePos = this.getMousePos.bind(this);
    this.handleFileLoad = this.handleFileLoad.bind(this);
    this.addPin = this.addPin.bind(this);
    this.renderPin = this.renderPin.bind(this);
    this.renderPins = this.renderPins.bind(this);
    this.pageLoaded = this.pageLoaded.bind(this);
    this.handlerChangeType = this.handlerChangeType.bind(this);
    this.recall = ctx.store(RecallStore);
  }

  componentDidUpdate() {
    if (this.docs.getPins().length) {
      this.renderPins();
    }
  }

  componentWillUnmount() {
    this.viewer.contentWindow.removeEventListener('pagesloaded', this.pageLoaded);
    this.viewer.contentWindow.removeEventListener('pagerendered', this.renderPins);
  }

  getMousePos = (container, mouseEvent) => {
    const rect = container.getBoundingClientRect();
    const pageRotation = this.viewer.contentWindow.PDFViewerApplication.pageRotation;
    if (pageRotation === 0) {
      return {
        x: mouseEvent.center.x - 9 - rect.left,
        y: mouseEvent.center.y - 9 - rect.top,
      };
    } else if (pageRotation === 90) {
      return {
        y: rect.right - mouseEvent.pageX,
        x: mouseEvent.pageY - rect.top,
      };
    } else if (pageRotation === 180) {
      return {
        x: -(mouseEvent.clientX - rect.left),
        y: -(mouseEvent.clientY - rect.top),
      };
    } else {
      return { x: 0, y: 0 };
    }
  };

  handleFileLoad = e => {
    this.viewer = e.target;
    this.viewer.contentWindow.addEventListener('pagesloaded', this.pageLoaded);
    this.viewer.contentWindow.addEventListener('pagerendered', this.renderPins);
  };

  addPin(target, pos) {
    return {
      type: 'pin',
      id: `pin_${this.docs.getPins().length}`,
      docId: this.props.doc.id,
      x: (pos.x * 100) / target.clientWidth,
      y: (pos.y * 100) / target.clientHeight,
      pageId: target.id,
      page: Number(target.dataset.pageNumber),
      temp: true,
    };
  }

  renderPin = pin => {
    let pinDiv = ReactDOM.renderToString(
      <Pin
        data={pin}
        pageRotation={this.viewer.contentWindow.PDFViewerApplication.pageRotation} />);
    const pinDivContainer = document.createElement('div');
    pinDivContainer.innerHTML = pinDiv;
    pinDiv = pinDivContainer.firstChild;
    this.viewer.contentDocument.getElementById(pin.pageId).appendChild(pinDiv);
    if (pin.temp) {
      setTimeout(() => {
        pinDiv.classList.add('is-open');
      }, 10);
    }

    const hammer = new Hammer(pinDiv);
    hammer.on('click tap', () => {
      this.setState({ isCreateRecall: true });
    });
  };

  renderPins = e => {
    this.docs.getPins().forEach(pin => {
      if (e && e.detail.pageNumber === pin.page) {
        this.renderPin(pin);
      }
    });
  };

  render() {
    return (
      <div className={css['viewer-container']}>
        {this.state.isCreateRecall &&
        <div className={css['viewer-create-recall']}>
          <CreateRecallMain
            recall={this.recall}
            buttonPosition="right"
            onCancel={() => this.setState({ isCreateRecall: false })}
            onSave={async () => {
              await this.recall.create();
              this.currentPin.temp = false;
              this.docs.addPin(this.currentPin);
              this.viewer.contentDocument.getElementById(this.currentPin.id).remove();
              this.renderPin(this.currentPin);
              this.setState({ isCreateRecall: false });
            }} />
        </div>}
        <iframe
          className={css.viewer}
          onLoad={this.handleFileLoad}
          src={`/viewer/web/viewer.html?locale=en-US&file=${this.props.doc.path}`}
          frameBorder="0" />
        <BottomPanel
          type={this.panelType}
          onChangeType={this.handlerChangeType}
          onTogglePins={this.handlerTogglePins} />
      </div>
    );
  }

  pageLoaded() {
    const pages = this.viewer.contentDocument.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
      const hammer = new Hammer(pages[i]);
      hammer.on('click tap', e => {
        const container = e.target.offsetParent;
        if (container.classList.contains('page')) {
          const pos = this.getMousePos(container, e);
          if (this.currentPin && this.currentPin.temp) {
            const oldPin = this.viewer.contentDocument.getElementById(this.currentPin.id);
            if (oldPin) {
              oldPin.remove();
            }
          }
          this.currentPin = this.addPin(container, pos);
          this.renderPin(this.currentPin);
        }
      });
    }
  }

  handlerChangeType = type => {
    this.type = type;
  };

  handlerTogglePins = () => {
    const tooltips = this.viewer.contentDocument.getElementsByClassName('tooltip');
    if (tooltips) {
      Array.from(tooltips).forEach(tooltip => {
        if (tooltip.style.display !== 'none') {
          tooltip.style.display = 'none';
        } else {
          tooltip.style.display = 'block';
        }
      });
    }
  }
}

PdfViewer.propTypes = {
  /* stores */
  docPath: React.PropTypes.string,
  pins: React.PropTypes.array,
  doc: React.PropTypes.object,
};


export default connect(PdfViewer);
