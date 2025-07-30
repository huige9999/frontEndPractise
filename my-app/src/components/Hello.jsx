function Hello(props) {
  console.log(props);
  return (
    <div>
      <h1>Hello Component</h1>
      <p>Name: {props.stuInfo.name}</p>
      <p>Age: {props.stuInfo.age}</p>
    </div>
  );
}

export default Hello;