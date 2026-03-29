import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function RateLimiting() {
  return (
    <SectionLayout
      title="API Rate Limiting & Order Queuing"
      description="Respecting broker API limits and implementing order queues for reliable execution."
    >
      <DefinitionBlock term="Rate Limiting">
        Broker APIs enforce request limits to prevent abuse. Zerodha Kite allows
        3 requests/second for quotes and 10 orders/second. Exceeding limits
        results in HTTP 429 errors and potential temporary bans.
      </DefinitionBlock>

      <CodeBlock language="python" title="Token Bucket Rate Limiter">
{`import time
import asyncio
from collections import deque

class TokenBucketLimiter:
    """Rate limiter using token bucket algorithm."""

    def __init__(self, rate: float, burst: int):
        self.rate = rate        # tokens per second
        self.burst = burst      # max tokens
        self.tokens = burst
        self.last_refill = time.monotonic()

    def _refill(self):
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.tokens = min(self.burst, self.tokens + elapsed * self.rate)
        self.last_refill = now

    def acquire(self, timeout=5.0) -> bool:
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            self._refill()
            if self.tokens >= 1:
                self.tokens -= 1
                return True
            time.sleep(0.05)
        return False

class OrderQueue:
    """Queue orders and dispatch respecting rate limits."""

    def __init__(self, broker, rate=3, burst=5):
        self.broker = broker
        self.limiter = TokenBucketLimiter(rate, burst)
        self.queue = deque()
        self.results = {}

    def enqueue(self, order):
        self.queue.append(order)

    def process(self):
        while self.queue:
            order = self.queue[0]
            if not self.limiter.acquire():
                print("Rate limit hit, waiting...")
                continue
            self.queue.popleft()
            try:
                result = self.broker.place_order(**order)
                self.results[order['client_id']] = result
            except Exception as e:
                if 'Too many requests' in str(e):
                    self.queue.appendleft(order)  # Retry
                    time.sleep(1)
                else:
                    self.results[order['client_id']] = {'error': str(e)}

# Usage: 3 orders/sec for Zerodha
oq = OrderQueue(kite_broker, rate=3, burst=5)
oq.enqueue({'client_id': 'o1', 'symbol': 'NIFTY25MARFUT', ...})
oq.process()`}
      </CodeBlock>

      <NoteBlock title="Burst Handling at Market Open">
        At 9:15 AM IST, many algos fire orders simultaneously. Build a pre-open
        queue that submits orders in priority order starting at 9:15:00. Never
        burst more than 5 orders in the first second -- Zerodha may reject them.
      </NoteBlock>
    </SectionLayout>
  )
}
