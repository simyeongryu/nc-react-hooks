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
