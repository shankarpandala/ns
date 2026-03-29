import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function IronCondor() {
  return (
    <SectionLayout
      title="Iron Condor & Butterfly Spreads"
      description="Defined-risk range-bound strategies on Nifty options."
    >
      <DefinitionBlock term="Iron Condor">
        Sell an OTM call spread and an OTM put spread simultaneously. Risk is
        capped at the width of the wider spread minus net premium. Profits
        when Nifty stays within the short strikes.
      </DefinitionBlock>

      <DefinitionBlock term="Iron Butterfly">
        Sell ATM call and put, buy OTM call and put for protection. Tighter
        profit zone than iron condor but higher premium collected. Best
        when expecting very low volatility.
      </DefinitionBlock>

      <CodeBlock language="python" title="Iron Condor on Nifty">
{`import numpy as np

def iron_condor(spot, short_call, long_call, short_put, long_put,
                sc_prem, lc_prem, sp_prem, lp_prem, lots=1):
    """Calculate iron condor metrics for Nifty options."""
    lot_size = 25
    net_credit = (sc_prem - lc_prem + sp_prem - lp_prem) * lot_size * lots

    call_width = (long_call - short_call) * lot_size * lots
    put_width = (short_put - long_put) * lot_size * lots
    max_loss = max(call_width, put_width) - net_credit

    upper_be = short_call + net_credit / (lot_size * lots)
    lower_be = short_put - net_credit / (lot_size * lots)

    return {
        'net_credit': net_credit,
        'max_loss': max_loss,
        'risk_reward': net_credit / max_loss,
        'upper_be': upper_be,
        'lower_be': lower_be,
        'prob_profit': (upper_be - lower_be) / (spot * 0.04)  # rough estimate
    }

# Nifty at 22500
ic = iron_condor(
    spot=22500,
    short_call=22700, long_call=22800,
    short_put=22300, long_put=22200,
    sc_prem=45, lc_prem=20,
    sp_prem=50, lp_prem=22,
    lots=2
)
print(f"Net credit: Rs {ic['net_credit']:,}")
print(f"Max loss: Rs {ic['max_loss']:,}")
print(f"Risk/Reward: {ic['risk_reward']:.2f}")
print(f"Breakevens: {ic['lower_be']:.0f} - {ic['upper_be']:.0f}")`}
      </CodeBlock>

      <NoteBlock title="Iron Condor Adjustments">
        If Nifty approaches a short strike, roll that side out by 100 points
        for a small debit. If both sides are tested, close the position.
        The best iron condors on Nifty use 100-point wide wings with short
        strikes at 1-sigma (about 200 points from spot on weekly expiry).
      </NoteBlock>
    </SectionLayout>
  )
}
