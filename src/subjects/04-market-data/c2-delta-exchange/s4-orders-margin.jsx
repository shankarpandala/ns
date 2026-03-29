import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'
import WarningBlock from '../../../components/content/WarningBlock'

export default function OrdersMargin() {
  return (
    <SectionLayout
      title="Orders and Margin Management"
      subtitle="Order types, margin calculation, and leverage on Delta Exchange"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <ComparisonTable
        title="Order Types"
        headers={['Type', 'Description', 'Use Case']}
        rows={[
          ['Limit', 'Execute at specified price or better', 'Precise entry/exit levels'],
          ['Market', 'Execute immediately at best price', 'Urgent fills, stop triggers'],
          ['Stop Limit', 'Limit order triggered at stop price', 'Stop loss with price control'],
          ['Stop Market', 'Market order triggered at stop price', 'Guaranteed stop execution'],
          ['Bracket', 'Entry + stop loss + take profit', 'Automated risk management'],
        ]}
      />

      <CodeBlock
        language="python"
        title="Place orders via API"
        code={`# Limit buy order
order = client.place_order(
    product_id=27,         # BTCINR product ID
    size=1,                # Number of contracts
    side="buy",
    limit_price="5000000", # Price in INR
    order_type="limit_order",
    time_in_force="gtc"    # Good till cancelled
)
print(f"Order ID: {order['id']}")

# Stop loss order
stop = client.place_order(
    product_id=27,
    size=1,
    side="sell",
    order_type="stop_market_order",
    stop_price="4900000",
    time_in_force="gtc"
)`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Margin Calculation</h3>
      <CodeBlock
        language="python"
        title="Check margin requirements"
        code={`def calculate_margin(client, symbol, size, leverage):
    """Estimate margin required for a position."""
    products = client.get_products()
    product = next(p for p in products if p["symbol"] == symbol)
    mark_price = float(product["mark_price"])
    notional = mark_price * size * float(product["contract_size"])
    initial_margin = notional / leverage
    maintenance_margin = initial_margin * 0.5  # Typically 50% of IM
    return {
        "notional": notional,
        "initial_margin": initial_margin,
        "maintenance_margin": maintenance_margin,
    }`}
      />

      <WarningBlock title="Liquidation Risk">
        High leverage amplifies losses. At 10x leverage, a 10% adverse move wipes out your
        margin entirely. Always use stop losses and never risk more than 2% of capital per trade.
      </WarningBlock>

      <NoteBlock type="tip" title="Reduce Leverage for Overnight">
        <p>Crypto markets are 24/7. If holding overnight, reduce leverage to 3-5x maximum
        to survive gap moves during low-liquidity hours (2-6 AM IST).</p>
      </NoteBlock>
    </SectionLayout>
  )
}
