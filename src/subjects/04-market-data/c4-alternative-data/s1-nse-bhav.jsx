import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function NseBhav() {
  return (
    <SectionLayout
      title="NSE Bhav Copy Parsing"
      subtitle="Downloading and parsing NSE daily settlement data and index values"
      difficulty="beginner"
      readingMinutes={6}
    >
      <DefinitionBlock
        term="Bhav Copy"
        definition="The official end-of-day settlement file published by NSE containing OHLCV data, delivery quantities, and settlement prices for all traded instruments."
        example="The equity bhav copy CSV has columns: SYMBOL, SERIES, OPEN, HIGH, LOW, CLOSE, TOTTRDQTY, TOTTRDVAL."
      />

      <CodeBlock
        language="python"
        title="Download NSE bhav copy"
        code={`import requests
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
print(nifty_stocks[["SYMBOL","CLOSE","TOTTRDQTY"]].head())`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Index Data</h3>
      <CodeBlock
        language="python"
        title="Fetch NIFTY index values"
        code={`def download_index_data(index_name="NIFTY 50", days=365):
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
    return pd.DataFrame(data)`}
      />

      <NoteBlock type="tip" title="Free Data Source">
        <p>Bhav copy data is completely free and published daily by NSE after market close
        (around 6:30 PM IST). It is the most reliable source for daily OHLCV and is
        sufficient for swing trading and positional strategies.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
