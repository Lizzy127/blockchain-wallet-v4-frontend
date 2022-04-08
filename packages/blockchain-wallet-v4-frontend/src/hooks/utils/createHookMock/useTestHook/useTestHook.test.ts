import { renderHook } from '@testing-library/react-hooks'

import { useTestHook } from '.'

describe('useTestHook', () => {
  it('Should throw error', () => {
    const { result } = renderHook(useTestHook)

    expect(result.error?.message).toBe('I should be mocked')
  })
})
