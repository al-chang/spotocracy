import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../hooks/RoomContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const roomData = useRoomContext();

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="baseline"
        margin="10px 50px"
      >
        <Heading
          as="h1"
          onClick={() => navigate("/")}
          _hover={{ cursor: "pointer" }}
        >
          Spotocracy
        </Heading>
        {roomData.roomID && (
          <Heading as="h2" size="md">
            Room ID: {roomData.roomID}
          </Heading>
        )}
      </Flex>
    </>
  );
};

export default Header;
