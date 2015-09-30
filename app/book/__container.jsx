import React, {PropTypes} from "react";
import Nav from "./__Nav.jsx";
import "./style.scss";

export default React.createClass({
  render() {
    /*     console.log(this.props.children); */
    return (
      <div id={"root"}>
        <div id="rootNav">
          <h1><pre> ReactBook </pre></h1>
          <Nav id="navTree" routes={this.props.routes[0]}/>
        </div>
        <div id={"rootContent"}>
<a href="https://github.com/sleep/reactbook"><img style={{position: "absolute", top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"/></a>
            {this.props.children}
        </div>
      </div>
    )
  }
})

