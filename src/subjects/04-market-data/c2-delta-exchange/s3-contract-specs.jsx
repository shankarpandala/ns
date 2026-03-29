import SectionLayout from '../../../components/content/SectionLayout'
import ComparisonTable from '../../../components/content/ComparisonTable'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import CodeBlock from '../../../components/content/CodeBlock'

export default function ContractSpecs() {
  return (
    <SectionLayout
      title="Contract Specifications"
      subtitle="Understanding futures, options, settlement, and expiry on Delta Exchange"
      difficulty="intermediate"
      readingMinutes={5}
    >
      <ComparisonTable
        title="Key Contract Types"
        headers={['Contract', 'Settlement', 'Expiry', 'Lot Size']}
        rows={[
          ['BTCINR Perpetual', 'INR (cash)', 'No expiry', '0.001 BTC'],
          ['BTCINR Futures', 'INR (cash)', 'Monthly', '0.001 BTC'],
          ['ETHINR Perpetual', 'INR (cash)', 'No expiry', '0.01 ETH'],
          ['NIFTY Futures', 'INR (cash)', 'Weekly/Monthly', '1 unit'],
          ['BTC Options', 'INR (cash)', 'Daily/Weekly', '0.001 BTC'],
        ]}
      />

      <DefinitionBlock
        term="Perpetual Swap"
        definition="A futures contract with no expiry date. Instead of settlement, a funding rate is exchanged between longs and shorts every 8 hours to keep the price anchored to spot."
        example="If funding rate is +0.01%, longs pay shorts 0.01% of position value every 8 hours."
      />

      <CodeBlock
        language="python"
        title="Fetch contract details programmatically"
        code={`def get_contract_info(client, symbol):
    products = client.get_products()
    contract = next(p for p in products if p["symbol"] == symbol)
    return {
        "symbol": contract["symbol"],
        "type": contract["contract_type"],
        "tick_size": contract["tick_size"],
        "lot_size": contract["contract_size"],
        "settlement": contract["settlement_currency"],
        "funding_interval": contract.get("funding_interval"),
    }

info = get_contract_info(client, "BTCINR")
print(f"Tick size: {info['tick_size']}")
print(f"Min order: {info['lot_size']}")`}
      />

      <NoteBlock type="warning" title="Funding Rate Risk">
        <p>Perpetual swaps charge funding every 8 hours. In trending markets, funding can be
        0.1% or more per interval -- that is 0.3%/day or ~9%/month. Factor this into any
        carry or basis trade strategy.</p>
      </NoteBlock>

      <NoteBlock type="tip" title="Expiry Calendar">
        <p>Delta NIFTY futures expire weekly on Thursday (same as NSE). BTC/ETH options have
        daily expiries. Fetch the expiry list with <code>client.get_products()</code> and
        filter by <code>settlement_time</code>.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
