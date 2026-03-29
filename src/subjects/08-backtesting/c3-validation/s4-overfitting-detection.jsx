import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OverfittingDetection() {
  return (
    <SectionLayout
      title="Detecting Overfitting"
      description="Deflated Sharpe ratio, parameter sensitivity, and other methods to catch curve-fitting."
    >
      <DefinitionBlock term="Deflated Sharpe Ratio (DSR)">
        Adjusts the observed Sharpe ratio for the number of strategy variations
        tested (multiple testing bias). If you tested 100 parameter combos, the
        best Sharpe is likely inflated. DSR corrects for this selection bias.
      </DefinitionBlock>

      <CodeBlock language="python" title="Deflated Sharpe Ratio">
{`import numpy as np
from scipy.stats import norm

def deflated_sharpe_ratio(observed_sharpe, num_trials, T,
                          skew=0, kurtosis=3):
    """
    Calculate Deflated Sharpe Ratio (Bailey & Lopez de Prado).

    Args:
        observed_sharpe: Best Sharpe ratio found
        num_trials: Number of parameter combos tested
        T: Number of return observations
        skew: Skewness of returns
        kurtosis: Kurtosis of returns
    """
    # Expected max Sharpe under null (all strategies are random)
    euler_mascheroni = 0.5772
    expected_max = ((1 - euler_mascheroni) * norm.ppf(1 - 1/num_trials)
                    + euler_mascheroni * norm.ppf(1 - 1/(num_trials * np.e)))

    # Standard error of Sharpe estimate
    se = np.sqrt((1 + 0.5 * observed_sharpe**2
                  - skew * observed_sharpe
                  + ((kurtosis - 3) / 4) * observed_sharpe**2) / T)

    # Probability that observed Sharpe is genuine
    dsr = norm.cdf((observed_sharpe - expected_max) / se)
    return dsr

# Tested 200 param combos, best Sharpe = 2.1 over 500 trading days
dsr = deflated_sharpe_ratio(
    observed_sharpe=2.1, num_trials=200, T=500
)
print(f"DSR probability: {dsr:.3f}")
# DSR < 0.05 means likely overfitted`}
      </CodeBlock>

      <CodeBlock language="python" title="Parameter Sensitivity Heatmap">
{`def parameter_sensitivity(strategy_class, data, param1_range,
                          param2_range, metric='sharpe'):
    """Check if performance is robust across nearby parameters."""
    results = np.zeros((len(param1_range), len(param2_range)))

    for i, p1 in enumerate(param1_range):
        for j, p2 in enumerate(param2_range):
            strat = strategy_class(fast=p1, slow=p2)
            results[i, j] = strat.backtest(data)[metric]

    # Overfitting sign: sharp peak surrounded by poor values
    center = results[len(param1_range)//2, len(param2_range)//2]
    neighbors = results[
        len(param1_range)//2-1:len(param1_range)//2+2,
        len(param2_range)//2-1:len(param2_range)//2+2
    ].mean()
    robustness = neighbors / center if center > 0 else 0
    return results, robustness  # robustness > 0.7 is good`}
      </CodeBlock>

      <NoteBlock title="Rules of Thumb">
        If your strategy has more than 5 tunable parameters, it is almost
        certainly overfit. Aim for 2-3 parameters maximum. If in-sample Sharpe
        is above 3.0 on daily data, be very skeptical. Real edges in Indian
        markets rarely exceed Sharpe 2.0 after costs.
      </NoteBlock>
    </SectionLayout>
  )
}
