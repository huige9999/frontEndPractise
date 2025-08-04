import React from "react";
// function App() {

//   const handleClick = () => {
//     console.log('Button clicked');
//   }

//   return (
//     <button onClick={handleClick}>Click me</button>
//   );
// }

class App extends React.Component {
   render() {
    return (
      <a href="https://www.baidu.com" onClick={this.handleClick}>Click me</a>
    )
   }
   handleClick = (e) => {
    e.preventDefault();
    console.log(e,e.nativeEvent);
   }
}



export default App;
