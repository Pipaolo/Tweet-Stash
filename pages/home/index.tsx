import { Flex, Heading, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { PrivateContainer } from '../../components/PrivateContainer';
import { SideNavigationBar } from '../../components/SideNavigationBar';
import { Status as Tweet } from 'twitter-d';
import axios from '../../utils/axios';
import { ApiResponse } from '../../types/api_response';
import { ApiError } from '../../types/api_error';
import { TweetCard } from '../../components/TweetCard';
import { SearchBar } from '../../components/SearchBar';
import { useStore } from '../../stores/useStore';
import { useEffect } from 'react';
import { Appbar } from '../../components/Appbar';

interface IProps {
  error?: ApiError;
  tweets?: Tweet[];
}

const HomePage = ({ tweets, error }: IProps) => {
  const { initializeRetweets, retweets, searchedRetweets, hasSearched } =
    useStore();

  useEffect(() => {
    initializeRetweets(tweets || []);
  }, [initializeRetweets, tweets]);

  const renderTweets = () => {
    if (!retweets || (!searchedRetweets && hasSearched)) {
      return <Heading>You have no tweets</Heading>;
    }

    // Show the search results
    if (searchedRetweets) {
      return searchedRetweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ));
    }
    return retweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />);
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
          <SearchBar />
          <VStack
            spacing="1em"
            w="full"
            overflowY={['initial', 'initial', 'auto']}
            overflowX="hidden"
            borderRadius="20px"
            paddingTop={['50px', '80px', '0']}
            paddingX="1em"
          >
            {renderTweets()}
            <Heading>End of Tweets</Heading>
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
    const response = await axios.get<ApiResponse>(`/api/twitter/getRetweets`, {
      headers: context.req.headers,
    });

    const responseData = response.data.data;
    const tweets = responseData as Tweet[];

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

export default HomePage;
