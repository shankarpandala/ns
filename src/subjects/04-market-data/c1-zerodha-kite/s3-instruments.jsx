import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function Instruments() {
  return (
    <SectionLayout
      title="Instruments and Symbol Mapping"
      subtitle="Working with the Kite instrument list, exchange segments, and token mapping"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">Fetching the Instrument List</h3>
      <CodeBlock
        language="python"
        title="Download and cache the instrument dump"
        code={`import pandas as pd

def get_instruments(kite, cache_path="instruments.csv"):
    """Fetch instruments (updated daily). Cache locally."""
    from pathlib import Path
    from datetime import date

    cache = Path(cache_path)
    if cache.exists() and cache.stat().st_mtime > \
       pd.Timestamp(date.today()).timestamp():
        return pd.read_csv(cache)

    instruments = pd.DataFrame(kite.instruments())
    instruments.to_csv(cache, index=False)
    return instruments

df = get_instruments(kite)
print(f"Total instruments: {len(df)}")
print(df.head())`}
      />

      <ComparisonTable
        title="Key Exchange Segments"
        headers={['Segment', 'Exchange', 'Instruments']}
        rows={[
          ['NSE', 'NSE equity', 'Stocks (RELIANCE, TCS, etc.)'],
          ['NFO', 'NSE F&O', 'NIFTY/BANKNIFTY futures & options'],
          ['BSE', 'BSE equity', 'BSE-listed stocks'],
          ['BFO', 'BSE F&O', 'SENSEX derivatives'],
          ['CDS', 'Currency', 'USDINR futures & options'],
          ['MCX', 'Commodity', 'GOLD, CRUDE, SILVER futures'],
        ]}
      />

      <CodeBlock
        language="python"
        title="Symbol lookup helper"
        code={`def find_instrument(df, symbol, exchange="NSE", segment=None):
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
nifty_fut = find_instrument(df, "NIFTY25MARFUT", "NFO")`}
      />

      <NoteBlock type="tip" title="Options Symbol Format">
        <p>NFO options follow the pattern: <code>NIFTY25MAR22500CE</code> (underlying + expiry +
        strike + type). Parse these with regex:
        <code>{` /^(\\w+)(\\d{2}[A-Z]{3})(\\d+)(CE|PE)$/`}</code></p>
      </NoteBlock>
    </SectionLayout>
  )
}
