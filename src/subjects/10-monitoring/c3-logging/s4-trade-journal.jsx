import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function TradeJournal() {
  return (
    <SectionLayout
      title="Automated Trade Journal"
      description="Automatically recording and analyzing every trade for continuous improvement."
    >
      <DefinitionBlock term="Trade Journal">
        A detailed log of every trade including entry/exit prices, rationale,
        market conditions, and outcome. Automated journals capture data that
        manual journaling misses, enabling systematic performance analysis.
      </DefinitionBlock>

      <CodeBlock language="python" title="Automated Trade Journal">
{`import pandas as pd
from datetime import datetime
import json

class TradeJournal:
    """Automated trade journal with analytics."""

    def __init__(self, db_path="data/trade_journal.jsonl"):
        self.db_path = db_path

    def record_trade(self, trade: dict):
        entry = {
            'trade_id': trade['trade_id'],
            'timestamp': datetime.now().isoformat(),
            'symbol': trade['symbol'],
            'strategy': trade['strategy'],
            'side': trade['side'],
            'entry_price': trade['entry_price'],
            'exit_price': trade['exit_price'],
            'quantity': trade['quantity'],
            'pnl': trade['pnl'],
            'holding_period_min': trade.get('holding_period_min'),
            'entry_reason': trade.get('entry_reason', ''),
            'exit_reason': trade.get('exit_reason', ''),
            'slippage': trade.get('slippage', 0),
            'commissions': trade.get('commissions', 0),
            'market_conditions': trade.get('market_conditions', {}),
        }
        with open(self.db_path, 'a') as f:
            f.write(json.dumps(entry) + '\n')

    def load_trades(self, start_date=None, strategy=None):
        trades = []
        with open(self.db_path) as f:
            for line in f:
                trade = json.loads(line)
                if strategy and trade['strategy'] != strategy:
                    continue
                trades.append(trade)
        return pd.DataFrame(trades)

    def weekly_review(self):
        df = self.load_trades()
        df['date'] = pd.to_datetime(df['timestamp']).dt.date
        last_week = df.tail(50)  # Approximate last week

        return {
            'total_trades': len(last_week),
            'win_rate': (last_week['pnl'] > 0).mean(),
            'total_pnl': last_week['pnl'].sum(),
            'avg_winner': last_week[last_week['pnl'] > 0]['pnl'].mean(),
            'avg_loser': last_week[last_week['pnl'] < 0]['pnl'].mean(),
            'best_trade': last_week.loc[last_week['pnl'].idxmax()].to_dict(),
            'worst_trade': last_week.loc[last_week['pnl'].idxmin()].to_dict(),
            'by_strategy': last_week.groupby('strategy')['pnl'].agg(
                ['count', 'sum', 'mean']
            ).to_dict('index'),
            'avg_holding_min': last_week['holding_period_min'].mean(),
        }

journal = TradeJournal()
review = journal.weekly_review()
print(f"Win rate: {review['win_rate']:.0%}")
print(f"Total P&L: Rs {review['total_pnl']:,.0f}")`}
      </CodeBlock>

      <NoteBlock title="Review Cadence">
        Run weekly reviews every Saturday. Focus on: which strategies are
        working, average holding period vs plan, slippage patterns, and
        whether losses cluster at specific times (e.g., first 15 minutes
        after open). Use insights to refine strategy parameters.
      </NoteBlock>
    </SectionLayout>
  )
}
