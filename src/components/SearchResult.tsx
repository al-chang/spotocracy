import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import { SongArtist, SongData } from "../Types";

interface SearchResultProps {
  songData: SongData;
  submitSong: (
    songName: string,
    songURI: string,
    songDuration: number,
    songArtists: SongArtist[]
  ) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  songData,
  submitSong,
}) => {
  return (
    <>
      <Grid templateColumns="1fr 1fr">
        <Box>
          Song Name: {songData.name} <br /> Artist:{" "}
          {songData.artists.map((artistData, index) => (
            <span key={index}>{artistData.name}</span>
          ))}
        </Box>
        <Box>
          <Button
            onClick={() =>
              submitSong(
                songData.name,
                songData.id,
                songData.duration_ms,
                songData.artists
              )
            }
          >
            Add Song
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default SearchResult;
