import React from "react";
import Song from "./Song";

interface SongsProp {
  queue: string[];
}

const Songs: React.FC<SongsProp> = ({ queue }) => {
  return (
    <div className="songs">
      {queue.map((song, index) => (
        <Song key={index} title={song} />
      ))}
    </div>
  );
};

export default Songs;
