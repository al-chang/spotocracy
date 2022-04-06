import { Injectable } from '@nestjs/common';
import { stringify } from 'query-string';
import 'dotenv/config';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import { request } from 'https';
import { generateSpotifyOptions, Method } from 'src/Utils';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SpotifyService {
  private clientAccessToken = '';

  constructor(private httpService: HttpService) {
    this.updateAccessToken();
  }

  async updateAccessToken() {
    const data = stringify({ grant_type: 'client_credentials' });

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

    this.clientAccessToken = result.data.access_token;
  }

  async searchSongByName(songName: string, artistName?: string) {
    try {
      const url = `https://api.spotify.com/v1/search?q=track:${songName}${
        artistName ? `+artist:${artistName}` : ''
      }&type=track`;

      const results = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + this.clientAccessToken,
        },
      });
      return results;
    } catch (err) {
      console.error(err?.response?.statusText);
      console.error('There was an error in search song by name');
    }
  }

  startPlayback(authToken: string) {
    const options = generateSpotifyOptions(
      '/v1/me/player/play',
      Method.PUT,
      authToken,
    );
    const req = request(options, (res) => console.log(res));
    req.on('error', (error) => console.error(error));
    req.end();
  }

  pausePlayback(authToken: string) {
    const options = generateSpotifyOptions(
      '/v1/me/player/pause',
      Method.PUT,
      authToken,
    );
    const req = request(options, (res) => console.log(res));
    req.on('error', (error) => console.error(error));
    req.end();
  }

  playSong(authToken: string, songID: string) {
    const dataString = JSON.stringify({
      uris: [`spotify:track:${songID}`],
    });

    const options = generateSpotifyOptions(
      '/v1/me/player/play',
      Method.PUT,
      authToken,
    );
    const req = request(options, (res) => console.log('Received response'));
    req.write(dataString);
    // req.on('error', (error) => console.error(error));
    req.end();
  }
}
