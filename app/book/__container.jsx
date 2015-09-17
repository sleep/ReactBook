import React from "react";

const Nav = React.createClass({
  render() {
    return(
      <pre id="rootNav">
        {JSON.stringify(this.props.routes, null, 2)}
      </pre>
    )
  }
});

export default React.createClass({
  render() {
    return (
      <div id={"root"}>
        <Nav routes={this.props.routes}/>
        <div id={"rootContent"}>
            <h1>Title of Book</h1>
            {this.props.children}
        </div>
      </div>
    )
  }
})
