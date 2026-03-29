import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function VWAP() {
  return (
    <SectionLayout
      title="VWAP & Anchored VWAP"
      description="Volume-weighted average price -- the institutional benchmark for intraday trading on NSE."
    >
      <DefinitionBlock term="VWAP (Volume Weighted Average Price)">
        The average price weighted by volume for the trading session. VWAP =
        Cumulative(Typical Price x Volume) / Cumulative(Volume). It resets each day
        and serves as a fair value benchmark.
      </DefinitionBlock>

      <CodeBlock language="python" title="Intraday VWAP Calculation">
{`import pandas as pd
import numpy as np

# Assuming intraday data with datetime index
# df has columns: Open, High, Low, Close, Volume

def calc_vwap(df):
    tp = (df['High'] + df['Low'] + df['Close']) / 3
    cumulative_tp_vol = (tp * df['Volume']).cumsum()
    cumulative_vol = df['Volume'].cumsum()
    vwap = cumulative_tp_vol / cumulative_vol

    # Standard deviation bands (1 and 2 SD)
    vwap_sq = ((tp ** 2) * df['Volume']).cumsum() / cumulative_vol
    std = np.sqrt(vwap_sq - vwap ** 2)

    return pd.DataFrame({
        'VWAP': vwap,
        'Upper_1SD': vwap + std,
        'Lower_1SD': vwap - std,
        'Upper_2SD': vwap + 2 * std,
        'Lower_2SD': vwap - 2 * std,
    })

# Usage on intraday data:
# vwap_df = calc_vwap(intraday_data)
# intraday_data = intraday_data.join(vwap_df)`}
      </CodeBlock>

      <DefinitionBlock term="Anchored VWAP">
        VWAP calculated from a user-defined anchor point (earnings date, swing low,
        event day) instead of session start. It reveals the average cost basis of
        traders who entered since that anchor event.
      </DefinitionBlock>

      <CodeBlock language="python" title="Anchored VWAP from Event Date">
{`import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def anchored_vwap(df, anchor_date):
    """Calculate VWAP anchored from a specific date."""
    mask = df.index >= anchor_date
    subset = df[mask].copy()
    tp = (subset['High'] + subset['Low'] + subset['Close']) / 3
    cum_tp_vol = (tp * subset['Volume']).cumsum()
    cum_vol = subset['Volume'].cumsum()
    subset['AVWAP'] = cum_tp_vol / cum_vol
    return subset['AVWAP']

# Anchor from budget day or major event
nifty['AVWAP_Budget'] = anchored_vwap(nifty, '2025-02-01')

# Anchor from a swing low
nifty['AVWAP_SwingLow'] = anchored_vwap(nifty, '2024-10-23')

print(nifty[['Close', 'AVWAP_Budget']].dropna().tail())`}
      </CodeBlock>

      <NoteBlock title="Institutional Usage">
        FIIs and DIIs on NSE benchmark their execution against VWAP. Price above VWAP
        means buyers are in control; below means sellers dominate. Institutions often
        accumulate when price dips to VWAP and use the lower 1SD band as a limit
        order zone for large-cap Nifty stocks.
      </NoteBlock>
    </SectionLayout>
  )
}
