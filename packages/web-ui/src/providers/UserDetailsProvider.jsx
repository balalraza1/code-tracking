import React, { createContext } from "react";
import useUser from "../hooks/useUser"; // Adjust the import path as necessary

const initialUserState = {
  userData: undefined,
  setUserData: () => {},
};

const UserDetailsContext = createContext(initialUserState);

function UserDetailsProvider({ children }) {
  const {userData, setUserData,fetchUserData}= useUser();

  // Prepare the context value
  const contextValue = {
    ...(userData || {}),
    setUserData,
    fetchUserData
  };

  return (
    <UserDetailsContext.Provider value={contextValue}>{children}</UserDetailsContext.Provider>
  );
}

export default UserDetailsProvider;
export { UserDetailsContext };
