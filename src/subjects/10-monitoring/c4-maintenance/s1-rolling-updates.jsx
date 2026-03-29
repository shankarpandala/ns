import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function RollingUpdates() {
  return (
    <SectionLayout
      title="Rolling Updates with Zero Downtime"
      description="Deploying code changes to the trading system without interrupting active trading."
    >
      <DefinitionBlock term="Zero-Downtime Deployment">
        Updating the trading system while it continues to operate. New code is
        loaded alongside the old version, and traffic is switched over only
        after the new version passes health checks.
      </DefinitionBlock>

      <CodeBlock language="python" title="Graceful Strategy Hot-Reload">
{`import importlib
import sys
import logging

logger = logging.getLogger('deployer')

class StrategyHotReloader:
    """Reload strategy modules without stopping the engine."""

    def __init__(self, engine):
        self.engine = engine
        self.active_strategies = {}

    def reload_strategy(self, module_name):
        """Hot-reload a strategy module."""
        logger.info(f"Reloading strategy: {module_name}")

        # Save current state
        old_strategy = self.active_strategies.get(module_name)
        state = old_strategy.get_state() if old_strategy else None

        try:
            # Reload the module
            if module_name in sys.modules:
                module = importlib.reload(sys.modules[module_name])
            else:
                module = importlib.import_module(module_name)

            # Create new strategy instance
            new_strategy = module.Strategy()
            if state:
                new_strategy.restore_state(state)

            # Health check
            if not new_strategy.health_check():
                raise Exception("Health check failed")

            # Swap in the new strategy
            self.active_strategies[module_name] = new_strategy
            self.engine.register_strategy(new_strategy)
            logger.info(f"Strategy {module_name} reloaded successfully")
            return True

        except Exception as e:
            logger.error(f"Reload failed: {e}, keeping old version")
            if old_strategy:
                self.engine.register_strategy(old_strategy)
            return False`}
      </CodeBlock>

      <CodeBlock language="bash" title="Deployment Script">
{`#!/bin/bash
# deploy.sh - Zero-downtime deployment for NemoClaw

set -e
DEPLOY_DIR="/home/user/ns"
BACKUP_DIR="/home/user/ns-backup-$(date +%Y%m%d%H%M)"

echo "Creating backup..."
cp -r "$DEPLOY_DIR" "$BACKUP_DIR"

echo "Pulling latest code..."
cd "$DEPLOY_DIR" && git pull origin main

echo "Installing dependencies..."
pip install -r requirements.txt --quiet

echo "Running tests..."
python -m pytest tests/ -q --tb=short
if [ $? -ne 0 ]; then
    echo "Tests failed! Rolling back..."
    rm -rf "$DEPLOY_DIR"
    mv "$BACKUP_DIR" "$DEPLOY_DIR"
    exit 1
fi

echo "Sending reload signal..."
curl -X POST http://localhost:8080/admin/reload

echo "Verifying health..."
sleep 5
STATUS=$(curl -s http://localhost:8080/health | python -c "import sys,json; print(json.load(sys.stdin)['status'])")
if [ "$STATUS" != "healthy" ]; then
    echo "Health check failed! Rolling back..."
    rm -rf "$DEPLOY_DIR"
    mv "$BACKUP_DIR" "$DEPLOY_DIR"
    curl -X POST http://localhost:8080/admin/reload
    exit 1
fi

echo "Deployment successful!"
rm -rf "$BACKUP_DIR"`}
      </CodeBlock>

      <NoteBlock title="Deploy Outside Market Hours">
        Always deploy between 4:00 PM and 8:00 AM IST when markets are closed.
        If an urgent hotfix is needed during market hours, flatten all positions
        first, deploy, verify, then resume trading with reduced size.
      </NoteBlock>
    </SectionLayout>
  )
}
