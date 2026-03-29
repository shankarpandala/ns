import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Leverage() {
  return (
    <SectionLayout
      title="Leverage Management & Liquidation Prevention"
      description="Managing leverage levels and preventing forced liquidation on Delta Exchange."
    >
      <DefinitionBlock term="Liquidation Price">
        The price at which the exchange force-closes your position because
        margin is insufficient to cover losses. On Delta, liquidation uses a
        maintenance margin threshold, typically 50% of initial margin.
      </DefinitionBlock>

      <CodeBlock language="python" title="Leverage and Liquidation Calculator">
{`class LeverageManager:
    """Calculate and monitor leverage on Delta Exchange."""

    def __init__(self, client):
        self.client = client

    def calculate_liquidation_price(self, entry_price, leverage, side):
        """Estimate liquidation price for a position."""
        maint_margin_rate = 0.005  # 0.5% maintenance margin
        if side == 'buy':
            # Long: liq when price falls
            liq = entry_price * (1 - 1/leverage + maint_margin_rate)
        else:
            # Short: liq when price rises
            liq = entry_price * (1 + 1/leverage - maint_margin_rate)
        return round(liq, 2)

    def effective_leverage(self, position_value, margin_balance):
        return position_value / margin_balance if margin_balance > 0 else float('inf')

    def safe_position_size(self, balance, leverage, price, max_risk_pct=0.02):
        """Size position so max loss = max_risk_pct of balance."""
        margin = balance / leverage
        max_loss = balance * max_risk_pct
        # At what price move does loss = max_loss?
        price_move = max_loss / (margin * leverage / price)
        size = int(margin * leverage / price)
        return {
            'size': size,
            'margin_used': round(size * price / leverage, 2),
            'liquidation_distance': f"{(1/leverage)*100:.1f}%",
            'max_loss_at_sl': round(max_loss, 2),
        }

mgr = LeverageManager(delta_client)
# BTC at $62000, 10x leverage, long position
liq = mgr.calculate_liquidation_price(62000, 10, 'buy')
print(f"Liquidation price: ${liq}")  # ~$55,890

sizing = mgr.safe_position_size(10000, 10, 62000)
print(f"Safe size: {sizing['size']} contracts")`}
      </CodeBlock>

      <CodeBlock language="python" title="Auto-Deleverage Protection">
{`class DeleverageProtection:
    """Monitor and reduce leverage when approaching danger zone."""

    def __init__(self, client, max_leverage=8):
        self.client = client
        self.max_leverage = max_leverage

    def check_and_reduce(self):
        positions = self.client.get_positions()['result']
        wallet = self.client.get_wallet()

        for pos in positions:
            if pos['size'] == 0:
                continue
            eff_lev = self.effective_leverage(pos)
            if eff_lev > self.max_leverage:
                reduce_by = int(pos['size'] * 0.25)  # Reduce 25%
                self.client.place_order(
                    symbol=pos['symbol'],
                    size=reduce_by,
                    side='sell' if pos['size'] > 0 else 'buy',
                    order_type='market_order',
                )
                print(f"Reduced {pos['symbol']} by {reduce_by}")`}
      </CodeBlock>

      <NoteBlock title="Leverage Best Practice">
        Never use more than 5-10x leverage on crypto perpetuals. At 20x, a 5%
        adverse move wipes your position. Start with 3x leverage during strategy
        development and increase only after 3+ months of consistent results.
      </NoteBlock>
    </SectionLayout>
  )
}
