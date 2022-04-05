import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAuthTokenContext } from "../hooks/AuthTokenContext";
import { useRoomContext, useRoomUpdateContext } from "../hooks/RoomContext";

interface QueueProps {
  createRoom: boolean;
  roomID: string;
  socket: Socket;
}

const Queue: React.FC<QueueProps> = ({ createRoom, roomID, socket }) => {
  const navigate = useNavigate();

  const roomData = useRoomContext();
  const setRoomData = useRoomUpdateContext();

  const [songInput, setSongInput] = useState<string>("");

  const authToken = useAuthTokenContext();

  const submitSong = () => {
    socket.emit("addSong", { roomID: roomID, songName: songInput });
    setSongInput("");
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

  return <></>;
};

export default Queue;
