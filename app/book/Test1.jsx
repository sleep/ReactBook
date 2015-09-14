import React from "react";


// a simple counter

export default React.createClass({
    getInitialState() {
        return {
            count: 0
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
            <div>{counter}</div>
        );
    }
});
