import React, { useState, useEffect, useRef } from "react";

// 뭔가 정보를 저장 혹은 로드하기 전에 사용자가 떠나려고 하면 경고 창을 보여준다.

const usePreventLeave = () => {
  const listner = e => {
    // 밑의 내용을 반드시 넣어줘야 된다.
    e.preventDefault();
    e.returnValue = "";
  };
  // API 등에서 정보를 받는 중이라면 enable
  const enablePrevent = () => window.addEventListener("beforeunload", listner);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listner);
  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div>
      <button onClick={enablePrevent}>protect</button>
      <button onClick={disablePrevent}>unprotect</button>
    </div>
  );
};

export default App;
