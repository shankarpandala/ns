import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ZerodhaPaper() {
  return (
    <SectionLayout
      title="Paper Trading with Zerodha"
      description="Using Kite API in sandbox mode for risk-free strategy validation."
    >
      <DefinitionBlock term="Paper Trading">
        Executing a strategy with real market data but simulated orders. No real
        money is at risk. Validates that strategy logic, order handling, and
        system integration work correctly before going live.
      </DefinitionBlock>

      <CodeBlock language="python" title="Zerodha Paper Trading Wrapper">
{`from kiteconnect import KiteConnect, KiteTicker
import json
from datetime import datetime

class ZerodhaPaperTrader:
    """Wraps Kite API to intercept orders for paper trading."""

    def __init__(self, api_key, access_token):
        self.kite = KiteConnect(api_key=api_key)
        self.kite.set_access_token(access_token)
        self.paper_positions = {}
        self.order_log = []

    def place_order(self, symbol, side, qty, price=None, order_type='MARKET'):
        """Simulate order placement using live LTP."""
        if price is None:
            ltp = self.kite.ltp(symbol)[symbol]['last_price']
        else:
            ltp = price

        order = {
            'order_id': f"PAPER_{len(self.order_log)+1:06d}",
            'symbol': symbol,
            'side': side,
            'quantity': qty,
            'price': ltp,
            'timestamp': datetime.now().isoformat(),
            'status': 'COMPLETE',
        }
        self.order_log.append(order)

        # Update paper position
        key = symbol
        current = self.paper_positions.get(key, {'qty': 0, 'avg_price': 0})
        if side == 'BUY':
            total_cost = current['avg_price'] * current['qty'] + ltp * qty
            current['qty'] += qty
            current['avg_price'] = total_cost / current['qty']
        else:
            current['qty'] -= qty

        if current['qty'] == 0:
            self.paper_positions.pop(key, None)
        else:
            self.paper_positions[key] = current

        return order

    def get_pnl(self):
        pnl = {}
        for sym, pos in self.paper_positions.items():
            ltp = self.kite.ltp(sym)[sym]['last_price']
            pnl[sym] = (ltp - pos['avg_price']) * pos['qty']
        return pnl`}
      </CodeBlock>

      <NoteBlock title="Zerodha API Limits">
        Zerodha allows 3 requests per second for quote APIs. In paper trading,
        batch your LTP requests using kite.ltp() with multiple symbols. The
        Kite Connect sandbox is not a full simulation -- use this wrapper with
        a live API key on real data instead.
      </NoteBlock>
    </SectionLayout>
  )
}
