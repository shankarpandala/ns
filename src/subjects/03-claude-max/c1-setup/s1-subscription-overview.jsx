import SectionLayout from '../../../components/content/SectionLayout'
import NoteBlock from '../../../components/content/NoteBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SubscriptionOverview() {
  return (
    <SectionLayout
      title="Claude Max Subscription Overview"
      subtitle="Understanding Claude Max tiers, API access, and rate limits for trading workflows"
      difficulty="beginner"
      readingMinutes={5}
    >
      <DefinitionBlock
        term="Claude Max"
        definition="Anthropic's premium subscription tier providing extended access to Claude models, higher rate limits, and Claude Code CLI access essential for building automated trading pipelines."
        example="A Claude Max 5x subscriber can run ~45x more messages than the free tier, enabling continuous market analysis sessions."
      />

      <ComparisonTable
        title="Claude Max Tier Comparison"
        headers={['Feature', 'Pro ($20/mo)', 'Max 5x ($100/mo)', 'Max 20x ($200/mo)']}
        rows={[
          ['Claude Code access', 'No', 'Yes', 'Yes'],
          ['Opus usage', 'Limited', '5x Pro', '20x Pro'],
          ['Context window', '200K', '200K', '200K'],
          ['Rate limits', 'Standard', 'Elevated', 'Highest'],
          ['Best for trading', 'Manual analysis', 'Semi-automated', 'Full automation'],
        ]}
      />

      <NoteBlock type="tip" title="Recommended Tier for NemoClaw">
        <p>For the NemoClaw Trading Sandbox, <strong>Max 5x</strong> is the sweet spot. It provides
        enough headroom for Claude Code agent workflows, market analysis sessions, and iterative
        strategy development without the premium of 20x.</p>
      </NoteBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2">Key Rate Limit Considerations</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li>Rate limits are per-account, not per-session -- parallel Claude Code instances share the same quota.</li>
        <li>Opus calls consume more quota than Sonnet or Haiku calls.</li>
        <li>Long context conversations (100K+ tokens) count toward usage faster.</li>
        <li>Rate limit resets occur on rolling windows, not fixed calendar periods.</li>
      </ul>

      <NoteBlock type="warning" title="API vs Claude Max">
        <p>Claude Max provides access through <strong>Claude Code CLI</strong> and the web interface.
        It is <em>not</em> the same as the Anthropic API (api.anthropic.com). For programmatic REST
        API access to embed in your trading bot, you need a separate API key with pay-per-token billing.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
