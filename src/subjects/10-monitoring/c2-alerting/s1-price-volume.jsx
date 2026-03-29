import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PriceVolumeAlerts() {
  return (
    <SectionLayout
      title="Price & Volume Alert Configuration"
      description="Setting up threshold-based and pattern-based alerts for market monitoring."
    >
      <DefinitionBlock term="Alert Engine">
        A system that evaluates market conditions against user-defined rules
        and triggers notifications when conditions are met. Runs on real-time
        tick data from Kite WebSocket feeds.
      </DefinitionBlock>

      <CodeBlock language="python" title="Alert Rule Engine">
{`from dataclasses import dataclass
from enum import Enum
from typing import Callable
from datetime import datetime

class AlertCondition(Enum):
    PRICE_ABOVE = "price_above"
    PRICE_BELOW = "price_below"
    VOLUME_SPIKE = "volume_spike"
    PERCENT_CHANGE = "percent_change"

@dataclass
class AlertRule:
    name: str
    symbol: str
    condition: AlertCondition
    threshold: float
    cooldown_minutes: int = 5
    last_triggered: datetime = None
    active: bool = True

class AlertEngine:
    """Evaluate market data against alert rules."""

    def __init__(self, notifier):
        self.rules = []
        self.notifier = notifier
        self.volume_history = {}

    def add_rule(self, rule: AlertRule):
        self.rules.append(rule)

    def on_tick(self, tick):
        symbol = tick['symbol']
        for rule in self.rules:
            if not rule.active or rule.symbol != symbol:
                continue
            if self._in_cooldown(rule):
                continue

            triggered = False
            message = ""

            if rule.condition == AlertCondition.PRICE_ABOVE:
                if tick['last_price'] > rule.threshold:
                    triggered = True
                    message = f"{symbol} above {rule.threshold}: {tick['last_price']}"

            elif rule.condition == AlertCondition.PRICE_BELOW:
                if tick['last_price'] < rule.threshold:
                    triggered = True
                    message = f"{symbol} below {rule.threshold}: {tick['last_price']}"

            elif rule.condition == AlertCondition.VOLUME_SPIKE:
                avg_vol = self._avg_volume(symbol)
                if avg_vol and tick.get('volume', 0) > avg_vol * rule.threshold:
                    triggered = True
                    message = f"{symbol} volume spike: {tick['volume']} vs avg {avg_vol:.0f}"

            elif rule.condition == AlertCondition.PERCENT_CHANGE:
                change = abs(tick.get('change_pct', 0))
                if change > rule.threshold:
                    triggered = True
                    message = f"{symbol} moved {change:.2f}%"

            if triggered:
                rule.last_triggered = datetime.now()
                self.notifier.send(rule.name, message)

    def _in_cooldown(self, rule):
        if rule.last_triggered is None:
            return False
        elapsed = (datetime.now() - rule.last_triggered).total_seconds()
        return elapsed < rule.cooldown_minutes * 60

    def _avg_volume(self, symbol):
        hist = self.volume_history.get(symbol, [])
        return sum(hist) / len(hist) if hist else None`}
      </CodeBlock>

      <NoteBlock title="Alert Fatigue">
        Limit alerts to actionable events. Set cooldown periods (5-15 minutes)
        to avoid repeated notifications. Group related alerts (e.g., Nifty
        crossing 22000 and BankNifty crossing 48000) into a single summary.
      </NoteBlock>
    </SectionLayout>
  )
}
