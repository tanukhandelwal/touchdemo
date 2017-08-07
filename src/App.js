import React, { Component } from 'react';
import HammerComponent from 'react-hammerjs';

import './App.css';

class CircleComponent extends HammerComponent {
  render() {
    console.log('this.props: ', this.props);
    return (
      <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="1"
                fill={this.props.color} />
      </svg>
    );
  }
}

class TouchComponent extends HammerComponent {
  constructor() {
    super();
    this.state = {
      color: 'red'
    }
  }
  handleTap() {
    this.setState({
      color: 'blue'
    })
  }
  render() {
    return (
      <div className="TouchCard">
        <CircleComponent onTap={() => this.handleTap()}
                         color={this.state.color} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Gestures</h2>
        </div>
        <div className="App-body">
          <TouchComponent />
        </div>
      </div>
    );
  }
}

export default App;
