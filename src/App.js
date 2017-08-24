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
        </div>
      </div>
    );
  }
}

export default App;
