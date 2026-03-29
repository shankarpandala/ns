import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function RiskAllocation() {
  return (
    <SectionLayout
      title="Portfolio-Level Risk Allocation"
      description="Distributing capital across strategies using risk budgeting techniques."
    >
      <DefinitionBlock term="Risk Budgeting">
        Allocating capital based on each strategy's risk contribution rather
        than fixed dollar amounts. Strategies with lower volatility and
        higher Sharpe receive larger allocations. Ensures no single strategy
        dominates portfolio risk.
      </DefinitionBlock>

      <CodeBlock language="python" title="Risk Parity Allocation Across Strategies">
{`import numpy as np
import pandas as pd

def risk_parity_allocation(strategy_returns):
    """Allocate inversely proportional to volatility."""
    vols = strategy_returns.std() * np.sqrt(252)
    inv_vol = 1 / vols
    weights = inv_vol / inv_vol.sum()
    return weights

def sharpe_weighted_allocation(strategy_returns, rf=0.07):
    """Allocate proportional to Sharpe ratio."""
    excess = strategy_returns.mean() * 252 - rf
    vols = strategy_returns.std() * np.sqrt(252)
    sharpes = excess / vols
    sharpes = sharpes.clip(lower=0)  # No allocation to negative Sharpe

    if sharpes.sum() == 0:
        return pd.Series(1/len(sharpes), index=sharpes.index)
    return sharpes / sharpes.sum()

# Simulated strategy returns
np.random.seed(42)
strategies = pd.DataFrame({
    'ORB': np.random.normal(0.001, 0.015, 252),
    'VWAP_Rev': np.random.normal(0.0008, 0.008, 252),
    'Options_Sell': np.random.normal(0.0012, 0.010, 252),
    'Pairs': np.random.normal(0.0005, 0.006, 252),
    'Momentum': np.random.normal(0.0015, 0.020, 252),
})

rp_weights = risk_parity_allocation(strategies)
sw_weights = sharpe_weighted_allocation(strategies)

print("Risk Parity Weights:")
for s, w in rp_weights.items():
    print(f"  {s:15s}: {w:.1%}")
print("\\nSharpe-Weighted:")
for s, w in sw_weights.items():
    print(f"  {s:15s}: {w:.1%}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Dynamic Rebalancing with Kelly">
{`def kelly_fraction(win_rate, avg_win, avg_loss):
    """Kelly criterion for optimal bet size."""
    if avg_loss == 0:
        return 0
    b = avg_win / avg_loss  # Win/loss ratio
    f = (b * win_rate - (1 - win_rate)) / b
    return max(0, f * 0.5)  # Half-Kelly for safety

# Per-strategy Kelly sizing
stats = {
    'ORB':         {'wr': 0.52, 'avg_w': 25, 'avg_l': 15},
    'VWAP_Rev':    {'wr': 0.60, 'avg_w': 12, 'avg_l': 10},
    'Options_Sell': {'wr': 0.70, 'avg_w': 8, 'avg_l': 20},
}
for name, s in stats.items():
    k = kelly_fraction(s['wr'], s['avg_w'], s['avg_l'])
    print(f"{name}: Kelly = {k:.1%} of capital")`}
      </CodeBlock>

      <NoteBlock title="Rebalancing Frequency">
        Rebalance strategy weights weekly on Sunday (for crypto) or Saturday
        (for Indian equity strategies). More frequent rebalancing increases
        costs. Less frequent misses regime changes. Weekly is the sweet spot
        for a portfolio running 3-5 active strategies.
      </NoteBlock>
    </SectionLayout>
  )
}
