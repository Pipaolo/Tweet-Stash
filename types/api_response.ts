import { ApiError } from './api_error'

export interface ApiResponse {
  data?: any
  error?: ApiError
}
