import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PortfolioManager() {
  return (
    <SectionLayout
      title="Portfolio Manager Agent"
      description="The final decision-maker that aggregates all agent inputs and approves trades."
    >
      <DefinitionBlock term="Portfolio Manager Agent">
        The top-level agent that receives opinions from analyst agents, risk
        parameters from risk agents, and debate outcomes. It makes the final
        go/no-go decision considering portfolio-level constraints like
        correlation, exposure limits, and drawdown state.
      </DefinitionBlock>

      <CodeBlock language="python" title="Portfolio Manager Agent">
{`from dataclasses import dataclass

@dataclass
class TradeProposal:
    symbol: str
    direction: str
    analyst_score: float   # -2 to +2
    risk_params: dict
    debate_winner: str

@dataclass
class TradeDecision:
    approved: bool
    symbol: str
    direction: str
    size_pct: float
    stop_loss: float
    take_profit: float
    reason: str

class PortfolioManagerAgent:
    def __init__(self, max_positions=5, max_exposure_pct=60,
                 max_correlation=0.7, drawdown_limit=10):
        self.max_positions = max_positions
        self.max_exposure = max_exposure_pct
        self.max_corr = max_correlation
        self.drawdown_limit = drawdown_limit
        self.positions = []

    def evaluate(self, proposal, portfolio_state):
        """Final approval decision for a trade."""
        reasons = []

        # Check position limit
        if len(self.positions) >= self.max_positions:
            return TradeDecision(False, proposal.symbol, proposal.direction,
                                0, 0, 0, "Max positions reached")

        # Check exposure limit
        current_exposure = portfolio_state.get('total_exposure_pct', 0)
        if current_exposure + proposal.risk_params['position_pct'] > self.max_exposure:
            reasons.append("Exposure limit would be exceeded")

        # Check drawdown state
        current_dd = portfolio_state.get('current_drawdown_pct', 0)
        if current_dd > self.drawdown_limit * 0.7:
            # Reduce size during drawdown
            size_mult = 0.5
            reasons.append("Reduced size: in drawdown")
        else:
            size_mult = 1.0

        # Check correlation with existing positions
        for pos in self.positions:
            corr = portfolio_state.get('correlations', {}).get(
                (pos['symbol'], proposal.symbol), 0)
            if abs(corr) > self.max_corr:
                reasons.append(f"High correlation with {pos['symbol']}")

        # Minimum conviction threshold
        if abs(proposal.analyst_score) < 0.5:
            return TradeDecision(False, proposal.symbol, proposal.direction,
                                0, 0, 0, "Conviction too low")

        # Approve with adjusted size
        size = proposal.risk_params['position_pct'] * size_mult
        return TradeDecision(
            approved=True,
            symbol=proposal.symbol,
            direction=proposal.direction,
            size_pct=size,
            stop_loss=proposal.risk_params['stop_loss_pct'],
            take_profit=proposal.risk_params['take_profit_pct'],
            reason='; '.join(reasons) if reasons else 'All checks passed'
        )

pm = PortfolioManagerAgent()
proposal = TradeProposal('NIFTY', 'long', 1.5,
                         {'position_pct': 15, 'stop_loss_pct': 1.2,
                          'take_profit_pct': 3.5}, 'bull')
decision = pm.evaluate(proposal, {'total_exposure_pct': 20,
                                   'current_drawdown_pct': 3})
print(f"Approved: {decision.approved} | Size: {decision.size_pct}%")
print(f"Reason: {decision.reason}")`}
      </CodeBlock>

      <NoteBlock title="PM Agent Best Practices">
        The PM agent should be the most conservative filter. Even with
        strong analyst conviction, reject trades that violate portfolio
        constraints. Log every decision (approved and rejected) to build
        a track record for agent performance evaluation.
      </NoteBlock>
    </SectionLayout>
  )
}
