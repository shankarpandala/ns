import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function RestWebsocket() {
  return (
    <SectionLayout
      title="REST and WebSocket APIs"
      subtitle="Using Delta Exchange REST endpoints and real-time WebSocket streaming"
      difficulty="intermediate"
      readingMinutes={7}
    >
      <h3 className="text-lg font-semibold mb-2">REST API Basics</h3>
      <CodeBlock
        language="python"
        title="Common REST API calls"
        code={`# Get all available products
products = client.get_products()
for p in products[:5]:
    print(f"{p['symbol']} - {p['description']}")

# Get orderbook for BTCINR
orderbook = client.get_l2_orderbook("BTCINR")
print(f"Best bid: {orderbook['buy'][0]['price']}")
print(f"Best ask: {orderbook['sell'][0]['price']}")

# Get recent trades
trades = client.get_trades("BTCINR")
for t in trades[:3]:
    print(f"{t['side']} {t['size']} @ {t['price']}")`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">WebSocket Streaming</h3>
      <CodeBlock
        language="python"
        title="Real-time market data via WebSocket"
        code={`import asyncio
import websockets
import json

async def stream_delta_ticks(symbols):
    uri = "wss://socket.india.delta.exchange"
    async with websockets.connect(uri) as ws:
        # Subscribe to orderbook and trades
        for symbol in symbols:
            await ws.send(json.dumps({
                "type": "subscribe",
                "payload": {
                    "channels": [
                        {"name": "l2_orderbook", "symbols": [symbol]},
                        {"name": "recent_trade", "symbols": [symbol]},
                        {"name": "mark_price", "symbols": [symbol]},
                    ]
                }
            }))

        async for message in ws:
            data = json.loads(message)
            channel = data.get("type", "")
            if channel == "l2_orderbook":
                handle_orderbook_update(data)
            elif channel == "recent_trade":
                handle_trade(data)

asyncio.run(stream_delta_ticks(["BTCINR", "ETHINR"]))`}
      />

      <NoteBlock type="tip" title="Heartbeat / Ping">
        <p>Delta's WebSocket requires periodic ping frames. Most WebSocket libraries handle this
        automatically. If you get disconnected every 30 seconds, ensure your client sends
        ping frames at least every 25 seconds.</p>
      </NoteBlock>

      <NoteBlock type="info" title="Rate Limits">
        <p>REST API: 100 requests per 10 seconds. WebSocket: unlimited incoming data, but
        subscribe to a maximum of 20 channels per connection. Use multiple connections if needed.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
