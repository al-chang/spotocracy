import { SongData } from '../Types';
import SongVote from './SongVote';
import { Flex, Text } from '@chakra-ui/react';

interface SongQueueListProps {
  songQueue: SongData[];
  upvoteSong: (songID: string) => void;
  downvoteSong: (songID: string) => void;
}

const SongQueueList: React.FC<SongQueueListProps> = ({
  songQueue,
  upvoteSong,
  downvoteSong,
}) => {
  if (songQueue.length !== 0) {
    return (
      <>
        {songQueue.map((songData) => (
          <SongVote
            key={songData.id}
            songData={songData}
            style={{ margin: '10px 0' }}
            upvoteSong={upvoteSong}
            downvoteSong={downvoteSong}
          />
        ))}
      </>
    );
  } else {
    return (
      <>
        <Flex justifyContent="center">
          <Text margin="50px 0" color="#4d4d4d">
            No songs in the queue
          </Text>
        </Flex>
      </>
    );
  }
};
export default SongQueueList;
