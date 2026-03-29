import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SystemErrors() {
  return (
    <SectionLayout
      title="System Error Alerts"
      description="Detecting and alerting on API failures, connection drops, and application errors."
    >
      <DefinitionBlock term="Error Classification">
        System errors are categorized by severity: TRANSIENT (retry-able network
        blips), DEGRADED (partial functionality loss), and FATAL (system must
        stop trading). Each category triggers different response actions.
      </DefinitionBlock>

      <CodeBlock language="python" title="Error Alert System">
{`import logging
import traceback
from datetime import datetime, timedelta
from collections import defaultdict

class ErrorAlertSystem:
    """Classify and alert on system errors."""

    TRANSIENT_PATTERNS = ['ConnectionReset', 'Timeout', 'TooManyRequests']
    FATAL_PATTERNS = ['TokenExpired', 'InsufficientMargin', 'PermissionDenied']

    def __init__(self, notifier):
        self.notifier = notifier
        self.error_counts = defaultdict(int)
        self.error_window = []
        self.logger = logging.getLogger('error_alerts')

    def handle_error(self, error: Exception, context: str = ""):
        error_type = type(error).__name__
        error_msg = str(error)
        severity = self._classify(error_type, error_msg)

        self.error_counts[error_type] += 1
        self.error_window.append({
            'time': datetime.now(),
            'type': error_type,
            'severity': severity,
        })

        self.logger.error(f"[{severity}] {context}: {error_type}: {error_msg}")

        if severity == 'FATAL':
            self.notifier.send(
                "FATAL SYSTEM ERROR",
                f"{context}: {error_type}\n{error_msg}\nAction: HALT TRADING",
                priority='urgent',
            )
        elif severity == 'DEGRADED':
            self.notifier.send(
                "System Degraded",
                f"{context}: {error_type}\n{error_msg}",
            )
        elif self._is_error_storm(error_type):
            self.notifier.send(
                "Error Storm Detected",
                f"{error_type} occurred {self.error_counts[error_type]} times",
            )

    def _classify(self, error_type, error_msg):
        combined = f"{error_type} {error_msg}"
        if any(p in combined for p in self.FATAL_PATTERNS):
            return 'FATAL'
        if any(p in combined for p in self.TRANSIENT_PATTERNS):
            return 'TRANSIENT'
        return 'DEGRADED'

    def _is_error_storm(self, error_type, threshold=10, window_min=5):
        """Detect if too many errors of same type in short window."""
        cutoff = datetime.now() - timedelta(minutes=window_min)
        recent = [e for e in self.error_window
                  if e['time'] > cutoff and e['type'] == error_type]
        return len(recent) >= threshold

    def error_summary(self):
        return dict(self.error_counts)

# Integration with trading system
error_system = ErrorAlertSystem(telegram_notifier)

try:
    order_id = kite.place_order(...)
except Exception as e:
    error_system.handle_error(e, context="place_order:NIFTY")`}
      </CodeBlock>

      <NoteBlock title="Error Storms">
        During Zerodha maintenance windows or exchange outages, you may see
        hundreds of connection errors per minute. Implement error deduplication
        to avoid flooding your notification channels. One summary alert every
        5 minutes is better than 500 individual alerts.
      </NoteBlock>
    </SectionLayout>
  )
}
