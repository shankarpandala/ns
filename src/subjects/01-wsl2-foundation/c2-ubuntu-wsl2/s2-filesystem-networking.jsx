import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function FilesystemNetworking() {
  return (
    <SectionLayout
      title="Filesystem & Networking"
      subtitle="Understand cross-OS file access, performance implications, and WSL2 network configuration."
      difficulty="beginner"
      readingMinutes={5}
    >
      <DefinitionBlock
        term="9P Protocol"
        definition="The protocol WSL2 uses to mount Windows drives (like /mnt/c) inside Linux. It is significantly slower than the native ext4 Linux filesystem."
        example="Accessing /mnt/c/Users/you/project is 5-10x slower than ~/project inside WSL2."
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Filesystem Layout</h3>
      <CodeBlock
        language="bash"
        title="Key paths"
        code={`# Windows C: drive (slow - avoid for code/builds)
ls /mnt/c/Users/$USER

# Native Linux home (fast - use this for all projects)
ls ~

# Access WSL files from Windows Explorer:
# \\\\wsl$\\Ubuntu-22.04\\home\\youruser`}
      />

      <NoteBlock type="important" title="Always Work in the Linux Filesystem">
        Store all NemoClaw code, Docker volumes, and trading data under your Linux home
        directory (<code>~/</code>). Using <code>/mnt/c</code> for development causes severe I/O
        performance penalties and can break file watchers.
      </NoteBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2">Configure /etc/wsl.conf</h3>
      <CodeBlock
        language="toml"
        title="/etc/wsl.conf"
        code={`[automount]
enabled = true
options = "metadata,umask=22,fmask=11"

[network]
generateResolvConf = true
hostname = nemoclaw-dev

[interop]
enabled = true
appendWindowsPath = false  # Keeps Linux PATH clean

[boot]
systemd = true`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Networking Basics</h3>
      <CodeBlock
        language="bash"
        title="Network access patterns"
        code={`# WSL2 gets its own IP address via virtual NAT
ip addr show eth0

# Access Windows host from WSL2
cat /etc/resolv.conf  # nameserver line = Windows host IP

# Access WSL2 services from Windows
# localhost forwarding works for most ports automatically
curl http://localhost:8080  # from Windows, hits WSL2`}
      />

      <NoteBlock type="tip" title="Port Forwarding">
        With <code>localhostForwarding=true</code> in <code>.wslconfig</code>, services running in
        WSL2 are accessible from Windows via <code>localhost</code>. This is essential for
        accessing trading dashboards from your Windows browser.
      </NoteBlock>
    </SectionLayout>
  )
}
