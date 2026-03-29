import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function TickIngestion() {
  return (
    <SectionLayout
      title="High-Throughput Tick Ingestion"
      subtitle="Processing and storing thousands of ticks per second from live market feeds"
      difficulty="advanced"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">Batched Write Pipeline</h3>
      <CodeBlock
        language="python"
        title="Async tick buffer with batch inserts"
        code={`import asyncio
from collections import deque
from datetime import datetime

class TickBuffer:
    def __init__(self, db_pool, batch_size=500, flush_interval=1.0):
        self.buffer = deque(maxlen=50000)
        self.batch_size = batch_size
        self.flush_interval = flush_interval
        self.db_pool = db_pool
        self.stats = {"ingested": 0, "flushed": 0}

    def ingest(self, tick):
        self.buffer.append((
            tick.timestamp, tick.symbol, tick.exchange,
            tick.price, tick.volume, tick.bid, tick.ask
        ))
        self.stats["ingested"] += 1

    async def flush_loop(self):
        while True:
            await asyncio.sleep(self.flush_interval)
            if not self.buffer:
                continue
            batch = []
            while self.buffer and len(batch) < self.batch_size:
                batch.append(self.buffer.popleft())
            await self._write_batch(batch)
            self.stats["flushed"] += len(batch)

    async def _write_batch(self, batch):
        async with self.db_pool.acquire() as conn:
            await conn.copy_records_to_table(
                "ticks", records=batch,
                columns=["ts", "symbol", "exchange",
                         "price", "volume", "bid", "ask"]
            )`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">OHLCV Candle Aggregation</h3>
      <CodeBlock
        language="python"
        title="Build candles from tick stream"
        code={`class CandleAggregator:
    def __init__(self, interval_seconds=60):
        self.interval = interval_seconds
        self.candles = {}  # symbol -> current candle

    def on_tick(self, tick):
        bucket = int(tick.timestamp.timestamp()) // self.interval
        key = (tick.symbol, bucket)
        if key not in self.candles:
            self.candles[key] = {
                "open": tick.price, "high": tick.price,
                "low": tick.price, "close": tick.price,
                "volume": tick.volume
            }
        else:
            c = self.candles[key]
            c["high"] = max(c["high"], tick.price)
            c["low"] = min(c["low"], tick.price)
            c["close"] = tick.price
            c["volume"] += tick.volume`}
      />

      <NoteBlock type="tip" title="Performance Benchmark">
        <p>A Python asyncio pipeline with batch inserts can handle 5,000-10,000 ticks/second on
        a single core. For NIFTY + top 50 stocks, peak tick rate is around 2,000/second during
        volatile periods -- well within capacity.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
