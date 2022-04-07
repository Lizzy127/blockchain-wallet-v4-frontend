import { RemoteDataType } from '@core/types'
import { RootState } from 'data/rootReducer'

export type RemoteHookBaseState<ERROR, RESULT> = {
  data?: RESULT
  error?: ERROR
  isLoading?: boolean
  isNotAsked?: boolean
}

export type RemoteHookState<ERROR, RESULT> = {
  data?: RESULT
  error?: ERROR
  hasData: boolean
  hasError: boolean
  isLoading: boolean
  isNotAsked: boolean
}

export type RemoteHookSelector<ERROR, RESULT> = (state: RootState) => RemoteDataType<ERROR, RESULT>
