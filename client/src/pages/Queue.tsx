import { Button, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import AddSong from "../components/AddSong";
import NowPlaying from "../components/NowPlaying";
import SongVote from "../components/SongVote";
import { useAuthTokenContext } from "../hooks/AuthTokenContext";
import { useRoomContext, useRoomUpdateContext } from "../hooks/RoomContext";
import { SongData } from "../Types";

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

  const addSongToQueue = (songData: SongData) => {
    socket.emit("addSong", {
      roomID: roomData.roomID,
      song: {
        id: songData.id,
        name: songData.name,
        duration_ms: songData.duration_ms,
        artists: songData.artists,
        album: { images: songData.album.images },
      },
    });
  };

  useEffect(() => {
    if (createRoom) {
      socket.emit("createRoom", { spotifyKey: authToken, isPublic: false });
    } else {
      socket.emit("joinRoom", roomID);
    }

    return () => {
      socket.emit("leaveRoom", roomID);
      setRoomData({ roomID: "", songQueue: [], nowPlaying: undefined });
    };
    // This is necessary because it does not properly create / join a room with all dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, createRoom, roomID, socket]);

  useEffect(() => {
    socket.on("joinRoomFailed", () => navigate("/"));
    socket.on("createRoomFailed", () => navigate("/"));

    socket.on("createdRoom", (roomID: string) => {
      setRoomData({ ...roomData, roomID: roomID });
    });
    socket.on("songAdded", (songList: SongData[]) =>
      setRoomData({ ...roomData, songQueue: songList })
    );
    socket.on(
      "joinedRoom",
      (roomID: string, songs: SongData[], nowPlaying: SongData) => {
        setRoomData({
          ...roomData,
          roomID: roomID,
          songQueue: songs,
          nowPlaying: nowPlaying,
        });
      }
    );
    socket.on(
      "nowPlaying",
      (song: SongData | undefined, songQueue: SongData[]) => {
        setRoomData({ ...roomData, nowPlaying: song, songQueue: songQueue });
      }
    );
  }, [navigate, roomData, setRoomData, socket]);

  return (
    <>
      <Grid templateColumns={{ base: "1fr", md: "1fr 3fr" }} gap="20px">
        <div>
          {roomData.nowPlaying && <NowPlaying song={roomData.nowPlaying} />}
          {addSong ? (
            <Button onClick={() => setAddSong(false)}>Go To Queue</Button>
          ) : (
            <Button onClick={() => setAddSong(true)}>Add Song</Button>
          )}
        </div>
        <div>
          {!addSong ? (
            roomData.songQueue.map((songData) => (
              <SongVote
                key={songData.id}
                songData={songData}
                style={{ margin: "10px 0" }}
              />
            ))
          ) : (
            <AddSong submitSong={addSongToQueue} />
          )}
        </div>
      </Grid>
    </>
  );
};

export default Queue;
