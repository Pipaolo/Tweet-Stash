import { Flex } from '@chakra-ui/react';
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
          height: mediaSize.medium.h || 4,
          width: mediaSize.medium.w || 3,
          alt: tweet.text,
        };
      });
    }, [retweets]) || [];

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

        <Flex
          p="2em"
          w="full"
          h="full"
          overflowY={['initial', 'initial', 'auto']}
        >
          <PhotoGallery
            photos={images}
            renderImage={(props) => (
              <GalleryImage tweet={retweets![props.index]} {...props} />
            )}
          ></PhotoGallery>
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
