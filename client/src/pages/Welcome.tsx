import React, { useEffect } from 'react';
import {
  useAuthTokenContext,
  useAuthTokenUpdateContext,
} from '../hooks/AuthTokenContext';

import {
  Input,
  Button,
  Grid,
  Divider,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';

import { FormControl, FormLabel } from '@chakra-ui/react';

import { useNavigate, useLocation } from 'react-router-dom';
import { getUserAuthToken } from '../api/api';
import { stringify } from 'querystring';
import { generateRandomString, timesWithinHour } from '../utils/Utils';
import useLocalStorage from '../hooks/useLocalStorage';
import { AuthTokenLocalData } from '../Types';
// import "dotenv/config";

interface WelcomeProps {
  setCreateRoom: (value: boolean) => void;
  setRoomID: (value: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ setCreateRoom, setRoomID }) => {
  let navigate = useNavigate();

  const authToken = useAuthTokenContext();
  const updateAuthToken = useAuthTokenUpdateContext();

  const [storedTokenData, setStoredTokenData] = useLocalStorage<
    AuthTokenLocalData | undefined
  >('authToken', undefined);

  const state = generateRandomString(16);

  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');

  const dividerOrientation = useBreakpointValue<'horizontal' | 'vertical'>({
    base: 'horizontal',
    md: 'vertical',
  });

  useEffect(() => {
    const getAuthToken = async () => {
      if (code && !authToken && !storedTokenData) {
        const authToken = await getUserAuthToken(code);
        updateAuthToken(authToken.access_token);
        setStoredTokenData({
          authToken: authToken.access_token,
          creationTime: new Date().toISOString(),
          refreshToken: authToken.refresh_token,
        });
      }
    };
    getAuthToken();
  }, [authToken, code, updateAuthToken, storedTokenData, setStoredTokenData]);

  useEffect(() => {
    if (storedTokenData) {
      const dateCreated = new Date(storedTokenData.creationTime);
      if (
        storedTokenData.authToken &&
        dateCreated &&
        timesWithinHour(new Date(storedTokenData.creationTime), new Date())
      ) {
        updateAuthToken(storedTokenData.authToken);
      } else {
        setStoredTokenData(undefined);
      }
    }
  }, [setStoredTokenData, storedTokenData, updateAuthToken]);

  const joinRoom = () => {
    setCreateRoom(false);
    navigate('/queue');
  };

  return (
    <>
      <Stack
        className="welcome-form"
        margin="10vh 0"
        direction={{ base: 'column', md: 'row' }}
        height="100px"
      >
        <div className="join-room-form">
          <FormControl>
            <FormLabel htmlFor="room-code">Enter Room Code:</FormLabel>
            <Grid gridTemplateColumns={{ base: '3fr 2fr', md: '6fr 1fr' }}>
              <Input
                id="room-code"
                type="room-code"
                onChange={(input) => {
                  setRoomID(input.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') joinRoom();
                }}
              />
              <Button
                colorScheme="blue"
                onClick={joinRoom}
                variant="spotocracy"
              >
                Join Room
              </Button>
            </Grid>
          </FormControl>
        </div>

        <Divider
          margin={{ base: '20px 0', md: '40px' }}
          orientation={dividerOrientation}
        />

        {!authToken ? (
          // <Button onClick={fetchAuthToken}>Log In With Spotify</Button>
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href={`https://accounts.spotify.com/authorize?${stringify({
              response_type: 'code',
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
      </Stack>
    </>
  );
};

export default Welcome;
