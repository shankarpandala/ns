import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SectorRotation() {
  return (
    <SectionLayout
      title="Sector Rotation in Indian Markets"
      description="Identifying which Nifty sectors are leading and lagging for positional trades."
    >
      <DefinitionBlock term="Sector Rotation">
        Capital flows between sectors in a cyclical pattern driven by economic
        cycles, monetary policy, and earnings momentum. In India, key sectors
        include Banking, IT, Pharma, Auto, FMCG, Metals, and Realty.
      </DefinitionBlock>

      <CodeBlock language="python" title="Relative Strength Sector Ranking">
{`import pandas as pd
import numpy as np

sectors = {
    'NIFTY_BANK': '^NSEBANK',
    'NIFTY_IT': '^CNXIT',
    'NIFTY_PHARMA': '^CNXPHARMA',
    'NIFTY_AUTO': '^CNXAUTO',
    'NIFTY_METAL': '^CNXMETAL',
    'NIFTY_FMCG': '^CNXFMCG',
    'NIFTY_REALTY': '^CNXREALTY',
}

def rank_sectors(sector_data, lookback=20):
    """Rank sectors by relative performance vs Nifty 50."""
    rankings = {}
    nifty_ret = sector_data['NIFTY50'].pct_change(lookback).iloc[-1]

    for name, col in sector_data.items():
        if name == 'NIFTY50':
            continue
        sector_ret = col.pct_change(lookback).iloc[-1]
        relative_strength = sector_ret - nifty_ret
        momentum = col.pct_change(5).iloc[-1]  # short-term momentum
        rankings[name] = {
            'return_20d': sector_ret,
            'relative_strength': relative_strength,
            'momentum_5d': momentum,
            'score': relative_strength * 0.6 + momentum * 0.4
        }

    ranked = sorted(rankings.items(), key=lambda x: x[1]['score'], reverse=True)
    for i, (name, data) in enumerate(ranked):
        print(f"{i+1}. {name:15s} RS: {data['relative_strength']:+.2%} "
              f"Mom: {data['momentum_5d']:+.2%} Score: {data['score']:+.4f}")

    return ranked

print("Strategy: Go long top 2 sectors, avoid/short bottom 2")
print("Rebalance weekly based on updated rankings")`}
      </CodeBlock>

      <CodeBlock language="python" title="RRG (Relative Rotation Graph) Logic">
{`def compute_rrg(sector_vs_nifty, rs_period=10, mom_period=10):
    """Compute RRG quadrant: Leading/Weakening/Lagging/Improving."""
    rs_ratio = sector_vs_nifty.rolling(rs_period).mean()
    rs_momentum = rs_ratio.pct_change(mom_period)

    if rs_ratio.iloc[-1] > 1 and rs_momentum.iloc[-1] > 0:
        return 'Leading'
    elif rs_ratio.iloc[-1] > 1 and rs_momentum.iloc[-1] <= 0:
        return 'Weakening'
    elif rs_ratio.iloc[-1] <= 1 and rs_momentum.iloc[-1] <= 0:
        return 'Lagging'
    else:
        return 'Improving'

# Buy sectors rotating from Improving to Leading
# Exit sectors rotating from Weakening to Lagging`}
      </CodeBlock>

      <NoteBlock title="Indian Sector Cycles">
        Banking leads when RBI cuts rates. IT outperforms when INR weakens
        (export earnings boost). Metals follow global commodity cycles. Watch
        FII sector-wise allocation data from NSDL for institutional rotation
        signals. Realty and Auto tend to lead in early recovery phases.
      </NoteBlock>
    </SectionLayout>
  )
}
