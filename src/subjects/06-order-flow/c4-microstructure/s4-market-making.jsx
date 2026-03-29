import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function MarketMaking() {
  return (
    <SectionLayout
      title="Market Making Dynamics"
      description="Understanding inventory risk, quoting strategies, and market maker economics."
    >
      <DefinitionBlock term="Market Making">
        Continuously quoting bid and ask prices to earn the spread. Market
        makers provide liquidity but face inventory risk (accumulating
        unwanted positions) and adverse selection (trading against informed
        participants).
      </DefinitionBlock>

      <CodeBlock language="python" title="Simple Avellaneda-Stoikov Market Maker">
{`import numpy as np

class MarketMaker:
    """Avellaneda-Stoikov optimal market making model."""

    def __init__(self, mid_price, gamma=0.1, sigma=2.0, T=1.0, k=1.5):
        self.mid = mid_price
        self.gamma = gamma   # Risk aversion
        self.sigma = sigma   # Volatility
        self.T = T           # Time horizon
        self.k = k           # Order arrival intensity
        self.inventory = 0

    def reservation_price(self, t):
        """Price adjusted for inventory risk."""
        return self.mid - self.inventory * self.gamma * self.sigma**2 * (self.T - t)

    def optimal_spread(self, t):
        """Optimal spread width."""
        return (self.gamma * self.sigma**2 * (self.T - t)
                + 2 * np.log(1 + self.gamma / self.k) / self.gamma)

    def quotes(self, t):
        """Generate bid and ask quotes."""
        r = self.reservation_price(t)
        s = self.optimal_spread(t)
        return {'bid': r - s/2, 'ask': r + s/2, 'spread': s}

mm = MarketMaker(mid_price=22450, gamma=0.05, sigma=3.0)
for t in [0.0, 0.25, 0.5, 0.75]:
    q = mm.quotes(t)
    print(f"t={t:.2f} | Bid: {q['bid']:.2f} Ask: {q['ask']:.2f} "
          f"Spread: {q['spread']:.2f}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Inventory Risk Simulation">
{`def simulate_mm(n_trades=200):
    mm = MarketMaker(22450, gamma=0.05, sigma=3.0)
    pnl = 0

    for i in range(n_trades):
        t = i / n_trades
        q = mm.quotes(t)
        # Random fill on one side
        if np.random.random() < 0.5:
            mm.inventory += 1
            pnl -= q['ask']
        else:
            mm.inventory -= 1
            pnl += q['bid']
        mm.mid += np.random.normal(0, 0.3)

    # Mark to market final inventory
    pnl += mm.inventory * mm.mid
    return pnl, mm.inventory

results = [simulate_mm() for _ in range(1000)]
avg_pnl = np.mean([r[0] for r in results])
print(f"Avg PnL: {avg_pnl:.2f}")`}
      </CodeBlock>

      <NoteBlock title="Market Making at NSE">
        NSE designates market makers for illiquid options and ETFs with
        obligations to maintain two-sided quotes within a spread threshold.
        Proprietary firms run Avellaneda-Stoikov variants with co-located
        servers at NSE's data center in Mumbai.
      </NoteBlock>
    </SectionLayout>
  )
}
