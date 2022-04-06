import { Song, SongQueue } from 'src/Types';

export class Room {
  // At some point the room will need to keep track of the person who made its spotify information to auto play songs.

  private songQueue: SongQueue;
  private numListeners: number;
  private isPlaying = false;
  private currentTimeout = undefined;
  private nowPlaying: Song | undefined = undefined;

  constructor(
    private roomID: string,
    private spotifyAuthToken: string,
    private playSong: (authToken: string, songID: string) => void,
    private nowPlayingCallback: (
      roomID: string,
      song: Song,
      songQueue: Song[],
    ) => void,
    private publicRoom?: boolean,
  ) {
    this.songQueue = [];
    this.numListeners = 1;
  }

  get id() {
    return this.roomID;
  }

  get isPublic() {
    return this.publicRoom;
  }

  get numberListener() {
    return this.numListeners;
  }

  get allSongs() {
    return this.songQueue.map((song) => song);
  }

  get currentSong() {
    return this.nowPlaying;
  }

  incremenetListeners(): number {
    this.numListeners += 1;
    return this.numListeners;
  }

  decrementListeners(): number {
    this.numListeners -= 1;
    return this.numListeners;
  }

  addSong(song: Song): boolean {
    if (this.songQueue.find((_song) => _song.id === song.id)) return;

    this.songQueue.push(song);
    if (!this.isPlaying) {
      this.playNextSong();
    }
    return true;
  }

  private playNextSong() {
    const songToPlay = this.songQueue.shift();
    if (songToPlay) {
      this.isPlaying = true;
      this.nowPlaying = songToPlay;
      this.playSong(this.spotifyAuthToken, songToPlay.id);
      this.nowPlayingCallback(this.id, songToPlay, this.songQueue);
      this.currentTimeout = setTimeout(
        () => this.playNextSong(),
        songToPlay.duration_ms,
      );
    } else {
      this.nowPlaying = undefined;
      this.nowPlayingCallback(this.id, undefined, this.songQueue);
      this.isPlaying = false;
    }
  }

  skipSong() {
    clearTimeout(this.currentTimeout);
    this.playNextSong();
  }
}
