// export type SongQueue = Song[];

export interface Song {
  name: string;
  id: string;
  duration_ms: number;
  artists: SongArtists[];
  votes: number;
  album: AlbumData;
}

export interface SongArtists {
  name: string;
  id: string;
}

export interface AlbumData {
  images: {
    url: string;
  }[];
}
