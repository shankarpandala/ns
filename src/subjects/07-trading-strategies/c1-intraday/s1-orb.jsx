import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OpeningRangeBreakout() {
  return (
    <SectionLayout
      title="Opening Range Breakout (ORB)"
      description="Trading the first N-minute range breakout on Nifty and BankNifty."
    >
      <DefinitionBlock term="Opening Range Breakout">
        Define the high and low of the first 15 or 30 minutes after NSE open
        (9:15 AM). A breakout above the range high triggers a long; below
        the range low triggers a short. Works best on trending days.
      </DefinitionBlock>

      <CodeBlock language="python" title="ORB Strategy for Nifty Futures">
{`import pandas as pd
import numpy as np

def orb_strategy(candles_5m, orb_minutes=15):
    """Opening Range Breakout on 5-min Nifty candles."""
    candles = candles_5m.copy()
    candles['date'] = candles['time'].dt.date
    candles['session_min'] = (
        (candles['time'] - candles['time'].dt.normalize())
        .dt.total_seconds() / 60
    )

    results = []
    for date, day in candles.groupby('date'):
        # Opening range: 9:15 to 9:15 + orb_minutes
        orb_mask = day['session_min'] <= (555 + orb_minutes)  # 555 = 9:15
        opening_range = day[orb_mask]
        if opening_range.empty:
            continue

        orb_high = opening_range['high'].max()
        orb_low = opening_range['low'].min()
        orb_range = orb_high - orb_low

        # Trade after ORB period
        trade_bars = day[~orb_mask]
        entry = None
        for _, bar in trade_bars.iterrows():
            if entry is None:
                if bar['high'] > orb_high:
                    entry = {'dir': 'long', 'price': orb_high + 0.5}
                elif bar['low'] < orb_low:
                    entry = {'dir': 'short', 'price': orb_low - 0.5}
            if entry:
                # Exit at 3:15 PM or 1.5x ORB range SL
                sl = orb_range * 1.5
                target = orb_range * 2.0
                results.append({
                    'date': date, 'direction': entry['dir'],
                    'entry': entry['price'], 'orb_range': orb_range,
                    'sl': sl, 'target': target
                })
                break

    return pd.DataFrame(results)

# Backtest would use historical 5-min Nifty futures data
print("ORB typically wins 50-55% with 2:1.5 RR on trending days")`}
      </CodeBlock>

      <NoteBlock title="ORB Filters for Indian Markets">
        Avoid ORB on expiry days (Thursday) when Nifty moves are erratic.
        Best performance is on Monday/Tuesday with a gap open. Filter out
        days where ORB range is less than 30 points (too narrow, likely
        choppy) or more than 100 points (late entry risk).
      </NoteBlock>
    </SectionLayout>
  )
}
