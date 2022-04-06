export interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface AlbumData {
  images: {
    url: string;
  }[];
}

export interface SongData {
  id: string;
  name: string;
  duration_ms: number;
  artists: SongArtist[];
  album: AlbumData;
}

export interface SongArtist {
  name: string;
  id: string;
}

export interface SongSearchResults {
  items: SongData[];
  href: string;
}
