import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Song from "./components/Song";
import Songs from "./components/Songs";
import SearchResults from "./components/SearchResults";
import Welcome from "./components/Welcome";
import AddSong from "./components/AddSong";
import QueuePage from "./components/QueuePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

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

const App: React.FC = () => {
  const socket = io("http://127.0.0.1:80/");

  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [songInput, setSongInput] = useState("");
  const [songQueue, setSongQueue] = useState<string[]>([]);
  const [addingSong, setAddingSong] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  //let navigate = useNavigate();

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
    /*
    let path = `queue`;
    navigate(path);
    */
  };

  const submitSong = () => {
    socket.emit("addSong", { roomID: roomID, songName: songInput });
    setAddingSong(false);
    setShowSearchResults(false);
    setSongInput("");
  };

  return (
    <div className="router">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Welcome
                createRoom={createRoom}
                joinRoom={joinRoom}
                setRoomID={setRoomID}
              />
            }
          />
          <Route
            path="/queue"
            element={
              <QueuePage
                roomID={roomID}
                songQueue={songQueue}
                setAddingSong={setAddingSong}
              />
            }
          />
          <Route
            path="/add-song"
            element={
              <AddSong
                songInput={songInput}
                setSongInput={setSongInput}
                submitSong={submitSong}
                showSearchResults={showSearchResults}
                setShowSearchResults={setShowSearchResults}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );

  /*
  } else if (addingSong) {
    return (
      <AddSong
        songInput={songInput}
        setSongInput={setSongInput}
        submitSong={submitSong}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
      />
    );
  } else {
    return (
      <QueuePage
        roomID={roomID}
        songQueue={songQueue}
        setAddingSong={setAddingSong}
      />
    );
  }
  */
};

export default App;
