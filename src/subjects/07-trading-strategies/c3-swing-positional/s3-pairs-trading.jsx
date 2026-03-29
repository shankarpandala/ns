import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PairsTrading() {
  return (
    <SectionLayout
      title="Statistical Pairs Trading"
      description="Market-neutral strategy exploiting mean reversion of co-integrated Indian stocks."
    >
      <DefinitionBlock term="Pairs Trading">
        Simultaneously long one stock and short a correlated stock when their
        price ratio deviates from the historical mean. Profits from
        convergence back to the mean, regardless of market direction.
      </DefinitionBlock>

      <CodeBlock language="python" title="Cointegration-Based Pairs Trading">
{`import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import coint, adfuller

def find_cointegrated_pairs(prices, significance=0.05):
    """Find cointegrated stock pairs from a price matrix."""
    n = prices.shape[1]
    pairs = []

    for i in range(n):
        for j in range(i+1, n):
            score, pvalue, _ = coint(prices.iloc[:, i], prices.iloc[:, j])
            if pvalue < significance:
                pairs.append({
                    'stock_a': prices.columns[i],
                    'stock_b': prices.columns[j],
                    'p_value': pvalue
                })

    return sorted(pairs, key=lambda x: x['p_value'])

def pairs_strategy(price_a, price_b, window=20, entry_z=2.0, exit_z=0.5):
    """Generate pairs trading signals using z-score of spread."""
    # Hedge ratio via OLS
    hedge_ratio = np.polyfit(price_b, price_a, 1)[0]
    spread = price_a - hedge_ratio * price_b

    spread_mean = spread.rolling(window).mean()
    spread_std = spread.rolling(window).std()
    z_score = (spread - spread_mean) / spread_std

    signals = pd.DataFrame(index=price_a.index)
    signals['z_score'] = z_score
    signals['long_entry'] = z_score < -entry_z   # spread too low
    signals['short_entry'] = z_score > entry_z    # spread too high
    signals['exit'] = abs(z_score) < exit_z       # mean reversion

    return signals, hedge_ratio

# Example: HDFC Bank vs ICICI Bank
print("Classic Indian pairs: HDFCBANK/ICICIBANK, TCS/INFY, SBIN/PNB")
print("Entry at z=2.0, exit at z=0.5, stop at z=3.5")`}
      </CodeBlock>

      <NoteBlock title="Indian Market Pairs Tips">
        Use F&O stocks only (for shorting via futures). HDFCBANK/ICICIBANK
        and TCS/INFY have shown strong cointegration historically. Retest
        cointegration monthly -- regime changes (mergers, regulatory shifts)
        can break the relationship. Average holding period is 5-15 days.
      </NoteBlock>
    </SectionLayout>
  )
}
