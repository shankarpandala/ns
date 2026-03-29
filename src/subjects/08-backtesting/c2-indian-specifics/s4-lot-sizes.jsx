import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function LotSizes() {
  return (
    <SectionLayout
      title="F&O Lot Sizes & Margin Requirements"
      description="Handling NSE F&O lot sizes, SPAN margin, and exposure margin in backtests."
    >
      <DefinitionBlock term="SPAN Margin">
        Standard Portfolio Analysis of Risk -- the initial margin computed by
        NSE using a scenario-based approach. SPAN calculates potential portfolio
        losses across 16 price/volatility scenarios and takes the worst case.
      </DefinitionBlock>

      <CodeBlock language="python" title="Lot Size Reference and Position Sizing">
{`# Common NSE F&O lot sizes (as of 2025, subject to revision)
LOT_SIZES = {
    'NIFTY': 75,
    'BANKNIFTY': 30,     # Reduced from 25 in 2024
    'FINNIFTY': 65,
    'RELIANCE': 250,
    'TCS': 150,
    'INFY': 300,
    'HDFCBANK': 550,
    'ICICIBANK': 700,
    'SBIN': 750,
    'TATAMOTORS': 575,
}

class FnOPositionSizer:
    """Size positions in valid lot multiples."""

    def __init__(self, capital: float, max_risk_pct: float = 0.02):
        self.capital = capital
        self.max_risk = max_risk_pct

    def calculate_lots(self, symbol, entry_price, stop_loss):
        lot_size = LOT_SIZES.get(symbol, 1)
        risk_per_unit = abs(entry_price - stop_loss)
        max_risk_amount = self.capital * self.max_risk

        max_units = max_risk_amount / risk_per_unit
        lots = int(max_units // lot_size)
        return max(lots, 0)  # Never negative

    def margin_required(self, symbol, price, lots, margin_pct=0.15):
        lot_size = LOT_SIZES.get(symbol, 1)
        notional = price * lot_size * lots
        return notional * margin_pct

# Example: Rs 10L capital, Nifty at 22000, SL at 21900
sizer = FnOPositionSizer(capital=1_000_000)
lots = sizer.calculate_lots('NIFTY', 22000, 21900)
margin = sizer.margin_required('NIFTY', 22000, lots)
print(f"Lots: {lots}, Margin needed: Rs {margin:,.0f}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Dynamic Margin Tracking in Backtest">
{`class MarginTracker:
    """Track margin utilization during backtest."""

    def __init__(self, total_capital):
        self.total = total_capital
        self.used_margin = 0.0

    def can_take_position(self, required_margin):
        available = self.total - self.used_margin
        return required_margin <= available * 0.9  # 10% buffer

    def add_position(self, margin):
        self.used_margin += margin

    def release_margin(self, margin):
        self.used_margin = max(0, self.used_margin - margin)

    def utilization(self):
        return self.used_margin / self.total`}
      </CodeBlock>

      <NoteBlock title="Lot Size Revisions">
        SEBI periodically revises lot sizes to keep contract values between
        Rs 5-10 lakhs. After lot size changes, backtest results can shift
        due to different position granularity. Always use historically correct
        lot sizes for each period in your backtest.
      </NoteBlock>
    </SectionLayout>
  )
}
