import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function Prerequisites() {
  return (
    <SectionLayout
      title="Prerequisites"
      subtitle="System dependencies and requirements before installing NemoClaw."
      difficulty="beginner"
      readingMinutes={4}
    >
      <h3 className="text-lg font-semibold mb-2">System Requirements</h3>
      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
        <li>WSL2 with Ubuntu 22.04 (configured in Subject 01)</li>
        <li>Docker Engine 24+ with Compose plugin</li>
        <li>Python 3.11+ (via pyenv)</li>
        <li>4 GB RAM available for NemoClaw services</li>
        <li>10 GB free disk space in Linux filesystem</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">Verify Dependencies</h3>
      <CodeBlock
        language="bash"
        title="Pre-flight checks"
        code={`# Check Docker is running
docker version
docker compose version

# Check Python version
python --version  # Should be 3.11+

# Check kernel supports required features
uname -r  # Should be 5.10+ (WSL2 kernel)

# Verify cgroup v2
stat -fc %T /sys/fs/cgroup
# Expected: cgroup2fs

# Check available disk space
df -h ~  # Need 10GB+ free`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Install Additional Dependencies</h3>
      <CodeBlock
        language="bash"
        title="NemoClaw system dependencies"
        code={`# Security and crypto libraries
sudo apt install -y \\
  libseccomp-dev \\
  apparmor-utils \\
  iptables \\
  nftables \\
  jq \\
  yq \\
  openssl

# Install Rust toolchain (needed for ClawGuard compilation)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustc --version`}
      />

      <NoteBlock type="warning" title="cgroup v2 Required">
        NemoClaw requires cgroup v2 for fine-grained resource control. Most WSL2 kernels
        (5.10+) support this by default. If <code>stat -fc %T /sys/fs/cgroup</code> shows
        <code>tmpfs</code> instead of <code>cgroup2fs</code>, update your WSL kernel
        with <code>wsl --update</code>.
      </NoteBlock>

      <NoteBlock type="info" title="Offline Installation">
        For air-gapped trading environments, NemoClaw provides an offline install bundle.
        Download it on a connected machine and transfer via USB. See the installation
        section for details.
      </NoteBlock>
    </SectionLayout>
  )
}
