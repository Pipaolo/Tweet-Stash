import { TwitterApi } from 'twitter-api-v2'
import create, { GetState, SetState, StateCreator, StoreApi } from 'zustand'
import { devtools } from 'zustand/middleware'
import { BaseSlice } from '../types/baseSlice'
import { Status } from 'twitter-d'
import { ApiError } from '../types/api_error'

export interface ITwitterSlice extends BaseSlice {
  retweets?: Status[]
  fetchUserRetweets?: (token: string, tokenSecret: string) => void
}

const handleLoading = (state: ITwitterSlice): ITwitterSlice => ({
  ...state,
  isLoading: true,
  isSuccess: false,
  error: null,
})
const handleError = (state: ITwitterSlice, error: ApiError): ITwitterSlice => ({
  ...state,
  isLoading: false,
  isSuccess: false,
  error: error,
})

const createTwitterSlice: StateCreator<ITwitterSlice> = (set, get) => ({
  isLoading: false,
  isSuccess: false,
  retweets: [],
  fetchUserRetweets: async (accessToken, accessTokenSecret) => {
    try {
      set(handleLoading)
      const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY || '',
        appSecret: process.env.TWITTER_API_SECRET || '',
        accessToken: accessToken,
        accessSecret: accessTokenSecret,
      })
      const statuses = client.v1.get('/statuses/home_timeline.json', {
        count: 5,
      })
    } catch (error) {
      set(
        handleError(get(), {
          statusCode: 500,
          message: 'Error Fetching Retweets: ' + error.message,
        })
      )
    }
  },
})
export default createTwitterSlice
