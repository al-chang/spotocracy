import React from "react";

import { useState, useEffect } from "react";

import {
  Input,
  Heading,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import { getSongs } from "../api/api";
import SearchResult from "./SearchResult";
import { SongArtist, SongSearchResults } from "../Types";

interface AddSongProps {
  setAddSong: (value: boolean) => void;
  submitSong: (
    songName: string,
    songURI: string,
    songDuration: number,
    songArtists: SongArtist[]
  ) => void;
}

const AddSong: React.FC<AddSongProps> = ({ setAddSong, submitSong }) => {
  const [songInput, setSongInput] = useState<string>("");
  const [songOptions, setSongOptions] = useState<SongSearchResults>();

  const handleSearch = async () => {
    const searchResults = await getSongs(songInput);
    setSongOptions(searchResults);
  };

  return (
    <>
      <Heading>Add Song</Heading>
      <Button onClick={() => setAddSong(false)}>Return to Queue</Button>
      <Input
        placeholder="Enter a song name"
        value={songInput}
        onChange={(input) => setSongInput(input.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <Button onClick={handleSearch}>Search</Button>
      {songOptions &&
        songOptions.items.map((songData) => (
          <SearchResult
            key={songData.id}
            submitSong={submitSong}
            songData={songData}
          />
        ))}
    </>
  );
};

export default AddSong;
