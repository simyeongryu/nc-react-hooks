# React Hooks

## useState

state를 새로 고쳐서 re-render한다.


```js
import React, { useState } from "react";

const App = () => {
  const [item, setItem] = useState(1);
  // const [item, setItem] = useState(1)[0]; state만 사용할 때
  // const [item, setItem] = useState(1)[1]; set함수만 사용할 때

  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return (
    <>
      <div>{item}</div>
      <button onClick={incrementItem}>증가</button>
      <button onClick={decrementItem}>감소</button>
    </>
  );
};
```

### 1) useInput

```js
import React, { useState } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => {
    const {
      target: { value }
    } = e;
    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const App = () => {
  const maxLength = value => value.length < 10;
  
  const name = useInput("Mr.", maxLength);
  return (
    <div>
      <h1>hello</h1>
      {/* <input placeholder="Name" value={name.value} onChange={name.onChange} /> */}
      <input placeholder="Name" {...name} />
    </div>
  );
};

export default App;

```

### 2) useTabs

```js
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
```

## useEffect 

componentDidMount, componentDidUpdate 등의 역할을 하는 함수
```js
// 마운트 될 때, state가 변하면 실행
useEffect(sayHello); 
// 마운트 될 때만 실행
useEffect(sayHello, []); 
// 마운트 될 때, state 중 number가 변할 때 해당 함수 실행
useEffect(sayHello, [number]); 
```

```js
import React, { useState, useEffect } from "react";

const App = () => {
  const sayHello = () => console.log("hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);

  // 마운트 될 때, state가 변하면 실행
  useEffect(sayHello); 
  // useEffect(sayHello, []); // 마운트 될 때만 실행
  // useEffect(sayHello, [number]); // 마운트 될 때, state 중 number가 변할 때 해당 함수 새로 시작

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};

export default App;
```

### 1) useTitle

```js
import React, { useState, useEffect } from "react";

// react-helmet을 대체하는 훅
const useTitle = initialTitle => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  // component 실행 시, title 변경 시 실행
  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle("Loading...");
  // 5초 후 title 변경
  setTimeout(() => titleUpdater("Home"), 5000);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default App;
```

### 2) useClick

**reference**

React의 모든 컴포넌트는 reference 요소를 갖고 있다. HTML 요소에 접근할 수 있게 한다.(quertSelector 등과 비슷하다.) current라는 프로퍼티에 참조하는 HTML DOM이 담겨 있다. 

```js
import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const test = useRef();
  setTimeout(() => test.current.focus(), 5000); // 참조하는 요소로 커서 이동
  return (
    <div>
      <h1>Hello</h1>
      <input ref={test} placeholder="la" />
    </div>
  );
};

export default App;
```

useEffect 안에 클로저(함수 리턴)를 만들면 componentWillUnmount를 구현할 수 있다.

```js
import React, { useState, useEffect, useRef } from "react";

const useClick = onClick => {
  const element = useRef();
  // useClick이 마운트 될때 실행 (state 업데이트는 X)
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    // componentWillUnmount. 컴포넌트가 종료될 때의 동작을 함수로 만들어 return (클로저)
    return () => {
      if (element.current) {
        element.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

const App = () => {
  const sayHello = () => console.log("say Hello");
  const title = useClick(sayHello);
  return (
    <div>
      <h1 ref={title}>Hello</h1>
    </div>
  );
};

export default App;
```