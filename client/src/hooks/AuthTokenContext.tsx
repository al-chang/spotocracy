import React, { useContext, useState } from "react";

const AuthTokenContext = React.createContext("");
const AuthTokenUpdateContext = React.createContext((token: string) => {});

export function useAuthTokenContext() {
  return useContext(AuthTokenContext);
}

export function useAuthTokenUpdateContext() {
  return useContext(AuthTokenUpdateContext);
}

export const AuthTokenProvider: React.FC = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  const updateAuthToken = (token: string) => {
    setAuthToken(token);
  };

  return (
    <AuthTokenContext.Provider value={authToken}>
      <AuthTokenUpdateContext.Provider value={updateAuthToken}>
        {children}
      </AuthTokenUpdateContext.Provider>
    </AuthTokenContext.Provider>
  );
};
