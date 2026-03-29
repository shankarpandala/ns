import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function TimescaleDB() {
  return (
    <SectionLayout
      title="TimescaleDB for Time-Series Storage"
      subtitle="Setting up TimescaleDB on WSL2 for efficient market data storage and queries"
      difficulty="intermediate"
      readingMinutes={7}
    >
      <DefinitionBlock
        term="TimescaleDB"
        definition="A PostgreSQL extension optimized for time-series data. It automatically partitions data by time into 'chunks', enabling fast inserts and time-range queries on billions of rows."
      />

      <CodeBlock
        language="bash"
        title="Install TimescaleDB on WSL2"
        code={`# Add TimescaleDB repository
sudo apt install -y gnupg postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y
sudo apt install -y timescaledb-2-postgresql-16

# Enable the extension
sudo timescaledb-tune --yes
sudo systemctl restart postgresql`}
      />

      <CodeBlock
        language="bash"
        title="Create the market data schema"
        code={`sudo -u postgres psql -c "CREATE DATABASE nemoclaw;"
sudo -u postgres psql nemoclaw <<'SQL'
CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE ticks (
    ts         TIMESTAMPTZ NOT NULL,
    symbol     TEXT        NOT NULL,
    exchange   TEXT        NOT NULL,
    price      DOUBLE PRECISION,
    volume     BIGINT,
    bid        DOUBLE PRECISION,
    ask        DOUBLE PRECISION
);
SELECT create_hypertable('ticks', 'ts');

CREATE TABLE candles (
    ts         TIMESTAMPTZ NOT NULL,
    symbol     TEXT        NOT NULL,
    interval   TEXT        NOT NULL,
    open       DOUBLE PRECISION,
    high       DOUBLE PRECISION,
    low        DOUBLE PRECISION,
    close      DOUBLE PRECISION,
    volume     BIGINT,
    oi         BIGINT
);
SELECT create_hypertable('candles', 'ts');

-- Continuous aggregate for 5-min candles from ticks
CREATE INDEX idx_ticks_symbol_ts ON ticks (symbol, ts DESC);
CREATE INDEX idx_candles_symbol_ts ON candles (symbol, interval, ts DESC);
SQL`}
      />

      <CodeBlock
        language="python"
        title="Query recent candles"
        code={`import asyncpg

async def get_recent_candles(symbol, interval="5minute", limit=100):
    conn = await asyncpg.connect("postgresql://localhost/nemoclaw")
    rows = await conn.fetch("""
        SELECT ts, open, high, low, close, volume
        FROM candles
        WHERE symbol = $1 AND interval = $2
        ORDER BY ts DESC LIMIT $3
    """, symbol, interval, limit)
    await conn.close()
    return rows`}
      />

      <NoteBlock type="tip" title="Compression for Old Data">
        <p>Enable TimescaleDB compression for data older than 7 days:
        <code>ALTER TABLE ticks SET (timescaledb.compress); SELECT add_compression_policy('ticks', INTERVAL '7 days');</code>
        This reduces storage by 90%+ for tick data.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
