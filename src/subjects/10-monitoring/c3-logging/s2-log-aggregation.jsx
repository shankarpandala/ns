import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function LogAggregation() {
  return (
    <SectionLayout
      title="Log Aggregation with Loki"
      description="Centralized log collection and querying using Grafana Loki for trading systems."
    >
      <DefinitionBlock term="Grafana Loki">
        A horizontally-scalable log aggregation system designed for efficiency.
        Unlike ELK, Loki indexes only labels (not full text), making it
        lightweight and ideal for a WSL2 trading setup with limited resources.
      </DefinitionBlock>

      <CodeBlock language="python" title="Sending Logs to Loki via Promtail">
{`# promtail-config.yaml (in your NemoClaw project)
# Promtail watches log files and ships to Loki

"""
server:
  http_listen_port: 9080

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://localhost:3100/loki/api/v1/push

scrape_configs:
  - job_name: nemoclaw
    static_configs:
      - targets: [localhost]
        labels:
          job: nemoclaw
          __path__: /home/user/ns/logs/*.jsonl
    pipeline_stages:
      - json:
          expressions:
            level: level
            logger: logger
            strategy: context.strategy
      - labels:
          level:
          logger:
          strategy:
"""

# Alternative: Push logs directly via Python
import requests
import time

class LokiHandler:
    """Send log entries directly to Loki HTTP API."""

    def __init__(self, url="http://localhost:3100"):
        self.url = f"{url}/loki/api/v1/push"

    def push(self, labels: dict, message: str):
        timestamp_ns = str(int(time.time() * 1e9))
        payload = {
            "streams": [{
                "stream": labels,
                "values": [[timestamp_ns, message]],
            }]
        }
        requests.post(self.url, json=payload)

loki = LokiHandler()
loki.push(
    {"job": "nemoclaw", "level": "info", "strategy": "iron_condor"},
    '{"message": "Position opened", "symbol": "NIFTY", "delta": -0.15}'
)`}
      </CodeBlock>

      <CodeBlock language="bash" title="Docker Compose for Loki Stack">
{`# docker-compose.yml for Loki + Grafana
# version: "3"
# services:
#   loki:
#     image: grafana/loki:2.9.0
#     ports: ["3100:3100"]
#     volumes: [./loki-config.yaml:/etc/loki/config.yaml]
#
#   grafana:
#     image: grafana/grafana:latest
#     ports: ["3000:3000"]
#     environment:
#       GF_SECURITY_ADMIN_PASSWORD: nemoclaw
#
# Query examples in Grafana:
# {job="nemoclaw"} |= "ERROR"
# {strategy="mean_reversion"} | json | level="ERROR"
# rate({job="nemoclaw"} |= "order" [5m])`}
      </CodeBlock>

      <NoteBlock title="Resource Usage in WSL2">
        Loki uses ~200MB RAM compared to Elasticsearch's 2GB+. For a single-user
        trading system in WSL2, Loki with Grafana is the right choice. Set
        retention to 30 days to manage disk space. Use Grafana dashboards to
        correlate log events with P&L changes.
      </NoteBlock>
    </SectionLayout>
  )
}
