import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function CorporateEvents() {
  return (
    <SectionLayout
      title="Corporate Events and Economic Calendar"
      subtitle="Tracking earnings, corporate actions, RBI dates, and macro events"
      difficulty="beginner"
      readingMinutes={5}
    >
      <ComparisonTable
        title="Key Events to Track"
        headers={['Event Type', 'Impact', 'Data Source']}
        rows={[
          ['Quarterly earnings', 'High volatility on result day', 'BSE corporate filings'],
          ['Dividend / ex-date', 'Stock price adjusts on ex-date', 'NSE corporate actions'],
          ['Bonus / stock split', 'Lot size and OI adjustment', 'NSE corporate actions'],
          ['RBI MPC meeting', 'Rate decisions move NIFTY 1-3%', 'RBI calendar'],
          ['US Fed / FOMC', 'Global risk sentiment shift', 'Federal Reserve'],
          ['F&O expiry', 'Pin risk, high OI unwind', 'NSE expiry calendar'],
        ]}
      />

      <CodeBlock
        language="python"
        title="Fetch corporate actions from NSE"
        code={`import requests

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
    print(f"{a['subject']} -- Ex-date: {a['exDate']}")`}
      />

      <CodeBlock
        language="python"
        title="RBI and economic calendar"
        code={`# Key RBI dates to track
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
            if today.isoformat() <= e["date"] <= week_end.isoformat()]`}
      />

      <NoteBlock type="warning" title="Earnings Volatility">
        <p>Option premiums spike before earnings announcements due to implied volatility expansion.
        Avoid directional bets on earnings day unless you have an edge -- consider straddles
        or strangles if you expect a large move but are unsure of direction.</p>
      </NoteBlock>

      <NoteBlock type="tip" title="Automated Alerts">
        <p>Build a daily cron job that checks for corporate actions and RBI events in the next
        5 trading days. Send alerts via Telegram so you never miss an event that could
        invalidate your open positions.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
