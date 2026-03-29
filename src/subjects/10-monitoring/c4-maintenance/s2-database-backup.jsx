import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function DatabaseBackup() {
  return (
    <SectionLayout
      title="TimescaleDB Backup & Recovery"
      description="Backup strategies, retention policies, and disaster recovery for market data."
    >
      <DefinitionBlock term="Continuous Archiving">
        PostgreSQL WAL (Write-Ahead Log) archiving captures every database change
        incrementally. Combined with base backups, it enables point-in-time
        recovery to any moment before a data loss event.
      </DefinitionBlock>

      <CodeBlock language="bash" title="TimescaleDB Backup Scripts">
{`#!/bin/bash
# backup_timescaledb.sh - Daily backup of NemoClaw database

BACKUP_DIR="/home/user/backups/timescaledb"
DB_NAME="nemoclaw"
DATE=$(date +%Y%m%d)
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

# Full database dump with TimescaleDB support
pg_dump -Fc -Z 6 \\
  --no-owner \\
  -d "$DB_NAME" \\
  -f "$BACKUP_DIR/${DB_NAME}_${DATE}.dump"

echo "Backup size: $(du -h $BACKUP_DIR/${DB_NAME}_${DATE}.dump | cut -f1)"

# Verify backup integrity
pg_restore --list "$BACKUP_DIR/${DB_NAME}_${DATE}.dump" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Backup verified: $DATE"
else
    echo "ERROR: Backup verification failed!"
    # Send alert
    curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \\
      -d "chat_id=$CHAT_ID&text=DB backup verification FAILED: $DATE"
fi

# Clean old backups
find "$BACKUP_DIR" -name "*.dump" -mtime +$RETENTION_DAYS -delete
echo "Cleaned backups older than $RETENTION_DAYS days"`}
      </CodeBlock>

      <CodeBlock language="python" title="Automated Backup with Retention">
{`import subprocess
from datetime import datetime
from pathlib import Path

class TimescaleBackupManager:
    def __init__(self, db_name='nemoclaw', backup_dir='/home/user/backups'):
        self.db_name = db_name
        self.backup_dir = Path(backup_dir)
        self.backup_dir.mkdir(parents=True, exist_ok=True)

    def full_backup(self):
        date_str = datetime.now().strftime('%Y%m%d_%H%M')
        filename = self.backup_dir / f"{self.db_name}_{date_str}.dump"

        result = subprocess.run([
            'pg_dump', '-Fc', '-Z', '6', '-d', self.db_name,
            '-f', str(filename),
        ], capture_output=True, text=True)

        if result.returncode == 0:
            size_mb = filename.stat().st_size / 1024 / 1024
            return {'status': 'success', 'file': str(filename), 'size_mb': round(size_mb, 1)}
        return {'status': 'failed', 'error': result.stderr}

    def restore(self, backup_file):
        result = subprocess.run([
            'pg_restore', '-d', self.db_name, '--clean', '--if-exists',
            str(backup_file),
        ], capture_output=True, text=True)
        return result.returncode == 0

    def apply_retention(self, keep_daily=7, keep_weekly=4):
        """Keep 7 daily + 4 weekly backups."""
        backups = sorted(self.backup_dir.glob('*.dump'), reverse=True)
        to_keep = set(backups[:keep_daily])  # Keep latest 7
        # Keep one per week for older ones
        for i, b in enumerate(backups[keep_daily:]):
            if i % 7 == 0 and len(to_keep) < keep_daily + keep_weekly:
                to_keep.add(b)
        for b in backups:
            if b not in to_keep:
                b.unlink()`}
      </CodeBlock>

      <NoteBlock title="Backup Schedule">
        Run full backups daily at 4:00 PM IST (after market close). For
        intraday OHLCV data, a full dump can be 5-20GB depending on history
        depth. Schedule backups via cron and monitor completion with alerts.
        Test restore procedures monthly.
      </NoteBlock>
    </SectionLayout>
  )
}
