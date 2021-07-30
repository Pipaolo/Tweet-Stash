import { StateCreator } from 'zustand';
import { BaseSlice } from '../types/baseSlice';

export interface IAuthSlice extends BaseSlice {
  accessToken: string | undefined | null;
  accessTokenSecret: string | undefined | null;
  setCredentials: (accessToken: string, accessTokenSecret: string) => void;
}

const createAuthSlice: StateCreator<IAuthSlice> = (set, get) => ({
  accessToken: null,
  accessTokenSecret: null,
  isSuccess: false,
  isLoading: false,
  setCredentials: (accessToken, accessTokenSecret) => {},
});
export default createAuthSlice;
