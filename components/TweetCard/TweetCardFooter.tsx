import { Flex, HStack, Text } from '@chakra-ui/react';
import { Status } from 'twitter-d';
import { FaHeart, FaRetweet } from 'react-icons/fa';
import { formatTweetStatisticCount } from '../../utils/tweet';
import { TweetCardSaveButton } from './TweetCardSaveButton';

interface IProps {
  tweet: Status;
}
export const TweetCardFooter = ({ tweet }: IProps) => {
  const formattedLikes = formatTweetStatisticCount(tweet.favorite_count);
  const formattedRetweets = formatTweetStatisticCount(tweet.retweet_count);

  return (
    <HStack
      w="full"
      justify={['space-evenly', 'start']}
      spacing="1em"
      flexWrap="wrap"
    >
      <Flex justify="center" alignItems="center">
        <FaRetweet />
        <Text ml="5px">{formattedRetweets}</Text>
      </Flex>
      <Flex justify="center" alignItems="center">
        <FaHeart />
        <Text ml="5px">{formattedLikes}</Text>
      </Flex>
      <TweetCardSaveButton
        display={['none', 'none', 'block']}
        tweet={tweet}
        isSaved={tweet.isSaved || false}
      />
    </HStack>
  );
};
