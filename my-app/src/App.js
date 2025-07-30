import React from "react";
import Hello from "./components/Hello"
import World from "./components/Word";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "huige999",
      age: 18
    }
  }

  render() {
    return (
      <>
        <Hello stuInfo={this.state}/>
        <World stuInfo={this.state}/>
      </>
    );
  }
}


export default App;
