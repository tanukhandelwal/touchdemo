import React, { Component } from "react";
import HammerComponent from "react-hammerjs";

import "./App.css";

class CircleComponent extends HammerComponent {
  render() {
    return (
      <div className="TouchCard mui-container">
        <h1 className="title">{this.props.title}</h1>
        <div className="TouchRegion mui-panel">
          <svg>
            <circle
              stroke="black"
              strokeWidth="1"
              fill={this.props.color}
              r={this.props.r}
              cx={this.props.cx}
              cy={this.props.cy}
            />
          </svg>
        </div>
        <div className="description">
          {this.props.description} <br />
          {this.props.example}
        </div>
      </div>
    );
  }
}

class TouchComponent extends Component {
  constructor() {
    super();
    this.state = {
      color: "grey",
      cx: 50,
      cy: 50,
      r: 40
    };
  }
}

class TapComponent extends TouchComponent {
  handleMouseDown(e) {
    this.setState({
      color: "#aad",
      r: 45
    });
  }
  handleMouseUp() {
    this.setState({
      color: "grey",
      r: 40
    });
  }
  render() {
    return (
      <CircleComponent
        title="On Tap"
        color={this.state.color}
        r={this.state.r}
        cx={this.state.cx}
        cy={this.state.cy}
        onPress={e => this.handleMouseDown(e)}
        onPressUp={e => this.handleMouseUp(e)}
        description="One finger touch"
        example="Example: Select widget from widget section, delete a measurement"
      />
    );
  }
}

class DoubleTapComponent extends TouchComponent {
  handleDoubleTap(e) {
    const color = this.state.color === "orange" ? "gray" : "orange";
    this.setState({
      color: color
    });
    e.preventDefault();
  }
  render() {
    return (
      <CircleComponent
        title="On Double Tap"
        color={this.state.color}
        r={this.state.r}
        cx={this.state.cx}
        cy={this.state.cy}
        onDoubleTap={e => this.handleDoubleTap(e)}
        description="Tap twice on the circle"
        example="..."
      />
    );
  }
}

class PanComponent extends TouchComponent {
  handlePan(e) {
    const { deltaX, deltaY } = e;
    const { cx, cy } = this.state;
    let [dx, dy] = [this.state.dx || 0, this.state.dy || 0];
    if (e.isFinal) {
      this.setState({ dx: 0, dy: 0 });
      e.preventDefault();
      return;
    }
    this.setState({
      cx: cx + (deltaX - dx),
      cy: cy + (deltaY - dy),
      dx: dx + (deltaX - dx),
      dy: dy + (deltaY - dy)
    });
    e.preventDefault();
  }
  render() {
    return (
      <CircleComponent
        title="On Drag"
        color={this.state.color}
        r={this.state.r}
        cx={this.state.cx}
        cy={this.state.cy}
        onPan={e => this.handlePan(e)}
        description="Press and drag on the circle"
        example="..."
      />
    );
  }
}

class SwipeComponent extends TouchComponent {
  handleSwipe(e) {
    let dx = {
      [window.Hammer.DIRECTION_LEFT]: -20,
      [window.Hammer.DIRECTION_RIGHT]: 20
    }[e.offsetDirection];
    const { cx } = this.state;
    const newState = {
      color: "pink",
      cx: cx + dx
    };
    this.setState(newState);
    e.preventDefault();
  }
  render() {
    return (
      <CircleComponent
        title="On Swipe"
        color={this.state.color}
        r={this.state.r}
        cx={this.state.cx}
        cy={this.state.cy}
        onSwipe={e => this.handleSwipe(e)}
        description="One finger touch"
        example="..."
      />
    );
  }
}

class ZoomComponent extends TouchComponent {
  handlePinchIn(e) {
    const { r } = this.state;
    this.setState({
      r: r - 2
    });
    e.preventDefault();
  }
  handlePinchOut(e) {
    const { r } = this.state;
    this.setState({
      r: r + 2
    });
    e.preventDefault();
  }
  render() {
    let el = (
      <CircleComponent
        title="On Zoom"
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
        onPinchIn={e => this.handlePinchIn(e)}
        onPinchOut={e => this.handlePinchOut(e)}
        description="One finger touch"
        example="Select widget from widget section, delete a measurement"
      />
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
