import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function CircuitBreakers() {
  return (
    <SectionLayout
      title="Circuit Breakers & Price Bands"
      description="Modeling NSE index circuit breakers and stock-level price bands in backtests."
    >
      <DefinitionBlock term="Market-Wide Circuit Breaker (MWCB)">
        SEBI mandates trading halts when Nifty 50 or Sensex moves beyond defined
        thresholds from the previous close. Triggers at 10%, 15%, and 20% levels
        with varying halt durations based on time of day.
      </DefinitionBlock>

      <ComparisonTable
        title="MWCB Trigger Levels"
        headers={['Movement', 'Before 1:00 PM', '1:00-2:30 PM', 'After 2:30 PM']}
        rows={[
          ['10%', '45 min halt', '15 min halt', 'No halt'],
          ['15%', '1h 45m halt', '45 min halt', 'Remainder of day'],
          ['20%', 'Remainder of day', 'Remainder of day', 'Remainder of day'],
        ]}
      />

      <CodeBlock language="python" title="Circuit Breaker Simulation">
{`class CircuitBreakerSimulator:
    """Check and enforce circuit breaker rules in backtest."""

    STOCK_BANDS = {
        'group_a': 0.20,  # 20% for liquid stocks
        'group_b': 0.10,  # 10% for less liquid
        'group_sm': 0.05, # 5% for SME stocks
    }

    def __init__(self, prev_close_nifty: float):
        self.prev_close = prev_close_nifty
        self.halted = False
        self.halt_end = None

    def check_index_circuit(self, current_price, current_time):
        change_pct = abs(current_price - self.prev_close) / self.prev_close

        if change_pct >= 0.20:
            self.halted = True
            return "HALT_FULL_DAY"
        elif change_pct >= 0.15:
            self.halted = True
            return "HALT_15PCT"
        elif change_pct >= 0.10:
            self.halted = True
            return "HALT_10PCT"
        return None

    def check_stock_band(self, price, prev_close, group='group_a'):
        band = self.STOCK_BANDS[group]
        upper = prev_close * (1 + band)
        lower = prev_close * (1 - band)
        return lower <= price <= upper`}
      </CodeBlock>

      <NoteBlock title="Backtest Accuracy">
        Ignoring circuit breakers in backtests inflates returns for momentum
        strategies. On days like the March 2020 COVID crash, MWCB triggered
        multiple times. Your backtest should halt order generation during
        circuit breaks to produce realistic results.
      </NoteBlock>
    </SectionLayout>
  )
}
