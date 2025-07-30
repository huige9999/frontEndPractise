import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      num: 1,
    };
  }

  addNum = () => {
    // const newNum = this.state.num + 1;
    // this.setState({
    //   num: newNum,
    // });
    // console.log(newNum);
    // 回调函数里拿到最新的num
    // this.setState(
    //   {
    //     num: this.state.num + 1,
    //   },
    //   () => {
    //     console.log(this.state.num);
    //   }
    // );

    // 连续调用3次，每次再上一次的状态基础上+1
    this.setState(
      (prevState) => {
        return {
          num: prevState.num + 1,
        };
      },
      () => {
        console.log(this.state.num);
      }
    );

    this.setState(
      (prevState) => {
        return {
          num: prevState.num + 1,
        };
      },
      () => {
        console.log(this.state.num);
      }
    );

    this.setState(
      (prevState) => {
        return {
          num: prevState.num + 1,
        };
      },
      () => {
        console.log(this.state.num);
      }
    );
  };

  render() {
    return (
      <>
        <h1>{this.state.num}</h1>
        <button onClick={this.addNum}>click</button>
      </>
    );
  }
}

export default App;
