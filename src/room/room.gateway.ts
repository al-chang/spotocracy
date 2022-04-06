import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Song } from 'src/Types';
import { RoomStoreService } from './room-store.service';

@WebSocketGateway(80, {
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  @WebSocketServer() wss: Server;

  constructor(private roomStore: RoomStoreService) {}

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
      console.log(message);
      const newRoomID = this.roomStore.createRoom(
        message.spotifyKey,
        message.isPublic,
      );

      client.join(newRoomID);
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
    client.join(roomID);
    client.emit('joinedRoom', roomID, currentRoom.allSongs);
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
      this.roomStore.deleteRoom(room);
    }
    client.leave(room);
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
    this.roomStore.addSong(message.roomID, message.song);
    const currentRoom = this.roomStore.getRoom(message.roomID);

    this.wss.to(message.roomID).emit('songAdded', currentRoom.allSongs);
  }
}
