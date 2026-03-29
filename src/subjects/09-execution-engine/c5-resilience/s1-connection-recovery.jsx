import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ConnectionRecovery() {
  return (
    <SectionLayout
      title="WebSocket Reconnection & Heartbeat"
      description="Maintaining persistent connections with automatic recovery for Kite and Delta WebSockets."
    >
      <DefinitionBlock term="Heartbeat">
        A periodic ping/pong message exchange between client and server to verify
        the connection is alive. If no heartbeat response within a timeout, the
        client assumes disconnection and initiates reconnection.
      </DefinitionBlock>

      <CodeBlock language="python" title="Resilient WebSocket Manager">
{`import asyncio
import websockets
import time
import logging

logger = logging.getLogger('ws_manager')

class ResilientWebSocket:
    """WebSocket with automatic reconnection and heartbeat."""

    def __init__(self, url, on_message, auth_fn=None):
        self.url = url
        self.on_message = on_message
        self.auth_fn = auth_fn
        self.ws = None
        self.connected = False
        self.reconnect_attempts = 0
        self.max_reconnect_delay = 30
        self.heartbeat_interval = 15  # seconds
        self.heartbeat_timeout = 10

    async def connect(self):
        while True:
            try:
                async with websockets.connect(self.url) as ws:
                    self.ws = ws
                    self.connected = True
                    self.reconnect_attempts = 0
                    logger.info("WebSocket connected")

                    if self.auth_fn:
                        await self.auth_fn(ws)

                    await asyncio.gather(
                        self._receive_loop(ws),
                        self._heartbeat_loop(ws),
                    )
            except (websockets.ConnectionClosed, OSError) as e:
                self.connected = False
                delay = self._backoff_delay()
                logger.warning(f"Disconnected: {e}. Reconnecting in {delay}s")
                await asyncio.sleep(delay)

    def _backoff_delay(self):
        delay = min(2 ** self.reconnect_attempts, self.max_reconnect_delay)
        self.reconnect_attempts += 1
        return delay

    async def _receive_loop(self, ws):
        async for message in ws:
            try:
                self.on_message(message)
            except Exception as e:
                logger.error(f"Message handler error: {e}")

    async def _heartbeat_loop(self, ws):
        while True:
            try:
                pong = await ws.ping()
                await asyncio.wait_for(pong, timeout=self.heartbeat_timeout)
            except asyncio.TimeoutError:
                logger.warning("Heartbeat timeout, closing")
                await ws.close()
                return
            await asyncio.sleep(self.heartbeat_interval)

    async def send(self, message):
        if self.ws and self.connected:
            await self.ws.send(message)

# Usage
def handle_tick(msg):
    print(f"Tick: {msg}")

ws = ResilientWebSocket(
    "wss://ws.kite.trade", handle_tick, auth_fn=kite_auth
)
asyncio.run(ws.connect())`}
      </CodeBlock>

      <NoteBlock title="Kite WebSocket Specifics">
        Kite WebSocket drops connections after 5 minutes of no subscription
        activity. Always subscribe to at least one instrument immediately after
        connect. The Kite SDK handles reconnection internally, but add your
        own monitoring layer to track reconnect frequency.
      </NoteBlock>
    </SectionLayout>
  )
}
