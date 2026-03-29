import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function CustomIndicators() {
  return (
    <SectionLayout
      title="Building Custom Indicators"
      description="Creating your own technical indicators in Python with pandas and numpy for NSE trading."
    >
      <DefinitionBlock term="Custom Indicator">
        A user-defined mathematical transformation of price, volume, or other market
        data. Custom indicators can combine multiple standard indicators, apply
        unique smoothing, or incorporate domain-specific logic.
      </DefinitionBlock>

      <CodeBlock language="python" title="Trend Strength Composite">
{`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def trend_strength_index(df, fast=10, slow=30):
    """Composite: normalized EMA spread + ADX component + volume trend."""
    # EMA spread (normalized)
    ema_f = df['Close'].ewm(span=fast, adjust=False).mean()
    ema_s = df['Close'].ewm(span=slow, adjust=False).mean()
    spread = (ema_f - ema_s) / df['Close'] * 100

    # Volume trend (ratio of recent to average volume)
    vol_ratio = df['Volume'].rolling(5).mean() / df['Volume'].rolling(20).mean()

    # Price momentum (ROC normalized)
    roc = df['Close'].pct_change(fast) * 100

    # Composite score: weighted sum
    tsi = 0.4 * spread + 0.3 * roc + 0.3 * (vol_ratio - 1) * 10
    return tsi

nifty['TSI'] = trend_strength_index(nifty)
print(nifty[['Close', 'TSI']].tail(10))`}
      </CodeBlock>

      <CodeBlock language="python" title="Mean Reversion Z-Score Indicator">
{`def zscore_indicator(series, lookback=20):
    """Z-score of price relative to its rolling mean."""
    mean = series.rolling(lookback).mean()
    std = series.rolling(lookback).std()
    return (series - mean) / std

nifty['ZScore'] = zscore_indicator(nifty['Close'])

# Signals: extreme z-scores suggest mean reversion
nifty['z_buy'] = nifty['ZScore'] < -2.0   # Oversold
nifty['z_sell'] = nifty['ZScore'] > 2.0   # Overbought

print(f"Z-score buy signals: {nifty['z_buy'].sum()}")
print(f"Z-score sell signals: {nifty['z_sell'].sum()}")`}
      </CodeBlock>

      <CodeBlock language="python" title="Reusable Indicator Framework">
{`class Indicator:
    """Base class for custom indicators."""
    def __init__(self, df):
        self.df = df.copy()

    def add_ema(self, col, span, name=None):
        name = name or f'EMA_{span}'
        self.df[name] = self.df[col].ewm(span=span, adjust=False).mean()
        return self

    def add_rsi(self, col='Close', period=14, name='RSI'):
        delta = self.df[col].diff()
        gain = delta.where(delta > 0, 0).rolling(period).mean()
        loss = -delta.where(delta < 0, 0).rolling(period).mean()
        self.df[name] = 100 - (100 / (1 + gain / loss))
        return self

    def add_atr(self, period=14, name='ATR'):
        tr = pd.concat([
            self.df['High'] - self.df['Low'],
            abs(self.df['High'] - self.df['Close'].shift(1)),
            abs(self.df['Low'] - self.df['Close'].shift(1))
        ], axis=1).max(axis=1)
        self.df[name] = tr.rolling(period).mean()
        return self

    def result(self):
        return self.df

# Usage
ind = Indicator(nifty)
result = (ind.add_ema('Close', 20)
             .add_rsi()
             .add_atr()
             .result())
print(result[['Close', 'EMA_20', 'RSI', 'ATR']].tail())`}
      </CodeBlock>

      <NoteBlock title="Building Your Edge">
        Start with standard indicators, then tweak parameters for Indian market
        behavior. Nifty tends to mean-revert on daily timeframes (Z-score works well)
        but trends on weekly charts (composite trend scores shine). Always backtest
        custom indicators on at least 3 years of NSE data before live deployment.
      </NoteBlock>
    </SectionLayout>
  )
}
