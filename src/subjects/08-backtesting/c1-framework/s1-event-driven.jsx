import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function EventDrivenBacktest() {
  return (
    <SectionLayout
      title="Event-Driven Backtesting Engine"
      description="Architecture of an event-driven backtester that mirrors live trading execution flow."
    >
      <DefinitionBlock term="Event-Driven Backtesting">
        A backtesting approach where the engine processes discrete events (market data,
        signal, order, fill) in sequence, closely replicating how a live trading system
        operates. This avoids look-ahead bias inherent in vectorized backtests.
      </DefinitionBlock>

      <CodeBlock language="python" title="Core Event Loop Architecture">
{`from abc import ABC, abstractmethod
from collections import deque
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum

class EventType(Enum):
    MARKET = "MARKET"
    SIGNAL = "SIGNAL"
    ORDER = "ORDER"
    FILL = "FILL"

@dataclass
class Event:
    event_type: EventType
    timestamp: datetime
    data: dict = field(default_factory=dict)

class EventEngine:
    """Core event-driven backtesting engine."""

    def __init__(self):
        self.event_queue = deque()
        self.handlers = {et: [] for et in EventType}

    def register(self, event_type: EventType, handler):
        self.handlers[event_type].append(handler)

    def push(self, event: Event):
        self.event_queue.append(event)

    def run(self):
        while self.event_queue:
            event = self.event_queue.popleft()
            for handler in self.handlers[event.event_type]:
                new_events = handler(event)
                if new_events:
                    for e in new_events:
                        self.event_queue.append(e)

# Usage
engine = EventEngine()
engine.register(EventType.MARKET, strategy.on_market_data)
engine.register(EventType.SIGNAL, portfolio.on_signal)
engine.register(EventType.ORDER, broker.on_order)
engine.register(EventType.FILL, portfolio.on_fill)`}
      </CodeBlock>

      <NoteBlock title="Why Event-Driven?">
        Vectorized backtests (using pandas vectorized ops) are faster but cannot
        model order fills, partial executions, or portfolio-level constraints.
        Event-driven engines are essential when backtesting strategies on NSE
        F&O where lot sizes and margin rules affect execution.
      </NoteBlock>

      <CodeBlock language="python" title="Running a Backtest Session">
{`def run_backtest(engine, data_feed, strategy, broker, portfolio):
    engine.register(EventType.MARKET, strategy.generate_signal)
    engine.register(EventType.SIGNAL, portfolio.handle_signal)
    engine.register(EventType.ORDER, broker.execute_order)
    engine.register(EventType.FILL, portfolio.update_position)

    for bar in data_feed:
        event = Event(EventType.MARKET, bar['timestamp'], bar)
        engine.push(event)
        engine.run()

    return portfolio.get_results()`}
      </CodeBlock>
    </SectionLayout>
  )
}
