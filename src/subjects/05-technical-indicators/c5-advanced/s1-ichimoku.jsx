import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Ichimoku() {
  return (
    <SectionLayout
      title="Ichimoku Cloud"
      description="A complete trading system: Tenkan-sen, Kijun-sen, Senkou spans, and Chikou span on Nifty."
    >
      <DefinitionBlock term="Ichimoku Kinko Hyo">
        A five-line indicator system that defines support/resistance, trend direction,
        and momentum at a glance. Developed by Goichi Hosoda, it uses past, present,
        and future projected price levels.
      </DefinitionBlock>

      <CodeBlock language="python" title="Ichimoku Cloud Calculation">
{`import pandas as pd
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def ichimoku(df):
    # Tenkan-sen (Conversion Line): 9-period midpoint
    tenkan = (df['High'].rolling(9).max() + df['Low'].rolling(9).min()) / 2

    # Kijun-sen (Base Line): 26-period midpoint
    kijun = (df['High'].rolling(26).max() + df['Low'].rolling(26).min()) / 2

    # Senkou Span A (Leading Span A): midpoint of Tenkan/Kijun, shifted 26 ahead
    senkou_a = ((tenkan + kijun) / 2).shift(26)

    # Senkou Span B (Leading Span B): 52-period midpoint, shifted 26 ahead
    senkou_b = ((df['High'].rolling(52).max() +
                 df['Low'].rolling(52).min()) / 2).shift(26)

    # Chikou Span (Lagging Span): Close shifted 26 periods back
    chikou = df['Close'].shift(-26)

    return tenkan, kijun, senkou_a, senkou_b, chikou

nifty['Tenkan'], nifty['Kijun'], nifty['SpanA'], nifty['SpanB'], nifty['Chikou'] = \
    ichimoku(nifty)

print(nifty[['Close', 'Tenkan', 'Kijun', 'SpanA', 'SpanB']].tail())`}
      </CodeBlock>

      <CodeBlock language="python" title="Ichimoku Trading Signals">
{`# Cloud color: bullish when Span A > Span B (green cloud)
nifty['cloud_bull'] = nifty['SpanA'] > nifty['SpanB']

# TK Cross: Tenkan crosses above Kijun (bullish)
nifty['tk_bull'] = (
    (nifty['Tenkan'] > nifty['Kijun']) &
    (nifty['Tenkan'].shift(1) <= nifty['Kijun'].shift(1))
)

# Strong buy: TK cross + price above cloud + Chikou above price
nifty['cloud_top'] = nifty[['SpanA', 'SpanB']].max(axis=1)
nifty['strong_buy'] = (
    nifty['tk_bull'] &
    (nifty['Close'] > nifty['cloud_top']) &
    nifty['cloud_bull']
)

buys = nifty[nifty['strong_buy']]
print(f"Strong Ichimoku buy signals: {len(buys)}")
for date in buys.index[-5:]:
    print(f"  {date.strftime('%Y-%m-%d')}: {nifty.loc[date, 'Close']:.0f}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Cloud as Support/Resistance">
{`# Distance from cloud (positive = above, negative = below)
nifty['cloud_bottom'] = nifty[['SpanA', 'SpanB']].min(axis=1)
nifty['dist_from_cloud'] = nifty['Close'] - nifty['cloud_top']

# Price entering the cloud = indecision zone
nifty['in_cloud'] = (
    (nifty['Close'] <= nifty['cloud_top']) &
    (nifty['Close'] >= nifty['cloud_bottom'])
)

cloud_days = nifty['in_cloud'].sum()
print(f"Days price was inside cloud: {cloud_days}")`}
      </CodeBlock>

      <NoteBlock title="Ichimoku on Nifty">
        On Nifty weekly charts, Ichimoku cloud provides excellent trend context. Price
        above a thick green cloud indicates strong uptrend with deep support. The Kijun
        line (26-period midpoint) on weekly charts often acts as pullback support
        during bull markets -- watch for bounces at this level.
      </NoteBlock>
    </SectionLayout>
  )
}
