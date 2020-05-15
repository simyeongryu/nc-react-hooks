import React, { useState } from "react";

// App의 데이터 저장소
export const UserContext = React.createContext();

// Provider 내 모든 children은 value에 대한 접근 권한이 생겼다.
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Simyeong",
    loggedIn: false
  });

  const logUserIn = () => setUser({ ...user, loggedIn: true });

  return (
    <UserContext.Provider value={{ user, logUserIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
