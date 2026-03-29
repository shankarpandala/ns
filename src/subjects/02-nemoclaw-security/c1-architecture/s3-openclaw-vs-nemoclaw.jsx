import SectionLayout from '../../../components/content/SectionLayout'
import ComparisonTable from '../../../components/content/ComparisonTable'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OpenclawVsNemoclaw() {
  return (
    <SectionLayout
      title="OpenClaw vs NemoClaw"
      subtitle="Feature comparison between the open-source base and the trading-hardened NemoClaw distribution."
      difficulty="intermediate"
      readingMinutes={4}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        NemoClaw extends the open-source OpenClaw sandbox framework with trading-specific
        security features, exchange integrations, and financial compliance tooling.
      </p>

      <DefinitionBlock
        term="OpenClaw"
        definition="The open-source container sandboxing framework that provides basic process isolation, network filtering, and filesystem policies. Community-maintained and general-purpose."
        seeAlso={['NemoClaw', 'ClawGuard']}
      />

      <ComparisonTable
        title="Feature Comparison"
        headers={['Feature', 'OpenClaw', 'NemoClaw']}
        highlightDiffs
        rows={[
          ['Process isolation', 'Namespaces + cgroups', 'Namespaces + cgroups + seccomp-bpf'],
          ['Network policies', 'Basic allowlist/denylist', 'Exchange-aware egress + DNS filtering'],
          ['Secrets management', 'Environment variables', 'Encrypted vault with auto-rotation'],
          ['Filesystem policies', 'Read/write boundaries', 'Read/write + integrity hashing'],
          ['API key handling', 'Not included', 'Memory-only decryption, audit logging'],
          ['Exchange integrations', 'None', 'Zerodha, Delta Exchange, Binance presets'],
          ['Compliance logging', 'Basic stdout', 'Structured audit trail with timestamps'],
          ['Resource limits', 'cgroup v1', 'cgroup v2 with trading-tuned defaults'],
          ['Policy format', 'JSON', 'YAML with inheritance and templating'],
          ['Update mechanism', 'Manual', 'Signed releases with rollback'],
        ]}
      />

      <NoteBlock type="info" title="When to Use OpenClaw">
        If you are building a general-purpose sandbox without financial trading requirements,
        OpenClaw is lighter and simpler. NemoClaw adds overhead that is only justified when
        handling real money and exchange API credentials.
      </NoteBlock>

      <NoteBlock type="tip" title="Migration Path">
        NemoClaw is backward-compatible with OpenClaw policies. You can start with OpenClaw
        for learning and migrate to NemoClaw when you connect to live exchanges.
        Import existing policies with <code>nemoclaw policy import --from openclaw</code>.
      </NoteBlock>
    </SectionLayout>
  )
}
