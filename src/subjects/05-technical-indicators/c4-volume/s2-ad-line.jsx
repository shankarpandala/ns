import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ADLine() {
  return (
    <SectionLayout
      title="Accumulation/Distribution Line"
      description="Tracking smart money flow using the A/D line and divergence signals on Indian stocks."
    >
      <DefinitionBlock term="Accumulation/Distribution (A/D) Line">
        A cumulative indicator combining price and volume. It uses the Close Location
        Value (CLV) = (Close - Low - (High - Close)) / (High - Low), multiplied by
        volume. When A/D rises, accumulation is occurring; when it falls,
        distribution is happening.
      </DefinitionBlock>

      <CodeBlock language="python" title="A/D Line for NSE Stocks">
{`import pandas as pd
import numpy as np
import yfinance as yf

# Fetch Reliance Industries
ril = yf.download("RELIANCE.NS", start="2024-01-01", end="2025-12-31")

# Close Location Value
clv = ((ril['Close'] - ril['Low']) - (ril['High'] - ril['Close'])) / \
      (ril['High'] - ril['Low'])
clv = clv.fillna(0)  # Handle zero-range days

# A/D Line = cumulative sum of CLV * Volume
ril['AD_Flow'] = clv * ril['Volume']
ril['AD_Line'] = ril['AD_Flow'].cumsum()

# Smooth A/D with EMA for signal
ril['AD_EMA'] = ril['AD_Line'].ewm(span=20, adjust=False).mean()

print(ril[['Close', 'Volume', 'AD_Line']].tail())`}
      </CodeBlock>

      <CodeBlock language="python" title="A/D Line Divergence Detection">
{`def detect_ad_divergence(df, window=20):
    """Detect divergence between price and A/D line."""
    signals = []

    for i in range(window, len(df)):
        price_slice = df['Close'].iloc[i-window:i+1]
        ad_slice = df['AD_Line'].iloc[i-window:i+1]

        # Bullish: price makes lower low, A/D makes higher low
        if (price_slice.iloc[-1] < price_slice.min() * 1.001 and
            ad_slice.iloc[-1] > ad_slice.iloc[0]):
            signals.append(('BULL_DIV', df.index[i]))

        # Bearish: price makes higher high, A/D makes lower high
        if (price_slice.iloc[-1] > price_slice.max() * 0.999 and
            ad_slice.iloc[-1] < ad_slice.iloc[0]):
            signals.append(('BEAR_DIV', df.index[i]))

    return signals

divergences = detect_ad_divergence(ril)
for sig_type, date in divergences[-5:]:
    print(f"{sig_type}: {date.strftime('%Y-%m-%d')}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Multi-Stock A/D Screening">
{`tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"]
results = []

for t in tickers:
    df = yf.download(t, period="3mo", progress=False)
    if len(df) < 20:
        continue
    clv = ((df['Close'] - df['Low']) - (df['High'] - df['Close'])) / (df['High'] - df['Low'])
    ad = (clv.fillna(0) * df['Volume']).cumsum()

    # Compare 20-day trend
    ad_trend = "Accumulation" if ad.iloc[-1] > ad.iloc[-20] else "Distribution"
    price_chg = ((df['Close'].iloc[-1] / df['Close'].iloc[-20]) - 1) * 100
    results.append({'Stock': t.replace('.NS',''), 'Price_Chg': f"{price_chg:.1f}%",
                    'AD_Trend': ad_trend})

print(pd.DataFrame(results).to_string(index=False))`}
      </CodeBlock>

      <NoteBlock title="Divergence Insight">
        When a Nifty 50 stock makes new highs but its A/D line is declining,
        institutional selling is likely underway. This bearish divergence often
        precedes a 5-10% correction -- especially reliable in large-caps with
        high delivery volume on NSE.
      </NoteBlock>
    </SectionLayout>
  )
}
