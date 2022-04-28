import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { generateErrorResponse, generateRandomString } from 'src/Utils';
import { stringify } from 'querystring';
import 'dotenv/config';
import axios from 'axios';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  stateKey = 'spotify_auth_state';
  scope =
    'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public streaming app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing';

  constructor(private spotifyService: SpotifyService) {}

  @Get('userAuthToken')
  async getUserAuthToken(@Req() req, @Res() res) {
    const code = req.query.code;

    const data = stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
    });

    try {
      const result = await axios.post(
        `https://accounts.spotify.com/api/token`,
        data,
        {
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(
                process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET,
              ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      res.send(result.data);
    } catch (err) {
      console.error('ERROR occured when fetching user token');
      res.status(400);
      res.send(generateErrorResponse('Unable to fetch user token.'));
    }
  }

  // Route for searching for a song. Required body params: songName. Optional body params: artistName.
  @Get('searchSong')
  searchSong(@Req() req, @Res() res) {
    const songName = req.query?.songName;
    const artistName = req.query?.artistName;

    if (!songName) {
      res.status(400);
      res.send(generateErrorResponse('No song name provided.'));
      return;
    }

    this.spotifyService
      .searchSongByName(songName, artistName)
      .then((result) => {
        res.send(result?.data?.tracks);
      });
  }

  @Get('playSong')
  playSong(@Req() req, @Res() res) {
    const songID = req.query?.songID;
    const authToken = req.query?.authToken;
    this.spotifyService.playSong(authToken, songID);
  }
}
