import { Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import { FullUser, Status } from 'twitter-d';

interface IProps {
  tweet: Status;
}
export const TweetCardHeader = ({ tweet }: IProps) => {
  const author = tweet.user as FullUser;
  const parsedDate = moment(tweet.created_at).format('MMM DD');
  return (
    <Flex alignItems="center" experimental_spaceX="1">
      <Text fontWeight="bold">{author.name}</Text>
      <Text display={['none', 'block']}>@{author.screen_name}</Text>
      <Box h="2px" w="2px" bg="black" borderRadius="full"></Box>
      <Text>{parsedDate}</Text>
    </Flex>
  );
};
