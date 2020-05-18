import React, { useReducer, useState } from "react";
import reducer, { initialState, ADD, DELETE, COMPLETE } from "./reducer";

function App() {
  // useReducer는 Component에 state가 많을 때 사용한다.
  // dispatch는 reducer에 action을 보낸다.
  // useReducer(reducerFunction, state)
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newToDo, setNewToDo] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: ADD, payload: newToDo });
    setNewToDo("");
  };
  const onChange = e => {
    const {
      target: { value }
    } = e;
    setNewToDo(value);
  };

  return (
    <>
      <h1>Add To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          value={newToDo}
          type="text"
          placeholder="Write To Do"
          onChange={onChange}
        />
      </form>
      <ul>
        <h2>To Dos</h2>
        {state.toDos.map(toDo => (
          <li key={toDo.id}>
            <span>{toDo.text}</span>
            <button
              onClick={() => dispatch({ type: DELETE, payload: toDo.id })}
            >
              ❌
            </button>
            <button
              onClick={() => dispatch({ type: COMPLETE, payload: toDo.id })}
            >
              ✅
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {state.completed.length !== 0 && (
          <>
            <h2>Completed</h2>
            {state.completed.map(toDo => (
              <li key={toDo.id}>
                <span>{toDo.text}</span>
                <button
                  onClick={() => dispatch({ type: DELETE, payload: toDo.id })}
                >
                  ❌
                </button>
                <button
                  onClick={() => dispatch({ type: DELETE, payload: toDo.id })}
                >
                  ⏪
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
}

export default App;
