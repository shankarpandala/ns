import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OrderReconciliation() {
  return (
    <SectionLayout
      title="Order Reconciliation"
      description="Synchronizing local order state with exchange state to detect and resolve discrepancies."
    >
      <DefinitionBlock term="Order Reconciliation">
        The process of comparing local order records against the broker/exchange
        records to ensure consistency. Discrepancies can arise from network
        failures, race conditions, or missed WebSocket updates.
      </DefinitionBlock>

      <CodeBlock language="python" title="Order Reconciliation Engine">
{`import logging
from datetime import datetime

logger = logging.getLogger('reconciliation')

class OrderReconciler:
    """Reconcile local orders with broker state."""

    def __init__(self, broker, local_store):
        self.broker = broker
        self.store = local_store

    def reconcile(self):
        """Compare local orders with broker orders."""
        broker_orders = {o['order_id']: o for o in self.broker.orders()}
        local_orders = self.store.get_active_orders()

        discrepancies = []

        for order_id, local in local_orders.items():
            broker = broker_orders.get(order_id)
            if not broker:
                discrepancies.append({
                    'type': 'MISSING_AT_BROKER',
                    'order_id': order_id,
                    'local_status': local['status'],
                })
                continue

            if local['status'] != broker['status']:
                discrepancies.append({
                    'type': 'STATUS_MISMATCH',
                    'order_id': order_id,
                    'local_status': local['status'],
                    'broker_status': broker['status'],
                })

            if local.get('filled_qty', 0) != broker.get('filled_quantity', 0):
                discrepancies.append({
                    'type': 'FILL_QTY_MISMATCH',
                    'order_id': order_id,
                    'local_filled': local.get('filled_qty'),
                    'broker_filled': broker.get('filled_quantity'),
                })

        # Check for broker orders not tracked locally
        for order_id in broker_orders:
            if order_id not in local_orders:
                discrepancies.append({
                    'type': 'UNKNOWN_BROKER_ORDER',
                    'order_id': order_id,
                    'broker_status': broker_orders[order_id]['status'],
                })

        return discrepancies

    def resolve(self, discrepancies):
        for d in discrepancies:
            if d['type'] == 'STATUS_MISMATCH':
                # Trust broker as source of truth
                self.store.update_order(d['order_id'], {
                    'status': d['broker_status']
                })
                logger.info(f"Fixed {d['order_id']}: {d['local_status']} -> {d['broker_status']}")

            elif d['type'] == 'FILL_QTY_MISMATCH':
                self.store.update_order(d['order_id'], {
                    'filled_qty': d['broker_filled']
                })

            elif d['type'] == 'UNKNOWN_BROKER_ORDER':
                logger.warning(f"Unknown order at broker: {d['order_id']}")

# Run reconciliation every 60 seconds
reconciler = OrderReconciler(kite, order_store)
issues = reconciler.reconcile()
if issues:
    logger.warning(f"Found {len(issues)} discrepancies")
    reconciler.resolve(issues)`}
      </CodeBlock>

      <NoteBlock title="Reconciliation Frequency">
        Run reconciliation every 30-60 seconds during market hours. Also trigger
        it immediately after WebSocket reconnection and at market open/close.
        Always treat the broker state as the source of truth -- your local
        state must conform to it.
      </NoteBlock>
    </SectionLayout>
  )
}
