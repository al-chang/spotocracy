import { Song, SongQueue } from 'src/Types';

export class Room {
  // At some point the room will need to keep track of the person who made its spotify information to auto play songs.

  private songQueue: SongQueue;
  private numListeners: number;
  private isPlaying = false;
  private currentInterval = undefined;

  constructor(
    private roomID: string,
    private spotifyAuthToken: string,
    private playSong: (authToken: string, songID: string) => void,
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

  incremenetListeners(): number {
    this.numListeners += 1;
    return this.numListeners;
  }

  decrementListeners(): number {
    this.numListeners -= 1;
    return this.numListeners;
  }

  addSong(song: Song): boolean {
    this.songQueue.push(song);
    if (!this.isPlaying) {
      this.playNextSong();
    }
    return true;
  }

  private playNextSong() {
    const songToPlay = this.songQueue.pop();
    if (songToPlay) {
      this.isPlaying = true;
      this.playSong(this.spotifyAuthToken, songToPlay.songURI);
      this.currentInterval = setInterval(
        () => this.playNextSong(),
        songToPlay.songDuration,
      );
    } else {
      this.isPlaying = false;
    }
  }

  skipSong() {
    clearInterval(this.currentInterval);
    this.playNextSong();
  }
}
