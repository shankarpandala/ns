import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function FiiDii() {
  return (
    <SectionLayout
      title="FII/DII Flow Data"
      subtitle="Tracking institutional money flows and participant-wise open interest positions"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <DefinitionBlock
        term="FII (Foreign Institutional Investors)"
        definition="Foreign entities registered with SEBI to invest in Indian markets. FII flows are the single most important driver of short-term NIFTY direction."
        example="FIIs sold Rs 4,500 crore in cash market yesterday -- typically bearish for next session."
        seeAlso={['DII', 'FPI', 'Participant-wise OI']}
      />

      <ComparisonTable
        title="Flow Data Sources"
        headers={['Data', 'Source', 'Update Frequency']}
        rows={[
          ['FII/DII cash market', 'NSDL / NSE', 'Daily by 7 PM IST'],
          ['FII/DII F&O positions', 'NSE participant-wise OI', 'Daily by 8 PM IST'],
          ['FII index futures', 'NSE participant-wise OI', 'Daily EOD'],
          ['FII index options', 'NSE participant-wise OI', 'Daily EOD'],
        ]}
      />

      <CodeBlock
        language="python"
        title="Fetch FII/DII daily activity"
        code={`import requests
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
print(flows.to_string(index=False))`}
      />

      <CodeBlock
        language="python"
        title="Participant-wise OI analysis"
        code={`def get_participant_oi():
    """Get FII/DII/Pro/Client positions in F&O."""
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})
    session.get("https://www.nseindia.com")
    url = "https://www.nseindia.com/api/participants"
    resp = session.get(url, timeout=30)
    return pd.DataFrame(resp.json()["data"])

# Key signal: FII index futures long/short ratio
# > 1.0 = net long (bullish), < 1.0 = net short (bearish)`}
      />

      <NoteBlock type="tip" title="FII Flow Trading Signal">
        <p>When FIIs sell more than Rs 3,000 crore in cash and simultaneously add short futures
        (rising OI + short buildup), expect continued weakness. Combine with DII buying to
        gauge whether domestic support can absorb the selling.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
