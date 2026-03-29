import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Absorption() {
  return (
    <SectionLayout
      title="Absorption & Exhaustion Patterns"
      description="Identifying when large orders absorb aggression or when momentum exhausts."
    >
      <DefinitionBlock term="Absorption">
        When aggressive market orders hit a price level but the price does not
        move. Large resting limit orders are absorbing the selling/buying
        pressure. This often precedes a reversal in the opposite direction.
      </DefinitionBlock>

      <DefinitionBlock term="Exhaustion">
        A climactic burst of volume in the trend direction followed by a
        stall. Indicates the last buyers/sellers have entered and no more
        fuel remains to push price further.
      </DefinitionBlock>

      <CodeBlock language="python" title="Detecting Absorption">
{`import pandas as pd
import numpy as np

def detect_absorption(trades, price_levels, window='30s'):
    """Detect absorption: high volume at a level without price break."""
    trades = trades.set_index('time').sort_index()

    for level in price_levels:
        level_trades = trades[abs(trades['price'] - level) < 0.5]
        if level_trades.empty:
            continue

        vol_at_level = level_trades['qty'].sum()
        price_moved = abs(
            trades['price'].iloc[-1] - level
        )

        # High volume but price stayed at level
        if vol_at_level > 2000 and price_moved < 1.0:
            print(f"ABSORPTION @ {level}: {vol_at_level} lots absorbed")
            print(f"  Price stayed within {price_moved:.2f} pts")

# Usage with Nifty futures
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:30', periods=300, freq='1s'),
    'price': np.concatenate([
        np.full(200, 22450),      # Price stuck at 22450
        np.linspace(22450, 22455, 100)  # Then breaks up
    ]),
    'qty': np.random.randint(5, 50, 300)
})
detect_absorption(trades, [22450.0])`}
      </CodeBlock>

      <CodeBlock language="python" title="Exhaustion Pattern Detection">
{`def detect_exhaustion(bars, vol_mult=2.5, delta_thresh=0.7):
    """Detect exhaustion: spike volume + extreme delta + stall."""
    avg_vol = bars['volume'].rolling(20).mean()
    bars['vol_spike'] = bars['volume'] > avg_vol * vol_mult

    # Delta ratio: how one-sided was the volume
    bars['delta_ratio'] = abs(bars['delta']) / bars['volume']
    bars['one_sided'] = bars['delta_ratio'] > delta_thresh

    # Price stalls after the spike
    bars['next_range'] = abs(bars['close'].shift(-1) - bars['open'].shift(-1))
    bars['avg_range'] = bars['next_range'].rolling(20).mean()
    bars['stall'] = bars['next_range'] < bars['avg_range'] * 0.5

    bars['exhaustion'] = bars['vol_spike'] & bars['one_sided'] & bars['stall']
    return bars`}
      </CodeBlock>

      <NoteBlock title="Trading Absorption">
        On Nifty futures, absorption at a round number (22500, 23000) is a
        powerful signal. If heavy selling cannot break the level, the
        reversal is often sharp. Wait for the first higher-low after
        absorption before entering long.
      </NoteBlock>
    </SectionLayout>
  )
}
