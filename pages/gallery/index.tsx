import { Box, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { PrivateContainer } from '../../components/PrivateContainer';
import { SideNavigationBar } from '../../components/SideNavigationBar';

import { ApiError } from '../../types/api_error';
import { Appbar } from '../../components/Appbar';
import axios from '../../utils/axios';
import { ApiResponse } from '../../types/api_response';
import { Status } from 'twitter-d';
import { useMemo } from 'react';
import PhotoGallery, { PhotoProps } from 'react-photo-gallery';
import { GalleryImage } from '../../components/GalleryImage';
interface IProps {
  error?: ApiError;
  retweets?: Status[];
}

const GalleryPage = ({ retweets, error }: IProps) => {
  const images: PhotoProps[] =
    useMemo(() => {
      return retweets?.map((tweet) => {
        const tweetMedia = tweet!.entities!.media![0];
        const mediaSize = tweetMedia.sizes;
        return {
          src: tweetMedia.media_url_https,
          height: mediaSize.large.h,
          width: mediaSize.large.w,
          alt: tweet.text,
        };
      });
    }, [retweets]) || [];

  console.log(images.length);

  return (
    <PrivateContainer>
      <Flex
        bg="blue.400"
        h={['100vh', '100vh', '100vh']}
        align="center"
        justify="center"
        p={['0px', '0px', '1em']}
        overflow={['auto', 'auto', 'hidden']}
      >
        <Appbar />
        <SideNavigationBar />

        <Box
          display={images.length === 2 ? 'block' : 'flex'}
          w="full"
          h="full"
          paddingTop={['70px', '100px', '0']}
          overflowY={['initial', 'initial', 'auto']}
          px="1em"
        >
          <PhotoGallery
            photos={images}
            direction="row"
            renderImage={(props) => (
              <GalleryImage tweet={retweets![props.index]} {...props} />
            )}
          ></PhotoGallery>
        </Box>
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
    const retweets = responseData as Status[];

    return {
      props: {
        retweets,
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
