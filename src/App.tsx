import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Welcome from "./components/Welcome";
import AddSong from "./components/AddSong";
import QueuePage from "./components/QueuePage";
import {
  AuthTokenProvider,
  useAuthTokenContext,
} from "./hooks/AuthTokenContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  const socket = io("http://127.0.0.1:80/");

  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [songInput, setSongInput] = useState("");
  const [songQueue, setSongQueue] = useState<string[]>([]);
  const [addingSong, setAddingSong] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    socket.on("createdRoom", (roomID) => {
      setRoomID(roomID);
      setJoinedRoom(true);
    });
    socket.on("songAdded", (songList) => setSongQueue(songList));
    socket.on("joinedRoom", (joinedRoomId, songs) => {
      setJoinedRoom(true);
      setRoomID(joinedRoomId);
      setSongQueue(songs);
    });
    socket.on("searchResults", (searchResults) => {
      setSongResults(searchResults);
    });
  }, [socket]);

  const [songResults, setSongResults] = useState([]);

  const authToken = useAuthTokenContext();

  const createRoom = () => {
    socket.emit("createRoom", { spotifyKey: authToken, isPublic: false });
  };

  const joinRoom = () => {
    socket.emit("joinRoom", roomID);
  };

  const searchSong = (songName: string) => {
    socket.emit("searchSong", { songName });
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
};

export default App;
