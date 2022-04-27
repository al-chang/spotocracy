import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Queue from './pages/Queue';
import Header from './components/Header';
import { io, Socket } from 'socket.io-client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from '@chakra-ui/react';
import { useErrorContext } from './hooks/ErrorContext';

const App: React.FC = () => {
  const [roomID, setRoomID] = useState('');
  const [createRoom, setCreateRoom] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const { error, setError } = useErrorContext();

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_URL}/`);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <>
      <Router>
        {error && (
          <Alert
            status="error"
            position="absolute"
            zIndex="1"
            width="80%"
            left="50%"
            marginLeft="calc(40% * -1)"
            borderRadius="10px"
          >
            <AlertIcon />
            <AlertTitle>An error has occured</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setError('')}
            />
          </Alert>
        )}
        <Header />
        <Box margin="0px 50px">
          <Routes>
            <Route
              path="/"
              element={
                <Welcome setCreateRoom={setCreateRoom} setRoomID={setRoomID} />
              }
            />
            <Route
              path="/queue"
              element={
                <Queue
                  createRoom={createRoom}
                  roomID={roomID}
                  socket={socket!}
                />
              }
            />
          </Routes>
        </Box>
      </Router>
    </>
  );
};

export default App;
