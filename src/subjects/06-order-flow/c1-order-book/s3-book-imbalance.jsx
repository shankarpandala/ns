import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function BookImbalance() {
  return (
    <SectionLayout
      title="Order Book Imbalance"
      description="Using bid/ask volume ratios to detect buying and selling pressure."
    >
      <DefinitionBlock term="Book Imbalance Ratio">
        (Bid Volume - Ask Volume) / (Bid Volume + Ask Volume). Ranges from
        -1 (all ask) to +1 (all bid). Values above +0.3 suggest buying
        pressure; below -0.3 suggest selling pressure.
      </DefinitionBlock>

      <CodeBlock language="python" title="Computing Book Imbalance">
{`import numpy as np
import pandas as pd

def book_imbalance(bids, asks, levels=5):
    """Calculate order book imbalance across N levels."""
    bid_vol = sum(b['qty'] for b in bids[:levels])
    ask_vol = sum(a['qty'] for a in asks[:levels])
    if bid_vol + ask_vol == 0:
        return 0
    return (bid_vol - ask_vol) / (bid_vol + ask_vol)

# Nifty Futures snapshot
bids = [
    {'price': 22450, 'qty': 3200},
    {'price': 22449.5, 'qty': 2800},
    {'price': 22449, 'qty': 1500},
    {'price': 22448.5, 'qty': 4100},
    {'price': 22448, 'qty': 2200},
]
asks = [
    {'price': 22450.5, 'qty': 1200},
    {'price': 22451, 'qty': 1800},
    {'price': 22451.5, 'qty': 900},
    {'price': 22452, 'qty': 1400},
    {'price': 22452.5, 'qty': 1100},
]

imb = book_imbalance(bids, asks)
print(f"Imbalance: {imb:.3f}")  # Positive = bid-heavy`}
      </CodeBlock>

      <CodeBlock language="python" title="Weighted Imbalance by Price Proximity">
{`def weighted_imbalance(bids, asks, mid_price, levels=5):
    """Weight levels by inverse distance from mid price."""
    def weighted_sum(orders):
        total = 0
        for o in orders[:levels]:
            dist = abs(o['price'] - mid_price)
            weight = 1 / (1 + dist)
            total += o['qty'] * weight
        return total

    w_bid = weighted_sum(bids)
    w_ask = weighted_sum(asks)
    return (w_bid - w_ask) / (w_bid + w_ask)

mid = (bids[0]['price'] + asks[0]['price']) / 2
wimb = weighted_imbalance(bids, asks, mid)
print(f"Weighted imbalance: {wimb:.3f}")`}
      </CodeBlock>

      <NoteBlock title="Predictive Power">
        On Nifty futures, a sustained imbalance above +0.4 across 5 levels
        over 10+ seconds has shown short-term predictive power for upward
        price movement. Combine with trade flow direction for confirmation.
      </NoteBlock>
    </SectionLayout>
  )
}
