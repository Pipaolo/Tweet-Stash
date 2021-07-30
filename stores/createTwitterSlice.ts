import { StateCreator } from 'zustand';
import { BaseSlice } from '../types/baseSlice';
import { Status } from 'twitter-d';
import Fuse from 'fuse.js';

export interface ITwitterSlice extends BaseSlice {
  retweets?: Status[];
  searchedRetweets?: Status[];
  fuseRetweets?: Fuse<Status>;
  hasSearched: boolean;
  initializeRetweets: (tweets: Status[]) => void;
  searchRetweets: (searchTerm: string) => void;
}

const handleLoading = (state: ITwitterSlice): ITwitterSlice => ({
  ...state,
  isLoading: true,
  isSuccess: false,
  error: null,
});

const createTwitterSlice: StateCreator<ITwitterSlice> = (set, get) => ({
  isLoading: false,
  isSuccess: false,
  hasSearched: false,
  retweets: [],
  searchedRetweets: undefined,
  initializeRetweets: (tweets) => {
    // Initialize Fuse for Searching fetched retweets
    const fuseRetweets = new Fuse(tweets, {
      keys: ['text'],
      isCaseSensitive: false,
      useExtendedSearch: true,
      distance: 100,
    });

    set({
      retweets: tweets,
      fuseRetweets: fuseRetweets,
    });
  },
  searchRetweets: (searchTerm) => {
    if (!searchTerm) {
      // Handle Empty Search Term
      set({
        searchedRetweets: undefined,
        hasSearched: false,
      });
    } else {
      set(handleLoading);
      const results = get().fuseRetweets?.search(searchTerm) || [];
      const parsedResults = results.map((result) => result.item);

      set({
        isLoading: false,
        searchedRetweets: parsedResults,
        hasSearched: true,
      });
    }
  },
});
export default createTwitterSlice;
