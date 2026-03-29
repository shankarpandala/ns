import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function WalkForward() {
  return (
    <SectionLayout
      title="Walk-Forward Optimization"
      description="Rolling window optimization to test strategy adaptability across market regimes."
    >
      <DefinitionBlock term="Walk-Forward Analysis (WFA)">
        An iterative process: optimize on a training window, test on the next
        forward window, then slide both windows forward and repeat. Combines
        in-sample optimization with out-of-sample validation across time.
      </DefinitionBlock>

      <CodeBlock language="python" title="Walk-Forward Optimization Engine">
{`import pandas as pd
import numpy as np
from itertools import product

class WalkForwardOptimizer:
    """Rolling walk-forward optimization framework."""

    def __init__(self, data, train_days=252, test_days=63):
        self.data = data
        self.train_days = train_days  # 1 year train
        self.test_days = test_days    # 3 months test

    def generate_windows(self):
        total = len(self.data)
        windows = []
        start = 0
        while start + self.train_days + self.test_days <= total:
            train_end = start + self.train_days
            test_end = train_end + self.test_days
            windows.append({
                'train': self.data.iloc[start:train_end],
                'test': self.data.iloc[train_end:test_end],
                'period': self.data.index[train_end],
            })
            start += self.test_days  # Slide by test window size
        return windows

    def optimize(self, strategy_class, param_grid, metric='sharpe'):
        results = []
        for window in self.generate_windows():
            best_params, best_score = None, -np.inf
            for params in product(*param_grid.values()):
                param_dict = dict(zip(param_grid.keys(), params))
                strat = strategy_class(**param_dict)
                score = strat.backtest(window['train'])[metric]
                if score > best_score:
                    best_score = score
                    best_params = param_dict

            # Test best params on OOS window
            strat = strategy_class(**best_params)
            oos_result = strat.backtest(window['test'])
            results.append({
                'period': window['period'],
                'params': best_params,
                'is_score': best_score,
                'oos_score': oos_result[metric],
            })
        return pd.DataFrame(results)

# Example usage
param_grid = {'fast_ma': [5, 10, 20], 'slow_ma': [50, 100, 200]}
wfo = WalkForwardOptimizer(nifty_data)
results = wfo.optimize(MACrossStrategy, param_grid)`}
      </CodeBlock>

      <NoteBlock title="Walk-Forward Efficiency">
        Calculate WFE = mean(OOS returns) / mean(IS returns). A WFE above 0.5
        indicates the strategy retains at least half its in-sample edge. Below
        0.3 suggests heavy overfitting. Indian markets have distinct regimes
        (election years, RBI policy cycles), so WFA is essential.
      </NoteBlock>
    </SectionLayout>
  )
}
