import { useSelector } from 'react-redux'

import { RemoteDataType } from '@core/types'

import { RemoteHookBaseState, RemoteHookSelector, RemoteHookState } from './types'
import { extendsBaseStateToState } from './utils'

export const useRemote = <ERROR extends unknown = unknown, RESULT extends unknown = unknown>(
  selector: RemoteHookSelector<ERROR, RESULT>
): RemoteHookState<ERROR, RESULT> => {
  const data = useSelector(selector)

  const remoteDataState = data['@@tag']

  const mapRemoteDataStateToRemoteHookBaseState: Record<
    'NotAsked' | 'Failure' | 'Loading' | 'Success',
    (data: RemoteDataType<ERROR, RESULT>) => RemoteHookBaseState<ERROR, RESULT>
  > = {
    Failure: (data) => ({
      error: data['@@values'][0] as ERROR
    }),
    Loading: () => ({
      isLoading: true
    }),
    NotAsked: () => ({
      isNotAsked: true
    }),
    Success: ({ data }) => ({
      data
    })
  }

  const stateBuilder = mapRemoteDataStateToRemoteHookBaseState[remoteDataState]

  const state = stateBuilder(data)

  return extendsBaseStateToState(state)
}
