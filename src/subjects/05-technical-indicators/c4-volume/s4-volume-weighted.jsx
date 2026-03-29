import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function VolumeWeighted() {
  return (
    <SectionLayout
      title="Volume-Weighted Indicators"
      description="VWMA, volume oscillator, and volume-price trend analysis for NSE trading."
    >
      <DefinitionBlock term="Volume Weighted Moving Average (VWMA)">
        A moving average that weights each bar's price by its volume. VWMA =
        Sum(Close x Volume, N) / Sum(Volume, N). When VWMA is above SMA, high-volume
        bars had higher prices, indicating bullish conviction.
      </DefinitionBlock>

      <DefinitionBlock term="Volume Oscillator">
        The difference between a short-period and long-period volume moving average,
        expressed as a percentage. It reveals whether volume is expanding or contracting
        relative to its own trend.
      </DefinitionBlock>

      <CodeBlock language="python" title="VWMA and SMA Comparison">
{`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")
period = 20

# VWMA
nifty['VWMA_20'] = (
    (nifty['Close'] * nifty['Volume']).rolling(period).sum() /
    nifty['Volume'].rolling(period).sum()
)
nifty['SMA_20'] = nifty['Close'].rolling(period).mean()

# VWMA above SMA = bullish volume confirmation
nifty['vol_bullish'] = nifty['VWMA_20'] > nifty['SMA_20']

pct_bullish = nifty['vol_bullish'].mean() * 100
print(f"Days with bullish volume confirmation: {pct_bullish:.1f}%")
print(nifty[['Close', 'VWMA_20', 'SMA_20', 'vol_bullish']].tail())`}
      </CodeBlock>

      <CodeBlock language="python" title="Volume Oscillator">
{`# Volume Oscillator = (Short Vol MA - Long Vol MA) / Long Vol MA * 100
nifty['Vol_Short'] = nifty['Volume'].rolling(5).mean()
nifty['Vol_Long'] = nifty['Volume'].rolling(20).mean()
nifty['Vol_Osc'] = (
    (nifty['Vol_Short'] - nifty['Vol_Long']) / nifty['Vol_Long'] * 100
)

# Positive = volume expanding; Negative = volume contracting
# Rising price + positive oscillator = confirmed uptrend
nifty['price_up'] = nifty['Close'] > nifty['Close'].shift(5)
nifty['vol_expanding'] = nifty['Vol_Osc'] > 0
nifty['strong_move'] = nifty['price_up'] & nifty['vol_expanding']

print(f"Strong upward moves (price+vol): {nifty['strong_move'].sum()}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Volume Price Trend (VPT)">
{`# VPT = Previous VPT + Volume * (Close - Prev Close) / Prev Close
pct_chg = nifty['Close'].pct_change()
nifty['VPT'] = (nifty['Volume'] * pct_chg).cumsum()
nifty['VPT_Signal'] = nifty['VPT'].rolling(20).mean()

# VPT above signal = accumulation
# VPT below signal = distribution
nifty['vpt_bullish'] = nifty['VPT'] > nifty['VPT_Signal']

print(nifty[['Close', 'VPT', 'VPT_Signal', 'vpt_bullish']].tail())`}
      </CodeBlock>

      <NoteBlock title="Volume Analysis Tip">
        On NSE, average daily volume for Nifty futures is a key gauge. When
        VWMA diverges above SMA on Bank Nifty, it typically means institutional
        participation is driving prices -- these moves tend to sustain for 3-5
        sessions. Low volume oscillator readings during price breakouts are false
        breakout warnings.
      </NoteBlock>
    </SectionLayout>
  )
}
