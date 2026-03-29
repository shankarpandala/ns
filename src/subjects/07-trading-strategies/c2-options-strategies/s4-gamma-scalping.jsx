import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function GammaScalping() {
  return (
    <SectionLayout
      title="Gamma Scalping & Delta Hedging"
      description="Profiting from realized volatility by dynamically hedging delta."
    >
      <DefinitionBlock term="Gamma Scalping">
        Buy options (long gamma) and hedge delta with futures. As price moves,
        gamma creates delta that you scalp by rehedging. Profitable when
        realized volatility exceeds implied volatility paid.
      </DefinitionBlock>

      <CodeBlock language="python" title="Delta Hedging Simulation">
{`import numpy as np
from scipy.stats import norm

def bs_delta(S, K, T, r, sigma):
    if T <= 0:
        return 1.0 if S > K else 0.0
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    return norm.cdf(d1)

def gamma_scalp_sim(spot, strike, iv, days, r=0.07,
                    realized_vol=0.18, hedge_interval=50):
    """Simulate gamma scalping P&L."""
    T = days / 365
    dt = 1 / (365 * 24 * 60)  # per-minute steps
    n_steps = days * 375       # NSE trading minutes per day
    lot_size = 25

    # Entry: buy ATM straddle
    call_cost = spot * norm.cdf(
        (np.log(1) + (r + iv**2/2)*T) / (iv*np.sqrt(T))
    ) * 2  # Approximate straddle cost

    price = spot
    fut_position = 0
    hedge_pnl = 0
    prices = [spot]

    for i in range(1, n_steps):
        t_remaining = T - i * dt
        if t_remaining <= 0:
            break

        # Price moves with realized vol
        price *= np.exp(np.random.normal(0, realized_vol * np.sqrt(dt)))
        prices.append(price)

        # Rehedge every N steps
        if i % hedge_interval == 0:
            delta = bs_delta(price, strike, t_remaining, r, iv)
            new_pos = -round(delta * lot_size)
            trade = new_pos - fut_position
            hedge_pnl -= trade * price
            fut_position = new_pos

    # Close: mark everything to market
    final_pnl = (
        max(price - strike, 0) * lot_size  # call payoff
        + max(strike - price, 0) * lot_size  # put payoff
        + fut_position * price + hedge_pnl
        - call_cost * lot_size
    )
    return final_pnl

# Run simulation
np.random.seed(42)
pnls = [gamma_scalp_sim(22500, 22500, iv=0.14, days=5,
                         realized_vol=0.18) for _ in range(100)]
print(f"Avg P&L: Rs {np.mean(pnls):,.0f}")
print(f"Win rate: {sum(1 for p in pnls if p > 0)/len(pnls):.0%}")`}
      </CodeBlock>

      <NoteBlock title="Gamma Scalping on Nifty">
        Buy weekly ATM straddle when IV is below 13% (cheap gamma). Hedge
        delta with Nifty futures every 30-50 point move. The strategy wins
        on event days (RBI, US CPI) when realized vol exceeds IV by 3%+.
        Transaction costs from frequent hedging are the main drag.
      </NoteBlock>
    </SectionLayout>
  )
}
