import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function WSL2Installation() {
  return (
    <SectionLayout
      title="WSL2 Installation"
      subtitle="Install WSL2, update the kernel, and set it as the default version."
      difficulty="beginner"
      readingMinutes={4}
    >
      <h3 className="text-lg font-semibold mb-2">Quick Install (Windows 10 2004+ / Windows 11)</h3>
      <CodeBlock
        language="powershell"
        title="One-command WSL install"
        code={`# This installs WSL2 with Ubuntu as the default distro
wsl --install

# If you already have WSL1, upgrade to WSL2:
wsl --set-default-version 2`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Update the WSL2 Linux Kernel</h3>
      <CodeBlock
        language="powershell"
        title="Kernel update"
        code={`# Download and install the latest WSL2 kernel update
wsl --update

# Verify the kernel version
wsl --version`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Set WSL2 as Default</h3>
      <CodeBlock
        language="powershell"
        title="Set default version"
        code={`# Ensure all future distros use WSL2
wsl --set-default-version 2

# If you have an existing WSL1 distro, convert it:
wsl --set-version Ubuntu 2`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Verify Installation</h3>
      <CodeBlock
        language="powershell"
        title="List installed distributions"
        code={`wsl --list --verbose

# Expected output:
#   NAME      STATE    VERSION
# * Ubuntu    Running  2`}
      />

      <NoteBlock type="warning" title="Kernel Update Required">
        If you see error 0x80370102, the kernel package is missing. Run <code>wsl --update</code> and
        restart. On older Windows 10 builds, you may need to manually download the kernel package
        from the Microsoft docs site.
      </NoteBlock>

      <NoteBlock type="tip" title="WSL Configuration">
        Create <code>%USERPROFILE%\.wslconfig</code> to control global WSL2 settings
        like memory limits and swap. This is critical for trading workloads where you
        want predictable resource allocation.
      </NoteBlock>

      <CodeBlock
        language="toml"
        title="%USERPROFILE%\\.wslconfig"
        code={`[wsl2]
memory=8GB
swap=4GB
processors=4
localhostForwarding=true`}
      />
    </SectionLayout>
  )
}
