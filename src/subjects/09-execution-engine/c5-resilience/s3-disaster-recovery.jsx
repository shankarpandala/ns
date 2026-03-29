import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DisasterRecovery() {
  return (
    <SectionLayout
      title="Failover & Disaster Recovery"
      description="Backup systems, failover procedures, and recovery plans for trading infrastructure."
    >
      <DefinitionBlock term="Failover">
        Automatic switching to a backup system when the primary fails. For
        trading systems, failover must happen in seconds, not minutes, to
        prevent unmanaged positions during market hours.
      </DefinitionBlock>

      <CodeBlock language="python" title="Health Monitor with Failover">
{`import time
import subprocess
import logging

logger = logging.getLogger('failover')

class TradingSystemMonitor:
    """Monitor primary system and trigger failover."""

    def __init__(self, primary_host, backup_host, check_interval=10):
        self.primary = primary_host
        self.backup = backup_host
        self.interval = check_interval
        self.primary_failures = 0
        self.max_failures = 3
        self.active_host = primary_host

    def health_check(self, host):
        try:
            import requests
            resp = requests.get(
                f"http://{host}:8080/health", timeout=5
            )
            return resp.status_code == 200 and resp.json().get('trading_active')
        except Exception:
            return False

    def failover_to_backup(self):
        logger.critical("FAILOVER: Switching to backup system")
        self.active_host = self.backup

        # Transfer state to backup
        state = self._get_current_state()
        self._push_state_to_backup(state)

        # Start trading on backup
        import requests
        requests.post(f"http://{self.backup}:8080/activate", json=state)
        logger.info(f"Backup system activated at {self.backup}")

    def _get_current_state(self):
        return {
            'positions': self._fetch_positions(),
            'pending_orders': self._fetch_pending_orders(),
            'circuit_breaker_state': self._fetch_cb_state(),
            'timestamp': time.time(),
        }

    def monitor_loop(self):
        while True:
            if not self.health_check(self.primary):
                self.primary_failures += 1
                logger.warning(
                    f"Primary health check failed ({self.primary_failures}/{self.max_failures})"
                )
                if self.primary_failures >= self.max_failures:
                    self.failover_to_backup()
                    break
            else:
                self.primary_failures = 0
            time.sleep(self.interval)`}
      </CodeBlock>

      <CodeBlock language="python" title="State Checkpoint for Recovery">
{`import json
import redis

class StateCheckpoint:
    """Persist trading state for crash recovery."""

    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379)

    def save(self, state: dict):
        self.redis.set('trading_state', json.dumps(state))
        self.redis.set('state_timestamp', str(time.time()))

    def restore(self):
        data = self.redis.get('trading_state')
        if data:
            return json.loads(data)
        return None

    def is_stale(self, max_age_seconds=60):
        ts = self.redis.get('state_timestamp')
        if not ts:
            return True
        return (time.time() - float(ts)) > max_age_seconds`}
      </CodeBlock>

      <NoteBlock title="Recovery Checklist">
        After any system crash during market hours: (1) check open positions
        via broker API, (2) reconcile with last checkpoint, (3) verify all
        stop-losses are active, (4) resume trading at 50% position size.
        Document every incident for post-market review.
      </NoteBlock>
    </SectionLayout>
  )
}
