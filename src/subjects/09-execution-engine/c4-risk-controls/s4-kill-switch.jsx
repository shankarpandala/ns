import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function KillSwitch() {
  return (
    <SectionLayout
      title="Emergency Kill Switch"
      description="Immediate flatten-all mechanism to close every open position and cancel pending orders."
    >
      <DefinitionBlock term="Kill Switch">
        A one-button emergency mechanism that cancels all pending orders and
        closes all open positions at market price. Critical safety feature for
        any automated trading system operating on real capital.
      </DefinitionBlock>

      <CodeBlock language="python" title="Kill Switch Implementation">
{`import logging
from datetime import datetime

logger = logging.getLogger('kill_switch')

class KillSwitch:
    """Emergency kill switch for all trading activity."""

    def __init__(self, zerodha_client=None, delta_client=None):
        self.zerodha = zerodha_client
        self.delta = delta_client
        self.activated = False
        self.activation_time = None

    def activate(self, reason="manual"):
        logger.critical(f"KILL SWITCH ACTIVATED: {reason}")
        self.activated = True
        self.activation_time = datetime.now()

        results = {'reason': reason, 'timestamp': self.activation_time}

        if self.zerodha:
            results['zerodha'] = self._flatten_zerodha()
        if self.delta:
            results['delta'] = self._flatten_delta()

        self._send_alert(results)
        return results

    def _flatten_zerodha(self):
        """Cancel all orders and close all positions on Zerodha."""
        cancelled = 0
        closed = 0

        # Cancel all pending orders
        for order in self.zerodha.orders():
            if order['status'] in ('OPEN', 'TRIGGER PENDING'):
                try:
                    self.zerodha.cancel_order(
                        variety='regular', order_id=order['order_id']
                    )
                    cancelled += 1
                except Exception as e:
                    logger.error(f"Cancel failed: {order['order_id']}: {e}")

        # Flatten all positions
        for pos in self.zerodha.positions()['net']:
            if pos['quantity'] == 0:
                continue
            side = 'SELL' if pos['quantity'] > 0 else 'BUY'
            try:
                self.zerodha.place_order(
                    variety='regular',
                    exchange=pos['exchange'],
                    tradingsymbol=pos['tradingsymbol'],
                    transaction_type=side,
                    quantity=abs(pos['quantity']),
                    product=pos['product'],
                    order_type='MARKET',
                )
                closed += 1
            except Exception as e:
                logger.error(f"Flatten failed: {pos['tradingsymbol']}: {e}")

        return {'cancelled': cancelled, 'closed': closed}

    def _flatten_delta(self):
        """Close all positions on Delta Exchange."""
        closed = 0
        positions = self.delta.get_positions().get('result', [])
        for pos in positions:
            if pos['size'] == 0:
                continue
            side = 'sell' if pos['size'] > 0 else 'buy'
            self.delta.place_order(
                symbol=pos['symbol'], size=abs(pos['size']),
                side=side, order_type='market_order',
            )
            closed += 1
        return {'closed': closed}

    def _send_alert(self, results):
        logger.critical(f"Kill switch results: {results}")
        # Trigger Telegram/Discord alert here

    def is_active(self):
        return self.activated`}
      </CodeBlock>

      <NoteBlock title="Kill Switch Access">
        Make the kill switch accessible from multiple channels: a CLI command,
        a web dashboard button, a Telegram bot command (/kill), and automatic
        triggering from the circuit breaker. Test the kill switch weekly during
        paper trading to ensure it works when you need it most.
      </NoteBlock>
    </SectionLayout>
  )
}
