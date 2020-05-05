import React, { useEffect, useRef } from "react";
// hook과 animation를 섞기
const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();

  useEffect(() => {
    if (element.current) {
      // DOM의 프로퍼티를 다채롭게 조작할 수 있다.
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  });

  return { ref: element, style: { opacity: 0 } };
};

const App = () => {
  const fadeInH1 = useFadeIn(3, 2);
  const fadeInP = useFadeIn(5, 10);
  return (
    <div>
      {/* <h1 ref={fadeInH1.ref} style={fadeInH1.style}> */}
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>lalalal</p>
    </div>
  );
};

export default App;
