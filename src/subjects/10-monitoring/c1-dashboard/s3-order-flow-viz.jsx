import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OrderFlowViz() {
  return (
    <SectionLayout
      title="Order Flow Visualization"
      description="Real-time visualization of order submissions, fills, and cancellations."
    >
      <DefinitionBlock term="Order Flow Dashboard">
        A live view of all trading system activity: pending orders, recent fills,
        rejected orders, and execution quality metrics. Provides operational
        awareness of the execution engine state.
      </DefinitionBlock>

      <CodeBlock language="python" title="Order Flow Data Stream">
{`from collections import deque
from datetime import datetime, timedelta
import json

class OrderFlowStream:
    """Maintain rolling window of order events for visualization."""

    def __init__(self, window_minutes=30, max_events=1000):
        self.events = deque(maxlen=max_events)
        self.window = timedelta(minutes=window_minutes)
        self.stats = {
            'submitted': 0, 'filled': 0,
            'cancelled': 0, 'rejected': 0,
        }

    def add_event(self, event_type, order_data):
        event = {
            'timestamp': datetime.now().isoformat(),
            'type': event_type,
            'symbol': order_data.get('symbol'),
            'side': order_data.get('side'),
            'quantity': order_data.get('quantity'),
            'price': order_data.get('price'),
            'order_id': order_data.get('order_id'),
        }
        self.events.append(event)
        self.stats[event_type] = self.stats.get(event_type, 0) + 1

    def get_recent(self, minutes=5):
        cutoff = datetime.now() - timedelta(minutes=minutes)
        return [e for e in self.events
                if datetime.fromisoformat(e['timestamp']) > cutoff]

    def execution_quality(self):
        fills = [e for e in self.events if e['type'] == 'filled']
        submits = [e for e in self.events if e['type'] == 'submitted']
        return {
            'fill_rate': len(fills) / max(len(submits), 1),
            'reject_rate': self.stats['rejected'] / max(sum(self.stats.values()), 1),
            'total_orders': sum(self.stats.values()),
            'avg_fill_time': self._avg_fill_time(),
        }

    def _avg_fill_time(self):
        # Calculate average time from submit to fill
        submits = {e['order_id']: e['timestamp']
                   for e in self.events if e['type'] == 'submitted'}
        fills = {e['order_id']: e['timestamp']
                 for e in self.events if e['type'] == 'filled'}
        times = []
        for oid in fills:
            if oid in submits:
                s = datetime.fromisoformat(submits[oid])
                f = datetime.fromisoformat(fills[oid])
                times.append((f - s).total_seconds())
        return sum(times) / len(times) if times else 0`}
      </CodeBlock>

      <CodeBlock language="python" title="FastAPI Endpoint for Dashboard">
{`from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI()
flow = OrderFlowStream()

@app.get("/api/order-flow/recent")
def get_recent_orders():
    return flow.get_recent(minutes=5)

@app.get("/api/order-flow/stats")
def get_stats():
    return flow.execution_quality()

@app.get("/api/order-flow/stream")
async def stream_orders():
    async def generate():
        last_count = 0
        while True:
            events = flow.get_recent(minutes=1)
            if len(events) != last_count:
                yield f"data: {json.dumps(events)}\\n\\n"
                last_count = len(events)
            await asyncio.sleep(1)
    return StreamingResponse(generate(), media_type="text/event-stream")`}
      </CodeBlock>

      <NoteBlock title="Visual Design Tip">
        Use a scrolling timeline with color-coded dots: green for fills, yellow
        for pending, red for rejections. Show a sparkline of orders-per-minute
        to detect unusual activity spikes that may indicate strategy issues.
      </NoteBlock>
    </SectionLayout>
  )
}
