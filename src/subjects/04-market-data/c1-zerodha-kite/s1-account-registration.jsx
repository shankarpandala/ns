import SectionLayout from '../../../components/content/SectionLayout'
import StepByStep from '../../../components/content/StepByStep'
import NoteBlock from '../../../components/content/NoteBlock'
import CodeBlock from '../../../components/content/CodeBlock'

export default function AccountRegistration() {
  return (
    <SectionLayout
      title="Zerodha API App Registration"
      subtitle="Setting up a Kite Connect developer account and creating your API app"
      difficulty="beginner"
      readingMinutes={5}
    >
      <StepByStep
        title="Registration Process"
        steps={[
          {
            title: 'Create a Zerodha trading account',
            content: (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visit <strong>zerodha.com</strong> and complete KYC. You need an active trading
                account before you can access the API. Account activation takes 24-48 hours.
              </p>
            ),
          },
          {
            title: 'Sign up for Kite Connect',
            content: (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Go to <strong>developers.kite.trade</strong> and log in with your Zerodha credentials.
                Subscribe to the Kite Connect API plan (Rs 2000/month). This gives you REST API
                and WebSocket access.
              </p>
            ),
          },
          {
            title: 'Create an API app',
            content: (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                In the developer console, click "Create new app". Set the redirect URL to
                <code> http://127.0.0.1:5000/callback</code> for local development.
                Note down the <strong>API Key</strong> and <strong>API Secret</strong>.
              </p>
            ),
          },
          {
            title: 'Store credentials securely',
            content: (
              <CodeBlock language="bash" code={`# Store in environment variables, never in code
echo 'export KITE_API_KEY="your_api_key"' >> ~/.bashrc
echo 'export KITE_API_SECRET="your_api_secret"' >> ~/.bashrc
source ~/.bashrc`} />
            ),
          },
        ]}
      />

      <NoteBlock type="warning" title="API Costs">
        <p>Kite Connect charges Rs 2000/month for API access. Historical data API is an additional
        Rs 2000/month. WebSocket streaming is included in the base plan. Charges are debited
        from your trading account.</p>
      </NoteBlock>

      <NoteBlock type="tip" title="Paper Trading First">
        <p>Use the Kite Connect sandbox environment during development. Set
        <code> KITE_BASE_URL=https://api.kite.trade</code> for production and
        the sandbox URL for testing.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
