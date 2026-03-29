import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function BasisTrading() {
  return (
    <SectionLayout
      title="Crypto Futures Basis Trading"
      description="Exploiting the premium between spot and futures on Delta Exchange."
    >
      <DefinitionBlock term="Basis">
        The difference between the futures price and the spot price. In crypto,
        futures often trade at a premium (contango) due to bullish sentiment
        and funding costs. Basis trading captures this premium market-neutrally.
      </DefinitionBlock>

      <CodeBlock language="python" title="Basis Trading Strategy on Delta Exchange">
{`import pandas as pd
import numpy as np

def calculate_basis(spot_price, futures_price, days_to_expiry):
    """Calculate annualized basis for crypto futures."""
    raw_basis = futures_price - spot_price
    basis_pct = (raw_basis / spot_price) * 100
    annualized = basis_pct * (365 / max(days_to_expiry, 1))
    return {
        'raw_basis': raw_basis,
        'basis_pct': basis_pct,
        'annualized_pct': annualized
    }

def basis_trade_signal(basis_history, entry_threshold=15,
                       exit_threshold=3):
    """Signal when annualized basis exceeds threshold."""
    signals = []
    for i, row in basis_history.iterrows():
        if row['annualized_pct'] > entry_threshold:
            signals.append({
                'time': row['time'],
                'action': 'enter',
                'strategy': 'sell_futures_buy_spot',
                'basis': row['annualized_pct']
            })
        elif row['annualized_pct'] < exit_threshold:
            signals.append({
                'time': row['time'],
                'action': 'exit',
                'basis': row['annualized_pct']
            })
    return signals

# Example: BTC quarterly futures on Delta Exchange
basis = calculate_basis(
    spot_price=67500, futures_price=69200, days_to_expiry=45
)
print(f"Raw basis: \${basis['raw_basis']:,.0f}")
print(f"Basis: {basis['basis_pct']:.2f}%")
print(f"Annualized: {basis['annualized_pct']:.1f}%")`}
      </CodeBlock>

      <CodeBlock language="python" title="Delta Exchange Basis Monitor">
{`class BasisMonitor:
    def __init__(self, threshold=15):
        self.threshold = threshold
        self.positions = {}

    def check(self, symbol, spot, futures, days_exp):
        b = calculate_basis(spot, futures, days_exp)
        if b['annualized_pct'] > self.threshold and symbol not in self.positions:
            self.positions[symbol] = b
            print(f"TRADE: Short {symbol} futures, long spot "
                  f"@ {b['annualized_pct']:.1f}% annualized")
        return b

monitor = BasisMonitor(threshold=12)
monitor.check('BTCUSD', 67500, 69200, 45)
monitor.check('ETHUSD', 3500, 3580, 45)`}
      </CodeBlock>

      <NoteBlock title="Basis Trading Risks">
        Crypto basis can widen before converging, causing mark-to-market
        losses on the short futures leg. Ensure sufficient margin (3x the
        basis) to avoid liquidation. Delta Exchange quarterly futures
        settle to TWAP of spot index, ensuring eventual convergence.
      </NoteBlock>
    </SectionLayout>
  )
}
