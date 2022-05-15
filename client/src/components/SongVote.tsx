import React from 'react';
import { Grid, Badge, Flex } from '@chakra-ui/react';
import { SongData } from '../Types';
import Song from './Song';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useRoomContext } from '../hooks/RoomContext';

interface SongVoteProps {
  songData: SongData;
  style?: React.CSSProperties;
  upvoteSong: (songID: string) => void;
  downvoteSong: (songID: string) => void;
}

export enum VoteChoice {
  UP = 'up',
  DOWN = 'down',
}

const SongVote: React.FC<SongVoteProps> = ({
  songData,
  style,
  upvoteSong,
  downvoteSong,
}) => {
  const { roomData, setRoomData } = useRoomContext();
  const voteChoice = roomData.songVotes[songData.id];

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
              if (voteChoice !== undefined) upvoteSong(songData.id);

              upvoteSong(songData.id);
              setRoomData((oldRoomData) => {
                return {
                  ...oldRoomData,
                  songVotes: {
                    ...oldRoomData.songVotes,
                    [songData.id]: VoteChoice.UP,
                  },
                };
              });
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
              if (voteChoice !== undefined) downvoteSong(songData.id);
              downvoteSong(songData.id);
              setRoomData((oldRoomData) => {
                return {
                  ...oldRoomData,
                  songVotes: {
                    ...oldRoomData.songVotes,
                    [songData.id]: VoteChoice.DOWN,
                  },
                };
              });
            }
          }}
        />
      </Flex>
    </Grid>
  );
};

export default SongVote;
