import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function RegimeDetection() {
  return (
    <SectionLayout
      title="Market Regime Detection"
      description="Identifying trending, mean-reverting, and volatile regimes for strategy switching."
    >
      <DefinitionBlock term="Market Regime">
        A persistent market state characterized by specific statistical
        properties: trend strength, volatility level, and mean-reversion
        tendency. Different strategies perform best in different regimes.
      </DefinitionBlock>

      <CodeBlock language="python" title="HMM-Based Regime Detection">
{`import numpy as np
import pandas as pd

class SimpleRegimeDetector:
    """Detect market regimes using volatility and trend metrics."""

    def __init__(self, vol_lookback=20, trend_lookback=50):
        self.vol_lb = vol_lookback
        self.trend_lb = trend_lookback

    def detect(self, prices):
        df = pd.DataFrame({'price': prices})
        returns = df['price'].pct_change()

        # Volatility regime
        vol = returns.rolling(self.vol_lb).std() * np.sqrt(252) * 100
        vol_median = vol.rolling(100).median()
        df['high_vol'] = vol > vol_median * 1.3

        # Trend regime (ADX proxy)
        df['ema_fast'] = df['price'].ewm(span=10).mean()
        df['ema_slow'] = df['price'].ewm(span=self.trend_lb).mean()
        df['trend_strength'] = abs(df['ema_fast'] - df['ema_slow']) / df['ema_slow']

        # Classify regime
        df['regime'] = 'unknown'
        df.loc[
            (df['trend_strength'] > 0.02) & ~df['high_vol'],
            'regime'] = 'trending'
        df.loc[
            (df['trend_strength'] <= 0.02) & ~df['high_vol'],
            'regime'] = 'mean_reverting'
        df.loc[df['high_vol'], 'regime'] = 'volatile'

        return df['regime']

    def strategy_map(self, regime):
        """Map regime to optimal strategy mix."""
        strategies = {
            'trending': {
                'momentum': 0.4, 'breakout': 0.3,
                'order_flow': 0.2, 'mean_reversion': 0.1},
            'mean_reverting': {
                'mean_reversion': 0.4, 'options_selling': 0.3,
                'pairs': 0.2, 'momentum': 0.1},
            'volatile': {
                'options_buying': 0.3, 'reduce_size': 0.3,
                'hedged': 0.3, 'momentum': 0.1},
        }
        return strategies.get(regime, strategies['mean_reverting'])

detector = SimpleRegimeDetector()
np.random.seed(42)
prices = 22000 + np.cumsum(np.random.normal(0.5, 20, 250))
regimes = detector.detect(prices)
current = regimes.iloc[-1]
print(f"Current regime: {current}")
print(f"Strategy mix: {detector.strategy_map(current)}")`}
      </CodeBlock>

      <NoteBlock title="Regime in Indian Markets">
        Nifty typically spends 30% of time in trending regimes, 50% in
        mean-reverting, and 20% in volatile regimes. Regime transitions
        cluster around budget week, RBI policy, and global risk events.
        Detecting the transition early (within 2-3 days) is more valuable
        than identifying the regime itself.
      </NoteBlock>
    </SectionLayout>
  )
}
