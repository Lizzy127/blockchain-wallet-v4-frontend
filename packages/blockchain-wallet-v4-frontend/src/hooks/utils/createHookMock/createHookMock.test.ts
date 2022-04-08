import { renderHook } from '@testing-library/react-hooks'

import { HookMock } from '.'
import { useTestHook } from './useTestHook'
import { useTestHookMock } from './useTestHook/mock'

jest.mock('./useTestHook', () => ({
  useTestHook: jest.fn()
}))

describe('createHookMock', () => {
  afterEach(jest.resetAllMocks)

  it('Should replace the hook with success mock value', () => {
    const useTestHookSpy = useTestHookMock(useTestHook as HookMock<typeof useTestHook>, 'success')

    const { result } = renderHook(useTestHook)

    expect(result.current).toEqual(1)
    expect(useTestHookSpy).toHaveBeenCalledTimes(1)
  })

  it('Should replace the hook with error mock value', () => {
    const useTestHookSpy = useTestHookMock(useTestHook as HookMock<typeof useTestHook>, 'error')

    const { result } = renderHook(useTestHook)

    expect(result.error?.message).toBe('Other error')
    expect(useTestHookSpy).toHaveBeenCalledTimes(1)
  })

  it('Should use the provided hook', () => {
    const useTestHookSpy = useTestHookMock(useTestHook as HookMock<typeof useTestHook>, () => 5)

    const { result } = renderHook(useTestHook)

    expect(result.current).toEqual(5)
    expect(useTestHookSpy).toHaveBeenCalledTimes(1)
  })
})
