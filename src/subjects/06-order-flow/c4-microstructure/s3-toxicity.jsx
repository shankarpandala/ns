import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function Toxicity() {
  return (
    <SectionLayout
      title="Flow Toxicity & Adverse Selection"
      description="Measuring how dangerous order flow is for liquidity providers."
    >
      <DefinitionBlock term="Flow Toxicity">
        The degree to which incoming order flow is informed (trading on
        private information). Toxic flow causes losses for market makers
        who trade against it. Measured via VPIN, realized spread, and
        adverse selection components.
      </DefinitionBlock>

      <DefinitionBlock term="Adverse Selection">
        The risk that a counterparty knows more than you. In market making,
        adverse selection cost = effective spread - realized spread. When
        this is positive and large, informed traders are exploiting the
        market maker.
      </DefinitionBlock>

      <CodeBlock language="python" title="Adverse Selection Decomposition">
{`import pandas as pd
import numpy as np

def spread_decomposition(trades, horizon=10):
    """Decompose spread into realized and adverse selection."""
    trades = trades.copy()
    trades['mid'] = (trades['bid'] + trades['ask']) / 2
    trades['mid_fwd'] = trades['mid'].shift(-horizon)

    # Trade direction: +1 buy, -1 sell
    trades['dir'] = np.where(
        trades['price'] >= trades['mid'], 1, -1)

    # Effective half-spread
    trades['eff_hs'] = trades['dir'] * (trades['price'] - trades['mid'])

    # Realized half-spread
    trades['real_hs'] = trades['dir'] * (trades['price'] - trades['mid_fwd'])

    # Adverse selection = effective - realized
    trades['adv_sel'] = trades['eff_hs'] - trades['real_hs']

    return {
        'effective_hs': trades['eff_hs'].mean(),
        'realized_hs': trades['real_hs'].mean(),
        'adverse_selection': trades['adv_sel'].mean(),
    }

np.random.seed(42)
n = 1000
mid = 22450 + np.cumsum(np.random.normal(0, 0.1, n))
trades = pd.DataFrame({
    'bid': mid - 0.25,
    'ask': mid + 0.25,
    'price': mid + np.random.choice([-0.25, 0.25], n),
    'qty': np.random.randint(5, 100, n)
})
result = spread_decomposition(trades)
for k, v in result.items():
    print(f"{k}: {v:.4f}")`}
      </CodeBlock>

      <NoteBlock title="Toxicity and Indian Market Events">
        Flow toxicity on Nifty options spikes 30-60 minutes before SEBI
        circular releases and corporate earnings. Monitor toxicity across
        strike prices -- elevated toxicity at ATM options before an event
        strongly suggests informed pre-positioning.
      </NoteBlock>
    </SectionLayout>
  )
}
