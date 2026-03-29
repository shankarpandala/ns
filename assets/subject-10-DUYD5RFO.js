import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as r,D as i,C as t,N as s}from"./subject-01-B5qsZKsm.js";const x={id:"10-monitoring",title:"Monitoring & Operations",icon:"📡",colorHex:"#14b8a6",description:"Monitor, alert, log, and maintain your autonomous trading system in production.",difficulty:"advanced",estimatedHours:4,prerequisites:["09-execution-engine"],chapters:[{id:"c1-dashboard",title:"Real-Time Dashboard",description:"Build dashboards for P&L, positions, order flow, and system health.",estimatedMinutes:55,sections:[{id:"s1-pnl-tracking",title:"P&L Tracking & Greeks Display",difficulty:"advanced",readingMinutes:15,description:"Real-time P&L tracking with options Greeks."},{id:"s2-position-heatmap",title:"Position Heatmap",difficulty:"advanced",readingMinutes:12,description:"Visualize positions across instruments."},{id:"s3-order-flow-viz",title:"Order Flow Visualization",difficulty:"advanced",readingMinutes:12,description:"Real-time order flow display and analysis."},{id:"s4-system-health",title:"System Health Metrics",difficulty:"advanced",readingMinutes:15,description:"CPU, memory, latency, and API health monitoring."}]},{id:"c2-alerting",title:"Alerting System",description:"Configure price, risk, and system alerts via Telegram and Discord.",estimatedMinutes:50,sections:[{id:"s1-price-volume",title:"Price & Volume Alerts",difficulty:"intermediate",readingMinutes:12,description:"Set up price breakout and volume spike alerts."},{id:"s2-risk-thresholds",title:"Risk Threshold Notifications",difficulty:"advanced",readingMinutes:12,description:"Alert on margin utilization and drawdown."},{id:"s3-system-errors",title:"System Error Alerts",difficulty:"advanced",readingMinutes:12,description:"API failures, connection drops, and error alerts."},{id:"s4-telegram-discord",title:"Telegram/Discord Bot Integration",difficulty:"intermediate",readingMinutes:12,description:"Build alert bots for Telegram and Discord."}]},{id:"c3-logging",title:"Logging & Observability",description:"Implement structured logging, log aggregation, and trade journaling.",estimatedMinutes:55,sections:[{id:"s1-structured-logging",title:"Structured Logging (JSON)",difficulty:"intermediate",readingMinutes:15,description:"Structured JSON logging with Python logging module."},{id:"s2-log-aggregation",title:"Log Aggregation & Search",difficulty:"advanced",readingMinutes:15,description:"Aggregate logs with ELK stack or Loki."},{id:"s3-performance-profiling",title:"Performance Profiling",difficulty:"advanced",readingMinutes:12,description:"Profile latency and identify bottlenecks."},{id:"s4-trade-journal",title:"Trade Journal & Analytics",difficulty:"intermediate",readingMinutes:12,description:"Automated trade journal with analytics."}]},{id:"c4-maintenance",title:"Maintenance & Updates",description:"Maintain production systems with zero-downtime updates and backups.",estimatedMinutes:50,sections:[{id:"s1-rolling-updates",title:"Rolling Updates with Zero Downtime",difficulty:"advanced",readingMinutes:12,description:"Deploy updates without interrupting trading."},{id:"s2-database-backup",title:"Database Backup & Recovery",difficulty:"advanced",readingMinutes:12,description:"TimescaleDB backup and point-in-time recovery."},{id:"s3-api-versioning",title:"API Version Management",difficulty:"intermediate",readingMinutes:12,description:"Handle Zerodha/Delta API version changes."},{id:"s4-security-patches",title:"Security Patch Workflow",difficulty:"advanced",readingMinutes:12,description:"Apply security patches within NemoClaw sandbox."}]}]};function a(){return e.jsxs(r,{title:"Real-Time P&L & Greeks Display",description:"Live portfolio P&L tracking with options Greeks for risk monitoring.",children:[e.jsx(i,{term:"Portfolio Greeks",children:"Aggregate delta, gamma, theta, and vega across all options positions. Portfolio delta shows net directional exposure; theta shows daily time decay income or cost."}),e.jsx(t,{language:"python",title:"Real-Time P&L Tracker",children:`from dataclasses import dataclass
from datetime import datetime

@dataclass
class PortfolioSnapshot:
    timestamp: datetime
    realized_pnl: float
    unrealized_pnl: float
    total_pnl: float
    net_delta: float
    net_gamma: float
    net_theta: float
    net_vega: float

class PnLTracker:
    """Track real-time P&L with Greeks aggregation."""

    def __init__(self, broker, greeks_engine):
        self.broker = broker
        self.greeks = greeks_engine
        self.snapshots = []

    def compute_snapshot(self):
        positions = self.broker.positions()['net']
        realized = sum(p.get('realised', 0) for p in positions)
        unrealized = sum(p.get('unrealised', 0) for p in positions)

        # Aggregate Greeks for options positions
        net_delta = net_gamma = net_theta = net_vega = 0
        for pos in positions:
            if pos['quantity'] == 0:
                continue
            if self._is_option(pos['tradingsymbol']):
                g = self.greeks.calculate(
                    symbol=pos['tradingsymbol'],
                    spot=pos['last_price'],
                    qty=pos['quantity'],
                )
                net_delta += g['delta']
                net_gamma += g['gamma']
                net_theta += g['theta']
                net_vega += g['vega']
            else:
                # Futures/equity delta = quantity
                net_delta += pos['quantity']

        snapshot = PortfolioSnapshot(
            timestamp=datetime.now(),
            realized_pnl=realized,
            unrealized_pnl=unrealized,
            total_pnl=realized + unrealized,
            net_delta=round(net_delta, 2),
            net_gamma=round(net_gamma, 4),
            net_theta=round(net_theta, 2),
            net_vega=round(net_vega, 2),
        )
        self.snapshots.append(snapshot)
        return snapshot

    def _is_option(self, symbol):
        return symbol.endswith('CE') or symbol.endswith('PE')

    def intraday_high_low(self):
        pnls = [s.total_pnl for s in self.snapshots]
        return {'high': max(pnls), 'low': min(pnls), 'current': pnls[-1]}`}),e.jsx(s,{title:"Greeks Dashboard Priority",children:"For options sellers, display theta prominently -- it is your daily income. Monitor net delta to stay direction-neutral. A sudden gamma spike means your delta will change rapidly with market moves, requiring immediate hedging attention."})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:a},Symbol.toStringTag,{value:"Module"}));function o(){return e.jsxs(r,{title:"Position Heatmap",description:"Visual representation of portfolio exposure across instruments and sectors.",children:[e.jsx(i,{term:"Position Heatmap",children:"A color-coded grid showing portfolio allocation and P&L across instruments. Green for profitable positions, red for losing ones, with size proportional to exposure. Provides instant visual awareness."}),e.jsx(t,{language:"python",title:"Position Heatmap Data Generator",children:`import pandas as pd

class PositionHeatmapData:
    """Generate heatmap data for dashboard visualization."""

    SECTOR_MAP = {
        'RELIANCE': 'Energy', 'ONGC': 'Energy',
        'HDFCBANK': 'Banking', 'ICICIBANK': 'Banking', 'SBIN': 'Banking',
        'TCS': 'IT', 'INFY': 'IT', 'WIPRO': 'IT',
        'SUNPHARMA': 'Pharma', 'DRREDDY': 'Pharma',
        'NIFTY': 'Index', 'BANKNIFTY': 'Index',
    }

    def __init__(self, broker):
        self.broker = broker

    def generate(self):
        positions = self.broker.positions()['net']
        heatmap_data = []

        for pos in positions:
            if pos['quantity'] == 0:
                continue
            symbol = pos['tradingsymbol']
            base_symbol = self._extract_base(symbol)
            exposure = abs(pos['quantity'] * pos['last_price'])
            pnl = pos.get('unrealised', 0)

            heatmap_data.append({
                'symbol': symbol,
                'sector': self.SECTOR_MAP.get(base_symbol, 'Other'),
                'exposure': exposure,
                'pnl': pnl,
                'pnl_pct': (pnl / exposure * 100) if exposure else 0,
                'side': 'LONG' if pos['quantity'] > 0 else 'SHORT',
                'quantity': pos['quantity'],
            })

        return pd.DataFrame(heatmap_data)

    def sector_summary(self):
        df = self.generate()
        if df.empty:
            return {}
        return df.groupby('sector').agg({
            'exposure': 'sum',
            'pnl': 'sum',
        }).to_dict('index')

    def concentration_check(self, max_pct=0.30):
        df = self.generate()
        total = df['exposure'].sum()
        df['weight'] = df['exposure'] / total
        concentrated = df[df['weight'] > max_pct]
        return concentrated[['symbol', 'weight', 'exposure']].to_dict('records')

    def _extract_base(self, symbol):
        for base in self.SECTOR_MAP:
            if symbol.startswith(base):
                return base
        return symbol

heatmap = PositionHeatmapData(kite)
sectors = heatmap.sector_summary()
for sector, data in sectors.items():
    print(f"{sector}: Exposure Rs {data['exposure']:,.0f}, PnL Rs {data['pnl']:,.0f}")`}),e.jsx(s,{title:"Dashboard Integration",children:"Feed this data to a React frontend using a FastAPI endpoint that refreshes every 5 seconds. Use a treemap chart (e.g., recharts Treemap) where tile size represents exposure and color represents P&L percentage -- instantly spot your biggest risk concentrations."})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"}));function n(){return e.jsxs(r,{title:"Order Flow Visualization",description:"Real-time visualization of order submissions, fills, and cancellations.",children:[e.jsx(i,{term:"Order Flow Dashboard",children:"A live view of all trading system activity: pending orders, recent fills, rejected orders, and execution quality metrics. Provides operational awareness of the execution engine state."}),e.jsx(t,{language:"python",title:"Order Flow Data Stream",children:`from collections import deque
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
        return sum(times) / len(times) if times else 0`}),e.jsx(t,{language:"python",title:"FastAPI Endpoint for Dashboard",children:`from fastapi import FastAPI
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
    return StreamingResponse(generate(), media_type="text/event-stream")`}),e.jsx(s,{title:"Visual Design Tip",children:"Use a scrolling timeline with color-coded dots: green for fills, yellow for pending, red for rejections. Show a sparkline of orders-per-minute to detect unusual activity spikes that may indicate strategy issues."})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:n},Symbol.toStringTag,{value:"Module"}));function l(){return e.jsxs(r,{title:"System Health Monitoring",description:"Tracking CPU, memory, latency, API status, and WebSocket connectivity.",children:[e.jsx(i,{term:"System Health Dashboard",children:"A real-time view of infrastructure metrics: process CPU/memory, network latency to broker APIs, WebSocket connection status, database query times, and message queue depth."}),e.jsx(t,{language:"python",title:"System Health Collector",children:`import psutil
import time
import requests

class SystemHealthCollector:
    """Collect system and trading infrastructure metrics."""

    def __init__(self):
        self.history = []

    def collect(self):
        process = psutil.Process()
        metrics = {
            'timestamp': time.time(),
            'cpu_percent': process.cpu_percent(),
            'memory_mb': process.memory_info().rss / 1024 / 1024,
            'memory_percent': process.memory_percent(),
            'threads': process.num_threads(),
            'open_files': len(process.open_files()),
            'connections': len(process.connections()),
        }

        # System-level metrics
        metrics['system_cpu'] = psutil.cpu_percent(interval=0.1)
        metrics['system_memory_pct'] = psutil.virtual_memory().percent
        metrics['disk_usage_pct'] = psutil.disk_usage('/').percent

        # API latency checks
        metrics['kite_api_ms'] = self._check_latency(
            "https://api.kite.trade/instruments"
        )
        metrics['delta_api_ms'] = self._check_latency(
            "https://api.delta.exchange/v2/products"
        )
        metrics['db_query_ms'] = self._check_db_latency()

        self.history.append(metrics)
        return metrics

    def _check_latency(self, url):
        try:
            start = time.monotonic()
            resp = requests.head(url, timeout=5)
            latency = (time.monotonic() - start) * 1000
            return round(latency, 1)
        except Exception:
            return -1  # Unreachable

    def _check_db_latency(self):
        try:
            import psycopg2
            start = time.monotonic()
            conn = psycopg2.connect("dbname=nemoclaw")
            cur = conn.cursor()
            cur.execute("SELECT 1")
            cur.close()
            conn.close()
            return round((time.monotonic() - start) * 1000, 1)
        except Exception:
            return -1

    def is_healthy(self, metrics):
        issues = []
        if metrics['memory_percent'] > 80:
            issues.append(f"High memory: {metrics['memory_percent']:.0f}%")
        if metrics['cpu_percent'] > 90:
            issues.append(f"High CPU: {metrics['cpu_percent']:.0f}%")
        if metrics['kite_api_ms'] > 2000 or metrics['kite_api_ms'] < 0:
            issues.append("Kite API slow or unreachable")
        if metrics['db_query_ms'] > 100:
            issues.append(f"DB slow: {metrics['db_query_ms']}ms")
        return len(issues) == 0, issues

health = SystemHealthCollector()
metrics = health.collect()
ok, issues = health.is_healthy(metrics)
if not ok:
    print(f"UNHEALTHY: {issues}")`}),e.jsx(s,{title:"Monitoring Frequency",children:"Collect system metrics every 10 seconds during market hours. Store in TimescaleDB for historical analysis. Set alerts for memory above 80%, API latency above 2 seconds, and any database connectivity issues. System health problems during trading can cause missed fills."})]})}const S=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"}));function d(){return e.jsxs(r,{title:"Price & Volume Alert Configuration",description:"Setting up threshold-based and pattern-based alerts for market monitoring.",children:[e.jsx(i,{term:"Alert Engine",children:"A system that evaluates market conditions against user-defined rules and triggers notifications when conditions are met. Runs on real-time tick data from Kite WebSocket feeds."}),e.jsx(t,{language:"python",title:"Alert Rule Engine",children:`from dataclasses import dataclass
from enum import Enum
from typing import Callable
from datetime import datetime

class AlertCondition(Enum):
    PRICE_ABOVE = "price_above"
    PRICE_BELOW = "price_below"
    VOLUME_SPIKE = "volume_spike"
    PERCENT_CHANGE = "percent_change"

@dataclass
class AlertRule:
    name: str
    symbol: str
    condition: AlertCondition
    threshold: float
    cooldown_minutes: int = 5
    last_triggered: datetime = None
    active: bool = True

class AlertEngine:
    """Evaluate market data against alert rules."""

    def __init__(self, notifier):
        self.rules = []
        self.notifier = notifier
        self.volume_history = {}

    def add_rule(self, rule: AlertRule):
        self.rules.append(rule)

    def on_tick(self, tick):
        symbol = tick['symbol']
        for rule in self.rules:
            if not rule.active or rule.symbol != symbol:
                continue
            if self._in_cooldown(rule):
                continue

            triggered = False
            message = ""

            if rule.condition == AlertCondition.PRICE_ABOVE:
                if tick['last_price'] > rule.threshold:
                    triggered = True
                    message = f"{symbol} above {rule.threshold}: {tick['last_price']}"

            elif rule.condition == AlertCondition.PRICE_BELOW:
                if tick['last_price'] < rule.threshold:
                    triggered = True
                    message = f"{symbol} below {rule.threshold}: {tick['last_price']}"

            elif rule.condition == AlertCondition.VOLUME_SPIKE:
                avg_vol = self._avg_volume(symbol)
                if avg_vol and tick.get('volume', 0) > avg_vol * rule.threshold:
                    triggered = True
                    message = f"{symbol} volume spike: {tick['volume']} vs avg {avg_vol:.0f}"

            elif rule.condition == AlertCondition.PERCENT_CHANGE:
                change = abs(tick.get('change_pct', 0))
                if change > rule.threshold:
                    triggered = True
                    message = f"{symbol} moved {change:.2f}%"

            if triggered:
                rule.last_triggered = datetime.now()
                self.notifier.send(rule.name, message)

    def _in_cooldown(self, rule):
        if rule.last_triggered is None:
            return False
        elapsed = (datetime.now() - rule.last_triggered).total_seconds()
        return elapsed < rule.cooldown_minutes * 60

    def _avg_volume(self, symbol):
        hist = self.volume_history.get(symbol, [])
        return sum(hist) / len(hist) if hist else None`}),e.jsx(s,{title:"Alert Fatigue",children:"Limit alerts to actionable events. Set cooldown periods (5-15 minutes) to avoid repeated notifications. Group related alerts (e.g., Nifty crossing 22000 and BankNifty crossing 48000) into a single summary."})]})}const j=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"}));function c(){return e.jsxs(r,{title:"Risk Threshold Notifications",description:"Alerting on margin utilization, drawdown levels, and exposure breaches.",children:[e.jsx(i,{term:"Risk Threshold Alert",children:"Notifications triggered when portfolio risk metrics exceed predefined limits. These serve as early warnings before circuit breakers activate, allowing manual intervention."}),e.jsx(t,{language:"python",title:"Risk Alert Monitor",children:`from dataclasses import dataclass
from typing import List

@dataclass
class RiskThreshold:
    metric: str
    warning_level: float
    critical_level: float
    current_value: float = 0.0

class RiskAlertMonitor:
    """Monitor portfolio risk metrics and send alerts."""

    def __init__(self, portfolio, notifier):
        self.portfolio = portfolio
        self.notifier = notifier
        self.thresholds = self._default_thresholds()

    def _default_thresholds(self):
        return [
            RiskThreshold('margin_utilization', warning=0.70, critical=0.85),
            RiskThreshold('daily_drawdown', warning=0.015, critical=0.025),
            RiskThreshold('max_drawdown', warning=0.05, critical=0.08),
            RiskThreshold('single_position_pct', warning=0.20, critical=0.30),
            RiskThreshold('net_delta_nifty_lots', warning=5, critical=10),
            RiskThreshold('open_orders_count', warning=15, critical=25),
        ]

    def check_all(self):
        metrics = self._compute_metrics()
        alerts = []

        for threshold in self.thresholds:
            value = metrics.get(threshold.metric, 0)
            threshold.current_value = value

            if value >= threshold.critical_level:
                alerts.append({
                    'level': 'CRITICAL',
                    'metric': threshold.metric,
                    'value': value,
                    'limit': threshold.critical_level,
                })
            elif value >= threshold.warning_level:
                alerts.append({
                    'level': 'WARNING',
                    'metric': threshold.metric,
                    'value': value,
                    'limit': threshold.warning_level,
                })

        for alert in alerts:
            self.notifier.send(
                f"RISK {alert['level']}: {alert['metric']}",
                f"Current: {alert['value']:.3f}, Limit: {alert['limit']:.3f}",
            )
        return alerts

    def _compute_metrics(self):
        margins = self.portfolio.get_margins()
        positions = self.portfolio.get_positions()
        equity = self.portfolio.get_equity()

        used = margins.get('used', 0)
        available = margins.get('available', 1)

        return {
            'margin_utilization': used / (used + available),
            'daily_drawdown': self.portfolio.daily_drawdown(),
            'max_drawdown': self.portfolio.max_drawdown(),
            'single_position_pct': self.portfolio.max_concentration(),
            'net_delta_nifty_lots': abs(self.portfolio.net_delta()) / 75,
            'open_orders_count': len(self.portfolio.open_orders()),
        }

# Check every 30 seconds during market hours
monitor = RiskAlertMonitor(portfolio, telegram_notifier)
alerts = monitor.check_all()
if alerts:
    print(f"Active alerts: {len(alerts)}")`}),e.jsx(s,{title:"Escalation Path",children:"WARNING alerts are informational -- log and display on dashboard. CRITICAL alerts should trigger Telegram/Discord notifications and auto-reduce position sizes by 50%. If two CRITICAL alerts fire within 5 minutes, auto-activate the kill switch."})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs(r,{title:"System Error Alerts",description:"Detecting and alerting on API failures, connection drops, and application errors.",children:[e.jsx(i,{term:"Error Classification",children:"System errors are categorized by severity: TRANSIENT (retry-able network blips), DEGRADED (partial functionality loss), and FATAL (system must stop trading). Each category triggers different response actions."}),e.jsx(t,{language:"python",title:"Error Alert System",children:`import logging
import traceback
from datetime import datetime, timedelta
from collections import defaultdict

class ErrorAlertSystem:
    """Classify and alert on system errors."""

    TRANSIENT_PATTERNS = ['ConnectionReset', 'Timeout', 'TooManyRequests']
    FATAL_PATTERNS = ['TokenExpired', 'InsufficientMargin', 'PermissionDenied']

    def __init__(self, notifier):
        self.notifier = notifier
        self.error_counts = defaultdict(int)
        self.error_window = []
        self.logger = logging.getLogger('error_alerts')

    def handle_error(self, error: Exception, context: str = ""):
        error_type = type(error).__name__
        error_msg = str(error)
        severity = self._classify(error_type, error_msg)

        self.error_counts[error_type] += 1
        self.error_window.append({
            'time': datetime.now(),
            'type': error_type,
            'severity': severity,
        })

        self.logger.error(f"[{severity}] {context}: {error_type}: {error_msg}")

        if severity == 'FATAL':
            self.notifier.send(
                "FATAL SYSTEM ERROR",
                f"{context}: {error_type}
{error_msg}
Action: HALT TRADING",
                priority='urgent',
            )
        elif severity == 'DEGRADED':
            self.notifier.send(
                "System Degraded",
                f"{context}: {error_type}
{error_msg}",
            )
        elif self._is_error_storm(error_type):
            self.notifier.send(
                "Error Storm Detected",
                f"{error_type} occurred {self.error_counts[error_type]} times",
            )

    def _classify(self, error_type, error_msg):
        combined = f"{error_type} {error_msg}"
        if any(p in combined for p in self.FATAL_PATTERNS):
            return 'FATAL'
        if any(p in combined for p in self.TRANSIENT_PATTERNS):
            return 'TRANSIENT'
        return 'DEGRADED'

    def _is_error_storm(self, error_type, threshold=10, window_min=5):
        """Detect if too many errors of same type in short window."""
        cutoff = datetime.now() - timedelta(minutes=window_min)
        recent = [e for e in self.error_window
                  if e['time'] > cutoff and e['type'] == error_type]
        return len(recent) >= threshold

    def error_summary(self):
        return dict(self.error_counts)

# Integration with trading system
error_system = ErrorAlertSystem(telegram_notifier)

try:
    order_id = kite.place_order(...)
except Exception as e:
    error_system.handle_error(e, context="place_order:NIFTY")`}),e.jsx(s,{title:"Error Storms",children:"During Zerodha maintenance windows or exchange outages, you may see hundreds of connection errors per minute. Implement error deduplication to avoid flooding your notification channels. One summary alert every 5 minutes is better than 500 individual alerts."})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs(r,{title:"Telegram & Discord Bot Integration",description:"Sending trading alerts and receiving commands via Telegram and Discord bots.",children:[e.jsx(i,{term:"Trading Alert Bot",children:"A messaging bot that pushes real-time notifications (fills, P&L updates, risk alerts) and optionally accepts commands (status, kill, positions) for remote monitoring and control of the trading system."}),e.jsx(t,{language:"python",title:"Telegram Alert Bot",children:`import requests
import asyncio
from telegram import Bot, Update
from telegram.ext import Application, CommandHandler

class TelegramAlertBot:
    """Send alerts and handle commands via Telegram."""

    def __init__(self, token, chat_id):
        self.token = token
        self.chat_id = chat_id
        self.base_url = f"https://api.telegram.org/bot{token}"

    def send(self, title, message, priority='normal'):
        icon = "🔴" if priority == 'urgent' else "📊"
        text = f"{icon} <b>{title}</b>
{message}"
        requests.post(f"{self.base_url}/sendMessage", json={
            'chat_id': self.chat_id,
            'text': text,
            'parse_mode': 'HTML',
        })

    def send_trade_fill(self, symbol, side, qty, price, pnl=None):
        arrow = "🟢 BUY" if side == 'BUY' else "🔴 SELL"
        msg = f"{arrow} {symbol}
Qty: {qty} @ Rs {price:,.2f}"
        if pnl is not None:
            msg += f"
P&L: Rs {pnl:,.2f}"
        self.send("Trade Fill", msg)

    def send_daily_summary(self, summary):
        msg = (
            f"Total P&L: Rs {summary['pnl']:,.2f}
"
            f"Trades: {summary['trades']}
"
            f"Win Rate: {summary['win_rate']:.0%}
"
            f"Max Drawdown: Rs {summary['max_dd']:,.2f}"
        )
        self.send("Daily Summary", msg)

# Command handler for remote control
async def handle_status(update: Update, context):
    pnl = trading_system.get_pnl()
    await update.message.reply_text(
        f"P&L: Rs {pnl['total']:,.2f}
"
        f"Positions: {pnl['open_count']}
"
        f"System: {'ACTIVE' if trading_system.is_active() else 'HALTED'}"
    )

async def handle_kill(update: Update, context):
    result = trading_system.kill_switch.activate("telegram_command")
    await update.message.reply_text(f"Kill switch activated: {result}")

# Setup bot with commands
app = Application.builder().token("BOT_TOKEN").build()
app.add_handler(CommandHandler("status", handle_status))
app.add_handler(CommandHandler("kill", handle_kill))
app.add_handler(CommandHandler("positions", handle_positions))`}),e.jsx(t,{language:"python",title:"Discord Webhook for Alerts",children:`import requests

class DiscordNotifier:
    def __init__(self, webhook_url):
        self.webhook_url = webhook_url

    def send(self, title, message, color=0x00ff00):
        payload = {
            "embeds": [{
                "title": title,
                "description": message,
                "color": color,
            }]
        }
        requests.post(self.webhook_url, json=payload)

discord = DiscordNotifier("https://discord.com/api/webhooks/...")`}),e.jsx(s,{title:"Security Warning",children:"Never expose kill switch or order placement commands without authentication. Use Telegram chat_id whitelisting and require a confirmation step for destructive commands. Store bot tokens in environment variables, never in code."})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs(r,{title:"Structured JSON Logging",description:"Configuring Python logging for machine-parseable structured output.",children:[e.jsx(i,{term:"Structured Logging",children:"Outputting log entries as JSON objects with consistent fields (timestamp, level, module, message, context) instead of plain text. Enables automated parsing, filtering, and aggregation by log management tools."}),e.jsx(t,{language:"python",title:"Structured Logging Setup",children:`import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    """Format log records as JSON lines."""

    def format(self, record):
        log_entry = {
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName,
            'line': record.lineno,
        }

        # Include extra context if provided
        if hasattr(record, 'context'):
            log_entry['context'] = record.context

        # Include exception info
        if record.exc_info and record.exc_info[0]:
            log_entry['exception'] = {
                'type': record.exc_info[0].__name__,
                'message': str(record.exc_info[1]),
                'traceback': self.formatException(record.exc_info),
            }

        return json.dumps(log_entry)

def setup_logging(log_file='logs/nemoclaw.jsonl', level=logging.INFO):
    root = logging.getLogger()
    root.setLevel(level)

    # JSON file handler
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(JSONFormatter())
    root.addHandler(file_handler)

    # Console handler (human-readable)
    console = logging.StreamHandler()
    console.setFormatter(logging.Formatter(
        '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
    ))
    root.addHandler(console)

    return root

# Usage with trading context
setup_logging()
logger = logging.getLogger('strategy.mean_reversion')

class ContextAdapter(logging.LoggerAdapter):
    def process(self, msg, kwargs):
        kwargs.setdefault('extra', {})['context'] = self.extra
        return msg, kwargs

trade_logger = ContextAdapter(logger, {
    'strategy': 'mean_reversion',
    'symbol': 'NIFTY25MARFUT',
})
trade_logger.info("Signal generated: BUY at 22000")`}),e.jsx(s,{title:"Log Levels for Trading",children:"Use DEBUG for tick-level data and signal calculations. INFO for order submissions and fills. WARNING for retries and partial fills. ERROR for failed orders and API issues. CRITICAL for kill switch activations and system failures. In production, set minimum level to INFO."})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs(r,{title:"Log Aggregation with Loki",description:"Centralized log collection and querying using Grafana Loki for trading systems.",children:[e.jsx(i,{term:"Grafana Loki",children:"A horizontally-scalable log aggregation system designed for efficiency. Unlike ELK, Loki indexes only labels (not full text), making it lightweight and ideal for a WSL2 trading setup with limited resources."}),e.jsx(t,{language:"python",title:"Sending Logs to Loki via Promtail",children:`# promtail-config.yaml (in your NemoClaw project)
# Promtail watches log files and ships to Loki

"""
server:
  http_listen_port: 9080

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://localhost:3100/loki/api/v1/push

scrape_configs:
  - job_name: nemoclaw
    static_configs:
      - targets: [localhost]
        labels:
          job: nemoclaw
          __path__: /home/user/ns/logs/*.jsonl
    pipeline_stages:
      - json:
          expressions:
            level: level
            logger: logger
            strategy: context.strategy
      - labels:
          level:
          logger:
          strategy:
"""

# Alternative: Push logs directly via Python
import requests
import time

class LokiHandler:
    """Send log entries directly to Loki HTTP API."""

    def __init__(self, url="http://localhost:3100"):
        self.url = f"{url}/loki/api/v1/push"

    def push(self, labels: dict, message: str):
        timestamp_ns = str(int(time.time() * 1e9))
        payload = {
            "streams": [{
                "stream": labels,
                "values": [[timestamp_ns, message]],
            }]
        }
        requests.post(self.url, json=payload)

loki = LokiHandler()
loki.push(
    {"job": "nemoclaw", "level": "info", "strategy": "iron_condor"},
    '{"message": "Position opened", "symbol": "NIFTY", "delta": -0.15}'
)`}),e.jsx(t,{language:"bash",title:"Docker Compose for Loki Stack",children:`# docker-compose.yml for Loki + Grafana
# version: "3"
# services:
#   loki:
#     image: grafana/loki:2.9.0
#     ports: ["3100:3100"]
#     volumes: [./loki-config.yaml:/etc/loki/config.yaml]
#
#   grafana:
#     image: grafana/grafana:latest
#     ports: ["3000:3000"]
#     environment:
#       GF_SECURITY_ADMIN_PASSWORD: nemoclaw
#
# Query examples in Grafana:
# {job="nemoclaw"} |= "ERROR"
# {strategy="mean_reversion"} | json | level="ERROR"
# rate({job="nemoclaw"} |= "order" [5m])`}),e.jsx(s,{title:"Resource Usage in WSL2",children:"Loki uses ~200MB RAM compared to Elasticsearch's 2GB+. For a single-user trading system in WSL2, Loki with Grafana is the right choice. Set retention to 30 days to manage disk space. Use Grafana dashboards to correlate log events with P&L changes."})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs(r,{title:"Performance Profiling & Latency",description:"Measuring and optimizing execution latency across the trading pipeline.",children:[e.jsx(i,{term:"Tick-to-Trade Latency",children:"The total time from receiving a market tick to submitting an order to the broker API. For Python-based retail algo systems, target under 50ms for signal generation and under 200ms total including API call."}),e.jsx(t,{language:"python",title:"Latency Profiler",children:`import time
import functools
from collections import defaultdict
import statistics

class LatencyProfiler:
    """Measure execution time of trading pipeline stages."""

    def __init__(self):
        self.measurements = defaultdict(list)

    def measure(self, stage_name):
        """Decorator to measure function execution time."""
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                start = time.perf_counter_ns()
                result = func(*args, **kwargs)
                elapsed_us = (time.perf_counter_ns() - start) / 1000
                self.measurements[stage_name].append(elapsed_us)
                return result
            return wrapper
        return decorator

    def report(self):
        report = {}
        for stage, times in self.measurements.items():
            report[stage] = {
                'count': len(times),
                'mean_us': round(statistics.mean(times), 1),
                'p50_us': round(statistics.median(times), 1),
                'p95_us': round(sorted(times)[int(len(times)*0.95)], 1),
                'p99_us': round(sorted(times)[int(len(times)*0.99)], 1),
                'max_us': round(max(times), 1),
            }
        return report

profiler = LatencyProfiler()

@profiler.measure("signal_generation")
def generate_signal(tick_data):
    # Strategy logic here
    return compute_indicators(tick_data)

@profiler.measure("risk_check")
def check_risk(signal):
    return risk_gate.validate(signal)

@profiler.measure("order_submission")
def submit_order(order):
    return broker.place_order(**order)

# After market hours, review latency
for stage, stats in profiler.report().items():
    print(f"{stage}: mean={stats['mean_us']:.0f}us "
          f"p95={stats['p95_us']:.0f}us "
          f"p99={stats['p99_us']:.0f}us")`}),e.jsx(t,{language:"python",title:"Memory Profiling",children:`import tracemalloc

def profile_memory(func):
    """Profile peak memory usage of a function."""
    tracemalloc.start()
    result = func()
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    print(f"Current: {current/1024:.1f}KB, Peak: {peak/1024:.1f}KB")
    return result

# Profile strategy initialization
profile_memory(lambda: strategy.load_historical_data())`}),e.jsx(s,{title:"Optimization Priorities",children:"Profile before optimizing. Common bottlenecks in Python trading systems: (1) pandas DataFrame operations in hot loops -- use numpy arrays instead, (2) JSON serialization/deserialization -- use orjson for 5-10x speedup, (3) HTTP API calls -- use connection pooling with requests.Session."})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(r,{title:"Automated Trade Journal",description:"Automatically recording and analyzing every trade for continuous improvement.",children:[e.jsx(i,{term:"Trade Journal",children:"A detailed log of every trade including entry/exit prices, rationale, market conditions, and outcome. Automated journals capture data that manual journaling misses, enabling systematic performance analysis."}),e.jsx(t,{language:"python",title:"Automated Trade Journal",children:`import pandas as pd
from datetime import datetime
import json

class TradeJournal:
    """Automated trade journal with analytics."""

    def __init__(self, db_path="data/trade_journal.jsonl"):
        self.db_path = db_path

    def record_trade(self, trade: dict):
        entry = {
            'trade_id': trade['trade_id'],
            'timestamp': datetime.now().isoformat(),
            'symbol': trade['symbol'],
            'strategy': trade['strategy'],
            'side': trade['side'],
            'entry_price': trade['entry_price'],
            'exit_price': trade['exit_price'],
            'quantity': trade['quantity'],
            'pnl': trade['pnl'],
            'holding_period_min': trade.get('holding_period_min'),
            'entry_reason': trade.get('entry_reason', ''),
            'exit_reason': trade.get('exit_reason', ''),
            'slippage': trade.get('slippage', 0),
            'commissions': trade.get('commissions', 0),
            'market_conditions': trade.get('market_conditions', {}),
        }
        with open(self.db_path, 'a') as f:
            f.write(json.dumps(entry) + '
')

    def load_trades(self, start_date=None, strategy=None):
        trades = []
        with open(self.db_path) as f:
            for line in f:
                trade = json.loads(line)
                if strategy and trade['strategy'] != strategy:
                    continue
                trades.append(trade)
        return pd.DataFrame(trades)

    def weekly_review(self):
        df = self.load_trades()
        df['date'] = pd.to_datetime(df['timestamp']).dt.date
        last_week = df.tail(50)  # Approximate last week

        return {
            'total_trades': len(last_week),
            'win_rate': (last_week['pnl'] > 0).mean(),
            'total_pnl': last_week['pnl'].sum(),
            'avg_winner': last_week[last_week['pnl'] > 0]['pnl'].mean(),
            'avg_loser': last_week[last_week['pnl'] < 0]['pnl'].mean(),
            'best_trade': last_week.loc[last_week['pnl'].idxmax()].to_dict(),
            'worst_trade': last_week.loc[last_week['pnl'].idxmin()].to_dict(),
            'by_strategy': last_week.groupby('strategy')['pnl'].agg(
                ['count', 'sum', 'mean']
            ).to_dict('index'),
            'avg_holding_min': last_week['holding_period_min'].mean(),
        }

journal = TradeJournal()
review = journal.weekly_review()
print(f"Win rate: {review['win_rate']:.0%}")
print(f"Total P&L: Rs {review['total_pnl']:,.0f}")`}),e.jsx(s,{title:"Review Cadence",children:"Run weekly reviews every Saturday. Focus on: which strategies are working, average holding period vs plan, slippage patterns, and whether losses cluster at specific times (e.g., first 15 minutes after open). Use insights to refine strategy parameters."})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs(r,{title:"Rolling Updates with Zero Downtime",description:"Deploying code changes to the trading system without interrupting active trading.",children:[e.jsx(i,{term:"Zero-Downtime Deployment",children:"Updating the trading system while it continues to operate. New code is loaded alongside the old version, and traffic is switched over only after the new version passes health checks."}),e.jsx(t,{language:"python",title:"Graceful Strategy Hot-Reload",children:`import importlib
import sys
import logging

logger = logging.getLogger('deployer')

class StrategyHotReloader:
    """Reload strategy modules without stopping the engine."""

    def __init__(self, engine):
        self.engine = engine
        self.active_strategies = {}

    def reload_strategy(self, module_name):
        """Hot-reload a strategy module."""
        logger.info(f"Reloading strategy: {module_name}")

        # Save current state
        old_strategy = self.active_strategies.get(module_name)
        state = old_strategy.get_state() if old_strategy else None

        try:
            # Reload the module
            if module_name in sys.modules:
                module = importlib.reload(sys.modules[module_name])
            else:
                module = importlib.import_module(module_name)

            # Create new strategy instance
            new_strategy = module.Strategy()
            if state:
                new_strategy.restore_state(state)

            # Health check
            if not new_strategy.health_check():
                raise Exception("Health check failed")

            # Swap in the new strategy
            self.active_strategies[module_name] = new_strategy
            self.engine.register_strategy(new_strategy)
            logger.info(f"Strategy {module_name} reloaded successfully")
            return True

        except Exception as e:
            logger.error(f"Reload failed: {e}, keeping old version")
            if old_strategy:
                self.engine.register_strategy(old_strategy)
            return False`}),e.jsx(t,{language:"bash",title:"Deployment Script",children:`#!/bin/bash
# deploy.sh - Zero-downtime deployment for NemoClaw

set -e
DEPLOY_DIR="/home/user/ns"
BACKUP_DIR="/home/user/ns-backup-$(date +%Y%m%d%H%M)"

echo "Creating backup..."
cp -r "$DEPLOY_DIR" "$BACKUP_DIR"

echo "Pulling latest code..."
cd "$DEPLOY_DIR" && git pull origin main

echo "Installing dependencies..."
pip install -r requirements.txt --quiet

echo "Running tests..."
python -m pytest tests/ -q --tb=short
if [ $? -ne 0 ]; then
    echo "Tests failed! Rolling back..."
    rm -rf "$DEPLOY_DIR"
    mv "$BACKUP_DIR" "$DEPLOY_DIR"
    exit 1
fi

echo "Sending reload signal..."
curl -X POST http://localhost:8080/admin/reload

echo "Verifying health..."
sleep 5
STATUS=$(curl -s http://localhost:8080/health | python -c "import sys,json; print(json.load(sys.stdin)['status'])")
if [ "$STATUS" != "healthy" ]; then
    echo "Health check failed! Rolling back..."
    rm -rf "$DEPLOY_DIR"
    mv "$BACKUP_DIR" "$DEPLOY_DIR"
    curl -X POST http://localhost:8080/admin/reload
    exit 1
fi

echo "Deployment successful!"
rm -rf "$BACKUP_DIR"`}),e.jsx(s,{title:"Deploy Outside Market Hours",children:"Always deploy between 4:00 PM and 8:00 AM IST when markets are closed. If an urgent hotfix is needed during market hours, flatten all positions first, deploy, verify, then resume trading with reduced size."})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs(r,{title:"TimescaleDB Backup & Recovery",description:"Backup strategies, retention policies, and disaster recovery for market data.",children:[e.jsx(i,{term:"Continuous Archiving",children:"PostgreSQL WAL (Write-Ahead Log) archiving captures every database change incrementally. Combined with base backups, it enables point-in-time recovery to any moment before a data loss event."}),e.jsx(t,{language:"bash",title:"TimescaleDB Backup Scripts",children:`#!/bin/bash
# backup_timescaledb.sh - Daily backup of NemoClaw database

BACKUP_DIR="/home/user/backups/timescaledb"
DB_NAME="nemoclaw"
DATE=$(date +%Y%m%d)
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

# Full database dump with TimescaleDB support
pg_dump -Fc -Z 6 \\
  --no-owner \\
  -d "$DB_NAME" \\
  -f "$BACKUP_DIR/${DB_NAME}_${DATE}.dump"

echo "Backup size: $(du -h $BACKUP_DIR/${DB_NAME}_${DATE}.dump | cut -f1)"

# Verify backup integrity
pg_restore --list "$BACKUP_DIR/${DB_NAME}_${DATE}.dump" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Backup verified: $DATE"
else
    echo "ERROR: Backup verification failed!"
    # Send alert
    curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \\
      -d "chat_id=$CHAT_ID&text=DB backup verification FAILED: $DATE"
fi

# Clean old backups
find "$BACKUP_DIR" -name "*.dump" -mtime +$RETENTION_DAYS -delete
echo "Cleaned backups older than $RETENTION_DAYS days"`}),e.jsx(t,{language:"python",title:"Automated Backup with Retention",children:`import subprocess
from datetime import datetime
from pathlib import Path

class TimescaleBackupManager:
    def __init__(self, db_name='nemoclaw', backup_dir='/home/user/backups'):
        self.db_name = db_name
        self.backup_dir = Path(backup_dir)
        self.backup_dir.mkdir(parents=True, exist_ok=True)

    def full_backup(self):
        date_str = datetime.now().strftime('%Y%m%d_%H%M')
        filename = self.backup_dir / f"{self.db_name}_{date_str}.dump"

        result = subprocess.run([
            'pg_dump', '-Fc', '-Z', '6', '-d', self.db_name,
            '-f', str(filename),
        ], capture_output=True, text=True)

        if result.returncode == 0:
            size_mb = filename.stat().st_size / 1024 / 1024
            return {'status': 'success', 'file': str(filename), 'size_mb': round(size_mb, 1)}
        return {'status': 'failed', 'error': result.stderr}

    def restore(self, backup_file):
        result = subprocess.run([
            'pg_restore', '-d', self.db_name, '--clean', '--if-exists',
            str(backup_file),
        ], capture_output=True, text=True)
        return result.returncode == 0

    def apply_retention(self, keep_daily=7, keep_weekly=4):
        """Keep 7 daily + 4 weekly backups."""
        backups = sorted(self.backup_dir.glob('*.dump'), reverse=True)
        to_keep = set(backups[:keep_daily])  # Keep latest 7
        # Keep one per week for older ones
        for i, b in enumerate(backups[keep_daily:]):
            if i % 7 == 0 and len(to_keep) < keep_daily + keep_weekly:
                to_keep.add(b)
        for b in backups:
            if b not in to_keep:
                b.unlink()`}),e.jsx(s,{title:"Backup Schedule",children:"Run full backups daily at 4:00 PM IST (after market close). For intraday OHLCV data, a full dump can be 5-20GB depending on history depth. Schedule backups via cron and monitor completion with alerts. Test restore procedures monthly."})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs(r,{title:"Handling API Version Changes",description:"Managing Zerodha and Delta Exchange API updates without breaking production trading.",children:[e.jsx(i,{term:"API Version Migration",children:"The process of updating client code when broker APIs introduce breaking changes. Zerodha and Delta may change endpoints, response formats, or authentication methods with advance notice."}),e.jsx(t,{language:"python",title:"API Version Adapter Pattern",children:`from abc import ABC, abstractmethod

class BrokerAdapter(ABC):
    """Abstract adapter for broker API versioning."""

    @abstractmethod
    def place_order(self, symbol, side, qty, price=None):
        pass

    @abstractmethod
    def get_positions(self):
        pass

    @abstractmethod
    def get_ltp(self, symbols):
        pass

class KiteV3Adapter(BrokerAdapter):
    """Adapter for Kite Connect API v3."""

    def __init__(self, kite):
        self.kite = kite

    def place_order(self, symbol, side, qty, price=None):
        order_type = 'MARKET' if price is None else 'LIMIT'
        return self.kite.place_order(
            variety='regular',
            exchange='NFO',
            tradingsymbol=symbol,
            transaction_type=side,
            quantity=qty,
            product='MIS',
            order_type=order_type,
            price=price,
        )

    def get_positions(self):
        raw = self.kite.positions()['net']
        return [{
            'symbol': p['tradingsymbol'],
            'qty': p['quantity'],
            'avg_price': p['average_price'],
            'ltp': p['last_price'],
            'pnl': p['unrealised'],
        } for p in raw if p['quantity'] != 0]

    def get_ltp(self, symbols):
        raw = self.kite.ltp(symbols)
        return {k: v['last_price'] for k, v in raw.items()}

class KiteV4Adapter(BrokerAdapter):
    """Adapter for future Kite API v4 (when released)."""

    def __init__(self, kite_v4):
        self.kite = kite_v4

    def place_order(self, symbol, side, qty, price=None):
        # Adapt to new v4 API format
        return self.kite.create_order({
            'instrument': symbol,
            'direction': side,
            'quantity': qty,
            'limit_price': price,
        })

    # ... implement other methods for v4

def get_broker_adapter(version='v3', **kwargs):
    adapters = {
        'v3': KiteV3Adapter,
        'v4': KiteV4Adapter,
    }
    adapter_class = adapters.get(version)
    if not adapter_class:
        raise ValueError(f"Unsupported API version: {version}")
    return adapter_class(**kwargs)`}),e.jsx(t,{language:"python",title:"API Change Detection",children:`import requests
import hashlib

class APIChangeMonitor:
    """Detect when broker APIs change unexpectedly."""

    def __init__(self, notifier):
        self.notifier = notifier
        self.response_schemas = {}

    def check_schema(self, name, url, headers=None):
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            keys = sorted(resp.json().keys()) if resp.ok else []
            schema_hash = hashlib.md5(str(keys).encode()).hexdigest()

            if name in self.response_schemas:
                if self.response_schemas[name] != schema_hash:
                    self.notifier.send(
                        "API Schema Change Detected",
                        f"{name}: response structure changed!",
                    )
            self.response_schemas[name] = schema_hash
        except Exception as e:
            self.notifier.send("API Check Failed", f"{name}: {e}")`}),e.jsx(s,{title:"Stay Updated",children:"Subscribe to Zerodha Kite Connect changelog and Delta Exchange API announcements. Test against new API versions in a sandbox branch at least 1 week before they become mandatory. Pin your kiteconnect package version in requirements.txt to prevent surprise upgrades."})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(r,{title:"Security Patch Workflow",description:"Keeping the NemoClaw trading sandbox secure with systematic patching and vulnerability management.",children:[e.jsx(i,{term:"Dependency Vulnerability",children:"A known security flaw in a third-party package used by your system. Trading systems handle API keys, access tokens, and financial data -- a compromised dependency can lead to credential theft or unauthorized trades."}),e.jsx(t,{language:"python",title:"Automated Security Audit",children:`import subprocess
import json

class SecurityAuditor:
    """Audit Python dependencies for known vulnerabilities."""

    def check_pip_audit(self):
        """Run pip-audit for known CVEs."""
        result = subprocess.run(
            ['pip-audit', '--format', 'json', '--desc'],
            capture_output=True, text=True,
        )
        if result.returncode != 0:
            vulns = json.loads(result.stdout) if result.stdout else []
            return {
                'vulnerable_packages': len(vulns),
                'details': vulns,
            }
        return {'vulnerable_packages': 0, 'details': []}

    def check_safety(self):
        """Run safety check on requirements."""
        result = subprocess.run(
            ['safety', 'check', '--json', '-r', 'requirements.txt'],
            capture_output=True, text=True,
        )
        return json.loads(result.stdout) if result.stdout else []

    def generate_report(self):
        pip_results = self.check_pip_audit()
        critical = [v for v in pip_results['details']
                    if v.get('severity', '') == 'HIGH']
        return {
            'total_vulns': pip_results['vulnerable_packages'],
            'critical': len(critical),
            'action_required': len(critical) > 0,
            'packages': [v.get('name') for v in critical],
        }

auditor = SecurityAuditor()
report = auditor.generate_report()
if report['action_required']:
    print(f"CRITICAL: {report['critical']} packages need patching")
    print(f"Packages: {report['packages']}")`}),e.jsx(t,{language:"bash",title:"Weekly Security Patch Script",children:`#!/bin/bash
# security_patch.sh - Run weekly on Saturday

echo "=== NemoClaw Security Patch Check ==="
cd /home/user/ns

# Update pip and audit tools
pip install --upgrade pip pip-audit safety --quiet

# Check for vulnerabilities
echo "Running pip-audit..."
pip-audit --fix --dry-run 2>&1 | tee /tmp/audit_report.txt

# Check for outdated packages
echo "Outdated packages:"
pip list --outdated --format=json | python -c "
import sys, json
pkgs = json.load(sys.stdin)
critical = ['kiteconnect', 'websockets', 'cryptography', 'requests']
for p in pkgs:
    flag = ' [CRITICAL]' if p['name'] in critical else ''
    print(f"  {p['name']}: {p['version']} -> {p['latest_version']}{flag}")
"

# Check WSL2 system updates
echo "System security updates:"
sudo apt list --upgradable 2>/dev/null | grep -i security

echo "=== Review above and apply patches ==="
echo "Run: pip-audit --fix   (to auto-fix Python packages)"
echo "Run: sudo apt upgrade  (for system packages)"`}),e.jsx(s,{title:"Patch Priority",children:"Patch immediately: cryptography, requests, websockets, and any package that handles API keys or network communication. Schedule for weekend: pandas, numpy, and other data packages. Always test in paper trading mode for 1 day after patching before resuming live trading."})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));export{P as a,T as b,S as c,j as d,R as e,I as f,D as g,E as h,C as i,L as j,O as k,N as l,x as m,M as n,B as o,q as p,A as s};
