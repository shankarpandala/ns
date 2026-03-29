import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function TwoComponentDesign() {
  return (
    <SectionLayout
      title="Two-Component Design"
      subtitle="NemoShell provides the execution environment while ClawGuard enforces security boundaries."
      difficulty="intermediate"
      readingMinutes={5}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        NemoClaw separates concerns into two distinct components that work together to create
        a secure sandbox for trading operations. This separation ensures that security
        enforcement cannot be bypassed by application-level code.
      </p>

      <DefinitionBlock
        term="NemoShell"
        definition="The execution environment where trading bots, strategies, and data pipelines run. It provides a containerized runtime with controlled access to system resources."
        example="Your Python strategy script runs inside NemoShell with access only to approved network endpoints and file paths."
      />

      <DefinitionBlock
        term="ClawGuard"
        definition="The security enforcement layer that sits between NemoShell and the host system. It intercepts system calls, network requests, and file operations to enforce security policies."
        example="ClawGuard blocks an outbound connection to an unapproved IP, even if the trading bot code explicitly tries to connect."
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">Architecture Overview</h3>
      <CodeBlock
        language="bash"
        title="Component interaction"
        code={`# NemoClaw Architecture (simplified)
#
# ┌─────────────────────────────────┐
# │  Trading Bot / Strategy Code    │  ← Your code runs here
# ├─────────────────────────────────┤
# │         NemoShell               │  ← Execution runtime
# │  (Container + Resource Mgmt)    │
# ├─────────────────────────────────┤
# │         ClawGuard               │  ← Security enforcement
# │  (Syscall filter + Net policy)  │
# ├─────────────────────────────────┤
# │     Host OS (WSL2 Ubuntu)       │
# └─────────────────────────────────┘`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">How They Communicate</h3>
      <CodeBlock
        language="yaml"
        title="ClawGuard policy enforcement"
        code={`# ClawGuard intercepts via:
# 1. seccomp-bpf filters (syscall level)
# 2. iptables/nftables rules (network level)
# 3. AppArmor profiles (filesystem level)
# 4. cgroup controllers (resource level)

# NemoShell reports to ClawGuard via Unix socket:
clawguard_socket: /var/run/clawguard/control.sock
nemoshell_runtime: containerd`}
      />

      <NoteBlock type="info" title="Defense in Depth">
        ClawGuard enforces policies at the kernel level, not the application level.
        Even if a trading bot is compromised, it cannot escalate privileges or
        exfiltrate data beyond the defined security boundary.
      </NoteBlock>
    </SectionLayout>
  )
}
