import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PreTradeRisk() {
  return (
    <SectionLayout
      title="Pre-Trade Risk Checks"
      description="Validating order size, exposure, and concentration before submission."
    >
      <DefinitionBlock term="Pre-Trade Risk Check">
        A gatekeeper layer that validates every order against risk limits before
        it reaches the broker API. Prevents fat-finger errors, excessive exposure,
        and concentration risk.
      </DefinitionBlock>

      <CodeBlock language="python" title="Pre-Trade Risk Gate">
{`from dataclasses import dataclass

@dataclass
class RiskLimits:
    max_order_value: float = 500_000     # Rs 5L per order
    max_position_value: float = 2_000_000 # Rs 20L per symbol
    max_portfolio_exposure: float = 5_000_000
    max_concentration_pct: float = 0.25   # 25% in one symbol
    max_orders_per_minute: int = 10
    allowed_symbols: list = None

class PreTradeRiskGate:
    """Validate orders before submission to broker."""

    def __init__(self, limits: RiskLimits, portfolio):
        self.limits = limits
        self.portfolio = portfolio
        self.recent_orders = []

    def validate(self, order) -> tuple:
        checks = [
            self._check_order_size(order),
            self._check_position_limit(order),
            self._check_concentration(order),
            self._check_portfolio_exposure(order),
            self._check_rate(order),
            self._check_symbol_allowed(order),
        ]
        failures = [msg for passed, msg in checks if not passed]
        return (len(failures) == 0, failures)

    def _check_order_size(self, order):
        value = order['price'] * order['quantity']
        ok = value <= self.limits.max_order_value
        return (ok, f"Order value {value:,.0f} exceeds limit {self.limits.max_order_value:,.0f}")

    def _check_position_limit(self, order):
        current = self.portfolio.get_position_value(order['symbol'])
        new_value = current + order['price'] * order['quantity']
        ok = new_value <= self.limits.max_position_value
        return (ok, f"Position in {order['symbol']} would exceed limit")

    def _check_concentration(self, order):
        total = self.portfolio.total_value()
        pos_value = self.portfolio.get_position_value(order['symbol'])
        conc = pos_value / total if total > 0 else 0
        ok = conc <= self.limits.max_concentration_pct
        return (ok, f"Concentration {conc:.0%} exceeds {self.limits.max_concentration_pct:.0%}")

    def _check_portfolio_exposure(self, order):
        exposure = self.portfolio.total_exposure()
        ok = exposure <= self.limits.max_portfolio_exposure
        return (ok, f"Portfolio exposure {exposure:,.0f} at limit")

    def _check_rate(self, order):
        import time
        now = time.time()
        self.recent_orders = [t for t in self.recent_orders if now - t < 60]
        ok = len(self.recent_orders) < self.limits.max_orders_per_minute
        self.recent_orders.append(now)
        return (ok, "Order rate limit exceeded")

    def _check_symbol_allowed(self, order):
        if self.limits.allowed_symbols is None:
            return (True, "")
        ok = order['symbol'] in self.limits.allowed_symbols
        return (ok, f"{order['symbol']} not in allowed list")`}
      </CodeBlock>

      <NoteBlock title="Defense in Depth">
        Pre-trade checks are your first line of defense. Even if your strategy
        logic has a bug that generates a massive order, the risk gate blocks it.
        Log every rejected order for review -- frequent rejections often indicate
        a strategy bug.
      </NoteBlock>
    </SectionLayout>
  )
}
