import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function ApiVersioning() {
  return (
    <SectionLayout
      title="Handling API Version Changes"
      description="Managing Zerodha and Delta Exchange API updates without breaking production trading."
    >
      <DefinitionBlock term="API Version Migration">
        The process of updating client code when broker APIs introduce breaking
        changes. Zerodha and Delta may change endpoints, response formats, or
        authentication methods with advance notice.
      </DefinitionBlock>

      <CodeBlock language="python" title="API Version Adapter Pattern">
{`from abc import ABC, abstractmethod

class BrokerAdapter(ABC):
    """Abstract adapter for broker API versioning."""

    @abstractmethod
    def place_order(self, symbol, side, qty, price=None):
        pass

    @abstractmethod
    def get_positions(self):
        pass

    @abstractmethod
    def get_ltp(self, symbols):
        pass

class KiteV3Adapter(BrokerAdapter):
    """Adapter for Kite Connect API v3."""

    def __init__(self, kite):
        self.kite = kite

    def place_order(self, symbol, side, qty, price=None):
        order_type = 'MARKET' if price is None else 'LIMIT'
        return self.kite.place_order(
            variety='regular',
            exchange='NFO',
            tradingsymbol=symbol,
            transaction_type=side,
            quantity=qty,
            product='MIS',
            order_type=order_type,
            price=price,
        )

    def get_positions(self):
        raw = self.kite.positions()['net']
        return [{
            'symbol': p['tradingsymbol'],
            'qty': p['quantity'],
            'avg_price': p['average_price'],
            'ltp': p['last_price'],
            'pnl': p['unrealised'],
        } for p in raw if p['quantity'] != 0]

    def get_ltp(self, symbols):
        raw = self.kite.ltp(symbols)
        return {k: v['last_price'] for k, v in raw.items()}

class KiteV4Adapter(BrokerAdapter):
    """Adapter for future Kite API v4 (when released)."""

    def __init__(self, kite_v4):
        self.kite = kite_v4

    def place_order(self, symbol, side, qty, price=None):
        # Adapt to new v4 API format
        return self.kite.create_order({
            'instrument': symbol,
            'direction': side,
            'quantity': qty,
            'limit_price': price,
        })

    # ... implement other methods for v4

def get_broker_adapter(version='v3', **kwargs):
    adapters = {
        'v3': KiteV3Adapter,
        'v4': KiteV4Adapter,
    }
    adapter_class = adapters.get(version)
    if not adapter_class:
        raise ValueError(f"Unsupported API version: {version}")
    return adapter_class(**kwargs)`}
      </CodeBlock>

      <CodeBlock language="python" title="API Change Detection">
{`import requests
import hashlib

class APIChangeMonitor:
    """Detect when broker APIs change unexpectedly."""

    def __init__(self, notifier):
        self.notifier = notifier
        self.response_schemas = {}

    def check_schema(self, name, url, headers=None):
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            keys = sorted(resp.json().keys()) if resp.ok else []
            schema_hash = hashlib.md5(str(keys).encode()).hexdigest()

            if name in self.response_schemas:
                if self.response_schemas[name] != schema_hash:
                    self.notifier.send(
                        "API Schema Change Detected",
                        f"{name}: response structure changed!",
                    )
            self.response_schemas[name] = schema_hash
        except Exception as e:
            self.notifier.send("API Check Failed", f"{name}: {e}")`}
      </CodeBlock>

      <NoteBlock title="Stay Updated">
        Subscribe to Zerodha Kite Connect changelog and Delta Exchange API
        announcements. Test against new API versions in a sandbox branch at
        least 1 week before they become mandatory. Pin your kiteconnect
        package version in requirements.txt to prevent surprise upgrades.
      </NoteBlock>
    </SectionLayout>
  )
}
