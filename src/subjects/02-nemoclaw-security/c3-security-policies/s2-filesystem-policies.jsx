import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function FilesystemPolicies() {
  return (
    <SectionLayout
      title="Filesystem Policies"
      subtitle="Define read/write boundaries and protected paths to prevent unauthorized data access."
      difficulty="intermediate"
      readingMinutes={5}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Filesystem policies control which paths a trading container can read from and write to.
        By default, NemoClaw mounts strategy code as read-only and provides specific writable
        directories for data output and logs.
      </p>

      <CodeBlock
        language="yaml"
        title="/etc/nemoclaw/policies/filesystem.yaml"
        code={`apiVersion: nemoclaw/v1
kind: FilesystemPolicy
metadata:
  name: trading-fs
  description: Filesystem boundaries for trading containers

spec:
  # Read-only mounts (code and config)
  readonly:
    - /app/strategies
    - /app/config
    - /etc/nemoclaw/policies
    - /usr/lib
    - /usr/bin

  # Writable paths (data output only)
  writable:
    - /app/data
    - /app/logs
    - /tmp

  # Completely blocked paths
  denied:
    - /var/lib/nemoclaw/vault
    - /etc/shadow
    - /root
    - /proc/kcore
    - /sys/firmware

  # Integrity monitoring (alert on unexpected changes)
  integrity_check:
    - path: /app/strategies
      hash_algorithm: sha256
      check_interval: 60s`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Apply and Verify</h3>
      <CodeBlock
        language="bash"
        title="Filesystem policy commands"
        code={`# Apply filesystem policy
nemoclaw policy apply /etc/nemoclaw/policies/filesystem.yaml

# Test read-only enforcement
nemoclaw exec -- touch /app/strategies/test.py
# Expected: Read-only file system

# Test writable paths
nemoclaw exec -- touch /app/data/test.csv
# Expected: Success

# Test denied paths
nemoclaw exec -- cat /var/lib/nemoclaw/vault/master.key
# Expected: Permission denied

# View integrity check status
nemoclaw integrity status`}
      />

      <NoteBlock type="important" title="Strategy Code Protection">
        Mounting strategies as read-only prevents a compromised process from modifying
        your trading logic. A tampered strategy could place malicious orders. Always
        use integrity hashing on strategy directories.
      </NoteBlock>

      <NoteBlock type="tip" title="Temporary Exceptions">
        During development, temporarily relax filesystem policies:
        <code className="block mt-1">nemoclaw exec --policy-override fs.writable+=/app/strategies -- bash</code>
        This is logged as a policy override in the audit trail.
      </NoteBlock>
    </SectionLayout>
  )
}
