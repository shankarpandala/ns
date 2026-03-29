import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DepthOfMarket() {
  return (
    <SectionLayout
      title="Depth of Market (DOM)"
      description="Reading the DOM ladder for Nifty and BankNifty futures trading."
    >
      <DefinitionBlock term="Depth of Market (DOM)">
        A real-time display of all resting limit orders at each price level,
        shown as a vertical ladder. Traders read DOM to gauge supply/demand
        balance and anticipate short-term price direction.
      </DefinitionBlock>

      <CodeBlock language="python" title="Building a DOM Display">
{`def display_dom(bids, asks, levels=5):
    """Print a DOM ladder for Nifty futures."""
    print(f"{'BID QTY':>10} {'PRICE':>10} {'ASK QTY':>10}")
    print("-" * 35)

    # Ask side (top to bottom, highest first)
    for a in reversed(asks[:levels]):
        print(f"{'':>10} {a['price']:>10.2f} {a['qty']:>10,}")

    print(f"{'--- SPREAD ---':^35}")

    # Bid side
    for b in bids[:levels]:
        print(f"{b['qty']:>10,} {b['price']:>10.2f}")

bids = [
    {'price': 22450.00, 'qty': 2400},
    {'price': 22449.50, 'qty': 1800},
    {'price': 22449.00, 'qty': 3600},
    {'price': 22448.50, 'qty': 900},
    {'price': 22448.00, 'qty': 5200},
]
asks = [
    {'price': 22450.50, 'qty': 1100},
    {'price': 22451.00, 'qty': 2700},
    {'price': 22451.50, 'qty': 1500},
    {'price': 22452.00, 'qty': 4300},
    {'price': 22452.50, 'qty': 800},
]
display_dom(bids, asks)`}
      </CodeBlock>

      <NoteBlock title="DOM Reading Tips for Nifty Futures">
        Look for asymmetry: if bid depth at levels 1-3 is 3x the ask depth,
        buyers are stacking. A thin ask side with a large bid wall often
        leads to an upward push. Conversely, sudden bid cancellations
        (pulling) before a move down indicate informed selling.
      </NoteBlock>

      <CodeBlock language="python" title="DOM Change Tracking">
{`class DOMTracker:
    def __init__(self):
        self.prev_bids = {}
        self.prev_asks = {}

    def update(self, bids, asks):
        curr_bids = {b['price']: b['qty'] for b in bids}
        curr_asks = {a['price']: a['qty'] for a in asks}

        # Detect new or increased orders
        for price, qty in curr_bids.items():
            prev = self.prev_bids.get(price, 0)
            if qty > prev + 500:
                print(f"BID ADD: {qty - prev} @ {price}")

        # Detect pulled orders
        for price, qty in self.prev_asks.items():
            if price not in curr_asks and qty > 1000:
                print(f"ASK PULL: {qty} removed @ {price}")

        self.prev_bids = curr_bids
        self.prev_asks = curr_asks`}
      </CodeBlock>
    </SectionLayout>
  )
}
