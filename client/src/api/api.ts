import axios from 'axios';
import { AuthTokenResponse, SongSearchResults } from '../Types';

export const fetchAuthToken = async () => {
  const result = await axios.get(`${process.env.REACT_APP_URL}/spotify/login/`);
  return result;
};

export const getUserAuthToken = async (code: string) => {
  const result = await axios.get<AuthTokenResponse>(
    `${process.env.REACT_APP_URL}/spotify/userAuthToken?code=${code}`,
  );
  return result.data;
};

export const getSongs = async (songName: string, artistName?: string) => {
  const result = await axios.get<SongSearchResults>(
    `${process.env.REACT_APP_URL}/spotify/searchSong/`,
    {
      params: {
        songName: songName,
        artistName: artistName,
      },
    },
  );
  return result.data;
};
