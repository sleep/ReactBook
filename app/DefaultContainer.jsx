import React from "react";

export default React.createClass({
  render() {
    return (
      // We insert key so React can differentiate different routes with DefaultContainer.
      <div key={this.props.route.path} className={"defaultContainer"}>
        {this.props.children}
      </div>
    );
  }
});
