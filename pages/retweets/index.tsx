import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { PrivateContainer } from '../../components/PrivateContainer';
import { SideNavigationBar } from '../../components/SideNavigationBar';
import { Status, Status as Tweet } from 'twitter-d';

import { ApiError } from '../../types/api_error';
import { TweetCard } from '../../components/TweetCard';
import axios from '../../utils/axios';
import { ApiResponse } from '../../types/api_response';
import { Appbar } from '../../components/Appbar';

interface IProps {
  error?: ApiError;
  tweets?: Tweet[];
}

const RetweetsPage = ({ tweets, error }: IProps) => {
  const tweetsLength = tweets?.length || 0;

  const renderTweets = () => {
    if (!tweets || tweets.length === 0) {
      return <Heading>You have no stored retweets {':('}</Heading>;
    }
    return tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />);
  };

  return (
    <PrivateContainer>
      <Flex
        bg="blue.400"
        h={['100%', '100%', '100vh']}
        align="center"
        justify="center"
        p={['0px', '0px', '1em']}
      >
        <Appbar />
        <SideNavigationBar />
        <VStack px={'2em'} w="full" h="full">
          <VStack
            spacing="1em"
            w="full"
            overflowY={['initial', 'initial', 'auto']}
            overflowX="hidden"
            borderRadius="20px"
            paddingTop={['70px', '100px', '0']}
            paddingX="1em"
          >
            {renderTweets()}
            <Heading>End of Stored Retweets {tweetsLength}/100</Heading>
            <Text>
              Note: You can only store a maximum of 100 as this is the limit
              that twitter provides
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </PrivateContainer>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  try {
    const response = await axios.get<ApiResponse>(
      `/api/twitter/getStoredRetweets`,
      {
        headers: context.req.headers,
      }
    );
    const responseData = response.data.data;
    const tweets = responseData as Status[];
    return {
      props: {
        tweets,
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          message: String(error.message),
        },
      },
    };
  }
};

export default RetweetsPage;
