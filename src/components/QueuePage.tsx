import React from "react";
import Songs from "./Songs";

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

interface QueuePageProps {
  roomID: string;
  songQueue: string[];
  setAddingSong: (value: boolean) => void;
}

const QueuePage: React.FC<QueuePageProps> = ({
  roomID,
  songQueue,
  setAddingSong,
}) => {
  let navigate = useNavigate();
  return (
    <>
      <Heading className="welcome-header">Spotify Party</Heading>
      <div className="room-info">Room Name: NAME Room Code: {roomID}</div>
      <Button
        onClick={() => {
          setAddingSong(true);
          navigate("/add-song");
        }}
      >
        Add Song
      </Button>
      <Songs queue={songQueue} />;
    </>
  );
};

export default QueuePage;
