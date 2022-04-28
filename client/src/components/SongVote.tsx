import React from 'react';
import { Grid, Badge, Flex } from '@chakra-ui/react';
import { SongData } from '../Types';
import Song from './Song';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

interface SongVoteProps {
  songData: SongData;
  style?: React.CSSProperties;
  upvoteSong: (songID: string) => void;
  downvoteSong: (songID: string) => void;
}

const SongVote: React.FC<SongVoteProps> = ({
  songData,
  style,
  upvoteSong,
  downvoteSong,
}) => {
  return (
    <Grid templateColumns="9fr 1fr" alignItems="center" style={style}>
      <Song songData={songData} />
      <Flex flexDir="column" alignItems="center">
        <TriangleUpIcon onClick={() => upvoteSong(songData.id)} />
        {songData.votes !== undefined && (
          <Badge variant="spotocracy">{songData.votes}</Badge>
        )}
        <TriangleDownIcon onClick={() => downvoteSong(songData.id)} />
      </Flex>
    </Grid>
  );
};

export default SongVote;
