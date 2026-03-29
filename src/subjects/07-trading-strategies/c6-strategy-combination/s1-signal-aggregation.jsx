import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SignalAggregation() {
  return (
    <SectionLayout
      title="Signal Scoring & Aggregation"
      description="Combining multiple strategy signals into a single actionable score."
    >
      <DefinitionBlock term="Signal Aggregation">
        Combining outputs from multiple trading strategies into a composite
        score. Each strategy contributes a signal (-1 to +1) weighted by its
        historical accuracy. The aggregate determines position direction
        and size.
      </DefinitionBlock>

      <CodeBlock language="python" title="Weighted Signal Aggregator">
{`import numpy as np
from dataclasses import dataclass

@dataclass
class StrategySignal:
    name: str
    signal: float      # -1 (strong sell) to +1 (strong buy)
    confidence: float  # 0 to 1
    weight: float      # Based on historical performance

class SignalAggregator:
    def __init__(self, min_score=0.3, min_strategies=3):
        self.min_score = min_score
        self.min_strategies = min_strategies

    def aggregate(self, signals):
        """Weighted average of strategy signals."""
        if len(signals) < self.min_strategies:
            return {'score': 0, 'action': 'WAIT',
                    'reason': 'Insufficient signals'}

        weighted_sum = sum(
            s.signal * s.confidence * s.weight for s in signals)
        total_weight = sum(s.confidence * s.weight for s in signals)
        score = weighted_sum / max(total_weight, 0.01)

        # Agreement metric: how many strategies agree
        bull = sum(1 for s in signals if s.signal > 0)
        bear = sum(1 for s in signals if s.signal < 0)
        agreement = max(bull, bear) / len(signals)

        if abs(score) < self.min_score:
            action = 'WAIT'
        elif score > 0:
            action = 'BUY' if agreement > 0.6 else 'WEAK_BUY'
        else:
            action = 'SELL' if agreement > 0.6 else 'WEAK_SELL'

        return {
            'score': score,
            'action': action,
            'agreement': agreement,
            'bull_count': bull,
            'bear_count': bear
        }

agg = SignalAggregator()
signals = [
    StrategySignal('ORB', 0.8, 0.7, 1.2),
    StrategySignal('VWAP_Rev', -0.3, 0.5, 1.0),
    StrategySignal('Order_Flow', 0.6, 0.8, 1.5),
    StrategySignal('Momentum', 0.9, 0.6, 1.1),
    StrategySignal('Pairs', 0.0, 0.4, 0.8),
]

result = agg.aggregate(signals)
print(f"Score: {result['score']:+.3f} | Action: {result['action']}")
print(f"Agreement: {result['agreement']:.0%} "
      f"({result['bull_count']}B / {result['bear_count']}S)")`}
      </CodeBlock>

      <NoteBlock title="Weight Calibration">
        Update strategy weights monthly using rolling Sharpe ratio of each
        strategy's standalone performance. A strategy that has been flat for
        30 days should have its weight reduced by 50% until it recovers.
        Never let any single strategy exceed 30% of total weight.
      </NoteBlock>
    </SectionLayout>
  )
}
