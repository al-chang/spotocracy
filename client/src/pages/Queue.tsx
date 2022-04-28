import { Button, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import AddSong from '../components/AddSong';
import NowPlaying from '../components/NowPlaying';
import SongVote from '../components/SongVote';
import { useAuthTokenContext } from '../hooks/AuthTokenContext';
import { useErrorContext } from '../hooks/ErrorContext';
import { useRoomContext } from '../hooks/RoomContext';
import { SongData } from '../Types';

interface QueueProps {
  createRoom: boolean;
  roomID: string;
  socket: Socket;
}

const Queue: React.FC<QueueProps> = ({ createRoom, roomID, socket }) => {
  const navigate = useNavigate();

  const { roomData, setRoomData } = useRoomContext();
  const { setError } = useErrorContext();

  const [addSong, setAddSong] = useState<boolean>(false);

  const authToken = useAuthTokenContext();

  const addSongToQueue = (songData: SongData) => {
    const songToSend: SongData = {
      id: songData.id,
      name: songData.name,
      duration_ms: songData.duration_ms,
      artists: songData.artists,
      album: { images: songData.album.images },
    };

    socket.emit('addSong', {
      roomID: roomData.roomID,
      song: songToSend,
    });
  };

  const upvoteSong = (songID: string) => {
    socket.emit('upvoteSong', { roomID: roomData.roomID, songID: songID });
  };

  const downvoteSong = (songID: string) => {
    socket.emit('downvoteSong', { roomID: roomData.roomID, songID: songID });
  };

  useEffect(() => {
    if (createRoom) {
      socket.emit('createRoom', { spotifyKey: authToken, isPublic: false });
    } else {
      socket.emit('joinRoom', roomID);
    }

    return () => {
      socket.emit('leaveRoom', roomID);
    };
  }, [authToken, createRoom, roomID, socket]);

  useEffect(() => {
    socket.on('joinRoomFail', () => {
      setError('Failed to join room');
      navigate('/');
    });
    socket.on('createRoomFail', () => {
      setError('Failed to create room');
      navigate('/');
    });

    socket.on('createdRoom', (roomID: string) => {
      setRoomData((oldRoomData) => {
        return {
          ...oldRoomData,
          roomID: roomID,
          songQueue: [],
          nowPlaying: undefined,
        };
      });
    });
    socket.on('songAdded', (songList: SongData[]) =>
      setRoomData((oldRoomData) => {
        return { ...oldRoomData, songQueue: songList };
      }),
    );
    socket.on(
      'joinedRoom',
      (roomID: string, songs: SongData[], nowPlaying: SongData) => {
        setRoomData((oldRoomData) => {
          return {
            ...oldRoomData,
            roomID: roomID,
            songQueue: songs,
            nowPlaying: nowPlaying,
          };
        });
      },
    );
    socket.on(
      'nowPlaying',
      (song: SongData | undefined, songQueue: SongData[]) => {
        setRoomData((oldRoomData) => {
          return { ...oldRoomData, nowPlaying: song, songQueue: songQueue };
        });
      },
    );
    socket.on('songAddedError', () => {
      setError('Failed to add song');
    });
    socket.on('songUpvoted', (songQueue: SongData[]) => {
      setRoomData((oldRoomData) => {
        return { ...oldRoomData, songQueue: songQueue };
      });
    });
    socket.on('songDownvoted', (songQueue: SongData[]) => {
      setRoomData((oldRoomData) => {
        return { ...oldRoomData, songQueue: songQueue };
      });
    });

    return () => {
      socket.off('joinRoomFailed');
      socket.off('createRoomFailed');
      socket.off('createdRoom');
      socket.off('songAdded');
      socket.off('joinedRoom');
      socket.off('nowPlaying');
      socket.off('songAddedError');
      socket.off('songUpvoted');
      socket.off('songDownvoted');
    };
  });

  useEffect(() => {
    return () => {
      setRoomData({
        roomID: '',
        songQueue: [],
      });
    };
  }, [setRoomData]);

  return (
    <>
      <Grid templateColumns={{ base: '1fr', md: '1fr 3fr' }} gap="20px">
        <div>
          {roomData.nowPlaying && <NowPlaying song={roomData.nowPlaying} />}
          {addSong ? (
            <Button variant="spotocracy" onClick={() => setAddSong(false)}>
              Go To Queue
            </Button>
          ) : (
            <Button variant="spotocracy" onClick={() => setAddSong(true)}>
              Add Song
            </Button>
          )}
        </div>
        <div>
          {!addSong ? (
            roomData.songQueue.map((songData) => (
              <SongVote
                key={songData.id}
                songData={songData}
                style={{ margin: '10px 0' }}
                upvoteSong={upvoteSong}
                downvoteSong={downvoteSong}
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
