import { Button, Grid } from "@chakra-ui/react";
import { randomUUID } from "crypto";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import AddSong from "../components/AddSong";
import { useAuthTokenContext } from "../hooks/AuthTokenContext";
import { useRoomContext, useRoomUpdateContext } from "../hooks/RoomContext";
import { SongArtist } from "../Types";

interface QueueProps {
  createRoom: boolean;
  roomID: string;
  socket: Socket;
}

const Queue: React.FC<QueueProps> = ({ createRoom, roomID, socket }) => {
  const navigate = useNavigate();

  const roomData = useRoomContext();
  const setRoomData = useRoomUpdateContext();

  const [addSong, setAddSong] = useState<boolean>(false);

  const authToken = useAuthTokenContext();

  const addSongToQueue = (
    songName: string,
    songURI: string,
    songDuration: number,
    songArtists: SongArtist[]
  ) => {
    socket.emit("addSong", {
      roomID: roomData.roomID,
      songName,
      songURI,
      songDuration,
      songArtists,
    });
  };

  useEffect(() => {
    console.log("here");
    if (createRoom) {
      socket.emit("createRoom", { spotifyKey: authToken, isPublic: false });
    } else {
      socket.emit("joinRoom", roomID);
    }

    return () => {
      socket.emit("leaveRoom", roomID);
    };
  }, [authToken, createRoom, roomID, socket]);

  useEffect(() => {
    socket.on("joinRoomFailed", () => navigate("/"));
    socket.on("createRoomFailed", () => navigate("/"));

    socket.on("createdRoom", (roomID) => {
      setRoomData({ ...roomData, roomID: roomID });
    });
    socket.on("songAdded", (songList) =>
      setRoomData({ ...roomData, songQueue: songList })
    );
    socket.on("joinedRoom", (roomID, songs) => {
      setRoomData({ ...roomData, roomID: roomID, songQueue: songs });
    });
  }, [navigate, roomData, setRoomData, socket]);

  return (
    <>
      <Grid templateColumns="1fr 3fr">
        <div>
          <p>Currently Playing</p>
          <Button onClick={() => setAddSong(true)}>Add Song</Button>
        </div>
        <div>
          {!addSong ? (
            roomData.songQueue.map((songData) => (
              <p key={Math.random()}>{songData.name}</p>
            ))
          ) : (
            <AddSong setAddSong={setAddSong} submitSong={addSongToQueue} />
          )}
        </div>
      </Grid>
    </>
  );
};

export default Queue;
