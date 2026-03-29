import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PinVpin() {
  return (
    <SectionLayout
      title="PIN and VPIN"
      description="Probability of informed trading metrics for detecting smart money activity."
    >
      <DefinitionBlock term="PIN (Probability of Informed Trading)">
        From the Easley-O'Hara model, PIN estimates the fraction of trades
        driven by privately informed traders. Higher PIN indicates greater
        information asymmetry and adverse selection risk.
      </DefinitionBlock>

      <DefinitionBlock term="VPIN (Volume-Synchronized PIN)">
        A real-time variant of PIN that uses volume buckets instead of time
        intervals. VPIN rises before major price moves, making it useful
        for real-time toxicity monitoring.
      </DefinitionBlock>

      <CodeBlock language="python" title="Computing VPIN">
{`import numpy as np
import pandas as pd

def compute_vpin(trades, bucket_size=1000, n_buckets=50):
    """Compute VPIN using volume buckets."""
    trades = trades.sort_values('time').copy()

    # Classify trades using tick rule
    trades['sign'] = np.sign(trades['price'].diff()).fillna(1)
    trades['buy_vol'] = np.where(trades['sign'] > 0, trades['qty'], 0)
    trades['sell_vol'] = np.where(trades['sign'] < 0, trades['qty'], 0)

    # Create volume buckets
    trades['cum_vol'] = trades['qty'].cumsum()
    trades['bucket'] = (trades['cum_vol'] // bucket_size).astype(int)

    buckets = trades.groupby('bucket').agg(
        buy=('buy_vol', 'sum'),
        sell=('sell_vol', 'sum'),
        total=('qty', 'sum')
    )

    # VPIN = avg |buy - sell| / bucket_size over rolling window
    buckets['abs_imbalance'] = abs(buckets['buy'] - buckets['sell'])
    buckets['vpin'] = (
        buckets['abs_imbalance'].rolling(n_buckets).mean() / bucket_size
    )

    return buckets

# Example
np.random.seed(42)
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=5000, freq='200ms'),
    'price': 22450 + np.cumsum(np.random.choice([-0.5, 0, 0.5], 5000)),
    'qty': np.random.randint(5, 80, 5000)
})

vpin = compute_vpin(trades, bucket_size=500, n_buckets=20)
print(f"Current VPIN: {vpin['vpin'].iloc[-1]:.4f}")
print(f"VPIN > 0.5 signals high toxicity")`}
      </CodeBlock>

      <NoteBlock title="VPIN in Indian Markets">
        VPIN spikes on Nifty futures have preceded large moves during RBI
        policy days, budget announcements, and US CPI releases. A VPIN
        reading above 0.6 in Nifty futures warrants reducing position size
        or widening stop-losses.
      </NoteBlock>
    </SectionLayout>
  )
}
