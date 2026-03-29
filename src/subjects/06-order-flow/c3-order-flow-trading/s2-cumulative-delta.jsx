import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function CumulativeDelta() {
  return (
    <SectionLayout
      title="Cumulative Delta Analysis"
      description="Tracking the running sum of buy vs sell volume to gauge net aggression."
    >
      <DefinitionBlock term="Cumulative Delta">
        The running total of (aggressive buy volume - aggressive sell volume)
        over a session. Rising cumulative delta with rising price confirms
        the trend; divergence warns of potential reversal.
      </DefinitionBlock>

      <CodeBlock language="python" title="Computing Cumulative Delta">
{`import pandas as pd
import numpy as np

def compute_cumulative_delta(trades):
    """Calculate cumulative delta from classified trades."""
    trades = trades.sort_values('time').copy()

    # Tick rule classification
    trades['prev_price'] = trades['price'].shift(1)
    trades['signed_vol'] = np.where(
        trades['price'] >= trades['prev_price'],
        trades['qty'],      # Buy: hit the ask
        -trades['qty']      # Sell: hit the bid
    )

    trades['cum_delta'] = trades['signed_vol'].cumsum()
    return trades

# Simulated Nifty futures trades
np.random.seed(42)
n = 2000
trades = pd.DataFrame({
    'time': pd.date_range('2025-03-15 09:15', periods=n, freq='500ms'),
    'price': 22450 + np.cumsum(np.random.choice([-0.5, 0, 0.5],
                                n, p=[0.3, 0.3, 0.4])),
    'qty': np.random.randint(5, 100, n)
})

result = compute_cumulative_delta(trades)
print(f"Final cum delta: {result['cum_delta'].iloc[-1]:+,}")
print(f"Price change: {result['price'].iloc[-1] - result['price'].iloc[0]:+.2f}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Detecting Delta Divergence">
{`def detect_divergence(df, window=50):
    """Flag when price and cumulative delta diverge."""
    df['price_ma'] = df['price'].rolling(window).mean()
    df['delta_ma'] = df['cum_delta'].rolling(window).mean()

    df['price_rising'] = df['price_ma'] > df['price_ma'].shift(window)
    df['delta_falling'] = df['delta_ma'] < df['delta_ma'].shift(window)

    # Bearish divergence: price up, delta down
    df['bearish_div'] = df['price_rising'] & df['delta_falling']
    # Bullish divergence: price down, delta up
    df['bullish_div'] = ~df['price_rising'] & ~df['delta_falling']

    return df

result = detect_divergence(result)
divs = result[result['bearish_div']].shape[0]
print(f"Bearish divergence signals: {divs}")`}
      </CodeBlock>

      <NoteBlock title="Session Delta Reset">
        Reset cumulative delta at each NSE session open (9:15 AM). The first
        15 minutes of delta often sets the directional bias for the day.
        A cum delta above +5000 lots by 9:30 AM on Nifty futures strongly
        favors bulls for the session.
      </NoteBlock>
    </SectionLayout>
  )
}
