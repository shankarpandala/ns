import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SpreadAnalysis() {
  return (
    <SectionLayout
      title="Bid-Ask Spread Analysis"
      description="Measuring spread types to gauge liquidity and trading costs on NSE."
    >
      <DefinitionBlock term="Quoted Spread">
        The difference between the best ask and best bid price. On liquid Nifty
        futures this is typically 0.05-0.15 points during market hours.
      </DefinitionBlock>

      <DefinitionBlock term="Effective Spread">
        Twice the absolute difference between the trade price and the midpoint.
        Measures actual execution cost including price improvement.
      </DefinitionBlock>

      <DefinitionBlock term="Realized Spread">
        Effective spread minus the price impact component, measured over a
        short horizon (e.g., 5 minutes). Approximates market maker revenue.
      </DefinitionBlock>

      <CodeBlock language="python" title="Computing Spread Metrics">
{`import pandas as pd
import numpy as np

# Simulated tick data for Nifty Futures
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=1000, freq='1s'),
    'price': np.random.normal(22450, 2, 1000).round(2),
    'bid': np.random.normal(22449.5, 1.5, 1000).round(2),
    'ask': np.random.normal(22450.5, 1.5, 1000).round(2),
})

# Quoted spread
trades['quoted_spread'] = trades['ask'] - trades['bid']
trades['mid'] = (trades['bid'] + trades['ask']) / 2

# Effective spread
trades['effective_spread'] = 2 * abs(trades['price'] - trades['mid'])

# Realized spread (5-second forward midpoint)
trades['mid_fwd'] = trades['mid'].shift(-5)
trades['realized_spread'] = 2 * (trades['price'] - trades['mid_fwd'])

print(f"Avg quoted spread:    {trades['quoted_spread'].mean():.4f}")
print(f"Avg effective spread: {trades['effective_spread'].mean():.4f}")
print(f"Avg realized spread:  {trades['realized_spread'].mean():.4f}")`}
      </CodeBlock>

      <NoteBlock title="Spread Widening Signals">
        Spreads on BankNifty futures widen significantly during RBI policy
        announcements and US Fed decisions. A sudden spread widening without
        news often indicates informed order flow entering the market.
      </NoteBlock>

      <CodeBlock language="python" title="Intraday Spread Pattern">
{`# Spread tends to follow U-shape through the day
spread_by_minute = trades.set_index('time').resample('1min')
avg_spread = spread_by_minute['quoted_spread'].mean()

# Typically widest at 9:15-9:30 and 3:15-3:30
# Tightest between 11:00-14:00 on Nifty futures
print(avg_spread.describe())`}
      </CodeBlock>
    </SectionLayout>
  )
}
