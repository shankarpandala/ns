import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function AnalystAgents() {
  return (
    <SectionLayout
      title="Technical, Fundamental & Sentiment Analyst Agents"
      description="Building specialized AI agents that analyze markets from different perspectives."
    >
      <DefinitionBlock term="Analyst Agent">
        An AI agent specialized in one analysis domain. Each agent independently
        evaluates a trading opportunity and provides a structured opinion with
        conviction level, which is then aggregated for final decisions.
      </DefinitionBlock>

      <CodeBlock language="python" title="Analyst Agent Framework">
{`from dataclasses import dataclass
from enum import Enum

class Conviction(Enum):
    STRONG_BULL = 2
    BULL = 1
    NEUTRAL = 0
    BEAR = -1
    STRONG_BEAR = -2

@dataclass
class AgentOpinion:
    agent: str
    conviction: Conviction
    reasoning: str
    confidence: float  # 0 to 1

class TechnicalAgent:
    def analyze(self, candles, indicators):
        signals = []
        if indicators['ema_20'] > indicators['ema_50']:
            signals.append('bullish_ema_cross')
        if indicators['rsi'] < 30:
            signals.append('oversold')
        elif indicators['rsi'] > 70:
            signals.append('overbought')
        if indicators['macd_hist'] > 0:
            signals.append('bullish_macd')

        bull_count = sum(1 for s in signals if 'bullish' in s or 'oversold' in s)
        bear_count = sum(1 for s in signals if 'bearish' in s or 'overbought' in s)

        if bull_count >= 2:
            conv = Conviction.BULL
        elif bear_count >= 2:
            conv = Conviction.BEAR
        else:
            conv = Conviction.NEUTRAL

        return AgentOpinion(
            agent='Technical',
            conviction=conv,
            reasoning=f"Signals: {', '.join(signals)}",
            confidence=0.7
        )

class FundamentalAgent:
    def analyze(self, financials):
        score = 0
        if financials.get('pe_ratio', 25) < 20:
            score += 1
        if financials.get('roe', 10) > 15:
            score += 1
        if financials.get('debt_equity', 1) < 0.5:
            score += 1
        if financials.get('earnings_growth', 0) > 15:
            score += 1

        conv = Conviction.BULL if score >= 3 else \
               Conviction.BEAR if score <= 1 else Conviction.NEUTRAL

        return AgentOpinion(
            agent='Fundamental', conviction=conv,
            reasoning=f"Score: {score}/4", confidence=0.6
        )

class SentimentAgent:
    def analyze(self, news_sentiment, fii_data, options_pcr):
        factors = []
        if news_sentiment > 0.3:
            factors.append('positive_news')
        if fii_data.get('net_buy', 0) > 1000:
            factors.append('fii_buying')
        if options_pcr > 1.2:
            factors.append('bullish_pcr')

        conv = Conviction.BULL if len(factors) >= 2 else Conviction.NEUTRAL
        return AgentOpinion(
            agent='Sentiment', conviction=conv,
            reasoning=f"Factors: {factors}", confidence=0.5
        )`}
      </CodeBlock>

      <NoteBlock title="Agent Design Principle">
        Each agent should be independently testable and have a clear domain
        boundary. The technical agent never looks at fundamentals, and vice
        versa. This separation prevents overfitting and allows you to
        measure each agent's predictive contribution independently.
      </NoteBlock>
    </SectionLayout>
  )
}
