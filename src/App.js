import React, { useState, useEffect, useRef } from "react";

const useClick = onClick => {
  const element = useRef();
  // useClick이 마운트 될때 실행 (state 업데이트는 X)
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    // componentWillUnmount. 컴포넌트가 종료될 때의 동작을 함수로 만들어 return (클로저)
    return () => {
      if (element.current) {
        element.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

const App = () => {
  const sayHello = () => console.log("say Hello");
  const title = useClick(sayHello);
  return (
    <div>
      <h1 ref={title}>Hello</h1>
    </div>
  );
};

export default App;
