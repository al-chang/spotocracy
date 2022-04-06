import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Queue from './pages/Queue';
import Header from './components/Header';
import { io, Socket } from 'socket.io-client';
import { Box } from '@chakra-ui/react';

const App: React.FC = () => {
  const [roomID, setRoomID] = useState('');
  const [createRoom, setCreateRoom] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();

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
