import { Status } from 'twitter-d';
import { Tweet } from '../models/tweet';

const millions = 1000000;
const tenThousand = 10000;

export const filterRetweets = (
  tweets: Status[],
  savedRetweets: Tweet[]
): Status[] => {
  const filteredRetweets = tweets.filter((tweet) => tweet.retweeted);
  // Start fetching
  return filteredRetweets.map((tweet) => {
    const isSaved = savedRetweets.find(
      (savedTweet) =>
        savedTweet.tweetID === tweet.id_str &&
        savedTweet.userID === tweet.user.id_str
    );
    return {
      ...tweet,
      isSaved: isSaved !== undefined,
    };
  });
};

export const formatTweetStatisticCount = (count: number): string => {
  let formattedNumber: string = String(count);

  if (count > tenThousand) {
    const quotient = Math.floor(count / tenThousand);
    const remainder = count % tenThousand;
    if (remainder !== 0) {
      const remainderString = String(remainder).charAt(0);
      formattedNumber = `${quotient}.${remainderString}K`;
    } else {
      formattedNumber = `${quotient}K`;
    }
  } else if (count > millions) {
    const quotient = Math.floor(count / millions);
    const remainder = count % millions;

    if (remainder !== 0) {
      const remainderString = String(remainder).charAt(0);
      formattedNumber = `${quotient}.${remainderString}M`;
    } else {
      formattedNumber = `${quotient}M`;
    }
  }

  return formattedNumber;
};
