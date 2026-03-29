import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Level2Data() {
  return (
    <SectionLayout
      title="Level 2 Data: Bid/Ask Arrays"
      description="Understanding the order book structure with Level 2 market data on NSE."
    >
      <DefinitionBlock term="Level 2 Data">
        Displays the full depth of pending buy (bid) and sell (ask) orders at
        each price level. NSE provides 5 levels of depth in standard feeds and
        20 levels via Tick-by-Tick (TBT) data.
      </DefinitionBlock>

      <CodeBlock language="python" title="Representing L2 Order Book">
{`import numpy as np

# Level 2 snapshot for Nifty Futures
bids = [
    {'price': 22450.00, 'qty': 1800, 'orders': 12},
    {'price': 22449.50, 'qty': 2400, 'orders': 18},
    {'price': 22449.00, 'qty': 3100, 'orders': 22},
    {'price': 22448.50, 'qty': 1500, 'orders': 9},
    {'price': 22448.00, 'qty': 4200, 'orders': 31},
]

asks = [
    {'price': 22450.50, 'qty': 1600, 'orders': 10},
    {'price': 22451.00, 'qty': 2800, 'orders': 15},
    {'price': 22451.50, 'qty': 2200, 'orders': 19},
    {'price': 22452.00, 'qty': 3500, 'orders': 25},
    {'price': 22452.50, 'qty': 1900, 'orders': 14},
]

best_bid = bids[0]['price']
best_ask = asks[0]['price']
spread = best_ask - best_bid
mid_price = (best_bid + best_ask) / 2
print(f"Spread: {spread:.2f} | Mid: {mid_price:.2f}")

# Total depth on each side
total_bid_qty = sum(b['qty'] for b in bids)
total_ask_qty = sum(a['qty'] for a in asks)
print(f"Bid depth: {total_bid_qty} | Ask depth: {total_ask_qty}")`}
      </CodeBlock>

      <NoteBlock title="NSE Data Access">
        NSE provides Level 2 data via broker APIs (Zerodha Kite, Angel One
        SmartAPI). Full TBT data with 20-level depth is available through
        NSE co-location feeds for high-frequency participants.
      </NoteBlock>

      <CodeBlock language="python" title="Streaming L2 Updates via Kite WebSocket">
{`from kiteconnect import KiteTicker

def on_ticks(ws, ticks):
    for tick in ticks:
        if 'depth' in tick:
            bids = tick['depth']['buy']
            asks = tick['depth']['sell']
            for i, level in enumerate(bids[:5]):
                print(f"Bid L{i+1}: {level['price']} x {level['quantity']}")

kws = KiteTicker("your_api_key", "your_access_token")
kws.on_ticks = on_ticks
kws.subscribe([256265])        # Nifty 50 instrument token
kws.set_mode(kws.MODE_FULL, [256265])
kws.connect(threaded=True)`}
      </CodeBlock>

      <NoteBlock title="Tick Size Matters">
        Nifty futures tick at 0.05 points. Each price level in the book
        can aggregate multiple orders. High order count at a level often
        signals retail clustering, while few large orders suggest institutions.
      </NoteBlock>
    </SectionLayout>
  )
}
