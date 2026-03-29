import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DeltaWsUpdates() {
  return (
    <SectionLayout
      title="WebSocket Order Updates on Delta"
      description="Streaming real-time order fills and position changes via Delta WebSocket."
    >
      <DefinitionBlock term="Private WebSocket Channel">
        Delta Exchange provides authenticated WebSocket channels for order
        updates, position changes, and margin events. These push updates
        instantly without polling, essential for low-latency execution.
      </DefinitionBlock>

      <CodeBlock language="python" title="Delta WebSocket Order Listener">
{`import asyncio
import websockets
import json
import hmac
import hashlib
import time

class DeltaWSClient:
    WS_URL = "wss://socket.delta.exchange"

    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
        self.callbacks = {}

    def _auth_payload(self):
        method = "GET"
        timestamp = str(int(time.time()))
        path = "/live"
        msg = f"{method}{timestamp}{path}"
        sig = hmac.new(
            self.api_secret.encode(), msg.encode(), hashlib.sha256
        ).hexdigest()
        return {
            "type": "auth",
            "payload": {
                "api-key": self.api_key,
                "signature": sig,
                "timestamp": timestamp,
            },
        }

    def on(self, channel, callback):
        self.callbacks[channel] = callback

    async def connect(self):
        async with websockets.connect(self.WS_URL) as ws:
            # Authenticate
            await ws.send(json.dumps(self._auth_payload()))
            auth_resp = json.loads(await ws.recv())
            print(f"Auth: {auth_resp.get('type')}")

            # Subscribe to private channels
            await ws.send(json.dumps({
                "type": "subscribe",
                "payload": {
                    "channels": [
                        {"name": "orders"},
                        {"name": "positions"},
                        {"name": "margins"},
                    ]
                },
            }))

            async for msg in ws:
                data = json.loads(msg)
                channel = data.get("channel", "")
                if channel in self.callbacks:
                    self.callbacks[channel](data)

def on_order_update(data):
    order = data.get("data", {})
    print(f"Order {order.get('id')}: {order.get('state')} "
          f"filled={order.get('size_filled')}")

def on_position_update(data):
    pos = data.get("data", {})
    print(f"Position {pos.get('symbol')}: size={pos.get('size')} "
          f"entry={pos.get('entry_price')}")

ws = DeltaWSClient("key", "secret")
ws.on("orders", on_order_update)
ws.on("positions", on_position_update)
asyncio.run(ws.connect())`}
      </CodeBlock>

      <NoteBlock title="Reconnection Strategy">
        Delta WebSocket connections can drop during high volatility. Implement
        exponential backoff reconnection (1s, 2s, 4s, max 30s). After reconnect,
        always fetch current positions via REST to reconcile state.
      </NoteBlock>
    </SectionLayout>
  )
}
