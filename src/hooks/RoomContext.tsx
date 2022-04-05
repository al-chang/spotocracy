import React, { useContext, useState } from "react";

export interface RoomData {
  roomID: string;
  songQueue: string[];
}

const RoomContext = React.createContext<RoomData>({
  roomID: "",
  songQueue: [],
});
const RoomUpdateContext = React.createContext((roomData: RoomData) => {});

export function useRoomContext() {
  return useContext(RoomContext);
}

export function useRoomUpdateContext() {
  return useContext(RoomUpdateContext);
}

export const RoomProvider: React.FC = ({ children }) => {
  const [roomData, setRoomData] = useState<RoomData>({
    roomID: "",
    songQueue: [],
  });

  const updateRoomData = (roomData: RoomData) => {
    setRoomData(roomData);
  };

  return (
    <RoomContext.Provider value={roomData}>
      <RoomUpdateContext.Provider value={updateRoomData}>
        {children}
      </RoomUpdateContext.Provider>
    </RoomContext.Provider>
  );
};
