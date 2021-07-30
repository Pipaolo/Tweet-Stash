import { NextApiHandler } from 'next';
import connectDB from '../../../middlewares/connectDB';
import verifyAuth from '../../../middlewares/verifyAuth';
import { ApiResponse } from '../../../types/api_response';
import tweetModel from '../../../models/tweet';
import { getSession } from 'next-auth/client';

const saveRetweetHandler: NextApiHandler<ApiResponse> = async (req, res) => {
  try {
    const body = req.body;
    const { tweetID, hasMedia, mediaURL } = JSON.parse(body);
    const session = await getSession({
      req,
    });

    const user = session!.user!;

    // Start creating
    const savedTweet = await tweetModel.create({
      userID: user.id,
      tweetID,
      hasMedia,
      mediaURL,
    });

    return res.status(200).json({
      data: savedTweet.toObject(),
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: 'Error Saving Retweet: ' + String(error),
        statusCode: 500,
      },
    });
  }
};

export default verifyAuth(connectDB(saveRetweetHandler));
