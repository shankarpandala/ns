import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SweepBlock() {
  return (
    <SectionLayout
      title="Sweep Orders & Block Trade Identification"
      description="Detecting aggressive sweep orders and negotiated block trades."
    >
      <DefinitionBlock term="Sweep Order">
        An aggressive order that consumes liquidity across multiple price
        levels simultaneously. Sweeps indicate urgency -- the trader is
        willing to pay higher slippage for immediate execution.
      </DefinitionBlock>

      <DefinitionBlock term="Block Trade">
        A large privately negotiated transaction reported to the exchange.
        On NSE, block deals execute in a separate window at a price within
        +/- 1% of the previous day's close.
      </DefinitionBlock>

      <CodeBlock language="python" title="Detecting Sweep Orders">
{`import pandas as pd
import numpy as np

def detect_sweeps(trades, time_window='500ms', min_levels=3):
    """Detect sweep orders that hit multiple price levels rapidly."""
    trades = trades.sort_values('time').copy()
    trades['time_group'] = (
        trades['time'].diff().dt.total_seconds().fillna(0)
        .gt(0.5).cumsum()
    )

    sweeps = []
    for _, group in trades.groupby('time_group'):
        if len(group) < min_levels:
            continue

        prices = group['price'].unique()
        if len(prices) >= min_levels:
            direction = 'buy_sweep' if group['price'].is_monotonic_increasing \
                        else 'sell_sweep' if group['price'].is_monotonic_decreasing \
                        else 'mixed'
            sweeps.append({
                'time': group['time'].iloc[0],
                'direction': direction,
                'levels_hit': len(prices),
                'total_qty': group['qty'].sum(),
                'price_range': prices.max() - prices.min()
            })

    return pd.DataFrame(sweeps)

# Simulated trades including a sweep
times = pd.date_range('2025-03-15 09:30:00', periods=20, freq='50ms')
sweep_trades = pd.DataFrame({
    'time': times,
    'price': np.concatenate([
        np.arange(22450, 22454, 0.5),     # Buy sweep across 8 levels
        np.full(12, 22454)                  # Normal trades after
    ]),
    'qty': np.random.randint(20, 100, 20)
})

result = detect_sweeps(sweep_trades)
print(result)`}
      </CodeBlock>

      <CodeBlock language="python" title="Block Deal Monitor from NSE">
{`def parse_block_deals(block_data):
    """Analyze NSE block deal data for institutional signals."""
    significant = block_data[block_data['value_cr'] > 50]
    for _, deal in significant.iterrows():
        print(f"{deal['symbol']}: {deal['qty']:,} shares "
              f"@ Rs {deal['price']:.2f} "
              f"({deal['value_cr']:.0f} Cr) "
              f"[{deal['client_type']}]")`}
      </CodeBlock>

      <NoteBlock title="Sweep Signals">
        A buy sweep through 5+ levels on Nifty futures, consuming over 500
        lots in under 1 second, strongly indicates an institutional algo
        entering a directional position. These often precede 20-50 point
        moves within the next few minutes.
      </NoteBlock>
    </SectionLayout>
  )
}
