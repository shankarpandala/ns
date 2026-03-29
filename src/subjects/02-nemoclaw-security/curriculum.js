export default {
  id: '02-nemoclaw-security',
  title: 'NemoClaw Security Sandbox',
  icon: '🛡️',
  colorHex: '#ef4444',
  description: 'Deploy NemoClaw as a security-first sandbox to protect trading systems from attacks and data exfiltration.',
  difficulty: 'beginner',
  estimatedHours: 4,
  prerequisites: ['01-wsl2-foundation'],
  chapters: [
    {
      id: 'c1-architecture',
      title: 'NemoClaw Architecture',
      description: 'Understand the two-component design and threat model for trading systems.',
      estimatedMinutes: 45,
      sections: [
        { id: 's1-two-component-design', title: 'Two-Component Design (NemoShell + ClawGuard)', difficulty: 'beginner', readingMinutes: 15, description: 'Architecture overview of NemoShell and ClawGuard components.' },
        { id: 's2-threat-model', title: 'Threat Model for Trading Systems', difficulty: 'beginner', readingMinutes: 15, description: 'API key theft, data exfiltration, injection attacks in trading.' },
        { id: 's3-openclaw-vs-nemoclaw', title: 'OpenClaw vs NemoClaw Comparison', difficulty: 'beginner', readingMinutes: 12, description: 'Feature comparison and when to use each approach.' },
      ],
    },
    {
      id: 'c2-installation',
      title: 'NemoClaw Installation on WSL2',
      description: 'Step-by-step installation and verification of NemoClaw on your WSL2 setup.',
      estimatedMinutes: 40,
      sections: [
        { id: 's1-prerequisites', title: 'Prerequisites & Dependencies', difficulty: 'beginner', readingMinutes: 10, description: 'System requirements and dependency installation.' },
        { id: 's2-install-configure', title: 'Installation & Initial Configuration', difficulty: 'beginner', readingMinutes: 15, description: 'Install NemoClaw and configure for trading workloads.' },
        { id: 's3-verification', title: 'Verification & Health Checks', difficulty: 'beginner', readingMinutes: 12, description: 'Verify installation with health check commands.' },
      ],
    },
    {
      id: 'c3-security-policies',
      title: 'Security Policies',
      description: 'Configure network, filesystem, and process isolation policies for trading.',
      estimatedMinutes: 60,
      sections: [
        { id: 's1-network-policies', title: 'Network Policies (Allowlists, Egress Control)', difficulty: 'intermediate', readingMinutes: 15, description: 'Restrict network access to only trading API endpoints.' },
        { id: 's2-filesystem-policies', title: 'Filesystem Policies (Read/Write Boundaries)', difficulty: 'intermediate', readingMinutes: 12, description: 'Define protected paths and read/write boundaries.' },
        { id: 's3-process-isolation', title: 'Process Isolation & Resource Limits', difficulty: 'intermediate', readingMinutes: 15, description: 'cgroups, namespace isolation, and resource limits.' },
        { id: 's4-custom-policies', title: 'Custom Policy Authoring', difficulty: 'intermediate', readingMinutes: 15, description: 'Write custom YAML policy files for trading scenarios.' },
      ],
    },
    {
      id: 'c4-secrets-management',
      title: 'Secrets Management',
      description: 'Protect API keys, credentials, and sensitive trading data.',
      estimatedMinutes: 45,
      sections: [
        { id: 's1-api-key-encryption', title: 'API Key Encryption & Vault Setup', difficulty: 'intermediate', readingMinutes: 15, description: 'Encrypt and vault Zerodha and Delta Exchange API keys.' },
        { id: 's2-env-isolation', title: 'Environment Variable Isolation', difficulty: 'intermediate', readingMinutes: 12, description: 'Isolate environment variables between containers.' },
        { id: 's3-credential-rotation', title: 'Credential Rotation & Audit Logging', difficulty: 'intermediate', readingMinutes: 15, description: 'Auto-rotate credentials and maintain audit trails.' },
      ],
    },
    {
      id: 'c5-attack-hardening',
      title: 'Attack Surface Hardening',
      description: 'Harden your trading system against common attack vectors.',
      estimatedMinutes: 45,
      sections: [
        { id: 's1-firewall-rules', title: 'Port Scanning & Firewall Rules', difficulty: 'intermediate', readingMinutes: 15, description: 'UFW/iptables configuration for trading system ports.' },
        { id: 's2-ssl-tls', title: 'SSL/TLS for Local Services', difficulty: 'intermediate', readingMinutes: 15, description: 'SSL/TLS setup for local service communication.' },
        { id: 's3-intrusion-detection', title: 'Intrusion Detection & Alerting', difficulty: 'intermediate', readingMinutes: 12, description: 'fail2ban, log monitoring, and alert configuration.' },
      ],
    },
  ],
}
