import React, { useEffect } from "react";

const useBeforLeave = onBefore => {
  const handle = e => {
    // event 객체를 이용해서 더 세밀한 조정이 가능하다
    const { clientY } = e;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
  });
  return () => {
    document.removeEventListener("mouseleave", handle);
  };
};

const App = () => {
  const begForLife = () => console.log("Plz don't leave");
  useBeforLeave(begForLife);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default App;
