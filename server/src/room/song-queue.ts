import { Song } from 'src/Types';

export default class SongQueue {
  private _songQueue: Song[];
  private _songPosition: { [id: string]: number };

  constructor() {
    this._songQueue = [];
    this._songPosition = {};
  }

  public get songQueue(): Song[] {
    return this._songQueue;
  }

  /**
   * Adds a song to the song queue.
   * @param song the song to be added
   */
  public addSong(song: Song) {
    if (this._songQueue.find((_song) => _song.id === song.id)) return;

    song.votes = 0;
    this._songQueue.push(song);
    this._songPosition[song.id] = this._songQueue.length - 1;
  }

  /**
   * Retrieve the song with the most votes in the queue.
   * @returns the next song to be played
   */
  public getNextSong(): Song {
    if (this._songQueue.length === 0) {
      return undefined;
    }

    const nextSong = this._songQueue.shift();
    this._songPosition[nextSong.id] = undefined;

    return nextSong;
  }

  // Internally we are using inseration sort. This is because our list is guaranteed to be mostly sorted.
  public increaseVote(songID: string): boolean {
    const songPosition = this._songPosition[songID];
    if (songPosition === undefined) {
      return false;
    }
    const song = this._songQueue[songPosition];
    song.votes = song.votes + 1;

    if (songPosition === 0) {
      return true;
    }

    let newSongPosition = songPosition;

    while (
      newSongPosition !== 0 &&
      song.votes > this._songQueue[newSongPosition - 1].votes
    ) {
      const nextSong = this._songQueue[newSongPosition - 1];

      this._songQueue[newSongPosition] = nextSong;
      this._songQueue[newSongPosition - 1] = song;

      this._songPosition[nextSong.id] = newSongPosition;

      newSongPosition -= 1;
    }
    this._songPosition[song.id] = newSongPosition;

    return true;
  }

  public decreaseVote(songID: string): boolean {
    const songPosition = this._songPosition[songID];
    if (songPosition === undefined) {
      return false;
    }
    const song = this._songQueue[songPosition];
    song.votes = song.votes - 1;

    if (songPosition === 0) {
      return true;
    }

    let newSongPosition = songPosition;

    while (
      newSongPosition !== this._songQueue.length - 1 &&
      song.votes < this._songQueue[newSongPosition + 1].votes
    ) {
      const nextSong = this._songQueue[newSongPosition + 1];

      this._songQueue[newSongPosition] = nextSong;
      this._songQueue[newSongPosition + 1] = song;

      this._songPosition[nextSong.id] = newSongPosition;

      newSongPosition += 1;
    }
    this._songPosition[song.id] = newSongPosition;

    return true;
  }
}
