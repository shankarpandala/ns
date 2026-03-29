import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ExecutionHandler() {
  return (
    <SectionLayout
      title="Execution Simulation & Slippage Modeling"
      description="Realistic fill simulation with slippage, market impact, and latency modeling."
    >
      <DefinitionBlock term="Slippage">
        The difference between the expected execution price and the actual fill
        price. On NSE, slippage varies by instrument liquidity -- Nifty futures
        may see 0.5-2 points while illiquid stock options can slip 5-10%.
      </DefinitionBlock>

      <CodeBlock language="python" title="Simulated Broker with Slippage">
{`import random
from dataclasses import dataclass

@dataclass
class Fill:
    symbol: str
    side: str
    price: float
    quantity: int
    commission: float
    slippage: float

class SimulatedBroker:
    """Simulates order execution with realistic slippage."""

    def __init__(self, slippage_pct=0.01, commission_per_order=20.0):
        self.slippage_pct = slippage_pct
        self.commission = commission_per_order

    def execute_order(self, order_event):
        data = order_event.data
        price = data['price']

        # Model slippage as random within bounds
        slip_factor = random.uniform(0, self.slippage_pct) / 100
        if data['side'] == 'BUY':
            fill_price = price * (1 + slip_factor)
        else:
            fill_price = price * (1 - slip_factor)

        slippage = abs(fill_price - price) * data['quantity']

        return Fill(
            symbol=data['symbol'],
            side=data['side'],
            price=round(fill_price, 2),
            quantity=data['quantity'],
            commission=self.commission,
            slippage=round(slippage, 2),
        )`}
      </CodeBlock>

      <CodeBlock language="python" title="Volume-Based Market Impact Model">
{`class MarketImpactBroker(SimulatedBroker):
    """Slippage scales with order size relative to bar volume."""

    def __init__(self, impact_coeff=0.1):
        super().__init__()
        self.impact_coeff = impact_coeff

    def calculate_impact(self, order_qty, bar_volume, price):
        participation = order_qty / max(bar_volume, 1)
        impact_bps = self.impact_coeff * (participation ** 0.5) * 10000
        return price * impact_bps / 10000

    def execute_order(self, order_event):
        data = order_event.data
        impact = self.calculate_impact(
            data['quantity'], data['bar_volume'], data['price']
        )
        if data['side'] == 'BUY':
            data['price'] += impact
        else:
            data['price'] -= impact
        return super().execute_order(order_event)`}
      </CodeBlock>

      <NoteBlock title="Realistic Assumptions">
        For Nifty options, model slippage of at least 1-2 rupees per lot for
        ATM strikes and 3-5 rupees for OTM. During expiry-day trading, slippage
        can spike dramatically in the last hour. Always overestimate slippage
        in backtests to avoid live trading surprises.
      </NoteBlock>
    </SectionLayout>
  )
}
