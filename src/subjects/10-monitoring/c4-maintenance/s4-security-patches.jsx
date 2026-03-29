import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function SecurityPatches() {
  return (
    <SectionLayout
      title="Security Patch Workflow"
      description="Keeping the NemoClaw trading sandbox secure with systematic patching and vulnerability management."
    >
      <DefinitionBlock term="Dependency Vulnerability">
        A known security flaw in a third-party package used by your system.
        Trading systems handle API keys, access tokens, and financial data --
        a compromised dependency can lead to credential theft or unauthorized trades.
      </DefinitionBlock>

      <CodeBlock language="python" title="Automated Security Audit">
{`import subprocess
import json

class SecurityAuditor:
    """Audit Python dependencies for known vulnerabilities."""

    def check_pip_audit(self):
        """Run pip-audit for known CVEs."""
        result = subprocess.run(
            ['pip-audit', '--format', 'json', '--desc'],
            capture_output=True, text=True,
        )
        if result.returncode != 0:
            vulns = json.loads(result.stdout) if result.stdout else []
            return {
                'vulnerable_packages': len(vulns),
                'details': vulns,
            }
        return {'vulnerable_packages': 0, 'details': []}

    def check_safety(self):
        """Run safety check on requirements."""
        result = subprocess.run(
            ['safety', 'check', '--json', '-r', 'requirements.txt'],
            capture_output=True, text=True,
        )
        return json.loads(result.stdout) if result.stdout else []

    def generate_report(self):
        pip_results = self.check_pip_audit()
        critical = [v for v in pip_results['details']
                    if v.get('severity', '') == 'HIGH']
        return {
            'total_vulns': pip_results['vulnerable_packages'],
            'critical': len(critical),
            'action_required': len(critical) > 0,
            'packages': [v.get('name') for v in critical],
        }

auditor = SecurityAuditor()
report = auditor.generate_report()
if report['action_required']:
    print(f"CRITICAL: {report['critical']} packages need patching")
    print(f"Packages: {report['packages']}")`}
      </CodeBlock>

      <CodeBlock language="bash" title="Weekly Security Patch Script">
{`#!/bin/bash
# security_patch.sh - Run weekly on Saturday

echo "=== NemoClaw Security Patch Check ==="
cd /home/user/ns

# Update pip and audit tools
pip install --upgrade pip pip-audit safety --quiet

# Check for vulnerabilities
echo "Running pip-audit..."
pip-audit --fix --dry-run 2>&1 | tee /tmp/audit_report.txt

# Check for outdated packages
echo "Outdated packages:"
pip list --outdated --format=json | python -c "
import sys, json
pkgs = json.load(sys.stdin)
critical = ['kiteconnect', 'websockets', 'cryptography', 'requests']
for p in pkgs:
    flag = ' [CRITICAL]' if p['name'] in critical else ''
    print(f\"  {p['name']}: {p['version']} -> {p['latest_version']}{flag}\")
"

# Check WSL2 system updates
echo "System security updates:"
sudo apt list --upgradable 2>/dev/null | grep -i security

echo "=== Review above and apply patches ==="
echo "Run: pip-audit --fix   (to auto-fix Python packages)"
echo "Run: sudo apt upgrade  (for system packages)"`}
      </CodeBlock>

      <NoteBlock title="Patch Priority">
        Patch immediately: cryptography, requests, websockets, and any package
        that handles API keys or network communication. Schedule for weekend:
        pandas, numpy, and other data packages. Always test in paper trading
        mode for 1 day after patching before resuming live trading.
      </NoteBlock>
    </SectionLayout>
  )
}
