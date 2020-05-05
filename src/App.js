import React, { useEffect, useState } from "react";

// network 상태 감지
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
