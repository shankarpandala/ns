import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SystemRequirements() {
  return (
    <SectionLayout
      title="System Requirements"
      subtitle="Verify your hardware and Windows version support WSL2 virtualization."
      difficulty="beginner"
      readingMinutes={4}
    >
      <DefinitionBlock
        term="Hardware Virtualization (VT-x / AMD-V)"
        definition="A CPU feature that allows the processor to run multiple isolated virtual machines efficiently. Required by WSL2's Hyper-V backend."
        example="Intel VT-x is enabled in BIOS under Advanced > CPU Configuration."
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Minimum Hardware</h3>
      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <li>64-bit processor with Second Level Address Translation (SLAT)</li>
        <li>8 GB RAM minimum (16 GB recommended for trading workloads)</li>
        <li>50 GB free disk space on SSD (NVMe preferred for Docker layers)</li>
        <li>BIOS virtualization enabled (VT-x for Intel, AMD-V for AMD)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">Check BIOS Virtualization from Windows</h3>
      <CodeBlock
        language="powershell"
        title="PowerShell - Check Virtualization Support"
        code={`# Open Task Manager > Performance > CPU and look for "Virtualization: Enabled"
# Or run from PowerShell:
systeminfo | Select-String "Hyper-V Requirements"

# Expected output should show:
#   VM Monitor Mode Extensions: Yes
#   Virtualization Enabled In Firmware: Yes`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Windows Version Requirements</h3>
      <CodeBlock
        language="powershell"
        title="Verify Windows Build"
        code={`# Windows 10 version 2004+ (Build 19041+) or Windows 11
winver
# Or via PowerShell:
[System.Environment]::OSVersion.Version

# Minimum builds:
#   Windows 10: Build 19041 (May 2020 Update)
#   Windows 11: Any build supports WSL2`}
      />

      <NoteBlock type="warning" title="Enable Virtualization in BIOS">
        If virtualization is disabled, reboot into BIOS/UEFI (usually F2, F10, or Del during boot).
        Navigate to Advanced &gt; CPU Configuration and enable Intel VT-x or AMD SVM Mode.
        Save and exit. Without this, WSL2 will fail to start.
      </NoteBlock>

      <NoteBlock type="tip" title="RAM Planning for Trading">
        A typical NemoClaw setup runs Docker containers for data feeds, strategy engines,
        and monitoring. Budget 4 GB for WSL2, 2 GB for Docker overhead, and 2-4 GB per
        active trading container.
      </NoteBlock>
    </SectionLayout>
  )
}
