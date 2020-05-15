import React, { useState, useContext } from "react";

// App의 데이터 저장소
const UserContext = React.createContext();

// Provider 내 모든 children은 value에 대한 접근 권한이 생겼다.
// 한 곳에 state를 몰아서 정리
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Simyeong",
    loggedIn: false
  });

  const logUserIn = () => setUser({ ...user, loggedIn: true });
  const logUserOut = () => setUser({ ...user, loggedIn: false });

  return (
    <UserContext.Provider value={{ user, fn: { logUserIn, logUserOut } }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};

export default UserContextProvider;
