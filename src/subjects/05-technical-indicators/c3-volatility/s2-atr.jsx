import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import ComparisonTable from '../../../components/content/ComparisonTable'

export default function ATR() {
  return (
    <SectionLayout
      title="ATR: Average True Range"
      description="Measuring market volatility and sizing positions with ATR on Indian equities."
    >
      <DefinitionBlock term="Average True Range (ATR)">
        The smoothed average of True Range over N periods (default 14). True Range
        is the greatest of: High-Low, |High-PrevClose|, or |Low-PrevClose|. ATR
        measures volatility in absolute price terms, not direction.
      </DefinitionBlock>

      <CodeBlock language="python" title="ATR and Normalized ATR on Bank Nifty">
{`import pandas as pd
import yfinance as yf

bn = yf.download("^NSEBANK", start="2024-01-01", end="2025-12-31")

# True Range
high_low = bn['High'] - bn['Low']
high_close = abs(bn['High'] - bn['Close'].shift(1))
low_close = abs(bn['Low'] - bn['Close'].shift(1))
bn['TR'] = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)

# ATR (14-period, Wilder's smoothing)
period = 14
bn['ATR'] = bn['TR'].rolling(period).mean()
for i in range(period, len(bn)):
    bn['ATR'].iloc[i] = (bn['ATR'].iloc[i-1] * (period-1) + bn['TR'].iloc[i]) / period

# Normalized ATR (NATR) as percentage
bn['NATR'] = (bn['ATR'] / bn['Close']) * 100

print(f"Current ATR: {bn['ATR'].iloc[-1]:.0f} points")
print(f"Current NATR: {bn['NATR'].iloc[-1]:.2f}%")`}
      </CodeBlock>

      <CodeBlock language="python" title="ATR-Based Position Sizing">
{`capital = 500000  # INR 5 lakh
risk_per_trade = 0.02  # 2% risk per trade
risk_amount = capital * risk_per_trade  # INR 10,000

# Current ATR for stop-loss sizing
current_atr = bn['ATR'].iloc[-1]
atr_multiplier = 2  # Stop at 2x ATR

stop_distance = current_atr * atr_multiplier
position_size = risk_amount / stop_distance

print(f"ATR: {current_atr:.0f}")
print(f"Stop distance (2x ATR): {stop_distance:.0f} points")
print(f"Position size: {position_size:.1f} shares/units")
print(f"Max loss if stopped: INR {risk_amount:,.0f}")`}
      </CodeBlock>

      <ComparisonTable
        title="ATR Stop-Loss Multipliers"
        headers={['Multiplier', 'Use Case', 'Trade Style']}
        rows={[
          ['1x ATR', 'Tight stop, frequent exits', 'Scalping / intraday'],
          ['1.5x ATR', 'Balanced risk/reward', 'Swing trading'],
          ['2x ATR', 'Wide stop, fewer whipsaws', 'Positional trading'],
          ['3x ATR', 'Very loose, trend riding', 'Long-term trend following'],
        ]}
      />

      <NoteBlock title="Bank Nifty Volatility">
        Bank Nifty typically has an ATR of 500-800 points on daily charts. During
        RBI policy days or earnings weeks, ATR can spike to 1200+. Scale down
        position size when ATR expands to maintain consistent risk per trade.
      </NoteBlock>
    </SectionLayout>
  )
}
