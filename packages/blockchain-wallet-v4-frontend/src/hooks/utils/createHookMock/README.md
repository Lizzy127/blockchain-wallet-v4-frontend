# createHookMock

Helper to create reusable hook mocks.

## Usage

The `createHookMock` helper provides an interface to create a collection of mocks that can be used in other tests.
So you can create mocks for common states that the hook can be and use them to create your test scenario.

## Example

In this scenario, we have the `useCoinSeries` hook, that will provide the data and the `LastWeekCoinChart` component that will use the hook.

```ts
// CoinSeries hook
type CoinSeriesHook = (coin: string, startDate: Date, endDate: Date) => number[]

export const useCoinSeries: CoinSeriesHook = (coin, startDate, endDate) => ...
```

```tsx
// LastWeekCoinChart Component
import { useCoinSeries } from "~/hooks"

export const LastWeekCoinChart: FC => ({ coin }) => {
    const data = useCoinSeries(coin, lastWeek, now)

    return <Chart data={data} />
}
```

But I want to test my LastWeekCoinChart component without actually triggering an API call because of `useCoinSeries`.
Now the `createHookMock` helper can be used to mock the `useCoinSeries` with any number of cases.

```ts
// CoinSeriesMock
export const useCoinSeriesMock = createHookMock<CoinSeriesHook>({
    success: () => [1, 2, 3, 4, 5],
    dynamic: (coin, startDate, endDate) => // generate mock for the range
    failure: () => {
        throw Error("Not found")
    }
})
```

With the `useCoinSeriesMock` we can mock our hook to provide the exact result we want in each test scenario

```ts
import { useCoinSeries, CoinSeriesHook } from '~/hooks'

// First we need to replace the useCoinSeries with a jest mock
jest.mock('~/hooks', () => ({
  useCoinSeries: jest.fn()
}))

describe('LastWeekCoinChart Component', () => {
  // Clear all the jest mocks after each test
  afterEach(jest.resetAllMocks)

  it('Should display the chart', () => {
    const useCoinSeriresSpy = useCoinSeriesMock(
      useCoinSeries as HookMock<CoinSeriesHook>,
      'success'
    )

    // ... render the component <LastWeekCoinChart coin="BTC" />

    expect(useCoinSeriresSpy).toHaveBeenCalledWith(['BTC', startDate, endDate])
  })

  it('Should display the error state when the api is down', () => {
    const useCoinSeriresSpy = useCoinSeriesMock(
      useCoinSeries as HookMock<CoinSeriesHook>,
      'failure'
    )

    // ...
  })
})
```

You can also use a custom mock hook handler if you need a specific response

```ts
const useCoinSeriresSpy = useCoinSeriesMock(
  useCoinSeries as HookMock<CoinSeriesHook>,
  (coin, startDate, endDate) => [9, 8, 7, 6]
)
```
