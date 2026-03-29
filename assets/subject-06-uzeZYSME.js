import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as a,D as i,C as t,N as r}from"./subject-01-B5qsZKsm.js";const I={id:"06-order-flow",title:"Order Flow & Market Microstructure",icon:"🔄",colorHex:"#ec4899",description:"Master order book dynamics, market depth analysis, and institutional flow tracking.",difficulty:"advanced",estimatedHours:5,prerequisites:["05-technical-indicators"],chapters:[{id:"c1-order-book",title:"Order Book Dynamics",description:"Understand Level 2 data, spread analysis, and book imbalance signals.",estimatedMinutes:55,sections:[{id:"s1-level2-data",title:"Level 2 Data & Book Structure",difficulty:"advanced",readingMinutes:15,description:"Level 2 data structure, bid/ask arrays, and depth."},{id:"s2-spread-analysis",title:"Bid-Ask Spread Analysis",difficulty:"advanced",readingMinutes:12,description:"Effective spread, realized spread, and market quality."},{id:"s3-book-imbalance",title:"Book Imbalance & Pressure",difficulty:"advanced",readingMinutes:12,description:"Order book imbalance ratio and directional pressure."},{id:"s4-heatmaps",title:"Order Book Heatmaps",difficulty:"advanced",readingMinutes:15,description:"Visualize order book depth with Python heatmaps."}]},{id:"c2-market-depth",title:"Market Depth Analysis",description:"Read the DOM, map liquidity, and detect hidden orders.",estimatedMinutes:55,sections:[{id:"s1-dom",title:"Depth of Market (DOM)",difficulty:"advanced",readingMinutes:15,description:"Reading DOM for Nifty futures trading."},{id:"s2-liquidity-mapping",title:"Liquidity Mapping",difficulty:"advanced",readingMinutes:12,description:"Identify liquidity layers and thin/thick zones."},{id:"s3-iceberg-orders",title:"Iceberg & Hidden Orders",difficulty:"advanced",readingMinutes:12,description:"Detect iceberg orders and hidden liquidity."},{id:"s4-queue-position",title:"Queue Position Estimation",difficulty:"advanced",readingMinutes:15,description:"Estimate queue position and priority at NSE."}]},{id:"c3-order-flow-trading",title:"Order Flow Trading",description:"Trade with footprint charts, cumulative delta, and volume profile.",estimatedMinutes:55,sections:[{id:"s1-footprint-charts",title:"Footprint Charts & Delta",difficulty:"advanced",readingMinutes:15,description:"Footprint charts with delta per price level."},{id:"s2-cumulative-delta",title:"Cumulative Delta Analysis",difficulty:"advanced",readingMinutes:12,description:"Cumulative delta divergence and confirmation."},{id:"s3-absorption",title:"Absorption & Exhaustion Patterns",difficulty:"advanced",readingMinutes:12,description:"Identify absorption and exhaustion at key levels."},{id:"s4-volume-profile",title:"POC, VAH, VAL (Volume Profile)",difficulty:"advanced",readingMinutes:15,description:"Point of Control and Value Area for trading."}]},{id:"c4-microstructure",title:"Microstructure Models",description:"Apply academic microstructure models to Indian market data.",estimatedMinutes:55,sections:[{id:"s1-kyle-lambda",title:"Kyle Lambda & Price Impact",difficulty:"advanced",readingMinutes:15,description:"Kyle model for measuring market impact."},{id:"s2-pin-vpin",title:"PIN & VPIN (Informed Trading)",difficulty:"advanced",readingMinutes:15,description:"Probability of informed trading metrics."},{id:"s3-toxicity",title:"Toxicity Metrics",difficulty:"advanced",readingMinutes:12,description:"Flow toxicity and adverse selection measures."},{id:"s4-market-making",title:"Market Making Dynamics",difficulty:"advanced",readingMinutes:12,description:"Market making inventory risk and spread."}]},{id:"c5-tape-reading",title:"Tape Reading",description:"Analyze time & sales, detect large orders, and track institutional flow.",estimatedMinutes:50,sections:[{id:"s1-time-sales",title:"Time & Sales Analysis",difficulty:"advanced",readingMinutes:12,description:"Trade classification and T&S interpretation."},{id:"s2-large-orders",title:"Large Order Detection",difficulty:"advanced",readingMinutes:12,description:"Algorithms for detecting large order activity."},{id:"s3-sweep-block",title:"Sweep & Block Trade Identification",difficulty:"advanced",readingMinutes:12,description:"Identify sweep orders and block trades."},{id:"s4-institutional-flow",title:"Institutional Flow Tracking",difficulty:"advanced",readingMinutes:12,description:"Track institutional activity in Indian markets."}]}]};function s(){return e.jsxs(a,{title:"Level 2 Data: Bid/Ask Arrays",description:"Understanding the order book structure with Level 2 market data on NSE.",children:[e.jsx(i,{term:"Level 2 Data",children:"Displays the full depth of pending buy (bid) and sell (ask) orders at each price level. NSE provides 5 levels of depth in standard feeds and 20 levels via Tick-by-Tick (TBT) data."}),e.jsx(t,{language:"python",title:"Representing L2 Order Book",children:`import numpy as np

# Level 2 snapshot for Nifty Futures
bids = [
    {'price': 22450.00, 'qty': 1800, 'orders': 12},
    {'price': 22449.50, 'qty': 2400, 'orders': 18},
    {'price': 22449.00, 'qty': 3100, 'orders': 22},
    {'price': 22448.50, 'qty': 1500, 'orders': 9},
    {'price': 22448.00, 'qty': 4200, 'orders': 31},
]

asks = [
    {'price': 22450.50, 'qty': 1600, 'orders': 10},
    {'price': 22451.00, 'qty': 2800, 'orders': 15},
    {'price': 22451.50, 'qty': 2200, 'orders': 19},
    {'price': 22452.00, 'qty': 3500, 'orders': 25},
    {'price': 22452.50, 'qty': 1900, 'orders': 14},
]

best_bid = bids[0]['price']
best_ask = asks[0]['price']
spread = best_ask - best_bid
mid_price = (best_bid + best_ask) / 2
print(f"Spread: {spread:.2f} | Mid: {mid_price:.2f}")

# Total depth on each side
total_bid_qty = sum(b['qty'] for b in bids)
total_ask_qty = sum(a['qty'] for a in asks)
print(f"Bid depth: {total_bid_qty} | Ask depth: {total_ask_qty}")`}),e.jsx(r,{title:"NSE Data Access",children:"NSE provides Level 2 data via broker APIs (Zerodha Kite, Angel One SmartAPI). Full TBT data with 20-level depth is available through NSE co-location feeds for high-frequency participants."}),e.jsx(t,{language:"python",title:"Streaming L2 Updates via Kite WebSocket",children:`from kiteconnect import KiteTicker

def on_ticks(ws, ticks):
    for tick in ticks:
        if 'depth' in tick:
            bids = tick['depth']['buy']
            asks = tick['depth']['sell']
            for i, level in enumerate(bids[:5]):
                print(f"Bid L{i+1}: {level['price']} x {level['quantity']}")

kws = KiteTicker("your_api_key", "your_access_token")
kws.on_ticks = on_ticks
kws.subscribe([256265])        # Nifty 50 instrument token
kws.set_mode(kws.MODE_FULL, [256265])
kws.connect(threaded=True)`}),e.jsx(r,{title:"Tick Size Matters",children:"Nifty futures tick at 0.05 points. Each price level in the book can aggregate multiple orders. High order count at a level often signals retail clustering, while few large orders suggest institutions."})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:s},Symbol.toStringTag,{value:"Module"}));function n(){return e.jsxs(a,{title:"Bid-Ask Spread Analysis",description:"Measuring spread types to gauge liquidity and trading costs on NSE.",children:[e.jsx(i,{term:"Quoted Spread",children:"The difference between the best ask and best bid price. On liquid Nifty futures this is typically 0.05-0.15 points during market hours."}),e.jsx(i,{term:"Effective Spread",children:"Twice the absolute difference between the trade price and the midpoint. Measures actual execution cost including price improvement."}),e.jsx(i,{term:"Realized Spread",children:"Effective spread minus the price impact component, measured over a short horizon (e.g., 5 minutes). Approximates market maker revenue."}),e.jsx(t,{language:"python",title:"Computing Spread Metrics",children:`import pandas as pd
import numpy as np

# Simulated tick data for Nifty Futures
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=1000, freq='1s'),
    'price': np.random.normal(22450, 2, 1000).round(2),
    'bid': np.random.normal(22449.5, 1.5, 1000).round(2),
    'ask': np.random.normal(22450.5, 1.5, 1000).round(2),
})

# Quoted spread
trades['quoted_spread'] = trades['ask'] - trades['bid']
trades['mid'] = (trades['bid'] + trades['ask']) / 2

# Effective spread
trades['effective_spread'] = 2 * abs(trades['price'] - trades['mid'])

# Realized spread (5-second forward midpoint)
trades['mid_fwd'] = trades['mid'].shift(-5)
trades['realized_spread'] = 2 * (trades['price'] - trades['mid_fwd'])

print(f"Avg quoted spread:    {trades['quoted_spread'].mean():.4f}")
print(f"Avg effective spread: {trades['effective_spread'].mean():.4f}")
print(f"Avg realized spread:  {trades['realized_spread'].mean():.4f}")`}),e.jsx(r,{title:"Spread Widening Signals",children:"Spreads on BankNifty futures widen significantly during RBI policy announcements and US Fed decisions. A sudden spread widening without news often indicates informed order flow entering the market."}),e.jsx(t,{language:"python",title:"Intraday Spread Pattern",children:`# Spread tends to follow U-shape through the day
spread_by_minute = trades.set_index('time').resample('1min')
avg_spread = spread_by_minute['quoted_spread'].mean()

# Typically widest at 9:15-9:30 and 3:15-3:30
# Tightest between 11:00-14:00 on Nifty futures
print(avg_spread.describe())`})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:n},Symbol.toStringTag,{value:"Module"}));function d(){return e.jsxs(a,{title:"Order Book Imbalance",description:"Using bid/ask volume ratios to detect buying and selling pressure.",children:[e.jsx(i,{term:"Book Imbalance Ratio",children:"(Bid Volume - Ask Volume) / (Bid Volume + Ask Volume). Ranges from -1 (all ask) to +1 (all bid). Values above +0.3 suggest buying pressure; below -0.3 suggest selling pressure."}),e.jsx(t,{language:"python",title:"Computing Book Imbalance",children:`import numpy as np
import pandas as pd

def book_imbalance(bids, asks, levels=5):
    """Calculate order book imbalance across N levels."""
    bid_vol = sum(b['qty'] for b in bids[:levels])
    ask_vol = sum(a['qty'] for a in asks[:levels])
    if bid_vol + ask_vol == 0:
        return 0
    return (bid_vol - ask_vol) / (bid_vol + ask_vol)

# Nifty Futures snapshot
bids = [
    {'price': 22450, 'qty': 3200},
    {'price': 22449.5, 'qty': 2800},
    {'price': 22449, 'qty': 1500},
    {'price': 22448.5, 'qty': 4100},
    {'price': 22448, 'qty': 2200},
]
asks = [
    {'price': 22450.5, 'qty': 1200},
    {'price': 22451, 'qty': 1800},
    {'price': 22451.5, 'qty': 900},
    {'price': 22452, 'qty': 1400},
    {'price': 22452.5, 'qty': 1100},
]

imb = book_imbalance(bids, asks)
print(f"Imbalance: {imb:.3f}")  # Positive = bid-heavy`}),e.jsx(t,{language:"python",title:"Weighted Imbalance by Price Proximity",children:`def weighted_imbalance(bids, asks, mid_price, levels=5):
    """Weight levels by inverse distance from mid price."""
    def weighted_sum(orders):
        total = 0
        for o in orders[:levels]:
            dist = abs(o['price'] - mid_price)
            weight = 1 / (1 + dist)
            total += o['qty'] * weight
        return total

    w_bid = weighted_sum(bids)
    w_ask = weighted_sum(asks)
    return (w_bid - w_ask) / (w_bid + w_ask)

mid = (bids[0]['price'] + asks[0]['price']) / 2
wimb = weighted_imbalance(bids, asks, mid)
print(f"Weighted imbalance: {wimb:.3f}")`}),e.jsx(r,{title:"Predictive Power",children:"On Nifty futures, a sustained imbalance above +0.4 across 5 levels over 10+ seconds has shown short-term predictive power for upward price movement. Combine with trade flow direction for confirmation."})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"}));function l(){return e.jsxs(a,{title:"Order Book Heatmap Visualization",description:"Building real-time heatmaps to visualize order book depth over time.",children:[e.jsx(i,{term:"Order Book Heatmap",children:"A 2D visualization with time on the x-axis, price on the y-axis, and color intensity representing order quantity. Reveals support/resistance walls and spoofing patterns."}),e.jsx(t,{language:"python",title:"Building an Order Book Heatmap",children:`import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LogNorm

# Simulate 60 snapshots (1 per second) across 20 price levels
np.random.seed(42)
n_times, n_levels = 60, 20
prices = np.arange(22440, 22440 + n_levels * 0.5, 0.5)

# Bid side heatmap data (quantity at each price/time)
bid_heat = np.random.exponential(500, (n_levels, n_times))
# Add a large "wall" at 22445
wall_idx = np.where(prices == 22445.0)[0][0]
bid_heat[wall_idx, :] += 3000

fig, ax = plt.subplots(figsize=(14, 6))
im = ax.pcolormesh(
    range(n_times), prices, bid_heat,
    cmap='YlOrRd', norm=LogNorm(vmin=100, vmax=5000)
)
ax.set_xlabel('Time (seconds)')
ax.set_ylabel('Price Level')
ax.set_title('Nifty Futures - Bid Side Heatmap')
plt.colorbar(im, label='Order Quantity')
plt.tight_layout()
plt.savefig('orderbook_heatmap.png', dpi=150)`}),e.jsx(r,{title:"Reading the Heatmap",children:"Bright horizontal bands indicate large resting orders (support walls). If a wall suddenly disappears (spoofing), expect a fast move through that level. Watch for walls that build just before expiry on Nifty weekly options -- these often mark max pain zones."}),e.jsx(t,{language:"python",title:"Real-Time Streaming Heatmap",children:`import collections

class OrderBookHeatmap:
    def __init__(self, history=120):
        self.history = history
        self.snapshots = collections.deque(maxlen=history)

    def update(self, bids, asks):
        """Store a snapshot of bid/ask quantities by price."""
        snap = {}
        for b in bids:
            snap[b['price']] = {'side': 'bid', 'qty': b['qty']}
        for a in asks:
            snap[a['price']] = {'side': 'ask', 'qty': a['qty']}
        self.snapshots.append(snap)

    def detect_walls(self, threshold=3.0):
        """Find price levels with qty > threshold * median."""
        if not self.snapshots:
            return []
        latest = self.snapshots[-1]
        qtys = [v['qty'] for v in latest.values()]
        med = np.median(qtys) if qtys else 1
        return [p for p, v in latest.items()
                if v['qty'] > threshold * med]

heatmap = OrderBookHeatmap()
# Call heatmap.update(bids, asks) on each tick`})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"}));function o(){return e.jsxs(a,{title:"Depth of Market (DOM)",description:"Reading the DOM ladder for Nifty and BankNifty futures trading.",children:[e.jsx(i,{term:"Depth of Market (DOM)",children:"A real-time display of all resting limit orders at each price level, shown as a vertical ladder. Traders read DOM to gauge supply/demand balance and anticipate short-term price direction."}),e.jsx(t,{language:"python",title:"Building a DOM Display",children:`def display_dom(bids, asks, levels=5):
    """Print a DOM ladder for Nifty futures."""
    print(f"{'BID QTY':>10} {'PRICE':>10} {'ASK QTY':>10}")
    print("-" * 35)

    # Ask side (top to bottom, highest first)
    for a in reversed(asks[:levels]):
        print(f"{'':>10} {a['price']:>10.2f} {a['qty']:>10,}")

    print(f"{'--- SPREAD ---':^35}")

    # Bid side
    for b in bids[:levels]:
        print(f"{b['qty']:>10,} {b['price']:>10.2f}")

bids = [
    {'price': 22450.00, 'qty': 2400},
    {'price': 22449.50, 'qty': 1800},
    {'price': 22449.00, 'qty': 3600},
    {'price': 22448.50, 'qty': 900},
    {'price': 22448.00, 'qty': 5200},
]
asks = [
    {'price': 22450.50, 'qty': 1100},
    {'price': 22451.00, 'qty': 2700},
    {'price': 22451.50, 'qty': 1500},
    {'price': 22452.00, 'qty': 4300},
    {'price': 22452.50, 'qty': 800},
]
display_dom(bids, asks)`}),e.jsx(r,{title:"DOM Reading Tips for Nifty Futures",children:"Look for asymmetry: if bid depth at levels 1-3 is 3x the ask depth, buyers are stacking. A thin ask side with a large bid wall often leads to an upward push. Conversely, sudden bid cancellations (pulling) before a move down indicate informed selling."}),e.jsx(t,{language:"python",title:"DOM Change Tracking",children:`class DOMTracker:
    def __init__(self):
        self.prev_bids = {}
        self.prev_asks = {}

    def update(self, bids, asks):
        curr_bids = {b['price']: b['qty'] for b in bids}
        curr_asks = {a['price']: a['qty'] for a in asks}

        # Detect new or increased orders
        for price, qty in curr_bids.items():
            prev = self.prev_bids.get(price, 0)
            if qty > prev + 500:
                print(f"BID ADD: {qty - prev} @ {price}")

        # Detect pulled orders
        for price, qty in self.prev_asks.items():
            if price not in curr_asks and qty > 1000:
                print(f"ASK PULL: {qty} removed @ {price}")

        self.prev_bids = curr_bids
        self.prev_asks = curr_asks`})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"}));function c(){return e.jsxs(a,{title:"Liquidity Mapping",description:"Identifying thin and thick zones in the order book for execution planning.",children:[e.jsx(i,{term:"Liquidity Layer",children:"A price zone where resting order volume is significantly above average. These layers act as short-term support/resistance and absorb aggressive market orders before price can break through."}),e.jsx(i,{term:"Thin Book Zone",children:"Price levels with minimal resting orders. Price moves quickly through thin zones, causing slippage for large orders and creating fast spikes."}),e.jsx(t,{language:"python",title:"Mapping Liquidity Layers",children:`import numpy as np

def map_liquidity(bids, asks, threshold_mult=2.0):
    """Classify price levels as thick or thin liquidity."""
    all_qty = [o['qty'] for o in bids + asks]
    median_qty = np.median(all_qty)
    threshold = median_qty * threshold_mult

    layers = {'thick_bid': [], 'thick_ask': [], 'thin': []}

    for b in bids:
        if b['qty'] >= threshold:
            layers['thick_bid'].append(b['price'])

    for a in asks:
        if a['qty'] >= threshold:
            layers['thick_ask'].append(a['price'])

    for o in bids + asks:
        if o['qty'] < median_qty * 0.3:
            layers['thin'].append(o['price'])

    return layers

# Example: 10-level Nifty futures book
bids = [{'price': 22450 - i*0.5, 'qty': q}
        for i, q in enumerate([1200, 800, 4500, 300, 2100,
                                600, 3800, 200, 1100, 900])]
asks = [{'price': 22450.5 + i*0.5, 'qty': q}
        for i, q in enumerate([1000, 5200, 700, 400, 3000,
                                800, 200, 1500, 2800, 600])]

layers = map_liquidity(bids, asks)
print("Thick bid walls:", layers['thick_bid'])
print("Thick ask walls:", layers['thick_ask'])
print("Thin zones:", layers['thin'])`}),e.jsx(r,{title:"Execution Insight",children:"When placing large orders on BankNifty futures, route through thick liquidity zones to minimize slippage. Avoid market orders when the book shows thin zones near the current price -- use limit orders instead and let the market come to you."})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs(a,{title:"Detecting Iceberg & Hidden Orders",description:"Algorithms to identify large concealed orders in the NSE order book.",children:[e.jsx(i,{term:"Iceberg Order",children:"A large order split into visible and hidden portions. NSE supports disclosed quantity orders where only a fraction shows in the book. The hidden portion refills automatically as the visible part executes."}),e.jsx(t,{language:"python",title:"Iceberg Detection Algorithm",children:`class IcebergDetector:
    """Detect iceberg orders by tracking repeated refills at same price."""

    def __init__(self, refill_threshold=3):
        self.price_history = {}  # price -> list of qty observations
        self.refill_threshold = refill_threshold

    def update(self, price, visible_qty, traded_qty):
        if price not in self.price_history:
            self.price_history[price] = []

        history = self.price_history[price]

        # If qty dropped then refilled to similar level
        if (history and
            traded_qty > 0 and
            abs(visible_qty - history[-1]) < visible_qty * 0.2):
            history.append(visible_qty)
        else:
            history.append(visible_qty)

        # Repeated refills suggest iceberg
        if len(history) >= self.refill_threshold:
            refills = sum(1 for i in range(1, len(history))
                         if abs(history[i] - history[i-1]) < history[i] * 0.2)
            if refills >= self.refill_threshold - 1:
                return True
        return False

detector = IcebergDetector(refill_threshold=3)
# Simulated: price 22450 keeps showing 200 qty after fills
for _ in range(4):
    result = detector.update(22450.0, 200, 200)
print(f"Iceberg detected: {result}")  # True`}),e.jsx(r,{title:"NSE Disclosed Quantity Rules",children:"On NSE, the disclosed quantity must be at least 10% of the total order quantity. So a 200-lot disclosed order implies at least 2000 total lots. Watch for prices that keep refilling after trades -- this is the hallmark of institutional accumulation."}),e.jsx(t,{language:"python",title:"Volume Anomaly at Price Level",children:`def detect_hidden_volume(trades_at_price, visible_qty):
    """If executed volume far exceeds visible qty, hidden orders exist."""
    total_traded = sum(t['qty'] for t in trades_at_price)
    ratio = total_traded / max(visible_qty, 1)
    if ratio > 3.0:
        print(f"Hidden volume ratio: {ratio:.1f}x visible")
        return True
    return False`})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs(a,{title:"Queue Position Estimation",description:"Understanding order priority rules at NSE and estimating queue position.",children:[e.jsx(i,{term:"Price-Time Priority",children:"NSE follows price-time priority (FIFO). At each price level, the order placed earliest gets filled first. Knowing your queue position helps estimate fill probability for limit orders."}),e.jsx(t,{language:"python",title:"Estimating Queue Position",children:`class QueueEstimator:
    """Estimate queue position for a limit order at NSE."""

    def __init__(self):
        self.snapshots = []

    def place_order(self, price, qty, current_book):
        """Estimate position when placing a limit order."""
        level = next((b for b in current_book
                      if b['price'] == price), None)
        if level:
            # Orders ahead = existing quantity at this price
            ahead = level['qty']
            total = ahead + qty
            return {'ahead': ahead, 'total': total,
                    'fill_prob': qty / total}
        else:
            # New price level - we are first
            return {'ahead': 0, 'total': qty, 'fill_prob': 1.0}

    def update_position(self, prev_qty, curr_qty, our_qty):
        """Track position as orders ahead get filled or cancelled."""
        qty_removed = max(0, prev_qty - curr_qty)
        ahead = max(0, prev_qty - our_qty - qty_removed)
        return ahead

# Example: placing 50 lots at 22450 with 1200 lots ahead
estimator = QueueEstimator()
book = [{'price': 22450, 'qty': 1200, 'orders': 15}]
pos = estimator.place_order(22450, 50, book)
print(f"Ahead: {pos['ahead']} lots")
print(f"Est fill prob: {pos['fill_prob']:.2%}")`}),e.jsx(r,{title:"NSE Queue Priority Rules",children:"NSE uses pure price-time priority with no pro-rata allocation. Market orders get highest priority, then limit orders by price, then by timestamp within the same price. IOC and FOK orders that do not fill immediately are cancelled -- they do not enter the queue."}),e.jsx(t,{language:"python",title:"Fill Probability Over Time",children:`def estimate_fill_time(ahead_qty, avg_trade_rate):
    """Estimate seconds until our order reaches front of queue."""
    if avg_trade_rate <= 0:
        return float('inf')
    return ahead_qty / avg_trade_rate

# Nifty futures: ~500 lots/second during active hours
fill_time = estimate_fill_time(ahead_qty=1200, avg_trade_rate=500)
print(f"Estimated fill time: {fill_time:.1f} seconds")`})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs(a,{title:"Footprint Charts",description:"Visualizing delta per price level to read aggressive buying vs selling.",children:[e.jsx(i,{term:"Footprint Chart",children:"A candle-based chart showing bid volume and ask volume at each price level within the bar. The delta (ask vol - bid vol) at each level reveals where aggressive buyers or sellers dominated."}),e.jsx(t,{language:"python",title:"Building Footprint Data",children:`import pandas as pd
import numpy as np

def classify_trades(trades):
    """Classify trades as buy or sell using tick rule."""
    trades = trades.sort_values('time').copy()
    trades['direction'] = np.where(
        trades['price'] > trades['price'].shift(1), 'buy',
        np.where(trades['price'] < trades['price'].shift(1), 'sell', 'unknown')
    )
    return trades

def build_footprint(trades, bar_duration='5min'):
    """Build footprint data: bid/ask volume at each price per bar."""
    trades['bar'] = trades['time'].dt.floor(bar_duration)
    grouped = trades.groupby(['bar', 'price', 'direction'])['qty'].sum()
    grouped = grouped.unstack(fill_value=0).reset_index()

    if 'buy' not in grouped.columns:
        grouped['buy'] = 0
    if 'sell' not in grouped.columns:
        grouped['sell'] = 0

    grouped['delta'] = grouped['buy'] - grouped['sell']
    return grouped[['bar', 'price', 'buy', 'sell', 'delta']]

# Example usage
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=500, freq='2s'),
    'price': np.random.choice(
        np.arange(22448, 22453, 0.5), 500),
    'qty': np.random.randint(10, 200, 500)
})
fp = build_footprint(classify_trades(trades))
print(fp.head(10))`}),e.jsx(r,{title:"Reading Footprint Patterns",children:"A bar with positive delta at the high and negative delta at the low is a strong bullish bar (buyers aggressive at top, sellers absorbed at bottom). The reverse pattern signals bearish conviction."}),e.jsx(t,{language:"python",title:"Delta Divergence Signal",children:`def delta_divergence(footprint_bars):
    """Detect price making new high but delta declining."""
    bars = footprint_bars.groupby('bar').agg(
        high=('price', 'max'),
        bar_delta=('delta', 'sum')
    ).reset_index()

    bars['price_hh'] = bars['high'] > bars['high'].shift(1)
    bars['delta_lh'] = bars['bar_delta'] < bars['bar_delta'].shift(1)
    bars['bearish_div'] = bars['price_hh'] & bars['delta_lh']
    return bars[bars['bearish_div']]`})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs(a,{title:"Cumulative Delta Analysis",description:"Tracking the running sum of buy vs sell volume to gauge net aggression.",children:[e.jsx(i,{term:"Cumulative Delta",children:"The running total of (aggressive buy volume - aggressive sell volume) over a session. Rising cumulative delta with rising price confirms the trend; divergence warns of potential reversal."}),e.jsx(t,{language:"python",title:"Computing Cumulative Delta",children:`import pandas as pd
import numpy as np

def compute_cumulative_delta(trades):
    """Calculate cumulative delta from classified trades."""
    trades = trades.sort_values('time').copy()

    # Tick rule classification
    trades['prev_price'] = trades['price'].shift(1)
    trades['signed_vol'] = np.where(
        trades['price'] >= trades['prev_price'],
        trades['qty'],      # Buy: hit the ask
        -trades['qty']      # Sell: hit the bid
    )

    trades['cum_delta'] = trades['signed_vol'].cumsum()
    return trades

# Simulated Nifty futures trades
np.random.seed(42)
n = 2000
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=n, freq='500ms'),
    'price': 22450 + np.cumsum(np.random.choice([-0.5, 0, 0.5],
                                n, p=[0.3, 0.3, 0.4])),
    'qty': np.random.randint(5, 100, n)
})

result = compute_cumulative_delta(trades)
print(f"Final cum delta: {result['cum_delta'].iloc[-1]:+,}")
print(f"Price change: {result['price'].iloc[-1] - result['price'].iloc[0]:+.2f}")`}),e.jsx(t,{language:"python",title:"Detecting Delta Divergence",children:`def detect_divergence(df, window=50):
    """Flag when price and cumulative delta diverge."""
    df['price_ma'] = df['price'].rolling(window).mean()
    df['delta_ma'] = df['cum_delta'].rolling(window).mean()

    df['price_rising'] = df['price_ma'] > df['price_ma'].shift(window)
    df['delta_falling'] = df['delta_ma'] < df['delta_ma'].shift(window)

    # Bearish divergence: price up, delta down
    df['bearish_div'] = df['price_rising'] & df['delta_falling']
    # Bullish divergence: price down, delta up
    df['bullish_div'] = ~df['price_rising'] & ~df['delta_falling']

    return df

result = detect_divergence(result)
divs = result[result['bearish_div']].shape[0]
print(f"Bearish divergence signals: {divs}")`}),e.jsx(r,{title:"Session Delta Reset",children:"Reset cumulative delta at each NSE session open (9:15 AM). The first 15 minutes of delta often sets the directional bias for the day. A cum delta above +5000 lots by 9:30 AM on Nifty futures strongly favors bulls for the session."})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs(a,{title:"Absorption & Exhaustion Patterns",description:"Identifying when large orders absorb aggression or when momentum exhausts.",children:[e.jsx(i,{term:"Absorption",children:"When aggressive market orders hit a price level but the price does not move. Large resting limit orders are absorbing the selling/buying pressure. This often precedes a reversal in the opposite direction."}),e.jsx(i,{term:"Exhaustion",children:"A climactic burst of volume in the trend direction followed by a stall. Indicates the last buyers/sellers have entered and no more fuel remains to push price further."}),e.jsx(t,{language:"python",title:"Detecting Absorption",children:`import pandas as pd
import numpy as np

def detect_absorption(trades, price_levels, window='30s'):
    """Detect absorption: high volume at a level without price break."""
    trades = trades.set_index('time').sort_index()

    for level in price_levels:
        level_trades = trades[abs(trades['price'] - level) < 0.5]
        if level_trades.empty:
            continue

        vol_at_level = level_trades['qty'].sum()
        price_moved = abs(
            trades['price'].iloc[-1] - level
        )

        # High volume but price stayed at level
        if vol_at_level > 2000 and price_moved < 1.0:
            print(f"ABSORPTION @ {level}: {vol_at_level} lots absorbed")
            print(f"  Price stayed within {price_moved:.2f} pts")

# Usage with Nifty futures
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:30', periods=300, freq='1s'),
    'price': np.concatenate([
        np.full(200, 22450),      # Price stuck at 22450
        np.linspace(22450, 22455, 100)  # Then breaks up
    ]),
    'qty': np.random.randint(5, 50, 300)
})
detect_absorption(trades, [22450.0])`}),e.jsx(t,{language:"python",title:"Exhaustion Pattern Detection",children:`def detect_exhaustion(bars, vol_mult=2.5, delta_thresh=0.7):
    """Detect exhaustion: spike volume + extreme delta + stall."""
    avg_vol = bars['volume'].rolling(20).mean()
    bars['vol_spike'] = bars['volume'] > avg_vol * vol_mult

    # Delta ratio: how one-sided was the volume
    bars['delta_ratio'] = abs(bars['delta']) / bars['volume']
    bars['one_sided'] = bars['delta_ratio'] > delta_thresh

    # Price stalls after the spike
    bars['next_range'] = abs(bars['close'].shift(-1) - bars['open'].shift(-1))
    bars['avg_range'] = bars['next_range'].rolling(20).mean()
    bars['stall'] = bars['next_range'] < bars['avg_range'] * 0.5

    bars['exhaustion'] = bars['vol_spike'] & bars['one_sided'] & bars['stall']
    return bars`}),e.jsx(r,{title:"Trading Absorption",children:"On Nifty futures, absorption at a round number (22500, 23000) is a powerful signal. If heavy selling cannot break the level, the reversal is often sharp. Wait for the first higher-low after absorption before entering long."})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs(a,{title:"Volume Profile: POC, VAH, VAL",description:"Building volume profiles to identify fair value and high-activity price zones.",children:[e.jsx(i,{term:"Point of Control (POC)",children:"The price level with the highest traded volume. Acts as a magnet -- price tends to revert to POC during range-bound sessions."}),e.jsx(i,{term:"Value Area (VA)",children:"The price range containing 70% of total volume. Value Area High (VAH) and Value Area Low (VAL) define the boundaries. Trading outside the VA suggests a trending move or rejection back inside."}),e.jsx(t,{language:"python",title:"Computing Volume Profile",children:`import numpy as np
import pandas as pd

def volume_profile(trades, tick_size=0.5):
    """Build volume profile and compute POC, VAH, VAL."""
    # Round prices to tick size
    trades['level'] = (trades['price'] / tick_size).round() * tick_size
    profile = trades.groupby('level')['qty'].sum().sort_index()

    # POC = price with max volume
    poc = profile.idxmax()

    # Value Area: 70% of total volume centered on POC
    total_vol = profile.sum()
    target = total_vol * 0.70

    # Expand outward from POC
    poc_idx = profile.index.get_loc(poc)
    va_vol = profile.iloc[poc_idx]
    lo, hi = poc_idx, poc_idx

    while va_vol < target:
        up = profile.iloc[hi + 1] if hi + 1 < len(profile) else 0
        down = profile.iloc[lo - 1] if lo - 1 >= 0 else 0
        if up >= down and hi + 1 < len(profile):
            hi += 1
            va_vol += up
        elif lo - 1 >= 0:
            lo -= 1
            va_vol += down
        else:
            break

    val = profile.index[lo]
    vah = profile.index[hi]
    return {'poc': poc, 'vah': vah, 'val': val, 'profile': profile}

# Simulated Nifty futures session
np.random.seed(42)
trades = pd.DataFrame({
    'price': np.random.normal(22450, 5, 5000).round(1),
    'qty': np.random.randint(1, 50, 5000)
})
vp = volume_profile(trades)
print(f"POC: {vp['poc']} | VAH: {vp['vah']} | VAL: {vp['val']}")`}),e.jsx(r,{title:"Developing Value Area",children:"Track the developing value area intraday. If the developing POC shifts upward during the session, the market is accepting higher prices. A POC that stays flat signals a balanced/rotational day -- trade mean reversion between VAH and VAL."})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs(a,{title:"Kyle's Lambda: Price Impact Model",description:"Measuring permanent price impact of order flow using Kyle's lambda.",children:[e.jsx(i,{term:"Kyle's Lambda",children:"From Kyle (1985), lambda measures the permanent price impact per unit of net order flow. Higher lambda means less liquidity -- each trade moves the price more. Estimated as the slope of price change on signed volume."}),e.jsx(t,{language:"python",title:"Estimating Kyle's Lambda",children:`import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

def estimate_kyle_lambda(trades, interval='5min'):
    """Estimate Kyle's lambda from trade data."""
    trades = trades.set_index('time').sort_index()

    # Aggregate into intervals
    bars = trades.resample(interval).agg({
        'price': 'last',
        'signed_vol': 'sum'  # Net order flow
    }).dropna()

    # Price change
    bars['delta_p'] = bars['price'].diff()
    bars = bars.dropna()

    # Regression: delta_p = lambda * signed_vol + epsilon
    X = bars['signed_vol'].values.reshape(-1, 1)
    y = bars['delta_p'].values

    model = LinearRegression().fit(X, y)
    kyle_lambda = model.coef_[0]
    r_squared = model.score(X, y)

    return kyle_lambda, r_squared

# Simulated Nifty futures data
np.random.seed(42)
n = 2000
signed_vol = np.random.normal(0, 100, n)
price = 22450 + np.cumsum(signed_vol * 0.001 + np.random.normal(0, 0.2, n))

trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=n, freq='1s'),
    'price': price,
    'signed_vol': signed_vol
})

lam, r2 = estimate_kyle_lambda(trades)
print(f"Kyle's lambda: {lam:.6f}")
print(f"R-squared: {r2:.4f}")`}),e.jsx(r,{title:"Interpreting Lambda",children:"On Nifty futures, lambda typically ranges from 0.0001 to 0.001. Lambda spikes during low-liquidity periods (pre-market, lunch hour) and drops during peak activity. Higher lambda days correlate with wider spreads and more volatile price action."}),e.jsx(t,{language:"python",title:"Intraday Lambda Dynamics",children:`def rolling_lambda(trades, window=100):
    """Compute rolling Kyle's lambda to track liquidity changes."""
    lambdas = []
    for i in range(window, len(trades)):
        chunk = trades.iloc[i-window:i]
        X = chunk['signed_vol'].values.reshape(-1, 1)
        y = chunk['price'].diff().dropna().values
        if len(y) > 10:
            model = LinearRegression().fit(X[:len(y)], y)
            lambdas.append(model.coef_[0])
        else:
            lambdas.append(np.nan)
    return lambdas`})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(a,{title:"PIN and VPIN",description:"Probability of informed trading metrics for detecting smart money activity.",children:[e.jsx(i,{term:"PIN (Probability of Informed Trading)",children:"From the Easley-O'Hara model, PIN estimates the fraction of trades driven by privately informed traders. Higher PIN indicates greater information asymmetry and adverse selection risk."}),e.jsx(i,{term:"VPIN (Volume-Synchronized PIN)",children:"A real-time variant of PIN that uses volume buckets instead of time intervals. VPIN rises before major price moves, making it useful for real-time toxicity monitoring."}),e.jsx(t,{language:"python",title:"Computing VPIN",children:`import numpy as np
import pandas as pd

def compute_vpin(trades, bucket_size=1000, n_buckets=50):
    """Compute VPIN using volume buckets."""
    trades = trades.sort_values('time').copy()

    # Classify trades using tick rule
    trades['sign'] = np.sign(trades['price'].diff()).fillna(1)
    trades['buy_vol'] = np.where(trades['sign'] > 0, trades['qty'], 0)
    trades['sell_vol'] = np.where(trades['sign'] < 0, trades['qty'], 0)

    # Create volume buckets
    trades['cum_vol'] = trades['qty'].cumsum()
    trades['bucket'] = (trades['cum_vol'] // bucket_size).astype(int)

    buckets = trades.groupby('bucket').agg(
        buy=('buy_vol', 'sum'),
        sell=('sell_vol', 'sum'),
        total=('qty', 'sum')
    )

    # VPIN = avg |buy - sell| / bucket_size over rolling window
    buckets['abs_imbalance'] = abs(buckets['buy'] - buckets['sell'])
    buckets['vpin'] = (
        buckets['abs_imbalance'].rolling(n_buckets).mean() / bucket_size
    )

    return buckets

# Example
np.random.seed(42)
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=5000, freq='200ms'),
    'price': 22450 + np.cumsum(np.random.choice([-0.5, 0, 0.5], 5000)),
    'qty': np.random.randint(5, 80, 5000)
})

vpin = compute_vpin(trades, bucket_size=500, n_buckets=20)
print(f"Current VPIN: {vpin['vpin'].iloc[-1]:.4f}")
print(f"VPIN > 0.5 signals high toxicity")`}),e.jsx(r,{title:"VPIN in Indian Markets",children:"VPIN spikes on Nifty futures have preceded large moves during RBI policy days, budget announcements, and US CPI releases. A VPIN reading above 0.6 in Nifty futures warrants reducing position size or widening stop-losses."})]})}const V=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs(a,{title:"Flow Toxicity & Adverse Selection",description:"Measuring how dangerous order flow is for liquidity providers.",children:[e.jsx(i,{term:"Flow Toxicity",children:"The degree to which incoming order flow is informed (trading on private information). Toxic flow causes losses for market makers who trade against it. Measured via VPIN, realized spread, and adverse selection components."}),e.jsx(i,{term:"Adverse Selection",children:"The risk that a counterparty knows more than you. In market making, adverse selection cost = effective spread - realized spread. When this is positive and large, informed traders are exploiting the market maker."}),e.jsx(t,{language:"python",title:"Adverse Selection Decomposition",children:`import pandas as pd
import numpy as np

def spread_decomposition(trades, horizon=10):
    """Decompose spread into realized and adverse selection."""
    trades = trades.copy()
    trades['mid'] = (trades['bid'] + trades['ask']) / 2
    trades['mid_fwd'] = trades['mid'].shift(-horizon)

    # Trade direction: +1 buy, -1 sell
    trades['dir'] = np.where(
        trades['price'] >= trades['mid'], 1, -1)

    # Effective half-spread
    trades['eff_hs'] = trades['dir'] * (trades['price'] - trades['mid'])

    # Realized half-spread
    trades['real_hs'] = trades['dir'] * (trades['price'] - trades['mid_fwd'])

    # Adverse selection = effective - realized
    trades['adv_sel'] = trades['eff_hs'] - trades['real_hs']

    return {
        'effective_hs': trades['eff_hs'].mean(),
        'realized_hs': trades['real_hs'].mean(),
        'adverse_selection': trades['adv_sel'].mean(),
    }

np.random.seed(42)
n = 1000
mid = 22450 + np.cumsum(np.random.normal(0, 0.1, n))
trades = pd.DataFrame({
    'bid': mid - 0.25,
    'ask': mid + 0.25,
    'price': mid + np.random.choice([-0.25, 0.25], n),
    'qty': np.random.randint(5, 100, n)
})
result = spread_decomposition(trades)
for k, v in result.items():
    print(f"{k}: {v:.4f}")`}),e.jsx(r,{title:"Toxicity and Indian Market Events",children:"Flow toxicity on Nifty options spikes 30-60 minutes before SEBI circular releases and corporate earnings. Monitor toxicity across strike prices -- elevated toxicity at ATM options before an event strongly suggests informed pre-positioning."})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs(a,{title:"Market Making Dynamics",description:"Understanding inventory risk, quoting strategies, and market maker economics.",children:[e.jsx(i,{term:"Market Making",children:"Continuously quoting bid and ask prices to earn the spread. Market makers provide liquidity but face inventory risk (accumulating unwanted positions) and adverse selection (trading against informed participants)."}),e.jsx(t,{language:"python",title:"Simple Avellaneda-Stoikov Market Maker",children:`import numpy as np

class MarketMaker:
    """Avellaneda-Stoikov optimal market making model."""

    def __init__(self, mid_price, gamma=0.1, sigma=2.0, T=1.0, k=1.5):
        self.mid = mid_price
        self.gamma = gamma   # Risk aversion
        self.sigma = sigma   # Volatility
        self.T = T           # Time horizon
        self.k = k           # Order arrival intensity
        self.inventory = 0

    def reservation_price(self, t):
        """Price adjusted for inventory risk."""
        return self.mid - self.inventory * self.gamma * self.sigma**2 * (self.T - t)

    def optimal_spread(self, t):
        """Optimal spread width."""
        return (self.gamma * self.sigma**2 * (self.T - t)
                + 2 * np.log(1 + self.gamma / self.k) / self.gamma)

    def quotes(self, t):
        """Generate bid and ask quotes."""
        r = self.reservation_price(t)
        s = self.optimal_spread(t)
        return {'bid': r - s/2, 'ask': r + s/2, 'spread': s}

mm = MarketMaker(mid_price=22450, gamma=0.05, sigma=3.0)
for t in [0.0, 0.25, 0.5, 0.75]:
    q = mm.quotes(t)
    print(f"t={t:.2f} | Bid: {q['bid']:.2f} Ask: {q['ask']:.2f} "
          f"Spread: {q['spread']:.2f}")`}),e.jsx(t,{language:"python",title:"Inventory Risk Simulation",children:`def simulate_mm(n_trades=200):
    mm = MarketMaker(22450, gamma=0.05, sigma=3.0)
    pnl = 0

    for i in range(n_trades):
        t = i / n_trades
        q = mm.quotes(t)
        # Random fill on one side
        if np.random.random() < 0.5:
            mm.inventory += 1
            pnl -= q['ask']
        else:
            mm.inventory -= 1
            pnl += q['bid']
        mm.mid += np.random.normal(0, 0.3)

    # Mark to market final inventory
    pnl += mm.inventory * mm.mid
    return pnl, mm.inventory

results = [simulate_mm() for _ in range(1000)]
avg_pnl = np.mean([r[0] for r in results])
print(f"Avg PnL: {avg_pnl:.2f}")`}),e.jsx(r,{title:"Market Making at NSE",children:"NSE designates market makers for illiquid options and ETFs with obligations to maintain two-sided quotes within a spread threshold. Proprietary firms run Avellaneda-Stoikov variants with co-located servers at NSE's data center in Mumbai."})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(a,{title:"Time & Sales Analysis",description:"Reading the tape to classify trades and identify buying/selling pressure.",children:[e.jsx(i,{term:"Time & Sales (Tape)",children:"A chronological record of every executed trade showing timestamp, price, quantity, and sometimes trade direction. The tape reveals real-time aggression that the order book alone cannot show."}),e.jsx(t,{language:"python",title:"Trade Classification Methods",children:`import pandas as pd
import numpy as np

def classify_tick_rule(trades):
    """Tick rule: uptick = buy, downtick = sell."""
    trades = trades.copy()
    trades['tick'] = trades['price'].diff()
    trades['side'] = np.where(trades['tick'] > 0, 'buy',
                     np.where(trades['tick'] < 0, 'sell', 'unknown'))
    # For zero-tick, use previous classification
    trades['side'] = trades['side'].replace('unknown', np.nan).ffill()
    return trades

def classify_quote_rule(trades):
    """Quote rule: above mid = buy, below mid = sell."""
    trades = trades.copy()
    trades['mid'] = (trades['bid'] + trades['ask']) / 2
    trades['side'] = np.where(trades['price'] > trades['mid'], 'buy',
                     np.where(trades['price'] < trades['mid'], 'sell',
                              'unknown'))
    return trades

def classify_lee_ready(trades):
    """Lee-Ready: quote rule first, tick rule for mid trades."""
    trades = classify_quote_rule(trades)
    mid_trades = trades['side'] == 'unknown'
    tick_classified = classify_tick_rule(trades)
    trades.loc[mid_trades, 'side'] = tick_classified.loc[mid_trades, 'side']
    return trades

# Example
np.random.seed(42)
n = 500
mid = 22450 + np.cumsum(np.random.normal(0, 0.1, n))
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=n, freq='500ms'),
    'price': (mid + np.random.choice([-0.25, 0.25], n)).round(2),
    'bid': (mid - 0.25).round(2),
    'ask': (mid + 0.25).round(2),
    'qty': np.random.randint(1, 50, n)
})
result = classify_lee_ready(trades)
buy_pct = (result['side'] == 'buy').mean()
print(f"Buy trades: {buy_pct:.1%}")`}),e.jsx(r,{title:"Tape Reading at NSE",children:"NSE tick data arrives at sub-millisecond resolution via TBT feeds. Retail traders can access trade-level data through broker APIs with ~100ms latency. Focus on trade size distribution -- a cluster of large trades at the ask signals institutional buying."})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function w(){return e.jsxs(a,{title:"Large Order Detection",description:"Algorithms to identify unusually large trades and institutional footprints.",children:[e.jsx(i,{term:"Large Order",children:"A trade whose size exceeds a statistical threshold relative to recent average trade size. On Nifty futures, trades above 100 lots (~1400 contracts) are typically institutional."}),e.jsx(t,{language:"python",title:"Statistical Large Order Detection",children:`import pandas as pd
import numpy as np

class LargeOrderDetector:
    def __init__(self, lookback=500, z_threshold=2.5):
        self.lookback = lookback
        self.z_threshold = z_threshold
        self.trades = []

    def add_trade(self, price, qty, side):
        self.trades.append({'price': price, 'qty': qty, 'side': side})
        if len(self.trades) > self.lookback * 2:
            self.trades = self.trades[-self.lookback:]

    def is_large(self, qty):
        if len(self.trades) < 50:
            return False
        recent = [t['qty'] for t in self.trades[-self.lookback:]]
        mean_qty = np.mean(recent)
        std_qty = np.std(recent)
        if std_qty == 0:
            return False
        z_score = (qty - mean_qty) / std_qty
        return z_score > self.z_threshold

    def summary(self):
        large = [t for t in self.trades if self.is_large(t['qty'])]
        buy_vol = sum(t['qty'] for t in large if t['side'] == 'buy')
        sell_vol = sum(t['qty'] for t in large if t['side'] == 'sell')
        return {'large_count': len(large),
                'buy_vol': buy_vol, 'sell_vol': sell_vol}

# Simulate
detector = LargeOrderDetector(z_threshold=2.0)
np.random.seed(42)
for _ in range(600):
    qty = int(np.random.exponential(20))
    side = np.random.choice(['buy', 'sell'])
    if detector.is_large(qty):
        print(f"LARGE {side.upper()}: {qty} lots")
    detector.add_trade(22450, qty, side)

print(detector.summary())`}),e.jsx(t,{language:"python",title:"Time-Clustered Large Orders",children:`def detect_clusters(trades, window='30s', min_large=3):
    """Find clusters of large trades within a time window."""
    trades = trades.set_index('time')
    trades['is_large'] = trades['qty'] > trades['qty'].quantile(0.95)
    large = trades[trades['is_large']]

    clusters = large.rolling(window).count()
    cluster_starts = clusters[clusters['qty'] >= min_large]
    return cluster_starts.index.tolist()`}),e.jsx(r,{title:"Indian Market Context",children:"On NSE, block deals (minimum 5 lakh shares or Rs 10 crore) execute in a special window (8:45-9:00 AM). Bulk deals (>0.5% of shares) are reported end-of-day. Track both for institutional flow signals."})]})}const Q=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));function q(){return e.jsxs(a,{title:"Sweep Orders & Block Trade Identification",description:"Detecting aggressive sweep orders and negotiated block trades.",children:[e.jsx(i,{term:"Sweep Order",children:"An aggressive order that consumes liquidity across multiple price levels simultaneously. Sweeps indicate urgency -- the trader is willing to pay higher slippage for immediate execution."}),e.jsx(i,{term:"Block Trade",children:"A large privately negotiated transaction reported to the exchange. On NSE, block deals execute in a separate window at a price within +/- 1% of the previous day's close."}),e.jsx(t,{language:"python",title:"Detecting Sweep Orders",children:`import pandas as pd
import numpy as np

def detect_sweeps(trades, time_window='500ms', min_levels=3):
    """Detect sweep orders that hit multiple price levels rapidly."""
    trades = trades.sort_values('time').copy()
    trades['time_group'] = (
        trades['time'].diff().dt.total_seconds().fillna(0)
        .gt(0.5).cumsum()
    )

    sweeps = []
    for _, group in trades.groupby('time_group'):
        if len(group) < min_levels:
            continue

        prices = group['price'].unique()
        if len(prices) >= min_levels:
            direction = 'buy_sweep' if group['price'].is_monotonic_increasing                         else 'sell_sweep' if group['price'].is_monotonic_decreasing                         else 'mixed'
            sweeps.append({
                'time': group['time'].iloc[0],
                'direction': direction,
                'levels_hit': len(prices),
                'total_qty': group['qty'].sum(),
                'price_range': prices.max() - prices.min()
            })

    return pd.DataFrame(sweeps)

# Simulated trades including a sweep
times = pd.date_range('2025-03-15 09:30:00', periods=20, freq='50ms')
sweep_trades = pd.DataFrame({
    'time': times,
    'price': np.concatenate([
        np.arange(22450, 22454, 0.5),     # Buy sweep across 8 levels
        np.full(12, 22454)                  # Normal trades after
    ]),
    'qty': np.random.randint(20, 100, 20)
})

result = detect_sweeps(sweep_trades)
print(result)`}),e.jsx(t,{language:"python",title:"Block Deal Monitor from NSE",children:`def parse_block_deals(block_data):
    """Analyze NSE block deal data for institutional signals."""
    significant = block_data[block_data['value_cr'] > 50]
    for _, deal in significant.iterrows():
        print(f"{deal['symbol']}: {deal['qty']:,} shares "
              f"@ Rs {deal['price']:.2f} "
              f"({deal['value_cr']:.0f} Cr) "
              f"[{deal['client_type']}]")`}),e.jsx(r,{title:"Sweep Signals",children:"A buy sweep through 5+ levels on Nifty futures, consuming over 500 lots in under 1 second, strongly indicates an institutional algo entering a directional position. These often precede 20-50 point moves within the next few minutes."})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs(a,{title:"Tracking Institutional Flow in Indian Markets",description:"Using FII/DII data, delivery percentages, and options flow to follow big money.",children:[e.jsx(i,{term:"FII/DII Data",children:"SEBI mandates daily disclosure of Foreign Institutional Investor (FII) and Domestic Institutional Investor (DII) net buy/sell figures. This data, published by NSE after market close, reveals institutional positioning in cash and derivatives segments."}),e.jsx(t,{language:"python",title:"FII/DII Flow Analysis",children:`import pandas as pd
import numpy as np

def analyze_fii_dii(data):
    """Analyze FII/DII net flow for directional bias."""
    data['fii_net'] = data['fii_buy'] - data['fii_sell']
    data['dii_net'] = data['dii_buy'] - data['dii_sell']

    # Rolling 5-day net flow
    data['fii_5d'] = data['fii_net'].rolling(5).sum()
    data['dii_5d'] = data['dii_net'].rolling(5).sum()

    # FII and DII both buying = strongly bullish
    data['both_buying'] = (data['fii_net'] > 0) & (data['dii_net'] > 0)

    # FII selling, DII buying = transition/correction
    data['fii_sell_dii_buy'] = (data['fii_net'] < 0) & (data['dii_net'] > 0)

    return data

# Simulated monthly data (values in Rs Crores)
np.random.seed(42)
days = 22
data = pd.DataFrame({
    'date': pd.bdate_range('2025-03-01', periods=days),
    'fii_buy': np.random.uniform(8000, 15000, days),
    'fii_sell': np.random.uniform(8000, 15000, days),
    'dii_buy': np.random.uniform(6000, 12000, days),
    'dii_sell': np.random.uniform(6000, 12000, days),
})
result = analyze_fii_dii(data)
print(f"Days both buying: {result['both_buying'].sum()}")
print(f"FII 5-day net: Rs {result['fii_5d'].iloc[-1]:,.0f} Cr")`}),e.jsx(t,{language:"python",title:"Delivery Percentage as Institutional Proxy",children:`def institutional_signals(daily_data):
    """High delivery % + high volume = institutional activity."""
    daily_data['inst_signal'] = (
        (daily_data['delivery_pct'] > 60) &
        (daily_data['volume'] > daily_data['volume'].rolling(20).mean() * 1.5)
    )

    # Stocks with rising delivery % over 5 days
    daily_data['delivery_trend'] = (
        daily_data['delivery_pct'].rolling(5).mean() >
        daily_data['delivery_pct'].rolling(20).mean()
    )
    return daily_data

# Delivery % above 60% with above-average volume
# strongly suggests institutional accumulation in Indian stocks`}),e.jsx(r,{title:"Options Flow for Institutional Tracking",children:"Track OI buildup in Nifty options by strike. Large OI addition in deep OTM puts by FIIs (visible in NSE participant-wise OI data) signals hedging of long equity positions. Conversely, heavy call writing at round strikes (22500, 23000) indicates resistance expectations."})]})}const W=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));export{O as a,T as b,P as c,A as d,D as e,N as f,z as g,E as h,F as i,B as j,L as k,C as l,V as m,R as n,I as o,H as p,K as q,Q as r,M as s,U as t,W as u};
