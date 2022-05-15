import React, { useContext, useState } from 'react';
import { VoteChoice } from '../components/SongVote';
import { SongData } from '../Types';

export interface RoomData {
  roomID: string;
  songQueue: SongData[];
  nowPlaying?: SongData;
  songVotes: { [songID: string]: VoteChoice | undefined };
}

type RoomContextType = {
  roomData: RoomData;
  setRoomData: (value: React.SetStateAction<RoomData>) => void;
};

const RoomContext = React.createContext<RoomContextType>(null!);

export function useRoomContext() {
  return useContext(RoomContext);
}

export const RoomProvider: React.FC = ({ children }) => {
  const [roomData, setRoomData] = useState<RoomData>({
    roomID: '',
    songQueue: [],
    songVotes: {},
  });

  return (
    <RoomContext.Provider value={{ roomData, setRoomData }}>
      {children}
    </RoomContext.Provider>
  );
};
