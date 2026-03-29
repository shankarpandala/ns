import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ProcessIsolation() {
  return (
    <SectionLayout
      title="Process Isolation"
      subtitle="Resource limits, cgroups, and namespace isolation for trading containers."
      difficulty="advanced"
      readingMinutes={5}
    >
      <DefinitionBlock
        term="Linux Namespaces"
        definition="Kernel feature that partitions system resources so each container sees its own isolated view of PIDs, network, mounts, and users."
        example="A trading bot in PID namespace 1 cannot see or signal processes in PID namespace 2."
      />

      <DefinitionBlock
        term="cgroups v2"
        definition="Control groups that limit and account for CPU, memory, I/O, and other resources per container. Prevents a single container from starving others."
        example="Limiting a backtest container to 4 GB RAM prevents it from swapping out the live trading bot."
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">Resource Limits Policy</h3>
      <CodeBlock
        language="yaml"
        title="/etc/nemoclaw/policies/resources.yaml"
        code={`apiVersion: nemoclaw/v1
kind: ResourcePolicy
metadata:
  name: trading-resources

spec:
  containers:
    live-trading:
      memory: 2G
      memory_swap: 2G    # No swap (predictable latency)
      cpus: 2
      pids_limit: 256
      io_weight: 500     # Higher I/O priority

    backtest:
      memory: 4G
      memory_swap: 8G
      cpus: 4
      pids_limit: 512
      io_weight: 100     # Lower I/O priority

    data-feed:
      memory: 1G
      memory_swap: 1G
      cpus: 1
      pids_limit: 128
      io_weight: 300`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Seccomp System Call Filtering</h3>
      <CodeBlock
        language="bash"
        title="Inspect active seccomp profile"
        code={`# View the default trading seccomp profile
cat /etc/nemoclaw/seccomp/trading-default.json | jq '.syscalls | length'
# Shows number of allowed syscalls (typically ~250 of 400+)

# Blocked dangerous syscalls include:
# - mount, umount2 (filesystem manipulation)
# - ptrace (process debugging/injection)
# - kexec_load (kernel replacement)
# - reboot, init_module (system-level ops)

# Test seccomp enforcement
nemoclaw exec -- strace -c ls 2>&1 | head
# strace itself may be blocked by seccomp`}
      />

      <NoteBlock type="warning" title="Memory Swap for Live Trading">
        Set <code>memory_swap</code> equal to <code>memory</code> for live trading containers.
        This disables swap and ensures deterministic performance. A swapping trading bot
        can miss critical order windows.
      </NoteBlock>

      <NoteBlock type="tip" title="Monitor Resource Usage">
        Use <code>nemoclaw stats</code> to see real-time resource consumption per container,
        similar to <code>docker stats</code> but with policy limit overlays.
      </NoteBlock>
    </SectionLayout>
  )
}
