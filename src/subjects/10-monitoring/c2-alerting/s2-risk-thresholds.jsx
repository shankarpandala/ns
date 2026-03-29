import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function RiskThresholds() {
  return (
    <SectionLayout
      title="Risk Threshold Notifications"
      description="Alerting on margin utilization, drawdown levels, and exposure breaches."
    >
      <DefinitionBlock term="Risk Threshold Alert">
        Notifications triggered when portfolio risk metrics exceed predefined
        limits. These serve as early warnings before circuit breakers activate,
        allowing manual intervention.
      </DefinitionBlock>

      <CodeBlock language="python" title="Risk Alert Monitor">
{`from dataclasses import dataclass
from typing import List

@dataclass
class RiskThreshold:
    metric: str
    warning_level: float
    critical_level: float
    current_value: float = 0.0

class RiskAlertMonitor:
    """Monitor portfolio risk metrics and send alerts."""

    def __init__(self, portfolio, notifier):
        self.portfolio = portfolio
        self.notifier = notifier
        self.thresholds = self._default_thresholds()

    def _default_thresholds(self):
        return [
            RiskThreshold('margin_utilization', warning=0.70, critical=0.85),
            RiskThreshold('daily_drawdown', warning=0.015, critical=0.025),
            RiskThreshold('max_drawdown', warning=0.05, critical=0.08),
            RiskThreshold('single_position_pct', warning=0.20, critical=0.30),
            RiskThreshold('net_delta_nifty_lots', warning=5, critical=10),
            RiskThreshold('open_orders_count', warning=15, critical=25),
        ]

    def check_all(self):
        metrics = self._compute_metrics()
        alerts = []

        for threshold in self.thresholds:
            value = metrics.get(threshold.metric, 0)
            threshold.current_value = value

            if value >= threshold.critical_level:
                alerts.append({
                    'level': 'CRITICAL',
                    'metric': threshold.metric,
                    'value': value,
                    'limit': threshold.critical_level,
                })
            elif value >= threshold.warning_level:
                alerts.append({
                    'level': 'WARNING',
                    'metric': threshold.metric,
                    'value': value,
                    'limit': threshold.warning_level,
                })

        for alert in alerts:
            self.notifier.send(
                f"RISK {alert['level']}: {alert['metric']}",
                f"Current: {alert['value']:.3f}, Limit: {alert['limit']:.3f}",
            )
        return alerts

    def _compute_metrics(self):
        margins = self.portfolio.get_margins()
        positions = self.portfolio.get_positions()
        equity = self.portfolio.get_equity()

        used = margins.get('used', 0)
        available = margins.get('available', 1)

        return {
            'margin_utilization': used / (used + available),
            'daily_drawdown': self.portfolio.daily_drawdown(),
            'max_drawdown': self.portfolio.max_drawdown(),
            'single_position_pct': self.portfolio.max_concentration(),
            'net_delta_nifty_lots': abs(self.portfolio.net_delta()) / 75,
            'open_orders_count': len(self.portfolio.open_orders()),
        }

# Check every 30 seconds during market hours
monitor = RiskAlertMonitor(portfolio, telegram_notifier)
alerts = monitor.check_all()
if alerts:
    print(f"Active alerts: {len(alerts)}")`}
      </CodeBlock>

      <NoteBlock title="Escalation Path">
        WARNING alerts are informational -- log and display on dashboard.
        CRITICAL alerts should trigger Telegram/Discord notifications and
        auto-reduce position sizes by 50%. If two CRITICAL alerts fire within
        5 minutes, auto-activate the kill switch.
      </NoteBlock>
    </SectionLayout>
  )
}
