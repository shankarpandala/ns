import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DeltaTestnet() {
  return (
    <SectionLayout
      title="Delta Exchange Testnet"
      description="Using Delta Exchange testnet for risk-free crypto derivatives testing."
    >
      <DefinitionBlock term="Delta Testnet">
        A full sandbox environment at testnet.delta.exchange with simulated USDT
        balance. Supports the same REST and WebSocket APIs as production, with
        real-time price feeds mirroring mainnet markets.
      </DefinitionBlock>

      <CodeBlock language="python" title="Connecting to Delta Testnet">
{`import requests
import hashlib
import hmac
import time

class DeltaTestnetClient:
    """Client for Delta Exchange testnet."""

    BASE_URL = "https://testnet-api.delta.exchange/v2"

    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret

    def _sign(self, method, path, body=''):
        timestamp = str(int(time.time()))
        message = f"{method}{timestamp}{path}{body}"
        signature = hmac.new(
            self.api_secret.encode(), message.encode(), hashlib.sha256
        ).hexdigest()
        return {
            'api-key': self.api_key,
            'timestamp': timestamp,
            'signature': signature,
        }

    def get_wallet(self):
        path = "/wallet/balances"
        headers = self._sign("GET", path)
        resp = requests.get(f"{self.BASE_URL}{path}", headers=headers)
        return resp.json()

    def place_order(self, symbol, size, side, order_type='limit_order',
                    limit_price=None):
        path = "/orders"
        body = {
            'product_symbol': symbol,
            'size': size,
            'side': side,
            'order_type': order_type,
        }
        if limit_price:
            body['limit_price'] = str(limit_price)

        import json
        body_str = json.dumps(body)
        headers = self._sign("POST", path, body_str)
        headers['Content-Type'] = 'application/json'
        resp = requests.post(
            f"{self.BASE_URL}{path}", headers=headers, data=body_str
        )
        return resp.json()

# Connect to testnet (free signup at testnet.delta.exchange)
client = DeltaTestnetClient("testnet_key", "testnet_secret")
print(client.get_wallet())

# Place a test BTC perpetual order
result = client.place_order(
    symbol="BTCUSDT", size=10, side="buy",
    order_type="limit_order", limit_price="60000"
)`}
      </CodeBlock>

      <NoteBlock title="Testnet Limitations">
        Delta testnet order book is thin -- slippage and fill behavior will not
        match production. Use testnet for API integration testing and order flow
        logic, not for performance evaluation. Always validate strategy returns
        separately using historical backtests.
      </NoteBlock>
    </SectionLayout>
  )
}
