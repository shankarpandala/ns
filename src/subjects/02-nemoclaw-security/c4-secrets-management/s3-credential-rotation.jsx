import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function CredentialRotation() {
  return (
    <SectionLayout
      title="Credential Rotation"
      subtitle="Automate API key rotation and maintain audit logs for compliance."
      difficulty="advanced"
      readingMinutes={5}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Regular credential rotation limits the window of exposure if a key is compromised.
        NemoClaw supports automated rotation with zero-downtime container restarts.
      </p>

      <h3 className="text-lg font-semibold mb-2">Rotation Policy</h3>
      <CodeBlock
        language="yaml"
        title="/etc/nemoclaw/policies/rotation.yaml"
        code={`apiVersion: nemoclaw/v1
kind: RotationPolicy
metadata:
  name: trading-rotation

spec:
  secrets:
    zerodha/access_token:
      rotation_interval: 8h    # Kite tokens expire daily
      auto_rotate: true
      rotate_command: nemoclaw-kite-refresh
      notify_on_failure: true

    delta/api_key:
      rotation_interval: 30d
      auto_rotate: false        # Manual rotation with reminder
      notify_before_expiry: 7d

    db/password:
      rotation_interval: 90d
      auto_rotate: true
      rotate_command: nemoclaw-db-rotate

  notifications:
    channel: webhook
    url: http://localhost:9090/alerts`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Manual Rotation</h3>
      <CodeBlock
        language="bash"
        title="Rotate a credential"
        code={`# Rotate a specific secret
nemoclaw vault rotate zerodha/api_secret
# Prompts for new value, encrypts, and restarts affected containers

# Rotate with zero downtime (blue-green)
nemoclaw vault rotate zerodha/api_secret --zero-downtime
# Spins up new container with new key, drains old container, then removes it

# View rotation history
nemoclaw vault history zerodha/api_secret
# 2026-03-29T10:00:00Z rotated (auto)
# 2026-03-28T10:00:00Z rotated (auto)
# 2026-03-15T14:22:00Z rotated (manual)`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Audit Logging</h3>
      <CodeBlock
        language="bash"
        title="Review audit trail"
        code={`# View all secret access events
nemoclaw audit --type secret-access --last 7d

# Sample output:
# 2026-03-29T09:15:02Z READ  zerodha/api_key     container=order-executor
# 2026-03-29T09:15:02Z READ  zerodha/api_secret  container=order-executor
# 2026-03-29T10:00:01Z ROTATE zerodha/access_token auto=true
# 2026-03-29T10:00:03Z READ  zerodha/access_token container=order-executor

# Export audit log for compliance
nemoclaw audit export --format csv --output audit-march.csv`}
      />

      <NoteBlock type="warning" title="Kite Connect Token Expiry">
        Zerodha Kite access tokens expire daily. Configure auto-rotation with the
        <code> nemoclaw-kite-refresh</code> script to avoid trading interruptions during
        market hours.
      </NoteBlock>

      <NoteBlock type="tip" title="Test Rotation in Staging">
        Always test rotation in a paper-trading environment first:
        <code className="block mt-1">nemoclaw vault rotate --dry-run zerodha/api_secret</code>
      </NoteBlock>
    </SectionLayout>
  )
}
