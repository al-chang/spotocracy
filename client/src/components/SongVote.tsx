import React, { useState } from 'react';
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

enum VoteChoice {
  UP,
  DOWN,
}

const SongVote: React.FC<SongVoteProps> = ({
  songData,
  style,
  upvoteSong,
  downvoteSong,
}) => {
  const [voteChoice, setVoteChoice] = useState<VoteChoice>();

  return (
    <Grid templateColumns="9fr 1fr" alignItems="center" style={style}>
      <Song songData={songData} />
      <Flex flexDir="column" alignItems="center">
        <TriangleUpIcon
          color={voteChoice === VoteChoice.UP ? '#1DB954' : '#a8a8a8'}
          fontSize="20px"
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            if (voteChoice !== VoteChoice.UP) {
              setVoteChoice(VoteChoice.UP);
              upvoteSong(songData.id);
            }
          }}
        />
        {songData.votes !== undefined && (
          <Badge variant="spotocracy">{songData.votes}</Badge>
        )}
        <TriangleDownIcon
          color={voteChoice === VoteChoice.DOWN ? '#1DB954' : '#a8a8a8'}
          fontSize="20px"
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            if (voteChoice !== VoteChoice.DOWN) {
              setVoteChoice(VoteChoice.DOWN);
              downvoteSong(songData.id);
            }
          }}
        />
      </Flex>
    </Grid>
  );
};

export default SongVote;
