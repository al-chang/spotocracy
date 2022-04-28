import { CloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WelcomeModal: React.FC = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [visited, setVisited] = useLocalStorage<boolean>('visited', false);

  const closeModal = () => {
    setVisited(true);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen && !visited} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader position="relative">
            Welcome to Spotocracy{' '}
            <CloseIcon
              position="absolute"
              right="5%"
              fontSize="15px"
              _hover={{ cursor: 'pointer' }}
              onClick={closeModal}
            />
          </ModalHeader>
          <ModalBody>
            <Text>
              Spotocracy allows users to join a room and add songs to a
              collective queue. Users can vote on the songs in order to modify
              the playback order. Music is played back through the device of the
              user who created the room.
            </Text>
            <br />
            <Text>
              To create a room, select the login with Spotify. Ensure that you
              have Spotify open on a device otherwise playback will not work.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeModal;
