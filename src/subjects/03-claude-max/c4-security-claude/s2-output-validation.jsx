import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function OutputValidation() {
  return (
    <SectionLayout
      title="Validating Claude's Trading Decisions"
      subtitle="Guardrails and validation layers for AI-generated trade signals"
      difficulty="advanced"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">Schema Validation</h3>
      <CodeBlock
        language="python"
        title="Validate Claude output with Pydantic"
        code={`from pydantic import BaseModel, field_validator
from typing import Literal

class TradeSignal(BaseModel):
    action: Literal["buy", "sell", "hold"]
    instrument: str
    quantity: int
    price: float
    stop_loss: float
    target: float

    @field_validator("quantity")
    @classmethod
    def check_quantity(cls, v):
        if v <= 0 or v > 1800:  # NIFTY lot size limit
            raise ValueError(f"Invalid quantity: {v}")
        return v

    @field_validator("stop_loss")
    @classmethod
    def check_stop_loss(cls, v, info):
        price = info.data.get("price", 0)
        if abs(v - price) / price > 0.05:
            raise ValueError("Stop loss >5% from entry")
        return v`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Sanity Checks Layer</h3>
      <CodeBlock
        language="python"
        title="Business logic guardrails"
        code={`def validate_trade(signal: TradeSignal, portfolio):
    errors = []
    # Position sizing check
    exposure = signal.quantity * signal.price
    if exposure > portfolio.capital * 0.02:
        errors.append("Position exceeds 2% capital rule")
    # Market hours check
    if not is_market_hours():
        errors.append("Order outside market hours")
    # Duplicate order check
    if portfolio.has_open_order(signal.instrument):
        errors.append("Duplicate order for same instrument")

    if errors:
        raise TradeValidationError(errors)
    return True`}
      />

      <WarningBlock title="Never Trust Raw AI Output for Orders">
        Always pass Claude's output through schema validation, sanity checks, and position
        sizing rules before any interaction with exchange APIs. AI models can hallucinate
        prices, quantities, and instrument names.
      </WarningBlock>

      <NoteBlock type="tip" title="Human-in-the-Loop">
        <p>For live trading, add a confirmation step: display the validated trade on a Telegram
        bot and wait for manual approval before execution. Remove this gate only for paper trading.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
