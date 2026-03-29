import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function HeikinAshiRenko() {
  return (
    <SectionLayout
      title="Heikin-Ashi & Renko Charts"
      description="Noise-reducing chart types for cleaner trend signals on Indian equities."
    >
      <DefinitionBlock term="Heikin-Ashi Candles">
        Modified candlesticks that smooth price action. HA_Close = (O+H+L+C)/4,
        HA_Open = (prev_HA_Open + prev_HA_Close)/2. Green candles without lower wicks
        indicate strong uptrend; red candles without upper wicks indicate strong downtrend.
      </DefinitionBlock>

      <CodeBlock language="python" title="Heikin-Ashi Transformation">
{`import pandas as pd
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def heikin_ashi(df):
    ha = pd.DataFrame(index=df.index)
    ha['Close'] = (df['Open'] + df['High'] + df['Low'] + df['Close']) / 4
    ha['Open'] = 0.0
    ha['Open'].iloc[0] = (df['Open'].iloc[0] + df['Close'].iloc[0]) / 2
    for i in range(1, len(df)):
        ha['Open'].iloc[i] = (ha['Open'].iloc[i-1] + ha['Close'].iloc[i-1]) / 2
    ha['High'] = pd.concat([df['High'], ha['Open'], ha['Close']], axis=1).max(axis=1)
    ha['Low'] = pd.concat([df['Low'], ha['Open'], ha['Close']], axis=1).min(axis=1)
    return ha

ha = heikin_ashi(nifty)

# Trend detection from HA candles
ha['bullish'] = ha['Close'] > ha['Open']
ha['strong_bull'] = ha['bullish'] & (ha['Low'] == ha['Open'])  # No lower wick
ha['strong_bear'] = ~ha['bullish'] & (ha['High'] == ha['Open'])  # No upper wick

print(f"Strong bullish days: {ha['strong_bull'].sum()}")
print(f"Strong bearish days: {ha['strong_bear'].sum()}")`}
      </CodeBlock>

      <DefinitionBlock term="Renko Charts">
        Time-independent charts using fixed-size bricks. A new brick forms only when
        price moves by the brick size (e.g., 100 points on Nifty). This eliminates
        time-based noise and highlights pure price movement.
      </DefinitionBlock>

      <CodeBlock language="python" title="Renko Chart Construction">
{`def build_renko(closes, brick_size):
    """Build Renko bricks from close prices."""
    bricks = []
    last_price = closes.iloc[0]
    direction = 0  # 0=undecided, 1=up, -1=down

    for price in closes:
        diff = price - last_price
        num_bricks = int(abs(diff) / brick_size)

        if num_bricks >= 1:
            new_dir = 1 if diff > 0 else -1
            for _ in range(num_bricks):
                if new_dir == 1:
                    brick_open = last_price
                    last_price += brick_size
                else:
                    brick_open = last_price
                    last_price -= brick_size
                bricks.append({
                    'open': brick_open,
                    'close': last_price,
                    'direction': new_dir
                })
            direction = new_dir

    return pd.DataFrame(bricks)

renko = build_renko(nifty['Close'], brick_size=100)
print(f"Total bricks: {len(renko)}")
print(f"Up bricks: {(renko['direction'] == 1).sum()}")
print(f"Down bricks: {(renko['direction'] == -1).sum()}")

# Count consecutive bricks for trend strength
renko['streak'] = renko['direction'].groupby(
    (renko['direction'] != renko['direction'].shift()).cumsum()
).cumcount() + 1
print(f"Max consecutive up: {renko[renko['direction']==1]['streak'].max()}")
print(f"Max consecutive down: {renko[renko['direction']==-1]['streak'].max()}")`}
      </CodeBlock>

      <NoteBlock title="Practical Application">
        Use Heikin-Ashi on Bank Nifty 15-min charts to hold intraday trends longer --
        stay in the trade until the candle color changes. For Renko, use ATR-based
        brick sizes (e.g., 1x daily ATR for Nifty) to adapt to current volatility.
        Renko works well with Supertrend for swing trading signals.
      </NoteBlock>
    </SectionLayout>
  )
}
