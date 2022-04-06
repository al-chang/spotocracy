import React from "react";
import { Grid, GridItem, Button } from "@chakra-ui/react";
import { SongData } from "../Types";
import Song from "./Song";

interface SongVoteProps {
  songData: SongData;
  style?: React.CSSProperties;
}

const SongVote: React.FC<SongVoteProps> = ({ songData, style }) => {
  return (
    <Grid templateColumns="4fr 1fr" alignItems="center" style={style}>
      <Song songData={songData} />
      <GridItem className="voting" h="10">
        <Button colorScheme="teal" variant="ghost">
          +
        </Button>
        <Button colorScheme="teal" variant="ghost">
          -
        </Button>
      </GridItem>
    </Grid>
  );
};

export default SongVote;
