import React, {PropTypes} from "react";
import Illiterate from "react-illiterate";
import entries from "dir!./entries.config";


 export default React.createClass({
   propTypes: {
     route: PropTypes.shape({
       src: PropTypes.string.isRequired, //currently don't use...
       location: PropTypes.arrayOf(PropTypes.string).isRequired,
       classes: PropTypes.object.isRequired
     })
   },
   getInitialState() {
     return {src: this.props.route.src};
   },
   __getSrc() {
     let {location} = this.props.route;

     // traverse entries
     let entry = entries;
     for (let i = 0; i < location.length; i++) {
       entry = entry[location[i]];
     }
     console.log(entry.src);
     return entry.src;
   },
   componentDidMount() {
     if (module.hot) {
       module.hot.dispose((obj) => {
         console.log(module.hot.data);
         this.setState({src: this.__getSrc()});
       });
     }
   },
   render() {
     return (
         <Illiterate src={this.state.src}
                     classes={this.props.route.classes}/>
     );
   }
 });
