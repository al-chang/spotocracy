import React from "react";

import {
  Input,
  Heading,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

interface WelcomeProps {
  createRoom: () => void;
  joinRoom: () => void;
  setRoomID: (roomID: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({
  createRoom,
  joinRoom,
  setRoomID,
}) => {
  let navigate = useNavigate();

  return (
    <>
      <Heading className="welcome-header">Spotify Party</Heading>
      <div className="welcome-form">
        <div className="join-room-form">
          <FormControl>
            <FormLabel htmlFor="room-code">Enter Room Code:</FormLabel>
            <Input
              id="room-code"
              type="room-code"
              onChange={(input) => setRoomID(input.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="90%"
            onClick={() => {
              joinRoom();
              navigate(`/queue`);
            }}
          >
            Join Room
          </Button>
        </div>
        <Button
          onClick={() => {
            createRoom();
            navigate(`/queue`);
          }}
        >
          Create Room
        </Button>
        <br />
      </div>
    </>
  );
};

export default Welcome;
