import { RemoteHookBaseState, RemoteHookState } from '../../types'

export const extendsBaseStateToState = <ERROR, RESULT>({
  data,
  error,
  isLoading = false,
  isNotAsked = false
}: RemoteHookBaseState<ERROR, RESULT>): RemoteHookState<ERROR, RESULT> => ({
  data,
  error,
  hasData: !!data,
  hasError: !!error,
  isLoading,
  isNotAsked
})
