import create, { GetState, SetState, StoreApi } from 'zustand';
import createAuthSlice, { IAuthSlice } from './createAuthSlice';
import createTwitterSlice, { ITwitterSlice } from './createTwitterSlice';
import { devtools } from 'zustand/middleware';

interface IStore extends IAuthSlice, ITwitterSlice {}

export const useStore = create<IStore>(
  devtools((set, get, api) => ({
    ...createAuthSlice(
      set as unknown as SetState<IAuthSlice>,
      get as GetState<IAuthSlice>,
      api as unknown as StoreApi<IAuthSlice>
    ),
    ...createTwitterSlice(
      set as unknown as SetState<ITwitterSlice>,
      get as GetState<ITwitterSlice>,
      api as unknown as StoreApi<ITwitterSlice>
    ),
  }))
);
