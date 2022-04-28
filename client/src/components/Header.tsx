import { Badge, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from '../hooks/RoomContext';

interface HeaderProps {
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({ style }) => {
  const navigate = useNavigate();
  const { roomData } = useRoomContext();

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="baseline"
        margin={{ base: '10px 20px', md: '10px 50px' }}
        style={style}
      >
        <Heading
          as="h1"
          fontSize={{ base: '24px', md: '48px' }}
          onClick={() => navigate('/')}
          _hover={{ cursor: 'pointer' }}
        >
          <Image
            width={{ base: '50%', md: '30%' }}
            src="./images/spotocracy.png"
          />
        </Heading>
        {roomData.roomID && (
          <Badge variant="spotocracy" fontSize={{ base: '12px', md: '24px' }}>
            Room ID: {roomData.roomID}
          </Badge>
        )}
      </Flex>
    </>
  );
};

export default Header;
