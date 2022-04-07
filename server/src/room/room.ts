import { Song } from 'src/Types';
import SongQueue from './song-queue';

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
    this.songQueue = new SongQueue();
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
    return this.songQueue.songQueue;
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
    this.songQueue.addSong(song);

    if (!this.isPlaying) {
      this.playNextSong();
    }
    return true;
  }

  upvoteSong(songID: string): boolean {
    const result = this.songQueue.increaseVote(songID);
    return result;
  }

  downvoteSong(songID: string): boolean {
    const result = this.songQueue.decreaseVote(songID);
    return result;
  }

  private playNextSong() {
    const songToPlay = this.songQueue.getNextSong();
    if (songToPlay) {
      this.isPlaying = true;
      this.nowPlaying = songToPlay;
      this.playSong(this.spotifyAuthToken, songToPlay.id);
      this.nowPlayingCallback(this.id, songToPlay, this.songQueue.songQueue);
      this.currentTimeout = setTimeout(
        () => this.playNextSong(),
        songToPlay.duration_ms,
      );
    } else {
      this.nowPlaying = undefined;
      this.nowPlayingCallback(this.id, undefined, this.songQueue.songQueue);
      this.isPlaying = false;
    }
  }

  skipSong() {
    clearTimeout(this.currentTimeout);
    this.playNextSong();
  }
}
