import React from "react";
import { Image, Flex, Heading } from "@chakra-ui/react";
import { SongData } from "../Types";

interface SongProps {
  songData: SongData;
}

const Song: React.FC<SongProps> = ({ songData }) => {
  return (
    <Flex flexDir="row">
      <Image height="100px" src={songData.album.images[0].url} />
      <Flex
        flexDir="column"
        height="inherit"
        justifyContent="space-evenly"
        margin={"10px"}
      >
        <Heading as="h3" size="md">
          {songData.name}
        </Heading>
        <Heading as="h4" size="sm">
          {songData.artists.map((artistData, index) => (
            <span key={index}>{artistData.name}</span>
          ))}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Song;
