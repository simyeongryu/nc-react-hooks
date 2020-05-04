import React, { useState, useEffect } from "react";

const App = () => {
  const sayHello = () => console.log("hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);

  /**
   * useEffect()
   * componentDidMount, componentWillUnmount, componentDidUpdate 를 합쳐놓은 함수
   */
  useEffect(sayHello); // 마운트 될 때, state가 변하면 실행
  // useEffect(sayHello, []); // 마운트 될 때만 실행
  // useEffect(sayHello, [number]); // 마운트 될 때, state 중 number가 변할 때 해당 함수 새로 시작

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};

export default App;
