import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as a,a as r,C as t,N as i,D as s,W as o}from"./subject-01-B5qsZKsm.js";import{C as n}from"./subject-02-D6eTCXus.js";const j={id:"04-market-data",title:"Market Data Infrastructure",icon:"📊",colorHex:"#06b6d4",description:"Build a robust market data pipeline with Zerodha Kite, Delta Exchange, and alternative data sources.",difficulty:"intermediate",estimatedHours:4,prerequisites:["01-wsl2-foundation"],chapters:[{id:"c1-zerodha-kite",title:"Zerodha Kite API",description:"Connect to Zerodha Kite for Indian equity and derivatives data.",estimatedMinutes:55,sections:[{id:"s1-account-registration",title:"Account & API App Registration",difficulty:"beginner",readingMinutes:12,description:"Register a Zerodha developer app for API access."},{id:"s2-authentication",title:"Authentication Flow (Login, 2FA, Token)",difficulty:"intermediate",readingMinutes:15,description:"Implement the Kite Connect login and token flow."},{id:"s3-instruments",title:"Instruments & Symbol Mapping",difficulty:"intermediate",readingMinutes:12,description:"Download instrument lists and map trading symbols."},{id:"s4-historical-data",title:"Historical Data (Candles, Tick)",difficulty:"intermediate",readingMinutes:15,description:"Fetch historical candle and tick data from Kite."}]},{id:"c2-delta-exchange",title:"Delta Exchange India API",description:"Connect to Delta Exchange for crypto derivatives trading in India.",estimatedMinutes:55,sections:[{id:"s1-account-setup",title:"Account Setup & API Keys",difficulty:"beginner",readingMinutes:12,description:"Create Delta Exchange India account and generate keys."},{id:"s2-rest-websocket",title:"REST API & WebSocket Streams",difficulty:"intermediate",readingMinutes:15,description:"REST endpoints and WebSocket streaming setup."},{id:"s3-contract-specs",title:"Futures & Options Contract Specs",difficulty:"intermediate",readingMinutes:12,description:"Contract specifications, settlement, and expiry cycles."},{id:"s4-orders-margin",title:"Order Types & Margin System",difficulty:"intermediate",readingMinutes:15,description:"Order types, margin calculation, and leverage."}]},{id:"c3-realtime-pipeline",title:"Real-Time Data Pipeline",description:"Build high-throughput data pipelines for live market data.",estimatedMinutes:60,sections:[{id:"s1-websocket-architecture",title:"WebSocket Architecture",difficulty:"intermediate",readingMinutes:15,description:"Design WebSocket connections for multi-exchange feeds."},{id:"s2-tick-ingestion",title:"Tick Data Ingestion & Storage",difficulty:"intermediate",readingMinutes:15,description:"High-throughput tick data ingestion pipeline."},{id:"s3-timescaledb",title:"TimescaleDB for Time-Series",difficulty:"intermediate",readingMinutes:15,description:"Set up TimescaleDB for efficient time-series storage."},{id:"s4-data-quality",title:"Data Normalization & Quality Checks",difficulty:"intermediate",readingMinutes:12,description:"Data normalization, gap detection, and quality monitoring."}]},{id:"c4-alternative-data",title:"Alternative Data Sources",description:"Augment trading data with NSE feeds, options chain, and institutional flows.",estimatedMinutes:50,sections:[{id:"s1-nse-bhav",title:"NSE Bhav Copy & Index Data",difficulty:"intermediate",readingMinutes:12,description:"Parse NSE bhav copies and index constituent data."},{id:"s2-options-chain",title:"Options Chain & OI Data",difficulty:"intermediate",readingMinutes:12,description:"Real-time options chain and open interest analysis."},{id:"s3-fii-dii",title:"FII/DII Flow Data",difficulty:"intermediate",readingMinutes:12,description:"Track FII/DII activity and participant-wise positions."},{id:"s4-corporate-events",title:"Corporate Actions & Events Calendar",difficulty:"intermediate",readingMinutes:12,description:"Corporate actions, earnings calendar, and RBI dates."}]}]};function l(){return e.jsxs(a,{title:"Zerodha API App Registration",subtitle:"Setting up a Kite Connect developer account and creating your API app",difficulty:"beginner",readingMinutes:5,children:[e.jsx(r,{title:"Registration Process",steps:[{title:"Create a Zerodha trading account",content:e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Visit ",e.jsx("strong",{children:"zerodha.com"})," and complete KYC. You need an active trading account before you can access the API. Account activation takes 24-48 hours."]})},{title:"Sign up for Kite Connect",content:e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Go to ",e.jsx("strong",{children:"developers.kite.trade"})," and log in with your Zerodha credentials. Subscribe to the Kite Connect API plan (Rs 2000/month). This gives you REST API and WebSocket access."]})},{title:"Create an API app",content:e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:['In the developer console, click "Create new app". Set the redirect URL to',e.jsx("code",{children:" http://127.0.0.1:5000/callback"})," for local development. Note down the ",e.jsx("strong",{children:"API Key"})," and ",e.jsx("strong",{children:"API Secret"}),"."]})},{title:"Store credentials securely",content:e.jsx(t,{language:"bash",code:`# Store in environment variables, never in code
echo 'export KITE_API_KEY="your_api_key"' >> ~/.bashrc
echo 'export KITE_API_SECRET="your_api_secret"' >> ~/.bashrc
source ~/.bashrc`})}]}),e.jsx(i,{type:"warning",title:"API Costs",children:e.jsx("p",{children:"Kite Connect charges Rs 2000/month for API access. Historical data API is an additional Rs 2000/month. WebSocket streaming is included in the base plan. Charges are debited from your trading account."})}),e.jsx(i,{type:"tip",title:"Paper Trading First",children:e.jsxs("p",{children:["Use the Kite Connect sandbox environment during development. Set",e.jsx("code",{children:" KITE_BASE_URL=https://api.kite.trade"})," for production and the sandbox URL for testing."]})})]})}const w=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"}));function c(){return e.jsxs(a,{title:"Kite Connect Authentication Flow",subtitle:"Implementing the login flow, 2FA handling, and access token management",difficulty:"intermediate",readingMinutes:6,children:[e.jsx(r,{title:"OAuth-style Login Flow",steps:[{title:"Redirect user to Kite login",content:e.jsx(t,{language:"python",code:`from kiteconnect import KiteConnect
import os

kite = KiteConnect(api_key=os.environ["KITE_API_KEY"])
login_url = kite.login_url()
print(f"Open in browser: {login_url}")`})},{title:"Capture the request token from callback",content:e.jsx(t,{language:"python",code:`from flask import Flask, request

app = Flask(__name__)

@app.route("/callback")
def callback():
    request_token = request.args.get("request_token")
    # Exchange for access token
    data = kite.generate_session(
        request_token,
        api_secret=os.environ["KITE_API_SECRET"]
    )
    access_token = data["access_token"]
    save_token(access_token)  # Store securely
    return "Login successful! You can close this tab."`})},{title:"Use the access token for API calls",content:e.jsx(t,{language:"python",code:`kite.set_access_token(access_token)
profile = kite.profile()
print(f"Logged in as: {profile['user_name']}")
print(f"Broker: {profile['broker']}")`})}]}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Token Persistence"}),e.jsx(t,{language:"python",title:"Save and reload tokens across sessions",code:`import json
from pathlib import Path
from datetime import date

TOKEN_FILE = Path.home() / ".nemoclaw" / "kite_token.json"

def save_token(access_token):
    TOKEN_FILE.parent.mkdir(exist_ok=True)
    TOKEN_FILE.write_text(json.dumps({
        "access_token": access_token,
        "date": str(date.today())
    }))
    TOKEN_FILE.chmod(0o600)  # Owner-only read/write

def load_token():
    if TOKEN_FILE.exists():
        data = json.loads(TOKEN_FILE.read_text())
        if data["date"] == str(date.today()):
            return data["access_token"]
    return None  # Token expired, re-login needed`}),e.jsx(i,{type:"important",title:"Daily Token Expiry",children:e.jsxs("p",{children:["Kite access tokens expire at ",e.jsx("strong",{children:"6:00 AM IST daily"}),". Your bot must re-authenticate every morning before market open. Automate this with a cron job or a startup script."]})})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));function d(){return e.jsxs(a,{title:"Instruments and Symbol Mapping",subtitle:"Working with the Kite instrument list, exchange segments, and token mapping",difficulty:"intermediate",readingMinutes:6,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Fetching the Instrument List"}),e.jsx(t,{language:"python",title:"Download and cache the instrument dump",code:`import pandas as pd

def get_instruments(kite, cache_path="instruments.csv"):
    """Fetch instruments (updated daily). Cache locally."""
    from pathlib import Path
    from datetime import date

    cache = Path(cache_path)
    if cache.exists() and cache.stat().st_mtime >        pd.Timestamp(date.today()).timestamp():
        return pd.read_csv(cache)

    instruments = pd.DataFrame(kite.instruments())
    instruments.to_csv(cache, index=False)
    return instruments

df = get_instruments(kite)
print(f"Total instruments: {len(df)}")
print(df.head())`}),e.jsx(n,{title:"Key Exchange Segments",headers:["Segment","Exchange","Instruments"],rows:[["NSE","NSE equity","Stocks (RELIANCE, TCS, etc.)"],["NFO","NSE F&O","NIFTY/BANKNIFTY futures & options"],["BSE","BSE equity","BSE-listed stocks"],["BFO","BSE F&O","SENSEX derivatives"],["CDS","Currency","USDINR futures & options"],["MCX","Commodity","GOLD, CRUDE, SILVER futures"]]}),e.jsx(t,{language:"python",title:"Symbol lookup helper",code:`def find_instrument(df, symbol, exchange="NSE", segment=None):
    """Look up instrument token by trading symbol."""
    mask = (df["tradingsymbol"] == symbol) & (df["exchange"] == exchange)
    if segment:
        mask &= (df["segment"] == segment)
    result = df[mask]
    if result.empty:
        raise ValueError(f"{symbol} not found on {exchange}")
    return result.iloc[0]["instrument_token"]

# Examples
nifty_token = find_instrument(df, "NIFTY 50", "NSE")
reliance_token = find_instrument(df, "RELIANCE", "NSE")
nifty_fut = find_instrument(df, "NIFTY25MARFUT", "NFO")`}),e.jsx(i,{type:"tip",title:"Options Symbol Format",children:e.jsxs("p",{children:["NFO options follow the pattern: ",e.jsx("code",{children:"NIFTY25MAR22500CE"})," (underlying + expiry + strike + type). Parse these with regex:",e.jsx("code",{children:" /^(\\w+)(\\d{2}[A-Z]{3})(\\d+)(CE|PE)$/"})]})})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs(a,{title:"Historical Data with Kite Connect",subtitle:"Fetching candle data, tick-level history, and understanding data limitations",difficulty:"intermediate",readingMinutes:6,children:[e.jsx(t,{language:"python",title:"Fetch historical OHLCV candles",code:`from datetime import datetime, timedelta

def fetch_candles(kite, token, interval="5minute", days=30):
    to_date = datetime.now()
    from_date = to_date - timedelta(days=days)
    data = kite.historical_data(
        instrument_token=token,
        from_date=from_date,
        to_date=to_date,
        interval=interval,
        oi=True  # Include open interest for F&O
    )
    return pd.DataFrame(data)

# Fetch NIFTY 5-min candles for last 30 days
nifty_df = fetch_candles(kite, nifty_token, "5minute", 30)
print(nifty_df.tail())`}),e.jsx(n,{title:"Available Intervals and Limits",headers:["Interval","Max History","Rate Limit"],rows:[["minute","60 days","3 requests/sec"],["3minute","100 days","3 requests/sec"],["5minute","100 days","3 requests/sec"],["15minute","200 days","3 requests/sec"],["60minute","400 days","3 requests/sec"],["day","2000 days (~5.5 years)","3 requests/sec"]]}),e.jsx(t,{language:"python",title:"Batch download with rate limiting",code:`import time

def bulk_download(kite, tokens, interval="day", days=365):
    """Download history for multiple instruments with rate limiting."""
    all_data = {}
    for i, (symbol, token) in enumerate(tokens.items()):
        if i > 0 and i % 3 == 0:
            time.sleep(1)  # Respect 3 req/sec limit
        try:
            df = fetch_candles(kite, token, interval, days)
            df["symbol"] = symbol
            all_data[symbol] = df
        except Exception as e:
            print(f"Error fetching {symbol}: {e}")
    return all_data`}),e.jsx(i,{type:"warning",title:"Data Limitations",children:e.jsxs("p",{children:["Kite historical API does ",e.jsx("strong",{children:"not"})," provide tick-level data -- only OHLCV candles. For tick data, you must capture it yourself via WebSocket during market hours and store it locally. There is no way to backfill missed ticks."]})}),e.jsx(i,{type:"tip",title:"Cost-Free Alternative",children:e.jsx("p",{children:"NSE bhav copy data (daily OHLCV) is freely available. For strategies that only need daily bars, consider downloading from NSE directly instead of paying for the historical data API addon."})})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs(a,{title:"Delta Exchange India Account Setup",subtitle:"Creating your account, generating API keys, and configuring testnet access",difficulty:"beginner",readingMinutes:5,children:[e.jsx(s,{term:"Delta Exchange India",definition:"A crypto and derivatives exchange offering INR-settled futures and options on NIFTY, BANKNIFTY, BTC, and ETH with leverage up to 100x for crypto pairs.",example:"Trade BTCINR perpetual futures with 10x leverage using Delta's API."}),e.jsx(r,{title:"Account Setup Steps",steps:[{title:"Register on Delta Exchange India",content:e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Visit ",e.jsx("strong",{children:"india.delta.exchange"})," and sign up with email. Complete KYC verification with PAN card and Aadhaar. Verification usually takes a few hours."]})},{title:"Enable testnet for development",content:e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Access the testnet at ",e.jsx("strong",{children:"testnet.india.delta.exchange"}),". Create a separate testnet account -- it comes pre-funded with test INR for paper trading."]})},{title:"Generate API keys",content:e.jsx(t,{language:"bash",code:`# Navigate to Settings > API Keys on the dashboard
# Create a new API key with these permissions:
#   - Read (for market data)
#   - Trade (for order placement)
#   - Do NOT enable Withdraw

# Store securely
echo 'export DELTA_API_KEY="your_key"' >> ~/.bashrc
echo 'export DELTA_API_SECRET="your_secret"' >> ~/.bashrc
source ~/.bashrc`})}]}),e.jsx(t,{language:"python",title:"Test API connection",code:`from delta_rest_client import DeltaRestClient
import os

# Use testnet URL for development
client = DeltaRestClient(
    base_url="https://cdn-ind.deltaex.org",  # Prod
    # base_url="https://cdn-testnet.deltaex.org",  # Testnet
    api_key=os.environ["DELTA_API_KEY"],
    api_secret=os.environ["DELTA_API_SECRET"]
)
wallet = client.get_balances()
print(f"Available balance: {wallet}")`}),e.jsx(i,{type:"tip",title:"Always Start with Testnet",children:e.jsxs("p",{children:["Develop and test all strategies on testnet first. The testnet API is identical to production. Switch by changing only the ",e.jsx("code",{children:"base_url"}),"."]})})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs(a,{title:"REST and WebSocket APIs",subtitle:"Using Delta Exchange REST endpoints and real-time WebSocket streaming",difficulty:"intermediate",readingMinutes:7,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"REST API Basics"}),e.jsx(t,{language:"python",title:"Common REST API calls",code:`# Get all available products
products = client.get_products()
for p in products[:5]:
    print(f"{p['symbol']} - {p['description']}")

# Get orderbook for BTCINR
orderbook = client.get_l2_orderbook("BTCINR")
print(f"Best bid: {orderbook['buy'][0]['price']}")
print(f"Best ask: {orderbook['sell'][0]['price']}")

# Get recent trades
trades = client.get_trades("BTCINR")
for t in trades[:3]:
    print(f"{t['side']} {t['size']} @ {t['price']}")`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"WebSocket Streaming"}),e.jsx(t,{language:"python",title:"Real-time market data via WebSocket",code:`import asyncio
import websockets
import json

async def stream_delta_ticks(symbols):
    uri = "wss://socket.india.delta.exchange"
    async with websockets.connect(uri) as ws:
        # Subscribe to orderbook and trades
        for symbol in symbols:
            await ws.send(json.dumps({
                "type": "subscribe",
                "payload": {
                    "channels": [
                        {"name": "l2_orderbook", "symbols": [symbol]},
                        {"name": "recent_trade", "symbols": [symbol]},
                        {"name": "mark_price", "symbols": [symbol]},
                    ]
                }
            }))

        async for message in ws:
            data = json.loads(message)
            channel = data.get("type", "")
            if channel == "l2_orderbook":
                handle_orderbook_update(data)
            elif channel == "recent_trade":
                handle_trade(data)

asyncio.run(stream_delta_ticks(["BTCINR", "ETHINR"]))`}),e.jsx(i,{type:"tip",title:"Heartbeat / Ping",children:e.jsx("p",{children:"Delta's WebSocket requires periodic ping frames. Most WebSocket libraries handle this automatically. If you get disconnected every 30 seconds, ensure your client sends ping frames at least every 25 seconds."})}),e.jsx(i,{type:"info",title:"Rate Limits",children:e.jsx("p",{children:"REST API: 100 requests per 10 seconds. WebSocket: unlimited incoming data, but subscribe to a maximum of 20 channels per connection. Use multiple connections if needed."})})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs(a,{title:"Contract Specifications",subtitle:"Understanding futures, options, settlement, and expiry on Delta Exchange",difficulty:"intermediate",readingMinutes:5,children:[e.jsx(n,{title:"Key Contract Types",headers:["Contract","Settlement","Expiry","Lot Size"],rows:[["BTCINR Perpetual","INR (cash)","No expiry","0.001 BTC"],["BTCINR Futures","INR (cash)","Monthly","0.001 BTC"],["ETHINR Perpetual","INR (cash)","No expiry","0.01 ETH"],["NIFTY Futures","INR (cash)","Weekly/Monthly","1 unit"],["BTC Options","INR (cash)","Daily/Weekly","0.001 BTC"]]}),e.jsx(s,{term:"Perpetual Swap",definition:"A futures contract with no expiry date. Instead of settlement, a funding rate is exchanged between longs and shorts every 8 hours to keep the price anchored to spot.",example:"If funding rate is +0.01%, longs pay shorts 0.01% of position value every 8 hours."}),e.jsx(t,{language:"python",title:"Fetch contract details programmatically",code:`def get_contract_info(client, symbol):
    products = client.get_products()
    contract = next(p for p in products if p["symbol"] == symbol)
    return {
        "symbol": contract["symbol"],
        "type": contract["contract_type"],
        "tick_size": contract["tick_size"],
        "lot_size": contract["contract_size"],
        "settlement": contract["settlement_currency"],
        "funding_interval": contract.get("funding_interval"),
    }

info = get_contract_info(client, "BTCINR")
print(f"Tick size: {info['tick_size']}")
print(f"Min order: {info['lot_size']}")`}),e.jsx(i,{type:"warning",title:"Funding Rate Risk",children:e.jsx("p",{children:"Perpetual swaps charge funding every 8 hours. In trending markets, funding can be 0.1% or more per interval -- that is 0.3%/day or ~9%/month. Factor this into any carry or basis trade strategy."})}),e.jsx(i,{type:"tip",title:"Expiry Calendar",children:e.jsxs("p",{children:["Delta NIFTY futures expire weekly on Thursday (same as NSE). BTC/ETH options have daily expiries. Fetch the expiry list with ",e.jsx("code",{children:"client.get_products()"})," and filter by ",e.jsx("code",{children:"settlement_time"}),"."]})})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs(a,{title:"Orders and Margin Management",subtitle:"Order types, margin calculation, and leverage on Delta Exchange",difficulty:"intermediate",readingMinutes:6,children:[e.jsx(n,{title:"Order Types",headers:["Type","Description","Use Case"],rows:[["Limit","Execute at specified price or better","Precise entry/exit levels"],["Market","Execute immediately at best price","Urgent fills, stop triggers"],["Stop Limit","Limit order triggered at stop price","Stop loss with price control"],["Stop Market","Market order triggered at stop price","Guaranteed stop execution"],["Bracket","Entry + stop loss + take profit","Automated risk management"]]}),e.jsx(t,{language:"python",title:"Place orders via API",code:`# Limit buy order
order = client.place_order(
    product_id=27,         # BTCINR product ID
    size=1,                # Number of contracts
    side="buy",
    limit_price="5000000", # Price in INR
    order_type="limit_order",
    time_in_force="gtc"    # Good till cancelled
)
print(f"Order ID: {order['id']}")

# Stop loss order
stop = client.place_order(
    product_id=27,
    size=1,
    side="sell",
    order_type="stop_market_order",
    stop_price="4900000",
    time_in_force="gtc"
)`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Margin Calculation"}),e.jsx(t,{language:"python",title:"Check margin requirements",code:`def calculate_margin(client, symbol, size, leverage):
    """Estimate margin required for a position."""
    products = client.get_products()
    product = next(p for p in products if p["symbol"] == symbol)
    mark_price = float(product["mark_price"])
    notional = mark_price * size * float(product["contract_size"])
    initial_margin = notional / leverage
    maintenance_margin = initial_margin * 0.5  # Typically 50% of IM
    return {
        "notional": notional,
        "initial_margin": initial_margin,
        "maintenance_margin": maintenance_margin,
    }`}),e.jsx(o,{title:"Liquidation Risk",children:"High leverage amplifies losses. At 10x leverage, a 10% adverse move wipes out your margin entirely. Always use stop losses and never risk more than 2% of capital per trade."}),e.jsx(i,{type:"tip",title:"Reduce Leverage for Overnight",children:e.jsx("p",{children:"Crypto markets are 24/7. If holding overnight, reduce leverage to 3-5x maximum to survive gap moves during low-liquidity hours (2-6 AM IST)."})})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs(a,{title:"WebSocket Architecture for Multi-Exchange Feeds",subtitle:"Designing a unified real-time data pipeline for Zerodha and Delta Exchange",difficulty:"advanced",readingMinutes:7,children:[e.jsx(s,{term:"Unified Feed Handler",definition:"A single abstraction layer that normalizes tick data from multiple exchanges into a common format, enabling strategies to consume data without knowing the source exchange."}),e.jsx(t,{language:"python",title:"Base feed handler interface",code:`from abc import ABC, abstractmethod
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
        self.subscribers.append(callback)`}),e.jsx(t,{language:"python",title:"Kite WebSocket feed handler",code:`from kiteconnect import KiteTicker

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
        self.ws.connect(threaded=True)`}),e.jsx(i,{type:"tip",title:"Message Queue for Decoupling",children:e.jsx("p",{children:"Place a Redis Streams or ZeroMQ queue between the feed handler and consumers. This decouples ingestion speed from processing speed and prevents slow consumers from causing backpressure on the WebSocket."})})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs(a,{title:"High-Throughput Tick Ingestion",subtitle:"Processing and storing thousands of ticks per second from live market feeds",difficulty:"advanced",readingMinutes:6,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Batched Write Pipeline"}),e.jsx(t,{language:"python",title:"Async tick buffer with batch inserts",code:`import asyncio
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
            )`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"OHLCV Candle Aggregation"}),e.jsx(t,{language:"python",title:"Build candles from tick stream",code:`class CandleAggregator:
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
            c["volume"] += tick.volume`}),e.jsx(i,{type:"tip",title:"Performance Benchmark",children:e.jsx("p",{children:"A Python asyncio pipeline with batch inserts can handle 5,000-10,000 ticks/second on a single core. For NIFTY + top 50 stocks, peak tick rate is around 2,000/second during volatile periods -- well within capacity."})})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(a,{title:"TimescaleDB for Time-Series Storage",subtitle:"Setting up TimescaleDB on WSL2 for efficient market data storage and queries",difficulty:"intermediate",readingMinutes:7,children:[e.jsx(s,{term:"TimescaleDB",definition:"A PostgreSQL extension optimized for time-series data. It automatically partitions data by time into 'chunks', enabling fast inserts and time-range queries on billions of rows."}),e.jsx(t,{language:"bash",title:"Install TimescaleDB on WSL2",code:`# Add TimescaleDB repository
sudo apt install -y gnupg postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y
sudo apt install -y timescaledb-2-postgresql-16

# Enable the extension
sudo timescaledb-tune --yes
sudo systemctl restart postgresql`}),e.jsx(t,{language:"bash",title:"Create the market data schema",code:`sudo -u postgres psql -c "CREATE DATABASE nemoclaw;"
sudo -u postgres psql nemoclaw <<'SQL'
CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE ticks (
    ts         TIMESTAMPTZ NOT NULL,
    symbol     TEXT        NOT NULL,
    exchange   TEXT        NOT NULL,
    price      DOUBLE PRECISION,
    volume     BIGINT,
    bid        DOUBLE PRECISION,
    ask        DOUBLE PRECISION
);
SELECT create_hypertable('ticks', 'ts');

CREATE TABLE candles (
    ts         TIMESTAMPTZ NOT NULL,
    symbol     TEXT        NOT NULL,
    interval   TEXT        NOT NULL,
    open       DOUBLE PRECISION,
    high       DOUBLE PRECISION,
    low        DOUBLE PRECISION,
    close      DOUBLE PRECISION,
    volume     BIGINT,
    oi         BIGINT
);
SELECT create_hypertable('candles', 'ts');

-- Continuous aggregate for 5-min candles from ticks
CREATE INDEX idx_ticks_symbol_ts ON ticks (symbol, ts DESC);
CREATE INDEX idx_candles_symbol_ts ON candles (symbol, interval, ts DESC);
SQL`}),e.jsx(t,{language:"python",title:"Query recent candles",code:`import asyncpg

async def get_recent_candles(symbol, interval="5minute", limit=100):
    conn = await asyncpg.connect("postgresql://localhost/nemoclaw")
    rows = await conn.fetch("""
        SELECT ts, open, high, low, close, volume
        FROM candles
        WHERE symbol = $1 AND interval = $2
        ORDER BY ts DESC LIMIT $3
    """, symbol, interval, limit)
    await conn.close()
    return rows`}),e.jsx(i,{type:"tip",title:"Compression for Old Data",children:e.jsxs("p",{children:["Enable TimescaleDB compression for data older than 7 days:",e.jsx("code",{children:"ALTER TABLE ticks SET (timescaledb.compress); SELECT add_compression_policy('ticks', INTERVAL '7 days');"}),"This reduces storage by 90%+ for tick data."]})})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs(a,{title:"Data Quality and Normalization",subtitle:"Gap detection, outlier filtering, and quality checks for market data",difficulty:"intermediate",readingMinutes:6,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Tick Data Validation"}),e.jsx(t,{language:"python",title:"Real-time tick quality filter",code:`class TickValidator:
    def __init__(self):
        self.last_price = {}  # symbol -> last valid price
        self.max_jump_pct = 0.10  # 10% max single-tick jump

    def validate(self, tick):
        symbol = tick.symbol
        if symbol in self.last_price:
            last = self.last_price[symbol]
            change = abs(tick.price - last) / last
            if change > self.max_jump_pct:
                return False  # Likely erroneous tick
            if tick.price <= 0:
                return False
            if tick.bid > tick.ask:
                return False  # Crossed book = bad data
        self.last_price[symbol] = tick.price
        return True`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Gap Detection"}),e.jsx(t,{language:"python",title:"Detect missing candles in historical data",code:`import pandas as pd

def detect_gaps(df, interval_minutes=5):
    """Find missing candles in OHLCV data."""
    df = df.sort_values("ts")
    expected_delta = pd.Timedelta(minutes=interval_minutes)
    gaps = []
    for i in range(1, len(df)):
        actual_delta = df.iloc[i]["ts"] - df.iloc[i-1]["ts"]
        if actual_delta > expected_delta * 1.5:
            gaps.append({
                "from": df.iloc[i-1]["ts"],
                "to": df.iloc[i]["ts"],
                "missing_candles": int(actual_delta / expected_delta) - 1,
            })
    return gaps

# Usage
gaps = detect_gaps(nifty_5min_df)
for g in gaps:
    print(f"Gap: {g['from']} to {g['to']} ({g['missing_candles']} candles)")`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Cross-Exchange Normalization"}),e.jsx(t,{language:"python",title:"Normalize symbols across exchanges",code:`SYMBOL_MAP = {
    ("NIFTY 50", "NSE"): "NIFTY",
    ("NIFTY25MARFUT", "NFO"): "NIFTY-FUT",
    ("NIFTYINR", "DELTA"): "NIFTY-PERP",
}

def normalize_symbol(raw_symbol, exchange):
    return SYMBOL_MAP.get((raw_symbol, exchange), raw_symbol)`}),e.jsx(o,{title:"Bad Data Causes Bad Trades",children:"A single erroneous tick (e.g., NIFTY at 0 or 99999) can trigger false signals. Always filter data before it reaches your strategy engine."}),e.jsx(i,{type:"tip",title:"Daily Reconciliation",children:e.jsx("p",{children:"After market close, reconcile your captured tick data against the official bhav copy. Compare your computed daily OHLCV with the exchange's official values to catch any ingestion issues."})})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(a,{title:"NSE Bhav Copy Parsing",subtitle:"Downloading and parsing NSE daily settlement data and index values",difficulty:"beginner",readingMinutes:6,children:[e.jsx(s,{term:"Bhav Copy",definition:"The official end-of-day settlement file published by NSE containing OHLCV data, delivery quantities, and settlement prices for all traded instruments.",example:"The equity bhav copy CSV has columns: SYMBOL, SERIES, OPEN, HIGH, LOW, CLOSE, TOTTRDQTY, TOTTRDVAL."}),e.jsx(t,{language:"python",title:"Download NSE bhav copy",code:`import requests
import pandas as pd
from datetime import date
from io import BytesIO
from zipfile import ZipFile

def download_bhav_copy(dt: date) -> pd.DataFrame:
    """Download equity bhav copy for a given date."""
    d = dt.strftime("%d%b%Y").upper()
    m = dt.strftime("%b").upper()
    y = dt.year
    url = (f"https://nsearchives.nseindia.com/content/historical/"
           f"EQUITIES/CM/{d[2:5]}/cm{d}bhav.csv.zip")
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    with ZipFile(BytesIO(resp.content)) as z:
        csv_name = z.namelist()[0]
        df = pd.read_csv(z.open(csv_name))
    return df

# Usage
bhav = download_bhav_copy(date(2026, 3, 27))
nifty_stocks = bhav[bhav["SERIES"] == "EQ"]
print(f"Stocks traded: {len(nifty_stocks)}")
print(nifty_stocks[["SYMBOL","CLOSE","TOTTRDQTY"]].head())`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Index Data"}),e.jsx(t,{language:"python",title:"Fetch NIFTY index values",code:`def download_index_data(index_name="NIFTY 50", days=365):
    """Download index OHLCV from NSE."""
    url = "https://www.nseindia.com/api/historical/indicesHistory"
    params = {
        "indexType": index_name,
        "from": (date.today() - timedelta(days=days)).strftime("%d-%m-%Y"),
        "to": date.today().strftime("%d-%m-%Y"),
    }
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})
    session.get("https://www.nseindia.com")  # Get cookies
    resp = session.get(url, params=params, timeout=30)
    data = resp.json()["data"]
    return pd.DataFrame(data)`}),e.jsx(i,{type:"tip",title:"Free Data Source",children:e.jsx("p",{children:"Bhav copy data is completely free and published daily by NSE after market close (around 6:30 PM IST). It is the most reliable source for daily OHLCV and is sufficient for swing trading and positional strategies."})})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs(a,{title:"Options Chain Data and OI Analysis",subtitle:"Fetching and analyzing options chains, open interest patterns, and put-call ratios",difficulty:"intermediate",readingMinutes:7,children:[e.jsx(s,{term:"Open Interest (OI)",definition:"Total number of outstanding derivative contracts that have not been settled. Rising OI with price increase signals strong trend; rising OI with price decrease signals distribution.",seeAlso:["Put-Call Ratio","Max Pain","OI Spurts"]}),e.jsx(t,{language:"python",title:"Fetch NIFTY options chain from NSE",code:`import requests
import pandas as pd

def get_options_chain(symbol="NIFTY"):
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})
    session.get("https://www.nseindia.com")  # Cookies
    url = f"https://www.nseindia.com/api/option-chain-indices?symbol={symbol}"
    resp = session.get(url, timeout=30)
    data = resp.json()["records"]["data"]

    rows = []
    for item in data:
        strike = item["strikePrice"]
        ce = item.get("CE", {})
        pe = item.get("PE", {})
        rows.append({
            "strike": strike,
            "ce_oi": ce.get("openInterest", 0),
            "ce_change_oi": ce.get("changeinOpenInterest", 0),
            "ce_ltp": ce.get("lastPrice", 0),
            "pe_oi": pe.get("openInterest", 0),
            "pe_change_oi": pe.get("changeinOpenInterest", 0),
            "pe_ltp": pe.get("lastPrice", 0),
        })
    return pd.DataFrame(rows)`}),e.jsx(t,{language:"python",title:"Key OI analysis metrics",code:`def analyze_oi(chain_df, spot_price):
    # Max Pain -- strike where option buyers lose the most
    chain_df["ce_pain"] = chain_df["ce_oi"] * abs(spot_price - chain_df["strike"]).clip(lower=0)
    chain_df["pe_pain"] = chain_df["pe_oi"] * abs(chain_df["strike"] - spot_price).clip(lower=0)
    chain_df["total_pain"] = chain_df["ce_pain"] + chain_df["pe_pain"]
    max_pain = chain_df.loc[chain_df["total_pain"].idxmin(), "strike"]

    # PCR -- Put-Call Ratio
    total_ce_oi = chain_df["ce_oi"].sum()
    total_pe_oi = chain_df["pe_oi"].sum()
    pcr = total_pe_oi / total_ce_oi if total_ce_oi > 0 else 0

    # Highest OI strikes (support/resistance)
    resistance = chain_df.loc[chain_df["ce_oi"].idxmax(), "strike"]
    support = chain_df.loc[chain_df["pe_oi"].idxmax(), "strike"]

    return {"max_pain": max_pain, "pcr": round(pcr, 2),
            "resistance": resistance, "support": support}`}),e.jsx(i,{type:"tip",title:"OI Change Matters More Than Absolute OI",children:e.jsxs("p",{children:["Track ",e.jsx("code",{children:"changeinOpenInterest"})," rather than absolute OI. A sudden spike in CE OI at a specific strike during market hours indicates fresh short call writing -- a strong resistance signal."]})})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function I(){return e.jsxs(a,{title:"FII/DII Flow Data",subtitle:"Tracking institutional money flows and participant-wise open interest positions",difficulty:"intermediate",readingMinutes:6,children:[e.jsx(s,{term:"FII (Foreign Institutional Investors)",definition:"Foreign entities registered with SEBI to invest in Indian markets. FII flows are the single most important driver of short-term NIFTY direction.",example:"FIIs sold Rs 4,500 crore in cash market yesterday -- typically bearish for next session.",seeAlso:["DII","FPI","Participant-wise OI"]}),e.jsx(n,{title:"Flow Data Sources",headers:["Data","Source","Update Frequency"],rows:[["FII/DII cash market","NSDL / NSE","Daily by 7 PM IST"],["FII/DII F&O positions","NSE participant-wise OI","Daily by 8 PM IST"],["FII index futures","NSE participant-wise OI","Daily EOD"],["FII index options","NSE participant-wise OI","Daily EOD"]]}),e.jsx(t,{language:"python",title:"Fetch FII/DII daily activity",code:`import requests
import pandas as pd

def get_fii_dii_data():
    """Fetch FII/DII daily buy/sell data from NSE."""
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})
    session.get("https://www.nseindia.com")
    url = "https://www.nseindia.com/api/fiidiiTradeReact"
    resp = session.get(url, timeout=30)
    data = resp.json()
    rows = []
    for item in data:
        rows.append({
            "category": item["category"],
            "buy_value": float(item["buyValue"].replace(",", "")),
            "sell_value": float(item["sellValue"].replace(",", "")),
            "net_value": float(item["netValue"].replace(",", "")),
        })
    return pd.DataFrame(rows)

flows = get_fii_dii_data()
print(flows.to_string(index=False))`}),e.jsx(t,{language:"python",title:"Participant-wise OI analysis",code:`def get_participant_oi():
    """Get FII/DII/Pro/Client positions in F&O."""
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})
    session.get("https://www.nseindia.com")
    url = "https://www.nseindia.com/api/participants"
    resp = session.get(url, timeout=30)
    return pd.DataFrame(resp.json()["data"])

# Key signal: FII index futures long/short ratio
# > 1.0 = net long (bullish), < 1.0 = net short (bearish)`}),e.jsx(i,{type:"tip",title:"FII Flow Trading Signal",children:e.jsx("p",{children:"When FIIs sell more than Rs 3,000 crore in cash and simultaneously add short futures (rising OI + short buildup), expect continued weakness. Combine with DII buying to gauge whether domestic support can absorb the selling."})})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"}));function T(){return e.jsxs(a,{title:"Corporate Events and Economic Calendar",subtitle:"Tracking earnings, corporate actions, RBI dates, and macro events",difficulty:"beginner",readingMinutes:5,children:[e.jsx(n,{title:"Key Events to Track",headers:["Event Type","Impact","Data Source"],rows:[["Quarterly earnings","High volatility on result day","BSE corporate filings"],["Dividend / ex-date","Stock price adjusts on ex-date","NSE corporate actions"],["Bonus / stock split","Lot size and OI adjustment","NSE corporate actions"],["RBI MPC meeting","Rate decisions move NIFTY 1-3%","RBI calendar"],["US Fed / FOMC","Global risk sentiment shift","Federal Reserve"],["F&O expiry","Pin risk, high OI unwind","NSE expiry calendar"]]}),e.jsx(t,{language:"python",title:"Fetch corporate actions from NSE",code:`import requests

def get_corporate_actions(symbol=None, from_date=None, to_date=None):
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})
    session.get("https://www.nseindia.com")
    url = "https://www.nseindia.com/api/corporates-corporateActions"
    params = {"index": "equities"}
    if symbol:
        params["symbol"] = symbol
    if from_date:
        params["from_date"] = from_date  # DD-MM-YYYY
    if to_date:
        params["to_date"] = to_date
    resp = session.get(url, params=params, timeout=30)
    return resp.json()

# Get upcoming actions for RELIANCE
actions = get_corporate_actions(symbol="RELIANCE")
for a in actions:
    print(f"{a['subject']} -- Ex-date: {a['exDate']}")`}),e.jsx(t,{language:"python",title:"RBI and economic calendar",code:`# Key RBI dates to track
RBI_EVENTS_2026 = [
    {"date": "2026-04-08", "event": "MPC Decision", "impact": "high"},
    {"date": "2026-06-03", "event": "MPC Decision", "impact": "high"},
    {"date": "2026-08-05", "event": "MPC Decision", "impact": "high"},
    {"date": "2026-10-07", "event": "MPC Decision", "impact": "high"},
    {"date": "2026-12-02", "event": "MPC Decision", "impact": "high"},
]

def events_this_week(events, today):
    from datetime import timedelta
    week_end = today + timedelta(days=7)
    return [e for e in events
            if today.isoformat() <= e["date"] <= week_end.isoformat()]`}),e.jsx(i,{type:"warning",title:"Earnings Volatility",children:e.jsx("p",{children:"Option premiums spike before earnings announcements due to implied volatility expansion. Avoid directional bets on earnings day unless you have an edge -- consider straddles or strangles if you expect a large move but are unsure of direction."})}),e.jsx(i,{type:"tip",title:"Automated Alerts",children:e.jsx("p",{children:"Build a daily cron job that checks for corporate actions and RBI events in the next 5 trading days. Send alerts via Telegram so you never miss an event that could invalidate your open positions."})})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));export{N as a,C as b,O as c,A as d,D as e,F as f,P as g,R as h,M as i,B as j,L as k,z as l,j as m,q as n,K as o,Y as p,w as s};
