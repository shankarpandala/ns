import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function CostTracking() {
  return (
    <SectionLayout
      title="Cost Tracking and Budget Alerts"
      subtitle="Monitor token usage and set spending guardrails for trading AI"
      difficulty="beginner"
      readingMinutes={5}
    >
      <h3 className="text-lg font-semibold mb-2">Token Counter Wrapper</h3>
      <CodeBlock
        language="python"
        title="Track usage per trading session"
        code={`class TokenTracker:
    def __init__(self, daily_budget_usd=5.0):
        self.daily_budget = daily_budget_usd
        self.usage = {"input_tokens": 0, "output_tokens": 0}
        self.cost_per_1k = {  # Approximate USD per 1K tokens
            "opus": {"input": 0.015, "output": 0.075},
            "sonnet": {"input": 0.003, "output": 0.015},
            "haiku": {"input": 0.00025, "output": 0.00125},
        }

    def record(self, response, model="sonnet"):
        usage = response.usage
        self.usage["input_tokens"] += usage.input_tokens
        self.usage["output_tokens"] += usage.output_tokens

    def estimated_cost(self, model="sonnet"):
        rates = self.cost_per_1k[model]
        return (
            self.usage["input_tokens"] / 1000 * rates["input"] +
            self.usage["output_tokens"] / 1000 * rates["output"]
        )

    def check_budget(self, model="sonnet"):
        cost = self.estimated_cost(model)
        if cost > self.daily_budget * 0.8:
            raise BudgetWarning(f"80% budget used: \${cost:.2f}")
        return cost`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Claude Code Usage Check</h3>
      <CodeBlock
        language="bash"
        title="Monitor CLI usage"
        code={`# Check current session token usage
claude --usage

# View usage on the Anthropic dashboard
# https://console.anthropic.com/settings/usage`}
      />

      <WarningBlock title="Budget Discipline">
        Running Claude in a loop analyzing every tick will burn through your Max subscription
        quota quickly. Always batch requests -- analyze per-candle (1min/5min) rather than per-tick.
      </WarningBlock>

      <NoteBlock type="tip" title="Set Hard Limits">
        <p>Implement a circuit breaker: if estimated cost exceeds your daily budget, switch all
        calls to Haiku or disable non-essential analysis until the next reset window.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
