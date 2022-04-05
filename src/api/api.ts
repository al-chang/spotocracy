import axios from "axios";

export const fetchAuthToken = async () => {
  const result = await axios.get(`${process.env.REACT_APP_URL}/spotify/login/`);
  console.log(result);
  return result;
};

interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export const getUserAuthToken = async (code: string) => {
  const result = await axios.get<AuthTokenResponse>(
    `${process.env.REACT_APP_URL}/spotify/userAuthToken?code=${code}`
  );
  return result.data;
};

interface AlbumData {
  images: {
    url: string;
  }[];
}

interface SongData {
  id: string;
  name: string;
  duration_ms: number;
  artists: SongSearchArtist[];
  album: AlbumData;
}

interface SongSearchArtist {
  name: string;
  id: string;
}

export interface SongSearchResults {
  items: SongData[];
  href: string;
}

export const getSongs = async (songName: string, artistName?: string) => {
  const result = await axios.get<SongSearchResults>(
    `${process.env.REACT_APP_URL}/spotify/searchSong/`,
    {
      params: {
        songName: songName,
        artistName: artistName,
      },
    }
  );
  return result.data;
};
