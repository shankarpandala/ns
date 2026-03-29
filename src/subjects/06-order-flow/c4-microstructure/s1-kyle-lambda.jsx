import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function KyleLambda() {
  return (
    <SectionLayout
      title="Kyle's Lambda: Price Impact Model"
      description="Measuring permanent price impact of order flow using Kyle's lambda."
    >
      <DefinitionBlock term="Kyle's Lambda">
        From Kyle (1985), lambda measures the permanent price impact per unit
        of net order flow. Higher lambda means less liquidity -- each trade
        moves the price more. Estimated as the slope of price change on
        signed volume.
      </DefinitionBlock>

      <CodeBlock language="python" title="Estimating Kyle's Lambda">
{`import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

def estimate_kyle_lambda(trades, interval='5min'):
    """Estimate Kyle's lambda from trade data."""
    trades = trades.set_index('time').sort_index()

    # Aggregate into intervals
    bars = trades.resample(interval).agg({
        'price': 'last',
        'signed_vol': 'sum'  # Net order flow
    }).dropna()

    # Price change
    bars['delta_p'] = bars['price'].diff()
    bars = bars.dropna()

    # Regression: delta_p = lambda * signed_vol + epsilon
    X = bars['signed_vol'].values.reshape(-1, 1)
    y = bars['delta_p'].values

    model = LinearRegression().fit(X, y)
    kyle_lambda = model.coef_[0]
    r_squared = model.score(X, y)

    return kyle_lambda, r_squared

# Simulated Nifty futures data
np.random.seed(42)
n = 2000
signed_vol = np.random.normal(0, 100, n)
price = 22450 + np.cumsum(signed_vol * 0.001 + np.random.normal(0, 0.2, n))

trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=n, freq='1s'),
    'price': price,
    'signed_vol': signed_vol
})

lam, r2 = estimate_kyle_lambda(trades)
print(f"Kyle's lambda: {lam:.6f}")
print(f"R-squared: {r2:.4f}")`}
      </CodeBlock>

      <NoteBlock title="Interpreting Lambda">
        On Nifty futures, lambda typically ranges from 0.0001 to 0.001.
        Lambda spikes during low-liquidity periods (pre-market, lunch hour)
        and drops during peak activity. Higher lambda days correlate with
        wider spreads and more volatile price action.
      </NoteBlock>

      <CodeBlock language="python" title="Intraday Lambda Dynamics">
{`def rolling_lambda(trades, window=100):
    """Compute rolling Kyle's lambda to track liquidity changes."""
    lambdas = []
    for i in range(window, len(trades)):
        chunk = trades.iloc[i-window:i]
        X = chunk['signed_vol'].values.reshape(-1, 1)
        y = chunk['price'].diff().dropna().values
        if len(y) > 10:
            model = LinearRegression().fit(X[:len(y)], y)
            lambdas.append(model.coef_[0])
        else:
            lambdas.append(np.nan)
    return lambdas`}
      </CodeBlock>
    </SectionLayout>
  )
}
