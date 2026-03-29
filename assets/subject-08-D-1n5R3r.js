import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as a,D as r,C as t,N as i}from"./subject-01-B5qsZKsm.js";import{C as s}from"./subject-02-D6eTCXus.js";const T={id:"08-backtesting",title:"Backtesting & Simulation",icon:"🔬",colorHex:"#eab308",description:"Build event-driven backtesting engines with Indian market specifics and walk-forward validation.",difficulty:"intermediate",estimatedHours:4,prerequisites:["05-technical-indicators"],chapters:[{id:"c1-framework",title:"Backtesting Framework",description:"Design and build an event-driven backtesting engine from scratch.",estimatedMinutes:55,sections:[{id:"s1-event-driven",title:"Event-Driven Engine Design",difficulty:"intermediate",readingMinutes:15,description:"Architecture of an event-driven backtesting engine."},{id:"s2-data-handler",title:"Data Handler & Feed",difficulty:"intermediate",readingMinutes:12,description:"Data handler for OHLCV feed management."},{id:"s3-execution-handler",title:"Execution Handler & Slippage",difficulty:"intermediate",readingMinutes:15,description:"Simulate execution with slippage and latency."},{id:"s4-performance-analytics",title:"Performance Analytics",difficulty:"intermediate",readingMinutes:12,description:"Sharpe ratio, Sortino, max drawdown, trade stats."}]},{id:"c2-indian-specifics",title:"Indian Market Specifics",description:"Model NSE trading hours, circuit breakers, taxes, and margin requirements.",estimatedMinutes:55,sections:[{id:"s1-trading-hours",title:"NSE Trading Hours & Holidays",difficulty:"intermediate",readingMinutes:12,description:"Pre-open session, continuous trading, and holiday calendar."},{id:"s2-circuit-breakers",title:"Circuit Breakers & Price Bands",difficulty:"intermediate",readingMinutes:12,description:"Circuit breaker rules and price band limits."},{id:"s3-stt-brokerage",title:"STT, Brokerage & Tax Modeling",difficulty:"intermediate",readingMinutes:15,description:"Model STT, stamp duty, GST, and brokerage costs."},{id:"s4-lot-sizes",title:"Lot Sizes & Margin Requirements",difficulty:"intermediate",readingMinutes:15,description:"F&O lot sizes and SPAN margin calculation."}]},{id:"c3-validation",title:"Walk-Forward & Validation",description:"Validate strategies with walk-forward optimization and Monte Carlo.",estimatedMinutes:55,sections:[{id:"s1-in-out-sample",title:"In-Sample vs Out-of-Sample",difficulty:"intermediate",readingMinutes:12,description:"Split data correctly for strategy validation."},{id:"s2-walk-forward",title:"Walk-Forward Optimization",difficulty:"advanced",readingMinutes:15,description:"Rolling walk-forward optimization methodology."},{id:"s3-monte-carlo",title:"Monte Carlo Simulation",difficulty:"advanced",readingMinutes:15,description:"Monte Carlo for strategy robustness testing."},{id:"s4-overfitting-detection",title:"Overfitting Detection",difficulty:"advanced",readingMinutes:12,description:"Detect overfitting with deflated Sharpe ratio."}]},{id:"c4-paper-trading",title:"Paper Trading",description:"Bridge from backtest to live with paper trading on real data.",estimatedMinutes:50,sections:[{id:"s1-zerodha-paper",title:"Zerodha Paper Trading Setup",difficulty:"intermediate",readingMinutes:12,description:"Set up paper trading with Zerodha sandbox mode."},{id:"s2-delta-testnet",title:"Delta Exchange Testnet",difficulty:"intermediate",readingMinutes:12,description:"Use Delta Exchange testnet for crypto testing."},{id:"s3-simulated-orders",title:"Live Data with Simulated Orders",difficulty:"intermediate",readingMinutes:12,description:"Execute simulated orders on live market data."},{id:"s4-comparison",title:"Performance Comparison (Backtest vs Paper)",difficulty:"intermediate",readingMinutes:12,description:"Compare backtest results with paper trading."}]}]};function n(){return e.jsxs(a,{title:"Event-Driven Backtesting Engine",description:"Architecture of an event-driven backtester that mirrors live trading execution flow.",children:[e.jsx(r,{term:"Event-Driven Backtesting",children:"A backtesting approach where the engine processes discrete events (market data, signal, order, fill) in sequence, closely replicating how a live trading system operates. This avoids look-ahead bias inherent in vectorized backtests."}),e.jsx(t,{language:"python",title:"Core Event Loop Architecture",children:`from abc import ABC, abstractmethod
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
engine.register(EventType.FILL, portfolio.on_fill)`}),e.jsx(i,{title:"Why Event-Driven?",children:"Vectorized backtests (using pandas vectorized ops) are faster but cannot model order fills, partial executions, or portfolio-level constraints. Event-driven engines are essential when backtesting strategies on NSE F&O where lot sizes and margin rules affect execution."}),e.jsx(t,{language:"python",title:"Running a Backtest Session",children:`def run_backtest(engine, data_feed, strategy, broker, portfolio):
    engine.register(EventType.MARKET, strategy.generate_signal)
    engine.register(EventType.SIGNAL, portfolio.handle_signal)
    engine.register(EventType.ORDER, broker.execute_order)
    engine.register(EventType.FILL, portfolio.update_position)

    for bar in data_feed:
        event = Event(EventType.MARKET, bar['timestamp'], bar)
        engine.push(event)
        engine.run()

    return portfolio.get_results()`})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:n},Symbol.toStringTag,{value:"Module"}));function o(){return e.jsxs(a,{title:"Data Handler & Feed Management",description:"Loading, parsing, and streaming OHLCV data for Indian market backtests.",children:[e.jsx(r,{term:"OHLCV Data",children:"Open, High, Low, Close, and Volume bars representing price action over a fixed interval. For NSE equities and F&O, common intervals are 1-min, 5-min, 15-min, and daily."}),e.jsx(t,{language:"python",title:"CSV Data Feed for Backtesting",children:`import pandas as pd
from datetime import datetime

class CSVDataFeed:
    """Streams OHLCV bars one at a time for event-driven backtest."""

    def __init__(self, filepath: str, symbol: str):
        self.symbol = symbol
        self.df = pd.read_csv(filepath, parse_dates=['datetime'])
        self.df.sort_values('datetime', inplace=True)
        self._index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self._index >= len(self.df):
            raise StopIteration
        row = self.df.iloc[self._index]
        self._index += 1
        return {
            'symbol': self.symbol,
            'timestamp': row['datetime'],
            'open': row['open'],
            'high': row['high'],
            'low': row['low'],
            'close': row['close'],
            'volume': int(row['volume']),
        }

# Load Nifty 50 1-minute data
feed = CSVDataFeed("data/nifty50_1min_2025.csv", "NIFTY50")`}),e.jsx(t,{language:"python",title:"TimescaleDB Data Feed",children:`import psycopg2

class TimescaleDataFeed:
    """Stream bars from TimescaleDB for large datasets."""

    def __init__(self, symbol, start, end, interval='1 minute'):
        self.conn = psycopg2.connect("dbname=nemoclaw")
        self.cursor = self.conn.cursor(name='backtest_feed')
        self.cursor.execute("""
            SELECT time_bucket(%s, ts) AS bucket,
                   first(open, ts), max(high), min(low),
                   last(close, ts), sum(volume)
            FROM ohlcv WHERE symbol = %s
              AND ts BETWEEN %s AND %s
            GROUP BY bucket ORDER BY bucket
        """, (interval, symbol, start, end))

    def __iter__(self):
        return self

    def __next__(self):
        row = self.cursor.fetchone()
        if row is None:
            self.cursor.close()
            raise StopIteration
        return {
            'timestamp': row[0], 'open': row[1], 'high': row[2],
            'low': row[3], 'close': row[4], 'volume': row[5],
        }`}),e.jsx(i,{title:"Data Quality",children:"Always check for gaps in intraday data around NSE market open (9:15 AM) and close (3:30 PM). Missing bars during volatile periods like budget day or RBI policy announcements can skew backtest results significantly."})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"}));function l(){return e.jsxs(a,{title:"Execution Simulation & Slippage Modeling",description:"Realistic fill simulation with slippage, market impact, and latency modeling.",children:[e.jsx(r,{term:"Slippage",children:"The difference between the expected execution price and the actual fill price. On NSE, slippage varies by instrument liquidity -- Nifty futures may see 0.5-2 points while illiquid stock options can slip 5-10%."}),e.jsx(t,{language:"python",title:"Simulated Broker with Slippage",children:`import random
from dataclasses import dataclass

@dataclass
class Fill:
    symbol: str
    side: str
    price: float
    quantity: int
    commission: float
    slippage: float

class SimulatedBroker:
    """Simulates order execution with realistic slippage."""

    def __init__(self, slippage_pct=0.01, commission_per_order=20.0):
        self.slippage_pct = slippage_pct
        self.commission = commission_per_order

    def execute_order(self, order_event):
        data = order_event.data
        price = data['price']

        # Model slippage as random within bounds
        slip_factor = random.uniform(0, self.slippage_pct) / 100
        if data['side'] == 'BUY':
            fill_price = price * (1 + slip_factor)
        else:
            fill_price = price * (1 - slip_factor)

        slippage = abs(fill_price - price) * data['quantity']

        return Fill(
            symbol=data['symbol'],
            side=data['side'],
            price=round(fill_price, 2),
            quantity=data['quantity'],
            commission=self.commission,
            slippage=round(slippage, 2),
        )`}),e.jsx(t,{language:"python",title:"Volume-Based Market Impact Model",children:`class MarketImpactBroker(SimulatedBroker):
    """Slippage scales with order size relative to bar volume."""

    def __init__(self, impact_coeff=0.1):
        super().__init__()
        self.impact_coeff = impact_coeff

    def calculate_impact(self, order_qty, bar_volume, price):
        participation = order_qty / max(bar_volume, 1)
        impact_bps = self.impact_coeff * (participation ** 0.5) * 10000
        return price * impact_bps / 10000

    def execute_order(self, order_event):
        data = order_event.data
        impact = self.calculate_impact(
            data['quantity'], data['bar_volume'], data['price']
        )
        if data['side'] == 'BUY':
            data['price'] += impact
        else:
            data['price'] -= impact
        return super().execute_order(order_event)`}),e.jsx(i,{title:"Realistic Assumptions",children:"For Nifty options, model slippage of at least 1-2 rupees per lot for ATM strikes and 3-5 rupees for OTM. During expiry-day trading, slippage can spike dramatically in the last hour. Always overestimate slippage in backtests to avoid live trading surprises."})]})}const j=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"}));function d(){return e.jsxs(a,{title:"Performance Analytics",description:"Computing Sharpe, Sortino, max drawdown, and trade-level metrics.",children:[e.jsx(r,{term:"Sharpe Ratio",children:"Risk-adjusted return measured as (mean excess return) / (std deviation of returns). In India, use the 91-day T-bill rate (~6.5-7%) as the risk-free rate."}),e.jsx(r,{term:"Max Drawdown",children:"The largest peak-to-trough decline in portfolio equity. A critical metric for assessing worst-case scenarios in live trading."}),e.jsx(t,{language:"python",title:"Core Performance Metrics",children:`import numpy as np
import pandas as pd

class PerformanceAnalyzer:
    def __init__(self, equity_curve: pd.Series, risk_free_rate=0.065):
        self.equity = equity_curve
        self.returns = equity_curve.pct_change().dropna()
        self.rf_daily = (1 + risk_free_rate) ** (1/252) - 1

    def sharpe_ratio(self):
        excess = self.returns - self.rf_daily
        return np.sqrt(252) * excess.mean() / excess.std()

    def sortino_ratio(self):
        excess = self.returns - self.rf_daily
        downside = excess[excess < 0].std()
        return np.sqrt(252) * excess.mean() / downside

    def max_drawdown(self):
        peak = self.equity.cummax()
        drawdown = (self.equity - peak) / peak
        return drawdown.min()

    def calmar_ratio(self):
        annual_return = self.returns.mean() * 252
        return annual_return / abs(self.max_drawdown())

    def win_rate(self, trades: list):
        wins = sum(1 for t in trades if t['pnl'] > 0)
        return wins / len(trades) if trades else 0

    def profit_factor(self, trades: list):
        gross_profit = sum(t['pnl'] for t in trades if t['pnl'] > 0)
        gross_loss = abs(sum(t['pnl'] for t in trades if t['pnl'] < 0))
        return gross_profit / gross_loss if gross_loss else float('inf')

    def summary(self, trades=None):
        metrics = {
            'sharpe': round(self.sharpe_ratio(), 3),
            'sortino': round(self.sortino_ratio(), 3),
            'max_drawdown': f"{self.max_drawdown():.2%}",
            'calmar': round(self.calmar_ratio(), 3),
            'total_return': f"{(self.equity.iloc[-1]/self.equity.iloc[0]-1):.2%}",
        }
        if trades:
            metrics['win_rate'] = f"{self.win_rate(trades):.1%}"
            metrics['profit_factor'] = round(self.profit_factor(trades), 2)
        return metrics`}),e.jsx(i,{title:"Indian Market Benchmarks",children:"Compare your strategy Sharpe against Nifty 50 buy-and-hold (~0.8-1.2 annualized). A backtest Sharpe above 2.0 on Indian equities should be scrutinized for overfitting. Realistic live Sharpe for retail algo strategies ranges from 1.0-1.8."})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"}));function c(){return e.jsxs(a,{title:"NSE Trading Hours & Sessions",description:"Modeling Indian market sessions, pre-open auctions, and holiday calendars in backtests.",children:[e.jsx(r,{term:"Pre-Open Session",children:"NSE runs an 8-minute pre-open session (9:00-9:08 AM) using a call auction mechanism. Orders are collected and matched at a single equilibrium price at 9:08 AM. Trading in the continuous session starts at 9:15 AM."}),e.jsx(t,{language:"python",title:"NSE Session Time Filter",children:`from datetime import time, datetime
import pandas as pd

class NSESessionFilter:
    """Filter bars to valid NSE trading windows."""

    PRE_OPEN_START = time(9, 0)
    PRE_OPEN_END = time(9, 8)
    MARKET_OPEN = time(9, 15)
    MARKET_CLOSE = time(15, 30)
    CLOSING_SESSION_END = time(15, 40)

    def __init__(self, holidays_csv="data/nse_holidays.csv"):
        holidays = pd.read_csv(holidays_csv, parse_dates=['date'])
        self.holidays = set(holidays['date'].dt.date)

    def is_trading_day(self, dt: datetime) -> bool:
        if dt.weekday() >= 5:  # Saturday, Sunday
            return False
        return dt.date() not in self.holidays

    def is_market_hours(self, dt: datetime) -> bool:
        if not self.is_trading_day(dt):
            return False
        t = dt.time()
        return self.MARKET_OPEN <= t <= self.MARKET_CLOSE

    def filter_bars(self, df: pd.DataFrame) -> pd.DataFrame:
        mask = df['datetime'].apply(
            lambda dt: self.is_market_hours(dt)
        )
        return df[mask].copy()

# Filter out pre-market and after-hours bars
session = NSESessionFilter()
clean_data = session.filter_bars(raw_data)`}),e.jsx(t,{language:"python",title:"NSE Holiday Calendar 2025-2026",children:`NSE_HOLIDAYS_2025 = [
    "2025-02-26",  # Maha Shivaratri
    "2025-03-14",  # Holi
    "2025-03-31",  # Id-Ul-Fitr (Eid)
    "2025-04-10",  # Shri Mahavir Jayanti
    "2025-04-14",  # Dr. Ambedkar Jayanti
    "2025-04-18",  # Good Friday
    "2025-05-01",  # Maharashtra Day
    "2025-08-15",  # Independence Day
    "2025-08-27",  # Ganesh Chaturthi
    "2025-10-02",  # Mahatma Gandhi Jayanti
    "2025-10-21",  # Diwali (Laxmi Puja)
    "2025-10-22",  # Diwali Balipratipada
    "2025-11-05",  # Guru Nanak Jayanti
    "2025-12-25",  # Christmas
]`}),e.jsx(i,{title:"Muhurat Trading",children:"NSE holds a special one-hour Muhurat Trading session on Diwali evening. This session has separate open/close times announced yearly. Account for this in backtests if testing strategies spanning Diwali week."})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs(a,{title:"Circuit Breakers & Price Bands",description:"Modeling NSE index circuit breakers and stock-level price bands in backtests.",children:[e.jsx(r,{term:"Market-Wide Circuit Breaker (MWCB)",children:"SEBI mandates trading halts when Nifty 50 or Sensex moves beyond defined thresholds from the previous close. Triggers at 10%, 15%, and 20% levels with varying halt durations based on time of day."}),e.jsx(s,{title:"MWCB Trigger Levels",headers:["Movement","Before 1:00 PM","1:00-2:30 PM","After 2:30 PM"],rows:[["10%","45 min halt","15 min halt","No halt"],["15%","1h 45m halt","45 min halt","Remainder of day"],["20%","Remainder of day","Remainder of day","Remainder of day"]]}),e.jsx(t,{language:"python",title:"Circuit Breaker Simulation",children:`class CircuitBreakerSimulator:
    """Check and enforce circuit breaker rules in backtest."""

    STOCK_BANDS = {
        'group_a': 0.20,  # 20% for liquid stocks
        'group_b': 0.10,  # 10% for less liquid
        'group_sm': 0.05, # 5% for SME stocks
    }

    def __init__(self, prev_close_nifty: float):
        self.prev_close = prev_close_nifty
        self.halted = False
        self.halt_end = None

    def check_index_circuit(self, current_price, current_time):
        change_pct = abs(current_price - self.prev_close) / self.prev_close

        if change_pct >= 0.20:
            self.halted = True
            return "HALT_FULL_DAY"
        elif change_pct >= 0.15:
            self.halted = True
            return "HALT_15PCT"
        elif change_pct >= 0.10:
            self.halted = True
            return "HALT_10PCT"
        return None

    def check_stock_band(self, price, prev_close, group='group_a'):
        band = self.STOCK_BANDS[group]
        upper = prev_close * (1 + band)
        lower = prev_close * (1 - band)
        return lower <= price <= upper`}),e.jsx(i,{title:"Backtest Accuracy",children:"Ignoring circuit breakers in backtests inflates returns for momentum strategies. On days like the March 2020 COVID crash, MWCB triggered multiple times. Your backtest should halt order generation during circuit breaks to produce realistic results."})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs(a,{title:"STT, Brokerage & Tax Modeling",description:"Accurately modeling Indian trading costs: STT, stamp duty, GST, exchange charges, and brokerage.",children:[e.jsx(s,{title:"Transaction Cost Breakdown (Zerodha)",headers:["Charge","Equity Intraday","F&O Futures","F&O Options"],rows:[["Brokerage","0.03% or Rs.20","0.03% or Rs.20","Rs.20 flat/order"],["STT","0.025% (sell)","0.02% (sell)","0.1% (sell, on premium)"],["Exchange Txn","0.00345%","0.002%","0.05%"],["Stamp Duty","0.003% (buy)","0.002% (buy)","0.003% (buy)"],["GST","18% on (brkrg+txn)","18% on (brkrg+txn)","18% on (brkrg+txn)"],["SEBI Fee","0.0001%","0.0001%","0.0001%"]]}),e.jsx(t,{language:"python",title:"Transaction Cost Calculator",children:`class IndianTxnCosts:
    """Calculate all transaction costs for Indian markets."""

    def __init__(self, broker='zerodha'):
        self.brokerage_cap = 20.0  # Rs 20 per order cap
        self.brokerage_pct = 0.0003  # 0.03%

    def calculate(self, price, qty, side, instrument='equity_intraday'):
        turnover = price * qty
        brokerage = min(turnover * self.brokerage_pct, self.brokerage_cap)

        costs = {'brokerage': brokerage}

        if instrument == 'fo_options':
            costs['stt'] = turnover * 0.001 if side == 'SELL' else 0
            costs['exchange_txn'] = turnover * 0.0005
            costs['stamp_duty'] = turnover * 0.00003 if side == 'BUY' else 0
        elif instrument == 'fo_futures':
            costs['stt'] = turnover * 0.0002 if side == 'SELL' else 0
            costs['exchange_txn'] = turnover * 0.00002
            costs['stamp_duty'] = turnover * 0.00002 if side == 'BUY' else 0
        else:  # equity intraday
            costs['stt'] = turnover * 0.00025 if side == 'SELL' else 0
            costs['exchange_txn'] = turnover * 0.0000345
            costs['stamp_duty'] = turnover * 0.00003 if side == 'BUY' else 0

        costs['sebi_fee'] = turnover * 0.000001
        costs['gst'] = (costs['brokerage'] + costs['exchange_txn']) * 0.18
        costs['total'] = sum(costs.values())
        return costs

# Example: Selling 1 lot Nifty options (75 qty) at Rs 200
calc = IndianTxnCosts()
costs = calc.calculate(200, 75, 'SELL', 'fo_options')
print(f"Total costs: Rs {costs['total']:.2f}")`}),e.jsx(i,{title:"Cost Impact on Options Scalping",children:"For Nifty options scalping, total round-trip costs can be Rs 80-120 per lot. If your average profit target is Rs 5-10 per lot (Rs 375-750), costs consume 10-30% of profits. Always include costs in backtests."})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs(a,{title:"F&O Lot Sizes & Margin Requirements",description:"Handling NSE F&O lot sizes, SPAN margin, and exposure margin in backtests.",children:[e.jsx(r,{term:"SPAN Margin",children:"Standard Portfolio Analysis of Risk -- the initial margin computed by NSE using a scenario-based approach. SPAN calculates potential portfolio losses across 16 price/volatility scenarios and takes the worst case."}),e.jsx(t,{language:"python",title:"Lot Size Reference and Position Sizing",children:`# Common NSE F&O lot sizes (as of 2025, subject to revision)
LOT_SIZES = {
    'NIFTY': 75,
    'BANKNIFTY': 30,     # Reduced from 25 in 2024
    'FINNIFTY': 65,
    'RELIANCE': 250,
    'TCS': 150,
    'INFY': 300,
    'HDFCBANK': 550,
    'ICICIBANK': 700,
    'SBIN': 750,
    'TATAMOTORS': 575,
}

class FnOPositionSizer:
    """Size positions in valid lot multiples."""

    def __init__(self, capital: float, max_risk_pct: float = 0.02):
        self.capital = capital
        self.max_risk = max_risk_pct

    def calculate_lots(self, symbol, entry_price, stop_loss):
        lot_size = LOT_SIZES.get(symbol, 1)
        risk_per_unit = abs(entry_price - stop_loss)
        max_risk_amount = self.capital * self.max_risk

        max_units = max_risk_amount / risk_per_unit
        lots = int(max_units // lot_size)
        return max(lots, 0)  # Never negative

    def margin_required(self, symbol, price, lots, margin_pct=0.15):
        lot_size = LOT_SIZES.get(symbol, 1)
        notional = price * lot_size * lots
        return notional * margin_pct

# Example: Rs 10L capital, Nifty at 22000, SL at 21900
sizer = FnOPositionSizer(capital=1_000_000)
lots = sizer.calculate_lots('NIFTY', 22000, 21900)
margin = sizer.margin_required('NIFTY', 22000, lots)
print(f"Lots: {lots}, Margin needed: Rs {margin:,.0f}")`}),e.jsx(t,{language:"python",title:"Dynamic Margin Tracking in Backtest",children:`class MarginTracker:
    """Track margin utilization during backtest."""

    def __init__(self, total_capital):
        self.total = total_capital
        self.used_margin = 0.0

    def can_take_position(self, required_margin):
        available = self.total - self.used_margin
        return required_margin <= available * 0.9  # 10% buffer

    def add_position(self, margin):
        self.used_margin += margin

    def release_margin(self, margin):
        self.used_margin = max(0, self.used_margin - margin)

    def utilization(self):
        return self.used_margin / self.total`}),e.jsx(i,{title:"Lot Size Revisions",children:"SEBI periodically revises lot sizes to keep contract values between Rs 5-10 lakhs. After lot size changes, backtest results can shift due to different position granularity. Always use historically correct lot sizes for each period in your backtest."})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs(a,{title:"In-Sample vs Out-of-Sample Testing",description:"Properly splitting data to validate strategy robustness and avoid curve-fitting.",children:[e.jsx(r,{term:"In-Sample (IS) Data",children:"The portion of historical data used to develop, tune, and optimize a trading strategy. Parameters are fitted to this dataset."}),e.jsx(r,{term:"Out-of-Sample (OOS) Data",children:"Unseen data reserved for validation only. Strategy performance on OOS data reveals true predictive power. Never re-optimize on OOS data."}),e.jsx(t,{language:"python",title:"Data Splitting for Backtests",children:`import pandas as pd

class DataSplitter:
    """Split time series data preserving temporal order."""

    def __init__(self, df: pd.DataFrame, date_col='datetime'):
        self.df = df.sort_values(date_col)
        self.date_col = date_col

    def simple_split(self, train_pct=0.7):
        n = len(self.df)
        split_idx = int(n * train_pct)
        return self.df.iloc[:split_idx], self.df.iloc[split_idx:]

    def three_way_split(self, train=0.6, val=0.2):
        n = len(self.df)
        train_end = int(n * train)
        val_end = int(n * (train + val))
        return (
            self.df.iloc[:train_end],       # Train (IS)
            self.df.iloc[train_end:val_end], # Validation
            self.df.iloc[val_end:],          # Test (OOS)
        )

    def yearly_split(self):
        """Use each year as a separate fold."""
        self.df['year'] = pd.to_datetime(self.df[self.date_col]).dt.year
        years = sorted(self.df['year'].unique())
        folds = []
        for i, test_year in enumerate(years[1:], 1):
            train = self.df[self.df['year'] < test_year]
            test = self.df[self.df['year'] == test_year]
            folds.append((train, test))
        return folds

# Split 3 years of Nifty data
splitter = DataSplitter(nifty_data)
is_data, oos_data = splitter.simple_split(train_pct=0.7)
print(f"IS: {len(is_data)} bars, OOS: {len(oos_data)} bars")`}),e.jsx(i,{title:"Common Mistake",children:"Never use OOS data to adjust parameters, then claim the results are out-of-sample. This is called data snooping. If you peek at OOS results and tweak strategy parameters, the OOS set becomes contaminated and you need fresh data to validate."})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(a,{title:"Walk-Forward Optimization",description:"Rolling window optimization to test strategy adaptability across market regimes.",children:[e.jsx(r,{term:"Walk-Forward Analysis (WFA)",children:"An iterative process: optimize on a training window, test on the next forward window, then slide both windows forward and repeat. Combines in-sample optimization with out-of-sample validation across time."}),e.jsx(t,{language:"python",title:"Walk-Forward Optimization Engine",children:`import pandas as pd
import numpy as np
from itertools import product

class WalkForwardOptimizer:
    """Rolling walk-forward optimization framework."""

    def __init__(self, data, train_days=252, test_days=63):
        self.data = data
        self.train_days = train_days  # 1 year train
        self.test_days = test_days    # 3 months test

    def generate_windows(self):
        total = len(self.data)
        windows = []
        start = 0
        while start + self.train_days + self.test_days <= total:
            train_end = start + self.train_days
            test_end = train_end + self.test_days
            windows.append({
                'train': self.data.iloc[start:train_end],
                'test': self.data.iloc[train_end:test_end],
                'period': self.data.index[train_end],
            })
            start += self.test_days  # Slide by test window size
        return windows

    def optimize(self, strategy_class, param_grid, metric='sharpe'):
        results = []
        for window in self.generate_windows():
            best_params, best_score = None, -np.inf
            for params in product(*param_grid.values()):
                param_dict = dict(zip(param_grid.keys(), params))
                strat = strategy_class(**param_dict)
                score = strat.backtest(window['train'])[metric]
                if score > best_score:
                    best_score = score
                    best_params = param_dict

            # Test best params on OOS window
            strat = strategy_class(**best_params)
            oos_result = strat.backtest(window['test'])
            results.append({
                'period': window['period'],
                'params': best_params,
                'is_score': best_score,
                'oos_score': oos_result[metric],
            })
        return pd.DataFrame(results)

# Example usage
param_grid = {'fast_ma': [5, 10, 20], 'slow_ma': [50, 100, 200]}
wfo = WalkForwardOptimizer(nifty_data)
results = wfo.optimize(MACrossStrategy, param_grid)`}),e.jsx(i,{title:"Walk-Forward Efficiency",children:"Calculate WFE = mean(OOS returns) / mean(IS returns). A WFE above 0.5 indicates the strategy retains at least half its in-sample edge. Below 0.3 suggests heavy overfitting. Indian markets have distinct regimes (election years, RBI policy cycles), so WFA is essential."})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs(a,{title:"Monte Carlo Simulation",description:"Stress-testing strategy robustness by randomizing trade sequences and returns.",children:[e.jsx(r,{term:"Monte Carlo Simulation",children:"A technique that generates thousands of alternative equity curves by randomly resampling or shuffling the original trade sequence. Reveals the range of possible outcomes and confidence intervals for key metrics."}),e.jsx(t,{language:"python",title:"Monte Carlo Trade Resampling",children:`import numpy as np
import pandas as pd

class MonteCarloSimulator:
    """Monte Carlo analysis of backtest trade results."""

    def __init__(self, trades: list, initial_capital: float):
        self.pnls = np.array([t['pnl'] for t in trades])
        self.capital = initial_capital

    def run(self, n_simulations=10000):
        n_trades = len(self.pnls)
        results = []

        for _ in range(n_simulations):
            # Shuffle trade order randomly
            shuffled = np.random.choice(self.pnls, size=n_trades, replace=True)
            equity = self.capital + np.cumsum(shuffled)

            peak = np.maximum.accumulate(equity)
            drawdown = (equity - peak) / peak

            results.append({
                'final_equity': equity[-1],
                'max_drawdown': drawdown.min(),
                'total_return': (equity[-1] / self.capital - 1),
            })

        return pd.DataFrame(results)

    def confidence_intervals(self, results, levels=[5, 25, 50, 75, 95]):
        ci = {}
        for col in ['final_equity', 'max_drawdown', 'total_return']:
            ci[col] = {
                f'p{p}': np.percentile(results[col], p) for p in levels
            }
        return ci

# Run simulation
trades = [{'pnl': 500}, {'pnl': -200}, {'pnl': 800}, ...]  # from backtest
mc = MonteCarloSimulator(trades, initial_capital=1_000_000)
results = mc.run(n_simulations=10000)
ci = mc.confidence_intervals(results)
print(f"95th percentile max drawdown: {ci['max_drawdown']['p5']:.1%}")
print(f"Median final equity: Rs {ci['final_equity']['p50']:,.0f}")`}),e.jsx(i,{title:"Interpreting Results",children:"Focus on the 5th percentile (worst case) max drawdown. If even the worst Monte Carlo path shows a drawdown you can stomach, the strategy is robust. For Indian F&O strategies, a 5th-percentile drawdown exceeding 25% of capital is a red flag for live deployment."})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs(a,{title:"Detecting Overfitting",description:"Deflated Sharpe ratio, parameter sensitivity, and other methods to catch curve-fitting.",children:[e.jsx(r,{term:"Deflated Sharpe Ratio (DSR)",children:"Adjusts the observed Sharpe ratio for the number of strategy variations tested (multiple testing bias). If you tested 100 parameter combos, the best Sharpe is likely inflated. DSR corrects for this selection bias."}),e.jsx(t,{language:"python",title:"Deflated Sharpe Ratio",children:`import numpy as np
from scipy.stats import norm

def deflated_sharpe_ratio(observed_sharpe, num_trials, T,
                          skew=0, kurtosis=3):
    """
    Calculate Deflated Sharpe Ratio (Bailey & Lopez de Prado).

    Args:
        observed_sharpe: Best Sharpe ratio found
        num_trials: Number of parameter combos tested
        T: Number of return observations
        skew: Skewness of returns
        kurtosis: Kurtosis of returns
    """
    # Expected max Sharpe under null (all strategies are random)
    euler_mascheroni = 0.5772
    expected_max = ((1 - euler_mascheroni) * norm.ppf(1 - 1/num_trials)
                    + euler_mascheroni * norm.ppf(1 - 1/(num_trials * np.e)))

    # Standard error of Sharpe estimate
    se = np.sqrt((1 + 0.5 * observed_sharpe**2
                  - skew * observed_sharpe
                  + ((kurtosis - 3) / 4) * observed_sharpe**2) / T)

    # Probability that observed Sharpe is genuine
    dsr = norm.cdf((observed_sharpe - expected_max) / se)
    return dsr

# Tested 200 param combos, best Sharpe = 2.1 over 500 trading days
dsr = deflated_sharpe_ratio(
    observed_sharpe=2.1, num_trials=200, T=500
)
print(f"DSR probability: {dsr:.3f}")
# DSR < 0.05 means likely overfitted`}),e.jsx(t,{language:"python",title:"Parameter Sensitivity Heatmap",children:`def parameter_sensitivity(strategy_class, data, param1_range,
                          param2_range, metric='sharpe'):
    """Check if performance is robust across nearby parameters."""
    results = np.zeros((len(param1_range), len(param2_range)))

    for i, p1 in enumerate(param1_range):
        for j, p2 in enumerate(param2_range):
            strat = strategy_class(fast=p1, slow=p2)
            results[i, j] = strat.backtest(data)[metric]

    # Overfitting sign: sharp peak surrounded by poor values
    center = results[len(param1_range)//2, len(param2_range)//2]
    neighbors = results[
        len(param1_range)//2-1:len(param1_range)//2+2,
        len(param2_range)//2-1:len(param2_range)//2+2
    ].mean()
    robustness = neighbors / center if center > 0 else 0
    return results, robustness  # robustness > 0.7 is good`}),e.jsx(i,{title:"Rules of Thumb",children:"If your strategy has more than 5 tunable parameters, it is almost certainly overfit. Aim for 2-3 parameters maximum. If in-sample Sharpe is above 3.0 on daily data, be very skeptical. Real edges in Indian markets rarely exceed Sharpe 2.0 after costs."})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs(a,{title:"Paper Trading with Zerodha",description:"Using Kite API in sandbox mode for risk-free strategy validation.",children:[e.jsx(r,{term:"Paper Trading",children:"Executing a strategy with real market data but simulated orders. No real money is at risk. Validates that strategy logic, order handling, and system integration work correctly before going live."}),e.jsx(t,{language:"python",title:"Zerodha Paper Trading Wrapper",children:`from kiteconnect import KiteConnect, KiteTicker
import json
from datetime import datetime

class ZerodhaPaperTrader:
    """Wraps Kite API to intercept orders for paper trading."""

    def __init__(self, api_key, access_token):
        self.kite = KiteConnect(api_key=api_key)
        self.kite.set_access_token(access_token)
        self.paper_positions = {}
        self.order_log = []

    def place_order(self, symbol, side, qty, price=None, order_type='MARKET'):
        """Simulate order placement using live LTP."""
        if price is None:
            ltp = self.kite.ltp(symbol)[symbol]['last_price']
        else:
            ltp = price

        order = {
            'order_id': f"PAPER_{len(self.order_log)+1:06d}",
            'symbol': symbol,
            'side': side,
            'quantity': qty,
            'price': ltp,
            'timestamp': datetime.now().isoformat(),
            'status': 'COMPLETE',
        }
        self.order_log.append(order)

        # Update paper position
        key = symbol
        current = self.paper_positions.get(key, {'qty': 0, 'avg_price': 0})
        if side == 'BUY':
            total_cost = current['avg_price'] * current['qty'] + ltp * qty
            current['qty'] += qty
            current['avg_price'] = total_cost / current['qty']
        else:
            current['qty'] -= qty

        if current['qty'] == 0:
            self.paper_positions.pop(key, None)
        else:
            self.paper_positions[key] = current

        return order

    def get_pnl(self):
        pnl = {}
        for sym, pos in self.paper_positions.items():
            ltp = self.kite.ltp(sym)[sym]['last_price']
            pnl[sym] = (ltp - pos['avg_price']) * pos['qty']
        return pnl`}),e.jsx(i,{title:"Zerodha API Limits",children:"Zerodha allows 3 requests per second for quote APIs. In paper trading, batch your LTP requests using kite.ltp() with multiple symbols. The Kite Connect sandbox is not a full simulation -- use this wrapper with a live API key on real data instead."})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs(a,{title:"Delta Exchange Testnet",description:"Using Delta Exchange testnet for risk-free crypto derivatives testing.",children:[e.jsx(r,{term:"Delta Testnet",children:"A full sandbox environment at testnet.delta.exchange with simulated USDT balance. Supports the same REST and WebSocket APIs as production, with real-time price feeds mirroring mainnet markets."}),e.jsx(t,{language:"python",title:"Connecting to Delta Testnet",children:`import requests
import hashlib
import hmac
import time

class DeltaTestnetClient:
    """Client for Delta Exchange testnet."""

    BASE_URL = "https://testnet-api.delta.exchange/v2"

    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret

    def _sign(self, method, path, body=''):
        timestamp = str(int(time.time()))
        message = f"{method}{timestamp}{path}{body}"
        signature = hmac.new(
            self.api_secret.encode(), message.encode(), hashlib.sha256
        ).hexdigest()
        return {
            'api-key': self.api_key,
            'timestamp': timestamp,
            'signature': signature,
        }

    def get_wallet(self):
        path = "/wallet/balances"
        headers = self._sign("GET", path)
        resp = requests.get(f"{self.BASE_URL}{path}", headers=headers)
        return resp.json()

    def place_order(self, symbol, size, side, order_type='limit_order',
                    limit_price=None):
        path = "/orders"
        body = {
            'product_symbol': symbol,
            'size': size,
            'side': side,
            'order_type': order_type,
        }
        if limit_price:
            body['limit_price'] = str(limit_price)

        import json
        body_str = json.dumps(body)
        headers = self._sign("POST", path, body_str)
        headers['Content-Type'] = 'application/json'
        resp = requests.post(
            f"{self.BASE_URL}{path}", headers=headers, data=body_str
        )
        return resp.json()

# Connect to testnet (free signup at testnet.delta.exchange)
client = DeltaTestnetClient("testnet_key", "testnet_secret")
print(client.get_wallet())

# Place a test BTC perpetual order
result = client.place_order(
    symbol="BTCUSDT", size=10, side="buy",
    order_type="limit_order", limit_price="60000"
)`}),e.jsx(i,{title:"Testnet Limitations",children:"Delta testnet order book is thin -- slippage and fill behavior will not match production. Use testnet for API integration testing and order flow logic, not for performance evaluation. Always validate strategy returns separately using historical backtests."})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs(a,{title:"Live Data with Simulated Execution",description:"Running strategies on real-time feeds with a local simulated order book.",children:[e.jsx(r,{term:"Simulated Execution Engine",children:"A local component that receives live market data and processes paper orders against actual bid/ask prices. More realistic than using LTP alone because it accounts for spread and queue position."}),e.jsx(t,{language:"python",title:"Live Simulated Order Engine",children:`from datetime import datetime
from collections import deque

class SimulatedOrderEngine:
    """Execute paper orders against live tick data."""

    def __init__(self):
        self.pending_orders = deque()
        self.filled_orders = []
        self.positions = {}

    def submit_order(self, symbol, side, qty, limit_price=None):
        order = {
            'id': len(self.filled_orders) + len(self.pending_orders) + 1,
            'symbol': symbol,
            'side': side,
            'qty': qty,
            'limit_price': limit_price,
            'status': 'PENDING',
            'submitted_at': datetime.now(),
        }
        if limit_price is None:
            order['type'] = 'MARKET'
        else:
            order['type'] = 'LIMIT'
        self.pending_orders.append(order)
        return order['id']

    def on_tick(self, tick):
        """Process pending orders against live tick."""
        remaining = deque()
        for order in self.pending_orders:
            if order['symbol'] != tick['symbol']:
                remaining.append(order)
                continue

            filled = False
            if order['type'] == 'MARKET':
                fill_price = tick['ask'] if order['side'] == 'BUY' else tick['bid']
                filled = True
            elif order['type'] == 'LIMIT':
                if order['side'] == 'BUY' and tick['ask'] <= order['limit_price']:
                    fill_price = order['limit_price']
                    filled = True
                elif order['side'] == 'SELL' and tick['bid'] >= order['limit_price']:
                    fill_price = order['limit_price']
                    filled = True

            if filled:
                order['fill_price'] = fill_price
                order['filled_at'] = datetime.now()
                order['status'] = 'FILLED'
                self.filled_orders.append(order)
                self._update_position(order, fill_price)
            else:
                remaining.append(order)
        self.pending_orders = remaining

    def _update_position(self, order, price):
        sym = order['symbol']
        pos = self.positions.get(sym, 0)
        delta = order['qty'] if order['side'] == 'BUY' else -order['qty']
        self.positions[sym] = pos + delta`}),e.jsx(i,{title:"Integration with Kite WebSocket",children:"Feed Kite WebSocket ticks (MODE_FULL) into the on_tick method. This gives you live bid/ask prices for realistic fill simulation. Run this alongside your strategy logic for a full paper trading experience with real NSE market data."})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(a,{title:"Backtest vs Paper Trading Comparison",description:"Analyzing performance gaps between backtests and paper trading to build confidence.",children:[e.jsx(s,{title:"Backtest vs Paper Trading",headers:["Factor","Backtest","Paper Trading"],rows:[["Data","Historical bars","Live real-time feed"],["Execution","Simulated fills","Simulated against live quotes"],["Slippage","Model-estimated","Observed from bid/ask spread"],["Latency","None (instant)","Real network + processing delay"],["Market Impact","Estimated","Not applicable (no real orders)"],["Duration","Minutes to run years","Real-time, weeks to validate"]]}),e.jsx(t,{language:"python",title:"Performance Comparison Report",children:`import pandas as pd

class PerformanceComparator:
    """Compare backtest vs paper trading results."""

    def __init__(self, backtest_trades, paper_trades):
        self.bt = pd.DataFrame(backtest_trades)
        self.pt = pd.DataFrame(paper_trades)

    def slippage_analysis(self):
        """Compare fill prices for same trade signals."""
        merged = self.bt.merge(
            self.pt, on=['signal_time', 'symbol'], suffixes=('_bt', '_pt')
        )
        merged['slip_diff'] = abs(
            merged['fill_price_pt'] - merged['fill_price_bt']
        )
        return {
            'mean_slippage_diff': merged['slip_diff'].mean(),
            'max_slippage_diff': merged['slip_diff'].max(),
            'pct_worse_in_paper': (
                merged['pnl_pt'] < merged['pnl_bt']
            ).mean(),
        }

    def metrics_comparison(self):
        return {
            'backtest': {
                'total_pnl': self.bt['pnl'].sum(),
                'win_rate': (self.bt['pnl'] > 0).mean(),
                'avg_trade': self.bt['pnl'].mean(),
                'trade_count': len(self.bt),
            },
            'paper': {
                'total_pnl': self.pt['pnl'].sum(),
                'win_rate': (self.pt['pnl'] > 0).mean(),
                'avg_trade': self.pt['pnl'].mean(),
                'trade_count': len(self.pt),
            },
        }

    def degradation_ratio(self):
        """How much worse is paper vs backtest?"""
        bt_pnl = self.bt['pnl'].sum()
        pt_pnl = self.pt['pnl'].sum()
        if bt_pnl <= 0:
            return None
        return pt_pnl / bt_pnl  # 0.7 means 30% degradation`}),e.jsx(i,{title:"Acceptable Degradation",children:"Expect 20-40% degradation from backtest to paper trading. If paper retains 60%+ of backtest PnL, the strategy is viable for live deployment. If degradation exceeds 50%, revisit slippage assumptions and execution logic before risking real capital."})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));export{O as a,T as b,j as c,M as d,D as e,C as f,A as g,q as h,I as i,N as j,R as k,P as l,B as m,F as n,z as o,L as p,E as s};
