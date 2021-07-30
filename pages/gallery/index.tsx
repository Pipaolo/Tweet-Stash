import { Box, Flex, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { PrivateContainer } from '../../components/PrivateContainer';
import { SideNavigationBar } from '../../components/SideNavigationBar';

import { ApiError } from '../../types/api_error';
import { Appbar } from '../../components/Appbar';
import { Tweet } from '../../models/tweet';
import axios from '../../utils/axios';
import { ApiResponse } from '../../types/api_response';
import { useMemo } from 'react';

interface IProps {
  error?: ApiError;
  reTweets?: Tweet[];
}

const GalleryPage = ({ reTweets, error }: IProps) => {
  const images =
    useMemo(() => {
      const width = Math.floor(Math.random() * 100) + 1;
      const height = Math.floor(Math.random() * 50) + 1;
      return reTweets?.map((tweet) => ({
        src: String(tweet.mediaURL),
        width,
        height,
      }));
    }, [reTweets]) || [];

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
        <Flex p="2em" w="full" h="full" justify="center" align="center">
          <Heading>Work in progress!</Heading>
        </Flex>
      </Flex>
    </PrivateContainer>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  try {
    const response = await axios.get<ApiResponse>(
      `/api/twitter/getRetweetGallery`,
      {
        headers: context.req.headers,
      }
    );

    const responseData = response.data.data;
    const reTweets = responseData as Tweet[];

    return {
      props: {
        reTweets,
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

export default GalleryPage;
