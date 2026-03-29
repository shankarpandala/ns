import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function GttOrders() {
  return (
    <SectionLayout
      title="Good Till Triggered (GTT) Orders"
      description="Using Zerodha GTT orders for swing trades and long-term stop-losses."
    >
      <DefinitionBlock term="GTT Order">
        A trigger-based order that remains active until the trigger condition is
        met or the GTT expires (1 year for single, delivery only). Unlike regular
        orders that expire at day-end, GTTs persist across sessions.
      </DefinitionBlock>

      <CodeBlock language="python" title="GTT Order Types">
{`# Single-leg GTT: Buy RELIANCE if it drops to 2400
gtt_single = kite.place_gtt(
    trigger_type=kite.GTT_TYPE_SINGLE,
    tradingsymbol="RELIANCE",
    exchange=kite.EXCHANGE_NSE,
    trigger_values=[2400.0],
    last_price=2580.0,
    orders=[{
        "transaction_type": kite.TRANSACTION_TYPE_BUY,
        "quantity": 10,
        "price": 2400.0,
        "order_type": kite.ORDER_TYPE_LIMIT,
        "product": kite.PRODUCT_CNC,  # Delivery
    }],
)

# OCO GTT: Target at 2800 OR stop-loss at 2350
gtt_oco = kite.place_gtt(
    trigger_type=kite.GTT_TYPE_OCO,
    tradingsymbol="RELIANCE",
    exchange=kite.EXCHANGE_NSE,
    trigger_values=[2350.0, 2800.0],
    last_price=2580.0,
    orders=[
        {  # Stop-loss leg
            "transaction_type": kite.TRANSACTION_TYPE_SELL,
            "quantity": 10,
            "price": 2345.0,
            "order_type": kite.ORDER_TYPE_LIMIT,
            "product": kite.PRODUCT_CNC,
        },
        {  # Target leg
            "transaction_type": kite.TRANSACTION_TYPE_SELL,
            "quantity": 10,
            "price": 2800.0,
            "order_type": kite.ORDER_TYPE_LIMIT,
            "product": kite.PRODUCT_CNC,
        },
    ],
)`}
      </CodeBlock>

      <CodeBlock language="python" title="GTT Management Helper">
{`class GTTManager:
    """Manage GTT orders for swing trading portfolio."""

    def __init__(self, kite):
        self.kite = kite

    def get_active_gtts(self):
        return [g for g in self.kite.get_gtts()
                if g['status'] == 'active']

    def update_trailing_sl(self, gtt_id, new_trigger, new_price):
        self.kite.delete_gtt(gtt_id)
        # Re-create with new trigger (no modify API for GTT)
        return self.kite.place_gtt(...)

    def cleanup_expired(self):
        for gtt in self.kite.get_gtts():
            if gtt['status'] in ('cancelled', 'rejected', 'disabled'):
                print(f"GTT {gtt['id']} is {gtt['status']}")`}
      </CodeBlock>

      <NoteBlock title="GTT Limitations">
        GTT is only for equity delivery (CNC product). No F&O support. Max 20
        active GTTs per account. GTT triggers check LTP, not intraday high/low,
        so gap-down opens can miss your stop-loss trigger price entirely.
      </NoteBlock>
    </SectionLayout>
  )
}
