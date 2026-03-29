import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Positions() {
  return (
    <SectionLayout
      title="Position Management & P&L Tracking"
      description="Real-time position tracking, holdings management, and P&L computation via Kite API."
    >
      <DefinitionBlock term="Day vs Net Position">
        Day position reflects only today's trades. Net position includes
        carried-forward positions from previous sessions. Zerodha shows both
        in the positions API response.
      </DefinitionBlock>

      <CodeBlock language="python" title="Position Tracker">
{`class PositionTracker:
    """Track and manage positions via Kite API."""

    def __init__(self, kite):
        self.kite = kite

    def get_positions(self):
        positions = self.kite.positions()
        return {
            'day': positions['day'],
            'net': positions['net'],
        }

    def get_open_pnl(self):
        """Calculate unrealized P&L for all positions."""
        pnl_summary = []
        for pos in self.kite.positions()['net']:
            if pos['quantity'] == 0:
                continue
            unrealized = (pos['last_price'] - pos['average_price']) * pos['quantity']
            pnl_summary.append({
                'symbol': pos['tradingsymbol'],
                'qty': pos['quantity'],
                'avg_price': pos['average_price'],
                'ltp': pos['last_price'],
                'unrealized_pnl': round(unrealized, 2),
                'product': pos['product'],
            })
        return pnl_summary

    def get_holdings_value(self):
        """Total portfolio value from holdings."""
        holdings = self.kite.holdings()
        total = sum(h['last_price'] * h['quantity'] for h in holdings)
        invested = sum(h['average_price'] * h['quantity'] for h in holdings)
        return {
            'current_value': total,
            'invested': invested,
            'total_pnl': total - invested,
            'pnl_pct': ((total - invested) / invested * 100) if invested else 0,
        }

    def flatten_all(self, product='MIS'):
        """Square off all open intraday positions."""
        for pos in self.kite.positions()['day']:
            if pos['quantity'] == 0:
                continue
            side = ('SELL' if pos['quantity'] > 0 else 'BUY')
            self.kite.place_order(
                variety='regular',
                exchange=pos['exchange'],
                tradingsymbol=pos['tradingsymbol'],
                transaction_type=side,
                quantity=abs(pos['quantity']),
                product=product,
                order_type='MARKET',
            )

tracker = PositionTracker(kite)
print(tracker.get_open_pnl())`}
      </CodeBlock>

      <NoteBlock title="Auto-Square Off">
        Zerodha auto-squares MIS positions at 3:15 PM for equity and 3:25 PM
        for F&O. Build your own square-off logic at 3:10 PM to avoid the broker
        penalty of Rs 50 per order for auto-square-off.
      </NoteBlock>
    </SectionLayout>
  )
}
