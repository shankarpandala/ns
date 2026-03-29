import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PositionHeatmap() {
  return (
    <SectionLayout
      title="Position Heatmap"
      description="Visual representation of portfolio exposure across instruments and sectors."
    >
      <DefinitionBlock term="Position Heatmap">
        A color-coded grid showing portfolio allocation and P&L across
        instruments. Green for profitable positions, red for losing ones,
        with size proportional to exposure. Provides instant visual awareness.
      </DefinitionBlock>

      <CodeBlock language="python" title="Position Heatmap Data Generator">
{`import pandas as pd

class PositionHeatmapData:
    """Generate heatmap data for dashboard visualization."""

    SECTOR_MAP = {
        'RELIANCE': 'Energy', 'ONGC': 'Energy',
        'HDFCBANK': 'Banking', 'ICICIBANK': 'Banking', 'SBIN': 'Banking',
        'TCS': 'IT', 'INFY': 'IT', 'WIPRO': 'IT',
        'SUNPHARMA': 'Pharma', 'DRREDDY': 'Pharma',
        'NIFTY': 'Index', 'BANKNIFTY': 'Index',
    }

    def __init__(self, broker):
        self.broker = broker

    def generate(self):
        positions = self.broker.positions()['net']
        heatmap_data = []

        for pos in positions:
            if pos['quantity'] == 0:
                continue
            symbol = pos['tradingsymbol']
            base_symbol = self._extract_base(symbol)
            exposure = abs(pos['quantity'] * pos['last_price'])
            pnl = pos.get('unrealised', 0)

            heatmap_data.append({
                'symbol': symbol,
                'sector': self.SECTOR_MAP.get(base_symbol, 'Other'),
                'exposure': exposure,
                'pnl': pnl,
                'pnl_pct': (pnl / exposure * 100) if exposure else 0,
                'side': 'LONG' if pos['quantity'] > 0 else 'SHORT',
                'quantity': pos['quantity'],
            })

        return pd.DataFrame(heatmap_data)

    def sector_summary(self):
        df = self.generate()
        if df.empty:
            return {}
        return df.groupby('sector').agg({
            'exposure': 'sum',
            'pnl': 'sum',
        }).to_dict('index')

    def concentration_check(self, max_pct=0.30):
        df = self.generate()
        total = df['exposure'].sum()
        df['weight'] = df['exposure'] / total
        concentrated = df[df['weight'] > max_pct]
        return concentrated[['symbol', 'weight', 'exposure']].to_dict('records')

    def _extract_base(self, symbol):
        for base in self.SECTOR_MAP:
            if symbol.startswith(base):
                return base
        return symbol

heatmap = PositionHeatmapData(kite)
sectors = heatmap.sector_summary()
for sector, data in sectors.items():
    print(f"{sector}: Exposure Rs {data['exposure']:,.0f}, PnL Rs {data['pnl']:,.0f}")`}
      </CodeBlock>

      <NoteBlock title="Dashboard Integration">
        Feed this data to a React frontend using a FastAPI endpoint that
        refreshes every 5 seconds. Use a treemap chart (e.g., recharts
        Treemap) where tile size represents exposure and color represents
        P&L percentage -- instantly spot your biggest risk concentrations.
      </NoteBlock>
    </SectionLayout>
  )
}
