import React from 'react';

import { useState } from 'react';

import { Input, Heading, Button, Flex } from '@chakra-ui/react';

import { getSongs } from '../api/api';
import SearchResult from './SearchResult';
import { SongData, SongSearchResults } from '../Types';

interface AddSongProps {
  submitSong: (songData: SongData) => void;
}

const AddSong: React.FC<AddSongProps> = ({ submitSong }) => {
  const [songInput, setSongInput] = useState<string>('');
  const [songOptions, setSongOptions] = useState<SongSearchResults>();

  const handleSearch = async () => {
    if (!songInput) return;
    const searchResults = await getSongs(songInput);
    setSongOptions(searchResults);
  };

  return (
    <>
      <Heading>Add Song</Heading>
      <Flex flexDir="row">
        <Input
          placeholder="Enter a song name"
          value={songInput}
          onChange={(input) => setSongInput(input.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <Button variant="spotocracy-alt" onClick={handleSearch}>
          Search
        </Button>
      </Flex>
      {songOptions &&
        songOptions.items.map((songData) => (
          <SearchResult
            key={songData.id}
            submitSong={submitSong}
            songData={songData}
            style={{ margin: '10px 0' }}
          />
        ))}
    </>
  );
};

export default AddSong;
