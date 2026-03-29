import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OrderLifecycle() {
  return (
    <SectionLayout
      title="Order Lifecycle & State Machine"
      description="Tracking order states from submission to fill: pending, partial, filled, cancelled, rejected."
    >
      <DefinitionBlock term="Order State Machine">
        Orders transition through discrete states: PENDING -> OPEN -> PARTIAL_FILL
        -> FILLED or CANCELLED. Each transition triggers callbacks for position
        updates, risk checks, and logging.
      </DefinitionBlock>

      <CodeBlock language="python" title="Order State Machine Implementation">
{`from enum import Enum
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, Callable

class OrderStatus(Enum):
    PENDING = "PENDING"
    SUBMITTED = "SUBMITTED"
    OPEN = "OPEN"
    PARTIAL = "PARTIAL"
    FILLED = "FILLED"
    CANCELLED = "CANCELLED"
    REJECTED = "REJECTED"

VALID_TRANSITIONS = {
    OrderStatus.PENDING: [OrderStatus.SUBMITTED, OrderStatus.REJECTED],
    OrderStatus.SUBMITTED: [OrderStatus.OPEN, OrderStatus.REJECTED],
    OrderStatus.OPEN: [OrderStatus.PARTIAL, OrderStatus.FILLED, OrderStatus.CANCELLED],
    OrderStatus.PARTIAL: [OrderStatus.FILLED, OrderStatus.CANCELLED],
}

@dataclass
class Order:
    order_id: str
    symbol: str
    side: str
    quantity: int
    order_type: str
    limit_price: Optional[float] = None
    status: OrderStatus = OrderStatus.PENDING
    filled_qty: int = 0
    avg_fill_price: float = 0.0
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)

    def transition(self, new_status: OrderStatus):
        valid = VALID_TRANSITIONS.get(self.status, [])
        if new_status not in valid:
            raise ValueError(
                f"Invalid transition: {self.status} -> {new_status}"
            )
        self.status = new_status
        self.updated_at = datetime.now()

class OrderManager:
    def __init__(self):
        self.orders = {}
        self.callbacks = []

    def register_callback(self, fn: Callable):
        self.callbacks.append(fn)

    def create_order(self, **kwargs) -> Order:
        order = Order(**kwargs)
        self.orders[order.order_id] = order
        return order

    def update_status(self, order_id, new_status, fill_qty=0, fill_price=0):
        order = self.orders[order_id]
        order.transition(new_status)
        if fill_qty:
            total_cost = order.avg_fill_price * order.filled_qty + fill_price * fill_qty
            order.filled_qty += fill_qty
            order.avg_fill_price = total_cost / order.filled_qty
        for cb in self.callbacks:
            cb(order)`}
      </CodeBlock>

      <NoteBlock title="Why State Machines Matter">
        Without strict state transitions, race conditions in async environments
        can lead to double-fills or phantom cancellations. Always validate
        transitions -- a FILLED order must never become CANCELLED.
      </NoteBlock>
    </SectionLayout>
  )
}
