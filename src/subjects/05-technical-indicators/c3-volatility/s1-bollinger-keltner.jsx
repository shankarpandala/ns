import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function BollingerKeltner() {
  return (
    <SectionLayout
      title="Bollinger Bands, Keltner Channels & Squeeze"
      description="Volatility envelope indicators and the squeeze setup for breakout trading on NSE."
    >
      <DefinitionBlock term="Bollinger Bands">
        A 20-period SMA with upper and lower bands at 2 standard deviations.
        Bands expand with volatility and contract during consolidation. Price touching
        the upper band is not inherently bearish -- it can indicate strength.
      </DefinitionBlock>

      <DefinitionBlock term="Keltner Channels">
        A 20-period EMA with bands at 1.5x ATR(10) above and below. Keltner Channels
        are smoother than Bollinger Bands because ATR is less reactive than
        standard deviation.
      </DefinitionBlock>

      <CodeBlock language="python" title="Bollinger Bands & Keltner on Nifty">
{`import pandas as pd
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

# Bollinger Bands (20, 2)
nifty['BB_Mid'] = nifty['Close'].rolling(20).mean()
bb_std = nifty['Close'].rolling(20).std()
nifty['BB_Upper'] = nifty['BB_Mid'] + 2 * bb_std
nifty['BB_Lower'] = nifty['BB_Mid'] - 2 * bb_std
nifty['BB_Width'] = (nifty['BB_Upper'] - nifty['BB_Lower']) / nifty['BB_Mid']

# Keltner Channels (20 EMA, 1.5x ATR)
nifty['KC_Mid'] = nifty['Close'].ewm(span=20, adjust=False).mean()
tr = pd.concat([
    nifty['High'] - nifty['Low'],
    abs(nifty['High'] - nifty['Close'].shift(1)),
    abs(nifty['Low'] - nifty['Close'].shift(1))
], axis=1).max(axis=1)
atr = tr.rolling(10).mean()
nifty['KC_Upper'] = nifty['KC_Mid'] + 1.5 * atr
nifty['KC_Lower'] = nifty['KC_Mid'] - 1.5 * atr`}
      </CodeBlock>

      <CodeBlock language="python" title="Bollinger-Keltner Squeeze Detection">
{`# Squeeze: BB inside KC (low volatility compression)
nifty['squeeze_on'] = (
    (nifty['BB_Lower'] > nifty['KC_Lower']) &
    (nifty['BB_Upper'] < nifty['KC_Upper'])
)

# Squeeze fires when Bollinger exits Keltner
nifty['squeeze_fire'] = (
    (nifty['squeeze_on'].shift(1) == True) &
    (nifty['squeeze_on'] == False)
)

# Momentum direction at squeeze fire (using 12-period ROC)
nifty['squeeze_mom'] = nifty['Close'] - nifty['Close'].shift(12)

squeeze_days = nifty[nifty['squeeze_fire']]
print(f"Squeeze breakouts: {len(squeeze_days)}")
print(squeeze_days[['Close', 'squeeze_mom']].tail(10))`}
      </CodeBlock>

      <NoteBlock title="Squeeze Strategy for Nifty">
        The TTM Squeeze (Bollinger inside Keltner) on daily Nifty charts typically
        resolves with 200-400 point moves. When the squeeze fires and momentum is
        positive, go long. Pair this with ADX rising above 20 for confirmation.
      </NoteBlock>
    </SectionLayout>
  )
}
