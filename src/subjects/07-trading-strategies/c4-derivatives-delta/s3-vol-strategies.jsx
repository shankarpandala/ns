import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function VolStrategies() {
  return (
    <SectionLayout
      title="Options Volatility Strategies on Delta"
      description="Trading crypto implied volatility using Delta Exchange options."
    >
      <DefinitionBlock term="Volatility Trading">
        Instead of betting on price direction, trade the level of implied
        volatility itself. Buy options when IV is cheap relative to expected
        realized vol, sell when IV is rich. Delta Exchange offers BTC and
        ETH options for this purpose.
      </DefinitionBlock>

      <CodeBlock language="python" title="IV Percentile Strategy">
{`import numpy as np
import pandas as pd

def iv_percentile(iv_history, current_iv, lookback=365):
    """Calculate IV percentile for trade decisions."""
    recent = iv_history[-lookback:]
    percentile = (np.sum(recent < current_iv) / len(recent)) * 100
    return percentile

def vol_strategy_signal(iv_percentile, iv_current, rv_30d):
    """Generate vol strategy signals."""
    iv_rv_spread = iv_current - rv_30d

    if iv_percentile < 20:
        # IV is cheap -> buy vol
        return {
            'signal': 'buy_straddle',
            'reason': f'IV at {iv_percentile:.0f}th percentile',
            'edge': f'IV-RV spread: {iv_rv_spread:.1f}%'
        }
    elif iv_percentile > 80:
        # IV is rich -> sell vol
        return {
            'signal': 'sell_strangle',
            'reason': f'IV at {iv_percentile:.0f}th percentile',
            'edge': f'IV-RV spread: {iv_rv_spread:.1f}%'
        }
    else:
        return {'signal': 'no_trade', 'reason': 'IV in neutral zone'}

# BTC options on Delta Exchange
np.random.seed(42)
iv_history = np.random.uniform(40, 120, 365)  # BTC IV range
current_iv = 45  # Currently low

pct = iv_percentile(iv_history, current_iv)
signal = vol_strategy_signal(pct, current_iv, rv_30d=55)
print(f"IV Percentile: {pct:.0f}")
print(f"Signal: {signal['signal']}")
print(f"Reason: {signal['reason']}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Volatility Term Structure Trade">
{`def vol_term_structure_trade(near_iv, far_iv):
    """Trade IV term structure on Delta Exchange options."""
    ratio = near_iv / far_iv

    if ratio > 1.3:  # Inverted: near IV >> far IV
        return {
            'trade': 'sell_near_buy_far',
            'reason': 'Term structure inverted, sell panic premium',
            'ratio': ratio
        }
    elif ratio < 0.8:  # Steep contango
        return {
            'trade': 'buy_near_sell_far',
            'reason': 'Term structure steep, near options underpriced',
            'ratio': ratio
        }
    return {'trade': 'none', 'ratio': ratio}

# BTC: 7-day IV vs 30-day IV
print(vol_term_structure_trade(near_iv=75, far_iv=55))  # inverted`}
      </CodeBlock>

      <NoteBlock title="Crypto Vol Characteristics">
        Crypto IV is typically 2-4x equity IV. BTC options on Delta Exchange
        have American-style exercise. IV tends to spike on Bitcoin halving
        events, ETF decisions, and major exchange incidents. Selling vol
        above the 80th percentile has historically been profitable.
      </NoteBlock>
    </SectionLayout>
  )
}
