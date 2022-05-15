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
import Footer from './components/Footer';

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
            backgroundColor="lightgray"
          >
            <AlertIcon color="red" />
            <AlertTitle color="red">An error has occured</AlertTitle>
            <AlertDescription color="black">{error}</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              color="black"
              onClick={() => setError('')}
            />
          </Alert>
        )}
        <Header />
        <Box margin={{ base: '10px 20px', md: '10px 50px' }} minHeight="80vh">
          <Routes>
            <Route
              path="/"
              element={
                <Welcome
                  roomID={roomID}
                  setCreateRoom={setCreateRoom}
                  setRoomID={setRoomID}
                />
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
        <Footer />
      </Router>
    </>
  );
};

export default App;
