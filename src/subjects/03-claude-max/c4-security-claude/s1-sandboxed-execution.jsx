import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function SandboxedExecution() {
  return (
    <SectionLayout
      title="Running Claude in the NemoClaw Sandbox"
      subtitle="Isolating Claude Code execution to prevent unauthorized access"
      difficulty="advanced"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">Filesystem Isolation</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
        Claude Code can read, write, and execute files. Restrict its access to only the project
        directory and approved data paths.
      </p>

      <CodeBlock
        language="json"
        title=".claude/settings.json -- Permission boundaries"
        code={`{
  "permissions": {
    "allow": [
      "Bash(cd ~/nemoclaw*)",
      "Bash(python3 ~/nemoclaw/*)",
      "Bash(cat ~/nemoclaw/data/*)",
      "Read(~/nemoclaw/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(*curl*api.kite*order*)",
      "Bash(*pip install*)",
      "Bash(sudo *)"
    ]
  }
}`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Network Isolation with iptables</h3>
      <CodeBlock
        language="bash"
        title="Restrict outbound connections from sandbox"
        code={`# Allow only Anthropic API and specific exchange endpoints
sudo iptables -A OUTPUT -m owner --uid-owner nemoclaw -d api.anthropic.com -j ACCEPT
sudo iptables -A OUTPUT -m owner --uid-owner nemoclaw -d api.kite.trade -j ACCEPT
sudo iptables -A OUTPUT -m owner --uid-owner nemoclaw -d cdn.deltaex.org -j ACCEPT
sudo iptables -A OUTPUT -m owner --uid-owner nemoclaw -j DROP`}
      />

      <WarningBlock title="Never Run Claude as Root">
        Claude Code should always run under a non-root user with minimal permissions.
        Create a dedicated <code>nemoclaw</code> user for sandbox execution.
      </WarningBlock>

      <NoteBlock type="tip" title="Docker Alternative">
        <p>For stronger isolation, run Claude Code inside a Docker container with
        mounted volumes for data and read-only bind mounts for strategy code. This prevents
        any filesystem escape.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
