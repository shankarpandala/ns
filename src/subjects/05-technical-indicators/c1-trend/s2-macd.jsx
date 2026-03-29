import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function MACD() {
  return (
    <SectionLayout
      title="MACD: Moving Average Convergence Divergence"
      description="Identifying trend direction, momentum shifts, and divergence patterns on Indian equities."
    >
      <DefinitionBlock term="MACD Line">
        The difference between the 12-period EMA and 26-period EMA. When the MACD
        line is positive, the short-term trend is above the long-term trend.
      </DefinitionBlock>

      <DefinitionBlock term="Signal Line & Histogram">
        The signal line is a 9-period EMA of the MACD line. The histogram plots the
        difference between MACD and signal, visualizing momentum acceleration.
      </DefinitionBlock>

      <CodeBlock language="python" title="MACD Calculation for Bank Nifty">
{`import pandas as pd
import yfinance as yf

bn = yf.download("^NSEBANK", start="2024-01-01", end="2025-12-31")

# MACD components
bn['EMA_12'] = bn['Close'].ewm(span=12, adjust=False).mean()
bn['EMA_26'] = bn['Close'].ewm(span=26, adjust=False).mean()
bn['MACD'] = bn['EMA_12'] - bn['EMA_26']
bn['Signal'] = bn['MACD'].ewm(span=9, adjust=False).mean()
bn['Histogram'] = bn['MACD'] - bn['Signal']

# Bullish crossover: MACD crosses above signal
bn['bull_cross'] = (
    (bn['MACD'] > bn['Signal']) &
    (bn['MACD'].shift(1) <= bn['Signal'].shift(1))
)

# Bearish crossover
bn['bear_cross'] = (
    (bn['MACD'] < bn['Signal']) &
    (bn['MACD'].shift(1) >= bn['Signal'].shift(1))
)`}
      </CodeBlock>

      <CodeBlock language="python" title="Detecting MACD Divergence">
{`import numpy as np

def find_macd_divergence(df, lookback=20):
    """Detect bullish divergence: price lower low, MACD higher low."""
    signals = []
    for i in range(lookback, len(df)):
        window = df.iloc[i-lookback:i+1]
        price_min_idx = window['Close'].idxmin()
        macd_min_idx = window['MACD'].idxmin()

        # Price makes new low but MACD doesn't
        if (price_min_idx == window.index[-1] and
            macd_min_idx != window.index[-1] and
            window['MACD'].iloc[-1] > window['MACD'].min()):
            signals.append(df.index[i])
    return signals

div_dates = find_macd_divergence(bn)
print(f"Bullish divergence signals: {len(div_dates)}")`}
      </CodeBlock>

      <NoteBlock title="Trading Tip">
        MACD histogram shrinking toward zero often precedes a crossover. On Bank
        Nifty weekly charts, MACD divergences near round-number support levels
        (e.g., 44000, 46000) produce high-probability reversal signals.
      </NoteBlock>
    </SectionLayout>
  )
}
