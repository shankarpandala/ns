import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function SystemdServices() {
  return (
    <SectionLayout
      title="Systemd & Services"
      subtitle="Enable systemd in WSL2 to manage background services for trading infrastructure."
      difficulty="intermediate"
      readingMinutes={4}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        WSL2 supports systemd natively since September 2022. This lets you run Docker,
        cron jobs, and monitoring agents as proper system services.
      </p>

      <h3 className="text-lg font-semibold mb-2">Enable Systemd</h3>
      <CodeBlock
        language="bash"
        title="Enable systemd in /etc/wsl.conf"
        code={`# Add to /etc/wsl.conf (requires WSL 0.67.6+)
sudo tee -a /etc/wsl.conf <<'EOF'
[boot]
systemd=true
EOF

# Restart WSL from PowerShell:
# wsl --shutdown
# Then reopen your Ubuntu terminal`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Verify Systemd Is Running</h3>
      <CodeBlock
        language="bash"
        code={`# Should show "systemd" not "init"
ps -p 1 -o comm=

# Check systemd status
systemctl status`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Managing Services</h3>
      <CodeBlock
        language="bash"
        title="Common systemctl commands"
        code={`# Start Docker daemon
sudo systemctl start docker
sudo systemctl enable docker  # auto-start on boot

# Check service status
systemctl status docker

# List all running services
systemctl list-units --type=service --state=running

# View service logs
journalctl -u docker -f`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Auto-Start Trading Services</h3>
      <CodeBlock
        language="bash"
        title="Create a custom service"
        code={`sudo tee /etc/systemd/system/nemoclaw-monitor.service <<'EOF'
[Unit]
Description=NemoClaw Health Monitor
After=docker.service

[Service]
Type=simple
ExecStart=/usr/local/bin/nemoclaw-monitor
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable nemoclaw-monitor`}
      />

      <NoteBlock type="warning" title="WSL Shutdown Behavior">
        WSL2 shuts down after a period of inactivity (default 8 seconds after last shell closes).
        Use <code>wsl --shutdown</code> from Windows to cleanly stop all services.
        For persistent services, keep a terminal session open or adjust idle timeout in <code>.wslconfig</code>.
      </NoteBlock>
    </SectionLayout>
  )
}
