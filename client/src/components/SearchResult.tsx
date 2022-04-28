import { Box, Button, Grid } from '@chakra-ui/react';
import React from 'react';
import { SongData } from '../Types';
import Song from './Song';

interface SearchResultProps {
  songData: SongData;
  submitSong: (songData: SongData) => void;
  style?: React.CSSProperties;
}

const SearchResult: React.FC<SearchResultProps> = ({
  songData,
  submitSong,
  style,
}) => {
  return (
    <>
      <Grid templateColumns="4fr 1fr" style={style}>
        <Song songData={songData} />
        <Box alignSelf="center" justifySelf="center">
          <Button onClick={() => submitSong(songData)} variant="spotocracy">
            Add Song
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default SearchResult;
