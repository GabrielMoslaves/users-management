import React, { createContext, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session"))
  );

  const handleLogin = (session) => {
    setSession(session);
    localStorage.setItem("session", JSON.stringify(session));
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("session");
  };

  return (
    <SessionContext.Provider value={{ session, setSession, handleLogin, handleLogout }}>
      {children}
    </SessionContext.Provider>
  );
};
