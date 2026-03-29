import SectionLayout from '../../../components/content/SectionLayout'
import ComparisonTable from '../../../components/content/ComparisonTable'
import NoteBlock from '../../../components/content/NoteBlock'
import CodeBlock from '../../../components/content/CodeBlock'

export default function ModelSelection() {
  return (
    <SectionLayout
      title="Model Selection for Trading Tasks"
      subtitle="When to use Opus, Sonnet, and Haiku for different trading workflows"
      difficulty="intermediate"
      readingMinutes={5}
    >
      <ComparisonTable
        title="Model Comparison for Trading"
        headers={['Task', 'Recommended Model', 'Why']}
        rows={[
          ['Strategy code generation', 'Opus', 'Complex multi-file code needs deepest reasoning'],
          ['Real-time signal interpretation', 'Sonnet', 'Good balance of speed and accuracy'],
          ['Log parsing / data formatting', 'Haiku', 'Fast, cheap, sufficient for structured tasks'],
          ['Risk analysis / portfolio review', 'Opus', 'Nuanced reasoning about correlated risks'],
          ['Order validation checks', 'Haiku', 'Simple rule-based validation, speed matters'],
          ['Backtest result interpretation', 'Sonnet', 'Moderate complexity, needs good throughput'],
          ['Market research / news digest', 'Sonnet', 'Good summarization at reasonable cost'],
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Model Selection in Claude Code</h3>
      <CodeBlock
        language="bash"
        code={`# Default model (Sonnet) -- good for most tasks
claude "Generate a moving average crossover signal"

# Opus for complex reasoning
claude --model opus "Design a multi-leg options strategy for \\
  NIFTY with delta-neutral positioning and vega exposure"

# Haiku for quick structured tasks
claude --model haiku "Parse this CSV and return JSON: $(head -5 ticks.csv)"`}
      />

      <NoteBlock type="tip" title="Cost-Effective Model Routing">
        <p>Build a simple routing layer: send the task description to Haiku first and ask it to
        classify complexity as low/medium/high. Route low to Haiku, medium to Sonnet, high to Opus.
        This can cut costs by 40-60% while maintaining quality where it matters.</p>
      </NoteBlock>

      <NoteBlock type="info" title="Token Usage Impact">
        <p>Opus uses roughly 5x the rate limit quota compared to Haiku for the same token count.
        For continuous market monitoring, prefer Sonnet or Haiku to preserve your daily budget for
        complex analytical tasks that genuinely need Opus.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
