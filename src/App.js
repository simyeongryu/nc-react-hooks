import React, { useState } from "react";

const App = () => {
  const [item, setItem] = useState(1);
  // const [item, setItem] = useState(1)[0]; state만 사용할 때
  // const [item, setItem] = useState(1)[1]; set함수만 사용할 때

  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  return (
    <>
      <div>{item}</div>
      <button onClick={incrementItem}>증가</button>
      <button onClick={decrementItem}>감소</button>
    </>
  );
};

export default App;
