import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function WebsocketArchitecture() {
  return (
    <SectionLayout
      title="WebSocket Architecture for Multi-Exchange Feeds"
      subtitle="Designing a unified real-time data pipeline for Zerodha and Delta Exchange"
      difficulty="advanced"
      readingMinutes={7}
    >
      <DefinitionBlock
        term="Unified Feed Handler"
        definition="A single abstraction layer that normalizes tick data from multiple exchanges into a common format, enabling strategies to consume data without knowing the source exchange."
      />

      <CodeBlock
        language="python"
        title="Base feed handler interface"
        code={`from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
import asyncio

@dataclass
class Tick:
    symbol: str
    exchange: str
    price: float
    volume: int
    bid: float
    ask: float
    timestamp: datetime

class FeedHandler(ABC):
    def __init__(self):
        self.subscribers = []

    @abstractmethod
    async def connect(self): ...

    @abstractmethod
    async def subscribe(self, symbols: list[str]): ...

    def on_tick(self, tick: Tick):
        for callback in self.subscribers:
            callback(tick)

    def add_subscriber(self, callback):
        self.subscribers.append(callback)`}
      />

      <CodeBlock
        language="python"
        title="Kite WebSocket feed handler"
        code={`from kiteconnect import KiteTicker

class KiteFeedHandler(FeedHandler):
    def __init__(self, api_key, access_token):
        super().__init__()
        self.ws = KiteTicker(api_key, access_token)
        self.ws.on_ticks = self._handle_ticks
        self.ws.on_connect = self._on_connect
        self.tokens = []

    def _handle_ticks(self, ws, ticks):
        for t in ticks:
            tick = Tick(
                symbol=t["instrument_token"],
                exchange="NSE",
                price=t["last_price"],
                volume=t["volume_traded"],
                bid=t["depth"]["buy"][0]["price"],
                ask=t["depth"]["sell"][0]["price"],
                timestamp=t["exchange_timestamp"]
            )
            self.on_tick(tick)

    async def connect(self):
        self.ws.connect(threaded=True)`}
      />

      <NoteBlock type="tip" title="Message Queue for Decoupling">
        <p>Place a Redis Streams or ZeroMQ queue between the feed handler and consumers.
        This decouples ingestion speed from processing speed and prevents slow consumers
        from causing backpressure on the WebSocket.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
