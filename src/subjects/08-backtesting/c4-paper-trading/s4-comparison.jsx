import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function BacktestVsPaper() {
  return (
    <SectionLayout
      title="Backtest vs Paper Trading Comparison"
      description="Analyzing performance gaps between backtests and paper trading to build confidence."
    >
      <ComparisonTable
        title="Backtest vs Paper Trading"
        headers={['Factor', 'Backtest', 'Paper Trading']}
        rows={[
          ['Data', 'Historical bars', 'Live real-time feed'],
          ['Execution', 'Simulated fills', 'Simulated against live quotes'],
          ['Slippage', 'Model-estimated', 'Observed from bid/ask spread'],
          ['Latency', 'None (instant)', 'Real network + processing delay'],
          ['Market Impact', 'Estimated', 'Not applicable (no real orders)'],
          ['Duration', 'Minutes to run years', 'Real-time, weeks to validate'],
        ]}
      />

      <CodeBlock language="python" title="Performance Comparison Report">
{`import pandas as pd

class PerformanceComparator:
    """Compare backtest vs paper trading results."""

    def __init__(self, backtest_trades, paper_trades):
        self.bt = pd.DataFrame(backtest_trades)
        self.pt = pd.DataFrame(paper_trades)

    def slippage_analysis(self):
        """Compare fill prices for same trade signals."""
        merged = self.bt.merge(
            self.pt, on=['signal_time', 'symbol'], suffixes=('_bt', '_pt')
        )
        merged['slip_diff'] = abs(
            merged['fill_price_pt'] - merged['fill_price_bt']
        )
        return {
            'mean_slippage_diff': merged['slip_diff'].mean(),
            'max_slippage_diff': merged['slip_diff'].max(),
            'pct_worse_in_paper': (
                merged['pnl_pt'] < merged['pnl_bt']
            ).mean(),
        }

    def metrics_comparison(self):
        return {
            'backtest': {
                'total_pnl': self.bt['pnl'].sum(),
                'win_rate': (self.bt['pnl'] > 0).mean(),
                'avg_trade': self.bt['pnl'].mean(),
                'trade_count': len(self.bt),
            },
            'paper': {
                'total_pnl': self.pt['pnl'].sum(),
                'win_rate': (self.pt['pnl'] > 0).mean(),
                'avg_trade': self.pt['pnl'].mean(),
                'trade_count': len(self.pt),
            },
        }

    def degradation_ratio(self):
        """How much worse is paper vs backtest?"""
        bt_pnl = self.bt['pnl'].sum()
        pt_pnl = self.pt['pnl'].sum()
        if bt_pnl <= 0:
            return None
        return pt_pnl / bt_pnl  # 0.7 means 30% degradation`}
      </CodeBlock>

      <NoteBlock title="Acceptable Degradation">
        Expect 20-40% degradation from backtest to paper trading. If paper
        retains 60%+ of backtest PnL, the strategy is viable for live deployment.
        If degradation exceeds 50%, revisit slippage assumptions and execution
        logic before risking real capital.
      </NoteBlock>
    </SectionLayout>
  )
}
