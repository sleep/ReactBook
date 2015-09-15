import React from "react";
import Illiterate from "react-illiterate";


export default function(src, classes, requirePath) {
  console.log(requirePath);
  return React.createClass({
    componentDidMount() {
    },
    render() {
      return (
          <Illiterate src={src}
                      classes={classes}/>
      );
    }
  });
}
