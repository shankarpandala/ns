import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function CMF() {
  return (
    <SectionLayout
      title="Chaikin Money Flow"
      description="Measuring buying and selling pressure over a rolling window for Indian market stocks."
    >
      <DefinitionBlock term="Chaikin Money Flow (CMF)">
        A volume-weighted average of accumulation/distribution over a period (default
        20). CMF = Sum(CLV x Volume, N) / Sum(Volume, N). It oscillates between -1
        and +1. Positive CMF indicates buying pressure; negative indicates selling.
      </DefinitionBlock>

      <CodeBlock language="python" title="CMF Calculation on NSE Stocks">
{`import pandas as pd
import numpy as np
import yfinance as yf

hdfc = yf.download("HDFCBANK.NS", start="2024-01-01", end="2025-12-31")

# Close Location Value
clv = ((hdfc['Close'] - hdfc['Low']) - (hdfc['High'] - hdfc['Close'])) / \
      (hdfc['High'] - hdfc['Low'])
clv = clv.fillna(0)

# Money Flow Volume
mfv = clv * hdfc['Volume']

# CMF (20-period)
period = 20
hdfc['CMF'] = mfv.rolling(period).sum() / hdfc['Volume'].rolling(period).sum()

print(hdfc[['Close', 'CMF']].tail(10))`}
      </CodeBlock>

      <CodeBlock language="python" title="CMF Trading Signals">
{`# Basic signals
hdfc['cmf_buy'] = (hdfc['CMF'] > 0.05) & (hdfc['CMF'].shift(1) <= 0.05)
hdfc['cmf_sell'] = (hdfc['CMF'] < -0.05) & (hdfc['CMF'].shift(1) >= -0.05)

# CMF trend confirmation: price above 50-SMA and CMF positive
hdfc['SMA_50'] = hdfc['Close'].rolling(50).mean()
hdfc['confirmed_uptrend'] = (hdfc['Close'] > hdfc['SMA_50']) & (hdfc['CMF'] > 0)

# Backtest simple CMF strategy
hdfc['returns'] = hdfc['Close'].pct_change()
hdfc['strategy_returns'] = np.where(
    hdfc['confirmed_uptrend'].shift(1), hdfc['returns'], 0
)

total_ret = (1 + hdfc['strategy_returns']).prod() - 1
buyhold_ret = (1 + hdfc['returns']).prod() - 1
print(f"CMF Strategy Return: {total_ret:.2%}")
print(f"Buy & Hold Return: {buyhold_ret:.2%}")`}
      </CodeBlock>

      <CodeBlock language="python" title="CMF Divergence Scanner">
{`def cmf_divergence_scan(tickers):
    results = []
    for t in tickers:
        df = yf.download(t, period="3mo", progress=False)
        if len(df) < 30:
            continue
        clv = ((df['Close'] - df['Low']) - (df['High'] - df['Close'])) / \
              (df['High'] - df['Low'])
        mfv = clv.fillna(0) * df['Volume']
        cmf = mfv.rolling(20).sum() / df['Volume'].rolling(20).sum()

        # Check last 10 days for divergence
        price_up = df['Close'].iloc[-1] > df['Close'].iloc[-10]
        cmf_down = cmf.iloc[-1] < cmf.iloc[-10]
        if price_up and cmf_down:
            results.append({'Stock': t.replace('.NS',''), 'Signal': 'BEARISH_DIV',
                            'CMF': round(cmf.iloc[-1], 3)})
    return pd.DataFrame(results)

nifty_stocks = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS"]
print(cmf_divergence_scan(nifty_stocks).to_string(index=False))`}
      </CodeBlock>

      <NoteBlock title="Indian Market Insight">
        CMF above +0.10 on HDFC Bank, Reliance, or TCS often aligns with FII buying
        phases visible in SEBI data. Negative CMF during price rallies in mid-caps
        is a red flag -- it suggests retail buying while institutions distribute.
      </NoteBlock>
    </SectionLayout>
  )
}
