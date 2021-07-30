import { Flex, Text } from '@chakra-ui/react';
import { Status } from 'twitter-d';

interface IProps {
  tweet: Status;
}
export const TweetCardContent = ({ tweet }: IProps) => {
  return (
    <Flex wrap="wrap" w="full">
      <Text noOfLines={50} wordBreak="break-word" w="full">
        {tweet.text}
      </Text>
    </Flex>
  );
};
