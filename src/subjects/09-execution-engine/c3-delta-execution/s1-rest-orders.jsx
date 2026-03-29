import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DeltaRestOrders() {
  return (
    <SectionLayout
      title="Delta Exchange REST API Orders"
      description="Placing and managing orders on Delta Exchange for crypto derivatives."
    >
      <DefinitionBlock term="Delta Exchange">
        An Indian-origin crypto derivatives exchange offering perpetual futures,
        options, and spreads on BTC, ETH, and other assets. Provides both REST
        and WebSocket APIs with USDT-margined contracts.
      </DefinitionBlock>

      <CodeBlock language="python" title="Delta Exchange Order Client">
{`import requests
import hmac
import hashlib
import json
import time

class DeltaClient:
    BASE_URL = "https://api.delta.exchange/v2"

    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret

    def _headers(self, method, path, body=''):
        timestamp = str(int(time.time()))
        msg = f"{method}{timestamp}{path}{body}"
        sig = hmac.new(
            self.api_secret.encode(), msg.encode(), hashlib.sha256
        ).hexdigest()
        return {
            'api-key': self.api_key,
            'timestamp': timestamp,
            'signature': sig,
            'Content-Type': 'application/json',
        }

    def place_order(self, symbol, size, side, order_type='limit_order',
                    limit_price=None, stop_price=None):
        path = "/orders"
        body = {
            'product_symbol': symbol,
            'size': size,
            'side': side,
            'order_type': order_type,
        }
        if limit_price:
            body['limit_price'] = str(limit_price)
        if stop_price:
            body['stop_price'] = str(stop_price)

        body_str = json.dumps(body)
        resp = requests.post(
            f"{self.BASE_URL}{path}",
            headers=self._headers("POST", path, body_str),
            data=body_str,
        )
        return resp.json()

    def cancel_order(self, order_id, product_id):
        path = "/orders"
        body = json.dumps({'id': order_id, 'product_id': product_id})
        resp = requests.delete(
            f"{self.BASE_URL}{path}",
            headers=self._headers("DELETE", path, body),
            data=body,
        )
        return resp.json()

    def get_positions(self):
        path = "/positions"
        resp = requests.get(
            f"{self.BASE_URL}{path}",
            headers=self._headers("GET", path),
        )
        return resp.json()

# Place a BTC perpetual limit buy
client = DeltaClient("key", "secret")
result = client.place_order("BTCUSDT", 10, "buy",
                            limit_price="62000")`}
      </CodeBlock>

      <NoteBlock title="Delta Rate Limits">
        Delta allows 50 requests per 10 seconds for order endpoints and 100
        for non-order endpoints. Use WebSocket for real-time updates instead
        of polling the REST API for order status.
      </NoteBlock>
    </SectionLayout>
  )
}
