import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Heatmaps() {
  return (
    <SectionLayout
      title="Order Book Heatmap Visualization"
      description="Building real-time heatmaps to visualize order book depth over time."
    >
      <DefinitionBlock term="Order Book Heatmap">
        A 2D visualization with time on the x-axis, price on the y-axis, and
        color intensity representing order quantity. Reveals support/resistance
        walls and spoofing patterns.
      </DefinitionBlock>

      <CodeBlock language="python" title="Building an Order Book Heatmap">
{`import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LogNorm

# Simulate 60 snapshots (1 per second) across 20 price levels
np.random.seed(42)
n_times, n_levels = 60, 20
prices = np.arange(22440, 22440 + n_levels * 0.5, 0.5)

# Bid side heatmap data (quantity at each price/time)
bid_heat = np.random.exponential(500, (n_levels, n_times))
# Add a large "wall" at 22445
wall_idx = np.where(prices == 22445.0)[0][0]
bid_heat[wall_idx, :] += 3000

fig, ax = plt.subplots(figsize=(14, 6))
im = ax.pcolormesh(
    range(n_times), prices, bid_heat,
    cmap='YlOrRd', norm=LogNorm(vmin=100, vmax=5000)
)
ax.set_xlabel('Time (seconds)')
ax.set_ylabel('Price Level')
ax.set_title('Nifty Futures - Bid Side Heatmap')
plt.colorbar(im, label='Order Quantity')
plt.tight_layout()
plt.savefig('orderbook_heatmap.png', dpi=150)`}
      </CodeBlock>

      <NoteBlock title="Reading the Heatmap">
        Bright horizontal bands indicate large resting orders (support walls).
        If a wall suddenly disappears (spoofing), expect a fast move through
        that level. Watch for walls that build just before expiry on Nifty
        weekly options -- these often mark max pain zones.
      </NoteBlock>

      <CodeBlock language="python" title="Real-Time Streaming Heatmap">
{`import collections

class OrderBookHeatmap:
    def __init__(self, history=120):
        self.history = history
        self.snapshots = collections.deque(maxlen=history)

    def update(self, bids, asks):
        """Store a snapshot of bid/ask quantities by price."""
        snap = {}
        for b in bids:
            snap[b['price']] = {'side': 'bid', 'qty': b['qty']}
        for a in asks:
            snap[a['price']] = {'side': 'ask', 'qty': a['qty']}
        self.snapshots.append(snap)

    def detect_walls(self, threshold=3.0):
        """Find price levels with qty > threshold * median."""
        if not self.snapshots:
            return []
        latest = self.snapshots[-1]
        qtys = [v['qty'] for v in latest.values()]
        med = np.median(qtys) if qtys else 1
        return [p for p, v in latest.items()
                if v['qty'] > threshold * med]

heatmap = OrderBookHeatmap()
# Call heatmap.update(bids, asks) on each tick`}
      </CodeBlock>
    </SectionLayout>
  )
}
