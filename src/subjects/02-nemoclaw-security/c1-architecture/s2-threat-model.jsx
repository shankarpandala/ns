import SectionLayout from '../../../components/content/SectionLayout'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function ThreatModel() {
  return (
    <SectionLayout
      title="Trading System Threat Model"
      subtitle="Identify and classify threats specific to algorithmic trading: API key theft, data exfiltration, and code injection."
      difficulty="advanced"
      readingMinutes={6}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Trading systems face unique security threats because they combine financial credentials,
        real-time market data, and automated execution. A compromised bot can drain an account
        in seconds.
      </p>

      <WarningBlock title="Financial Risk">
        Unlike typical development environments, a security breach in a trading system
        has immediate financial consequences. API keys with withdrawal permissions
        are the highest-value target.
      </WarningBlock>

      <ComparisonTable
        title="Threat Classification"
        headers={['Threat', 'Impact', 'NemoClaw Mitigation']}
        rows={[
          ['API key exfiltration', 'Full account drain, unauthorized trades', 'Encrypted vault + memory-only decryption'],
          ['Data exfiltration', 'Strategy IP theft, position exposure', 'Egress allowlists, DNS filtering'],
          ['Code injection', 'Arbitrary execution, privilege escalation', 'Seccomp filters, read-only mounts'],
          ['Supply chain attack', 'Malicious pip/npm packages', 'Network policy + hash verification'],
          ['Side-channel leaks', 'Timing attacks on order flow', 'Process isolation, dedicated cgroups'],
        ]}
      />

      <DefinitionBlock
        term="Egress Control"
        definition="Restricting outbound network connections to a predefined allowlist of endpoints. Prevents compromised code from sending data to unauthorized servers."
        example="Only api.kite.trade and api.delta.exchange are permitted; all other outbound connections are dropped."
        seeAlso={['Network Policies', 'DNS Filtering']}
      />

      <DefinitionBlock
        term="Blast Radius"
        definition="The extent of damage a single compromised component can cause. NemoClaw minimizes blast radius through container isolation and least-privilege policies."
        example="A compromised data-feed container cannot access the order execution container's API keys."
      />

      <NoteBlock type="tip" title="Threat Modeling Practice">
        Review your threat model whenever you add a new exchange integration, expose a
        new port, or install a new dependency. Each change can introduce new attack vectors.
      </NoteBlock>
    </SectionLayout>
  )
}
