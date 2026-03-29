import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import StepByStep from '../../../components/content/StepByStep'

export default function GitSshGithub() {
  return (
    <SectionLayout
      title="Git, SSH & GitHub"
      subtitle="Configure Git identity, generate SSH keys, and set up GitHub CLI for repository access."
      difficulty="beginner"
      readingMinutes={5}
    >
      <StepByStep
        title="Git Configuration"
        steps={[
          {
            title: 'Set your identity',
            content: <CodeBlock code={`git config --global user.name "Your Name"
git config --global user.email "you@example.com"`} language="bash" />,
          },
          {
            title: 'Set useful defaults',
            content: <CodeBlock code={`git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global core.autocrlf input
git config --global core.editor "code --wait"`} language="bash" />,
          },
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Generate SSH Key</h3>
      <CodeBlock
        language="bash"
        title="Ed25519 SSH key for GitHub"
        code={`# Generate a new SSH key
ssh-keygen -t ed25519 -C "you@example.com" -f ~/.ssh/id_ed25519

# Start the SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard (install xclip first)
sudo apt install -y xclip
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
# Paste this key in GitHub > Settings > SSH and GPG keys`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">GitHub CLI</h3>
      <CodeBlock
        language="bash"
        title="Install and authenticate gh"
        code={`# Install GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \\
  sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | \\
  sudo tee /etc/apt/sources.list.d/github-cli.list
sudo apt update && sudo apt install -y gh

# Authenticate with GitHub
gh auth login  # Choose SSH protocol

# Verify
gh auth status`}
      />

      <NoteBlock type="warning" title="SSH Key Security">
        Never share your private key (<code>~/.ssh/id_ed25519</code>). For NemoClaw trading
        repos containing strategy code, consider using a dedicated deploy key with read-only access.
      </NoteBlock>

      <CodeBlock
        language="bash"
        title="Test SSH connection"
        code={`ssh -T git@github.com
# Expected: "Hi username! You've successfully authenticated..."`}
      />
    </SectionLayout>
  )
}
