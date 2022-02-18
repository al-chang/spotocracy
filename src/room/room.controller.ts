import { Controller, Get } from '@nestjs/common';
import { RoomStoreService } from './room-store.service';

// Right now this file is just for testing purposes

@Controller('room')
export class RoomController {
  roomID = '';
  constructor(private roomStoreService: RoomStoreService) {}

  @Get('test')
  testRoomStuff() {
    const roomID = this.roomStoreService.createRoom(
      process.env.TEST_AUTH_TOKEN,
      false,
    );

    this.roomStoreService.addSong(
      roomID,
      'Call Me Maybe',
      '3Pqy5RRW33bhxYXN0ZZNXG',
      62973,
    );

    this.roomID = roomID;
  }

  @Get('testtwo')
  testTwo() {
    this.roomStoreService.addSong(
      this.roomID,
      'Drops of Jupiter',
      '2hKdd3qO7cWr2Jo0Bcs0MA',
      259933,
    );
  }
}
