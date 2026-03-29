import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SystemHealth() {
  return (
    <SectionLayout
      title="System Health Monitoring"
      description="Tracking CPU, memory, latency, API status, and WebSocket connectivity."
    >
      <DefinitionBlock term="System Health Dashboard">
        A real-time view of infrastructure metrics: process CPU/memory, network
        latency to broker APIs, WebSocket connection status, database query
        times, and message queue depth.
      </DefinitionBlock>

      <CodeBlock language="python" title="System Health Collector">
{`import psutil
import time
import requests

class SystemHealthCollector:
    """Collect system and trading infrastructure metrics."""

    def __init__(self):
        self.history = []

    def collect(self):
        process = psutil.Process()
        metrics = {
            'timestamp': time.time(),
            'cpu_percent': process.cpu_percent(),
            'memory_mb': process.memory_info().rss / 1024 / 1024,
            'memory_percent': process.memory_percent(),
            'threads': process.num_threads(),
            'open_files': len(process.open_files()),
            'connections': len(process.connections()),
        }

        # System-level metrics
        metrics['system_cpu'] = psutil.cpu_percent(interval=0.1)
        metrics['system_memory_pct'] = psutil.virtual_memory().percent
        metrics['disk_usage_pct'] = psutil.disk_usage('/').percent

        # API latency checks
        metrics['kite_api_ms'] = self._check_latency(
            "https://api.kite.trade/instruments"
        )
        metrics['delta_api_ms'] = self._check_latency(
            "https://api.delta.exchange/v2/products"
        )
        metrics['db_query_ms'] = self._check_db_latency()

        self.history.append(metrics)
        return metrics

    def _check_latency(self, url):
        try:
            start = time.monotonic()
            resp = requests.head(url, timeout=5)
            latency = (time.monotonic() - start) * 1000
            return round(latency, 1)
        except Exception:
            return -1  # Unreachable

    def _check_db_latency(self):
        try:
            import psycopg2
            start = time.monotonic()
            conn = psycopg2.connect("dbname=nemoclaw")
            cur = conn.cursor()
            cur.execute("SELECT 1")
            cur.close()
            conn.close()
            return round((time.monotonic() - start) * 1000, 1)
        except Exception:
            return -1

    def is_healthy(self, metrics):
        issues = []
        if metrics['memory_percent'] > 80:
            issues.append(f"High memory: {metrics['memory_percent']:.0f}%")
        if metrics['cpu_percent'] > 90:
            issues.append(f"High CPU: {metrics['cpu_percent']:.0f}%")
        if metrics['kite_api_ms'] > 2000 or metrics['kite_api_ms'] < 0:
            issues.append("Kite API slow or unreachable")
        if metrics['db_query_ms'] > 100:
            issues.append(f"DB slow: {metrics['db_query_ms']}ms")
        return len(issues) == 0, issues

health = SystemHealthCollector()
metrics = health.collect()
ok, issues = health.is_healthy(metrics)
if not ok:
    print(f"UNHEALTHY: {issues}")`}
      </CodeBlock>

      <NoteBlock title="Monitoring Frequency">
        Collect system metrics every 10 seconds during market hours. Store in
        TimescaleDB for historical analysis. Set alerts for memory above 80%,
        API latency above 2 seconds, and any database connectivity issues.
        System health problems during trading can cause missed fills.
      </NoteBlock>
    </SectionLayout>
  )
}
