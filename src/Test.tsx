import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Test: React.FC = () => {
  const socket = io("http://127.0.0.1:80/");

  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [songInput, setSongInput] = useState("");
  const [songQueue, setSongQueue] = useState<string[]>([]);

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
  };

  if (!joinedRoom) {
    return (
      <>
        <button onClick={createRoom}>Create Room</button>
        <br />
        <input
          placeholder="Enter room code"
          value={roomID}
          onChange={(input) => setRoomID(input.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </>
    );
  } else {
    return (
      <>
        {roomID}
        <input
          placeholder="Enter a song name"
          value={songInput}
          onChange={(input) => setSongInput(input.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") submitSong();
          }}
        />
        <button onClick={submitSong}>Submit Song</button>
        <ul>
          {songQueue.map((song) => (
            <li key={Math.random()}>{song}</li>
          ))}
        </ul>
      </>
    );
  }
};

export default Test;
