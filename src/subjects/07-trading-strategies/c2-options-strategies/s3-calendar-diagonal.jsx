import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function CalendarDiagonal() {
  return (
    <SectionLayout
      title="Calendar & Diagonal Spreads"
      description="Trading the term structure of implied volatility on Nifty options."
    >
      <DefinitionBlock term="Calendar Spread">
        Sell a near-term option and buy the same strike in a later expiry.
        Profits from faster time decay of the short leg and/or an increase
        in IV of the long leg. Also called a horizontal or time spread.
      </DefinitionBlock>

      <DefinitionBlock term="Diagonal Spread">
        Like a calendar but with different strikes. Sell near-term OTM,
        buy later-term ATM or slightly OTM. Combines directional bias
        with time spread characteristics.
      </DefinitionBlock>

      <CodeBlock language="python" title="Calendar Spread P&L Estimation">
{`from scipy.stats import norm
import numpy as np

def bs_call(S, K, T, r, sigma):
    """Black-Scholes call price."""
    if T <= 0:
        return max(S - K, 0)
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def calendar_spread_pnl(spot, strike, iv_near, iv_far,
                         days_near, days_far, r=0.07):
    """P&L of calendar spread at various spot prices at near expiry."""
    T_near = days_near / 365
    T_far = days_far / 365
    T_far_at_near_exp = (days_far - days_near) / 365

    # Entry cost
    short_entry = bs_call(spot, strike, T_near, r, iv_near)
    long_entry = bs_call(spot, strike, T_far, r, iv_far)
    debit = long_entry - short_entry

    # P&L at near expiry for various spots
    spots = np.arange(spot - 300, spot + 300, 10)
    pnls = []
    for s in spots:
        short_pnl = short_entry - max(s - strike, 0)
        long_val = bs_call(s, strike, T_far_at_near_exp, r, iv_far)
        net = short_pnl + long_val - long_entry
        pnls.append({'spot': s, 'pnl_per_lot': net * 25})

    return pnls, debit * 25

# Nifty calendar: sell weekly 22500 CE, buy monthly 22500 CE
pnls, cost = calendar_spread_pnl(
    spot=22500, strike=22500,
    iv_near=0.14, iv_far=0.15,
    days_near=3, days_far=24
)
print(f"Entry debit per lot: Rs {cost:.0f}")
print(f"Max profit zone: around the strike at near expiry")`}
      </CodeBlock>

      <NoteBlock title="Calendar Spread on Nifty">
        The weekly-monthly calendar works best when weekly IV is elevated
        relative to monthly (sell expensive weekly, buy cheaper monthly).
        This often occurs before Thursday expiry when weekly options have
        inflated gamma. Risk is limited to the debit paid.
      </NoteBlock>
    </SectionLayout>
  )
}
