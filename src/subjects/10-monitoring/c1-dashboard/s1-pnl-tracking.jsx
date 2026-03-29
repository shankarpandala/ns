import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PnlTracking() {
  return (
    <SectionLayout
      title="Real-Time P&L & Greeks Display"
      description="Live portfolio P&L tracking with options Greeks for risk monitoring."
    >
      <DefinitionBlock term="Portfolio Greeks">
        Aggregate delta, gamma, theta, and vega across all options positions.
        Portfolio delta shows net directional exposure; theta shows daily time
        decay income or cost.
      </DefinitionBlock>

      <CodeBlock language="python" title="Real-Time P&L Tracker">
{`from dataclasses import dataclass
from datetime import datetime

@dataclass
class PortfolioSnapshot:
    timestamp: datetime
    realized_pnl: float
    unrealized_pnl: float
    total_pnl: float
    net_delta: float
    net_gamma: float
    net_theta: float
    net_vega: float

class PnLTracker:
    """Track real-time P&L with Greeks aggregation."""

    def __init__(self, broker, greeks_engine):
        self.broker = broker
        self.greeks = greeks_engine
        self.snapshots = []

    def compute_snapshot(self):
        positions = self.broker.positions()['net']
        realized = sum(p.get('realised', 0) for p in positions)
        unrealized = sum(p.get('unrealised', 0) for p in positions)

        # Aggregate Greeks for options positions
        net_delta = net_gamma = net_theta = net_vega = 0
        for pos in positions:
            if pos['quantity'] == 0:
                continue
            if self._is_option(pos['tradingsymbol']):
                g = self.greeks.calculate(
                    symbol=pos['tradingsymbol'],
                    spot=pos['last_price'],
                    qty=pos['quantity'],
                )
                net_delta += g['delta']
                net_gamma += g['gamma']
                net_theta += g['theta']
                net_vega += g['vega']
            else:
                # Futures/equity delta = quantity
                net_delta += pos['quantity']

        snapshot = PortfolioSnapshot(
            timestamp=datetime.now(),
            realized_pnl=realized,
            unrealized_pnl=unrealized,
            total_pnl=realized + unrealized,
            net_delta=round(net_delta, 2),
            net_gamma=round(net_gamma, 4),
            net_theta=round(net_theta, 2),
            net_vega=round(net_vega, 2),
        )
        self.snapshots.append(snapshot)
        return snapshot

    def _is_option(self, symbol):
        return symbol.endswith('CE') or symbol.endswith('PE')

    def intraday_high_low(self):
        pnls = [s.total_pnl for s in self.snapshots]
        return {'high': max(pnls), 'low': min(pnls), 'current': pnls[-1]}`}
      </CodeBlock>

      <NoteBlock title="Greeks Dashboard Priority">
        For options sellers, display theta prominently -- it is your daily
        income. Monitor net delta to stay direction-neutral. A sudden gamma
        spike means your delta will change rapidly with market moves, requiring
        immediate hedging attention.
      </NoteBlock>
    </SectionLayout>
  )
}
