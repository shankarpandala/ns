import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PartialFills() {
  return (
    <SectionLayout
      title="Handling Partial Fills & Amendments"
      description="Managing partially filled orders, order modifications, and cancel-replace workflows."
    >
      <DefinitionBlock term="Partial Fill">
        When only a portion of the order quantity is executed. Common with limit
        orders on less liquid stocks or large F&O orders. The remaining quantity
        stays open until filled, cancelled, or expired.
      </DefinitionBlock>

      <CodeBlock language="python" title="Partial Fill Handler">
{`class PartialFillHandler:
    """Track and manage partially filled orders."""

    def __init__(self, order_manager, broker):
        self.om = order_manager
        self.broker = broker
        self.fill_timeout = 30  # seconds

    def on_partial_fill(self, order_id, filled_qty, fill_price):
        order = self.om.orders[order_id]
        order.filled_qty += filled_qty

        # Recalculate average fill price
        prev_cost = order.avg_fill_price * (order.filled_qty - filled_qty)
        new_cost = fill_price * filled_qty
        order.avg_fill_price = (prev_cost + new_cost) / order.filled_qty

        remaining = order.quantity - order.filled_qty
        print(f"Order {order_id}: filled {filled_qty}@{fill_price}, "
              f"remaining: {remaining}")

        if remaining == 0:
            order.status = 'FILLED'
        return remaining

    def handle_stale_partial(self, order_id, action='cancel_remaining'):
        """Handle orders stuck in partial fill state."""
        order = self.om.orders[order_id]
        remaining = order.quantity - order.filled_qty

        if action == 'cancel_remaining':
            self.broker.cancel_order(order_id)
            order.status = 'PARTIAL_CANCELLED'

        elif action == 'convert_to_market':
            self.broker.modify_order(
                order_id=order_id,
                order_type='MARKET',
                quantity=remaining,
            )

        elif action == 'reprice':
            # Move limit price closer to market
            ltp = self.broker.get_ltp(order.symbol)
            if order.side == 'BUY':
                new_price = ltp + 0.5  # Pay up 0.5 points
            else:
                new_price = ltp - 0.5
            self.broker.modify_order(
                order_id=order_id,
                price=new_price,
                quantity=remaining,
            )

    def monitor_fills(self, order_id):
        """Auto-handle if partial fill stalls."""
        import time
        start = time.time()
        while time.time() - start < self.fill_timeout:
            order = self.om.orders[order_id]
            if order.status == 'FILLED':
                return True
            time.sleep(1)
        # Timeout -- convert remaining to market
        self.handle_stale_partial(order_id, 'convert_to_market')
        return False`}
      </CodeBlock>

      <NoteBlock title="F&O Partial Fill Risks">
        In Nifty options, partial fills on spread orders (e.g., buying a call
        spread) leave you with an unhedged leg. Always monitor both legs and
        have fallback logic to close the filled leg if the other side cannot
        be filled within your timeout window.
      </NoteBlock>
    </SectionLayout>
  )
}
