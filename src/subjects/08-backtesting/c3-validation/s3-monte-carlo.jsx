import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function MonteCarlo() {
  return (
    <SectionLayout
      title="Monte Carlo Simulation"
      description="Stress-testing strategy robustness by randomizing trade sequences and returns."
    >
      <DefinitionBlock term="Monte Carlo Simulation">
        A technique that generates thousands of alternative equity curves by
        randomly resampling or shuffling the original trade sequence. Reveals
        the range of possible outcomes and confidence intervals for key metrics.
      </DefinitionBlock>

      <CodeBlock language="python" title="Monte Carlo Trade Resampling">
{`import numpy as np
import pandas as pd

class MonteCarloSimulator:
    """Monte Carlo analysis of backtest trade results."""

    def __init__(self, trades: list, initial_capital: float):
        self.pnls = np.array([t['pnl'] for t in trades])
        self.capital = initial_capital

    def run(self, n_simulations=10000):
        n_trades = len(self.pnls)
        results = []

        for _ in range(n_simulations):
            # Shuffle trade order randomly
            shuffled = np.random.choice(self.pnls, size=n_trades, replace=True)
            equity = self.capital + np.cumsum(shuffled)

            peak = np.maximum.accumulate(equity)
            drawdown = (equity - peak) / peak

            results.append({
                'final_equity': equity[-1],
                'max_drawdown': drawdown.min(),
                'total_return': (equity[-1] / self.capital - 1),
            })

        return pd.DataFrame(results)

    def confidence_intervals(self, results, levels=[5, 25, 50, 75, 95]):
        ci = {}
        for col in ['final_equity', 'max_drawdown', 'total_return']:
            ci[col] = {
                f'p{p}': np.percentile(results[col], p) for p in levels
            }
        return ci

# Run simulation
trades = [{'pnl': 500}, {'pnl': -200}, {'pnl': 800}, ...]  # from backtest
mc = MonteCarloSimulator(trades, initial_capital=1_000_000)
results = mc.run(n_simulations=10000)
ci = mc.confidence_intervals(results)
print(f"95th percentile max drawdown: {ci['max_drawdown']['p5']:.1%}")
print(f"Median final equity: Rs {ci['final_equity']['p50']:,.0f}")`}
      </CodeBlock>

      <NoteBlock title="Interpreting Results">
        Focus on the 5th percentile (worst case) max drawdown. If even the worst
        Monte Carlo path shows a drawdown you can stomach, the strategy is robust.
        For Indian F&O strategies, a 5th-percentile drawdown exceeding 25% of
        capital is a red flag for live deployment.
      </NoteBlock>
    </SectionLayout>
  )
}
