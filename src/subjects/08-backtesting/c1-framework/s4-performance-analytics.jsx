import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PerformanceAnalytics() {
  return (
    <SectionLayout
      title="Performance Analytics"
      description="Computing Sharpe, Sortino, max drawdown, and trade-level metrics."
    >
      <DefinitionBlock term="Sharpe Ratio">
        Risk-adjusted return measured as (mean excess return) / (std deviation of returns).
        In India, use the 91-day T-bill rate (~6.5-7%) as the risk-free rate.
      </DefinitionBlock>

      <DefinitionBlock term="Max Drawdown">
        The largest peak-to-trough decline in portfolio equity. A critical metric
        for assessing worst-case scenarios in live trading.
      </DefinitionBlock>

      <CodeBlock language="python" title="Core Performance Metrics">
{`import numpy as np
import pandas as pd

class PerformanceAnalyzer:
    def __init__(self, equity_curve: pd.Series, risk_free_rate=0.065):
        self.equity = equity_curve
        self.returns = equity_curve.pct_change().dropna()
        self.rf_daily = (1 + risk_free_rate) ** (1/252) - 1

    def sharpe_ratio(self):
        excess = self.returns - self.rf_daily
        return np.sqrt(252) * excess.mean() / excess.std()

    def sortino_ratio(self):
        excess = self.returns - self.rf_daily
        downside = excess[excess < 0].std()
        return np.sqrt(252) * excess.mean() / downside

    def max_drawdown(self):
        peak = self.equity.cummax()
        drawdown = (self.equity - peak) / peak
        return drawdown.min()

    def calmar_ratio(self):
        annual_return = self.returns.mean() * 252
        return annual_return / abs(self.max_drawdown())

    def win_rate(self, trades: list):
        wins = sum(1 for t in trades if t['pnl'] > 0)
        return wins / len(trades) if trades else 0

    def profit_factor(self, trades: list):
        gross_profit = sum(t['pnl'] for t in trades if t['pnl'] > 0)
        gross_loss = abs(sum(t['pnl'] for t in trades if t['pnl'] < 0))
        return gross_profit / gross_loss if gross_loss else float('inf')

    def summary(self, trades=None):
        metrics = {
            'sharpe': round(self.sharpe_ratio(), 3),
            'sortino': round(self.sortino_ratio(), 3),
            'max_drawdown': f"{self.max_drawdown():.2%}",
            'calmar': round(self.calmar_ratio(), 3),
            'total_return': f"{(self.equity.iloc[-1]/self.equity.iloc[0]-1):.2%}",
        }
        if trades:
            metrics['win_rate'] = f"{self.win_rate(trades):.1%}"
            metrics['profit_factor'] = round(self.profit_factor(trades), 2)
        return metrics`}
      </CodeBlock>

      <NoteBlock title="Indian Market Benchmarks">
        Compare your strategy Sharpe against Nifty 50 buy-and-hold (~0.8-1.2
        annualized). A backtest Sharpe above 2.0 on Indian equities should be
        scrutinized for overfitting. Realistic live Sharpe for retail algo
        strategies ranges from 1.0-1.8.
      </NoteBlock>
    </SectionLayout>
  )
}
