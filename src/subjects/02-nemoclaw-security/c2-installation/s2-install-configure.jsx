import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import StepByStep from '../../../components/content/StepByStep'

export default function InstallConfigure() {
  return (
    <SectionLayout
      title="Install & Configure NemoClaw"
      subtitle="Step-by-step installation and initial configuration of the NemoClaw trading sandbox."
      difficulty="intermediate"
      readingMinutes={6}
    >
      <StepByStep
        title="Installation Steps"
        steps={[
          {
            title: 'Clone the NemoClaw repository',
            content: <CodeBlock code={`git clone git@github.com:nemoclaw/nemoclaw.git ~/nemoclaw
cd ~/nemoclaw
git checkout v2.1-stable`} language="bash" />,
          },
          {
            title: 'Run the installer',
            content: <CodeBlock code={`# The installer sets up ClawGuard, NemoShell, and default policies
chmod +x install.sh
sudo ./install.sh --with-trading-presets

# Expected output:
# [OK] ClawGuard installed to /usr/local/bin/clawguard
# [OK] NemoShell runtime configured
# [OK] Default policies installed to /etc/nemoclaw/policies/
# [OK] Vault initialized at /var/lib/nemoclaw/vault/`} language="bash" />,
          },
          {
            title: 'Initialize the configuration',
            content: <CodeBlock code={`# Generate the main config file
nemoclaw init --profile trading

# This creates ~/.nemoclaw/config.yaml`} language="bash" />,
          },
          {
            title: 'Configure exchange presets',
            content: <CodeBlock code={`# Enable exchange-specific security presets
nemoclaw config set exchanges.zerodha.enabled true
nemoclaw config set exchanges.delta.enabled true`} language="bash" />,
          },
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Main Configuration</h3>
      <CodeBlock
        language="yaml"
        title="~/.nemoclaw/config.yaml"
        code={`runtime:
  shell: nemoshell
  container_engine: docker
  default_image: nemoclaw/trading-base:3.11

security:
  clawguard: true
  policy_dir: /etc/nemoclaw/policies
  audit_log: /var/log/nemoclaw/audit.log
  vault_path: /var/lib/nemoclaw/vault

network:
  egress_mode: allowlist
  dns_filtering: true

resources:
  default_memory: 2G
  default_cpus: 2
  max_containers: 10`}
      />

      <NoteBlock type="tip" title="Profile Templates">
        Use <code>nemoclaw init --profile</code> with different presets:
        <code className="block mt-1">trading</code> for live trading,
        <code className="block">backtest</code> for historical analysis (relaxed network),
        <code className="block">development</code> for strategy development (most permissive).
      </NoteBlock>

      <NoteBlock type="warning" title="Verify the Installer Hash">
        Always verify the installer before running it:
        <code className="block mt-1">sha256sum install.sh</code>
        Compare against the hash published in the GitHub release notes.
      </NoteBlock>
    </SectionLayout>
  )
}
