import React from 'react';
import { Heading, Image } from '@chakra-ui/react';
import { SongData } from '../Types';

interface NowPlayingProps {
  song: SongData;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ song }) => {
  return (
    <>
      <Image src={song.album.images[0].url} />
      <Heading size="sm">{song.name}</Heading>
      <Heading size="sm">
        {song.artists.map((artist, index) => (
          <span key={artist.id}>
            {artist.name}
            {index < song.artists.length - 1 && ', '}
          </span>
        ))}
      </Heading>
    </>
  );
};

export default NowPlaying;
