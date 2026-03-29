import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function BullBearDebate() {
  return (
    <SectionLayout
      title="Bull/Bear Debate Framework"
      description="Structured adversarial analysis for higher-quality trade decisions."
    >
      <DefinitionBlock term="Bull/Bear Debate">
        Two agents argue opposing sides of a trade. The bull presents the
        case for going long, the bear argues for short/avoid. A judge agent
        evaluates both arguments and makes the final call. This reduces
        confirmation bias.
      </DefinitionBlock>

      <CodeBlock language="python" title="Debate Framework Implementation">
{`from dataclasses import dataclass, field

@dataclass
class Argument:
    side: str
    points: list
    evidence: list
    conviction: float

@dataclass
class DebateResult:
    winner: str
    score: float
    summary: str
    trade_recommendation: str

class BullAgent:
    def argue(self, data):
        points = []
        evidence = []

        if data.get('trend') == 'up':
            points.append("Primary trend is bullish")
            evidence.append(f"Price above 200 EMA: {data.get('price_vs_200ema')}")
        if data.get('fii_buying', False):
            points.append("Institutional support via FII buying")
            evidence.append(f"FII net: Rs {data.get('fii_net_cr', 0):,} Cr")
        if data.get('rsi', 50) < 40:
            points.append("RSI showing oversold -- bounce opportunity")
        if data.get('support_nearby', False):
            points.append("Strong support zone nearby limits downside")

        conviction = min(len(points) / 4, 1.0)
        return Argument('bull', points, evidence, conviction)

class BearAgent:
    def argue(self, data):
        points = []
        evidence = []

        if data.get('iv_rising', False):
            points.append("Rising IV signals increasing uncertainty")
        if data.get('volume_declining', False):
            points.append("Declining volume on rallies -- weak hands")
        if data.get('global_risk') == 'high':
            points.append("Global risk-off environment")
            evidence.append(f"VIX: {data.get('vix', 'N/A')}")
        if data.get('resistance_nearby', False):
            points.append("Approaching strong resistance zone")

        conviction = min(len(points) / 4, 1.0)
        return Argument('bear', points, evidence, conviction)

class JudgeAgent:
    def evaluate(self, bull_arg, bear_arg):
        bull_score = bull_arg.conviction * len(bull_arg.points)
        bear_score = bear_arg.conviction * len(bear_arg.points)
        net = bull_score - bear_score

        if net > 1.0:
            return DebateResult('bull', net, 'Strong bull case',
                               'BUY with full position')
        elif net > 0.3:
            return DebateResult('bull', net, 'Marginal bull edge',
                               'BUY with half position')
        elif net < -1.0:
            return DebateResult('bear', net, 'Strong bear case',
                               'SHORT or AVOID')
        elif net < -0.3:
            return DebateResult('bear', net, 'Marginal bear edge',
                               'REDUCE or hedge')
        else:
            return DebateResult('neutral', net, 'No clear edge',
                               'WAIT for clarity')

# Run debate on Nifty
data = {'trend': 'up', 'fii_buying': True, 'fii_net_cr': 2500,
        'rsi': 55, 'iv_rising': True, 'global_risk': 'medium',
        'resistance_nearby': True, 'volume_declining': False}

result = JudgeAgent().evaluate(BullAgent().argue(data), BearAgent().argue(data))
print(f"Winner: {result.winner} | Recommendation: {result.trade_recommendation}")`}
      </CodeBlock>

      <NoteBlock title="Debate Reduces Bias">
        Without the bear agent, traders tend to only see bullish signals.
        The structured debate forces both sides to present evidence. Log
        every debate outcome and actual result to calibrate agent weights
        over time.
      </NoteBlock>
    </SectionLayout>
  )
}
