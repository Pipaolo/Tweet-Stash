import { Avatar, Flex } from '@chakra-ui/react';
import { FullUser, Status } from 'twitter-d';
import { TweetCardContent } from './TweetCardContent';
import { TweetCardFooter } from './TweetCardFooter';
import { TweetCardHeader } from './TweetCardHeader';
import { TweetCardMediaContent } from './TweetCardMediaContent';
import { TweetCardSaveButton } from './TweetCardSaveButton';

interface IProps {
  tweet: Status;
}
export const TweetCard = ({ tweet }: IProps) => {
  const author = tweet.user as FullUser;

  const renderContent = () => {
    if (tweet.entities.media) {
      return <TweetCardMediaContent tweet={tweet} />;
    }
    return <TweetCardContent tweet={tweet} />;
  };

  return (
    <Flex
      bg="white"
      borderRadius="20px"
      w="full"
      flexDir="column"
      overflow={['hidden', 'hidden', 'initial']}
    >
      <Flex p="1em">
        <Avatar src={author.profile_image_url_https}></Avatar>
        <Flex flexDir="column" marginLeft="1em" w="full">
          <TweetCardHeader tweet={tweet} />
          {renderContent()}
          <TweetCardFooter tweet={tweet} />
        </Flex>
      </Flex>
      <TweetCardSaveButton
        display={['block', 'block', 'none']}
        tweet={tweet}
        isSaved={tweet.isSaved || false}
      />
    </Flex>
  );
};
