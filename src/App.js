import React, { useEffect, useState, useRef } from "react";

const useFullScreen = () => {
  const element = useRef();
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
    }
  };
  return { element, triggerFull };
};

const App = () => {
  const { element, triggerFull } = useFullScreen();
  return (
    <div>
      <img
        ref={element}
        src="https://www.pngitem.com/pimgs/m/505-5058955_sample-png-images-sample-png-transparent-png.png"
      />
      <button onClick={triggerFull}>FullScreen</button>
    </div>
  );
};

export default App;
