import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Song } from 'src/Types';
import { RoomStoreService } from './room-store.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
})
export class RoomGateway {
  @WebSocketServer() wss: Server;

  constructor(private roomStore: RoomStoreService) {}

  /**
   * Call back function provided to rooms. Allows room to emit message to clients
   * when a new song starts to play.
   *
   * @param roomID the id of the room that the message is sent to
   * @param song the song information of the now playing song
   */
  nowPlaying = (roomID: string, song: Song, songQueue: Song[]) => {
    this.wss.to(roomID).emit('nowPlaying', song, songQueue);
  };

  @SubscribeMessage('connection')
  handleConnection(client: Socket) {
    client.emit('success');
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    client: Socket,
    message: { spotifyKey: string; isPublic?: boolean },
  ) {
    try {
      const newRoomID = this.roomStore.createRoom(
        message.spotifyKey,
        this.nowPlaying,
        message.isPublic,
      );

      client.join(newRoomID);
      client.on('disconnect', () =>
        this.roomStore.getRoom(newRoomID).decrementListeners(),
      );

      client.emit('createdRoom', newRoomID);
    } catch (err) {
      client.emit('createRoomFail');
      console.error('Error while creating room');
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomID: string) {
    const currentRoom = this.roomStore.getRoom(roomID);
    if (!currentRoom) {
      client.emit('joinRoomFail');
      return;
    }
    currentRoom.incremenetListeners();
    client.join(roomID);
    client.emit(
      'joinedRoom',
      roomID,
      currentRoom.allSongs,
      currentRoom.currentSong,
    );
    client.on('disconnect', () => currentRoom.decrementListeners());
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    const currentRoom = this.roomStore.getRoom(room);
    if (!currentRoom) {
      // TODO: Throw some kind of error if the room doesn't exist
      return;
    }
    const numListeners = currentRoom.decrementListeners();
    if (numListeners === 0) {
      // this.roomStore.deleteRoom(room);
    }
    client.leave(room);
    client.on('disconnect', () => {
      return;
    });
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('addSong')
  handleAddSong(
    client: Socket,
    message: {
      roomID: string;
      song: Song;
    },
  ) {
    if (!message.roomID) {
      client.emit('songAddedError', 'Unable to add song, no room ID.');
      return;
    }

    this.roomStore.addSong(message.roomID, message.song);
    const currentRoom = this.roomStore.getRoom(message.roomID);

    this.wss.to(message.roomID).emit('songAdded', currentRoom.allSongs);
  }

  @SubscribeMessage('upvoteSong')
  handleUpvoteSong(
    client: Socket,
    message: {
      roomID: string;
      songID: string;
    },
  ) {
    if (!message.roomID) {
      client.emit('songUpvotedError', 'Unable to upvote song, no room ID.');
      return;
    }

    this.roomStore.upvoteSong(message.roomID, message.songID);
    const currentRoom = this.roomStore.getRoom(message.roomID);

    this.wss.to(message.roomID).emit('songUpvoted', currentRoom.allSongs);
  }

  @SubscribeMessage('downvoteSong')
  handleDownvoteSong(
    client: Socket,
    message: {
      roomID: string;
      songID: string;
    },
  ) {
    if (!message.roomID) {
      client.emit('songDownvotedError', 'Unable to downvote song, no room ID.');
      return;
    }

    this.roomStore.downvoteSong(message.roomID, message.songID);
    const currentRoom = this.roomStore.getRoom(message.roomID);

    this.wss.to(message.roomID).emit('songDownvoted', currentRoom.allSongs);
  }
}
