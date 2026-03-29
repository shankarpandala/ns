import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function MomentumScalping() {
  return (
    <SectionLayout
      title="Momentum Scalping with Order Flow"
      description="Combining momentum indicators with order flow for high-probability scalps."
    >
      <DefinitionBlock term="Momentum Scalping">
        Ultra-short-term trades (1-10 minutes) that ride a burst of momentum
        confirmed by order flow imbalance. Enter on momentum ignition, exit
        on first sign of absorption or delta divergence.
      </DefinitionBlock>

      <CodeBlock language="python" title="Momentum Scalping Signal Generator">
{`import pandas as pd
import numpy as np

class MomentumScalper:
    def __init__(self, ema_fast=5, ema_slow=13, delta_threshold=500):
        self.ema_fast = ema_fast
        self.ema_slow = ema_slow
        self.delta_threshold = delta_threshold

    def generate_signals(self, candles_1m):
        """1-minute candles with volume delta for scalping."""
        c = candles_1m.copy()

        # EMA momentum
        c['ema_f'] = c['close'].ewm(span=self.ema_fast).mean()
        c['ema_s'] = c['close'].ewm(span=self.ema_slow).mean()
        c['momentum'] = c['ema_f'] - c['ema_s']

        # Volume delta (buy_vol - sell_vol per candle)
        c['cum_delta'] = c['delta'].cumsum()
        c['delta_ma'] = c['delta'].rolling(10).mean()

        signals = []
        for i in range(13, len(c)):
            row = c.iloc[i]
            prev = c.iloc[i-1]

            # Long: momentum turning up + positive delta surge
            if (row['momentum'] > 0 and prev['momentum'] <= 0
                and row['delta'] > self.delta_threshold):
                signals.append({
                    'time': row['time'], 'side': 'long',
                    'entry': row['close'],
                    'sl': row['close'] - 10,
                    'target': row['close'] + 15
                })

            # Short: momentum turning down + negative delta surge
            elif (row['momentum'] < 0 and prev['momentum'] >= 0
                  and row['delta'] < -self.delta_threshold):
                signals.append({
                    'time': row['time'], 'side': 'short',
                    'entry': row['close'],
                    'sl': row['close'] + 10,
                    'target': row['close'] - 15
                })

        return pd.DataFrame(signals)

scalper = MomentumScalper(delta_threshold=300)
print("Feed 1-min candles with 'delta' column from footprint data")`}
      </CodeBlock>

      <NoteBlock title="Scalping Rules for NSE">
        Keep scalps under 5 minutes on Nifty futures. Transaction costs
        (brokerage + STT + GST) on futures are ~Rs 40-60 per lot round trip.
        You need at least 3-5 points per trade to be profitable after costs.
        Avoid scalping in the 12:30-13:30 lunch hour -- low volume causes
        false signals.
      </NoteBlock>
    </SectionLayout>
  )
}
