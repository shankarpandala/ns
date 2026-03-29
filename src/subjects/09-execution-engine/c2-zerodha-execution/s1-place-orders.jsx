import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PlaceOrders() {
  return (
    <SectionLayout
      title="Place, Modify & Cancel Orders via Kite API"
      description="Core Zerodha Kite Connect order operations for automated trading."
    >
      <DefinitionBlock term="Kite Connect API">
        Zerodha's REST API for programmatic trading. Supports equities, F&O,
        commodities, and currency on NSE/BSE. Requires a paid API subscription
        (Rs 2000/month) and daily login token generation.
      </DefinitionBlock>

      <CodeBlock language="python" title="Order Placement with Kite API">
{`from kiteconnect import KiteConnect

kite = KiteConnect(api_key="your_api_key")
kite.set_access_token("your_access_token")

# Market order - Buy 1 lot Nifty Futures
order_id = kite.place_order(
    variety=kite.VARIETY_REGULAR,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="NIFTY25MARFUT",
    transaction_type=kite.TRANSACTION_TYPE_BUY,
    quantity=75,
    product=kite.PRODUCT_MIS,       # Intraday
    order_type=kite.ORDER_TYPE_MARKET,
)
print(f"Order placed: {order_id}")

# Limit order - Sell Nifty 22000 CE
option_order = kite.place_order(
    variety=kite.VARIETY_REGULAR,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="NIFTY25MAR22000CE",
    transaction_type=kite.TRANSACTION_TYPE_SELL,
    quantity=75,
    product=kite.PRODUCT_NRML,      # Overnight
    order_type=kite.ORDER_TYPE_LIMIT,
    price=150.0,
)

# Modify an open order
kite.modify_order(
    variety=kite.VARIETY_REGULAR,
    order_id=option_order,
    price=145.0,         # New limit price
    quantity=75,
)

# Cancel an open order
kite.cancel_order(
    variety=kite.VARIETY_REGULAR,
    order_id=option_order,
)`}
      </CodeBlock>

      <CodeBlock language="python" title="Robust Order Wrapper with Retries">
{`import time
from kiteconnect.exceptions import (
    NetworkException, TokenException, OrderException
)

def place_order_safe(kite, retries=3, **order_params):
    for attempt in range(retries):
        try:
            order_id = kite.place_order(**order_params)
            return order_id
        except NetworkException:
            time.sleep(0.5 * (attempt + 1))
        except TokenException:
            raise  # Must re-authenticate
        except OrderException as e:
            if "insufficient" in str(e).lower():
                raise  # Margin issue, don't retry
            time.sleep(0.3)
    raise Exception(f"Order failed after {retries} attempts")`}
      </CodeBlock>

      <NoteBlock title="Daily Token Refresh">
        Kite access tokens expire daily. Automate the login flow using
        Selenium or the kite.generate_session() method with the request_token
        from the redirect URL. Store tokens in Redis with a TTL of 8 hours.
      </NoteBlock>
    </SectionLayout>
  )
}
