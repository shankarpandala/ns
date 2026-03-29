import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function MultiTimeframe() {
  return (
    <SectionLayout
      title="Multi-Timeframe Analysis"
      description="Aligning weekly, daily, and hourly charts for high-conviction swing trades."
    >
      <DefinitionBlock term="Multi-Timeframe Analysis (MTA)">
        Using higher timeframes to determine trend direction and lower
        timeframes to find entries. The classic approach: weekly for trend,
        daily for setup, hourly for entry timing.
      </DefinitionBlock>

      <CodeBlock language="python" title="Multi-Timeframe Trend Alignment">
{`import pandas as pd
import numpy as np

def multi_tf_signal(weekly, daily, hourly):
    """Generate signals when all three timeframes align."""
    # Weekly trend: 20-week EMA slope
    weekly['ema20'] = weekly['close'].ewm(span=20).mean()
    weekly['weekly_trend'] = np.where(
        weekly['ema20'] > weekly['ema20'].shift(1), 'up', 'down')

    # Daily setup: price pulls back to 20 EMA in uptrend
    daily['ema20'] = daily['close'].ewm(span=20).mean()
    daily['ema50'] = daily['close'].ewm(span=50).mean()
    daily['pullback_long'] = (
        (daily['low'] <= daily['ema20'] * 1.005) &
        (daily['ema20'] > daily['ema50'])
    )
    daily['pullback_short'] = (
        (daily['high'] >= daily['ema20'] * 0.995) &
        (daily['ema20'] < daily['ema50'])
    )

    # Hourly entry: bullish engulfing at daily support
    hourly['body'] = hourly['close'] - hourly['open']
    hourly['prev_body'] = hourly['body'].shift(1)
    hourly['bullish_engulf'] = (
        (hourly['body'] > 0) &
        (hourly['prev_body'] < 0) &
        (hourly['body'] > abs(hourly['prev_body']))
    )

    return weekly, daily, hourly

print("Workflow:")
print("1. Weekly uptrend (EMA20 rising)")
print("2. Daily pullback to EMA20")
print("3. Hourly bullish pattern at support")
print("4. Enter with SL below daily swing low")`}
      </CodeBlock>

      <CodeBlock language="python" title="Scoring Timeframe Alignment">
{`def alignment_score(weekly_trend, daily_trend, hourly_trend):
    """Score from -3 to +3 based on alignment."""
    score = 0
    for tf in [weekly_trend, daily_trend, hourly_trend]:
        if tf == 'up':
            score += 1
        elif tf == 'down':
            score -= 1
    return score

# Only take trades when score is +3 (all bullish) or -3 (all bearish)
# Score of +/-2 can work with tighter stops
# Never trade +/-1 or 0 -- conflicting signals`}
      </CodeBlock>

      <NoteBlock title="Indian Market Timeframes">
        For Nifty swing trades (3-10 days), use weekly for direction, daily
        for setup, and 75-minute candles for entry. The 75-minute timeframe
        divides the NSE session (9:15-15:30) into exactly 5 candles, giving
        clean intraday structure.
      </NoteBlock>
    </SectionLayout>
  )
}
