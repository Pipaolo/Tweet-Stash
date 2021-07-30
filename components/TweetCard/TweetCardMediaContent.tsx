import { Flex, Image, Text } from '@chakra-ui/react';
import { Status } from 'twitter-d';

interface IProps {
  tweet: Status;
}
export const TweetCardMediaContent = ({ tweet }: IProps) => {
  const media = tweet.entities.media![0];
  return (
    <Flex flexDir="column">
      <Text noOfLines={50} wordBreak="break-word">
        {tweet.text}
      </Text>
      <Image
        alignSelf="center"
        justifySelf="center"
        borderRadius="20px"
        margin="1em 0"
        alt=""
        src={media.media_url_https}
      />
    </Flex>
  );
};
