import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function FirewallRules() {
  return (
    <SectionLayout
      title="Firewall Rules"
      subtitle="Configure UFW and iptables to protect trading system ports and restrict inbound access."
      difficulty="intermediate"
      readingMinutes={5}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Even within WSL2, a host-level firewall prevents unauthorized access to trading
        services like Grafana dashboards, Redis caches, and database ports.
      </p>

      <h3 className="text-lg font-semibold mb-2">UFW Setup</h3>
      <CodeBlock
        language="bash"
        title="Basic UFW configuration"
        code={`# Install and enable UFW
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (if needed for remote access)
sudo ufw allow 22/tcp

# Allow Grafana dashboard (localhost only)
sudo ufw allow from 127.0.0.1 to any port 3000

# Allow NemoClaw health endpoint
sudo ufw allow from 127.0.0.1 to any port 9090

# Enable the firewall
sudo ufw enable
sudo ufw status verbose`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">iptables for Docker Networks</h3>
      <CodeBlock
        language="bash"
        title="Restrict Docker bridge traffic"
        code={`# Block external access to Docker-published ports
# Only allow localhost connections to trading services
sudo iptables -I DOCKER-USER -i eth0 -j DROP
sudo iptables -I DOCKER-USER -i eth0 -s 127.0.0.1 -j ACCEPT
sudo iptables -I DOCKER-USER -i eth0 -s 172.16.0.0/12 -j ACCEPT

# Save iptables rules to persist across restarts
sudo apt install -y iptables-persistent
sudo netfilter-persistent save

# Verify rules
sudo iptables -L DOCKER-USER -v -n`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Port Inventory</h3>
      <CodeBlock
        language="bash"
        title="Audit open ports"
        code={`# List all listening ports
sudo ss -tlnp

# Expected trading system ports:
# 3000  - Grafana (monitoring dashboard)
# 5432  - PostgreSQL (historical data)
# 6379  - Redis (cache/pub-sub)
# 8080  - NemoClaw API
# 9090  - Health/metrics endpoint`}
      />

      <NoteBlock type="warning" title="Docker Bypasses UFW">
        Docker modifies iptables directly and can bypass UFW rules. Always use the
        <code> DOCKER-USER</code> chain for Docker-specific firewall rules, not just UFW.
      </NoteBlock>

      <NoteBlock type="tip" title="Bind to Localhost">
        When possible, bind services to 127.0.0.1 instead of 0.0.0.0 in your
        docker-compose.yml: <code>ports: ["127.0.0.1:3000:3000"]</code>
      </NoteBlock>
    </SectionLayout>
  )
}
