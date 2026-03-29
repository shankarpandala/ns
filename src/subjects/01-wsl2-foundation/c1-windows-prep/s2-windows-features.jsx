import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import StepByStep from '../../../components/content/StepByStep'

export default function WindowsFeatures() {
  return (
    <SectionLayout
      title="Enable Windows Features"
      subtitle="Activate Hyper-V, Virtual Machine Platform, and WSL before installing a Linux distro."
      difficulty="beginner"
      readingMinutes={5}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        WSL2 runs a real Linux kernel inside a lightweight Hyper-V virtual machine.
        Three Windows features must be enabled before installation.
      </p>

      <StepByStep
        title="Enable Required Features"
        steps={[
          {
            title: 'Open PowerShell as Administrator',
            content: 'Right-click the Start menu and select "Windows Terminal (Admin)" or "PowerShell (Admin)".',
          },
          {
            title: 'Enable Windows Subsystem for Linux',
            content: <CodeBlock code={`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`} language="powershell" />,
          },
          {
            title: 'Enable Virtual Machine Platform',
            content: <CodeBlock code={`dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`} language="powershell" />,
          },
          {
            title: 'Enable Hyper-V (Windows Pro/Enterprise)',
            content: <CodeBlock code={`# Only needed on Pro/Enterprise. Home edition uses Virtual Machine Platform only.
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart`} language="powershell" />,
          },
          {
            title: 'Restart your machine',
            content: 'A full restart is required for the kernel-level features to take effect.',
          },
        ]}
      />

      <NoteBlock type="info" title="Windows Home Edition">
        Windows Home does not include Hyper-V, but WSL2 still works using the Virtual Machine
        Platform feature alone. Skip Step 4 if you are on Home edition.
      </NoteBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2">Verify Features Are Active</h3>
      <CodeBlock
        language="powershell"
        title="Check enabled features"
        code={`Get-WindowsOptionalFeature -Online | Where-Object {
  $_.FeatureName -match "Microsoft-Windows-Subsystem-Linux|VirtualMachinePlatform"
} | Select-Object FeatureName, State`}
      />

      <NoteBlock type="tip" title="GUI Alternative">
        You can also enable these from Control Panel &gt; Programs &gt; Turn Windows features
        on or off. Check the boxes for "Windows Subsystem for Linux" and "Virtual Machine Platform".
      </NoteBlock>
    </SectionLayout>
  )
}
