import React from "react";



class World extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(props);
    }
    render() {
        return (
            <>
                <h1>World Component</h1>
                <p>Name: {this.props.stuInfo.name}</p>
                <p>Age: {this.props.stuInfo.age}</p>
            </>
        );
    }
}


export default World;