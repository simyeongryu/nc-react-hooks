import React, { useEffect, useState } from "react";

const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });

  const onScroll = e => {
    setState({ y: window.scrollY, x: window.scrollX });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return state;
};

const App = () => {
  const { y } = useScroll();
  return (
    <div style={{ height: 10000 }}>
      <h1 style={{ position: "fixed", color: y > 5000 ? "red" : "blue" }}>
        hello
      </h1>
    </div>
  );
};

export default App;
