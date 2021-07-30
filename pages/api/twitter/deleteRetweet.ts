import { NextApiHandler } from 'next';
import connectDB from '../../../middlewares/connectDB';
import verifyAuth from '../../../middlewares/verifyAuth';
import { ApiResponse } from '../../../types/api_response';
import tweetModel from '../../../models/tweet';
import { getSession } from 'next-auth/client';

const deleteRetweetHandler: NextApiHandler<ApiResponse> = async (req, res) => {
  try {
    const { tweetID } = req.query;
    const session = await getSession({
      req,
    });

    const user = session!.user!;

    // Start creating
    const deletedTweet = await tweetModel.findOneAndDelete({
      userID: user.id,
      tweetID: String(tweetID),
    });

    return res.status(200).json({
      data: deletedTweet?.toObject() || 'Deleted Successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: 'Error deleting retweet: ' + String(error),
        statusCode: 500,
      },
    });
  }
};

export default verifyAuth(connectDB(deleteRetweetHandler));
