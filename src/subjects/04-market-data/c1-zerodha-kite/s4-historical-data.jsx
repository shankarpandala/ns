import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function HistoricalData() {
  return (
    <SectionLayout
      title="Historical Data with Kite Connect"
      subtitle="Fetching candle data, tick-level history, and understanding data limitations"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <CodeBlock
        language="python"
        title="Fetch historical OHLCV candles"
        code={`from datetime import datetime, timedelta

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
print(nifty_df.tail())`}
      />

      <ComparisonTable
        title="Available Intervals and Limits"
        headers={['Interval', 'Max History', 'Rate Limit']}
        rows={[
          ['minute', '60 days', '3 requests/sec'],
          ['3minute', '100 days', '3 requests/sec'],
          ['5minute', '100 days', '3 requests/sec'],
          ['15minute', '200 days', '3 requests/sec'],
          ['60minute', '400 days', '3 requests/sec'],
          ['day', '2000 days (~5.5 years)', '3 requests/sec'],
        ]}
      />

      <CodeBlock
        language="python"
        title="Batch download with rate limiting"
        code={`import time

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
    return all_data`}
      />

      <NoteBlock type="warning" title="Data Limitations">
        <p>Kite historical API does <strong>not</strong> provide tick-level data -- only OHLCV candles.
        For tick data, you must capture it yourself via WebSocket during market hours and store
        it locally. There is no way to backfill missed ticks.</p>
      </NoteBlock>

      <NoteBlock type="tip" title="Cost-Free Alternative">
        <p>NSE bhav copy data (daily OHLCV) is freely available. For strategies that only need daily
        bars, consider downloading from NSE directly instead of paying for the historical data API addon.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
