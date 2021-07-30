import { Box, Image, Tooltip } from '@chakra-ui/react';
import { RenderImageProps } from 'react-photo-gallery';
import Link from 'next/link';
interface IProps extends RenderImageProps {}
export const GalleryImage = ({
  direction,
  index,
  onClick,
  photo,
  left,
  margin,
  top,
  tweet,
}: IProps) => {
  // Start constructing the original link
  const twitterMedia = tweet!.extended_entities!.media![0];

  return (
    <Link href={twitterMedia.expanded_url || ''} passHref>
      <Box as="a" target="_blank" cursor="pointer">
        <Tooltip label="Go to original post">
          <Image
            borderRadius="20px"
            p="2px"
            height={photo.height}
            width={photo.width}
            alt={photo.alt}
            key={photo.key}
            src={photo.src}
            loading="eager"
          />
        </Tooltip>
      </Box>
    </Link>
  );
};
