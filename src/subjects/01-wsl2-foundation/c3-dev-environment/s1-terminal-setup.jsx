import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function TerminalSetup() {
  return (
    <SectionLayout
      title="Terminal Setup"
      subtitle="Configure Windows Terminal with Oh My Zsh for an efficient trading development workflow."
      difficulty="beginner"
      readingMinutes={5}
    >
      <h3 className="text-lg font-semibold mb-2">Install Windows Terminal</h3>
      <CodeBlock
        language="powershell"
        title="From PowerShell"
        code={`# Install via winget (built into Windows 11, available for Windows 10)
winget install Microsoft.WindowsTerminal`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Install Zsh and Oh My Zsh</h3>
      <CodeBlock
        language="bash"
        title="Inside WSL2 Ubuntu"
        code={`# Install Zsh
sudo apt install -y zsh

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Set Zsh as default shell
chsh -s $(which zsh)`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Recommended Plugins</h3>
      <CodeBlock
        language="bash"
        title="Install useful plugins"
        code={`# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions \\
  \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting \\
  \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`}
      />

      <CodeBlock
        language="bash"
        title="~/.zshrc plugin configuration"
        code={`# Edit ~/.zshrc and update the plugins line:
plugins=(
  git
  docker
  docker-compose
  zsh-autosuggestions
  zsh-syntax-highlighting
  kubectl
)`}
      />

      <NoteBlock type="tip" title="Font Setup">
        Install a Nerd Font (e.g., FiraCode Nerd Font) on Windows for proper icon rendering.
        Set it in Windows Terminal Settings &gt; Profiles &gt; Ubuntu &gt; Appearance &gt; Font face.
      </NoteBlock>

      <NoteBlock type="info" title="Terminal Profiles">
        Windows Terminal lets you create separate profiles for different WSL distros.
        Create a dedicated "NemoClaw Dev" profile that starts in <code>~/nemoclaw</code> with
        custom color scheme for easy identification.
      </NoteBlock>
    </SectionLayout>
  )
}
