import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function FundingSettlement() {
  return (
    <SectionLayout
      title="Funding Rate & Settlement"
      description="Collecting funding rates on perpetual futures and handling settlement on Delta Exchange."
    >
      <DefinitionBlock term="Funding Rate">
        A periodic payment between long and short holders of perpetual futures.
        When funding is positive, longs pay shorts; when negative, shorts pay
        longs. Delta Exchange settles funding every 8 hours.
      </DefinitionBlock>

      <CodeBlock language="python" title="Funding Rate Monitor">
{`import requests
from datetime import datetime, timedelta

class FundingRateTracker:
    """Track and collect funding rates on Delta Exchange."""

    def __init__(self, client):
        self.client = client
        self.history = []

    def get_current_rate(self, symbol="BTCUSDT"):
        resp = requests.get(
            f"https://api.delta.exchange/v2/products/{symbol}"
        )
        product = resp.json()['result']
        return {
            'symbol': symbol,
            'funding_rate': float(product.get('funding_rate', 0)),
            'next_funding': product.get('next_funding_time'),
            'predicted_rate': float(product.get('predicted_funding_rate', 0)),
        }

    def calculate_funding_pnl(self, position_size, entry_price, rate):
        """Calculate funding payment for a position."""
        notional = position_size * entry_price
        payment = notional * rate
        return round(payment, 4)  # Positive = you pay, negative = you receive

    def funding_rate_strategy(self, symbol, threshold=0.01):
        """Signal when funding creates trading opportunity."""
        rate_info = self.get_current_rate(symbol)
        rate = rate_info['funding_rate'] * 100  # Convert to %

        if rate > threshold:
            return {
                'signal': 'SHORT',
                'reason': f'High positive funding {rate:.3f}%, shorts collect',
                'annualized': f'{rate * 3 * 365:.1f}%',
            }
        elif rate < -threshold:
            return {
                'signal': 'LONG',
                'reason': f'Negative funding {rate:.3f}%, longs collect',
                'annualized': f'{abs(rate) * 3 * 365:.1f}%',
            }
        return {'signal': 'NEUTRAL', 'reason': 'Funding within normal range'}

tracker = FundingRateTracker(delta_client)
rate = tracker.get_current_rate("BTCUSDT")
print(f"Current funding: {rate['funding_rate']*100:.4f}%")
pnl = tracker.calculate_funding_pnl(1.0, 62000, rate['funding_rate'])
print(f"Funding PnL per BTC: ${pnl}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Settlement Handling">
{`class SettlementHandler:
    """Handle Delta Exchange settlement events."""

    def __init__(self, client):
        self.client = client

    def check_upcoming_settlement(self, symbol):
        product = self.client.get_product(symbol)
        if product.get('settlement_time'):
            return {
                'settlement_at': product['settlement_time'],
                'settlement_price': product.get('mark_price'),
                'type': product.get('contract_type'),
            }
        return None

    def pre_settlement_actions(self, symbol):
        """Close or reduce positions before settlement."""
        pos = self.client.get_position(symbol)
        if pos and pos['size'] != 0:
            print(f"Warning: Open position in {symbol} before settlement")
            return True
        return False`}
      </CodeBlock>

      <NoteBlock title="Funding Arbitrage">
        When BTC perpetual funding exceeds 0.05% per 8 hours (55% annualized),
        a cash-and-carry arb opportunity exists: buy spot BTC on an exchange and
        short perpetual on Delta. The funding payments act as yield. Monitor
        basis risk and liquidation levels carefully.
      </NoteBlock>
    </SectionLayout>
  )
}
