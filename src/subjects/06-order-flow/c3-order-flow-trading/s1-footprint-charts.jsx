import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function FootprintCharts() {
  return (
    <SectionLayout
      title="Footprint Charts"
      description="Visualizing delta per price level to read aggressive buying vs selling."
    >
      <DefinitionBlock term="Footprint Chart">
        A candle-based chart showing bid volume and ask volume at each price
        level within the bar. The delta (ask vol - bid vol) at each level
        reveals where aggressive buyers or sellers dominated.
      </DefinitionBlock>

      <CodeBlock language="python" title="Building Footprint Data">
{`import pandas as pd
import numpy as np

def classify_trades(trades):
    """Classify trades as buy or sell using tick rule."""
    trades = trades.sort_values('time').copy()
    trades['direction'] = np.where(
        trades['price'] > trades['price'].shift(1), 'buy',
        np.where(trades['price'] < trades['price'].shift(1), 'sell', 'unknown')
    )
    return trades

def build_footprint(trades, bar_duration='5min'):
    """Build footprint data: bid/ask volume at each price per bar."""
    trades['bar'] = trades['time'].dt.floor(bar_duration)
    grouped = trades.groupby(['bar', 'price', 'direction'])['qty'].sum()
    grouped = grouped.unstack(fill_value=0).reset_index()

    if 'buy' not in grouped.columns:
        grouped['buy'] = 0
    if 'sell' not in grouped.columns:
        grouped['sell'] = 0

    grouped['delta'] = grouped['buy'] - grouped['sell']
    return grouped[['bar', 'price', 'buy', 'sell', 'delta']]

# Example usage
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=500, freq='2s'),
    'price': np.random.choice(
        np.arange(22448, 22453, 0.5), 500),
    'qty': np.random.randint(10, 200, 500)
})
fp = build_footprint(classify_trades(trades))
print(fp.head(10))`}
      </CodeBlock>

      <NoteBlock title="Reading Footprint Patterns">
        A bar with positive delta at the high and negative delta at the low
        is a strong bullish bar (buyers aggressive at top, sellers absorbed
        at bottom). The reverse pattern signals bearish conviction.
      </NoteBlock>

      <CodeBlock language="python" title="Delta Divergence Signal">
{`def delta_divergence(footprint_bars):
    """Detect price making new high but delta declining."""
    bars = footprint_bars.groupby('bar').agg(
        high=('price', 'max'),
        bar_delta=('delta', 'sum')
    ).reset_index()

    bars['price_hh'] = bars['high'] > bars['high'].shift(1)
    bars['delta_lh'] = bars['bar_delta'] < bars['bar_delta'].shift(1)
    bars['bearish_div'] = bars['price_hh'] & bars['delta_lh']
    return bars[bars['bearish_div']]`}
      </CodeBlock>
    </SectionLayout>
  )
}
