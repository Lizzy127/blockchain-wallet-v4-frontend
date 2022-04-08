import { createRemoteSuccessState } from '../useRemote'
import { createHookMock } from '../utils'
import { CoinRatesHook } from '.'

export const useCoinRatesMock = createHookMock<CoinRatesHook>({
  BTC: () =>
    createRemoteSuccessState({
      price: 6589.79,
      timestamp: 1630420260,
      volume24h: 112528.43
    }),
  ETH: () =>
    createRemoteSuccessState({ price: 385.01, timestamp: 1630420260, volume24h: 112528.44 })
})
