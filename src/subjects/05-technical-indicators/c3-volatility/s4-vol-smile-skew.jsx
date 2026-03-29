import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'
import WarningBlock from '../../../components/content/WarningBlock'

export default function VolSmileSkew() {
  return (
    <SectionLayout
      title="Volatility Smile & Skew"
      description="Understanding how implied volatility varies across strike prices for Nifty options."
    >
      <DefinitionBlock term="Volatility Smile">
        A U-shaped curve showing that OTM puts and OTM calls have higher IV than
        ATM options. This pattern reflects the market pricing in tail risk on both
        sides of the distribution.
      </DefinitionBlock>

      <DefinitionBlock term="Volatility Skew">
        The asymmetry in the smile -- OTM puts typically have higher IV than equidistant
        OTM calls. This negative skew (or put skew) reflects demand for downside
        protection and crash risk premium.
      </DefinitionBlock>

      <CodeBlock language="python" title="Extracting IV Smile from Nifty Options">
{`import pandas as pd
import numpy as np

# Simulated Nifty option chain IV data (real data from NSE API)
nifty_spot = 24500

strikes = list(range(23500, 25600, 100))
call_iv = [22.1, 21.3, 20.5, 19.8, 18.9, 17.6, 16.1, 14.8, 13.2,
           12.0, 11.5, 11.8, 12.5, 13.4, 14.6, 15.8, 17.1, 18.3,
           19.5, 20.6, 21.5]
put_iv =  [24.8, 23.5, 22.3, 21.0, 19.8, 18.2, 16.5, 15.0, 13.5,
           12.2, 11.7, 12.0, 12.8, 13.9, 15.2, 16.5, 17.9, 19.1,
           20.3, 21.4, 22.4]

chain = pd.DataFrame({
    'Strike': strikes,
    'Call_IV': call_iv,
    'Put_IV': put_iv,
    'Moneyness': [(s - nifty_spot) / nifty_spot * 100 for s in strikes]
})
print(chain.to_string(index=False))`}
      </CodeBlock>

      <CodeBlock language="python" title="Skew Metrics and Term Structure">
{`# 25-delta skew: IV(25d put) - IV(25d call)
# Approximate using OTM strikes at ~2% from spot
otm_put_strike = 24000  # ~2% below
otm_call_strike = 25000  # ~2% above

put_iv_25d = chain[chain['Strike'] == otm_put_strike]['Put_IV'].values[0]
call_iv_25d = chain[chain['Strike'] == otm_call_strike]['Call_IV'].values[0]
skew_25d = put_iv_25d - call_iv_25d

print(f"25-delta put IV: {put_iv_25d}%")
print(f"25-delta call IV: {call_iv_25d}%")
print(f"Skew (put - call): {skew_25d:.1f}%")

# Skew ratio (useful for tracking over time)
atm_iv = chain[chain['Strike'] == 24500]['Call_IV'].values[0]
skew_ratio = put_iv_25d / atm_iv
print(f"Skew ratio (OTM put / ATM): {skew_ratio:.2f}")

# Term structure: compare near vs far expiry ATM IV
term_structure = {
    'Weekly': 12.5, 'Monthly': 13.8,
    'Next Month': 14.5, '3-Month': 15.2,
}
print("\\nIV Term Structure:")
for exp, iv in term_structure.items():
    print(f"  {exp}: {iv}%")`}
      </CodeBlock>

      <WarningBlock>
        Skew can collapse rapidly during sharp rallies when put sellers flood the market.
        Do not assume skew is static -- monitor it daily on NSE option chains.
      </WarningBlock>

      <NoteBlock title="Trading the Skew">
        When Nifty put skew is abnormally high (25d skew above 6%), sell put spreads
        to harvest the elevated premium. When skew flattens below 2%, OTM puts are
        cheap -- buy them as portfolio insurance before major events like elections
        or RBI policy.
      </NoteBlock>
    </SectionLayout>
  )
}
