import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function ApiKeyEncryption() {
  return (
    <SectionLayout
      title="API Key Encryption"
      subtitle="Set up the NemoClaw vault for encrypted storage of Zerodha and Delta Exchange API credentials."
      difficulty="advanced"
      readingMinutes={6}
    >
      <WarningBlock title="Never Store Keys in Plain Text">
        Exchange API keys with trading and withdrawal permissions are equivalent to cash.
        A leaked Zerodha API key can execute unauthorized trades on your account.
        Always use the encrypted vault.
      </WarningBlock>

      <h3 className="text-lg font-semibold mt-4 mb-2">Initialize the Vault</h3>
      <CodeBlock
        language="bash"
        title="Vault setup"
        code={`# Initialize the vault with a master password
nemoclaw vault init
# Enter master password (min 16 characters, use a passphrase)
# This creates an AES-256-GCM encrypted store at:
# /var/lib/nemoclaw/vault/secrets.enc

# Verify vault status
nemoclaw vault status
# Expected: Vault initialized, sealed`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Store Exchange API Keys</h3>
      <CodeBlock
        language="bash"
        title="Add credentials to vault"
        code={`# Store Zerodha Kite Connect credentials
nemoclaw vault set zerodha/api_key
# (prompts for value - never passed as argument)

nemoclaw vault set zerodha/api_secret
nemoclaw vault set zerodha/request_token

# Store Delta Exchange credentials
nemoclaw vault set delta/api_key
nemoclaw vault set delta/api_secret

# List stored keys (shows names only, not values)
nemoclaw vault list
# zerodha/api_key
# zerodha/api_secret
# zerodha/request_token
# delta/api_key
# delta/api_secret`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Access Keys in Containers</h3>
      <CodeBlock
        language="python"
        title="Python - Accessing vault secrets at runtime"
        code={`from nemoclaw import vault

# Keys are decrypted in memory only, never written to disk
kite_api_key = vault.get("zerodha/api_key")
kite_secret = vault.get("zerodha/api_secret")

# Use with KiteConnect
from kiteconnect import KiteConnect
kite = KiteConnect(api_key=kite_api_key)
kite.set_access_token(vault.get("zerodha/access_token"))`}
      />

      <NoteBlock type="info" title="Memory-Only Decryption">
        Secrets are decrypted into a <code>mlock</code>-ed memory region that cannot be swapped
        to disk. When the container exits, the memory is securely zeroed. This prevents
        forensic recovery of credentials from swap files.
      </NoteBlock>

      <NoteBlock type="tip" title="Backup the Vault">
        Back up the encrypted vault file, not the master password:
        <code className="block mt-1">cp /var/lib/nemoclaw/vault/secrets.enc ~/backups/</code>
        Store the master password separately in a password manager.
      </NoteBlock>
    </SectionLayout>
  )
}
