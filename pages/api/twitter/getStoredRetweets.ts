import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';
import { TwitterApi, TwitterApiTokens } from 'twitter-api-v2';
import connectDB from '../../../middlewares/connectDB';
import verifyAuth from '../../../middlewares/verifyAuth';
import { ApiResponse } from '../../../types/api_response';

import tweetModel from '../../../models/tweet';
import { Status } from 'twitter-d';

const getStoredRetweets: NextApiHandler<ApiResponse> = async (req, res) => {
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
    const storedRetweets = await tweetModel
      .find({
        userID: user.id,
      })
      .lean();

    // Convert the stored retweets into string query for Twitter Lookup
    const tweetIDs = storedRetweets.map((tweet) => tweet.tweetID);
    const tweetIDQuery = tweetIDs.join(',');
    const statuses: Status[] = await client.v1.get(`/statuses/lookup.json`, {
      id: tweetIDQuery,
      count: 100,
    });
    const parsedStatuses = statuses.map((status) => {
      return {
        ...status,
        isSaved: true,
      };
    });

    return res.status(200).json({
      data: parsedStatuses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: String(error),
        statusCode: 500,
      },
    });
  }
};

export default verifyAuth(connectDB(getStoredRetweets));
