import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function InstitutionalFlow() {
  return (
    <SectionLayout
      title="Tracking Institutional Flow in Indian Markets"
      description="Using FII/DII data, delivery percentages, and options flow to follow big money."
    >
      <DefinitionBlock term="FII/DII Data">
        SEBI mandates daily disclosure of Foreign Institutional Investor (FII)
        and Domestic Institutional Investor (DII) net buy/sell figures. This
        data, published by NSE after market close, reveals institutional
        positioning in cash and derivatives segments.
      </DefinitionBlock>

      <CodeBlock language="python" title="FII/DII Flow Analysis">
{`import pandas as pd
import numpy as np

def analyze_fii_dii(data):
    """Analyze FII/DII net flow for directional bias."""
    data['fii_net'] = data['fii_buy'] - data['fii_sell']
    data['dii_net'] = data['dii_buy'] - data['dii_sell']

    # Rolling 5-day net flow
    data['fii_5d'] = data['fii_net'].rolling(5).sum()
    data['dii_5d'] = data['dii_net'].rolling(5).sum()

    # FII and DII both buying = strongly bullish
    data['both_buying'] = (data['fii_net'] > 0) & (data['dii_net'] > 0)

    # FII selling, DII buying = transition/correction
    data['fii_sell_dii_buy'] = (data['fii_net'] < 0) & (data['dii_net'] > 0)

    return data

# Simulated monthly data (values in Rs Crores)
np.random.seed(42)
days = 22
data = pd.DataFrame({
    'date': pd.bdate_range('2025-03-01', periods=days),
    'fii_buy': np.random.uniform(8000, 15000, days),
    'fii_sell': np.random.uniform(8000, 15000, days),
    'dii_buy': np.random.uniform(6000, 12000, days),
    'dii_sell': np.random.uniform(6000, 12000, days),
})
result = analyze_fii_dii(data)
print(f"Days both buying: {result['both_buying'].sum()}")
print(f"FII 5-day net: Rs {result['fii_5d'].iloc[-1]:,.0f} Cr")`}
      </CodeBlock>

      <CodeBlock language="python" title="Delivery Percentage as Institutional Proxy">
{`def institutional_signals(daily_data):
    """High delivery % + high volume = institutional activity."""
    daily_data['inst_signal'] = (
        (daily_data['delivery_pct'] > 60) &
        (daily_data['volume'] > daily_data['volume'].rolling(20).mean() * 1.5)
    )

    # Stocks with rising delivery % over 5 days
    daily_data['delivery_trend'] = (
        daily_data['delivery_pct'].rolling(5).mean() >
        daily_data['delivery_pct'].rolling(20).mean()
    )
    return daily_data

# Delivery % above 60% with above-average volume
# strongly suggests institutional accumulation in Indian stocks`}
      </CodeBlock>

      <NoteBlock title="Options Flow for Institutional Tracking">
        Track OI buildup in Nifty options by strike. Large OI addition in
        deep OTM puts by FIIs (visible in NSE participant-wise OI data)
        signals hedging of long equity positions. Conversely, heavy call
        writing at round strikes (22500, 23000) indicates resistance expectations.
      </NoteBlock>
    </SectionLayout>
  )
}
