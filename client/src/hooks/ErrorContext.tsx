import React, { useContext, useState } from 'react';

type ErrorContextType = {
  error: string;
  setError: (value: React.SetStateAction<string>) => void;
};

const ErrorContext = React.createContext<ErrorContextType>(null!);

export function useErrorContext() {
  return useContext(ErrorContext);
}

export const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<string>('');

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
