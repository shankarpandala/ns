import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function AuditTrail() {
  return (
    <SectionLayout
      title="Audit Trail & Compliance Logging"
      description="Maintaining comprehensive trade records for analysis, debugging, and regulatory compliance."
    >
      <DefinitionBlock term="Audit Trail">
        A chronological record of every trading decision, order, fill, and
        system event. Essential for post-trade analysis, debugging strategy
        issues, and meeting SEBI record-keeping requirements for algo trading.
      </DefinitionBlock>

      <CodeBlock language="python" title="Structured Audit Logger">
{`import json
import logging
from datetime import datetime
from pathlib import Path

class AuditLogger:
    """Immutable audit trail for all trading activity."""

    def __init__(self, log_dir="logs/audit"):
        Path(log_dir).mkdir(parents=True, exist_ok=True)
        self.logger = logging.getLogger('audit')
        handler = logging.FileHandler(
            f"{log_dir}/audit_{datetime.now():%Y%m%d}.jsonl"
        )
        handler.setFormatter(logging.Formatter('%(message)s'))
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)

    def log_event(self, event_type, data):
        record = {
            'timestamp': datetime.now().isoformat(),
            'event_type': event_type,
            **data,
        }
        self.logger.info(json.dumps(record))

    def log_signal(self, strategy, symbol, direction, reason):
        self.log_event('SIGNAL', {
            'strategy': strategy,
            'symbol': symbol,
            'direction': direction,
            'reason': reason,
        })

    def log_order(self, order_id, symbol, side, qty, price, order_type):
        self.log_event('ORDER_SUBMITTED', {
            'order_id': order_id, 'symbol': symbol,
            'side': side, 'quantity': qty,
            'price': price, 'order_type': order_type,
        })

    def log_fill(self, order_id, fill_price, fill_qty, commission):
        self.log_event('ORDER_FILLED', {
            'order_id': order_id, 'fill_price': fill_price,
            'fill_qty': fill_qty, 'commission': commission,
        })

    def log_risk_event(self, event, details):
        self.log_event('RISK_EVENT', {
            'event': event, 'details': details,
        })

audit = AuditLogger()
audit.log_signal('mean_reversion', 'NIFTY25MARFUT', 'BUY', 'RSI < 30')
audit.log_order('ORD001', 'NIFTY25MARFUT', 'BUY', 75, 22000, 'LIMIT')`}
      </CodeBlock>

      <CodeBlock language="python" title="Audit Report Generator">
{`import pandas as pd

class AuditReporter:
    def __init__(self, audit_file):
        records = []
        with open(audit_file) as f:
            for line in f:
                records.append(json.loads(line))
        self.df = pd.DataFrame(records)

    def daily_summary(self):
        fills = self.df[self.df['event_type'] == 'ORDER_FILLED']
        return {
            'total_orders': len(self.df[self.df['event_type'] == 'ORDER_SUBMITTED']),
            'total_fills': len(fills),
            'total_commission': fills['commission'].sum(),
            'risk_events': len(self.df[self.df['event_type'] == 'RISK_EVENT']),
        }`}
      </CodeBlock>

      <NoteBlock title="SEBI Algo Trading Requirements">
        SEBI requires algo traders to maintain detailed order logs including
        timestamps, strategy identifiers, and modification history. Retain
        records for a minimum of 5 years. Use append-only JSONL files that
        cannot be retroactively modified.
      </NoteBlock>
    </SectionLayout>
  )
}
