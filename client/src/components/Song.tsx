import React from 'react';
import { Image, Flex, Heading } from '@chakra-ui/react';
import { SongData } from '../Types';

interface SongProps {
  songData: SongData;
}

const Song: React.FC<SongProps> = ({ songData }) => {
  return (
    <Flex flexDir="row" alignItems="center">
      <Image
        height={{ base: '50px', md: '100px' }}
        src={songData.album.images[0].url}
      />
      <Flex
        flexDir="column"
        height="inherit"
        justifyContent="space-evenly"
        margin="10px"
      >
        <Heading as="h3" size="md" color="#FFFFFF">
          {songData.name}
        </Heading>
        <Heading as="h4" size="sm" color="#a8a8a8">
          {songData.artists.map((artistData, index) => (
            <span key={index}>
              {artistData.name}
              {index < songData.artists.length - 1 && ', '}
            </span>
          ))}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Song;
