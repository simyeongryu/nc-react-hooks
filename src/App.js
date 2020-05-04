import React, { useState } from "react";

// API로부터 정보를 받았다고 가정
const content = [
  {
    tab: "section 1",
    content: "content of section 1"
  },
  {
    tab: "section 2",
    content: "content of section 2"
  }
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);

  return (
    <div>
      {content.map((section, i) => (
        <button onClick={() => changeItem(i)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

export default App;
