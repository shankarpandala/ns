import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function DataQuality() {
  return (
    <SectionLayout
      title="Data Quality and Normalization"
      subtitle="Gap detection, outlier filtering, and quality checks for market data"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">Tick Data Validation</h3>
      <CodeBlock
        language="python"
        title="Real-time tick quality filter"
        code={`class TickValidator:
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
        return True`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Gap Detection</h3>
      <CodeBlock
        language="python"
        title="Detect missing candles in historical data"
        code={`import pandas as pd

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
    print(f"Gap: {g['from']} to {g['to']} ({g['missing_candles']} candles)")`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Cross-Exchange Normalization</h3>
      <CodeBlock
        language="python"
        title="Normalize symbols across exchanges"
        code={`SYMBOL_MAP = {
    ("NIFTY 50", "NSE"): "NIFTY",
    ("NIFTY25MARFUT", "NFO"): "NIFTY-FUT",
    ("NIFTYINR", "DELTA"): "NIFTY-PERP",
}

def normalize_symbol(raw_symbol, exchange):
    return SYMBOL_MAP.get((raw_symbol, exchange), raw_symbol)`}
      />

      <WarningBlock title="Bad Data Causes Bad Trades">
        A single erroneous tick (e.g., NIFTY at 0 or 99999) can trigger false signals.
        Always filter data before it reaches your strategy engine.
      </WarningBlock>

      <NoteBlock type="tip" title="Daily Reconciliation">
        <p>After market close, reconcile your captured tick data against the official bhav copy.
        Compare your computed daily OHLCV with the exchange's official values to catch
        any ingestion issues.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
