import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function LiquidityMapping() {
  return (
    <SectionLayout
      title="Liquidity Mapping"
      description="Identifying thin and thick zones in the order book for execution planning."
    >
      <DefinitionBlock term="Liquidity Layer">
        A price zone where resting order volume is significantly above average.
        These layers act as short-term support/resistance and absorb aggressive
        market orders before price can break through.
      </DefinitionBlock>

      <DefinitionBlock term="Thin Book Zone">
        Price levels with minimal resting orders. Price moves quickly through
        thin zones, causing slippage for large orders and creating fast spikes.
      </DefinitionBlock>

      <CodeBlock language="python" title="Mapping Liquidity Layers">
{`import numpy as np

def map_liquidity(bids, asks, threshold_mult=2.0):
    """Classify price levels as thick or thin liquidity."""
    all_qty = [o['qty'] for o in bids + asks]
    median_qty = np.median(all_qty)
    threshold = median_qty * threshold_mult

    layers = {'thick_bid': [], 'thick_ask': [], 'thin': []}

    for b in bids:
        if b['qty'] >= threshold:
            layers['thick_bid'].append(b['price'])

    for a in asks:
        if a['qty'] >= threshold:
            layers['thick_ask'].append(a['price'])

    for o in bids + asks:
        if o['qty'] < median_qty * 0.3:
            layers['thin'].append(o['price'])

    return layers

# Example: 10-level Nifty futures book
bids = [{'price': 22450 - i*0.5, 'qty': q}
        for i, q in enumerate([1200, 800, 4500, 300, 2100,
                                600, 3800, 200, 1100, 900])]
asks = [{'price': 22450.5 + i*0.5, 'qty': q}
        for i, q in enumerate([1000, 5200, 700, 400, 3000,
                                800, 200, 1500, 2800, 600])]

layers = map_liquidity(bids, asks)
print("Thick bid walls:", layers['thick_bid'])
print("Thick ask walls:", layers['thick_ask'])
print("Thin zones:", layers['thin'])`}
      </CodeBlock>

      <NoteBlock title="Execution Insight">
        When placing large orders on BankNifty futures, route through thick
        liquidity zones to minimize slippage. Avoid market orders when the
        book shows thin zones near the current price -- use limit orders
        instead and let the market come to you.
      </NoteBlock>
    </SectionLayout>
  )
}
