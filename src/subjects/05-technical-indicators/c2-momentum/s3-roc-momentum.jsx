import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ROCMomentum() {
  return (
    <SectionLayout
      title="Rate of Change & Momentum Oscillator"
      description="Simple yet effective momentum tools for gauging price velocity on Indian stocks."
    >
      <DefinitionBlock term="Rate of Change (ROC)">
        Percentage change in price over N periods: ROC = ((Close - Close_N) / Close_N)
        x 100. Positive ROC means price is higher than N periods ago; zero-line
        crossovers signal momentum shifts.
      </DefinitionBlock>

      <DefinitionBlock term="Momentum Oscillator">
        The absolute difference between current price and price N periods ago:
        Momentum = Close - Close_N. Unlike ROC, it is not normalized, so it reflects
        the raw point change.
      </DefinitionBlock>

      <CodeBlock language="python" title="ROC and Momentum on Nifty Stocks">
{`import pandas as pd
import yfinance as yf

# Fetch Reliance Industries (NSE)
ril = yf.download("RELIANCE.NS", start="2024-01-01", end="2025-12-31")

# Rate of Change (12-period)
period = 12
ril['ROC_12'] = ((ril['Close'] - ril['Close'].shift(period))
                 / ril['Close'].shift(period)) * 100

# Momentum Oscillator (10-period)
ril['MOM_10'] = ril['Close'] - ril['Close'].shift(10)

# Signal: ROC crosses above zero (bullish)
ril['roc_bull'] = (ril['ROC_12'] > 0) & (ril['ROC_12'].shift(1) <= 0)

# Signal: ROC crosses below zero (bearish)
ril['roc_bear'] = (ril['ROC_12'] < 0) & (ril['ROC_12'].shift(1) >= 0)

print(f"Bullish ROC crossovers: {ril['roc_bull'].sum()}")
print(f"Bearish ROC crossovers: {ril['roc_bear'].sum()}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Multi-Timeframe Momentum Screening">
{`import yfinance as yf
import pandas as pd

tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"]
results = []

for t in tickers:
    df = yf.download(t, period="6mo", progress=False)
    if len(df) < 60:
        continue
    roc_5 = ((df['Close'].iloc[-1] - df['Close'].iloc[-6]) / df['Close'].iloc[-6]) * 100
    roc_20 = ((df['Close'].iloc[-1] - df['Close'].iloc[-21]) / df['Close'].iloc[-21]) * 100
    roc_60 = ((df['Close'].iloc[-1] - df['Close'].iloc[-61]) / df['Close'].iloc[-61]) * 100
    results.append({'Ticker': t, 'ROC_5d': round(roc_5, 2),
                    'ROC_20d': round(roc_20, 2), 'ROC_60d': round(roc_60, 2)})

screen = pd.DataFrame(results).sort_values('ROC_20d', ascending=False)
print(screen.to_string(index=False))`}
      </CodeBlock>

      <NoteBlock title="Momentum Ranking Strategy">
        Rank Nifty 50 stocks by 20-day ROC monthly. Buy the top 10 and rebalance.
        This simple momentum strategy has historically outperformed the index in
        Indian markets due to strong trending behavior in mid-cap leaders.
      </NoteBlock>
    </SectionLayout>
  )
}
