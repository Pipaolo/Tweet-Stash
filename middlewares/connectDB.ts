import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import tunnel from 'tunnel-ssh';
import fs from 'fs';

const connectDB = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    if (process.env.NODE_ENV !== 'production') {
      const key = fs.readFileSync(`${process.cwd()}/tweet-stash-key.pem`);
      console.log('Connecting to SSH');
      await new Promise((res, rej) => {
        tunnel(
          {
            username: 'ubuntu',
            host: process.env.SSH_HOST,
            port: Number(process.env.SSH_PORT),
            dstHost: 'localhost',
            dstPort: 27017,
            localHost: '127.0.0.1',
            localPort: 7000,
            privateKey: key,
          },
          async (err, client) => {
            if (err) {
              rej(err);
            }
            console.log('Connected to SSH');
            console.log('Connecting to Database');
            await mongoose.connect('mongodb://localhost:27017/?ssl=false', {
              useUnifiedTopology: true,
              useCreateIndex: true,
              useNewUrlParser: true,
            });
            console.log('Connected to Database');

            res(client);
          }
        );
      });
    } else {
      await mongoose.connect('mongodb://localhost:27017/?ssl=false', {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      });
    }

    return handler(req, res);
  };
};
export default connectDB;
