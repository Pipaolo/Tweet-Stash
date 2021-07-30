import create, { GetState, SetState, StoreApi } from 'zustand';
import createTwitterSlice, { ITwitterSlice } from './createTwitterSlice';
import { devtools } from 'zustand/middleware';
import createDrawerSlice, { IDrawerSlice } from './createDrawerSlice';

interface IStore extends ITwitterSlice, IDrawerSlice {}

export const useStore = create<IStore>(
  devtools((set, get, api) => ({
    ...createTwitterSlice(
      set as unknown as SetState<ITwitterSlice>,
      get as GetState<ITwitterSlice>,
      api as unknown as StoreApi<ITwitterSlice>
    ),
    ...createDrawerSlice(
      set as unknown as SetState<IDrawerSlice>,
      get as GetState<IDrawerSlice>,
      api as unknown as StoreApi<IDrawerSlice>
    ),
  }))
);
