import React, { Component } from 'react';
import HammerComponent from 'react-hammerjs';

import './App.css';

class CircleComponent extends HammerComponent {
  render() {
    return (
      <circle cx={this.props.cx} cy={this.props.cy}
              r={this.props.r} stroke="black" strokeWidth="1"
              fill={this.props.color}
              onTouchStart={this.props.onMouseDown}
              onTouchEnd={this.props.onMouseUp}
              onMouseUp={this.props.onMouseUp}
              onMouseDown={this.props.onMouseDown} />
    );
  }
}

class TouchComponent extends Component {
  constructor() {
    super();
    this.state = {
      color: 'grey',
      cx: 50,
      cy: 50,
      r: 40
    }
  }
}

class TapComponent extends TouchComponent {
  handleMouseUp() {
    this.setState({
      color: 'grey',
      r: 40
    })
  }
  handleMouseDown() {
    this.setState({
      color: '#aad',
      r: 48
    })
  }
  render() {
    return (
       <div className="TouchCard mui-container">
        <h1 className="title">On Tap</h1>
        <div className="TouchRegion mui-panel">
          <svg>
            <CircleComponent color={this.state.color}
                             r={this.state.r}
                             cx={this.state.cx}
                             cy={this.state.cy}
                             onMouseDown={() => this.handleMouseDown()}
                             onMouseUp={() => this.handleMouseUp()} />
          </svg>
        </div>
        <div className="description">
          One finger touch <br />
          Example: Select widget from widget section, delete a measurement
        </div>
      </div>
    );
  }
}

class DoubleTapComponent extends TouchComponent {
  handleDoubleTap(e) {
    const color = (this.state.color === 'orange') ? 'gray' : 'orange';
    this.setState({
      color: color
    })
    e.preventDefault();
  }
  render() {
    return (
       <div className="TouchCard mui-container">
          <h1 className="title">On Double Tap</h1>
          <div className="TouchRegion mui-panel">
            <svg>
              <CircleComponent color={this.state.color}
                               r={this.state.r}
                               cx={this.state.cx}
                               cy={this.state.cy}
                               onDoubleTap={(e) => this.handleDoubleTap(e)}/>
            </svg>
          </div>
          <div className="description">
            Tap twice on the circle <br />
            Example: ...
          </div>
        </div>
    );
  }
}

class PanComponent extends TouchComponent {
  handlePan(e) {
    const {deltaX, deltaY} = e;
    const {cx, cy} = this.state;
    let [dx, dy] = [this.state.dx || 0, this.state.dy || 0];
    if (e.isFinal) {
      this.setState({dx: 0, dy: 0});
      e.preventDefault();
      return;
    }
    this.setState({
      cx: cx + (deltaX - dx),
      cy: cy + (deltaY - dy),
      dx: dx + (deltaX - dx),
      dy: dy + (deltaY - dy),
    })
    e.preventDefault();
  }
  render() {
    return (
      <div className="TouchCard mui-container">
        <h1 className="title">On Drag</h1>
        <div className="TouchRegion mui-panel">
          <svg>
            <CircleComponent color={this.state.color}
                             r={this.state.r}
                             cx={this.state.cx}
                             cy={this.state.cy}
                             onPan={(e) => this.handlePan(e)} />
          </svg>
        </div>
        <div className="description">
            Press and drag on the circle <br />
            Example: ...
        </div>
      </div>
    );

  }
}

class SwipeComponent extends TouchComponent {
  handleSwipe(e) {
    let dx = {
      [window.Hammer.DIRECTION_LEFT]: -20,
      [window.Hammer.DIRECTION_RIGHT]: 20
    }[e.offsetDirection];
    const {cx} = this.state;
    const newState = {
      color: 'pink',
      cx: cx + dx
    };
    this.setState(newState);
    e.preventDefault();
  }
  render() {
    let el = (
       <div className="TouchCard mui-container">
        <h1 className="title">On Swipe</h1>
        <div id="zoom-component" className="TouchRegion mui-panel">
          <svg>
            <CircleComponent
              color={this.state.color}
              r={this.state.r}
              cx={this.state.cx}
              cy={this.state.cy}
              onSwipe={(e) => this.handleSwipe(e)} />
          </svg>
        </div>
        <div className="description">
          One finger touch <br />
          Example: Cine through large frames
        </div>
      </div>
    );
    return el;
  }
}



class ZoomComponent extends TouchComponent {
  handlePinchIn(e) {
    const {r} = this.state;
    this.setState({
      r: r - 2
    })
    e.preventDefault();
  }
  handlePinchOut(e) {
    const {r} = this.state;
    this.setState({
      r: r + 2
    })
    e.preventDefault();
  }
  render() {
    let el = (
       <div className="TouchCard mui-container">
        <h1 className="title">On Zoom</h1>
        <div id="zoom-component" className="TouchRegion mui-panel">
          <svg>
            <CircleComponent
              options={{
                    recognizers: {
                      pinch: {
                          enable: true
                      }
                  }
              }}
              color={this.state.color}
              r={this.state.r}
              cx={this.state.cx}
              cy={this.state.cy}
              onPinchIn={(e) => this.handlePinchIn(e)}
              onPinchOut={(e) => this.handlePinchOut(e)} />
          </svg>
        </div>
        <div className="description">
          One finger touch <br />
          Example: Select widget from widget section, delete a measurement
        </div>
      </div>
    );
    return el;
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Gestures on Touchscreen</h2>
        </div>
        <div className="App-body">
          <TapComponent />
          <DoubleTapComponent />
          <PanComponent />
          <ZoomComponent />
          <SwipeComponent />
        </div>
      </div>
    );
  }
}

export default App;
