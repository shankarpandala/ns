import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function CrossExchange() {
  return (
    <SectionLayout
      title="Cross-Exchange Arbitrage"
      description="Exploiting price discrepancies between Delta Exchange and other venues."
    >
      <DefinitionBlock term="Cross-Exchange Arbitrage">
        Simultaneously buying on one exchange and selling on another when the
        same asset trades at different prices. In crypto, price discrepancies
        arise from liquidity fragmentation, withdrawal delays, and regional
        demand differences.
      </DefinitionBlock>

      <CodeBlock language="python" title="Cross-Exchange Price Monitor">
{`import numpy as np
import time

class CrossExchangeArb:
    def __init__(self, min_spread_pct=0.15, fees=0.001):
        self.min_spread = min_spread_pct / 100
        self.fees = fees  # Round-trip fees per exchange

    def check_opportunity(self, prices):
        """Check for arb across multiple exchanges."""
        exchanges = list(prices.keys())
        opps = []

        for i, ex_a in enumerate(exchanges):
            for ex_b in exchanges[i+1:]:
                bid_a, ask_a = prices[ex_a]['bid'], prices[ex_a]['ask']
                bid_b, ask_b = prices[ex_b]['bid'], prices[ex_b]['ask']

                # Buy on A, sell on B
                spread_ab = (bid_b - ask_a) / ask_a
                # Buy on B, sell on A
                spread_ba = (bid_a - ask_b) / ask_b

                total_fees = self.fees * 2  # Both exchanges

                if spread_ab > total_fees + self.min_spread:
                    opps.append({
                        'buy': ex_a, 'sell': ex_b,
                        'spread': spread_ab * 100,
                        'net_profit': (spread_ab - total_fees) * 100
                    })
                if spread_ba > total_fees + self.min_spread:
                    opps.append({
                        'buy': ex_b, 'sell': ex_a,
                        'spread': spread_ba * 100,
                        'net_profit': (spread_ba - total_fees) * 100
                    })

        return opps

arb = CrossExchangeArb(min_spread_pct=0.10)
prices = {
    'Delta': {'bid': 67480, 'ask': 67520},
    'Binance': {'bid': 67550, 'ask': 67570},
    'OKX': {'bid': 67500, 'ask': 67530},
}
opps = arb.check_opportunity(prices)
for opp in opps:
    print(f"Buy {opp['buy']} -> Sell {opp['sell']}: "
          f"{opp['spread']:.3f}% (net {opp['net_profit']:.3f}%)")`}
      </CodeBlock>

      <CodeBlock language="python" title="Funding Rate Cross-Exchange Arb">
{`def funding_rate_arb(exchange_rates):
    """Arb funding rates: long on low-rate exchange, short on high."""
    sorted_rates = sorted(exchange_rates.items(), key=lambda x: x[1])
    lowest = sorted_rates[0]
    highest = sorted_rates[-1]
    spread = highest[1] - lowest[1]

    if spread > 0.02:  # 0.02% minimum spread
        return {
            'long_on': lowest[0],
            'short_on': highest[0],
            'spread_pct': spread,
            'annualized': spread * 3 * 365  # 3x daily
        }
    return None

rates = {'Delta': 0.035, 'Binance': 0.010, 'OKX': 0.025}
print(funding_rate_arb(rates))`}
      </CodeBlock>

      <NoteBlock title="Execution Challenges">
        Cross-exchange arb requires pre-funded accounts on both exchanges.
        Latency matters -- Delta Exchange API responds in ~50ms. Account for
        withdrawal times (BTC: 30-60 min) when sizing positions. The
        Indian INR premium on local exchanges creates additional arb
        opportunities vs international USD-based exchanges.
      </NoteBlock>
    </SectionLayout>
  )
}
