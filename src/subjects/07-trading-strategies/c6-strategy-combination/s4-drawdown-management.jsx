import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DrawdownManagement() {
  return (
    <SectionLayout
      title="Drawdown Management & Recovery"
      description="Systematic approaches to managing losing streaks and portfolio drawdowns."
    >
      <DefinitionBlock term="Drawdown">
        The peak-to-trough decline in portfolio value before a new high is
        reached. Maximum drawdown is the single most important risk metric
        for active traders. A 50% drawdown requires a 100% gain to recover.
      </DefinitionBlock>

      <CodeBlock language="python" title="Drawdown Monitor with Auto-Scaling">
{`import numpy as np
import pandas as pd

class DrawdownManager:
    """Automatically scale position size based on drawdown depth."""

    def __init__(self, capital, levels=None):
        self.initial_capital = capital
        self.peak = capital
        self.levels = levels or [
            {'dd_pct': 5,  'size_mult': 0.75, 'action': 'reduce'},
            {'dd_pct': 10, 'size_mult': 0.50, 'action': 'half_size'},
            {'dd_pct': 15, 'size_mult': 0.25, 'action': 'minimal'},
            {'dd_pct': 20, 'size_mult': 0.00, 'action': 'stop_trading'},
        ]

    def update(self, current_capital):
        self.peak = max(self.peak, current_capital)
        dd = (self.peak - current_capital) / self.peak * 100

        size_mult = 1.0
        action = 'normal'

        for level in self.levels:
            if dd >= level['dd_pct']:
                size_mult = level['size_mult']
                action = level['action']

        return {
            'drawdown_pct': dd,
            'peak': self.peak,
            'size_multiplier': size_mult,
            'action': action,
            'recovery_needed': (self.peak / max(current_capital, 1) - 1) * 100
        }

# Simulation
dm = DrawdownManager(capital=1_000_000)
equity = [1_000_000]
np.random.seed(42)

for day in range(60):
    daily_return = np.random.normal(0.001, 0.02)
    new_equity = equity[-1] * (1 + daily_return)
    equity.append(new_equity)

    status = dm.update(new_equity)
    if status['action'] != 'normal':
        print(f"Day {day}: DD={status['drawdown_pct']:.1f}% "
              f"Action={status['action']} "
              f"Size={status['size_multiplier']:.0%}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Recovery Protocol">
{`class RecoveryProtocol:
    """Graduated return to full size after drawdown."""

    def __init__(self, recovery_days=10):
        self.recovery_days = recovery_days
        self.consecutive_wins = 0
        self.in_recovery = False

    def update(self, trade_pnl, current_dd_pct):
        if current_dd_pct > 10:
            self.in_recovery = True
            self.consecutive_wins = 0

        if not self.in_recovery:
            return 1.0

        if trade_pnl > 0:
            self.consecutive_wins += 1
        else:
            self.consecutive_wins = max(0, self.consecutive_wins - 2)

        # Graduate back: 25% -> 50% -> 75% -> 100%
        progress = min(self.consecutive_wins / self.recovery_days, 1.0)
        size_mult = 0.25 + 0.75 * progress

        if progress >= 1.0 and current_dd_pct < 5:
            self.in_recovery = False
            return 1.0

        return size_mult

recovery = RecoveryProtocol(recovery_days=8)
# After 3 consecutive wins in recovery mode:
for i in range(5):
    mult = recovery.update(trade_pnl=500, current_dd_pct=8)
    print(f"Win {i+1}: size multiplier = {mult:.0%}")`}
      </CodeBlock>

      <NoteBlock title="Drawdown Psychology">
        The hardest part of drawdown management is following the rules. When
        you are down 15% and see a great trade setup, the temptation to go
        big for recovery is immense. Automated drawdown managers remove this
        emotional override. Code the rules, trust the system.
      </NoteBlock>
    </SectionLayout>
  )
}
