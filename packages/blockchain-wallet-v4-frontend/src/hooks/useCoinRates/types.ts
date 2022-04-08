import { RatesType } from '@core/types'

import { RemoteHookState } from '../useRemote'

export type CoinRatesHookProps = { coin: string }

export type CoinRatesHook = (props: CoinRatesHookProps) => RemoteHookState<string, RatesType>
