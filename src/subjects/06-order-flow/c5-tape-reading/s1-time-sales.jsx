import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function TimeSales() {
  return (
    <SectionLayout
      title="Time & Sales Analysis"
      description="Reading the tape to classify trades and identify buying/selling pressure."
    >
      <DefinitionBlock term="Time & Sales (Tape)">
        A chronological record of every executed trade showing timestamp,
        price, quantity, and sometimes trade direction. The tape reveals
        real-time aggression that the order book alone cannot show.
      </DefinitionBlock>

      <CodeBlock language="python" title="Trade Classification Methods">
{`import pandas as pd
import numpy as np

def classify_tick_rule(trades):
    """Tick rule: uptick = buy, downtick = sell."""
    trades = trades.copy()
    trades['tick'] = trades['price'].diff()
    trades['side'] = np.where(trades['tick'] > 0, 'buy',
                     np.where(trades['tick'] < 0, 'sell', 'unknown'))
    # For zero-tick, use previous classification
    trades['side'] = trades['side'].replace('unknown', np.nan).ffill()
    return trades

def classify_quote_rule(trades):
    """Quote rule: above mid = buy, below mid = sell."""
    trades = trades.copy()
    trades['mid'] = (trades['bid'] + trades['ask']) / 2
    trades['side'] = np.where(trades['price'] > trades['mid'], 'buy',
                     np.where(trades['price'] < trades['mid'], 'sell',
                              'unknown'))
    return trades

def classify_lee_ready(trades):
    """Lee-Ready: quote rule first, tick rule for mid trades."""
    trades = classify_quote_rule(trades)
    mid_trades = trades['side'] == 'unknown'
    tick_classified = classify_tick_rule(trades)
    trades.loc[mid_trades, 'side'] = tick_classified.loc[mid_trades, 'side']
    return trades

# Example
np.random.seed(42)
n = 500
mid = 22450 + np.cumsum(np.random.normal(0, 0.1, n))
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=n, freq='500ms'),
    'price': (mid + np.random.choice([-0.25, 0.25], n)).round(2),
    'bid': (mid - 0.25).round(2),
    'ask': (mid + 0.25).round(2),
    'qty': np.random.randint(1, 50, n)
})
result = classify_lee_ready(trades)
buy_pct = (result['side'] == 'buy').mean()
print(f"Buy trades: {buy_pct:.1%}")`}
      </CodeBlock>

      <NoteBlock title="Tape Reading at NSE">
        NSE tick data arrives at sub-millisecond resolution via TBT feeds.
        Retail traders can access trade-level data through broker APIs with
        ~100ms latency. Focus on trade size distribution -- a cluster of
        large trades at the ask signals institutional buying.
      </NoteBlock>
    </SectionLayout>
  )
}
