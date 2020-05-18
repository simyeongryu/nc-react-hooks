import React, { useReducer } from "react";

const INCREMENT = "increment";
const DECREMENT = "decrement";

// action의 이름은 아무거나 해도 된다.
function reducer(state, action) {
  // return 하는 object는 state를 대체할 object
  // state가 변경되는 게 아니라 대체된다.
  switch (action) {
    case INCREMENT:
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function App() {
  // useReducer는 Component에 state가 많을 때 사용한다.
  // dispatch는 reducer에 action을 보낸다.
  // useReducer(reducerFunction, state)
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch(INCREMENT)}>Plus</button>
      <button onClick={() => dispatch(DECREMENT)}>Minus</button>
    </>
  );
}

export default App;
