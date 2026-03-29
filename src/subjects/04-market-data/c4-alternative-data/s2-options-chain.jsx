import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function OptionsChain() {
  return (
    <SectionLayout
      title="Options Chain Data and OI Analysis"
      subtitle="Fetching and analyzing options chains, open interest patterns, and put-call ratios"
      difficulty="intermediate"
      readingMinutes={7}
    >
      <DefinitionBlock
        term="Open Interest (OI)"
        definition="Total number of outstanding derivative contracts that have not been settled. Rising OI with price increase signals strong trend; rising OI with price decrease signals distribution."
        seeAlso={['Put-Call Ratio', 'Max Pain', 'OI Spurts']}
      />

      <CodeBlock
        language="python"
        title="Fetch NIFTY options chain from NSE"
        code={`import requests
import pandas as pd

def get_options_chain(symbol="NIFTY"):
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})
    session.get("https://www.nseindia.com")  # Cookies
    url = f"https://www.nseindia.com/api/option-chain-indices?symbol={symbol}"
    resp = session.get(url, timeout=30)
    data = resp.json()["records"]["data"]

    rows = []
    for item in data:
        strike = item["strikePrice"]
        ce = item.get("CE", {})
        pe = item.get("PE", {})
        rows.append({
            "strike": strike,
            "ce_oi": ce.get("openInterest", 0),
            "ce_change_oi": ce.get("changeinOpenInterest", 0),
            "ce_ltp": ce.get("lastPrice", 0),
            "pe_oi": pe.get("openInterest", 0),
            "pe_change_oi": pe.get("changeinOpenInterest", 0),
            "pe_ltp": pe.get("lastPrice", 0),
        })
    return pd.DataFrame(rows)`}
      />

      <CodeBlock
        language="python"
        title="Key OI analysis metrics"
        code={`def analyze_oi(chain_df, spot_price):
    # Max Pain -- strike where option buyers lose the most
    chain_df["ce_pain"] = chain_df["ce_oi"] * abs(spot_price - chain_df["strike"]).clip(lower=0)
    chain_df["pe_pain"] = chain_df["pe_oi"] * abs(chain_df["strike"] - spot_price).clip(lower=0)
    chain_df["total_pain"] = chain_df["ce_pain"] + chain_df["pe_pain"]
    max_pain = chain_df.loc[chain_df["total_pain"].idxmin(), "strike"]

    # PCR -- Put-Call Ratio
    total_ce_oi = chain_df["ce_oi"].sum()
    total_pe_oi = chain_df["pe_oi"].sum()
    pcr = total_pe_oi / total_ce_oi if total_ce_oi > 0 else 0

    # Highest OI strikes (support/resistance)
    resistance = chain_df.loc[chain_df["ce_oi"].idxmax(), "strike"]
    support = chain_df.loc[chain_df["pe_oi"].idxmax(), "strike"]

    return {"max_pain": max_pain, "pcr": round(pcr, 2),
            "resistance": resistance, "support": support}`}
      />

      <NoteBlock type="tip" title="OI Change Matters More Than Absolute OI">
        <p>Track <code>changeinOpenInterest</code> rather than absolute OI. A sudden spike in
        CE OI at a specific strike during market hours indicates fresh short call writing --
        a strong resistance signal.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
