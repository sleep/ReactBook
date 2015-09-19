import React from "react";

export default React.createClass({
  render() {
    console.log(this.props.route.path);
    return (
      <div key={this.props.route.path} className={"defaultContainer"}>
        {this.props.children}
      </div>
    );
  }
});
