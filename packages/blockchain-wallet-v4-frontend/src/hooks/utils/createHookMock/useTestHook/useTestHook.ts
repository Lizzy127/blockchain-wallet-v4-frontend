import { TestHook } from './types'

export const useTestHook: TestHook = () => {
  throw Error('I should be mocked')
}
