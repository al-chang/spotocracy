import React, { useEffect } from "react";
import {
  useAuthTokenContext,
  useAuthTokenUpdateContext,
} from "../hooks/AuthTokenContext";

import { Input, Button } from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/react";

import { useNavigate, useLocation } from "react-router-dom";
import { getUserAuthToken } from "../api/api";
import { stringify } from "querystring";
import { generateRandomString } from "../utils/Utils";
// import "dotenv/config";

interface WelcomeProps {
  setCreateRoom: (value: boolean) => void;
  setRoomID: (value: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ setCreateRoom, setRoomID }) => {
  let navigate = useNavigate();

  const authToken = useAuthTokenContext();
  const updateAuthToken = useAuthTokenUpdateContext();

  const state = generateRandomString(16);

  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  useEffect(() => {
    const getAuthToken = async () => {
      if (code && !authToken) {
        const authToken = await getUserAuthToken(code);
        updateAuthToken(authToken.access_token);
      }
    };
    getAuthToken();
  }, [authToken, code, updateAuthToken]);

  return (
    <>
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
            onClick={() => {
              setCreateRoom(false);
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
              setCreateRoom(true);
              navigate(`/queue`);
            }}
          >
            Create Room
          </Button>
        )}
        <br />
        {authToken}
      </div>
    </>
  );
};

export default Welcome;
