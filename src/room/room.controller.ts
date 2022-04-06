import { Controller, Get } from '@nestjs/common';
import { RoomStoreService } from './room-store.service';

// Right now this file is just for testing purposes

@Controller('room')
export class RoomController {
  roomID = '';
  constructor(private roomStoreService: RoomStoreService) {}
}
