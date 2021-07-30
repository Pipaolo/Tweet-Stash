import { NextApiHandler } from 'next';
import connectDB from '../../../middlewares/connectDB';
import verifyAuth from '../../../middlewares/verifyAuth';
import { ApiResponse } from '../../../types/api_response';
import { getSession } from 'next-auth/client';
import { TwitterApiTokens } from 'twitter-api-v2';
import TwitterApi from 'twitter-api-v2';
import { Status } from 'twitter-d';

const getRetweetGalleryHandler: NextApiHandler<ApiResponse> = async (
  req,
  res
) => {
  const session = await getSession({
    req,
  });

  try {
    const user = session!.user!;
    const tokens: TwitterApiTokens = {
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: user.oauth_token || '',
      accessSecret: user.oauth_token_secret || '',
    };
    const client = new TwitterApi(tokens);

    const statuses = await client.v1.get(
      // Otherwise fetch the user's timeline
      '/statuses/user_timeline.json',
      {
        user_id: user.id,
        count: 200,
      }
    );

    // We need to filter the tweets in order to separate all
    // retweets from normal tweets
    const filteredStatuses = (statuses as Status[]).filter(
      (tweet) => tweet.entities.media
    );

    return res.status(200).json({
      data: filteredStatuses,
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error,
        statusCode: 500,
      },
    });
  }
};

export default verifyAuth(connectDB(getRetweetGalleryHandler));
