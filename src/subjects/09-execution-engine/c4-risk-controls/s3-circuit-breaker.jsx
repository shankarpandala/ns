import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function CircuitBreaker() {
  return (
    <SectionLayout
      title="Max Drawdown Circuit Breaker"
      description="Automated trading halts when drawdown or daily loss limits are breached."
    >
      <DefinitionBlock term="Trading Circuit Breaker">
        An automated safety mechanism that halts all new order generation when
        predefined loss thresholds are hit. Unlike exchange circuit breakers,
        these are self-imposed limits to protect capital.
      </DefinitionBlock>

      <CodeBlock language="python" title="Multi-Level Circuit Breaker">
{`from datetime import datetime, date
from enum import Enum

class AlertLevel(Enum):
    GREEN = "GREEN"
    YELLOW = "YELLOW"
    RED = "RED"
    HALTED = "HALTED"

class TradingCircuitBreaker:
    """Multi-level circuit breaker for automated trading."""

    def __init__(self, config):
        self.config = config
        self.daily_pnl = 0.0
        self.peak_equity = config['starting_equity']
        self.current_equity = config['starting_equity']
        self.status = AlertLevel.GREEN
        self.halt_reason = None
        self.trade_date = date.today()

    def update(self, pnl_change):
        if date.today() != self.trade_date:
            self.daily_pnl = 0.0
            self.trade_date = date.today()

        self.daily_pnl += pnl_change
        self.current_equity += pnl_change
        self.peak_equity = max(self.peak_equity, self.current_equity)
        self._evaluate()

    def _evaluate(self):
        daily_loss_pct = abs(self.daily_pnl) / self.peak_equity if self.daily_pnl < 0 else 0
        drawdown = (self.peak_equity - self.current_equity) / self.peak_equity

        # Level 1: Yellow - reduce position sizes by 50%
        if daily_loss_pct > self.config['yellow_daily_loss']:
            self.status = AlertLevel.YELLOW

        # Level 2: Red - no new positions, close at opportunity
        if daily_loss_pct > self.config['red_daily_loss']:
            self.status = AlertLevel.RED

        # Level 3: Halt - flatten everything immediately
        if daily_loss_pct > self.config['halt_daily_loss']:
            self.status = AlertLevel.HALTED
            self.halt_reason = f"Daily loss {daily_loss_pct:.1%}"

        # Max drawdown halt
        if drawdown > self.config['max_drawdown']:
            self.status = AlertLevel.HALTED
            self.halt_reason = f"Drawdown {drawdown:.1%}"

    def can_trade(self):
        return self.status in (AlertLevel.GREEN, AlertLevel.YELLOW)

    def position_scale_factor(self):
        if self.status == AlertLevel.YELLOW:
            return 0.5
        if self.status in (AlertLevel.RED, AlertLevel.HALTED):
            return 0.0
        return 1.0

# Configuration
config = {
    'starting_equity': 1_000_000,
    'yellow_daily_loss': 0.01,  # 1% daily loss
    'red_daily_loss': 0.02,     # 2% daily loss
    'halt_daily_loss': 0.03,    # 3% daily loss = full halt
    'max_drawdown': 0.10,       # 10% peak drawdown = halt
}
cb = TradingCircuitBreaker(config)`}
      </CodeBlock>

      <NoteBlock title="Recovery Protocol">
        After a HALTED state, require manual review before resuming trading.
        Do not auto-resume the next day. Analyze what caused the drawdown,
        check for strategy degradation, and only resume with reduced size
        (50% of normal) for the first week back.
      </NoteBlock>
    </SectionLayout>
  )
}
