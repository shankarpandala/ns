import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import StepByStep from '../../../components/content/StepByStep'

export default function DistroSetup() {
  return (
    <SectionLayout
      title="Ubuntu Distro Setup"
      subtitle="Install Ubuntu 22.04 on WSL2 and configure your initial user account."
      difficulty="beginner"
      readingMinutes={4}
    >
      <StepByStep
        title="Install Ubuntu 22.04 LTS"
        steps={[
          {
            title: 'List available distributions',
            content: <CodeBlock code={`wsl --list --online`} language="powershell" />,
          },
          {
            title: 'Install Ubuntu 22.04',
            content: <CodeBlock code={`wsl --install -d Ubuntu-22.04`} language="powershell" />,
          },
          {
            title: 'Create your UNIX user',
            content: 'When Ubuntu launches for the first time, enter a username and password. This user gets sudo privileges automatically.',
          },
          {
            title: 'Update system packages',
            content: <CodeBlock code={`sudo apt update && sudo apt upgrade -y`} language="bash" />,
          },
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Install Essential Build Tools</h3>
      <CodeBlock
        language="bash"
        title="Core development packages"
        code={`sudo apt install -y build-essential curl wget git unzip \\
  software-properties-common ca-certificates gnupg lsb-release`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Set Default Distro</h3>
      <CodeBlock
        language="powershell"
        title="From Windows PowerShell"
        code={`# Make Ubuntu-22.04 the default when you type 'wsl'
wsl --set-default Ubuntu-22.04`}
      />

      <NoteBlock type="tip" title="Multiple Distros">
        You can run multiple Linux distros side by side. Use one for development and
        another for isolated trading bot testing. Switch with <code>wsl -d DistroName</code>.
      </NoteBlock>

      <NoteBlock type="info" title="Why Ubuntu 22.04?">
        Ubuntu 22.04 LTS provides long-term support until 2027, has excellent Docker compatibility,
        and is the most widely documented distro for WSL2 development workflows.
      </NoteBlock>
    </SectionLayout>
  )
}
