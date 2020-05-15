import React from "react";
import { useSetLang, useHyperTranslate } from "./context";

export default () => {
  const setLang = useSetLang();
  const hyperTranslate = useHyperTranslate();
  return (
    <>
      <h1>{hyperTranslate("Hello")}!</h1>
      <button onClick={() => setLang("kor")}>
        {hyperTranslate("Translate")}
      </button>
    </>
  );
};
