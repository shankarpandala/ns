import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function BracketCover() {
  return (
    <SectionLayout
      title="Bracket & Cover Orders"
      description="Using Zerodha bracket and cover orders for built-in risk management."
    >
      <DefinitionBlock term="Bracket Order (BO)">
        A three-legged order: entry + stop-loss + target. When entry fills,
        SL and target are placed automatically. When either SL or target hits,
        the other is cancelled. Provides lower margin requirements.
      </DefinitionBlock>

      <DefinitionBlock term="Cover Order (CO)">
        A two-legged order: entry + compulsory stop-loss. Offers reduced margin
        since risk is capped. Available for intraday (MIS) trades only.
      </DefinitionBlock>

      <CodeBlock language="python" title="Bracket Order on Nifty Futures">
{`# Bracket order: Buy Nifty Futures with SL and target
bo_order = kite.place_order(
    variety=kite.VARIETY_BO,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="NIFTY25MARFUT",
    transaction_type=kite.TRANSACTION_TYPE_BUY,
    quantity=75,
    product=kite.PRODUCT_MIS,
    order_type=kite.ORDER_TYPE_LIMIT,
    price=22500,
    squareoff=50,        # Target: 50 points profit
    stoploss=30,         # Stop: 30 points loss
    trailing_stoploss=10, # Trail SL by 10 points
)

# Cover order: Sell BankNifty with compulsory SL
co_order = kite.place_order(
    variety=kite.VARIETY_CO,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="BANKNIFTY25MARFUT",
    transaction_type=kite.TRANSACTION_TYPE_SELL,
    quantity=30,
    product=kite.PRODUCT_MIS,
    order_type=kite.ORDER_TYPE_MARKET,
    trigger_price=48100,  # SL trigger for short
)`}
      </CodeBlock>

      <CodeBlock language="python" title="Managing Bracket Order Legs">
{`def manage_bracket_order(kite, parent_order_id):
    """Monitor and adjust bracket order legs."""
    orders = kite.order_history(parent_order_id)
    child_orders = [o for o in kite.orders()
                    if o.get('parent_order_id') == parent_order_id]

    for child in child_orders:
        if child['order_type'] == 'SL':
            # Modify stop-loss price if needed
            kite.modify_order(
                variety=kite.VARIETY_BO,
                order_id=child['order_id'],
                parent_order_id=parent_order_id,
                trigger_price=new_sl_trigger,
            )

    return child_orders`}
      </CodeBlock>

      <NoteBlock title="BO/CO Restrictions">
        Zerodha periodically disables bracket orders during high volatility.
        BO is not available for options. CO is intraday only. Always have
        fallback logic that places regular orders with separate SL orders
        when BO/CO varieties are unavailable.
      </NoteBlock>
    </SectionLayout>
  )
}
