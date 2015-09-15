import React from "react";


// a simple counter

export default React.createClass({
    getInitialState() {
        return {
            count: 100
        }
    },
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prev) => ({count: prev.count + 1}));
        }, 1000);
    },
    componentWillUnmount() {
        clearInterval(this.interval);
    },
    render() {
        return (
            <div>{this.state.count}</div>
        );
    }
});
