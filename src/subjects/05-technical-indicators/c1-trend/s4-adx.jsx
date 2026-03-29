import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function ADX() {
  return (
    <SectionLayout
      title="ADX: Average Directional Index"
      description="Measuring trend strength with ADX, +DI, and -DI on Indian equities."
    >
      <DefinitionBlock term="ADX (Average Directional Index)">
        A non-directional indicator measuring trend strength from 0 to 100.
        ADX above 25 indicates a trending market; below 20 suggests a range-bound market.
        It does not tell you direction -- only how strong the trend is.
      </DefinitionBlock>

      <DefinitionBlock term="+DI and -DI">
        Positive Directional Indicator (+DI) measures upward movement strength.
        Negative Directional Indicator (-DI) measures downward movement strength.
        When +DI is above -DI, bulls dominate; when -DI is above +DI, bears dominate.
      </DefinitionBlock>

      <CodeBlock language="python" title="ADX Calculation for Nifty 50">
{`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")
period = 14

# True Range
high_low = nifty['High'] - nifty['Low']
high_close = abs(nifty['High'] - nifty['Close'].shift(1))
low_close = abs(nifty['Low'] - nifty['Close'].shift(1))
tr = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)

# Directional Movement
plus_dm = np.where(
    (nifty['High'] - nifty['High'].shift(1)) > (nifty['Low'].shift(1) - nifty['Low']),
    np.maximum(nifty['High'] - nifty['High'].shift(1), 0), 0
)
minus_dm = np.where(
    (nifty['Low'].shift(1) - nifty['Low']) > (nifty['High'] - nifty['High'].shift(1)),
    np.maximum(nifty['Low'].shift(1) - nifty['Low'], 0), 0
)

# Smoothed averages
atr = tr.rolling(period).mean()
plus_di = 100 * pd.Series(plus_dm).rolling(period).mean() / atr
minus_di = 100 * pd.Series(minus_dm).rolling(period).mean() / atr

# ADX
dx = 100 * abs(plus_di - minus_di) / (plus_di + minus_di)
nifty['ADX'] = dx.rolling(period).mean()
nifty['+DI'] = plus_di
nifty['-DI'] = minus_di`}
      </CodeBlock>

      <ComparisonTable
        title="ADX Trend Strength Interpretation"
        headers={['ADX Value', 'Trend Strength', 'Strategy']}
        rows={[
          ['0-20', 'Weak / No Trend', 'Avoid trend-following, use mean reversion'],
          ['20-25', 'Emerging Trend', 'Watch for breakout confirmation'],
          ['25-50', 'Strong Trend', 'Use trend-following strategies'],
          ['50-75', 'Very Strong', 'Trail stops, ride the trend'],
          ['75-100', 'Extremely Strong', 'Rare; watch for exhaustion'],
        ]}
      />

      <CodeBlock language="python" title="ADX-Based Trade Filter">
{`# Only take trend trades when ADX > 25
trending = nifty[nifty['ADX'] > 25].copy()
trending['signal'] = np.where(trending['+DI'] > trending['-DI'], 'LONG', 'SHORT')

print(f"Trending days: {len(trending)} / {len(nifty)}")
print(trending[['Close', 'ADX', '+DI', '-DI', 'signal']].tail())`}
      </CodeBlock>

      <NoteBlock title="Practical Tip">
        ADX rising above 25 while +DI crosses above -DI is a classic buy setup on
        Nifty. Combine with a 20-EMA filter: only go long if price is above EMA(20)
        and ADX confirms trend strength.
      </NoteBlock>
    </SectionLayout>
  )
}
