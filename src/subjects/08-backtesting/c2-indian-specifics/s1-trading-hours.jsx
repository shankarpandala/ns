import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function TradingHours() {
  return (
    <SectionLayout
      title="NSE Trading Hours & Sessions"
      description="Modeling Indian market sessions, pre-open auctions, and holiday calendars in backtests."
    >
      <DefinitionBlock term="Pre-Open Session">
        NSE runs an 8-minute pre-open session (9:00-9:08 AM) using a call auction
        mechanism. Orders are collected and matched at a single equilibrium price
        at 9:08 AM. Trading in the continuous session starts at 9:15 AM.
      </DefinitionBlock>

      <CodeBlock language="python" title="NSE Session Time Filter">
{`from datetime import time, datetime
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
clean_data = session.filter_bars(raw_data)`}
      </CodeBlock>

      <CodeBlock language="python" title="NSE Holiday Calendar 2025-2026">
{`NSE_HOLIDAYS_2025 = [
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
]`}
      </CodeBlock>

      <NoteBlock title="Muhurat Trading">
        NSE holds a special one-hour Muhurat Trading session on Diwali evening.
        This session has separate open/close times announced yearly. Account for
        this in backtests if testing strategies spanning Diwali week.
      </NoteBlock>
    </SectionLayout>
  )
}
