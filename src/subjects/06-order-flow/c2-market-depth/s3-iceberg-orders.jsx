import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function IcebergOrders() {
  return (
    <SectionLayout
      title="Detecting Iceberg & Hidden Orders"
      description="Algorithms to identify large concealed orders in the NSE order book."
    >
      <DefinitionBlock term="Iceberg Order">
        A large order split into visible and hidden portions. NSE supports
        disclosed quantity orders where only a fraction shows in the book.
        The hidden portion refills automatically as the visible part executes.
      </DefinitionBlock>

      <CodeBlock language="python" title="Iceberg Detection Algorithm">
{`class IcebergDetector:
    """Detect iceberg orders by tracking repeated refills at same price."""

    def __init__(self, refill_threshold=3):
        self.price_history = {}  # price -> list of qty observations
        self.refill_threshold = refill_threshold

    def update(self, price, visible_qty, traded_qty):
        if price not in self.price_history:
            self.price_history[price] = []

        history = self.price_history[price]

        # If qty dropped then refilled to similar level
        if (history and
            traded_qty > 0 and
            abs(visible_qty - history[-1]) < visible_qty * 0.2):
            history.append(visible_qty)
        else:
            history.append(visible_qty)

        # Repeated refills suggest iceberg
        if len(history) >= self.refill_threshold:
            refills = sum(1 for i in range(1, len(history))
                         if abs(history[i] - history[i-1]) < history[i] * 0.2)
            if refills >= self.refill_threshold - 1:
                return True
        return False

detector = IcebergDetector(refill_threshold=3)
# Simulated: price 22450 keeps showing 200 qty after fills
for _ in range(4):
    result = detector.update(22450.0, 200, 200)
print(f"Iceberg detected: {result}")  # True`}
      </CodeBlock>

      <NoteBlock title="NSE Disclosed Quantity Rules">
        On NSE, the disclosed quantity must be at least 10% of the total
        order quantity. So a 200-lot disclosed order implies at least 2000
        total lots. Watch for prices that keep refilling after trades --
        this is the hallmark of institutional accumulation.
      </NoteBlock>

      <CodeBlock language="python" title="Volume Anomaly at Price Level">
{`def detect_hidden_volume(trades_at_price, visible_qty):
    """If executed volume far exceeds visible qty, hidden orders exist."""
    total_traded = sum(t['qty'] for t in trades_at_price)
    ratio = total_traded / max(visible_qty, 1)
    if ratio > 3.0:
        print(f"Hidden volume ratio: {ratio:.1f}x visible")
        return True
    return False`}
      </CodeBlock>
    </SectionLayout>
  )
}
