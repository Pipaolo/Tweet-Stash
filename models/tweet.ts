import mongoose, { Document, model, Model, Schema } from 'mongoose';

export interface Tweet {
  tweetID?: string;
  userID?: string;
  // This will be used for rendering the stored images
  mediaURL?: string;
  hasMedia?: boolean;
}
export interface TweetDocument extends Tweet, Document {}
export interface TweetModel extends Model<TweetDocument> {}

const TweetSchema = new Schema<TweetDocument, TweetModel>(
  {
    tweetID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    hasMedia: {
      type: Boolean,
      default: false,
    },
    mediaURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Tweet as TweetModel) ||
  model<TweetDocument, TweetModel>('Tweet', TweetSchema);
