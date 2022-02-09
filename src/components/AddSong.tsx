import React from "react";
import SearchResults from "./SearchResults";
import { useState, useEffect } from "react";

import {
  Input,
  Heading,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

interface AddSongProps {
  songInput: string;
  setSongInput: (songName: string) => void;
  submitSong: () => void;
  showSearchResults: boolean;
  setShowSearchResults: (show: boolean) => void;
}

const AddSong: React.FC<AddSongProps> = ({
  songInput,
  setSongInput,
  submitSong,
  showSearchResults,
  setShowSearchResults,
}) => {
  let navigate = useNavigate();
  return (
    <>
      <Heading className="welcome-header">Spotify Party</Heading>
      <h1>Add Song</h1>
      <input
        placeholder="Enter a song name"
        value={songInput}
        onChange={(input) => setSongInput(input.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") submitSong();
        }}
      />
      <Button onClick={() => setShowSearchResults(true)}>Search</Button>
      {showSearchResults && <SearchResults results={[]}></SearchResults>}
      <Button
        onClick={() => {
          submitSong();
          navigate("/queue");
        }}
      >
        Submit Song
      </Button>
    </>
  );
};

export default AddSong;
