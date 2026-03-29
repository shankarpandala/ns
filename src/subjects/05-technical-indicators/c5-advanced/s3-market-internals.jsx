import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function MarketInternals() {
  return (
    <SectionLayout
      title="Market Internals & Breadth"
      description="Advance/Decline line, TICK, TRIN, and breadth indicators for NSE market health."
    >
      <DefinitionBlock term="Advance/Decline (A/D) Line">
        Cumulative sum of (advancing stocks - declining stocks) each day across the
        exchange. A rising A/D line confirms the index rally has broad participation;
        declining A/D during a rally warns of narrowing breadth.
      </DefinitionBlock>

      <DefinitionBlock term="TRIN (Arms Index)">
        TRIN = (Advancing Issues / Declining Issues) / (Advancing Volume / Declining
        Volume). TRIN below 1.0 is bullish (more volume in advancing stocks); above
        1.0 is bearish. Extreme readings (above 2.0 or below 0.5) signal exhaustion.
      </DefinitionBlock>

      <CodeBlock language="python" title="NSE Market Breadth Analysis">
{`import pandas as pd
import numpy as np

# Simulated NSE daily breadth data
dates = pd.date_range('2025-01-01', periods=60, freq='B')
np.random.seed(42)

breadth = pd.DataFrame({
    'Date': dates,
    'Advances': np.random.randint(600, 1400, 60),
    'Declines': np.random.randint(400, 1200, 60),
    'Adv_Volume': np.random.randint(100, 500, 60) * 1e6,
    'Dec_Volume': np.random.randint(80, 400, 60) * 1e6,
}).set_index('Date')

breadth['Unchanged'] = 1800 - breadth['Advances'] - breadth['Declines']

# A/D Line (cumulative)
breadth['AD_Diff'] = breadth['Advances'] - breadth['Declines']
breadth['AD_Line'] = breadth['AD_Diff'].cumsum()

# TRIN / Arms Index
breadth['TRIN'] = (
    (breadth['Advances'] / breadth['Declines']) /
    (breadth['Adv_Volume'] / breadth['Dec_Volume'])
)

# Breadth thrust: >70% stocks advancing
breadth['total'] = breadth['Advances'] + breadth['Declines']
breadth['adv_pct'] = breadth['Advances'] / breadth['total'] * 100
breadth['thrust'] = breadth['adv_pct'] > 70

print(breadth[['AD_Diff', 'AD_Line', 'TRIN', 'adv_pct']].tail(10))`}
      </CodeBlock>

      <CodeBlock language="python" title="McClellan Oscillator for NSE">
{`# McClellan Oscillator = 19-day EMA(AD Diff) - 39-day EMA(AD Diff)
breadth['EMA_19'] = breadth['AD_Diff'].ewm(span=19, adjust=False).mean()
breadth['EMA_39'] = breadth['AD_Diff'].ewm(span=39, adjust=False).mean()
breadth['McClellan'] = breadth['EMA_19'] - breadth['EMA_39']

# McClellan Summation Index (cumulative)
breadth['McClellan_Sum'] = breadth['McClellan'].cumsum()

# Overbought > +100, Oversold < -100
print("McClellan Oscillator (last 5 days):")
print(breadth[['McClellan', 'McClellan_Sum']].tail())`}
      </CodeBlock>

      <WarningBlock>
        Market breadth data is not available via standard APIs like yfinance. For live
        NSE breadth, scrape from NSE India website or use paid data feeds like
        Global Datafeeds or TrueData for real-time advance/decline ticks.
      </WarningBlock>

      <NoteBlock title="Breadth Divergence Signal">
        If Nifty 50 makes a new high but the NSE A/D line does not confirm, the rally
        is driven by a handful of heavyweight stocks. This breadth divergence preceded
        corrections in Oct 2021 and Sep 2024 -- always check breadth before
        aggressively going long at index highs.
      </NoteBlock>
    </SectionLayout>
  )
}
