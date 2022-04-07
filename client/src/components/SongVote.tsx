import React from 'react';
import { Grid, GridItem, Button, Badge } from '@chakra-ui/react';
import { SongData } from '../Types';
import Song from './Song';

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
    <Grid templateColumns="4fr 1fr" alignItems="center" style={style}>
      <Song songData={songData} />
      <GridItem className="voting" h="10">
        {songData.votes && (
          <Badge colorScheme="whatsapp">{songData.votes}</Badge>
        )}
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={() => upvoteSong(songData.id)}
        >
          +
        </Button>
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={() => downvoteSong(songData.id)}
        >
          -
        </Button>
      </GridItem>
    </Grid>
  );
};

export default SongVote;
