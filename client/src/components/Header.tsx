import { Badge, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from '../hooks/RoomContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const roomData = useRoomContext();

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="baseline"
        margin={{ base: '10px 20px', md: '10px 50px' }}
      >
        <Heading
          as="h1"
          fontSize={{ base: '24px', md: '48px' }}
          onClick={() => navigate('/')}
          _hover={{ cursor: 'pointer' }}
        >
          Spotocracy
        </Heading>
        {roomData.roomID && (
          <Badge colorScheme="green" fontSize={{ base: '12px', md: '24px' }}>
            Room ID: {roomData.roomID}
          </Badge>
        )}
      </Flex>
    </>
  );
};

export default Header;
