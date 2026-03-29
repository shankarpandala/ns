import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function DockerInstallation() {
  return (
    <SectionLayout
      title="Docker Engine Installation"
      subtitle="Install Docker Engine directly in WSL2 Ubuntu (without Docker Desktop) for full control."
      difficulty="intermediate"
      readingMinutes={5}
    >
      <WarningBlock title="Docker Desktop vs Docker Engine">
        We install Docker Engine directly in WSL2, not Docker Desktop. This gives you
        full control over daemon configuration, avoids licensing concerns for commercial
        trading operations, and integrates better with NemoClaw's security model.
      </WarningBlock>

      <h3 className="text-lg font-semibold mt-4 mb-2">Install Docker Engine</h3>
      <CodeBlock
        language="bash"
        title="Official Docker installation"
        code={`# Remove any old versions
sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \\
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \\
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io \\
  docker-buildx-plugin docker-compose-plugin`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Post-Install Configuration</h3>
      <CodeBlock
        language="bash"
        title="Run Docker without sudo"
        code={`# Add your user to the docker group
sudo usermod -aG docker $USER

# Apply group changes (or log out and back in)
newgrp docker

# Verify Docker works
docker run hello-world`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Daemon Configuration</h3>
      <CodeBlock
        language="json"
        title="/etc/docker/daemon.json"
        code={`{
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-address-pools": [
    { "base": "172.20.0.0/16", "size": 24 }
  ]
}`}
      />

      <NoteBlock type="tip" title="Auto-Start Docker">
        With systemd enabled, Docker starts automatically:
        <code className="block mt-1">sudo systemctl enable docker</code>
      </NoteBlock>
    </SectionLayout>
  )
}
