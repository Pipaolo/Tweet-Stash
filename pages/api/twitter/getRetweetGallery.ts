import { NextApiHandler } from 'next';
import connectDB from '../../../middlewares/connectDB';
import verifyAuth from '../../../middlewares/verifyAuth';
import { ApiResponse } from '../../../types/api_response';
import tweetModel from '../../../models/tweet';
import { getSession } from 'next-auth/client';

const getRetweetGalleryHandler: NextApiHandler<ApiResponse> = async (
  req,
  res
) => {
  const session = await getSession({
    req,
  });

  try {
    const user = session!.user!;

    const mediaRetweets = await tweetModel
      .find({
        userID: user.id,
        hasMedia: true,
      })
      .lean();

    // Convert the stored retweets into string query for Twitter Lookup

    return res.status(200).json({
      data: mediaRetweets,
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

export default verifyAuth(connectDB(getRetweetGalleryHandler));
