import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Room } from './room';
import { makeRoomID } from 'src/Utils';
import { SpotifyService } from 'src/spotify/spotify.service';
import { AlbumData, Song, SongArtists } from 'src/Types';

@Injectable()
export class RoomStoreService {
  private rooms: { [roomID: string]: Room } = {};

  constructor(private spotifyService: SpotifyService) {}

  getRoom(roomID: string): Room | undefined {
    return this.rooms[roomID];
  }

  getAllRooms(): Room[] {
    return Object.keys(this.rooms).map((key) => this.rooms[key]);
  }

  /**
   * Create a room.
   *
   * @returns the new room's id
   */
  createRoom(
    spotifyAuthToken: string,
    nowPlayingCallBack: (
      roomdID: string,
      song: Song,
      songQueue: Song[],
    ) => void,
    isPublic?: boolean,
  ): string {
    if (!spotifyAuthToken) {
      throw new Error('Spotify Token Required!');
    }

    // Create roomID, continue to recreate until we hit a unique ID
    let roomID = makeRoomID();
    while (this.rooms[roomID]) {
      roomID = makeRoomID();
    }
    const newRoom = new Room(
      roomID,
      spotifyAuthToken,
      this.spotifyService.playSong,
      nowPlayingCallBack,
      isPublic,
    );
    this.rooms[roomID] = newRoom;

    return roomID;
  }

  /**
   * Delete an existing room.
   *
   * @param roomID the room to be deleted
   * @returns true if room is successfully deleted, false otherwise
   */
  deleteRoom(roomID: string): boolean {
    const room = this.rooms[roomID];
    if (room) {
      this.rooms = undefined;
      return true;
    }

    return false;
  }

  addSong(roomID: string, song: Song) {
    const room = this.getRoom(roomID);
    if (!room) {
      // TODO
      console.log('Room not found');
      return;
    }

    room.addSong(song);
  }

  upvoteSong(roomID: string, songID: string) {
    const room = this.getRoom(roomID);
    if (!room) {
      // TODO
      console.log('Room not found');
      return;
    }

    room.upvoteSong(songID);
  }

  downvoteSong(roomID: string, songID: string) {
    const room = this.getRoom(roomID);
    if (!room) {
      // TODO
      console.log('Room not found');
      return;
    }

    room.downvoteSong(songID);
  }
}
