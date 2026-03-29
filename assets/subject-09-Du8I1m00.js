import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as i,D as r,C as t,N as s}from"./subject-01-B5qsZKsm.js";const R={id:"09-execution-engine",title:"Autonomous Execution Engine",icon:"⚡",colorHex:"#6366f1",description:"Build a production execution engine with order management, risk controls, and system resilience.",difficulty:"advanced",estimatedHours:5,prerequisites:["07-trading-strategies","08-backtesting"],chapters:[{id:"c1-order-management",title:"Order Management System",description:"Design order lifecycle, smart routing, and rate limiting.",estimatedMinutes:55,sections:[{id:"s1-order-lifecycle",title:"Order Lifecycle & State Machine",difficulty:"advanced",readingMinutes:15,description:"Order states: pending, partial, filled, cancelled."},{id:"s2-smart-routing",title:"Smart Order Routing",difficulty:"advanced",readingMinutes:12,description:"Route orders across exchanges for best execution."},{id:"s3-rate-limiting",title:"Order Queuing & Rate Limiting",difficulty:"advanced",readingMinutes:12,description:"API rate limiting and order queue management."},{id:"s4-partial-fills",title:"Partial Fills & Amendments",difficulty:"advanced",readingMinutes:15,description:"Handle partial fills and order amendments."}]},{id:"c2-zerodha-execution",title:"Zerodha Execution",description:"Execute trades on Zerodha Kite with bracket orders and GTT.",estimatedMinutes:55,sections:[{id:"s1-place-orders",title:"Place/Modify/Cancel Orders",difficulty:"advanced",readingMinutes:15,description:"Place, modify, and cancel orders via Kite API."},{id:"s2-bracket-cover",title:"Bracket & Cover Orders",difficulty:"advanced",readingMinutes:12,description:"Use bracket and cover orders for risk management."},{id:"s3-gtt-orders",title:"GTT (Good Till Triggered)",difficulty:"advanced",readingMinutes:12,description:"Set up GTT orders for swing trading."},{id:"s4-positions",title:"Position & Holdings Management",difficulty:"advanced",readingMinutes:15,description:"Track positions, holdings, and P&L in real-time."}]},{id:"c3-delta-execution",title:"Delta Exchange Execution",description:"Execute crypto derivatives trades with leverage management.",estimatedMinutes:55,sections:[{id:"s1-rest-orders",title:"REST Order Placement",difficulty:"advanced",readingMinutes:15,description:"Place orders via Delta Exchange REST API."},{id:"s2-ws-updates",title:"WebSocket Order Updates",difficulty:"advanced",readingMinutes:12,description:"Stream order status updates via WebSocket."},{id:"s3-leverage",title:"Leverage & Liquidation Management",difficulty:"advanced",readingMinutes:12,description:"Manage leverage and prevent liquidation."},{id:"s4-funding-settlement",title:"Funding & Settlement",difficulty:"advanced",readingMinutes:15,description:"Handle funding rate collection and settlement."}]},{id:"c4-risk-controls",title:"Risk Controls",description:"Implement pre-trade checks, position sizing, and kill switches.",estimatedMinutes:55,sections:[{id:"s1-pre-trade",title:"Pre-Trade Risk Checks",difficulty:"advanced",readingMinutes:12,description:"Validate size, exposure, and concentration limits."},{id:"s2-position-sizing",title:"Position Sizing (Kelly, Fixed Fractional)",difficulty:"advanced",readingMinutes:15,description:"Kelly criterion and fixed fractional sizing."},{id:"s3-circuit-breaker",title:"Max Drawdown Circuit Breaker",difficulty:"advanced",readingMinutes:12,description:"Auto-halt trading on max drawdown threshold."},{id:"s4-kill-switch",title:"Daily Loss Limits & Kill Switch",difficulty:"advanced",readingMinutes:15,description:"Emergency kill switch to flatten all positions."}]},{id:"c5-resilience",title:"System Resilience",description:"Build fault-tolerant systems with reconnection and disaster recovery.",estimatedMinutes:55,sections:[{id:"s1-connection-recovery",title:"Connection Recovery & Reconnection",difficulty:"advanced",readingMinutes:15,description:"WebSocket reconnection and heartbeat monitoring."},{id:"s2-order-reconciliation",title:"Order Reconciliation",difficulty:"advanced",readingMinutes:12,description:"Reconcile local and exchange order states."},{id:"s3-disaster-recovery",title:"Disaster Recovery & Failover",difficulty:"advanced",readingMinutes:12,description:"Failover procedures and backup systems."},{id:"s4-audit-trail",title:"Audit Trail & Compliance Logging",difficulty:"advanced",readingMinutes:15,description:"Comprehensive audit trail and trade records."}]}]};function o(){return e.jsxs(i,{title:"Order Lifecycle & State Machine",description:"Tracking order states from submission to fill: pending, partial, filled, cancelled, rejected.",children:[e.jsx(r,{term:"Order State Machine",children:"Orders transition through discrete states: PENDING -> OPEN -> PARTIAL_FILL -> FILLED or CANCELLED. Each transition triggers callbacks for position updates, risk checks, and logging."}),e.jsx(t,{language:"python",title:"Order State Machine Implementation",children:`from enum import Enum
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
            cb(order)`}),e.jsx(s,{title:"Why State Machines Matter",children:"Without strict state transitions, race conditions in async environments can lead to double-fills or phantom cancellations. Always validate transitions -- a FILLED order must never become CANCELLED."})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"}));function a(){return e.jsxs(i,{title:"Smart Order Routing",description:"Routing orders across NSE, BSE, and Delta Exchange for best execution.",children:[e.jsx(r,{term:"Smart Order Routing (SOR)",children:"Automatically selects the exchange or venue offering the best price and liquidity for an order. In India, equities trade on both NSE and BSE; SOR picks the venue with the tighter spread."}),e.jsx(t,{language:"python",title:"Multi-Exchange Order Router",children:`from dataclasses import dataclass
from typing import Dict

@dataclass
class VenueQuote:
    venue: str
    bid: float
    ask: float
    bid_qty: int
    ask_qty: int

class SmartOrderRouter:
    """Route orders to best available venue."""

    def __init__(self):
        self.venues = {}  # venue_name -> connector

    def register_venue(self, name, connector):
        self.venues[name] = connector

    def get_best_venue(self, symbol, side, qty) -> str:
        quotes = {}
        for name, conn in self.venues.items():
            try:
                q = conn.get_quote(symbol)
                quotes[name] = VenueQuote(
                    venue=name, bid=q['bid'], ask=q['ask'],
                    bid_qty=q['bid_qty'], ask_qty=q['ask_qty'],
                )
            except Exception:
                continue

        if side == 'BUY':
            # Best ask = lowest price with sufficient quantity
            candidates = {k: v for k, v in quotes.items()
                         if v.ask_qty >= qty}
            if not candidates:
                candidates = quotes
            return min(candidates, key=lambda k: quotes[k].ask)
        else:
            # Best bid = highest price
            candidates = {k: v for k, v in quotes.items()
                         if v.bid_qty >= qty}
            if not candidates:
                candidates = quotes
            return max(candidates, key=lambda k: quotes[k].bid)

    def route_order(self, symbol, side, qty, order_type='MARKET'):
        venue = self.get_best_venue(symbol, side, qty)
        connector = self.venues[venue]
        order_id = connector.place_order(symbol, side, qty, order_type)
        return {'venue': venue, 'order_id': order_id}

# Setup
router = SmartOrderRouter()
router.register_venue('NSE', nse_connector)
router.register_venue('BSE', bse_connector)
result = router.route_order('RELIANCE', 'BUY', 250)`}),e.jsx(s,{title:"Indian Market Context",children:"Most brokers including Zerodha route to NSE by default since it has 90%+ volume share. BSE can occasionally offer better prices for less liquid stocks. For F&O, routing is NSE-only as BSE derivatives have minimal liquidity."})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:a},Symbol.toStringTag,{value:"Module"}));function n(){return e.jsxs(i,{title:"API Rate Limiting & Order Queuing",description:"Respecting broker API limits and implementing order queues for reliable execution.",children:[e.jsx(r,{term:"Rate Limiting",children:"Broker APIs enforce request limits to prevent abuse. Zerodha Kite allows 3 requests/second for quotes and 10 orders/second. Exceeding limits results in HTTP 429 errors and potential temporary bans."}),e.jsx(t,{language:"python",title:"Token Bucket Rate Limiter",children:`import time
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
oq.process()`}),e.jsx(s,{title:"Burst Handling at Market Open",children:"At 9:15 AM IST, many algos fire orders simultaneously. Build a pre-open queue that submits orders in priority order starting at 9:15:00. Never burst more than 5 orders in the first second -- Zerodha may reject them."})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:n},Symbol.toStringTag,{value:"Module"}));function l(){return e.jsxs(i,{title:"Handling Partial Fills & Amendments",description:"Managing partially filled orders, order modifications, and cancel-replace workflows.",children:[e.jsx(r,{term:"Partial Fill",children:"When only a portion of the order quantity is executed. Common with limit orders on less liquid stocks or large F&O orders. The remaining quantity stays open until filled, cancelled, or expired."}),e.jsx(t,{language:"python",title:"Partial Fill Handler",children:`class PartialFillHandler:
    """Track and manage partially filled orders."""

    def __init__(self, order_manager, broker):
        self.om = order_manager
        self.broker = broker
        self.fill_timeout = 30  # seconds

    def on_partial_fill(self, order_id, filled_qty, fill_price):
        order = self.om.orders[order_id]
        order.filled_qty += filled_qty

        # Recalculate average fill price
        prev_cost = order.avg_fill_price * (order.filled_qty - filled_qty)
        new_cost = fill_price * filled_qty
        order.avg_fill_price = (prev_cost + new_cost) / order.filled_qty

        remaining = order.quantity - order.filled_qty
        print(f"Order {order_id}: filled {filled_qty}@{fill_price}, "
              f"remaining: {remaining}")

        if remaining == 0:
            order.status = 'FILLED'
        return remaining

    def handle_stale_partial(self, order_id, action='cancel_remaining'):
        """Handle orders stuck in partial fill state."""
        order = self.om.orders[order_id]
        remaining = order.quantity - order.filled_qty

        if action == 'cancel_remaining':
            self.broker.cancel_order(order_id)
            order.status = 'PARTIAL_CANCELLED'

        elif action == 'convert_to_market':
            self.broker.modify_order(
                order_id=order_id,
                order_type='MARKET',
                quantity=remaining,
            )

        elif action == 'reprice':
            # Move limit price closer to market
            ltp = self.broker.get_ltp(order.symbol)
            if order.side == 'BUY':
                new_price = ltp + 0.5  # Pay up 0.5 points
            else:
                new_price = ltp - 0.5
            self.broker.modify_order(
                order_id=order_id,
                price=new_price,
                quantity=remaining,
            )

    def monitor_fills(self, order_id):
        """Auto-handle if partial fill stalls."""
        import time
        start = time.time()
        while time.time() - start < self.fill_timeout:
            order = self.om.orders[order_id]
            if order.status == 'FILLED':
                return True
            time.sleep(1)
        # Timeout -- convert remaining to market
        self.handle_stale_partial(order_id, 'convert_to_market')
        return False`}),e.jsx(s,{title:"F&O Partial Fill Risks",children:"In Nifty options, partial fills on spread orders (e.g., buying a call spread) leave you with an unhedged leg. Always monitor both legs and have fallback logic to close the filled leg if the other side cannot be filled within your timeout window."})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"}));function d(){return e.jsxs(i,{title:"Place, Modify & Cancel Orders via Kite API",description:"Core Zerodha Kite Connect order operations for automated trading.",children:[e.jsx(r,{term:"Kite Connect API",children:"Zerodha's REST API for programmatic trading. Supports equities, F&O, commodities, and currency on NSE/BSE. Requires a paid API subscription (Rs 2000/month) and daily login token generation."}),e.jsx(t,{language:"python",title:"Order Placement with Kite API",children:`from kiteconnect import KiteConnect

kite = KiteConnect(api_key="your_api_key")
kite.set_access_token("your_access_token")

# Market order - Buy 1 lot Nifty Futures
order_id = kite.place_order(
    variety=kite.VARIETY_REGULAR,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="NIFTY25MARFUT",
    transaction_type=kite.TRANSACTION_TYPE_BUY,
    quantity=75,
    product=kite.PRODUCT_MIS,       # Intraday
    order_type=kite.ORDER_TYPE_MARKET,
)
print(f"Order placed: {order_id}")

# Limit order - Sell Nifty 22000 CE
option_order = kite.place_order(
    variety=kite.VARIETY_REGULAR,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="NIFTY25MAR22000CE",
    transaction_type=kite.TRANSACTION_TYPE_SELL,
    quantity=75,
    product=kite.PRODUCT_NRML,      # Overnight
    order_type=kite.ORDER_TYPE_LIMIT,
    price=150.0,
)

# Modify an open order
kite.modify_order(
    variety=kite.VARIETY_REGULAR,
    order_id=option_order,
    price=145.0,         # New limit price
    quantity=75,
)

# Cancel an open order
kite.cancel_order(
    variety=kite.VARIETY_REGULAR,
    order_id=option_order,
)`}),e.jsx(t,{language:"python",title:"Robust Order Wrapper with Retries",children:`import time
from kiteconnect.exceptions import (
    NetworkException, TokenException, OrderException
)

def place_order_safe(kite, retries=3, **order_params):
    for attempt in range(retries):
        try:
            order_id = kite.place_order(**order_params)
            return order_id
        except NetworkException:
            time.sleep(0.5 * (attempt + 1))
        except TokenException:
            raise  # Must re-authenticate
        except OrderException as e:
            if "insufficient" in str(e).lower():
                raise  # Margin issue, don't retry
            time.sleep(0.3)
    raise Exception(f"Order failed after {retries} attempts")`}),e.jsx(s,{title:"Daily Token Refresh",children:"Kite access tokens expire daily. Automate the login flow using Selenium or the kite.generate_session() method with the request_token from the redirect URL. Store tokens in Redis with a TTL of 8 hours."})]})}const j=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"}));function c(){return e.jsxs(i,{title:"Bracket & Cover Orders",description:"Using Zerodha bracket and cover orders for built-in risk management.",children:[e.jsx(r,{term:"Bracket Order (BO)",children:"A three-legged order: entry + stop-loss + target. When entry fills, SL and target are placed automatically. When either SL or target hits, the other is cancelled. Provides lower margin requirements."}),e.jsx(r,{term:"Cover Order (CO)",children:"A two-legged order: entry + compulsory stop-loss. Offers reduced margin since risk is capped. Available for intraday (MIS) trades only."}),e.jsx(t,{language:"python",title:"Bracket Order on Nifty Futures",children:`# Bracket order: Buy Nifty Futures with SL and target
bo_order = kite.place_order(
    variety=kite.VARIETY_BO,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="NIFTY25MARFUT",
    transaction_type=kite.TRANSACTION_TYPE_BUY,
    quantity=75,
    product=kite.PRODUCT_MIS,
    order_type=kite.ORDER_TYPE_LIMIT,
    price=22500,
    squareoff=50,        # Target: 50 points profit
    stoploss=30,         # Stop: 30 points loss
    trailing_stoploss=10, # Trail SL by 10 points
)

# Cover order: Sell BankNifty with compulsory SL
co_order = kite.place_order(
    variety=kite.VARIETY_CO,
    exchange=kite.EXCHANGE_NFO,
    tradingsymbol="BANKNIFTY25MARFUT",
    transaction_type=kite.TRANSACTION_TYPE_SELL,
    quantity=30,
    product=kite.PRODUCT_MIS,
    order_type=kite.ORDER_TYPE_MARKET,
    trigger_price=48100,  # SL trigger for short
)`}),e.jsx(t,{language:"python",title:"Managing Bracket Order Legs",children:`def manage_bracket_order(kite, parent_order_id):
    """Monitor and adjust bracket order legs."""
    orders = kite.order_history(parent_order_id)
    child_orders = [o for o in kite.orders()
                    if o.get('parent_order_id') == parent_order_id]

    for child in child_orders:
        if child['order_type'] == 'SL':
            # Modify stop-loss price if needed
            kite.modify_order(
                variety=kite.VARIETY_BO,
                order_id=child['order_id'],
                parent_order_id=parent_order_id,
                trigger_price=new_sl_trigger,
            )

    return child_orders`}),e.jsx(s,{title:"BO/CO Restrictions",children:"Zerodha periodically disables bracket orders during high volatility. BO is not available for options. CO is intraday only. Always have fallback logic that places regular orders with separate SL orders when BO/CO varieties are unavailable."})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs(i,{title:"Good Till Triggered (GTT) Orders",description:"Using Zerodha GTT orders for swing trades and long-term stop-losses.",children:[e.jsx(r,{term:"GTT Order",children:"A trigger-based order that remains active until the trigger condition is met or the GTT expires (1 year for single, delivery only). Unlike regular orders that expire at day-end, GTTs persist across sessions."}),e.jsx(t,{language:"python",title:"GTT Order Types",children:`# Single-leg GTT: Buy RELIANCE if it drops to 2400
gtt_single = kite.place_gtt(
    trigger_type=kite.GTT_TYPE_SINGLE,
    tradingsymbol="RELIANCE",
    exchange=kite.EXCHANGE_NSE,
    trigger_values=[2400.0],
    last_price=2580.0,
    orders=[{
        "transaction_type": kite.TRANSACTION_TYPE_BUY,
        "quantity": 10,
        "price": 2400.0,
        "order_type": kite.ORDER_TYPE_LIMIT,
        "product": kite.PRODUCT_CNC,  # Delivery
    }],
)

# OCO GTT: Target at 2800 OR stop-loss at 2350
gtt_oco = kite.place_gtt(
    trigger_type=kite.GTT_TYPE_OCO,
    tradingsymbol="RELIANCE",
    exchange=kite.EXCHANGE_NSE,
    trigger_values=[2350.0, 2800.0],
    last_price=2580.0,
    orders=[
        {  # Stop-loss leg
            "transaction_type": kite.TRANSACTION_TYPE_SELL,
            "quantity": 10,
            "price": 2345.0,
            "order_type": kite.ORDER_TYPE_LIMIT,
            "product": kite.PRODUCT_CNC,
        },
        {  # Target leg
            "transaction_type": kite.TRANSACTION_TYPE_SELL,
            "quantity": 10,
            "price": 2800.0,
            "order_type": kite.ORDER_TYPE_LIMIT,
            "product": kite.PRODUCT_CNC,
        },
    ],
)`}),e.jsx(t,{language:"python",title:"GTT Management Helper",children:`class GTTManager:
    """Manage GTT orders for swing trading portfolio."""

    def __init__(self, kite):
        self.kite = kite

    def get_active_gtts(self):
        return [g for g in self.kite.get_gtts()
                if g['status'] == 'active']

    def update_trailing_sl(self, gtt_id, new_trigger, new_price):
        self.kite.delete_gtt(gtt_id)
        # Re-create with new trigger (no modify API for GTT)
        return self.kite.place_gtt(...)

    def cleanup_expired(self):
        for gtt in self.kite.get_gtts():
            if gtt['status'] in ('cancelled', 'rejected', 'disabled'):
                print(f"GTT {gtt['id']} is {gtt['status']}")`}),e.jsx(s,{title:"GTT Limitations",children:"GTT is only for equity delivery (CNC product). No F&O support. Max 20 active GTTs per account. GTT triggers check LTP, not intraday high/low, so gap-down opens can miss your stop-loss trigger price entirely."})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs(i,{title:"Position Management & P&L Tracking",description:"Real-time position tracking, holdings management, and P&L computation via Kite API.",children:[e.jsx(r,{term:"Day vs Net Position",children:"Day position reflects only today's trades. Net position includes carried-forward positions from previous sessions. Zerodha shows both in the positions API response."}),e.jsx(t,{language:"python",title:"Position Tracker",children:`class PositionTracker:
    """Track and manage positions via Kite API."""

    def __init__(self, kite):
        self.kite = kite

    def get_positions(self):
        positions = self.kite.positions()
        return {
            'day': positions['day'],
            'net': positions['net'],
        }

    def get_open_pnl(self):
        """Calculate unrealized P&L for all positions."""
        pnl_summary = []
        for pos in self.kite.positions()['net']:
            if pos['quantity'] == 0:
                continue
            unrealized = (pos['last_price'] - pos['average_price']) * pos['quantity']
            pnl_summary.append({
                'symbol': pos['tradingsymbol'],
                'qty': pos['quantity'],
                'avg_price': pos['average_price'],
                'ltp': pos['last_price'],
                'unrealized_pnl': round(unrealized, 2),
                'product': pos['product'],
            })
        return pnl_summary

    def get_holdings_value(self):
        """Total portfolio value from holdings."""
        holdings = self.kite.holdings()
        total = sum(h['last_price'] * h['quantity'] for h in holdings)
        invested = sum(h['average_price'] * h['quantity'] for h in holdings)
        return {
            'current_value': total,
            'invested': invested,
            'total_pnl': total - invested,
            'pnl_pct': ((total - invested) / invested * 100) if invested else 0,
        }

    def flatten_all(self, product='MIS'):
        """Square off all open intraday positions."""
        for pos in self.kite.positions()['day']:
            if pos['quantity'] == 0:
                continue
            side = ('SELL' if pos['quantity'] > 0 else 'BUY')
            self.kite.place_order(
                variety='regular',
                exchange=pos['exchange'],
                tradingsymbol=pos['tradingsymbol'],
                transaction_type=side,
                quantity=abs(pos['quantity']),
                product=product,
                order_type='MARKET',
            )

tracker = PositionTracker(kite)
print(tracker.get_open_pnl())`}),e.jsx(s,{title:"Auto-Square Off",children:"Zerodha auto-squares MIS positions at 3:15 PM for equity and 3:25 PM for F&O. Build your own square-off logic at 3:10 PM to avoid the broker penalty of Rs 50 per order for auto-square-off."})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs(i,{title:"Delta Exchange REST API Orders",description:"Placing and managing orders on Delta Exchange for crypto derivatives.",children:[e.jsx(r,{term:"Delta Exchange",children:"An Indian-origin crypto derivatives exchange offering perpetual futures, options, and spreads on BTC, ETH, and other assets. Provides both REST and WebSocket APIs with USDT-margined contracts."}),e.jsx(t,{language:"python",title:"Delta Exchange Order Client",children:`import requests
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
                            limit_price="62000")`}),e.jsx(s,{title:"Delta Rate Limits",children:"Delta allows 50 requests per 10 seconds for order endpoints and 100 for non-order endpoints. Use WebSocket for real-time updates instead of polling the REST API for order status."})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(i,{title:"WebSocket Order Updates on Delta",description:"Streaming real-time order fills and position changes via Delta WebSocket.",children:[e.jsx(r,{term:"Private WebSocket Channel",children:"Delta Exchange provides authenticated WebSocket channels for order updates, position changes, and margin events. These push updates instantly without polling, essential for low-latency execution."}),e.jsx(t,{language:"python",title:"Delta WebSocket Order Listener",children:`import asyncio
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
asyncio.run(ws.connect())`}),e.jsx(s,{title:"Reconnection Strategy",children:"Delta WebSocket connections can drop during high volatility. Implement exponential backoff reconnection (1s, 2s, 4s, max 30s). After reconnect, always fetch current positions via REST to reconcile state."})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs(i,{title:"Leverage Management & Liquidation Prevention",description:"Managing leverage levels and preventing forced liquidation on Delta Exchange.",children:[e.jsx(r,{term:"Liquidation Price",children:"The price at which the exchange force-closes your position because margin is insufficient to cover losses. On Delta, liquidation uses a maintenance margin threshold, typically 50% of initial margin."}),e.jsx(t,{language:"python",title:"Leverage and Liquidation Calculator",children:`class LeverageManager:
    """Calculate and monitor leverage on Delta Exchange."""

    def __init__(self, client):
        self.client = client

    def calculate_liquidation_price(self, entry_price, leverage, side):
        """Estimate liquidation price for a position."""
        maint_margin_rate = 0.005  # 0.5% maintenance margin
        if side == 'buy':
            # Long: liq when price falls
            liq = entry_price * (1 - 1/leverage + maint_margin_rate)
        else:
            # Short: liq when price rises
            liq = entry_price * (1 + 1/leverage - maint_margin_rate)
        return round(liq, 2)

    def effective_leverage(self, position_value, margin_balance):
        return position_value / margin_balance if margin_balance > 0 else float('inf')

    def safe_position_size(self, balance, leverage, price, max_risk_pct=0.02):
        """Size position so max loss = max_risk_pct of balance."""
        margin = balance / leverage
        max_loss = balance * max_risk_pct
        # At what price move does loss = max_loss?
        price_move = max_loss / (margin * leverage / price)
        size = int(margin * leverage / price)
        return {
            'size': size,
            'margin_used': round(size * price / leverage, 2),
            'liquidation_distance': f"{(1/leverage)*100:.1f}%",
            'max_loss_at_sl': round(max_loss, 2),
        }

mgr = LeverageManager(delta_client)
# BTC at $62000, 10x leverage, long position
liq = mgr.calculate_liquidation_price(62000, 10, 'buy')
print(f"Liquidation price: ${liq}")  # ~$55,890

sizing = mgr.safe_position_size(10000, 10, 62000)
print(f"Safe size: {sizing['size']} contracts")`}),e.jsx(t,{language:"python",title:"Auto-Deleverage Protection",children:`class DeleverageProtection:
    """Monitor and reduce leverage when approaching danger zone."""

    def __init__(self, client, max_leverage=8):
        self.client = client
        self.max_leverage = max_leverage

    def check_and_reduce(self):
        positions = self.client.get_positions()['result']
        wallet = self.client.get_wallet()

        for pos in positions:
            if pos['size'] == 0:
                continue
            eff_lev = self.effective_leverage(pos)
            if eff_lev > self.max_leverage:
                reduce_by = int(pos['size'] * 0.25)  # Reduce 25%
                self.client.place_order(
                    symbol=pos['symbol'],
                    size=reduce_by,
                    side='sell' if pos['size'] > 0 else 'buy',
                    order_type='market_order',
                )
                print(f"Reduced {pos['symbol']} by {reduce_by}")`}),e.jsx(s,{title:"Leverage Best Practice",children:"Never use more than 5-10x leverage on crypto perpetuals. At 20x, a 5% adverse move wipes your position. Start with 3x leverage during strategy development and increase only after 3+ months of consistent results."})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs(i,{title:"Funding Rate & Settlement",description:"Collecting funding rates on perpetual futures and handling settlement on Delta Exchange.",children:[e.jsx(r,{term:"Funding Rate",children:"A periodic payment between long and short holders of perpetual futures. When funding is positive, longs pay shorts; when negative, shorts pay longs. Delta Exchange settles funding every 8 hours."}),e.jsx(t,{language:"python",title:"Funding Rate Monitor",children:`import requests
from datetime import datetime, timedelta

class FundingRateTracker:
    """Track and collect funding rates on Delta Exchange."""

    def __init__(self, client):
        self.client = client
        self.history = []

    def get_current_rate(self, symbol="BTCUSDT"):
        resp = requests.get(
            f"https://api.delta.exchange/v2/products/{symbol}"
        )
        product = resp.json()['result']
        return {
            'symbol': symbol,
            'funding_rate': float(product.get('funding_rate', 0)),
            'next_funding': product.get('next_funding_time'),
            'predicted_rate': float(product.get('predicted_funding_rate', 0)),
        }

    def calculate_funding_pnl(self, position_size, entry_price, rate):
        """Calculate funding payment for a position."""
        notional = position_size * entry_price
        payment = notional * rate
        return round(payment, 4)  # Positive = you pay, negative = you receive

    def funding_rate_strategy(self, symbol, threshold=0.01):
        """Signal when funding creates trading opportunity."""
        rate_info = self.get_current_rate(symbol)
        rate = rate_info['funding_rate'] * 100  # Convert to %

        if rate > threshold:
            return {
                'signal': 'SHORT',
                'reason': f'High positive funding {rate:.3f}%, shorts collect',
                'annualized': f'{rate * 3 * 365:.1f}%',
            }
        elif rate < -threshold:
            return {
                'signal': 'LONG',
                'reason': f'Negative funding {rate:.3f}%, longs collect',
                'annualized': f'{abs(rate) * 3 * 365:.1f}%',
            }
        return {'signal': 'NEUTRAL', 'reason': 'Funding within normal range'}

tracker = FundingRateTracker(delta_client)
rate = tracker.get_current_rate("BTCUSDT")
print(f"Current funding: {rate['funding_rate']*100:.4f}%")
pnl = tracker.calculate_funding_pnl(1.0, 62000, rate['funding_rate'])
print(f"Funding PnL per BTC: ${pnl}")`}),e.jsx(t,{language:"python",title:"Settlement Handling",children:`class SettlementHandler:
    """Handle Delta Exchange settlement events."""

    def __init__(self, client):
        self.client = client

    def check_upcoming_settlement(self, symbol):
        product = self.client.get_product(symbol)
        if product.get('settlement_time'):
            return {
                'settlement_at': product['settlement_time'],
                'settlement_price': product.get('mark_price'),
                'type': product.get('contract_type'),
            }
        return None

    def pre_settlement_actions(self, symbol):
        """Close or reduce positions before settlement."""
        pos = self.client.get_position(symbol)
        if pos and pos['size'] != 0:
            print(f"Warning: Open position in {symbol} before settlement")
            return True
        return False`}),e.jsx(s,{title:"Funding Arbitrage",children:"When BTC perpetual funding exceeds 0.05% per 8 hours (55% annualized), a cash-and-carry arb opportunity exists: buy spot BTC on an exchange and short perpetual on Delta. The funding payments act as yield. Monitor basis risk and liquidation levels carefully."})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs(i,{title:"Pre-Trade Risk Checks",description:"Validating order size, exposure, and concentration before submission.",children:[e.jsx(r,{term:"Pre-Trade Risk Check",children:"A gatekeeper layer that validates every order against risk limits before it reaches the broker API. Prevents fat-finger errors, excessive exposure, and concentration risk."}),e.jsx(t,{language:"python",title:"Pre-Trade Risk Gate",children:`from dataclasses import dataclass

@dataclass
class RiskLimits:
    max_order_value: float = 500_000     # Rs 5L per order
    max_position_value: float = 2_000_000 # Rs 20L per symbol
    max_portfolio_exposure: float = 5_000_000
    max_concentration_pct: float = 0.25   # 25% in one symbol
    max_orders_per_minute: int = 10
    allowed_symbols: list = None

class PreTradeRiskGate:
    """Validate orders before submission to broker."""

    def __init__(self, limits: RiskLimits, portfolio):
        self.limits = limits
        self.portfolio = portfolio
        self.recent_orders = []

    def validate(self, order) -> tuple:
        checks = [
            self._check_order_size(order),
            self._check_position_limit(order),
            self._check_concentration(order),
            self._check_portfolio_exposure(order),
            self._check_rate(order),
            self._check_symbol_allowed(order),
        ]
        failures = [msg for passed, msg in checks if not passed]
        return (len(failures) == 0, failures)

    def _check_order_size(self, order):
        value = order['price'] * order['quantity']
        ok = value <= self.limits.max_order_value
        return (ok, f"Order value {value:,.0f} exceeds limit {self.limits.max_order_value:,.0f}")

    def _check_position_limit(self, order):
        current = self.portfolio.get_position_value(order['symbol'])
        new_value = current + order['price'] * order['quantity']
        ok = new_value <= self.limits.max_position_value
        return (ok, f"Position in {order['symbol']} would exceed limit")

    def _check_concentration(self, order):
        total = self.portfolio.total_value()
        pos_value = self.portfolio.get_position_value(order['symbol'])
        conc = pos_value / total if total > 0 else 0
        ok = conc <= self.limits.max_concentration_pct
        return (ok, f"Concentration {conc:.0%} exceeds {self.limits.max_concentration_pct:.0%}")

    def _check_portfolio_exposure(self, order):
        exposure = self.portfolio.total_exposure()
        ok = exposure <= self.limits.max_portfolio_exposure
        return (ok, f"Portfolio exposure {exposure:,.0f} at limit")

    def _check_rate(self, order):
        import time
        now = time.time()
        self.recent_orders = [t for t in self.recent_orders if now - t < 60]
        ok = len(self.recent_orders) < self.limits.max_orders_per_minute
        self.recent_orders.append(now)
        return (ok, "Order rate limit exceeded")

    def _check_symbol_allowed(self, order):
        if self.limits.allowed_symbols is None:
            return (True, "")
        ok = order['symbol'] in self.limits.allowed_symbols
        return (ok, f"{order['symbol']} not in allowed list")`}),e.jsx(s,{title:"Defense in Depth",children:"Pre-trade checks are your first line of defense. Even if your strategy logic has a bug that generates a massive order, the risk gate blocks it. Log every rejected order for review -- frequent rejections often indicate a strategy bug."})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs(i,{title:"Position Sizing Methods",description:"Kelly criterion, fixed fractional, and risk-per-trade sizing for Indian markets.",children:[e.jsx(r,{term:"Kelly Criterion",children:"Optimal bet size formula: f* = (bp - q) / b, where b = odds ratio, p = win probability, q = 1-p. Maximizes long-term growth rate but produces aggressive sizing. Practitioners use fractional Kelly (25-50%)."}),e.jsx(t,{language:"python",title:"Position Sizing Algorithms",children:`import numpy as np

class PositionSizer:
    """Multiple position sizing methods."""

    def __init__(self, capital: float):
        self.capital = capital

    def fixed_fractional(self, risk_pct, entry, stop_loss, lot_size=1):
        """Risk a fixed % of capital per trade."""
        risk_amount = self.capital * risk_pct
        risk_per_unit = abs(entry - stop_loss)
        units = risk_amount / risk_per_unit
        lots = int(units // lot_size)
        return max(lots, 0) * lot_size

    def kelly_criterion(self, win_rate, avg_win, avg_loss, fraction=0.25):
        """Fractional Kelly sizing."""
        if avg_loss == 0:
            return 0
        b = avg_win / avg_loss  # Win/loss ratio
        p = win_rate
        q = 1 - p
        kelly_pct = (b * p - q) / b
        return max(0, kelly_pct * fraction)  # Fractional Kelly

    def volatility_based(self, atr, risk_pct=0.02, lot_size=1):
        """Size based on ATR (Average True Range)."""
        risk_amount = self.capital * risk_pct
        # Use 2x ATR as stop distance
        stop_distance = 2 * atr
        units = risk_amount / stop_distance
        return int(units // lot_size) * lot_size

    def equal_weight(self, num_positions, price, lot_size=1):
        """Equal capital allocation across positions."""
        per_position = self.capital / num_positions
        units = per_position / price
        return int(units // lot_size) * lot_size

# Example: Rs 10L capital, Nifty at 22000, SL at 21900
sizer = PositionSizer(1_000_000)

# Risk 2% per trade
qty = sizer.fixed_fractional(0.02, 22000, 21900, lot_size=75)
print(f"Fixed fractional: {qty} units ({qty//75} lots)")

# Kelly with 55% win rate, 1.5:1 reward:risk
kelly_pct = sizer.kelly_criterion(0.55, 150, 100, fraction=0.25)
print(f"Kelly allocation: {kelly_pct:.1%} of capital")

# ATR-based with Nifty ATR of 200 points
qty_vol = sizer.volatility_based(200, lot_size=75)
print(f"Volatility-based: {qty_vol} units")`}),e.jsx(s,{title:"Practical Sizing for Indian F&O",children:"With Nifty lot size of 75 and contract value around Rs 16-17 lakhs, a Rs 10L account can hold at most 1 lot with NRML margin. Use fixed fractional (1-2% risk) for F&O. Never size based on full Kelly -- it leads to 30-50% drawdowns that are psychologically devastating."})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(i,{title:"Max Drawdown Circuit Breaker",description:"Automated trading halts when drawdown or daily loss limits are breached.",children:[e.jsx(r,{term:"Trading Circuit Breaker",children:"An automated safety mechanism that halts all new order generation when predefined loss thresholds are hit. Unlike exchange circuit breakers, these are self-imposed limits to protect capital."}),e.jsx(t,{language:"python",title:"Multi-Level Circuit Breaker",children:`from datetime import datetime, date
from enum import Enum

class AlertLevel(Enum):
    GREEN = "GREEN"
    YELLOW = "YELLOW"
    RED = "RED"
    HALTED = "HALTED"

class TradingCircuitBreaker:
    """Multi-level circuit breaker for automated trading."""

    def __init__(self, config):
        self.config = config
        self.daily_pnl = 0.0
        self.peak_equity = config['starting_equity']
        self.current_equity = config['starting_equity']
        self.status = AlertLevel.GREEN
        self.halt_reason = None
        self.trade_date = date.today()

    def update(self, pnl_change):
        if date.today() != self.trade_date:
            self.daily_pnl = 0.0
            self.trade_date = date.today()

        self.daily_pnl += pnl_change
        self.current_equity += pnl_change
        self.peak_equity = max(self.peak_equity, self.current_equity)
        self._evaluate()

    def _evaluate(self):
        daily_loss_pct = abs(self.daily_pnl) / self.peak_equity if self.daily_pnl < 0 else 0
        drawdown = (self.peak_equity - self.current_equity) / self.peak_equity

        # Level 1: Yellow - reduce position sizes by 50%
        if daily_loss_pct > self.config['yellow_daily_loss']:
            self.status = AlertLevel.YELLOW

        # Level 2: Red - no new positions, close at opportunity
        if daily_loss_pct > self.config['red_daily_loss']:
            self.status = AlertLevel.RED

        # Level 3: Halt - flatten everything immediately
        if daily_loss_pct > self.config['halt_daily_loss']:
            self.status = AlertLevel.HALTED
            self.halt_reason = f"Daily loss {daily_loss_pct:.1%}"

        # Max drawdown halt
        if drawdown > self.config['max_drawdown']:
            self.status = AlertLevel.HALTED
            self.halt_reason = f"Drawdown {drawdown:.1%}"

    def can_trade(self):
        return self.status in (AlertLevel.GREEN, AlertLevel.YELLOW)

    def position_scale_factor(self):
        if self.status == AlertLevel.YELLOW:
            return 0.5
        if self.status in (AlertLevel.RED, AlertLevel.HALTED):
            return 0.0
        return 1.0

# Configuration
config = {
    'starting_equity': 1_000_000,
    'yellow_daily_loss': 0.01,  # 1% daily loss
    'red_daily_loss': 0.02,     # 2% daily loss
    'halt_daily_loss': 0.03,    # 3% daily loss = full halt
    'max_drawdown': 0.10,       # 10% peak drawdown = halt
}
cb = TradingCircuitBreaker(config)`}),e.jsx(s,{title:"Recovery Protocol",children:"After a HALTED state, require manual review before resuming trading. Do not auto-resume the next day. Analyze what caused the drawdown, check for strategy degradation, and only resume with reduced size (50% of normal) for the first week back."})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs(i,{title:"Emergency Kill Switch",description:"Immediate flatten-all mechanism to close every open position and cancel pending orders.",children:[e.jsx(r,{term:"Kill Switch",children:"A one-button emergency mechanism that cancels all pending orders and closes all open positions at market price. Critical safety feature for any automated trading system operating on real capital."}),e.jsx(t,{language:"python",title:"Kill Switch Implementation",children:`import logging
from datetime import datetime

logger = logging.getLogger('kill_switch')

class KillSwitch:
    """Emergency kill switch for all trading activity."""

    def __init__(self, zerodha_client=None, delta_client=None):
        self.zerodha = zerodha_client
        self.delta = delta_client
        self.activated = False
        self.activation_time = None

    def activate(self, reason="manual"):
        logger.critical(f"KILL SWITCH ACTIVATED: {reason}")
        self.activated = True
        self.activation_time = datetime.now()

        results = {'reason': reason, 'timestamp': self.activation_time}

        if self.zerodha:
            results['zerodha'] = self._flatten_zerodha()
        if self.delta:
            results['delta'] = self._flatten_delta()

        self._send_alert(results)
        return results

    def _flatten_zerodha(self):
        """Cancel all orders and close all positions on Zerodha."""
        cancelled = 0
        closed = 0

        # Cancel all pending orders
        for order in self.zerodha.orders():
            if order['status'] in ('OPEN', 'TRIGGER PENDING'):
                try:
                    self.zerodha.cancel_order(
                        variety='regular', order_id=order['order_id']
                    )
                    cancelled += 1
                except Exception as e:
                    logger.error(f"Cancel failed: {order['order_id']}: {e}")

        # Flatten all positions
        for pos in self.zerodha.positions()['net']:
            if pos['quantity'] == 0:
                continue
            side = 'SELL' if pos['quantity'] > 0 else 'BUY'
            try:
                self.zerodha.place_order(
                    variety='regular',
                    exchange=pos['exchange'],
                    tradingsymbol=pos['tradingsymbol'],
                    transaction_type=side,
                    quantity=abs(pos['quantity']),
                    product=pos['product'],
                    order_type='MARKET',
                )
                closed += 1
            except Exception as e:
                logger.error(f"Flatten failed: {pos['tradingsymbol']}: {e}")

        return {'cancelled': cancelled, 'closed': closed}

    def _flatten_delta(self):
        """Close all positions on Delta Exchange."""
        closed = 0
        positions = self.delta.get_positions().get('result', [])
        for pos in positions:
            if pos['size'] == 0:
                continue
            side = 'sell' if pos['size'] > 0 else 'buy'
            self.delta.place_order(
                symbol=pos['symbol'], size=abs(pos['size']),
                side=side, order_type='market_order',
            )
            closed += 1
        return {'closed': closed}

    def _send_alert(self, results):
        logger.critical(f"Kill switch results: {results}")
        # Trigger Telegram/Discord alert here

    def is_active(self):
        return self.activated`}),e.jsx(s,{title:"Kill Switch Access",children:"Make the kill switch accessible from multiple channels: a CLI command, a web dashboard button, a Telegram bot command (/kill), and automatic triggering from the circuit breaker. Test the kill switch weekly during paper trading to ensure it works when you need it most."})]})}const G=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs(i,{title:"WebSocket Reconnection & Heartbeat",description:"Maintaining persistent connections with automatic recovery for Kite and Delta WebSockets.",children:[e.jsx(r,{term:"Heartbeat",children:"A periodic ping/pong message exchange between client and server to verify the connection is alive. If no heartbeat response within a timeout, the client assumes disconnection and initiates reconnection."}),e.jsx(t,{language:"python",title:"Resilient WebSocket Manager",children:`import asyncio
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
asyncio.run(ws.connect())`}),e.jsx(s,{title:"Kite WebSocket Specifics",children:"Kite WebSocket drops connections after 5 minutes of no subscription activity. Always subscribe to at least one instrument immediately after connect. The Kite SDK handles reconnection internally, but add your own monitoring layer to track reconnect frequency."})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function T(){return e.jsxs(i,{title:"Order Reconciliation",description:"Synchronizing local order state with exchange state to detect and resolve discrepancies.",children:[e.jsx(r,{term:"Order Reconciliation",children:"The process of comparing local order records against the broker/exchange records to ensure consistency. Discrepancies can arise from network failures, race conditions, or missed WebSocket updates."}),e.jsx(t,{language:"python",title:"Order Reconciliation Engine",children:`import logging
from datetime import datetime

logger = logging.getLogger('reconciliation')

class OrderReconciler:
    """Reconcile local orders with broker state."""

    def __init__(self, broker, local_store):
        self.broker = broker
        self.store = local_store

    def reconcile(self):
        """Compare local orders with broker orders."""
        broker_orders = {o['order_id']: o for o in self.broker.orders()}
        local_orders = self.store.get_active_orders()

        discrepancies = []

        for order_id, local in local_orders.items():
            broker = broker_orders.get(order_id)
            if not broker:
                discrepancies.append({
                    'type': 'MISSING_AT_BROKER',
                    'order_id': order_id,
                    'local_status': local['status'],
                })
                continue

            if local['status'] != broker['status']:
                discrepancies.append({
                    'type': 'STATUS_MISMATCH',
                    'order_id': order_id,
                    'local_status': local['status'],
                    'broker_status': broker['status'],
                })

            if local.get('filled_qty', 0) != broker.get('filled_quantity', 0):
                discrepancies.append({
                    'type': 'FILL_QTY_MISMATCH',
                    'order_id': order_id,
                    'local_filled': local.get('filled_qty'),
                    'broker_filled': broker.get('filled_quantity'),
                })

        # Check for broker orders not tracked locally
        for order_id in broker_orders:
            if order_id not in local_orders:
                discrepancies.append({
                    'type': 'UNKNOWN_BROKER_ORDER',
                    'order_id': order_id,
                    'broker_status': broker_orders[order_id]['status'],
                })

        return discrepancies

    def resolve(self, discrepancies):
        for d in discrepancies:
            if d['type'] == 'STATUS_MISMATCH':
                # Trust broker as source of truth
                self.store.update_order(d['order_id'], {
                    'status': d['broker_status']
                })
                logger.info(f"Fixed {d['order_id']}: {d['local_status']} -> {d['broker_status']}")

            elif d['type'] == 'FILL_QTY_MISMATCH':
                self.store.update_order(d['order_id'], {
                    'filled_qty': d['broker_filled']
                })

            elif d['type'] == 'UNKNOWN_BROKER_ORDER':
                logger.warning(f"Unknown order at broker: {d['order_id']}")

# Run reconciliation every 60 seconds
reconciler = OrderReconciler(kite, order_store)
issues = reconciler.reconcile()
if issues:
    logger.warning(f"Found {len(issues)} discrepancies")
    reconciler.resolve(issues)`}),e.jsx(s,{title:"Reconciliation Frequency",children:"Run reconciliation every 30-60 seconds during market hours. Also trigger it immediately after WebSocket reconnection and at market open/close. Always treat the broker state as the source of truth -- your local state must conform to it."})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs(i,{title:"Failover & Disaster Recovery",description:"Backup systems, failover procedures, and recovery plans for trading infrastructure.",children:[e.jsx(r,{term:"Failover",children:"Automatic switching to a backup system when the primary fails. For trading systems, failover must happen in seconds, not minutes, to prevent unmanaged positions during market hours."}),e.jsx(t,{language:"python",title:"Health Monitor with Failover",children:`import time
import subprocess
import logging

logger = logging.getLogger('failover')

class TradingSystemMonitor:
    """Monitor primary system and trigger failover."""

    def __init__(self, primary_host, backup_host, check_interval=10):
        self.primary = primary_host
        self.backup = backup_host
        self.interval = check_interval
        self.primary_failures = 0
        self.max_failures = 3
        self.active_host = primary_host

    def health_check(self, host):
        try:
            import requests
            resp = requests.get(
                f"http://{host}:8080/health", timeout=5
            )
            return resp.status_code == 200 and resp.json().get('trading_active')
        except Exception:
            return False

    def failover_to_backup(self):
        logger.critical("FAILOVER: Switching to backup system")
        self.active_host = self.backup

        # Transfer state to backup
        state = self._get_current_state()
        self._push_state_to_backup(state)

        # Start trading on backup
        import requests
        requests.post(f"http://{self.backup}:8080/activate", json=state)
        logger.info(f"Backup system activated at {self.backup}")

    def _get_current_state(self):
        return {
            'positions': self._fetch_positions(),
            'pending_orders': self._fetch_pending_orders(),
            'circuit_breaker_state': self._fetch_cb_state(),
            'timestamp': time.time(),
        }

    def monitor_loop(self):
        while True:
            if not self.health_check(self.primary):
                self.primary_failures += 1
                logger.warning(
                    f"Primary health check failed ({self.primary_failures}/{self.max_failures})"
                )
                if self.primary_failures >= self.max_failures:
                    self.failover_to_backup()
                    break
            else:
                self.primary_failures = 0
            time.sleep(self.interval)`}),e.jsx(t,{language:"python",title:"State Checkpoint for Recovery",children:`import json
import redis

class StateCheckpoint:
    """Persist trading state for crash recovery."""

    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379)

    def save(self, state: dict):
        self.redis.set('trading_state', json.dumps(state))
        self.redis.set('state_timestamp', str(time.time()))

    def restore(self):
        data = self.redis.get('trading_state')
        if data:
            return json.loads(data)
        return None

    def is_stale(self, max_age_seconds=60):
        ts = self.redis.get('state_timestamp')
        if not ts:
            return True
        return (time.time() - float(ts)) > max_age_seconds`}),e.jsx(s,{title:"Recovery Checklist",children:"After any system crash during market hours: (1) check open positions via broker API, (2) reconcile with last checkpoint, (3) verify all stop-losses are active, (4) resume trading at 50% position size. Document every incident for post-market review."})]})}const W=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function w(){return e.jsxs(i,{title:"Audit Trail & Compliance Logging",description:"Maintaining comprehensive trade records for analysis, debugging, and regulatory compliance.",children:[e.jsx(r,{term:"Audit Trail",children:"A chronological record of every trading decision, order, fill, and system event. Essential for post-trade analysis, debugging strategy issues, and meeting SEBI record-keeping requirements for algo trading."}),e.jsx(t,{language:"python",title:"Structured Audit Logger",children:`import json
import logging
from datetime import datetime
from pathlib import Path

class AuditLogger:
    """Immutable audit trail for all trading activity."""

    def __init__(self, log_dir="logs/audit"):
        Path(log_dir).mkdir(parents=True, exist_ok=True)
        self.logger = logging.getLogger('audit')
        handler = logging.FileHandler(
            f"{log_dir}/audit_{datetime.now():%Y%m%d}.jsonl"
        )
        handler.setFormatter(logging.Formatter('%(message)s'))
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)

    def log_event(self, event_type, data):
        record = {
            'timestamp': datetime.now().isoformat(),
            'event_type': event_type,
            **data,
        }
        self.logger.info(json.dumps(record))

    def log_signal(self, strategy, symbol, direction, reason):
        self.log_event('SIGNAL', {
            'strategy': strategy,
            'symbol': symbol,
            'direction': direction,
            'reason': reason,
        })

    def log_order(self, order_id, symbol, side, qty, price, order_type):
        self.log_event('ORDER_SUBMITTED', {
            'order_id': order_id, 'symbol': symbol,
            'side': side, 'quantity': qty,
            'price': price, 'order_type': order_type,
        })

    def log_fill(self, order_id, fill_price, fill_qty, commission):
        self.log_event('ORDER_FILLED', {
            'order_id': order_id, 'fill_price': fill_price,
            'fill_qty': fill_qty, 'commission': commission,
        })

    def log_risk_event(self, event, details):
        self.log_event('RISK_EVENT', {
            'event': event, 'details': details,
        })

audit = AuditLogger()
audit.log_signal('mean_reversion', 'NIFTY25MARFUT', 'BUY', 'RSI < 30')
audit.log_order('ORD001', 'NIFTY25MARFUT', 'BUY', 75, 22000, 'LIMIT')`}),e.jsx(t,{language:"python",title:"Audit Report Generator",children:`import pandas as pd

class AuditReporter:
    def __init__(self, audit_file):
        records = []
        with open(audit_file) as f:
            for line in f:
                records.append(json.loads(line))
        self.df = pd.DataFrame(records)

    def daily_summary(self):
        fills = self.df[self.df['event_type'] == 'ORDER_FILLED']
        return {
            'total_orders': len(self.df[self.df['event_type'] == 'ORDER_SUBMITTED']),
            'total_fills': len(fills),
            'total_commission': fills['commission'].sum(),
            'risk_events': len(self.df[self.df['event_type'] == 'RISK_EVENT']),
        }`}),e.jsx(s,{title:"SEBI Algo Trading Requirements",children:"SEBI requires algo traders to maintain detailed order logs including timestamps, strategy identifiers, and modification history. Retain records for a minimum of 5 years. Use append-only JSONL files that cannot be retroactively modified."})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));export{q as a,L as b,A as c,j as d,R as e,P as f,M as g,C as h,I as i,N as j,D as k,z as l,F as m,B as n,U as o,G as p,K as q,Y as r,O as s,W as t,H as u};
