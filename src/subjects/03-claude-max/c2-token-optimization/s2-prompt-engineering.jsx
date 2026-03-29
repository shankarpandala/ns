import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function PromptEngineering() {
  return (
    <SectionLayout
      title="Prompt Engineering for Trading"
      subtitle="Crafting effective prompts for market analysis and trading decisions"
      difficulty="intermediate"
      readingMinutes={7}
    >
      <h3 className="text-lg font-semibold mb-2">Structured Market Analysis Prompt</h3>
      <CodeBlock
        language="python"
        title="System prompt for a trading analyst agent"
        code={`ANALYST_SYSTEM = """You are a quantitative trading analyst for Indian markets.

Rules:
- Always state your confidence level (low/medium/high)
- Cite specific price levels and volumes
- Never recommend naked options selling
- If data is insufficient, say so explicitly
- All times are IST (UTC+5:30)

Output format (JSON):
{
  "bias": "bullish|bearish|neutral",
  "confidence": "low|medium|high",
  "key_levels": {"support": [], "resistance": []},
  "signals": [{"indicator": "", "reading": "", "interpretation": ""}],
  "action": "buy|sell|hold|wait",
  "reasoning": ""
}"""`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Few-Shot Pattern for Signal Classification</h3>
      <CodeBlock
        language="python"
        title="Few-shot prompt for consistent outputs"
        code={`SIGNAL_PROMPT = """Classify the trading signal from market data.

Example 1:
Input: RSI=28, MACD crossover bearish, Price below 200 EMA
Output: {"signal": "oversold_bounce", "strength": 0.6, "timeframe": "intraday"}

Example 2:
Input: RSI=72, Volume spike 3x avg, Price at resistance
Output: {"signal": "reversal_short", "strength": 0.7, "timeframe": "swing"}

Now classify:
Input: {market_data}
Output:"""`}
      />

      <NoteBlock type="tip" title="Force JSON Output">
        <p>End your prompt with <code>Output:</code> followed by an opening brace in an assistant
        prefill message. This forces Claude to continue in JSON format, reducing parsing failures
        in your trading pipeline.</p>
      </NoteBlock>

      <CodeBlock
        language="python"
        title="Assistant prefill trick"
        code={`response = client.messages.create(
    model="claude-sonnet-4-20250514",
    messages=[
        {"role": "user", "content": analysis_prompt},
        {"role": "assistant", "content": "{"}  # Prefill forces JSON
    ],
    max_tokens=300
)
result = json.loads("{" + response.content[0].text)`}
      />

      <NoteBlock type="warning" title="Prompt Injection Risk">
        <p>Never embed raw market news or user-generated content directly into system prompts.
        Always sanitize external text and place it in user messages with clear delimiters.
        See Section C4 on security for details.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
