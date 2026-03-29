import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function RSI() {
  return (
    <SectionLayout
      title="RSI & Stochastic RSI"
      description="Relative Strength Index for identifying overbought/oversold conditions on NSE stocks."
    >
      <DefinitionBlock term="RSI (Relative Strength Index)">
        A momentum oscillator ranging 0-100 that compares the magnitude of recent
        gains to recent losses. RSI above 70 signals overbought; below 30 signals
        oversold. Default period is 14.
      </DefinitionBlock>

      <CodeBlock language="python" title="RSI Calculation on Nifty 50">
{`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def calc_rsi(series, period=14):
    delta = series.diff()
    gain = delta.where(delta > 0, 0.0)
    loss = -delta.where(delta < 0, 0.0)

    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()

    # Wilder's smoothing after initial SMA
    for i in range(period, len(series)):
        avg_gain.iloc[i] = (avg_gain.iloc[i-1] * (period-1) + gain.iloc[i]) / period
        avg_loss.iloc[i] = (avg_loss.iloc[i-1] * (period-1) + loss.iloc[i]) / period

    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))

nifty['RSI'] = calc_rsi(nifty['Close'])

# Overbought/Oversold signals
nifty['OB'] = nifty['RSI'] > 70
nifty['OS'] = nifty['RSI'] < 30
print(f"Overbought days: {nifty['OB'].sum()}")
print(f"Oversold days: {nifty['OS'].sum()}")`}
      </CodeBlock>

      <DefinitionBlock term="Stochastic RSI">
        Applies the Stochastic formula to RSI values instead of price. It oscillates
        between 0 and 1, providing more sensitive signals than plain RSI. StochRSI =
        (RSI - RSI_Low) / (RSI_High - RSI_Low) over the lookback period.
      </DefinitionBlock>

      <CodeBlock language="python" title="Stochastic RSI">
{`def stochastic_rsi(rsi, period=14, k_smooth=3, d_smooth=3):
    rsi_min = rsi.rolling(window=period).min()
    rsi_max = rsi.rolling(window=period).max()
    stoch_rsi = (rsi - rsi_min) / (rsi_max - rsi_min)

    k = stoch_rsi.rolling(window=k_smooth).mean()  # %K line
    d = k.rolling(window=d_smooth).mean()           # %D line
    return k, d

nifty['StochRSI_K'], nifty['StochRSI_D'] = stochastic_rsi(nifty['RSI'])

# Buy when %K crosses above %D in oversold zone
nifty['stoch_buy'] = (
    (nifty['StochRSI_K'] > nifty['StochRSI_D']) &
    (nifty['StochRSI_K'].shift(1) <= nifty['StochRSI_D'].shift(1)) &
    (nifty['StochRSI_K'] < 0.2)
)`}
      </CodeBlock>

      <NoteBlock title="Indian Market Context">
        RSI(14) below 30 on Nifty weekly charts has historically been a strong
        buy signal -- it has only occurred during major corrections (2020 COVID crash,
        2022 rate hike selloff). Use StochRSI for intraday timeframes where
        standard RSI stays flat in the 40-60 zone.
      </NoteBlock>
    </SectionLayout>
  )
}
