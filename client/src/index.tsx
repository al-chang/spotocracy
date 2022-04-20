import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthTokenProvider } from './hooks/AuthTokenContext';
import { RoomProvider } from './hooks/RoomContext';
import { ErrorProvider } from './hooks/ErrorContext';

ReactDOM.render(
  <React.StrictMode>
    <ErrorProvider>
      <AuthTokenProvider>
        <RoomProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </RoomProvider>
      </AuthTokenProvider>
    </ErrorProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
