import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SimulatedOrders() {
  return (
    <SectionLayout
      title="Live Data with Simulated Execution"
      description="Running strategies on real-time feeds with a local simulated order book."
    >
      <DefinitionBlock term="Simulated Execution Engine">
        A local component that receives live market data and processes paper
        orders against actual bid/ask prices. More realistic than using LTP
        alone because it accounts for spread and queue position.
      </DefinitionBlock>

      <CodeBlock language="python" title="Live Simulated Order Engine">
{`from datetime import datetime
from collections import deque

class SimulatedOrderEngine:
    """Execute paper orders against live tick data."""

    def __init__(self):
        self.pending_orders = deque()
        self.filled_orders = []
        self.positions = {}

    def submit_order(self, symbol, side, qty, limit_price=None):
        order = {
            'id': len(self.filled_orders) + len(self.pending_orders) + 1,
            'symbol': symbol,
            'side': side,
            'qty': qty,
            'limit_price': limit_price,
            'status': 'PENDING',
            'submitted_at': datetime.now(),
        }
        if limit_price is None:
            order['type'] = 'MARKET'
        else:
            order['type'] = 'LIMIT'
        self.pending_orders.append(order)
        return order['id']

    def on_tick(self, tick):
        """Process pending orders against live tick."""
        remaining = deque()
        for order in self.pending_orders:
            if order['symbol'] != tick['symbol']:
                remaining.append(order)
                continue

            filled = False
            if order['type'] == 'MARKET':
                fill_price = tick['ask'] if order['side'] == 'BUY' else tick['bid']
                filled = True
            elif order['type'] == 'LIMIT':
                if order['side'] == 'BUY' and tick['ask'] <= order['limit_price']:
                    fill_price = order['limit_price']
                    filled = True
                elif order['side'] == 'SELL' and tick['bid'] >= order['limit_price']:
                    fill_price = order['limit_price']
                    filled = True

            if filled:
                order['fill_price'] = fill_price
                order['filled_at'] = datetime.now()
                order['status'] = 'FILLED'
                self.filled_orders.append(order)
                self._update_position(order, fill_price)
            else:
                remaining.append(order)
        self.pending_orders = remaining

    def _update_position(self, order, price):
        sym = order['symbol']
        pos = self.positions.get(sym, 0)
        delta = order['qty'] if order['side'] == 'BUY' else -order['qty']
        self.positions[sym] = pos + delta`}
      </CodeBlock>

      <NoteBlock title="Integration with Kite WebSocket">
        Feed Kite WebSocket ticks (MODE_FULL) into the on_tick method. This
        gives you live bid/ask prices for realistic fill simulation. Run this
        alongside your strategy logic for a full paper trading experience
        with real NSE market data.
      </NoteBlock>
    </SectionLayout>
  )
}
