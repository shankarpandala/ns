import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DataHandler() {
  return (
    <SectionLayout
      title="Data Handler & Feed Management"
      description="Loading, parsing, and streaming OHLCV data for Indian market backtests."
    >
      <DefinitionBlock term="OHLCV Data">
        Open, High, Low, Close, and Volume bars representing price action over
        a fixed interval. For NSE equities and F&O, common intervals are 1-min,
        5-min, 15-min, and daily.
      </DefinitionBlock>

      <CodeBlock language="python" title="CSV Data Feed for Backtesting">
{`import pandas as pd
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
feed = CSVDataFeed("data/nifty50_1min_2025.csv", "NIFTY50")`}
      </CodeBlock>

      <CodeBlock language="python" title="TimescaleDB Data Feed">
{`import psycopg2

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
        }`}
      </CodeBlock>

      <NoteBlock title="Data Quality">
        Always check for gaps in intraday data around NSE market open (9:15 AM)
        and close (3:30 PM). Missing bars during volatile periods like budget day
        or RBI policy announcements can skew backtest results significantly.
      </NoteBlock>
    </SectionLayout>
  )
}
