import React, {PropTypes} from "react";
import {Link} from "react-router";

const _path = require("path");

const Nav = React.createClass({
  render() {
    function getNav(route, path, title) {
      return (
        <div>
          <Link to={path}>{title || route.path}</Link>
          <ul>
            {route.childRoutes.map(
              (child, i) => (
                <li key={i}> {getNav(child, _path.join(path, child.path), null)} </li>
              ))}
          </ul>
        </div>
      )
    }
    return(
      <div id="rootNav">
        {getNav(this.props.routes, "/", "Home")}
      </div>
    )
  }
});

export default React.createClass({
  render() {
    /*     console.log(this.props.children); */
    return (
      <div id={"root"}>
        <Nav routes={this.props.routes[0]}/>
        <div id={"rootContent"}>
            <h1>Title of Book</h1>
            {this.props.children}
        </div>
      </div>
    )
  }
})

