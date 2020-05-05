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

### 3) useConfirm()

confirm 팝업창을 이용한 UI 만들기 

예) 정말 삭제하시겠습니까?

```js
import React, { useState, useEffect, useRef } from "react";

const useConfirm = (message = "", onConfirm, onCancel) => {
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("Deleting the world");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("정말 삭제하시겠습니까?", deleteWorld, abort);
  return (
    <div>
      <button onClick={confirmDelete}>delete the world</button>
    </div>
  );
};

export default App;

```

### 4) usePreventLeave()

뭔가 정보를 저장 혹은 로드하기 전에 사용자가 떠나려고 하면 경고 창을 보여준다.
```js
import React, { useState, useEffect, useRef } from "react";

const usePreventLeave = () => {
  const listner = e => {
    // 밑의 내용을 반드시 넣어줘야 된다.
    e.preventDefault();
    e.returnValue = "";
  };
  // API 등에서 정보를 받는 중이라면 enable
  // beforeunload 이벤트는 페이지를 떠날 경우 발생하는 이벤트다. 
  // 즉, 인터넷 창을 닫거나 다른 페이지로 이동하거나 새로고침하는 경우다.
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

```

### 5) useBeforeLeave()

마우스가 특정 지역을 벗어날 때 유용함

```js
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
  }, []);
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
```

`clientY` 는 마우스 이벤트의 프로퍼티로 이벤트가 발생했을 때 마우스 커서의 Y축 좌표를 의미한다.

### 6) useFadeIn

hook과 animation를 섞기

```js
import React, { useEffect, useRef } from "react";

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

```

### 7) useNetwork

네트워크 상태를 감지한다.

```js
import React, { useEffect, useState } from "react";

const useNetwork = onChange => {
  // navigator.onLine - 인터넷에 연결되었으면 true 리턴
  const [status, setStatus] = useState(navigator.onLine);

  const handleChange = () => {
    onChange(navigator.onLine);
    setStatus(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);

  return status;
};

const App = () => {
  const handleNetworkChange = online => {
    console.log(online ? "ONONON" : "OFFOFFOFF");
  };
  const online = useNetwork(handleNetworkChange);
  return (
    <div>
      <h1>{online ? "online" : "offline"}</h1>
    </div>
  );
};

export default App;
```

### 8) useScroll

scroll 이동을 감지

```js
import React, { useEffect, useState } from "react";

const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });

  const onScroll = () => {
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

```

### 9) useFullScreen()

전체화면 제어

```js
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
```

전체화면에서 나가는 함수는 `document.exitFullscreen();`이다.

### 10) useNotification

알람 제어.

보다 많은 정보는 MDN 참조하자

```js
import React, { useEffect, useState, useRef } from "react";

const useNotification = (title, options) => {
  const fireNoti = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };

  return fireNoti;
};

const App = () => {
  const triggerNoti = useNotification("밥 먹을까?", { body: "한식한식" });
  return (
    <div>
      <button onClick={triggerNoti}>버튼</button>
    </div>
  );
};

export default App;

```