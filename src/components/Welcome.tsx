import React, { useEffect } from "react";
import {
  AuthTokenProvider,
  useAuthTokenContext,
  useAuthTokenUpdateContext,
} from "../hooks/AuthTokenContext";

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
  useLocation,
} from "react-router-dom";
import { fetchAuthToken, getUserAuthToken } from "../api/api";
import { stringify } from "querystring";
import { generateRandomString } from "../utils/Utils";
// import "dotenv/config";

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

  const authToken = useAuthTokenContext();
  const updateAuthToken = useAuthTokenUpdateContext();

  const state = generateRandomString(16);

  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  useEffect(() => {
    const getAuthCode = async () => {
      if (code) {
        const authToken = await getUserAuthToken(code);
        updateAuthToken(authToken.data);
      }
    };
    getAuthCode();
  }, [code]);

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
              onChange={(input) => {
                setRoomID(input.target.value);
                updateAuthToken(input.target.value);
              }}
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

        {!authToken ? (
          // <Button onClick={fetchAuthToken}>Log In With Spotify</Button>
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href={`https://accounts.spotify.com/authorize?${stringify({
              response_type: "code",
              client_id: process.env.REACT_APP_CLIENT_ID,
              scope: process.env.REACT_APP_SCOPE,
              redirect_uri: process.env.REACT_APP_REDIRECT_URI,
              state: state,
            })}`}
          >
            Log In With Spotify
          </a>
        ) : (
          <Button
            onClick={() => {
              createRoom();
              navigate(`/queue`);
            }}
          >
            Create Room
          </Button>
        )}
        <br />
      </div>
    </>
  );
};

export default Welcome;
