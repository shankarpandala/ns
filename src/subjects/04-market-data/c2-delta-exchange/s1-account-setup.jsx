import SectionLayout from '../../../components/content/SectionLayout'
import StepByStep from '../../../components/content/StepByStep'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function AccountSetup() {
  return (
    <SectionLayout
      title="Delta Exchange India Account Setup"
      subtitle="Creating your account, generating API keys, and configuring testnet access"
      difficulty="beginner"
      readingMinutes={5}
    >
      <DefinitionBlock
        term="Delta Exchange India"
        definition="A crypto and derivatives exchange offering INR-settled futures and options on NIFTY, BANKNIFTY, BTC, and ETH with leverage up to 100x for crypto pairs."
        example="Trade BTCINR perpetual futures with 10x leverage using Delta's API."
      />

      <StepByStep
        title="Account Setup Steps"
        steps={[
          {
            title: 'Register on Delta Exchange India',
            content: (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visit <strong>india.delta.exchange</strong> and sign up with email. Complete
                KYC verification with PAN card and Aadhaar. Verification usually takes a few hours.
              </p>
            ),
          },
          {
            title: 'Enable testnet for development',
            content: (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access the testnet at <strong>testnet.india.delta.exchange</strong>. Create a
                separate testnet account -- it comes pre-funded with test INR for paper trading.
              </p>
            ),
          },
          {
            title: 'Generate API keys',
            content: (
              <CodeBlock language="bash" code={`# Navigate to Settings > API Keys on the dashboard
# Create a new API key with these permissions:
#   - Read (for market data)
#   - Trade (for order placement)
#   - Do NOT enable Withdraw

# Store securely
echo 'export DELTA_API_KEY="your_key"' >> ~/.bashrc
echo 'export DELTA_API_SECRET="your_secret"' >> ~/.bashrc
source ~/.bashrc`} />
            ),
          },
        ]}
      />

      <CodeBlock
        language="python"
        title="Test API connection"
        code={`from delta_rest_client import DeltaRestClient
import os

# Use testnet URL for development
client = DeltaRestClient(
    base_url="https://cdn-ind.deltaex.org",  # Prod
    # base_url="https://cdn-testnet.deltaex.org",  # Testnet
    api_key=os.environ["DELTA_API_KEY"],
    api_secret=os.environ["DELTA_API_SECRET"]
)
wallet = client.get_balances()
print(f"Available balance: {wallet}")`}
      />

      <NoteBlock type="tip" title="Always Start with Testnet">
        <p>Develop and test all strategies on testnet first. The testnet API is identical to
        production. Switch by changing only the <code>base_url</code>.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
