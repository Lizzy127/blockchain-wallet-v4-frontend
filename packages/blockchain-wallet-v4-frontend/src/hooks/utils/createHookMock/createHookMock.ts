import { isHook } from '../isHook'
import { HookMock, MockConfig } from './types'

export const createHookMock =
  <
    HOOK extends (...args: any) => any,
    MOCK_CONFIG extends MockConfig<HOOK> = MockConfig<HOOK>,
    MOCK_KEYS extends keyof MOCK_CONFIG = keyof MOCK_CONFIG,
    JEST_MOCK extends HookMock<HOOK> = HookMock<HOOK>
  >(
    mockConfig: MOCK_CONFIG
  ) =>
  (hook: JEST_MOCK, mock: MOCK_KEYS | HOOK): JEST_MOCK => {
    const effectiveMock = isHook(mock) ? mock : mockConfig[mock]

    hook.mockImplementation(effectiveMock)

    return hook
  }
