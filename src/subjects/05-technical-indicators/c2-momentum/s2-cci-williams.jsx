import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function CCIWilliams() {
  return (
    <SectionLayout
      title="CCI, Williams %R & MFI"
      description="Momentum oscillators for detecting cyclical turns and money flow in NSE stocks."
    >
      <DefinitionBlock term="Commodity Channel Index (CCI)">
        Measures price deviation from its statistical mean. CCI = (Typical Price - SMA)
        / (0.015 x Mean Deviation). Readings above +100 indicate overbought; below -100
        indicate oversold.
      </DefinitionBlock>

      <CodeBlock language="python" title="CCI and Williams %R on Bank Nifty">
{`import pandas as pd
import numpy as np
import yfinance as yf

bn = yf.download("^NSEBANK", start="2024-01-01", end="2025-12-31")

# CCI Calculation
period = 20
tp = (bn['High'] + bn['Low'] + bn['Close']) / 3
sma_tp = tp.rolling(period).mean()
mean_dev = tp.rolling(period).apply(lambda x: np.abs(x - x.mean()).mean())
bn['CCI'] = (tp - sma_tp) / (0.015 * mean_dev)

# Williams %R (14-period)
wr_period = 14
highest_high = bn['High'].rolling(wr_period).max()
lowest_low = bn['Low'].rolling(wr_period).min()
bn['Williams_R'] = -100 * (highest_high - bn['Close']) / (highest_high - lowest_low)

print(bn[['Close', 'CCI', 'Williams_R']].tail())`}
      </CodeBlock>

      <DefinitionBlock term="Williams %R">
        Oscillates from -100 to 0. Readings above -20 are overbought; below -80 are
        oversold. It is the inverse of the Fast Stochastic Oscillator.
      </DefinitionBlock>

      <CodeBlock language="python" title="Money Flow Index (MFI)">
{`# MFI - volume-weighted RSI
mfi_period = 14
tp = (bn['High'] + bn['Low'] + bn['Close']) / 3
raw_mf = tp * bn['Volume']

pos_mf = raw_mf.where(tp > tp.shift(1), 0)
neg_mf = raw_mf.where(tp < tp.shift(1), 0)

pos_sum = pos_mf.rolling(mfi_period).sum()
neg_sum = neg_mf.rolling(mfi_period).sum()
mfi = 100 - (100 / (1 + pos_sum / neg_sum))
bn['MFI'] = mfi

# MFI divergence: price up but MFI declining
bn['mfi_bear_div'] = (
    (bn['Close'] > bn['Close'].shift(5)) &
    (bn['MFI'] < bn['MFI'].shift(5)) &
    (bn['MFI'] > 80)
)`}
      </CodeBlock>

      <NoteBlock title="Practical Usage">
        CCI works well on Bank Nifty for identifying mean-reversion entries. When CCI
        drops below -200 and turns up, it signals extreme oversold bounce potential.
        MFI above 80 with declining volume often precedes short-term pullbacks in
        liquid Nifty 50 constituents.
      </NoteBlock>
    </SectionLayout>
  )
}
