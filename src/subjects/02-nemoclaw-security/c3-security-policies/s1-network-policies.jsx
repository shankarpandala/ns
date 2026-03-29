import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function NetworkPolicies() {
  return (
    <SectionLayout
      title="Network Policies"
      subtitle="Configure egress allowlists and DNS filtering to restrict trading container network access."
      difficulty="intermediate"
      readingMinutes={5}
    >
      <DefinitionBlock
        term="Egress Allowlist"
        definition="A list of permitted outbound network destinations. All connections to unlisted hosts are blocked by default (deny-all baseline)."
        example="Allowing only api.kite.trade:443 and api.delta.exchange:443 for order execution."
        seeAlso={['DNS Filtering', 'Firewall Rules']}
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">Default Network Policy</h3>
      <CodeBlock
        language="yaml"
        title="/etc/nemoclaw/policies/network.yaml"
        code={`apiVersion: nemoclaw/v1
kind: NetworkPolicy
metadata:
  name: trading-egress
  description: Allowlist for live trading containers

spec:
  default_action: deny

  egress:
    # Zerodha Kite Connect
    - host: api.kite.trade
      ports: [443]
      protocol: tcp

    # Delta Exchange
    - host: api.delta.exchange
      ports: [443]
      protocol: tcp

    # WebSocket feeds
    - host: ws.kite.trade
      ports: [443]
      protocol: tcp

    # DNS resolution (required)
    - host: "*.dns.google"
      ports: [53, 853]
      protocol: [tcp, udp]

  dns:
    allowed_resolvers:
      - 8.8.8.8
      - 8.8.4.4
    block_dns_over_https: true`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Apply and Test</h3>
      <CodeBlock
        language="bash"
        title="Policy management commands"
        code={`# Apply the network policy
nemoclaw policy apply /etc/nemoclaw/policies/network.yaml

# List active policies
nemoclaw policy list

# Test that allowed hosts work
nemoclaw exec -- curl -I https://api.kite.trade/health
# Expected: HTTP 200

# Test that blocked hosts are rejected
nemoclaw exec -- curl -I https://evil-exfil.example.com
# Expected: Connection refused / timeout`}
      />

      <NoteBlock type="warning" title="DNS Exfiltration">
        Attackers can encode stolen data in DNS queries. Enable <code>block_dns_over_https</code>
        and restrict resolvers to prevent DNS tunneling. ClawGuard inspects DNS queries
        for anomalous patterns.
      </NoteBlock>

      <NoteBlock type="tip" title="Backtest Profile">
        For backtesting, use a relaxed network policy that allows package downloads:
        <code className="block mt-1">nemoclaw policy apply --profile backtest</code>
      </NoteBlock>
    </SectionLayout>
  )
}
