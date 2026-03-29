import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ContainerFundamentals() {
  return (
    <SectionLayout
      title="Container Fundamentals"
      subtitle="Core Docker concepts: images, containers, volumes, and networks for trading infrastructure."
      difficulty="intermediate"
      readingMinutes={6}
    >
      <DefinitionBlock
        term="Docker Image"
        definition="A read-only template containing application code, runtime, libraries, and configuration. Built from a Dockerfile in layers."
        example="python:3.11-slim is a base image; you build your trading bot image on top of it."
      />

      <DefinitionBlock
        term="Docker Volume"
        definition="Persistent storage that survives container restarts. Critical for trading data, logs, and database files."
        example="A named volume 'market-data' stores historical OHLCV data across container rebuilds."
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">Essential Commands</h3>
      <CodeBlock
        language="bash"
        title="Image and container management"
        code={`# Pull a base image
docker pull python:3.11-slim

# Build an image from Dockerfile
docker build -t nemoclaw-bot:latest .

# Run a container with volume and port mapping
docker run -d --name trading-bot \\
  -v market-data:/app/data \\
  -p 8080:8080 \\
  --restart unless-stopped \\
  nemoclaw-bot:latest

# List running containers
docker ps

# View container logs
docker logs -f trading-bot

# Execute a command inside a running container
docker exec -it trading-bot bash`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Volumes for Trading Data</h3>
      <CodeBlock
        language="bash"
        title="Named volumes"
        code={`# Create named volumes for persistent data
docker volume create market-data
docker volume create strategy-logs
docker volume create backtest-results

# Inspect volume location
docker volume inspect market-data

# Backup a volume
docker run --rm -v market-data:/data -v $(pwd):/backup \\
  alpine tar czf /backup/market-data-backup.tar.gz -C /data .`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Docker Networks</h3>
      <CodeBlock
        language="bash"
        title="Isolated trading network"
        code={`# Create a dedicated network for trading services
docker network create --driver bridge trading-net

# Run containers on the same network
docker run -d --name redis --network trading-net redis:7-alpine
docker run -d --name bot --network trading-net nemoclaw-bot:latest

# Containers can reach each other by name: redis:6379`}
      />

      <NoteBlock type="tip" title="Resource Limits">
        Always set memory limits on trading containers to prevent a runaway strategy
        from consuming all WSL2 memory:
        <code className="block mt-1">docker run -m 2g --cpus=2 nemoclaw-bot:latest</code>
      </NoteBlock>
    </SectionLayout>
  )
}
