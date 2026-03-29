import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function VolumeProfile() {
  return (
    <SectionLayout
      title="Volume Profile: POC, VAH, VAL"
      description="Building volume profiles to identify fair value and high-activity price zones."
    >
      <DefinitionBlock term="Point of Control (POC)">
        The price level with the highest traded volume. Acts as a magnet --
        price tends to revert to POC during range-bound sessions.
      </DefinitionBlock>

      <DefinitionBlock term="Value Area (VA)">
        The price range containing 70% of total volume. Value Area High (VAH)
        and Value Area Low (VAL) define the boundaries. Trading outside the
        VA suggests a trending move or rejection back inside.
      </DefinitionBlock>

      <CodeBlock language="python" title="Computing Volume Profile">
{`import numpy as np
import pandas as pd

def volume_profile(trades, tick_size=0.5):
    """Build volume profile and compute POC, VAH, VAL."""
    # Round prices to tick size
    trades['level'] = (trades['price'] / tick_size).round() * tick_size
    profile = trades.groupby('level')['qty'].sum().sort_index()

    # POC = price with max volume
    poc = profile.idxmax()

    # Value Area: 70% of total volume centered on POC
    total_vol = profile.sum()
    target = total_vol * 0.70

    # Expand outward from POC
    poc_idx = profile.index.get_loc(poc)
    va_vol = profile.iloc[poc_idx]
    lo, hi = poc_idx, poc_idx

    while va_vol < target:
        up = profile.iloc[hi + 1] if hi + 1 < len(profile) else 0
        down = profile.iloc[lo - 1] if lo - 1 >= 0 else 0
        if up >= down and hi + 1 < len(profile):
            hi += 1
            va_vol += up
        elif lo - 1 >= 0:
            lo -= 1
            va_vol += down
        else:
            break

    val = profile.index[lo]
    vah = profile.index[hi]
    return {'poc': poc, 'vah': vah, 'val': val, 'profile': profile}

# Simulated Nifty futures session
np.random.seed(42)
trades = pd.DataFrame({
    'price': np.random.normal(22450, 5, 5000).round(1),
    'qty': np.random.randint(1, 50, 5000)
})
vp = volume_profile(trades)
print(f"POC: {vp['poc']} | VAH: {vp['vah']} | VAL: {vp['val']}")`}
      </CodeBlock>

      <NoteBlock title="Developing Value Area">
        Track the developing value area intraday. If the developing POC
        shifts upward during the session, the market is accepting higher
        prices. A POC that stays flat signals a balanced/rotational day --
        trade mean reversion between VAH and VAL.
      </NoteBlock>
    </SectionLayout>
  )
}
