import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function EnvIsolation() {
  return (
    <SectionLayout
      title="Environment Variable Isolation"
      subtitle="Prevent secrets from leaking between containers through environment variable boundaries."
      difficulty="intermediate"
      readingMinutes={5}
    >
      <DefinitionBlock
        term="Environment Isolation"
        definition="Ensuring that environment variables set in one container are completely invisible to other containers, even on the same Docker network."
        example="The Zerodha API key in the order-executor container cannot be read by the data-feed container."
        seeAlso={['API Key Encryption', 'Process Isolation']}
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">The Problem with Shared Environments</h3>
      <CodeBlock
        language="bash"
        title="Common insecure patterns"
        code={`# WRONG: Shared .env file with all keys
# .env
# ZERODHA_API_KEY=xxx
# DELTA_API_KEY=yyy
# DB_PASSWORD=zzz
# All containers see ALL secrets

# WRONG: Docker Compose env_file shared across services
# services:
#   bot:
#     env_file: .env     # bot sees DB_PASSWORD
#   database:
#     env_file: .env     # database sees API keys`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">NemoClaw Isolated Environments</h3>
      <CodeBlock
        language="yaml"
        title="Per-container secret injection"
        code={`# nemoclaw-compose.yaml
services:
  order-executor:
    image: nemoclaw/trading-base:3.11
    secrets:
      vault_keys:
        - zerodha/api_key
        - zerodha/api_secret
    env_isolation: strict

  data-feed:
    image: nemoclaw/trading-base:3.11
    secrets:
      vault_keys:
        - zerodha/api_key   # Read-only market data key
    env_isolation: strict

  database:
    image: postgres:16-alpine
    secrets:
      vault_keys:
        - db/password
    env_isolation: strict`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Verify Isolation</h3>
      <CodeBlock
        language="bash"
        title="Test that secrets are isolated"
        code={`# From the data-feed container, try to access order secrets
nemoclaw exec data-feed -- printenv | grep -i zerodha
# Should only show the read-only market data key

# Verify /proc/environ is protected
nemoclaw exec data-feed -- cat /proc/1/environ
# Expected: Permission denied (blocked by ClawGuard)`}
      />

      <NoteBlock type="warning" title="Proc Filesystem Leaks">
        Without ClawGuard, any process can read <code>/proc/[pid]/environ</code> to extract
        environment variables. NemoClaw's seccomp profile blocks this access path.
      </NoteBlock>

      <NoteBlock type="tip" title="Audit Secret Access">
        Enable secret access logging to track which container accessed which key:
        <code className="block mt-1">nemoclaw vault audit --last 24h</code>
      </NoteBlock>
    </SectionLayout>
  )
}
