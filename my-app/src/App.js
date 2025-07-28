import Hello from "./components/Hello";
import React from "react";

function App() {
  const name = 'huige9999';
  const three = 'three';
  const styles = {
    color: 'red',
    fontSize: '20px'
  }

  const stuInfo = [
    {
      id: 1,
      name: 'huige9999',
      age: 18
    },
    {
      id: 2,
      name: 'wawa',
      age: 14
    },
    {
      id: 3,
      name: 'vichel',
      age: 32
    }
  ]

  const arr = stuInfo.map(item => (
    <p key={item.id}>
      {item.name} - {item.age}
    </p>
  ))

  return (
    <>
    {/* 这是一个列表 */}
      <ul style={styles}>
        <li className="one">1</li>
        <li className="two">2</li>
        <li className={three}>3{name}</li>
      </ul>
      <button>Click me</button>
      <Hello />
      {arr}
    </>
  );
}

// function App() {
//   const children = [
//     (<ul>
//       <li className="one">1</li>
//       <li className="two">2</li>
//     </ul>),
//     (
//        <button>Click me</button>
//     )
//   ];

//   return React.createElement("div", { className: "container" }, [...children]);
// }

export default App;
