import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const value = {
    isLoggedIn,
    userProfile,
    setLoggedIn,
    setUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
