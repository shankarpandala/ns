import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function EventDriven() {
  return (
    <SectionLayout
      title="Event-Driven Trading"
      description="Strategies around earnings, RBI policy, budget, and elections in India."
    >
      <DefinitionBlock term="Event-Driven Strategy">
        Trading around scheduled events that cause volatility expansion.
        The edge comes from correctly positioning before the event or
        trading the post-event price adjustment.
      </DefinitionBlock>

      <CodeBlock language="python" title="Earnings Straddle Strategy">
{`import numpy as np
import pandas as pd

def earnings_straddle(stock, iv_before, iv_after_est,
                      days_to_expiry, spot, lot_size):
    """Pre-earnings straddle: buy before, sell after IV crush."""
    # Expected move from options pricing
    straddle_price = spot * iv_before * np.sqrt(days_to_expiry / 365)
    expected_move = straddle_price / spot * 100

    # Post-earnings IV crush impact
    iv_drop = iv_before - iv_after_est
    vega_loss = iv_drop * spot * np.sqrt(days_to_expiry / 365) * 0.01

    # Need actual move > straddle cost - vega loss
    breakeven_move = (straddle_price - vega_loss) / spot * 100

    return {
        'straddle_cost': straddle_price * lot_size,
        'expected_move_pct': expected_move,
        'breakeven_move_pct': breakeven_move,
        'iv_crush_loss': vega_loss * lot_size,
    }

# TCS earnings: IV jumps from 20% to 35% before results
result = earnings_straddle(
    stock='TCS', iv_before=0.35, iv_after_est=0.20,
    days_to_expiry=5, spot=3800, lot_size=175
)
print(f"Straddle cost: Rs {result['straddle_cost']:,.0f}")
print(f"Expected move: {result['expected_move_pct']:.1f}%")
print(f"Breakeven move needed: {result['breakeven_move_pct']:.1f}%")`}
      </CodeBlock>

      <CodeBlock language="python" title="RBI Policy Day Framework">
{`rbi_events = {
    'rate_cut': {'nifty_bias': 'bullish', 'bank_nifty': 'very_bullish',
                 'avg_move': 150, 'play': 'buy BankNifty calls'},
    'rate_hold': {'nifty_bias': 'neutral', 'bank_nifty': 'mild_negative',
                  'avg_move': 50, 'play': 'sell strangles'},
    'rate_hike': {'nifty_bias': 'bearish', 'bank_nifty': 'very_bearish',
                  'avg_move': 200, 'play': 'buy BankNifty puts'},
    'surprise': {'nifty_bias': 'volatile', 'bank_nifty': 'volatile',
                 'avg_move': 300, 'play': 'buy straddle pre-event'},
}

# Strategy: buy BankNifty straddle 1 day before RBI meeting
# Close 50% at announcement, trail rest with 30% stop
print("RBI announces at 10:00 AM on policy day")
print("Key: position before 9:30 AM, most move happens by 10:15 AM")`}
      </CodeBlock>

      <NoteBlock title="Election Trading">
        State and general election results cause 3-5% Nifty moves. Buy
        straddles 2-3 days before counting day when IV is still affordable.
        The 2024 general election saw a 1400-point Nifty swing on result
        day. Position size should be halved for election event trades.
      </NoteBlock>
    </SectionLayout>
  )
}
