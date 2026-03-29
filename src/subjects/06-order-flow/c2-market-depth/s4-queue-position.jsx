import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function QueuePosition() {
  return (
    <SectionLayout
      title="Queue Position Estimation"
      description="Understanding order priority rules at NSE and estimating queue position."
    >
      <DefinitionBlock term="Price-Time Priority">
        NSE follows price-time priority (FIFO). At each price level, the
        order placed earliest gets filled first. Knowing your queue position
        helps estimate fill probability for limit orders.
      </DefinitionBlock>

      <CodeBlock language="python" title="Estimating Queue Position">
{`class QueueEstimator:
    """Estimate queue position for a limit order at NSE."""

    def __init__(self):
        self.snapshots = []

    def place_order(self, price, qty, current_book):
        """Estimate position when placing a limit order."""
        level = next((b for b in current_book
                      if b['price'] == price), None)
        if level:
            # Orders ahead = existing quantity at this price
            ahead = level['qty']
            total = ahead + qty
            return {'ahead': ahead, 'total': total,
                    'fill_prob': qty / total}
        else:
            # New price level - we are first
            return {'ahead': 0, 'total': qty, 'fill_prob': 1.0}

    def update_position(self, prev_qty, curr_qty, our_qty):
        """Track position as orders ahead get filled or cancelled."""
        qty_removed = max(0, prev_qty - curr_qty)
        ahead = max(0, prev_qty - our_qty - qty_removed)
        return ahead

# Example: placing 50 lots at 22450 with 1200 lots ahead
estimator = QueueEstimator()
book = [{'price': 22450, 'qty': 1200, 'orders': 15}]
pos = estimator.place_order(22450, 50, book)
print(f"Ahead: {pos['ahead']} lots")
print(f"Est fill prob: {pos['fill_prob']:.2%}")`}
      </CodeBlock>

      <NoteBlock title="NSE Queue Priority Rules">
        NSE uses pure price-time priority with no pro-rata allocation.
        Market orders get highest priority, then limit orders by price,
        then by timestamp within the same price. IOC and FOK orders that
        do not fill immediately are cancelled -- they do not enter the queue.
      </NoteBlock>

      <CodeBlock language="python" title="Fill Probability Over Time">
{`def estimate_fill_time(ahead_qty, avg_trade_rate):
    """Estimate seconds until our order reaches front of queue."""
    if avg_trade_rate <= 0:
        return float('inf')
    return ahead_qty / avg_trade_rate

# Nifty futures: ~500 lots/second during active hours
fill_time = estimate_fill_time(ahead_qty=1200, avg_trade_rate=500)
print(f"Estimated fill time: {fill_time:.1f} seconds")`}
      </CodeBlock>
    </SectionLayout>
  )
}
