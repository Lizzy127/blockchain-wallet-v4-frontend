import { createHookMock } from '../createHookMock'
import { TestHook } from './types'

export const useTestHookMock = createHookMock<TestHook>({
  error: () => {
    throw Error('Other error')
  },
  success: () => 1
})
