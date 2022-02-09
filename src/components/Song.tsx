import React from "react";
import { Spinner } from "@chakra-ui/react";
import { Grid, GridItem, Button } from "@chakra-ui/react";
import { useState } from "react";

interface SongProps {
  title: string;
}

const Song: React.FC<SongProps> = ({ title }) => {
  return (
    <div className="song">
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={4} h="10" className="song-title">
          {title}
        </GridItem>
        <GridItem className="voting" colStart={5} colEnd={6} h="10">
          <Button colorScheme="teal" variant="ghost">
            +
          </Button>
          <Button colorScheme="teal" variant="ghost">
            -
          </Button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Song;
