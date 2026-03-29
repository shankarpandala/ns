import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OBVProfile() {
  return (
    <SectionLayout
      title="OBV & Volume Profile"
      description="On-Balance Volume and volume profile analysis with POC, VAH, and VAL for NSE stocks."
    >
      <DefinitionBlock term="On-Balance Volume (OBV)">
        A cumulative volume indicator. If close is higher than previous close, the
        day's volume is added; if lower, it is subtracted. OBV rising with price
        confirms the trend; divergence warns of reversal.
      </DefinitionBlock>

      <CodeBlock language="python" title="OBV Calculation and Divergence">
{`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

# OBV
obv = [0]
for i in range(1, len(nifty)):
    if nifty['Close'].iloc[i] > nifty['Close'].iloc[i-1]:
        obv.append(obv[-1] + nifty['Volume'].iloc[i])
    elif nifty['Close'].iloc[i] < nifty['Close'].iloc[i-1]:
        obv.append(obv[-1] - nifty['Volume'].iloc[i])
    else:
        obv.append(obv[-1])
nifty['OBV'] = obv

# OBV with SMA for signal line
nifty['OBV_SMA'] = nifty['OBV'].rolling(20).mean()

# Bearish divergence: price higher high, OBV lower high
nifty['price_hh'] = nifty['Close'] > nifty['Close'].rolling(20).max().shift(1)
nifty['obv_lh'] = nifty['OBV'] < nifty['OBV'].rolling(20).max().shift(1)
nifty['bear_div'] = nifty['price_hh'] & nifty['obv_lh']
print(f"OBV bearish divergence days: {nifty['bear_div'].sum()}")`}
      </CodeBlock>

      <DefinitionBlock term="Volume Profile">
        A histogram showing volume traded at each price level over a period. Key
        levels include POC (Point of Control -- highest volume price), VAH (Value
        Area High), and VAL (Value Area Low) encompassing 70% of volume.
      </DefinitionBlock>

      <CodeBlock language="python" title="Volume Profile with POC/VAH/VAL">
{`def volume_profile(df, bins=50):
    price_min = df['Low'].min()
    price_max = df['High'].max()
    price_bins = np.linspace(price_min, price_max, bins + 1)

    vol_at_price = np.zeros(bins)
    for i in range(len(df)):
        low, high, vol = df['Low'].iloc[i], df['High'].iloc[i], df['Volume'].iloc[i]
        mask = (price_bins[:-1] <= high) & (price_bins[1:] >= low)
        count = mask.sum()
        if count > 0:
            vol_at_price[mask] += vol / count

    mid_prices = (price_bins[:-1] + price_bins[1:]) / 2

    # POC: price with maximum volume
    poc_idx = np.argmax(vol_at_price)
    poc = mid_prices[poc_idx]

    # Value Area: 70% of total volume around POC
    total_vol = vol_at_price.sum()
    target = 0.70 * total_vol
    cum = vol_at_price[poc_idx]
    lo, hi = poc_idx, poc_idx
    while cum < target and (lo > 0 or hi < bins - 1):
        left = vol_at_price[lo - 1] if lo > 0 else 0
        right = vol_at_price[hi + 1] if hi < bins - 1 else 0
        if left >= right and lo > 0:
            lo -= 1; cum += left
        elif hi < bins - 1:
            hi += 1; cum += right
        else:
            lo -= 1; cum += left

    return poc, mid_prices[lo], mid_prices[hi]

poc, val, vah = volume_profile(nifty.tail(60))
print(f"POC: {poc:.0f} | VAL: {val:.0f} | VAH: {vah:.0f}")`}
      </CodeBlock>

      <NoteBlock title="Trading with Volume Profile">
        POC acts as a magnet -- price tends to return to it. VAH and VAL serve as
        support/resistance. On Nifty, if price opens above VAH, expect trending
        behavior. If it opens between VAL and VAH, expect mean reversion to POC.
      </NoteBlock>
    </SectionLayout>
  )
}
