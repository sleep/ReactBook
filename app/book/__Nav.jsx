import React, {PropTypes} from "react";
import {Link, History} from "react-router";

const _path = require("path");


export default React.createClass({
  mixins: [History],
  propTypes: {
    routes: PropTypes.object.isRequired
  },
  render() {
    // getNav (route, path, title) -> {elem: Element, isActive: isActive}
    const getNav = function(route, path, title) {
      //invariant:
      // each route has childRoutes


      let children = route.childRoutes.map(
        (child) => {
          return getNav(child, _path.join(path, child.path), null)
        }
      );



      let hasActiveChildren = false;

      for (let i = 0; i< children.length; i++) {
        if (children[i].isActive) {
          hasActiveChildren = true;
          break;
        }
      }



      let isActive = this.history.isActive(path);

      let className = isActive && !hasActiveChildren ? 'activeNav' : '';

      let elem = (
        <div className={className}>
          <Link to={path}>{title || route.path}</Link>
          <ul>
            {children.map(
              (child, i) => {
                return (
                  <li key={i}> {child.elem} </li>
                )
              }
              )}
          </ul>
        </div>
      );


      return {
        elem: elem,
        isActive: isActive
      }
    }.bind(this);
    return(
      <ul {...this.props}>
        <li>{getNav(this.props.routes, "/", "Home").elem} </li>
      </ul>
    )
  }
});
