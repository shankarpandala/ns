import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PositionSizing() {
  return (
    <SectionLayout
      title="Position Sizing Methods"
      description="Kelly criterion, fixed fractional, and risk-per-trade sizing for Indian markets."
    >
      <DefinitionBlock term="Kelly Criterion">
        Optimal bet size formula: f* = (bp - q) / b, where b = odds ratio,
        p = win probability, q = 1-p. Maximizes long-term growth rate but
        produces aggressive sizing. Practitioners use fractional Kelly (25-50%).
      </DefinitionBlock>

      <CodeBlock language="python" title="Position Sizing Algorithms">
{`import numpy as np

class PositionSizer:
    """Multiple position sizing methods."""

    def __init__(self, capital: float):
        self.capital = capital

    def fixed_fractional(self, risk_pct, entry, stop_loss, lot_size=1):
        """Risk a fixed % of capital per trade."""
        risk_amount = self.capital * risk_pct
        risk_per_unit = abs(entry - stop_loss)
        units = risk_amount / risk_per_unit
        lots = int(units // lot_size)
        return max(lots, 0) * lot_size

    def kelly_criterion(self, win_rate, avg_win, avg_loss, fraction=0.25):
        """Fractional Kelly sizing."""
        if avg_loss == 0:
            return 0
        b = avg_win / avg_loss  # Win/loss ratio
        p = win_rate
        q = 1 - p
        kelly_pct = (b * p - q) / b
        return max(0, kelly_pct * fraction)  # Fractional Kelly

    def volatility_based(self, atr, risk_pct=0.02, lot_size=1):
        """Size based on ATR (Average True Range)."""
        risk_amount = self.capital * risk_pct
        # Use 2x ATR as stop distance
        stop_distance = 2 * atr
        units = risk_amount / stop_distance
        return int(units // lot_size) * lot_size

    def equal_weight(self, num_positions, price, lot_size=1):
        """Equal capital allocation across positions."""
        per_position = self.capital / num_positions
        units = per_position / price
        return int(units // lot_size) * lot_size

# Example: Rs 10L capital, Nifty at 22000, SL at 21900
sizer = PositionSizer(1_000_000)

# Risk 2% per trade
qty = sizer.fixed_fractional(0.02, 22000, 21900, lot_size=75)
print(f"Fixed fractional: {qty} units ({qty//75} lots)")

# Kelly with 55% win rate, 1.5:1 reward:risk
kelly_pct = sizer.kelly_criterion(0.55, 150, 100, fraction=0.25)
print(f"Kelly allocation: {kelly_pct:.1%} of capital")

# ATR-based with Nifty ATR of 200 points
qty_vol = sizer.volatility_based(200, lot_size=75)
print(f"Volatility-based: {qty_vol} units")`}
      </CodeBlock>

      <NoteBlock title="Practical Sizing for Indian F&O">
        With Nifty lot size of 75 and contract value around Rs 16-17 lakhs,
        a Rs 10L account can hold at most 1 lot with NRML margin. Use fixed
        fractional (1-2% risk) for F&O. Never size based on full Kelly -- it
        leads to 30-50% drawdowns that are psychologically devastating.
      </NoteBlock>
    </SectionLayout>
  )
}
