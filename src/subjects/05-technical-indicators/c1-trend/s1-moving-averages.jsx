import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function MovingAverages() {
  return (
    <SectionLayout
      title="Moving Averages: SMA, EMA, DEMA & TEMA"
      description="The foundation of trend-following analysis applied to Nifty 50 and Indian equities."
    >
      <DefinitionBlock term="Simple Moving Average (SMA)">
        The arithmetic mean of closing prices over N periods. SMA(20) on Nifty 50
        treats each of the last 20 daily closes with equal weight.
      </DefinitionBlock>

      <DefinitionBlock term="Exponential Moving Average (EMA)">
        Applies a smoothing factor 2/(N+1) giving more weight to recent prices.
        EMA reacts faster to price changes than SMA of the same period.
      </DefinitionBlock>

      <CodeBlock language="python" title="Computing Moving Averages on Nifty 50">
{`import pandas as pd
import yfinance as yf

# Fetch Nifty 50 data
nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

# Simple Moving Average
nifty['SMA_20'] = nifty['Close'].rolling(window=20).mean()
nifty['SMA_50'] = nifty['Close'].rolling(window=50).mean()

# Exponential Moving Average
nifty['EMA_12'] = nifty['Close'].ewm(span=12, adjust=False).mean()
nifty['EMA_26'] = nifty['Close'].ewm(span=26, adjust=False).mean()

# Double EMA (DEMA) = 2*EMA(N) - EMA(EMA(N))
ema_20 = nifty['Close'].ewm(span=20, adjust=False).mean()
nifty['DEMA_20'] = 2 * ema_20 - ema_20.ewm(span=20, adjust=False).mean()

# Triple EMA (TEMA) = 3*EMA - 3*EMA(EMA) + EMA(EMA(EMA))
ema1 = nifty['Close'].ewm(span=20, adjust=False).mean()
ema2 = ema1.ewm(span=20, adjust=False).mean()
ema3 = ema2.ewm(span=20, adjust=False).mean()
nifty['TEMA_20'] = 3 * ema1 - 3 * ema2 + ema3`}
      </CodeBlock>

      <ComparisonTable
        title="MA Type Comparison"
        headers={['Type', 'Lag', 'Responsiveness', 'Best Use']}
        rows={[
          ['SMA', 'Highest', 'Slowest', 'Support/resistance zones'],
          ['EMA', 'Moderate', 'Moderate', 'Trend direction signals'],
          ['DEMA', 'Low', 'Fast', 'Short-term swing trades'],
          ['TEMA', 'Lowest', 'Fastest', 'Scalping, quick entries'],
        ]}
      />

      <CodeBlock language="python" title="Golden Cross / Death Cross Signal">
{`# Golden Cross: SMA_50 crosses above SMA_200
nifty['SMA_200'] = nifty['Close'].rolling(window=200).mean()
nifty['golden_cross'] = (
    (nifty['SMA_50'] > nifty['SMA_200']) &
    (nifty['SMA_50'].shift(1) <= nifty['SMA_200'].shift(1))
)
print("Golden Cross dates:")
print(nifty[nifty['golden_cross']].index.tolist())`}
      </CodeBlock>

      <NoteBlock title="Indian Market Tip">
        On Nifty 50, the 20/50 EMA crossover on daily charts is widely tracked by
        institutional traders. The 200-day SMA acts as a key psychological
        support level -- watch for volume spikes when Nifty tests it.
      </NoteBlock>
    </SectionLayout>
  )
}
