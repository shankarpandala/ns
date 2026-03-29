import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function IntrusionDetection() {
  return (
    <SectionLayout
      title="Intrusion Detection & Monitoring"
      subtitle="Set up alerting, fail2ban, and log monitoring to detect and respond to security events."
      difficulty="advanced"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">NemoClaw Alert System</h3>
      <CodeBlock
        language="yaml"
        title="/etc/nemoclaw/policies/alerts.yaml"
        code={`apiVersion: nemoclaw/v1
kind: AlertPolicy
metadata:
  name: trading-alerts

spec:
  rules:
    - name: blocked-egress
      condition: network.egress.blocked > 0
      severity: high
      message: "Outbound connection blocked: {{ .destination }}"

    - name: policy-violation
      condition: clawguard.violation.count > 0
      severity: critical
      message: "Security policy violation in {{ .container }}"

    - name: resource-limit-hit
      condition: container.memory.usage > 90%
      severity: warning
      message: "Container {{ .name }} at {{ .usage }}% memory"

  notifications:
    - type: webhook
      url: http://localhost:9090/alerts
    - type: log
      path: /var/log/nemoclaw/alerts.log`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Install and Configure fail2ban</h3>
      <CodeBlock
        language="bash"
        title="Protect exposed services"
        code={`# Install fail2ban
sudo apt install -y fail2ban

# Create NemoClaw jail configuration
sudo tee /etc/fail2ban/jail.d/nemoclaw.conf << 'EOF'
[nemoclaw-api]
enabled = true
port = 8080
filter = nemoclaw-api
logpath = /var/log/nemoclaw/access.log
maxretry = 5
bantime = 3600
findtime = 600

[nemoclaw-grafana]
enabled = true
port = 3000
filter = grafana
logpath = /var/log/grafana/grafana.log
maxretry = 3
bantime = 7200
EOF

sudo systemctl enable fail2ban
sudo systemctl start fail2ban`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Log Monitoring</h3>
      <CodeBlock
        language="bash"
        title="Real-time monitoring commands"
        code={`# Watch all NemoClaw security events
nemoclaw monitor --follow

# Watch for specific event types
nemoclaw monitor --filter "severity=critical" --follow

# Aggregate daily security report
nemoclaw audit report --period 24h

# Sample report output:
# Security Report (last 24h)
# ─────────────────────────
# Policy violations:     0
# Blocked connections:   12
# Failed auth attempts:  3
# Credential accesses:   48
# Container restarts:    1`}
      />

      <NoteBlock type="tip" title="Grafana Dashboard">
        Import the NemoClaw security dashboard into Grafana for visual monitoring:
        <code className="block mt-1">nemoclaw grafana import --dashboard security-overview</code>
        This shows real-time graphs of blocked connections, policy violations, and resource usage.
      </NoteBlock>

      <NoteBlock type="important" title="Respond to Critical Alerts">
        A "policy-violation" alert with severity "critical" means a container attempted
        a blocked operation. Investigate immediately -- this could indicate a compromised
        dependency or a misconfigured strategy.
      </NoteBlock>
    </SectionLayout>
  )
}
