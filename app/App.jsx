import React from "react";

const App = React.createClass({
    render() {
        console.log("App rendered!");
        return (
            <div id="app">
                <h1>Hello World</h1>
                {this.props.children}
            </div>
        )
    }
})

export default App;
