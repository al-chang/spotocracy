import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Song from "./components/Song";
import Songs from "./components/Songs";
import SearchResults from "./components/SearchResults";

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

const Test: React.FC = () => {
  const socket = io("http://127.0.0.1:80/");

  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [songInput, setSongInput] = useState("");
  const [songQueue, setSongQueue] = useState<string[]>([]);
  const [addingSong, setAddingSong] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // const getData = async () => {
  //   const response = await axios.get<string>("http://localhost:8080/");
  //   setStuff(response.data);
  // };

  useEffect(() => {
    socket.on("createdRoom", (roomID) => {
      setRoomID(roomID);
      setJoinedRoom(true);
    });
    socket.on("songAdded", (songList) => setSongQueue(songList));
    socket.on("joinedRoom", (joinedRoomId, songs) => {
      console.log("In here");
      console.log(joinedRoomId);
      setJoinedRoom(true);
      setRoomID(joinedRoomId);
      setSongQueue(songs);
    });
  }, [socket]);

  const createRoom = () => {
    socket.emit("createRoom", { isPublic: true });
  };

  const joinRoom = () => {
    socket.emit("joinRoom", roomID);
  };

  const submitSong = () => {
    socket.emit("addSong", { roomID: roomID, songName: songInput });
    setAddingSong(false);
    setShowSearchResults(false);
  };

  if (!joinedRoom) {
    return (
      <>
        <Heading className="welcome-header">Spotify Party</Heading>
        <div className="welcome-form">
          <div className="join-room-form">
            <FormControl>
              <FormLabel htmlFor="room-code">Enter Room Code:</FormLabel>
              <Input
                id="room-code"
                type="room-code"
                onChange={(input) => setRoomID(input.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" width="90%" onClick={joinRoom}>
              Join Room
            </Button>
          </div>
          <Button onClick={createRoom}>Create Room</Button>
          <br />
        </div>
      </>
    );
  } else if (addingSong) {
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
        <Button onClick={submitSong}>Submit Song</Button>
      </>
    );
  } else {
    return (
      <>
        <Heading className="welcome-header">Spotify Party</Heading>
        <div className="room-info">Room Name: NAME Room Code: {roomID}</div>

        <Button onClick={() => setAddingSong(true)}>Add Song</Button>
        <Songs queue={songQueue} />
      </>
    );
  }
};

export default Test;
