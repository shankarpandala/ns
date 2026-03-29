import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function SttBrokerage() {
  return (
    <SectionLayout
      title="STT, Brokerage & Tax Modeling"
      description="Accurately modeling Indian trading costs: STT, stamp duty, GST, exchange charges, and brokerage."
    >
      <ComparisonTable
        title="Transaction Cost Breakdown (Zerodha)"
        headers={['Charge', 'Equity Intraday', 'F&O Futures', 'F&O Options']}
        rows={[
          ['Brokerage', '0.03% or Rs.20', '0.03% or Rs.20', 'Rs.20 flat/order'],
          ['STT', '0.025% (sell)', '0.02% (sell)', '0.1% (sell, on premium)'],
          ['Exchange Txn', '0.00345%', '0.002%', '0.05%'],
          ['Stamp Duty', '0.003% (buy)', '0.002% (buy)', '0.003% (buy)'],
          ['GST', '18% on (brkrg+txn)', '18% on (brkrg+txn)', '18% on (brkrg+txn)'],
          ['SEBI Fee', '0.0001%', '0.0001%', '0.0001%'],
        ]}
      />

      <CodeBlock language="python" title="Transaction Cost Calculator">
{`class IndianTxnCosts:
    """Calculate all transaction costs for Indian markets."""

    def __init__(self, broker='zerodha'):
        self.brokerage_cap = 20.0  # Rs 20 per order cap
        self.brokerage_pct = 0.0003  # 0.03%

    def calculate(self, price, qty, side, instrument='equity_intraday'):
        turnover = price * qty
        brokerage = min(turnover * self.brokerage_pct, self.brokerage_cap)

        costs = {'brokerage': brokerage}

        if instrument == 'fo_options':
            costs['stt'] = turnover * 0.001 if side == 'SELL' else 0
            costs['exchange_txn'] = turnover * 0.0005
            costs['stamp_duty'] = turnover * 0.00003 if side == 'BUY' else 0
        elif instrument == 'fo_futures':
            costs['stt'] = turnover * 0.0002 if side == 'SELL' else 0
            costs['exchange_txn'] = turnover * 0.00002
            costs['stamp_duty'] = turnover * 0.00002 if side == 'BUY' else 0
        else:  # equity intraday
            costs['stt'] = turnover * 0.00025 if side == 'SELL' else 0
            costs['exchange_txn'] = turnover * 0.0000345
            costs['stamp_duty'] = turnover * 0.00003 if side == 'BUY' else 0

        costs['sebi_fee'] = turnover * 0.000001
        costs['gst'] = (costs['brokerage'] + costs['exchange_txn']) * 0.18
        costs['total'] = sum(costs.values())
        return costs

# Example: Selling 1 lot Nifty options (75 qty) at Rs 200
calc = IndianTxnCosts()
costs = calc.calculate(200, 75, 'SELL', 'fo_options')
print(f"Total costs: Rs {costs['total']:.2f}")`}
      </CodeBlock>

      <NoteBlock title="Cost Impact on Options Scalping">
        For Nifty options scalping, total round-trip costs can be Rs 80-120 per
        lot. If your average profit target is Rs 5-10 per lot (Rs 375-750),
        costs consume 10-30% of profits. Always include costs in backtests.
      </NoteBlock>
    </SectionLayout>
  )
}
