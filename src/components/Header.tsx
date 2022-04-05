import { Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../hooks/RoomContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const roomData = useRoomContext();

  return (
    <>
      <Heading onClick={() => navigate("/")} _hover={{ cursor: "pointer" }}>
        Spotocracy
      </Heading>
      {roomData.roomID && (
        <Heading as={"h3"}>Room ID: {roomData.roomID}</Heading>
      )}
    </>
  );
};

export default Header;
