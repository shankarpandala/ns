import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function FundingRate() {
  return (
    <SectionLayout
      title="Perpetual Funding Rate Arbitrage"
      description="Capturing funding rate payments on Delta Exchange perpetual contracts."
    >
      <DefinitionBlock term="Funding Rate">
        A periodic payment between longs and shorts on perpetual futures to
        keep the perp price anchored to spot. When positive, longs pay shorts.
        On Delta Exchange, funding settles every 8 hours.
      </DefinitionBlock>

      <CodeBlock language="python" title="Funding Rate Arbitrage Strategy">
{`import numpy as np
import pandas as pd

def funding_arb_pnl(funding_rates, position_size_usd, days=30):
    """Calculate P&L from funding rate arbitrage."""
    # Strategy: short perp (collect positive funding) + long spot
    daily_rates = []
    for rate in funding_rates:  # 8-hourly rates
        daily_rates.append(rate)

    total_funding = sum(daily_rates[:days * 3])  # 3 funding periods/day
    funding_pnl = total_funding * position_size_usd

    # Trading costs
    entry_cost = position_size_usd * 0.001 * 2  # 0.1% maker each side
    slippage = position_size_usd * 0.0005 * 2

    net_pnl = funding_pnl - entry_cost - slippage
    annualized_return = (net_pnl / position_size_usd) * (365 / days) * 100

    return {
        'funding_pnl': funding_pnl,
        'costs': entry_cost + slippage,
        'net_pnl': net_pnl,
        'annualized_return': annualized_return
    }

# BTC perp on Delta with avg 0.03% funding rate (8h)
np.random.seed(42)
funding_rates = np.random.normal(0.0003, 0.0001, 90)  # 30 days * 3

result = funding_arb_pnl(funding_rates, position_size_usd=10000, days=30)
print(f"Funding collected: \${result['funding_pnl']:.2f}")
print(f"Costs: \${result['costs']:.2f}")
print(f"Net P&L: \${result['net_pnl']:.2f}")
print(f"Annualized: {result['annualized_return']:.1f}%")`}
      </CodeBlock>

      <CodeBlock language="python" title="Multi-Asset Funding Scanner">
{`def scan_funding_opportunities(assets):
    """Find best funding rate arb across Delta Exchange assets."""
    opportunities = []
    for asset in assets:
        avg_rate = np.mean(asset['funding_history'][-21:])  # 7-day avg
        if avg_rate > 0.0002:  # Min 0.02% per 8h
            annualized = avg_rate * 3 * 365 * 100
            opportunities.append({
                'symbol': asset['symbol'],
                'avg_8h_rate': avg_rate * 100,
                'annualized': annualized,
                'direction': 'short_perp_long_spot'
            })
    return sorted(opportunities, key=lambda x: x['annualized'], reverse=True)`}
      </CodeBlock>

      <NoteBlock title="Funding Rate Risks">
        Funding can flip negative during market crashes, causing the short
        perp to pay instead of receive. Monitor funding rate trend -- exit
        when the 7-day average drops below 0.01%. Also account for spot
        hedge slippage during volatile periods.
      </NoteBlock>
    </SectionLayout>
  )
}
