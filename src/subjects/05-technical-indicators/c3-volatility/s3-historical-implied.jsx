import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function HistoricalImplied() {
  return (
    <SectionLayout
      title="Historical vs Implied Volatility"
      description="Understanding HV, IV, volatility cones, and term structure for Nifty options."
    >
      <DefinitionBlock term="Historical Volatility (HV)">
        The annualized standard deviation of log returns over a lookback period.
        HV(20) uses 20 trading days. It tells you what volatility actually was.
      </DefinitionBlock>

      <DefinitionBlock term="Implied Volatility (IV)">
        The market's expectation of future volatility, extracted from option prices
        using Black-Scholes or similar models. India VIX is the benchmark IV for
        Nifty options.
      </DefinitionBlock>

      <CodeBlock language="python" title="Historical Volatility Calculation">
{`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2023-01-01", end="2025-12-31")

# Log returns
nifty['log_ret'] = np.log(nifty['Close'] / nifty['Close'].shift(1))

# HV for different windows (annualized: x sqrt(252))
for window in [10, 20, 30, 60]:
    nifty[f'HV_{window}'] = nifty['log_ret'].rolling(window).std() * np.sqrt(252) * 100

print(nifty[['Close', 'HV_10', 'HV_20', 'HV_30', 'HV_60']].tail())`}
      </CodeBlock>

      <CodeBlock language="python" title="Volatility Cone">
{`# Volatility cone: percentile ranges for each lookback
lookbacks = [10, 20, 30, 60, 90]
cone = {}

for lb in lookbacks:
    hv = nifty['log_ret'].rolling(lb).std() * np.sqrt(252) * 100
    hv = hv.dropna()
    cone[lb] = {
        'min': hv.min(),
        'p25': hv.quantile(0.25),
        'median': hv.median(),
        'p75': hv.quantile(0.75),
        'max': hv.max(),
        'current': hv.iloc[-1]
    }

cone_df = pd.DataFrame(cone).T
cone_df.index.name = 'Lookback'
print(cone_df.round(2))
# If current HV is below p25, volatility is cheap -> buy options
# If current HV is above p75, volatility is rich -> sell options`}
      </CodeBlock>

      <CodeBlock language="python" title="IV vs HV Comparison (India VIX)">
{`# India VIX as implied volatility proxy
vix = yf.download("^INDIAVIX", start="2024-01-01", end="2025-12-31")
merged = nifty[['Close', 'HV_20']].join(vix['Close'].rename('India_VIX'))
merged['IV_HV_Spread'] = merged['India_VIX'] - merged['HV_20']

# Positive spread = IV > HV (options are expensive)
# Negative spread = IV < HV (options are cheap)
rich = (merged['IV_HV_Spread'] > 5).sum()
cheap = (merged['IV_HV_Spread'] < -3).sum()
print(f"IV rich days (spread > 5): {rich}")
print(f"IV cheap days (spread < -3): {cheap}")`}
      </CodeBlock>

      <NoteBlock title="Volatility Trading Edge">
        When India VIX is above 20 and HV(20) is below 15, implied volatility is
        overpriced -- sell strangles or iron condors. When VIX drops below 12 while
        HV is rising, options are cheap -- buy straddles before expected moves.
      </NoteBlock>
    </SectionLayout>
  )
}
