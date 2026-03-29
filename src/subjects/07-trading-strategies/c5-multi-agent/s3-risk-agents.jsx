import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function RiskAgents() {
  return (
    <SectionLayout
      title="Risk Management Agents"
      description="Agents with different risk appetites that size positions and set stops."
    >
      <DefinitionBlock term="Risk Agent">
        An agent that determines position sizing, stop-loss, and take-profit
        levels based on its risk personality. Running multiple risk agents
        in parallel gives a range of position sizes from which the portfolio
        manager selects.
      </DefinitionBlock>

      <CodeBlock language="python" title="Risk Agent Implementations">
{`from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class RiskParams:
    position_pct: float     # % of capital to deploy
    stop_loss_pct: float    # SL as % from entry
    take_profit_pct: float  # TP as % from entry
    max_drawdown_pct: float # Kill switch threshold
    risk_per_trade_pct: float

class RiskAgent(ABC):
    @abstractmethod
    def calculate(self, capital, entry_price, volatility, conviction):
        pass

class AggressiveAgent(RiskAgent):
    def calculate(self, capital, entry_price, volatility, conviction):
        risk_pct = min(3.0 * conviction, 5.0)
        sl = volatility * 1.5
        tp = volatility * 4.0

        position_value = (capital * risk_pct / 100) / (sl / 100)
        position_pct = (position_value / capital) * 100

        return RiskParams(
            position_pct=min(position_pct, 30),
            stop_loss_pct=sl,
            take_profit_pct=tp,
            max_drawdown_pct=15,
            risk_per_trade_pct=risk_pct
        )

class ConservativeAgent(RiskAgent):
    def calculate(self, capital, entry_price, volatility, conviction):
        risk_pct = min(0.5 * conviction, 1.0)
        sl = volatility * 2.5
        tp = volatility * 3.0

        position_value = (capital * risk_pct / 100) / (sl / 100)
        position_pct = (position_value / capital) * 100

        return RiskParams(
            position_pct=min(position_pct, 10),
            stop_loss_pct=sl,
            take_profit_pct=tp,
            max_drawdown_pct=5,
            risk_per_trade_pct=risk_pct
        )

class NeutralAgent(RiskAgent):
    def calculate(self, capital, entry_price, volatility, conviction):
        risk_pct = min(1.5 * conviction, 2.5)
        sl = volatility * 2.0
        tp = volatility * 3.5

        position_value = (capital * risk_pct / 100) / (sl / 100)
        position_pct = (position_value / capital) * 100

        return RiskParams(
            position_pct=min(position_pct, 20),
            stop_loss_pct=sl,
            take_profit_pct=tp,
            max_drawdown_pct=10,
            risk_per_trade_pct=risk_pct
        )

# Compare all three agents
capital = 1_000_000  # Rs 10 lakh
for Agent, name in [(AggressiveAgent, 'Aggressive'),
                     (ConservativeAgent, 'Conservative'),
                     (NeutralAgent, 'Neutral')]:
    params = Agent().calculate(capital, 22500, volatility=1.2, conviction=0.8)
    print(f"{name:15s} | Position: {params.position_pct:.1f}% "
          f"SL: {params.stop_loss_pct:.1f}% TP: {params.take_profit_pct:.1f}%")`}
      </CodeBlock>

      <NoteBlock title="Selecting the Right Risk Agent">
        Use the conservative agent during high-VIX environments and earnings
        seasons. Switch to aggressive only when conviction is high and
        multiple analyst agents agree. The neutral agent is the default for
        most trades on Nifty futures.
      </NoteBlock>
    </SectionLayout>
  )
}
