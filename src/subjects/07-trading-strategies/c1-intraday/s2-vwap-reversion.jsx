import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function VwapReversion() {
  return (
    <SectionLayout
      title="VWAP Reversion Strategy"
      description="Mean reversion trades anchored to VWAP with statistical bands."
    >
      <DefinitionBlock term="VWAP (Volume Weighted Average Price)">
        The average price weighted by volume, calculated from market open.
        VWAP acts as the fair price for the day. Institutional algorithms
        benchmark execution against VWAP, making it a natural mean reversion
        anchor.
      </DefinitionBlock>

      <CodeBlock language="python" title="VWAP Reversion Strategy">
{`import pandas as pd
import numpy as np

def compute_vwap_bands(candles, std_mult=2.0):
    """Compute VWAP and standard deviation bands."""
    candles = candles.copy()
    candles['typical'] = (candles['high'] + candles['low'] + candles['close']) / 3
    candles['tp_vol'] = candles['typical'] * candles['volume']
    candles['cum_vol'] = candles['volume'].cumsum()
    candles['cum_tp_vol'] = candles['tp_vol'].cumsum()
    candles['vwap'] = candles['cum_tp_vol'] / candles['cum_vol']

    # VWAP standard deviation bands
    candles['sq_diff'] = (candles['typical'] - candles['vwap'])**2 * candles['volume']
    candles['cum_sq'] = candles['sq_diff'].cumsum()
    candles['vwap_std'] = np.sqrt(candles['cum_sq'] / candles['cum_vol'])
    candles['upper'] = candles['vwap'] + std_mult * candles['vwap_std']
    candles['lower'] = candles['vwap'] - std_mult * candles['vwap_std']
    return candles

def vwap_reversion_signals(candles):
    """Generate mean reversion signals off VWAP bands."""
    c = compute_vwap_bands(candles, std_mult=2.0)
    signals = []

    for i in range(1, len(c)):
        # Short when price touches upper band and reverses
        if c['high'].iloc[i] > c['upper'].iloc[i] and \
           c['close'].iloc[i] < c['upper'].iloc[i]:
            signals.append({'bar': i, 'signal': 'short',
                           'entry': c['close'].iloc[i],
                           'target': c['vwap'].iloc[i]})

        # Long when price touches lower band and reverses
        elif c['low'].iloc[i] < c['lower'].iloc[i] and \
             c['close'].iloc[i] > c['lower'].iloc[i]:
            signals.append({'bar': i, 'signal': 'long',
                           'entry': c['close'].iloc[i],
                           'target': c['vwap'].iloc[i]})

    return pd.DataFrame(signals)

print("VWAP reversion works best on range-bound days")
print("Avoid on trending days when price stays above/below VWAP")`}
      </CodeBlock>

      <NoteBlock title="VWAP Reversion on BankNifty">
        BankNifty tends to touch VWAP 3-5 times during a session. The best
        reversion trades occur at the 2-sigma band during 11:00-14:00 when
        volume is lowest. Target the VWAP itself and trail stop to breakeven
        once 50% of the move is captured.
      </NoteBlock>
    </SectionLayout>
  )
}
