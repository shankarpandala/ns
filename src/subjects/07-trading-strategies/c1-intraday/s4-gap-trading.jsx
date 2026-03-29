import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function GapTrading() {
  return (
    <SectionLayout
      title="Gap Trading at NSE Open"
      description="Strategies for trading gap-up and gap-down openings at 9:15 AM."
    >
      <DefinitionBlock term="Gap">
        When the opening price is significantly different from the previous
        close. On Nifty, gaps above 50 points are significant. Gaps can
        fill (price returns to previous close) or continue (trend day).
      </DefinitionBlock>

      <CodeBlock language="python" title="Gap Classification and Strategy">
{`import pandas as pd
import numpy as np

def classify_gap(prev_close, open_price, atr_14):
    """Classify gap type for strategy selection."""
    gap = open_price - prev_close
    gap_pct = (gap / prev_close) * 100
    gap_atr = abs(gap) / atr_14

    if abs(gap_pct) < 0.1:
        return 'no_gap', gap
    elif gap_atr < 0.5:
        gtype = 'small'
    elif gap_atr < 1.0:
        gtype = 'medium'
    else:
        gtype = 'large'

    direction = 'up' if gap > 0 else 'down'
    return f'{gtype}_gap_{direction}', gap

def gap_fill_strategy(daily_data):
    """Trade gap fills on Nifty -- fade small/medium gaps."""
    daily = daily_data.copy()
    daily['gap'] = daily['open'] - daily['close'].shift(1)
    daily['gap_pct'] = daily['gap'] / daily['close'].shift(1) * 100
    daily['atr'] = daily['high'].sub(daily['low']).rolling(14).mean()

    signals = []
    for i in range(15, len(daily)):
        row = daily.iloc[i]
        gap_atr = abs(row['gap']) / row['atr']

        # Fade small/medium gaps (0.3-1.0 ATR)
        if 0.3 < gap_atr < 1.0:
            if row['gap'] > 0:  # Gap up -> short for fill
                signals.append({
                    'date': row.name, 'side': 'short',
                    'entry': row['open'],
                    'target': daily.iloc[i-1]['close'],
                    'sl': row['open'] + abs(row['gap'])
                })
            else:  # Gap down -> long for fill
                signals.append({
                    'date': row.name, 'side': 'long',
                    'entry': row['open'],
                    'target': daily.iloc[i-1]['close'],
                    'sl': row['open'] - abs(row['gap'])
                })

    return pd.DataFrame(signals)

print("Gap fill rate on Nifty: ~65% for small gaps, ~40% for large gaps")`}
      </CodeBlock>

      <NoteBlock title="9:15 AM Gap Trading Tips">
        Do not trade the first candle blind. Wait for 9:15-9:20 to see if
        the gap holds. If a gap-up opens and the first 5-min candle closes
        red, the gap fill probability increases to 70%+. Large gaps (over
        1% on Nifty) rarely fill on the same day -- trade continuation instead.
      </NoteBlock>
    </SectionLayout>
  )
}
