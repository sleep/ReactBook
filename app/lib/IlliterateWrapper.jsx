import React, {PropTypes} from "react";
import Illiterate from "react-illiterate";
import entries from "dir!./entries.config";
import shadowStyle from "!raw!./shadowStyle.css";



 export default React.createClass({
   propTypes: {
     route: PropTypes.shape({
       src: PropTypes.string.isRequired, //currently don't use...
       __onHMRUpdate__: PropTypes.func.isRequired,
       classes: PropTypes.object.isRequired
     })
   },
   getInitialState() {
     return {src: this.__transformSrc(this.props.route.src)};
   },
   __transformSrc(src) {
     console.log(shadowStyle);
     return "<style>\n" + shadowStyle + "\n</style>"+ src;
   },
   componentDidMount() {
     if (module.hot) {
       this.props.route.__onHMRUpdate__((src) => {
         this.setState({src: this.__transformSrc(src)});
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
