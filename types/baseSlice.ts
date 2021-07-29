import { ApiError } from './api_error'

export interface BaseSlice {
  isLoading: boolean | undefined
  isSuccess: boolean | undefined
  error?: ApiError | undefined | null
}
