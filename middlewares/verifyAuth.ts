import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { ApiResponse } from '../types/api_response';

const verifyAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    // Start Checking for log in
    const session = await getSession();

    if (!session) {
      // Handle redirection
      return res.status(401).json({
        error: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      });
    }
    // Continue
    await handler(req, res);
  };
};

export default verifyAuth;
