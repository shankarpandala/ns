import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import StepByStep from '../../../components/content/StepByStep'

export default function CliInstallation() {
  return (
    <SectionLayout
      title="Claude Code CLI Installation"
      subtitle="Installing and authenticating Claude Code on WSL2 for trading automation"
      difficulty="beginner"
      readingMinutes={6}
    >
      <StepByStep
        title="Installation Steps"
        steps={[
          {
            title: 'Install Node.js 18+ via nvm',
            content: (
              <CodeBlock language="bash" code={`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
node --version  # Should be v22.x`} />
            ),
          },
          {
            title: 'Install Claude Code globally',
            content: (
              <CodeBlock language="bash" code={`npm install -g @anthropic-ai/claude-code
claude --version`} />
            ),
          },
          {
            title: 'Authenticate with your Claude Max account',
            content: (
              <>
                <CodeBlock language="bash" code={`cd ~/nemoclaw
claude
# A browser window opens -- log in with your Claude Max account
# Once authenticated, the CLI stores credentials in ~/.claude/`} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  The token is stored locally. You will not need to re-authenticate unless it expires.
                </p>
              </>
            ),
          },
          {
            title: 'Verify the setup',
            content: (
              <CodeBlock language="bash" code={`claude --version
claude "What model are you? Reply in one line."
# Expected: mentions Claude Sonnet or Opus`} />
            ),
          },
        ]}
      />

      <NoteBlock type="tip" title="WSL2 Browser Authentication">
        <p>If the browser does not open automatically from WSL2, copy the URL printed in the terminal
        and paste it into your Windows browser. The callback will still work.</p>
      </NoteBlock>

      <CodeBlock
        title="Useful CLI flags"
        language="bash"
        code={`# Run a one-shot prompt
claude -p "Analyze NIFTY support levels at 22500"

# Pipe data into Claude
cat market_data.csv | claude -p "Summarize this OHLCV data"

# Use a specific model
claude --model opus "Deep analysis of options chain skew"

# Resume a conversation
claude --continue`}
      />
    </SectionLayout>
  )
}
