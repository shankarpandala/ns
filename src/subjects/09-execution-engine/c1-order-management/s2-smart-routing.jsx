import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SmartRouting() {
  return (
    <SectionLayout
      title="Smart Order Routing"
      description="Routing orders across NSE, BSE, and Delta Exchange for best execution."
    >
      <DefinitionBlock term="Smart Order Routing (SOR)">
        Automatically selects the exchange or venue offering the best price and
        liquidity for an order. In India, equities trade on both NSE and BSE;
        SOR picks the venue with the tighter spread.
      </DefinitionBlock>

      <CodeBlock language="python" title="Multi-Exchange Order Router">
{`from dataclasses import dataclass
from typing import Dict

@dataclass
class VenueQuote:
    venue: str
    bid: float
    ask: float
    bid_qty: int
    ask_qty: int

class SmartOrderRouter:
    """Route orders to best available venue."""

    def __init__(self):
        self.venues = {}  # venue_name -> connector

    def register_venue(self, name, connector):
        self.venues[name] = connector

    def get_best_venue(self, symbol, side, qty) -> str:
        quotes = {}
        for name, conn in self.venues.items():
            try:
                q = conn.get_quote(symbol)
                quotes[name] = VenueQuote(
                    venue=name, bid=q['bid'], ask=q['ask'],
                    bid_qty=q['bid_qty'], ask_qty=q['ask_qty'],
                )
            except Exception:
                continue

        if side == 'BUY':
            # Best ask = lowest price with sufficient quantity
            candidates = {k: v for k, v in quotes.items()
                         if v.ask_qty >= qty}
            if not candidates:
                candidates = quotes
            return min(candidates, key=lambda k: quotes[k].ask)
        else:
            # Best bid = highest price
            candidates = {k: v for k, v in quotes.items()
                         if v.bid_qty >= qty}
            if not candidates:
                candidates = quotes
            return max(candidates, key=lambda k: quotes[k].bid)

    def route_order(self, symbol, side, qty, order_type='MARKET'):
        venue = self.get_best_venue(symbol, side, qty)
        connector = self.venues[venue]
        order_id = connector.place_order(symbol, side, qty, order_type)
        return {'venue': venue, 'order_id': order_id}

# Setup
router = SmartOrderRouter()
router.register_venue('NSE', nse_connector)
router.register_venue('BSE', bse_connector)
result = router.route_order('RELIANCE', 'BUY', 250)`}
      </CodeBlock>

      <NoteBlock title="Indian Market Context">
        Most brokers including Zerodha route to NSE by default since it has 90%+
        volume share. BSE can occasionally offer better prices for less liquid
        stocks. For F&O, routing is NSE-only as BSE derivatives have minimal
        liquidity.
      </NoteBlock>
    </SectionLayout>
  )
}
