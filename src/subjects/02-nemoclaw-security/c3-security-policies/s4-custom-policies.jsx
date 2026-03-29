import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function CustomPolicies() {
  return (
    <SectionLayout
      title="Writing Custom Policies"
      subtitle="Create YAML policy files with inheritance and templating for your specific trading setup."
      difficulty="advanced"
      readingMinutes={6}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        NemoClaw policies are composable YAML files. You can inherit from base profiles,
        override specific rules, and use templates for exchange-specific configurations.
      </p>

      <h3 className="text-lg font-semibold mb-2">Policy Structure</h3>
      <CodeBlock
        language="yaml"
        title="Custom policy anatomy"
        code={`apiVersion: nemoclaw/v1
kind: CompositePolicy
metadata:
  name: my-zerodha-strategy
  description: Custom policy for intraday Nifty options
  labels:
    exchange: zerodha
    strategy: intraday

spec:
  # Inherit from a base profile
  extends: trading-base

  # Override network rules
  network:
    egress:
      - host: api.kite.trade
        ports: [443]
      - host: ws.kite.trade
        ports: [443]
      # Allow market data provider
      - host: api.marketfeed.example.com
        ports: [443]

  # Override resource limits
  resources:
    memory: 3G
    cpus: 2

  # Add custom filesystem rules
  filesystem:
    writable:
      - /app/data/nifty-options
    readonly:
      - /app/strategies/intraday`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Policy Validation</h3>
      <CodeBlock
        language="bash"
        title="Validate before applying"
        code={`# Dry-run validation
nemoclaw policy validate my-zerodha-strategy.yaml

# Check for conflicts with existing policies
nemoclaw policy diff my-zerodha-strategy.yaml

# Apply with rollback on failure
nemoclaw policy apply my-zerodha-strategy.yaml --atomic

# List all active policies and their inheritance chain
nemoclaw policy list --show-inheritance`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Templated Policies</h3>
      <CodeBlock
        language="yaml"
        title="Policy template with variables"
        code={`apiVersion: nemoclaw/v1
kind: PolicyTemplate
metadata:
  name: exchange-template

spec:
  parameters:
    - name: EXCHANGE_HOST
    - name: WS_HOST
    - name: MAX_MEMORY
      default: 2G

  template:
    network:
      egress:
        - host: "{{ .EXCHANGE_HOST }}"
          ports: [443]
        - host: "{{ .WS_HOST }}"
          ports: [443]
    resources:
      memory: "{{ .MAX_MEMORY }}"`}
      />

      <CodeBlock
        language="bash"
        title="Instantiate a template"
        code={`nemoclaw policy create --from-template exchange-template \\
  --set EXCHANGE_HOST=api.delta.exchange \\
  --set WS_HOST=socket.delta.exchange \\
  --set MAX_MEMORY=4G \\
  --name delta-live`}
      />

      <NoteBlock type="tip" title="Version Control Policies">
        Store all custom policies in your git repository under <code>policies/</code>.
        Use <code>nemoclaw policy sync ./policies/</code> to apply them from CI/CD.
      </NoteBlock>
    </SectionLayout>
  )
}
