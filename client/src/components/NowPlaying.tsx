import React from 'react';
import { Heading, Image, useBreakpointValue } from '@chakra-ui/react';
import { SongData } from '../Types';

interface NowPlayingProps {
  song: SongData;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ song }) => {
  const songNameFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  return (
    <>
      <Image src={song.album.images[0].url} />
      <Heading
        color="#FFFFF"
        size={songNameFontSize}
        margin={{ base: '0', md: '10px 0' }}
      >
        {song.name}
      </Heading>
      <Heading color="#a8a8a8" size="sm" margin={{ base: '0', md: '10px 0' }}>
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
