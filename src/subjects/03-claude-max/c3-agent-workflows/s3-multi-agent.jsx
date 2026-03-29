import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function MultiAgent() {
  return (
    <SectionLayout
      title="Multi-Agent Trading Orchestration"
      subtitle="Coordinating analyst, trader, and risk agents using Claude"
      difficulty="advanced"
      readingMinutes={7}
    >
      <h3 className="text-lg font-semibold mb-2">Agent Architecture</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Separate concerns into specialized agents: an <strong>Analyst</strong> that reads market data,
        a <strong>Trader</strong> that generates orders, and a <strong>Risk Manager</strong> that
        validates position sizing and exposure limits.
      </p>

      <CodeBlock
        language="python"
        title="Multi-agent orchestrator with Claude Agent SDK"
        code={`from claude_agent_sdk import Agent, tool

analyst = Agent(
    model="claude-sonnet-4-20250514",
    system="""You are a market analyst. Given market data, output:
    {"bias": "bullish|bearish|neutral", "confidence": 0.0-1.0,
     "key_levels": {...}, "reasoning": "..."}"""
)

trader = Agent(
    model="claude-sonnet-4-20250514",
    system="""You are a trade executor. Given analysis, output:
    {"action": "buy|sell|hold", "instrument": "", "qty": 0,
     "order_type": "limit|market", "price": 0.0}"""
)

risk_mgr = Agent(
    model="claude-haiku-3-5-20241022",
    system="""You are a risk manager. Validate the proposed trade:
    - Max position size: 2% of capital
    - Max daily loss: 1% of capital
    - No naked short options
    Output: {"approved": true|false, "reason": "..."}"""
)`}
      />

      <CodeBlock
        language="python"
        title="Orchestration loop"
        code={`async def trading_cycle(market_data, capital):
    # Step 1: Analyst reads market
    analysis = await analyst.run(
        f"Analyze this data: {market_data}"
    )

    # Step 2: Trader proposes action
    trade = await trader.run(
        f"Capital: {capital}. Analysis: {analysis}"
    )

    # Step 3: Risk manager validates
    verdict = await risk_mgr.run(
        f"Capital: {capital}. Proposed: {trade}"
    )

    if verdict.get("approved"):
        return trade  # Send to execution engine
    return None  # Trade rejected`}
      />

      <NoteBlock type="warning" title="Agent Consensus">
        <p>Never let a single agent both analyze and execute. The separation ensures that a
        hallucinated price level from the analyst does not directly trigger a real order.
        The risk manager acts as the final guardrail.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
