import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomStoreService } from './room/room-store.service';
import { RoomGateway } from './room/room.gateway';
import { SpotifyService } from './spotify/spotify.service';
import { SpotifyController } from './spotify/spotify.controller';
import { HttpModule } from '@nestjs/axios';
import { RoomController } from './room/room.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, SpotifyController, RoomController],
  providers: [AppService, RoomStoreService, RoomGateway, SpotifyService],
})
export class AppModule {}
