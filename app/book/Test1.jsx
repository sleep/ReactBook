import React from "react";


// a simple counter

export default React.createClass({
  getInitialState() {
    return {
      count: 0
    }
  },
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prev) => ({count: prev.count + 1}));
    }, 1000);
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },
  render() {
    let style = {
      background: "rgba(0, 0, 0, 0.1)"
    };
    return (
      <div style={style}>
        <h4>Counter...</h4>
        {this.state.count}
      </div>
    );
  }
});
