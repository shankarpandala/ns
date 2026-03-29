import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function LargeOrders() {
  return (
    <SectionLayout
      title="Large Order Detection"
      description="Algorithms to identify unusually large trades and institutional footprints."
    >
      <DefinitionBlock term="Large Order">
        A trade whose size exceeds a statistical threshold relative to recent
        average trade size. On Nifty futures, trades above 100 lots (~1400
        contracts) are typically institutional.
      </DefinitionBlock>

      <CodeBlock language="python" title="Statistical Large Order Detection">
{`import pandas as pd
import numpy as np

class LargeOrderDetector:
    def __init__(self, lookback=500, z_threshold=2.5):
        self.lookback = lookback
        self.z_threshold = z_threshold
        self.trades = []

    def add_trade(self, price, qty, side):
        self.trades.append({'price': price, 'qty': qty, 'side': side})
        if len(self.trades) > self.lookback * 2:
            self.trades = self.trades[-self.lookback:]

    def is_large(self, qty):
        if len(self.trades) < 50:
            return False
        recent = [t['qty'] for t in self.trades[-self.lookback:]]
        mean_qty = np.mean(recent)
        std_qty = np.std(recent)
        if std_qty == 0:
            return False
        z_score = (qty - mean_qty) / std_qty
        return z_score > self.z_threshold

    def summary(self):
        large = [t for t in self.trades if self.is_large(t['qty'])]
        buy_vol = sum(t['qty'] for t in large if t['side'] == 'buy')
        sell_vol = sum(t['qty'] for t in large if t['side'] == 'sell')
        return {'large_count': len(large),
                'buy_vol': buy_vol, 'sell_vol': sell_vol}

# Simulate
detector = LargeOrderDetector(z_threshold=2.0)
np.random.seed(42)
for _ in range(600):
    qty = int(np.random.exponential(20))
    side = np.random.choice(['buy', 'sell'])
    if detector.is_large(qty):
        print(f"LARGE {side.upper()}: {qty} lots")
    detector.add_trade(22450, qty, side)

print(detector.summary())`}
      </CodeBlock>

      <CodeBlock language="python" title="Time-Clustered Large Orders">
{`def detect_clusters(trades, window='30s', min_large=3):
    """Find clusters of large trades within a time window."""
    trades = trades.set_index('time')
    trades['is_large'] = trades['qty'] > trades['qty'].quantile(0.95)
    large = trades[trades['is_large']]

    clusters = large.rolling(window).count()
    cluster_starts = clusters[clusters['qty'] >= min_large]
    return cluster_starts.index.tolist()`}
      </CodeBlock>

      <NoteBlock title="Indian Market Context">
        On NSE, block deals (minimum 5 lakh shares or Rs 10 crore) execute
        in a special window (8:45-9:00 AM). Bulk deals (>0.5% of shares)
        are reported end-of-day. Track both for institutional flow signals.
      </NoteBlock>
    </SectionLayout>
  )
}
