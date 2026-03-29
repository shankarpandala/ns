import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function StraddleStrangle() {
  return (
    <SectionLayout
      title="Selling Straddles & Strangles on Weekly Expiry"
      description="Premium selling strategies exploiting theta decay on Nifty weekly options."
    >
      <DefinitionBlock term="Short Straddle">
        Sell ATM call and ATM put at the same strike. Maximum profit if Nifty
        expires exactly at the strike. Risk is unlimited on both sides.
        Profitable when realized volatility is less than implied.
      </DefinitionBlock>

      <DefinitionBlock term="Short Strangle">
        Sell OTM call and OTM put at different strikes. Wider profit zone
        than straddle but lower premium collected. The go-to strategy for
        Nifty weekly expiry sellers.
      </DefinitionBlock>

      <CodeBlock language="python" title="Short Strangle Setup and P&L">
{`import numpy as np

def short_strangle(spot, call_strike, put_strike,
                   call_premium, put_premium, lot_size=25):
    """Calculate P&L for short strangle on Nifty."""
    total_premium = (call_premium + put_premium) * lot_size

    expiry_range = np.arange(spot - 500, spot + 500, 10)
    pnl = []
    for s in expiry_range:
        call_payout = max(0, s - call_strike) * lot_size
        put_payout = max(0, put_strike - s) * lot_size
        net = total_premium - call_payout - put_payout
        pnl.append({'expiry': s, 'pnl': net})

    upper_be = call_strike + call_premium + put_premium
    lower_be = put_strike - call_premium - put_premium

    return {
        'premium': total_premium,
        'upper_be': upper_be,
        'lower_be': lower_be,
        'max_profit': total_premium,
        'profit_range': upper_be - lower_be,
        'pnl_curve': pnl
    }

# Nifty at 22500, sell 22600 CE and 22400 PE
result = short_strangle(
    spot=22500, call_strike=22600, put_strike=22400,
    call_premium=85, put_premium=90, lot_size=25
)
print(f"Premium collected: Rs {result['premium']:,}")
print(f"Breakevens: {result['lower_be']:.0f} - {result['upper_be']:.0f}")
print(f"Profit range: {result['profit_range']:.0f} points")`}
      </CodeBlock>

      <NoteBlock title="Weekly Expiry Edge">
        Nifty weekly options expire every Thursday. Theta decay accelerates
        from Wednesday afternoon. Selling strangles on Wednesday at 2 PM
        with strikes 200+ points away captures maximum theta with limited
        overnight gap risk. Always set stop-loss at 1.5x premium collected.
      </NoteBlock>
    </SectionLayout>
  )
}
