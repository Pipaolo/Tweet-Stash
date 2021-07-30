import { Button, ButtonProps } from '@chakra-ui/react';
import { Status } from 'twitter-d';
import { FaCheck, FaClipboard, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

interface IProps extends ButtonProps {
  tweet: Status;
  isSaved: boolean;
}

export const TweetCardSaveButton = ({
  tweet,
  isSaved,
  ...restProps
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const handleOnSaveButtonPressed = async () => {
    setIsLoading(true);

    // Automatically remove the S
    if (!isSaved) {
      await fetch(`/api/twitter/saveRetweet`, {
        method: 'POST',
        body: JSON.stringify({
          tweetID: tweet.id_str,
          hasMedia: tweet.entities.media ? true : false,
          mediaURL: tweet.entities.media
            ? tweet.entities.media[0].media_url_https
            : '',
        }),
      });
    } else {
      await fetch(`/api/twitter/deleteRetweet?tweetID=${tweet.id_str}`, {
        method: 'POST',
      });
    }

    await router.replace(router.asPath);
    setIsLoading(false);
    setIsHovered(false);
  };

  if ((isHovered && !isLoading) || router.pathname.includes('/retweets')) {
    return (
      <Button
        textColor="red"
        onClick={handleOnSaveButtonPressed}
        leftIcon={<FaTrash />}
        variant="solid"
        onMouseLeave={() => setIsHovered(false)}
        {...restProps}
      >
        Remove
      </Button>
    );
  }

  if (isSaved) {
    return (
      <Button
        onClick={handleOnSaveButtonPressed}
        loadingText="Removing..."
        isLoading={isLoading}
        leftIcon={<FaCheck />}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...restProps}
      >
        Saved
      </Button>
    );
  }

  return (
    <Button
      onClick={handleOnSaveButtonPressed}
      leftIcon={<FaClipboard />}
      isLoading={isLoading}
      loadingText="Saving..."
      {...restProps}
    >
      Save Tweet
    </Button>
  );
};
