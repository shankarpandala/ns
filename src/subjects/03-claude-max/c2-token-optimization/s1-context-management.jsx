import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ContextManagement() {
  return (
    <SectionLayout
      title="Context Window Strategies"
      subtitle="Managing the 200K context window for long-running trading sessions"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <DefinitionBlock
        term="Context Window"
        definition="The maximum number of tokens (input + output) a model can process in a single conversation turn. Claude's 200K window is roughly 150K words."
        example="A full day of 1-minute NIFTY OHLCV data (~375 rows) uses about 8K tokens in CSV format."
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Strategy 1: Summarize and Rotate</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
        Instead of keeping raw market data in context, periodically summarize it and discard the raw data.
      </p>
      <CodeBlock
        language="python"
        title="Conversation compression pattern"
        code={`def compress_market_context(raw_data, claude_client):
    """Summarize raw tick data into key levels and patterns."""
    summary = claude_client.message(
        model="claude-sonnet-4-20250514",
        messages=[{
            "role": "user",
            "content": f"""Compress this market data into key levels:
- Support/resistance levels
- Volume-weighted average price
- Key pattern formations
Data: {raw_data[:5000]}"""
        }],
        max_tokens=500
    )
    return summary.content[0].text`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Strategy 2: Sliding Window</h3>
      <CodeBlock
        language="python"
        title="Keep only recent N messages"
        code={`class TradingConversation:
    def __init__(self, max_messages=20):
        self.messages = []
        self.system_context = ""  # Always retained
        self.max_messages = max_messages

    def add_message(self, role, content):
        self.messages.append({"role": role, "content": content})
        if len(self.messages) > self.max_messages:
            # Keep first 2 (setup) + last N messages
            self.messages = self.messages[:2] + \\
                self.messages[-(self.max_messages - 2):]`}
      />

      <NoteBlock type="tip" title="Pre-Format Data Before Sending">
        <p>Convert DataFrames to compact formats before sending to Claude.
        Use <code>df.to_csv(index=False)</code> instead of <code>df.to_string()</code> --
        CSV uses 30-50% fewer tokens than the default pandas string format.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
