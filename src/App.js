import React from "react";
import Screen from "./Screen";
import UserContextProvider from "./context";

function App() {
  return (
    // App내부에 있는 모든 것들을 ContextProvider 내부에 둔다
    // Screen 이 ContextProvider의 children이 된다.
    <UserContextProvider>
      <Screen />
    </UserContextProvider>
  );
}

export default App;
