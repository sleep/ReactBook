import React from "react";

export default React.createClass({
  render() {
    console.log(this.props.routes);
    return (
      <div className={"defaultContainer"}>
        {this.props.children}
      </div>
    );
  }
});
