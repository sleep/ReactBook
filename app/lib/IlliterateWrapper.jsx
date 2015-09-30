import React, {PropTypes} from "react";
import Illiterate from "react-illiterate";
import entries from "dir!./entries.config";


 export default React.createClass({
   propTypes: {
     route: PropTypes.shape({
       src: PropTypes.string.isRequired, //currently don't use...
       __onHMRUpdate__: PropTypes.func.isRequired,
       classes: PropTypes.object.isRequired
     })
   },
   getInitialState() {
     return {src: this.props.route.src};
   },
   componentDidMount() {
     if (module.hot) {
       this.props.route.__onHMRUpdate__((src) => {
         this.setState({src: src});
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
