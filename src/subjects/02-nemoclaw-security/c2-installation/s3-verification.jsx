import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function Verification() {
  return (
    <SectionLayout
      title="Verification & Health Checks"
      subtitle="Confirm NemoClaw is correctly installed and all components are operational."
      difficulty="beginner"
      readingMinutes={4}
    >
      <h3 className="text-lg font-semibold mb-2">Version Check</h3>
      <CodeBlock
        language="bash"
        title="Verify installed components"
        code={`# Check NemoClaw CLI version
nemoclaw --version
# Expected: nemoclaw v2.1.x

# Check ClawGuard daemon
clawguard --version
clawguard status

# Check NemoShell runtime
nemoshell --version`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Run Built-in Health Checks</h3>
      <CodeBlock
        language="bash"
        title="Comprehensive health check"
        code={`nemoclaw doctor

# Expected output:
# [PASS] Docker Engine running (v24.0.7)
# [PASS] ClawGuard daemon active
# [PASS] Seccomp filters loaded
# [PASS] AppArmor profiles installed
# [PASS] Network policies active
# [PASS] Vault initialized and sealed
# [PASS] cgroup v2 enabled
# [PASS] Audit logging active
#
# All 8 checks passed. NemoClaw is ready.`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Test Sandbox Isolation</h3>
      <CodeBlock
        language="bash"
        title="Run isolation tests"
        code={`# Launch a test container with security policies applied
nemoclaw test --suite isolation

# This verifies:
# - Outbound connections to non-allowlisted hosts are blocked
# - Filesystem writes outside permitted paths fail
# - Privileged syscalls are rejected
# - Resource limits are enforced
# - Vault secrets are inaccessible from userspace`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Verify Audit Logging</h3>
      <CodeBlock
        language="bash"
        title="Check audit trail"
        code={`# View recent audit events
tail -20 /var/log/nemoclaw/audit.log

# Check for policy violations (should be empty on fresh install)
nemoclaw audit --filter violations --last 1h

# Verify log rotation is configured
cat /etc/logrotate.d/nemoclaw`}
      />

      <NoteBlock type="tip" title="Continuous Health Monitoring">
        Schedule periodic health checks with cron:
        <code className="block mt-1">echo "*/30 * * * * nemoclaw doctor --quiet || notify-send NemoClaw 'Health check failed'" | crontab -</code>
      </NoteBlock>

      <NoteBlock type="warning" title="Fix Failures Before Proceeding">
        Do not connect exchange API keys until all health checks pass. A misconfigured
        ClawGuard could leave your credentials exposed.
      </NoteBlock>
    </SectionLayout>
  )
}
