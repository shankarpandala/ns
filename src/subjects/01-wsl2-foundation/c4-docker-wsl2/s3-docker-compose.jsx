import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function DockerCompose() {
  return (
    <SectionLayout
      title="Docker Compose"
      subtitle="Orchestrate multi-container trading applications with Compose files."
      difficulty="intermediate"
      readingMinutes={6}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Docker Compose lets you define and run multi-container applications from a single YAML file.
        A typical trading setup includes a strategy engine, Redis for caching, a database for
        historical data, and a monitoring dashboard.
      </p>

      <CodeBlock
        language="yaml"
        title="docker-compose.yml - Trading Stack"
        code={`services:
  trading-bot:
    build: ./bot
    container_name: nemoclaw-bot
    restart: unless-stopped
    env_file: .env
    volumes:
      - market-data:/app/data
      - ./strategies:/app/strategies:ro
    networks:
      - trading-net
    depends_on:
      - redis
      - postgres
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: "2.0"

  redis:
    image: redis:7-alpine
    container_name: nemoclaw-redis
    restart: unless-stopped
    volumes:
      - redis-data:/data
    networks:
      - trading-net

  postgres:
    image: postgres:16-alpine
    container_name: nemoclaw-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: nemoclaw
      POSTGRES_USER: trader
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - pg-data:/var/lib/postgresql/data
    networks:
      - trading-net
    secrets:
      - db_password

  grafana:
    image: grafana/grafana:latest
    container_name: nemoclaw-grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - trading-net

volumes:
  market-data:
  redis-data:
  pg-data:
  grafana-data:

networks:
  trading-net:
    driver: bridge

secrets:
  db_password:
    file: ./secrets/db_password.txt`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Common Operations</h3>
      <CodeBlock
        language="bash"
        title="Compose commands"
        code={`# Start all services in background
docker compose up -d

# View logs across all services
docker compose logs -f

# Restart a single service
docker compose restart trading-bot

# Stop and remove everything (preserves volumes)
docker compose down

# Stop and remove everything INCLUDING volumes
docker compose down -v`}
      />

      <NoteBlock type="warning" title="Secrets in Compose">
        Never put API keys or passwords directly in <code>docker-compose.yml</code>.
        Use Docker secrets, <code>.env</code> files (excluded from git), or NemoClaw's
        built-in vault integration covered in Subject 02.
      </NoteBlock>

      <NoteBlock type="tip" title="Development Overrides">
        Use <code>docker-compose.override.yml</code> for local dev settings like
        bind mounts and debug ports. Compose merges it automatically.
      </NoteBlock>
    </SectionLayout>
  )
}
