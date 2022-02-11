export type SongQueue = Song[];

export interface Song {
  songName: string;
  songURI: string;
  songDuration: number;
  votes: number;
}
