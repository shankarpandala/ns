import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Supertrend() {
  return (
    <SectionLayout
      title="Supertrend & Parabolic SAR"
      description="Trend-following overlay indicators for clear buy/sell signals on NSE stocks."
    >
      <DefinitionBlock term="Supertrend">
        An ATR-based overlay that flips between support (green) and resistance (red).
        Calculated as: Upper Band = HL2 + (multiplier x ATR), Lower Band = HL2 - (multiplier x ATR).
        Default settings are period=10, multiplier=3.
      </DefinitionBlock>

      <CodeBlock language="python" title="Supertrend Indicator on Nifty 50">
{`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def supertrend(df, period=10, multiplier=3):
    hl2 = (df['High'] + df['Low']) / 2
    atr = df['High'].sub(df['Low']).rolling(period).mean()

    upper = hl2 + multiplier * atr
    lower = hl2 - multiplier * atr

    st = pd.Series(index=df.index, dtype=float)
    direction = pd.Series(index=df.index, dtype=int)

    st.iloc[period] = upper.iloc[period]
    direction.iloc[period] = -1

    for i in range(period + 1, len(df)):
        if df['Close'].iloc[i] > st.iloc[i-1]:
            st.iloc[i] = max(lower.iloc[i], st.iloc[i-1]) if direction.iloc[i-1] == 1 else lower.iloc[i]
            direction.iloc[i] = 1
        else:
            st.iloc[i] = min(upper.iloc[i], st.iloc[i-1]) if direction.iloc[i-1] == -1 else upper.iloc[i]
            direction.iloc[i] = -1

    return st, direction

nifty['ST'], nifty['ST_Dir'] = supertrend(nifty)
buy_signals = nifty[(nifty['ST_Dir'] == 1) & (nifty['ST_Dir'].shift(1) == -1)]
print(f"Supertrend buy signals: {len(buy_signals)}")`}
      </CodeBlock>

      <DefinitionBlock term="Parabolic SAR">
        Stop And Reverse indicator that trails price with an acceleration factor (AF).
        Starts at AF=0.02, increments by 0.02 at each new extreme, capped at 0.20.
      </DefinitionBlock>

      <CodeBlock language="python" title="Parabolic SAR Calculation">
{`def parabolic_sar(df, af_start=0.02, af_step=0.02, af_max=0.20):
    sar = df['Close'].copy()
    af = af_start
    bull = True
    ep = df['High'].iloc[0]
    sar.iloc[0] = df['Low'].iloc[0]

    for i in range(1, len(df)):
        prev_sar = sar.iloc[i-1]
        sar.iloc[i] = prev_sar + af * (ep - prev_sar)

        if bull:
            if df['Low'].iloc[i] < sar.iloc[i]:
                bull = False
                sar.iloc[i] = ep
                ep = df['Low'].iloc[i]
                af = af_start
            elif df['High'].iloc[i] > ep:
                ep = df['High'].iloc[i]
                af = min(af + af_step, af_max)
        else:
            if df['High'].iloc[i] > sar.iloc[i]:
                bull = True
                sar.iloc[i] = ep
                ep = df['High'].iloc[i]
                af = af_start
            elif df['Low'].iloc[i] < ep:
                ep = df['Low'].iloc[i]
                af = min(af + af_step, af_max)
    return sar

nifty['PSAR'] = parabolic_sar(nifty)`}
      </CodeBlock>

      <NoteBlock title="Nifty Trading Tip">
        Supertrend (10,3) on the 15-minute chart is popular among Indian intraday
        traders. Combine with VWAP for confirmation -- enter long only when price is
        above both Supertrend and VWAP.
      </NoteBlock>
    </SectionLayout>
  )
}
