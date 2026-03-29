import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as t,D as n,C as i,N as o,W as r}from"./subject-01-B5qsZKsm.js";import{C as a}from"./subject-02-D6eTCXus.js";const T={id:"05-technical-indicators",title:"Technical Indicators & Analysis",icon:"📈",colorHex:"#f97316",description:"Master trend, momentum, volatility, and volume indicators for Indian market analysis.",difficulty:"intermediate",estimatedHours:5,prerequisites:["04-market-data"],chapters:[{id:"c1-trend",title:"Trend Indicators",description:"Identify market direction with moving averages, MACD, and trend-following tools.",estimatedMinutes:55,sections:[{id:"s1-moving-averages",title:"Moving Averages (SMA, EMA, DEMA, TEMA)",difficulty:"intermediate",readingMinutes:15,description:"Calculate and interpret various moving averages."},{id:"s2-macd",title:"MACD & Signal Line",difficulty:"intermediate",readingMinutes:12,description:"MACD line, signal crossovers, and divergence."},{id:"s3-supertrend",title:"Supertrend & Parabolic SAR",difficulty:"intermediate",readingMinutes:12,description:"ATR-based trend indicators for entry and exit."},{id:"s4-adx",title:"ADX & Directional Movement",difficulty:"intermediate",readingMinutes:12,description:"Measure trend strength with ADX and DI lines."}]},{id:"c2-momentum",title:"Momentum & Oscillators",description:"Gauge market momentum with RSI, stochastic, and VWAP indicators.",estimatedMinutes:55,sections:[{id:"s1-rsi",title:"RSI & Stochastic RSI",difficulty:"intermediate",readingMinutes:15,description:"RSI calculation, overbought/oversold, StochRSI."},{id:"s2-cci-williams",title:"CCI, Williams %R, MFI",difficulty:"intermediate",readingMinutes:12,description:"Commodity Channel Index and money flow indicators."},{id:"s3-roc-momentum",title:"Rate of Change & Momentum",difficulty:"intermediate",readingMinutes:12,description:"ROC oscillator and momentum measurement."},{id:"s4-vwap",title:"VWAP & Anchored VWAP",difficulty:"intermediate",readingMinutes:15,description:"Volume-weighted average price for institutional levels."}]},{id:"c3-volatility",title:"Volatility Indicators",description:"Measure and trade volatility with Bollinger Bands, ATR, and implied vol.",estimatedMinutes:55,sections:[{id:"s1-bollinger-keltner",title:"Bollinger Bands & Keltner Channels",difficulty:"intermediate",readingMinutes:15,description:"Bollinger squeeze and Keltner channel setups."},{id:"s2-atr",title:"ATR & Normalized ATR",difficulty:"intermediate",readingMinutes:12,description:"Average True Range for position sizing and stops."},{id:"s3-historical-implied",title:"Historical vs Implied Volatility",difficulty:"advanced",readingMinutes:15,description:"HV vs IV comparison and volatility cone."},{id:"s4-vol-smile-skew",title:"Volatility Smile & Skew",difficulty:"advanced",readingMinutes:12,description:"Nifty options volatility smile and skew patterns."}]},{id:"c4-volume",title:"Volume Analysis",description:"Analyze volume patterns with OBV, A/D line, and volume profile.",estimatedMinutes:50,sections:[{id:"s1-obv-profile",title:"OBV & Volume Profile",difficulty:"intermediate",readingMinutes:12,description:"On-Balance Volume and volume profile with POC."},{id:"s2-ad-line",title:"Accumulation/Distribution Line",difficulty:"intermediate",readingMinutes:12,description:"A/D line calculation and divergence signals."},{id:"s3-cmf",title:"Chaikin Money Flow",difficulty:"intermediate",readingMinutes:12,description:"CMF indicator for money flow direction."},{id:"s4-volume-weighted",title:"Volume Weighted Indicators",difficulty:"intermediate",readingMinutes:12,description:"VWMA, volume oscillator, and weighted analysis."}]},{id:"c5-advanced",title:"Advanced Indicators",description:"Master Ichimoku, alternative chart types, and custom indicator development.",estimatedMinutes:55,sections:[{id:"s1-ichimoku",title:"Ichimoku Cloud",difficulty:"advanced",readingMinutes:15,description:"Tenkan, Kijun, Senkou spans, and Chikou analysis."},{id:"s2-heikin-ashi-renko",title:"Heikin-Ashi & Renko",difficulty:"intermediate",readingMinutes:12,description:"Noise-reducing chart types for trend clarity."},{id:"s3-market-internals",title:"Market Internals (A/D Line, TICK, TRIN)",difficulty:"advanced",readingMinutes:15,description:"NSE market breadth and internal indicators."},{id:"s4-custom-indicators",title:"Custom Indicator Development",difficulty:"advanced",readingMinutes:12,description:"Build custom indicators with Python pandas/numpy."}]}]};function s(){return e.jsxs(t,{title:"Moving Averages: SMA, EMA, DEMA & TEMA",description:"The foundation of trend-following analysis applied to Nifty 50 and Indian equities.",children:[e.jsx(n,{term:"Simple Moving Average (SMA)",children:"The arithmetic mean of closing prices over N periods. SMA(20) on Nifty 50 treats each of the last 20 daily closes with equal weight."}),e.jsx(n,{term:"Exponential Moving Average (EMA)",children:"Applies a smoothing factor 2/(N+1) giving more weight to recent prices. EMA reacts faster to price changes than SMA of the same period."}),e.jsx(i,{language:"python",title:"Computing Moving Averages on Nifty 50",children:`import pandas as pd
import yfinance as yf

# Fetch Nifty 50 data
nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

# Simple Moving Average
nifty['SMA_20'] = nifty['Close'].rolling(window=20).mean()
nifty['SMA_50'] = nifty['Close'].rolling(window=50).mean()

# Exponential Moving Average
nifty['EMA_12'] = nifty['Close'].ewm(span=12, adjust=False).mean()
nifty['EMA_26'] = nifty['Close'].ewm(span=26, adjust=False).mean()

# Double EMA (DEMA) = 2*EMA(N) - EMA(EMA(N))
ema_20 = nifty['Close'].ewm(span=20, adjust=False).mean()
nifty['DEMA_20'] = 2 * ema_20 - ema_20.ewm(span=20, adjust=False).mean()

# Triple EMA (TEMA) = 3*EMA - 3*EMA(EMA) + EMA(EMA(EMA))
ema1 = nifty['Close'].ewm(span=20, adjust=False).mean()
ema2 = ema1.ewm(span=20, adjust=False).mean()
ema3 = ema2.ewm(span=20, adjust=False).mean()
nifty['TEMA_20'] = 3 * ema1 - 3 * ema2 + ema3`}),e.jsx(a,{title:"MA Type Comparison",headers:["Type","Lag","Responsiveness","Best Use"],rows:[["SMA","Highest","Slowest","Support/resistance zones"],["EMA","Moderate","Moderate","Trend direction signals"],["DEMA","Low","Fast","Short-term swing trades"],["TEMA","Lowest","Fastest","Scalping, quick entries"]]}),e.jsx(i,{language:"python",title:"Golden Cross / Death Cross Signal",children:`# Golden Cross: SMA_50 crosses above SMA_200
nifty['SMA_200'] = nifty['Close'].rolling(window=200).mean()
nifty['golden_cross'] = (
    (nifty['SMA_50'] > nifty['SMA_200']) &
    (nifty['SMA_50'].shift(1) <= nifty['SMA_200'].shift(1))
)
print("Golden Cross dates:")
print(nifty[nifty['golden_cross']].index.tolist())`}),e.jsx(o,{title:"Indian Market Tip",children:"On Nifty 50, the 20/50 EMA crossover on daily charts is widely tracked by institutional traders. The 200-day SMA acts as a key psychological support level -- watch for volume spikes when Nifty tests it."})]})}const j=Object.freeze(Object.defineProperty({__proto__:null,default:s},Symbol.toStringTag,{value:"Module"}));function l(){return e.jsxs(t,{title:"MACD: Moving Average Convergence Divergence",description:"Identifying trend direction, momentum shifts, and divergence patterns on Indian equities.",children:[e.jsx(n,{term:"MACD Line",children:"The difference between the 12-period EMA and 26-period EMA. When the MACD line is positive, the short-term trend is above the long-term trend."}),e.jsx(n,{term:"Signal Line & Histogram",children:"The signal line is a 9-period EMA of the MACD line. The histogram plots the difference between MACD and signal, visualizing momentum acceleration."}),e.jsx(i,{language:"python",title:"MACD Calculation for Bank Nifty",children:`import pandas as pd
import yfinance as yf

bn = yf.download("^NSEBANK", start="2024-01-01", end="2025-12-31")

# MACD components
bn['EMA_12'] = bn['Close'].ewm(span=12, adjust=False).mean()
bn['EMA_26'] = bn['Close'].ewm(span=26, adjust=False).mean()
bn['MACD'] = bn['EMA_12'] - bn['EMA_26']
bn['Signal'] = bn['MACD'].ewm(span=9, adjust=False).mean()
bn['Histogram'] = bn['MACD'] - bn['Signal']

# Bullish crossover: MACD crosses above signal
bn['bull_cross'] = (
    (bn['MACD'] > bn['Signal']) &
    (bn['MACD'].shift(1) <= bn['Signal'].shift(1))
)

# Bearish crossover
bn['bear_cross'] = (
    (bn['MACD'] < bn['Signal']) &
    (bn['MACD'].shift(1) >= bn['Signal'].shift(1))
)`}),e.jsx(i,{language:"python",title:"Detecting MACD Divergence",children:`import numpy as np

def find_macd_divergence(df, lookback=20):
    """Detect bullish divergence: price lower low, MACD higher low."""
    signals = []
    for i in range(lookback, len(df)):
        window = df.iloc[i-lookback:i+1]
        price_min_idx = window['Close'].idxmin()
        macd_min_idx = window['MACD'].idxmin()

        # Price makes new low but MACD doesn't
        if (price_min_idx == window.index[-1] and
            macd_min_idx != window.index[-1] and
            window['MACD'].iloc[-1] > window['MACD'].min()):
            signals.append(df.index[i])
    return signals

div_dates = find_macd_divergence(bn)
print(f"Bullish divergence signals: {len(div_dates)}")`}),e.jsx(o,{title:"Trading Tip",children:"MACD histogram shrinking toward zero often precedes a crossover. On Bank Nifty weekly charts, MACD divergences near round-number support levels (e.g., 44000, 46000) produce high-probability reversal signals."})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"}));function d(){return e.jsxs(t,{title:"Supertrend & Parabolic SAR",description:"Trend-following overlay indicators for clear buy/sell signals on NSE stocks.",children:[e.jsx(n,{term:"Supertrend",children:"An ATR-based overlay that flips between support (green) and resistance (red). Calculated as: Upper Band = HL2 + (multiplier x ATR), Lower Band = HL2 - (multiplier x ATR). Default settings are period=10, multiplier=3."}),e.jsx(i,{language:"python",title:"Supertrend Indicator on Nifty 50",children:`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def supertrend(df, period=10, multiplier=3):
    hl2 = (df['High'] + df['Low']) / 2
    atr = df['High'].sub(df['Low']).rolling(period).mean()

    upper = hl2 + multiplier * atr
    lower = hl2 - multiplier * atr

    st = pd.Series(index=df.index, dtype=float)
    direction = pd.Series(index=df.index, dtype=int)

    st.iloc[period] = upper.iloc[period]
    direction.iloc[period] = -1

    for i in range(period + 1, len(df)):
        if df['Close'].iloc[i] > st.iloc[i-1]:
            st.iloc[i] = max(lower.iloc[i], st.iloc[i-1]) if direction.iloc[i-1] == 1 else lower.iloc[i]
            direction.iloc[i] = 1
        else:
            st.iloc[i] = min(upper.iloc[i], st.iloc[i-1]) if direction.iloc[i-1] == -1 else upper.iloc[i]
            direction.iloc[i] = -1

    return st, direction

nifty['ST'], nifty['ST_Dir'] = supertrend(nifty)
buy_signals = nifty[(nifty['ST_Dir'] == 1) & (nifty['ST_Dir'].shift(1) == -1)]
print(f"Supertrend buy signals: {len(buy_signals)}")`}),e.jsx(n,{term:"Parabolic SAR",children:"Stop And Reverse indicator that trails price with an acceleration factor (AF). Starts at AF=0.02, increments by 0.02 at each new extreme, capped at 0.20."}),e.jsx(i,{language:"python",title:"Parabolic SAR Calculation",children:`def parabolic_sar(df, af_start=0.02, af_step=0.02, af_max=0.20):
    sar = df['Close'].copy()
    af = af_start
    bull = True
    ep = df['High'].iloc[0]
    sar.iloc[0] = df['Low'].iloc[0]

    for i in range(1, len(df)):
        prev_sar = sar.iloc[i-1]
        sar.iloc[i] = prev_sar + af * (ep - prev_sar)

        if bull:
            if df['Low'].iloc[i] < sar.iloc[i]:
                bull = False
                sar.iloc[i] = ep
                ep = df['Low'].iloc[i]
                af = af_start
            elif df['High'].iloc[i] > ep:
                ep = df['High'].iloc[i]
                af = min(af + af_step, af_max)
        else:
            if df['High'].iloc[i] > sar.iloc[i]:
                bull = True
                sar.iloc[i] = ep
                ep = df['High'].iloc[i]
                af = af_start
            elif df['Low'].iloc[i] < ep:
                ep = df['Low'].iloc[i]
                af = min(af + af_step, af_max)
    return sar

nifty['PSAR'] = parabolic_sar(nifty)`}),e.jsx(o,{title:"Nifty Trading Tip",children:"Supertrend (10,3) on the 15-minute chart is popular among Indian intraday traders. Combine with VWAP for confirmation -- enter long only when price is above both Supertrend and VWAP."})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"}));function c(){return e.jsxs(t,{title:"ADX: Average Directional Index",description:"Measuring trend strength with ADX, +DI, and -DI on Indian equities.",children:[e.jsx(n,{term:"ADX (Average Directional Index)",children:"A non-directional indicator measuring trend strength from 0 to 100. ADX above 25 indicates a trending market; below 20 suggests a range-bound market. It does not tell you direction -- only how strong the trend is."}),e.jsx(n,{term:"+DI and -DI",children:"Positive Directional Indicator (+DI) measures upward movement strength. Negative Directional Indicator (-DI) measures downward movement strength. When +DI is above -DI, bulls dominate; when -DI is above +DI, bears dominate."}),e.jsx(i,{language:"python",title:"ADX Calculation for Nifty 50",children:`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")
period = 14

# True Range
high_low = nifty['High'] - nifty['Low']
high_close = abs(nifty['High'] - nifty['Close'].shift(1))
low_close = abs(nifty['Low'] - nifty['Close'].shift(1))
tr = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)

# Directional Movement
plus_dm = np.where(
    (nifty['High'] - nifty['High'].shift(1)) > (nifty['Low'].shift(1) - nifty['Low']),
    np.maximum(nifty['High'] - nifty['High'].shift(1), 0), 0
)
minus_dm = np.where(
    (nifty['Low'].shift(1) - nifty['Low']) > (nifty['High'] - nifty['High'].shift(1)),
    np.maximum(nifty['Low'].shift(1) - nifty['Low'], 0), 0
)

# Smoothed averages
atr = tr.rolling(period).mean()
plus_di = 100 * pd.Series(plus_dm).rolling(period).mean() / atr
minus_di = 100 * pd.Series(minus_dm).rolling(period).mean() / atr

# ADX
dx = 100 * abs(plus_di - minus_di) / (plus_di + minus_di)
nifty['ADX'] = dx.rolling(period).mean()
nifty['+DI'] = plus_di
nifty['-DI'] = minus_di`}),e.jsx(a,{title:"ADX Trend Strength Interpretation",headers:["ADX Value","Trend Strength","Strategy"],rows:[["0-20","Weak / No Trend","Avoid trend-following, use mean reversion"],["20-25","Emerging Trend","Watch for breakout confirmation"],["25-50","Strong Trend","Use trend-following strategies"],["50-75","Very Strong","Trail stops, ride the trend"],["75-100","Extremely Strong","Rare; watch for exhaustion"]]}),e.jsx(i,{language:"python",title:"ADX-Based Trade Filter",children:`# Only take trend trades when ADX > 25
trending = nifty[nifty['ADX'] > 25].copy()
trending['signal'] = np.where(trending['+DI'] > trending['-DI'], 'LONG', 'SHORT')

print(f"Trending days: {len(trending)} / {len(nifty)}")
print(trending[['Close', 'ADX', '+DI', '-DI', 'signal']].tail())`}),e.jsx(o,{title:"Practical Tip",children:"ADX rising above 25 while +DI crosses above -DI is a classic buy setup on Nifty. Combine with a 20-EMA filter: only go long if price is above EMA(20) and ADX confirms trend strength."})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs(t,{title:"RSI & Stochastic RSI",description:"Relative Strength Index for identifying overbought/oversold conditions on NSE stocks.",children:[e.jsx(n,{term:"RSI (Relative Strength Index)",children:"A momentum oscillator ranging 0-100 that compares the magnitude of recent gains to recent losses. RSI above 70 signals overbought; below 30 signals oversold. Default period is 14."}),e.jsx(i,{language:"python",title:"RSI Calculation on Nifty 50",children:`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def calc_rsi(series, period=14):
    delta = series.diff()
    gain = delta.where(delta > 0, 0.0)
    loss = -delta.where(delta < 0, 0.0)

    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()

    # Wilder's smoothing after initial SMA
    for i in range(period, len(series)):
        avg_gain.iloc[i] = (avg_gain.iloc[i-1] * (period-1) + gain.iloc[i]) / period
        avg_loss.iloc[i] = (avg_loss.iloc[i-1] * (period-1) + loss.iloc[i]) / period

    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))

nifty['RSI'] = calc_rsi(nifty['Close'])

# Overbought/Oversold signals
nifty['OB'] = nifty['RSI'] > 70
nifty['OS'] = nifty['RSI'] < 30
print(f"Overbought days: {nifty['OB'].sum()}")
print(f"Oversold days: {nifty['OS'].sum()}")`}),e.jsx(n,{term:"Stochastic RSI",children:"Applies the Stochastic formula to RSI values instead of price. It oscillates between 0 and 1, providing more sensitive signals than plain RSI. StochRSI = (RSI - RSI_Low) / (RSI_High - RSI_Low) over the lookback period."}),e.jsx(i,{language:"python",title:"Stochastic RSI",children:`def stochastic_rsi(rsi, period=14, k_smooth=3, d_smooth=3):
    rsi_min = rsi.rolling(window=period).min()
    rsi_max = rsi.rolling(window=period).max()
    stoch_rsi = (rsi - rsi_min) / (rsi_max - rsi_min)

    k = stoch_rsi.rolling(window=k_smooth).mean()  # %K line
    d = k.rolling(window=d_smooth).mean()           # %D line
    return k, d

nifty['StochRSI_K'], nifty['StochRSI_D'] = stochastic_rsi(nifty['RSI'])

# Buy when %K crosses above %D in oversold zone
nifty['stoch_buy'] = (
    (nifty['StochRSI_K'] > nifty['StochRSI_D']) &
    (nifty['StochRSI_K'].shift(1) <= nifty['StochRSI_D'].shift(1)) &
    (nifty['StochRSI_K'] < 0.2)
)`}),e.jsx(o,{title:"Indian Market Context",children:"RSI(14) below 30 on Nifty weekly charts has historically been a strong buy signal -- it has only occurred during major corrections (2020 COVID crash, 2022 rate hike selloff). Use StochRSI for intraday timeframes where standard RSI stays flat in the 40-60 zone."})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs(t,{title:"CCI, Williams %R & MFI",description:"Momentum oscillators for detecting cyclical turns and money flow in NSE stocks.",children:[e.jsx(n,{term:"Commodity Channel Index (CCI)",children:"Measures price deviation from its statistical mean. CCI = (Typical Price - SMA) / (0.015 x Mean Deviation). Readings above +100 indicate overbought; below -100 indicate oversold."}),e.jsx(i,{language:"python",title:"CCI and Williams %R on Bank Nifty",children:`import pandas as pd
import numpy as np
import yfinance as yf

bn = yf.download("^NSEBANK", start="2024-01-01", end="2025-12-31")

# CCI Calculation
period = 20
tp = (bn['High'] + bn['Low'] + bn['Close']) / 3
sma_tp = tp.rolling(period).mean()
mean_dev = tp.rolling(period).apply(lambda x: np.abs(x - x.mean()).mean())
bn['CCI'] = (tp - sma_tp) / (0.015 * mean_dev)

# Williams %R (14-period)
wr_period = 14
highest_high = bn['High'].rolling(wr_period).max()
lowest_low = bn['Low'].rolling(wr_period).min()
bn['Williams_R'] = -100 * (highest_high - bn['Close']) / (highest_high - lowest_low)

print(bn[['Close', 'CCI', 'Williams_R']].tail())`}),e.jsx(n,{term:"Williams %R",children:"Oscillates from -100 to 0. Readings above -20 are overbought; below -80 are oversold. It is the inverse of the Fast Stochastic Oscillator."}),e.jsx(i,{language:"python",title:"Money Flow Index (MFI)",children:`# MFI - volume-weighted RSI
mfi_period = 14
tp = (bn['High'] + bn['Low'] + bn['Close']) / 3
raw_mf = tp * bn['Volume']

pos_mf = raw_mf.where(tp > tp.shift(1), 0)
neg_mf = raw_mf.where(tp < tp.shift(1), 0)

pos_sum = pos_mf.rolling(mfi_period).sum()
neg_sum = neg_mf.rolling(mfi_period).sum()
mfi = 100 - (100 / (1 + pos_sum / neg_sum))
bn['MFI'] = mfi

# MFI divergence: price up but MFI declining
bn['mfi_bear_div'] = (
    (bn['Close'] > bn['Close'].shift(5)) &
    (bn['MFI'] < bn['MFI'].shift(5)) &
    (bn['MFI'] > 80)
)`}),e.jsx(o,{title:"Practical Usage",children:"CCI works well on Bank Nifty for identifying mean-reversion entries. When CCI drops below -200 and turns up, it signals extreme oversold bounce potential. MFI above 80 with declining volume often precedes short-term pullbacks in liquid Nifty 50 constituents."})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs(t,{title:"Rate of Change & Momentum Oscillator",description:"Simple yet effective momentum tools for gauging price velocity on Indian stocks.",children:[e.jsx(n,{term:"Rate of Change (ROC)",children:"Percentage change in price over N periods: ROC = ((Close - Close_N) / Close_N) x 100. Positive ROC means price is higher than N periods ago; zero-line crossovers signal momentum shifts."}),e.jsx(n,{term:"Momentum Oscillator",children:"The absolute difference between current price and price N periods ago: Momentum = Close - Close_N. Unlike ROC, it is not normalized, so it reflects the raw point change."}),e.jsx(i,{language:"python",title:"ROC and Momentum on Nifty Stocks",children:`import pandas as pd
import yfinance as yf

# Fetch Reliance Industries (NSE)
ril = yf.download("RELIANCE.NS", start="2024-01-01", end="2025-12-31")

# Rate of Change (12-period)
period = 12
ril['ROC_12'] = ((ril['Close'] - ril['Close'].shift(period))
                 / ril['Close'].shift(period)) * 100

# Momentum Oscillator (10-period)
ril['MOM_10'] = ril['Close'] - ril['Close'].shift(10)

# Signal: ROC crosses above zero (bullish)
ril['roc_bull'] = (ril['ROC_12'] > 0) & (ril['ROC_12'].shift(1) <= 0)

# Signal: ROC crosses below zero (bearish)
ril['roc_bear'] = (ril['ROC_12'] < 0) & (ril['ROC_12'].shift(1) >= 0)

print(f"Bullish ROC crossovers: {ril['roc_bull'].sum()}")
print(f"Bearish ROC crossovers: {ril['roc_bear'].sum()}")`}),e.jsx(i,{language:"python",title:"Multi-Timeframe Momentum Screening",children:`import yfinance as yf
import pandas as pd

tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"]
results = []

for t in tickers:
    df = yf.download(t, period="6mo", progress=False)
    if len(df) < 60:
        continue
    roc_5 = ((df['Close'].iloc[-1] - df['Close'].iloc[-6]) / df['Close'].iloc[-6]) * 100
    roc_20 = ((df['Close'].iloc[-1] - df['Close'].iloc[-21]) / df['Close'].iloc[-21]) * 100
    roc_60 = ((df['Close'].iloc[-1] - df['Close'].iloc[-61]) / df['Close'].iloc[-61]) * 100
    results.append({'Ticker': t, 'ROC_5d': round(roc_5, 2),
                    'ROC_20d': round(roc_20, 2), 'ROC_60d': round(roc_60, 2)})

screen = pd.DataFrame(results).sort_values('ROC_20d', ascending=False)
print(screen.to_string(index=False))`}),e.jsx(o,{title:"Momentum Ranking Strategy",children:"Rank Nifty 50 stocks by 20-day ROC monthly. Buy the top 10 and rebalance. This simple momentum strategy has historically outperformed the index in Indian markets due to strong trending behavior in mid-cap leaders."})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs(t,{title:"VWAP & Anchored VWAP",description:"Volume-weighted average price -- the institutional benchmark for intraday trading on NSE.",children:[e.jsx(n,{term:"VWAP (Volume Weighted Average Price)",children:"The average price weighted by volume for the trading session. VWAP = Cumulative(Typical Price x Volume) / Cumulative(Volume). It resets each day and serves as a fair value benchmark."}),e.jsx(i,{language:"python",title:"Intraday VWAP Calculation",children:`import pandas as pd
import numpy as np

# Assuming intraday data with datetime index
# df has columns: Open, High, Low, Close, Volume

def calc_vwap(df):
    tp = (df['High'] + df['Low'] + df['Close']) / 3
    cumulative_tp_vol = (tp * df['Volume']).cumsum()
    cumulative_vol = df['Volume'].cumsum()
    vwap = cumulative_tp_vol / cumulative_vol

    # Standard deviation bands (1 and 2 SD)
    vwap_sq = ((tp ** 2) * df['Volume']).cumsum() / cumulative_vol
    std = np.sqrt(vwap_sq - vwap ** 2)

    return pd.DataFrame({
        'VWAP': vwap,
        'Upper_1SD': vwap + std,
        'Lower_1SD': vwap - std,
        'Upper_2SD': vwap + 2 * std,
        'Lower_2SD': vwap - 2 * std,
    })

# Usage on intraday data:
# vwap_df = calc_vwap(intraday_data)
# intraday_data = intraday_data.join(vwap_df)`}),e.jsx(n,{term:"Anchored VWAP",children:"VWAP calculated from a user-defined anchor point (earnings date, swing low, event day) instead of session start. It reveals the average cost basis of traders who entered since that anchor event."}),e.jsx(i,{language:"python",title:"Anchored VWAP from Event Date",children:`import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def anchored_vwap(df, anchor_date):
    """Calculate VWAP anchored from a specific date."""
    mask = df.index >= anchor_date
    subset = df[mask].copy()
    tp = (subset['High'] + subset['Low'] + subset['Close']) / 3
    cum_tp_vol = (tp * subset['Volume']).cumsum()
    cum_vol = subset['Volume'].cumsum()
    subset['AVWAP'] = cum_tp_vol / cum_vol
    return subset['AVWAP']

# Anchor from budget day or major event
nifty['AVWAP_Budget'] = anchored_vwap(nifty, '2025-02-01')

# Anchor from a swing low
nifty['AVWAP_SwingLow'] = anchored_vwap(nifty, '2024-10-23')

print(nifty[['Close', 'AVWAP_Budget']].dropna().tail())`}),e.jsx(o,{title:"Institutional Usage",children:"FIIs and DIIs on NSE benchmark their execution against VWAP. Price above VWAP means buyers are in control; below means sellers dominate. Institutions often accumulate when price dips to VWAP and use the lower 1SD band as a limit order zone for large-cap Nifty stocks."})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs(t,{title:"Bollinger Bands, Keltner Channels & Squeeze",description:"Volatility envelope indicators and the squeeze setup for breakout trading on NSE.",children:[e.jsx(n,{term:"Bollinger Bands",children:"A 20-period SMA with upper and lower bands at 2 standard deviations. Bands expand with volatility and contract during consolidation. Price touching the upper band is not inherently bearish -- it can indicate strength."}),e.jsx(n,{term:"Keltner Channels",children:"A 20-period EMA with bands at 1.5x ATR(10) above and below. Keltner Channels are smoother than Bollinger Bands because ATR is less reactive than standard deviation."}),e.jsx(i,{language:"python",title:"Bollinger Bands & Keltner on Nifty",children:`import pandas as pd
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

# Bollinger Bands (20, 2)
nifty['BB_Mid'] = nifty['Close'].rolling(20).mean()
bb_std = nifty['Close'].rolling(20).std()
nifty['BB_Upper'] = nifty['BB_Mid'] + 2 * bb_std
nifty['BB_Lower'] = nifty['BB_Mid'] - 2 * bb_std
nifty['BB_Width'] = (nifty['BB_Upper'] - nifty['BB_Lower']) / nifty['BB_Mid']

# Keltner Channels (20 EMA, 1.5x ATR)
nifty['KC_Mid'] = nifty['Close'].ewm(span=20, adjust=False).mean()
tr = pd.concat([
    nifty['High'] - nifty['Low'],
    abs(nifty['High'] - nifty['Close'].shift(1)),
    abs(nifty['Low'] - nifty['Close'].shift(1))
], axis=1).max(axis=1)
atr = tr.rolling(10).mean()
nifty['KC_Upper'] = nifty['KC_Mid'] + 1.5 * atr
nifty['KC_Lower'] = nifty['KC_Mid'] - 1.5 * atr`}),e.jsx(i,{language:"python",title:"Bollinger-Keltner Squeeze Detection",children:`# Squeeze: BB inside KC (low volatility compression)
nifty['squeeze_on'] = (
    (nifty['BB_Lower'] > nifty['KC_Lower']) &
    (nifty['BB_Upper'] < nifty['KC_Upper'])
)

# Squeeze fires when Bollinger exits Keltner
nifty['squeeze_fire'] = (
    (nifty['squeeze_on'].shift(1) == True) &
    (nifty['squeeze_on'] == False)
)

# Momentum direction at squeeze fire (using 12-period ROC)
nifty['squeeze_mom'] = nifty['Close'] - nifty['Close'].shift(12)

squeeze_days = nifty[nifty['squeeze_fire']]
print(f"Squeeze breakouts: {len(squeeze_days)}")
print(squeeze_days[['Close', 'squeeze_mom']].tail(10))`}),e.jsx(o,{title:"Squeeze Strategy for Nifty",children:"The TTM Squeeze (Bollinger inside Keltner) on daily Nifty charts typically resolves with 200-400 point moves. When the squeeze fires and momentum is positive, go long. Pair this with ADX rising above 20 for confirmation."})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs(t,{title:"ATR: Average True Range",description:"Measuring market volatility and sizing positions with ATR on Indian equities.",children:[e.jsx(n,{term:"Average True Range (ATR)",children:"The smoothed average of True Range over N periods (default 14). True Range is the greatest of: High-Low, |High-PrevClose|, or |Low-PrevClose|. ATR measures volatility in absolute price terms, not direction."}),e.jsx(i,{language:"python",title:"ATR and Normalized ATR on Bank Nifty",children:`import pandas as pd
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
print(f"Current NATR: {bn['NATR'].iloc[-1]:.2f}%")`}),e.jsx(i,{language:"python",title:"ATR-Based Position Sizing",children:`capital = 500000  # INR 5 lakh
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
print(f"Max loss if stopped: INR {risk_amount:,.0f}")`}),e.jsx(a,{title:"ATR Stop-Loss Multipliers",headers:["Multiplier","Use Case","Trade Style"],rows:[["1x ATR","Tight stop, frequent exits","Scalping / intraday"],["1.5x ATR","Balanced risk/reward","Swing trading"],["2x ATR","Wide stop, fewer whipsaws","Positional trading"],["3x ATR","Very loose, trend riding","Long-term trend following"]]}),e.jsx(o,{title:"Bank Nifty Volatility",children:"Bank Nifty typically has an ATR of 500-800 points on daily charts. During RBI policy days or earnings weeks, ATR can spike to 1200+. Scale down position size when ATR expands to maintain consistent risk per trade."})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs(t,{title:"Historical vs Implied Volatility",description:"Understanding HV, IV, volatility cones, and term structure for Nifty options.",children:[e.jsx(n,{term:"Historical Volatility (HV)",children:"The annualized standard deviation of log returns over a lookback period. HV(20) uses 20 trading days. It tells you what volatility actually was."}),e.jsx(n,{term:"Implied Volatility (IV)",children:"The market's expectation of future volatility, extracted from option prices using Black-Scholes or similar models. India VIX is the benchmark IV for Nifty options."}),e.jsx(i,{language:"python",title:"Historical Volatility Calculation",children:`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2023-01-01", end="2025-12-31")

# Log returns
nifty['log_ret'] = np.log(nifty['Close'] / nifty['Close'].shift(1))

# HV for different windows (annualized: x sqrt(252))
for window in [10, 20, 30, 60]:
    nifty[f'HV_{window}'] = nifty['log_ret'].rolling(window).std() * np.sqrt(252) * 100

print(nifty[['Close', 'HV_10', 'HV_20', 'HV_30', 'HV_60']].tail())`}),e.jsx(i,{language:"python",title:"Volatility Cone",children:`# Volatility cone: percentile ranges for each lookback
lookbacks = [10, 20, 30, 60, 90]
cone = {}

for lb in lookbacks:
    hv = nifty['log_ret'].rolling(lb).std() * np.sqrt(252) * 100
    hv = hv.dropna()
    cone[lb] = {
        'min': hv.min(),
        'p25': hv.quantile(0.25),
        'median': hv.median(),
        'p75': hv.quantile(0.75),
        'max': hv.max(),
        'current': hv.iloc[-1]
    }

cone_df = pd.DataFrame(cone).T
cone_df.index.name = 'Lookback'
print(cone_df.round(2))
# If current HV is below p25, volatility is cheap -> buy options
# If current HV is above p75, volatility is rich -> sell options`}),e.jsx(i,{language:"python",title:"IV vs HV Comparison (India VIX)",children:`# India VIX as implied volatility proxy
vix = yf.download("^INDIAVIX", start="2024-01-01", end="2025-12-31")
merged = nifty[['Close', 'HV_20']].join(vix['Close'].rename('India_VIX'))
merged['IV_HV_Spread'] = merged['India_VIX'] - merged['HV_20']

# Positive spread = IV > HV (options are expensive)
# Negative spread = IV < HV (options are cheap)
rich = (merged['IV_HV_Spread'] > 5).sum()
cheap = (merged['IV_HV_Spread'] < -3).sum()
print(f"IV rich days (spread > 5): {rich}")
print(f"IV cheap days (spread < -3): {cheap}")`}),e.jsx(o,{title:"Volatility Trading Edge",children:"When India VIX is above 20 and HV(20) is below 15, implied volatility is overpriced -- sell strangles or iron condors. When VIX drops below 12 while HV is rising, options are cheap -- buy straddles before expected moves."})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(t,{title:"Volatility Smile & Skew",description:"Understanding how implied volatility varies across strike prices for Nifty options.",children:[e.jsx(n,{term:"Volatility Smile",children:"A U-shaped curve showing that OTM puts and OTM calls have higher IV than ATM options. This pattern reflects the market pricing in tail risk on both sides of the distribution."}),e.jsx(n,{term:"Volatility Skew",children:"The asymmetry in the smile -- OTM puts typically have higher IV than equidistant OTM calls. This negative skew (or put skew) reflects demand for downside protection and crash risk premium."}),e.jsx(i,{language:"python",title:"Extracting IV Smile from Nifty Options",children:`import pandas as pd
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
print(chain.to_string(index=False))`}),e.jsx(i,{language:"python",title:"Skew Metrics and Term Structure",children:`# 25-delta skew: IV(25d put) - IV(25d call)
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
    print(f"  {exp}: {iv}%")`}),e.jsx(r,{children:"Skew can collapse rapidly during sharp rallies when put sellers flood the market. Do not assume skew is static -- monitor it daily on NSE option chains."}),e.jsx(o,{title:"Trading the Skew",children:"When Nifty put skew is abnormally high (25d skew above 6%), sell put spreads to harvest the elevated premium. When skew flattens below 2%, OTM puts are cheap -- buy them as portfolio insurance before major events like elections or RBI policy."})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs(t,{title:"OBV & Volume Profile",description:"On-Balance Volume and volume profile analysis with POC, VAH, and VAL for NSE stocks.",children:[e.jsx(n,{term:"On-Balance Volume (OBV)",children:"A cumulative volume indicator. If close is higher than previous close, the day's volume is added; if lower, it is subtracted. OBV rising with price confirms the trend; divergence warns of reversal."}),e.jsx(i,{language:"python",title:"OBV Calculation and Divergence",children:`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

# OBV
obv = [0]
for i in range(1, len(nifty)):
    if nifty['Close'].iloc[i] > nifty['Close'].iloc[i-1]:
        obv.append(obv[-1] + nifty['Volume'].iloc[i])
    elif nifty['Close'].iloc[i] < nifty['Close'].iloc[i-1]:
        obv.append(obv[-1] - nifty['Volume'].iloc[i])
    else:
        obv.append(obv[-1])
nifty['OBV'] = obv

# OBV with SMA for signal line
nifty['OBV_SMA'] = nifty['OBV'].rolling(20).mean()

# Bearish divergence: price higher high, OBV lower high
nifty['price_hh'] = nifty['Close'] > nifty['Close'].rolling(20).max().shift(1)
nifty['obv_lh'] = nifty['OBV'] < nifty['OBV'].rolling(20).max().shift(1)
nifty['bear_div'] = nifty['price_hh'] & nifty['obv_lh']
print(f"OBV bearish divergence days: {nifty['bear_div'].sum()}")`}),e.jsx(n,{term:"Volume Profile",children:"A histogram showing volume traded at each price level over a period. Key levels include POC (Point of Control -- highest volume price), VAH (Value Area High), and VAL (Value Area Low) encompassing 70% of volume."}),e.jsx(i,{language:"python",title:"Volume Profile with POC/VAH/VAL",children:`def volume_profile(df, bins=50):
    price_min = df['Low'].min()
    price_max = df['High'].max()
    price_bins = np.linspace(price_min, price_max, bins + 1)

    vol_at_price = np.zeros(bins)
    for i in range(len(df)):
        low, high, vol = df['Low'].iloc[i], df['High'].iloc[i], df['Volume'].iloc[i]
        mask = (price_bins[:-1] <= high) & (price_bins[1:] >= low)
        count = mask.sum()
        if count > 0:
            vol_at_price[mask] += vol / count

    mid_prices = (price_bins[:-1] + price_bins[1:]) / 2

    # POC: price with maximum volume
    poc_idx = np.argmax(vol_at_price)
    poc = mid_prices[poc_idx]

    # Value Area: 70% of total volume around POC
    total_vol = vol_at_price.sum()
    target = 0.70 * total_vol
    cum = vol_at_price[poc_idx]
    lo, hi = poc_idx, poc_idx
    while cum < target and (lo > 0 or hi < bins - 1):
        left = vol_at_price[lo - 1] if lo > 0 else 0
        right = vol_at_price[hi + 1] if hi < bins - 1 else 0
        if left >= right and lo > 0:
            lo -= 1; cum += left
        elif hi < bins - 1:
            hi += 1; cum += right
        else:
            lo -= 1; cum += left

    return poc, mid_prices[lo], mid_prices[hi]

poc, val, vah = volume_profile(nifty.tail(60))
print(f"POC: {poc:.0f} | VAL: {val:.0f} | VAH: {vah:.0f}")`}),e.jsx(o,{title:"Trading with Volume Profile",children:"POC acts as a magnet -- price tends to return to it. VAH and VAL serve as support/resistance. On Nifty, if price opens above VAH, expect trending behavior. If it opens between VAL and VAH, expect mean reversion to POC."})]})}const W=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs(t,{title:"Accumulation/Distribution Line",description:"Tracking smart money flow using the A/D line and divergence signals on Indian stocks.",children:[e.jsx(n,{term:"Accumulation/Distribution (A/D) Line",children:"A cumulative indicator combining price and volume. It uses the Close Location Value (CLV) = (Close - Low - (High - Close)) / (High - Low), multiplied by volume. When A/D rises, accumulation is occurring; when it falls, distribution is happening."}),e.jsx(i,{language:"python",title:"A/D Line for NSE Stocks",children:`import pandas as pd
import numpy as np
import yfinance as yf

# Fetch Reliance Industries
ril = yf.download("RELIANCE.NS", start="2024-01-01", end="2025-12-31")

# Close Location Value
clv = ((ril['Close'] - ril['Low']) - (ril['High'] - ril['Close'])) /       (ril['High'] - ril['Low'])
clv = clv.fillna(0)  # Handle zero-range days

# A/D Line = cumulative sum of CLV * Volume
ril['AD_Flow'] = clv * ril['Volume']
ril['AD_Line'] = ril['AD_Flow'].cumsum()

# Smooth A/D with EMA for signal
ril['AD_EMA'] = ril['AD_Line'].ewm(span=20, adjust=False).mean()

print(ril[['Close', 'Volume', 'AD_Line']].tail())`}),e.jsx(i,{language:"python",title:"A/D Line Divergence Detection",children:`def detect_ad_divergence(df, window=20):
    """Detect divergence between price and A/D line."""
    signals = []

    for i in range(window, len(df)):
        price_slice = df['Close'].iloc[i-window:i+1]
        ad_slice = df['AD_Line'].iloc[i-window:i+1]

        # Bullish: price makes lower low, A/D makes higher low
        if (price_slice.iloc[-1] < price_slice.min() * 1.001 and
            ad_slice.iloc[-1] > ad_slice.iloc[0]):
            signals.append(('BULL_DIV', df.index[i]))

        # Bearish: price makes higher high, A/D makes lower high
        if (price_slice.iloc[-1] > price_slice.max() * 0.999 and
            ad_slice.iloc[-1] < ad_slice.iloc[0]):
            signals.append(('BEAR_DIV', df.index[i]))

    return signals

divergences = detect_ad_divergence(ril)
for sig_type, date in divergences[-5:]:
    print(f"{sig_type}: {date.strftime('%Y-%m-%d')}")`}),e.jsx(i,{language:"python",title:"Multi-Stock A/D Screening",children:`tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"]
results = []

for t in tickers:
    df = yf.download(t, period="3mo", progress=False)
    if len(df) < 20:
        continue
    clv = ((df['Close'] - df['Low']) - (df['High'] - df['Close'])) / (df['High'] - df['Low'])
    ad = (clv.fillna(0) * df['Volume']).cumsum()

    # Compare 20-day trend
    ad_trend = "Accumulation" if ad.iloc[-1] > ad.iloc[-20] else "Distribution"
    price_chg = ((df['Close'].iloc[-1] / df['Close'].iloc[-20]) - 1) * 100
    results.append({'Stock': t.replace('.NS',''), 'Price_Chg': f"{price_chg:.1f}%",
                    'AD_Trend': ad_trend})

print(pd.DataFrame(results).to_string(index=False))`}),e.jsx(o,{title:"Divergence Insight",children:"When a Nifty 50 stock makes new highs but its A/D line is declining, institutional selling is likely underway. This bearish divergence often precedes a 5-10% correction -- especially reliable in large-caps with high delivery volume on NSE."})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function w(){return e.jsxs(t,{title:"Chaikin Money Flow",description:"Measuring buying and selling pressure over a rolling window for Indian market stocks.",children:[e.jsx(n,{term:"Chaikin Money Flow (CMF)",children:"A volume-weighted average of accumulation/distribution over a period (default 20). CMF = Sum(CLV x Volume, N) / Sum(Volume, N). It oscillates between -1 and +1. Positive CMF indicates buying pressure; negative indicates selling."}),e.jsx(i,{language:"python",title:"CMF Calculation on NSE Stocks",children:`import pandas as pd
import numpy as np
import yfinance as yf

hdfc = yf.download("HDFCBANK.NS", start="2024-01-01", end="2025-12-31")

# Close Location Value
clv = ((hdfc['Close'] - hdfc['Low']) - (hdfc['High'] - hdfc['Close'])) /       (hdfc['High'] - hdfc['Low'])
clv = clv.fillna(0)

# Money Flow Volume
mfv = clv * hdfc['Volume']

# CMF (20-period)
period = 20
hdfc['CMF'] = mfv.rolling(period).sum() / hdfc['Volume'].rolling(period).sum()

print(hdfc[['Close', 'CMF']].tail(10))`}),e.jsx(i,{language:"python",title:"CMF Trading Signals",children:`# Basic signals
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
print(f"Buy & Hold Return: {buyhold_ret:.2%}")`}),e.jsx(i,{language:"python",title:"CMF Divergence Scanner",children:`def cmf_divergence_scan(tickers):
    results = []
    for t in tickers:
        df = yf.download(t, period="3mo", progress=False)
        if len(df) < 30:
            continue
        clv = ((df['Close'] - df['Low']) - (df['High'] - df['Close'])) /               (df['High'] - df['Low'])
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
print(cmf_divergence_scan(nifty_stocks).to_string(index=False))`}),e.jsx(o,{title:"Indian Market Insight",children:"CMF above +0.10 on HDFC Bank, Reliance, or TCS often aligns with FII buying phases visible in SEBI data. Negative CMF during price rallies in mid-caps is a red flag -- it suggests retail buying while institutions distribute."})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));function A(){return e.jsxs(t,{title:"Volume-Weighted Indicators",description:"VWMA, volume oscillator, and volume-price trend analysis for NSE trading.",children:[e.jsx(n,{term:"Volume Weighted Moving Average (VWMA)",children:"A moving average that weights each bar's price by its volume. VWMA = Sum(Close x Volume, N) / Sum(Volume, N). When VWMA is above SMA, high-volume bars had higher prices, indicating bullish conviction."}),e.jsx(n,{term:"Volume Oscillator",children:"The difference between a short-period and long-period volume moving average, expressed as a percentage. It reveals whether volume is expanding or contracting relative to its own trend."}),e.jsx(i,{language:"python",title:"VWMA and SMA Comparison",children:`import pandas as pd
import numpy as np
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")
period = 20

# VWMA
nifty['VWMA_20'] = (
    (nifty['Close'] * nifty['Volume']).rolling(period).sum() /
    nifty['Volume'].rolling(period).sum()
)
nifty['SMA_20'] = nifty['Close'].rolling(period).mean()

# VWMA above SMA = bullish volume confirmation
nifty['vol_bullish'] = nifty['VWMA_20'] > nifty['SMA_20']

pct_bullish = nifty['vol_bullish'].mean() * 100
print(f"Days with bullish volume confirmation: {pct_bullish:.1f}%")
print(nifty[['Close', 'VWMA_20', 'SMA_20', 'vol_bullish']].tail())`}),e.jsx(i,{language:"python",title:"Volume Oscillator",children:`# Volume Oscillator = (Short Vol MA - Long Vol MA) / Long Vol MA * 100
nifty['Vol_Short'] = nifty['Volume'].rolling(5).mean()
nifty['Vol_Long'] = nifty['Volume'].rolling(20).mean()
nifty['Vol_Osc'] = (
    (nifty['Vol_Short'] - nifty['Vol_Long']) / nifty['Vol_Long'] * 100
)

# Positive = volume expanding; Negative = volume contracting
# Rising price + positive oscillator = confirmed uptrend
nifty['price_up'] = nifty['Close'] > nifty['Close'].shift(5)
nifty['vol_expanding'] = nifty['Vol_Osc'] > 0
nifty['strong_move'] = nifty['price_up'] & nifty['vol_expanding']

print(f"Strong upward moves (price+vol): {nifty['strong_move'].sum()}")`}),e.jsx(i,{language:"python",title:"Volume Price Trend (VPT)",children:`# VPT = Previous VPT + Volume * (Close - Prev Close) / Prev Close
pct_chg = nifty['Close'].pct_change()
nifty['VPT'] = (nifty['Volume'] * pct_chg).cumsum()
nifty['VPT_Signal'] = nifty['VPT'].rolling(20).mean()

# VPT above signal = accumulation
# VPT below signal = distribution
nifty['vpt_bullish'] = nifty['VPT'] > nifty['VPT_Signal']

print(nifty[['Close', 'VPT', 'VPT_Signal', 'vpt_bullish']].tail())`}),e.jsx(o,{title:"Volume Analysis Tip",children:"On NSE, average daily volume for Nifty futures is a key gauge. When VWMA diverges above SMA on Bank Nifty, it typically means institutional participation is driving prices -- these moves tend to sustain for 3-5 sessions. Low volume oscillator readings during price breakouts are false breakout warnings."})]})}const X=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));function C(){return e.jsxs(t,{title:"Ichimoku Cloud",description:"A complete trading system: Tenkan-sen, Kijun-sen, Senkou spans, and Chikou span on Nifty.",children:[e.jsx(n,{term:"Ichimoku Kinko Hyo",children:"A five-line indicator system that defines support/resistance, trend direction, and momentum at a glance. Developed by Goichi Hosoda, it uses past, present, and future projected price levels."}),e.jsx(i,{language:"python",title:"Ichimoku Cloud Calculation",children:`import pandas as pd
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def ichimoku(df):
    # Tenkan-sen (Conversion Line): 9-period midpoint
    tenkan = (df['High'].rolling(9).max() + df['Low'].rolling(9).min()) / 2

    # Kijun-sen (Base Line): 26-period midpoint
    kijun = (df['High'].rolling(26).max() + df['Low'].rolling(26).min()) / 2

    # Senkou Span A (Leading Span A): midpoint of Tenkan/Kijun, shifted 26 ahead
    senkou_a = ((tenkan + kijun) / 2).shift(26)

    # Senkou Span B (Leading Span B): 52-period midpoint, shifted 26 ahead
    senkou_b = ((df['High'].rolling(52).max() +
                 df['Low'].rolling(52).min()) / 2).shift(26)

    # Chikou Span (Lagging Span): Close shifted 26 periods back
    chikou = df['Close'].shift(-26)

    return tenkan, kijun, senkou_a, senkou_b, chikou

nifty['Tenkan'], nifty['Kijun'], nifty['SpanA'], nifty['SpanB'], nifty['Chikou'] =     ichimoku(nifty)

print(nifty[['Close', 'Tenkan', 'Kijun', 'SpanA', 'SpanB']].tail())`}),e.jsx(i,{language:"python",title:"Ichimoku Trading Signals",children:`# Cloud color: bullish when Span A > Span B (green cloud)
nifty['cloud_bull'] = nifty['SpanA'] > nifty['SpanB']

# TK Cross: Tenkan crosses above Kijun (bullish)
nifty['tk_bull'] = (
    (nifty['Tenkan'] > nifty['Kijun']) &
    (nifty['Tenkan'].shift(1) <= nifty['Kijun'].shift(1))
)

# Strong buy: TK cross + price above cloud + Chikou above price
nifty['cloud_top'] = nifty[['SpanA', 'SpanB']].max(axis=1)
nifty['strong_buy'] = (
    nifty['tk_bull'] &
    (nifty['Close'] > nifty['cloud_top']) &
    nifty['cloud_bull']
)

buys = nifty[nifty['strong_buy']]
print(f"Strong Ichimoku buy signals: {len(buys)}")
for date in buys.index[-5:]:
    print(f"  {date.strftime('%Y-%m-%d')}: {nifty.loc[date, 'Close']:.0f}")`}),e.jsx(i,{language:"python",title:"Cloud as Support/Resistance",children:`# Distance from cloud (positive = above, negative = below)
nifty['cloud_bottom'] = nifty[['SpanA', 'SpanB']].min(axis=1)
nifty['dist_from_cloud'] = nifty['Close'] - nifty['cloud_top']

# Price entering the cloud = indecision zone
nifty['in_cloud'] = (
    (nifty['Close'] <= nifty['cloud_top']) &
    (nifty['Close'] >= nifty['cloud_bottom'])
)

cloud_days = nifty['in_cloud'].sum()
print(f"Days price was inside cloud: {cloud_days}")`}),e.jsx(o,{title:"Ichimoku on Nifty",children:"On Nifty weekly charts, Ichimoku cloud provides excellent trend context. Price above a thick green cloud indicates strong uptrend with deep support. The Kijun line (26-period midpoint) on weekly charts often acts as pullback support during bull markets -- watch for bounces at this level."})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"}));function S(){return e.jsxs(t,{title:"Heikin-Ashi & Renko Charts",description:"Noise-reducing chart types for cleaner trend signals on Indian equities.",children:[e.jsx(n,{term:"Heikin-Ashi Candles",children:"Modified candlesticks that smooth price action. HA_Close = (O+H+L+C)/4, HA_Open = (prev_HA_Open + prev_HA_Close)/2. Green candles without lower wicks indicate strong uptrend; red candles without upper wicks indicate strong downtrend."}),e.jsx(i,{language:"python",title:"Heikin-Ashi Transformation",children:`import pandas as pd
import yfinance as yf

nifty = yf.download("^NSEI", start="2024-01-01", end="2025-12-31")

def heikin_ashi(df):
    ha = pd.DataFrame(index=df.index)
    ha['Close'] = (df['Open'] + df['High'] + df['Low'] + df['Close']) / 4
    ha['Open'] = 0.0
    ha['Open'].iloc[0] = (df['Open'].iloc[0] + df['Close'].iloc[0]) / 2
    for i in range(1, len(df)):
        ha['Open'].iloc[i] = (ha['Open'].iloc[i-1] + ha['Close'].iloc[i-1]) / 2
    ha['High'] = pd.concat([df['High'], ha['Open'], ha['Close']], axis=1).max(axis=1)
    ha['Low'] = pd.concat([df['Low'], ha['Open'], ha['Close']], axis=1).min(axis=1)
    return ha

ha = heikin_ashi(nifty)

# Trend detection from HA candles
ha['bullish'] = ha['Close'] > ha['Open']
ha['strong_bull'] = ha['bullish'] & (ha['Low'] == ha['Open'])  # No lower wick
ha['strong_bear'] = ~ha['bullish'] & (ha['High'] == ha['Open'])  # No upper wick

print(f"Strong bullish days: {ha['strong_bull'].sum()}")
print(f"Strong bearish days: {ha['strong_bear'].sum()}")`}),e.jsx(n,{term:"Renko Charts",children:"Time-independent charts using fixed-size bricks. A new brick forms only when price moves by the brick size (e.g., 100 points on Nifty). This eliminates time-based noise and highlights pure price movement."}),e.jsx(i,{language:"python",title:"Renko Chart Construction",children:`def build_renko(closes, brick_size):
    """Build Renko bricks from close prices."""
    bricks = []
    last_price = closes.iloc[0]
    direction = 0  # 0=undecided, 1=up, -1=down

    for price in closes:
        diff = price - last_price
        num_bricks = int(abs(diff) / brick_size)

        if num_bricks >= 1:
            new_dir = 1 if diff > 0 else -1
            for _ in range(num_bricks):
                if new_dir == 1:
                    brick_open = last_price
                    last_price += brick_size
                else:
                    brick_open = last_price
                    last_price -= brick_size
                bricks.append({
                    'open': brick_open,
                    'close': last_price,
                    'direction': new_dir
                })
            direction = new_dir

    return pd.DataFrame(bricks)

renko = build_renko(nifty['Close'], brick_size=100)
print(f"Total bricks: {len(renko)}")
print(f"Up bricks: {(renko['direction'] == 1).sum()}")
print(f"Down bricks: {(renko['direction'] == -1).sum()}")

# Count consecutive bricks for trend strength
renko['streak'] = renko['direction'].groupby(
    (renko['direction'] != renko['direction'].shift()).cumsum()
).cumcount() + 1
print(f"Max consecutive up: {renko[renko['direction']==1]['streak'].max()}")
print(f"Max consecutive down: {renko[renko['direction']==-1]['streak'].max()}")`}),e.jsx(o,{title:"Practical Application",children:"Use Heikin-Ashi on Bank Nifty 15-min charts to hold intraday trends longer -- stay in the trade until the candle color changes. For Renko, use ATR-based brick sizes (e.g., 1x daily ATR for Nifty) to adapt to current volatility. Renko works well with Supertrend for swing trading signals."})]})}const G=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(t,{title:"Market Internals & Breadth",description:"Advance/Decline line, TICK, TRIN, and breadth indicators for NSE market health.",children:[e.jsx(n,{term:"Advance/Decline (A/D) Line",children:"Cumulative sum of (advancing stocks - declining stocks) each day across the exchange. A rising A/D line confirms the index rally has broad participation; declining A/D during a rally warns of narrowing breadth."}),e.jsx(n,{term:"TRIN (Arms Index)",children:"TRIN = (Advancing Issues / Declining Issues) / (Advancing Volume / Declining Volume). TRIN below 1.0 is bullish (more volume in advancing stocks); above 1.0 is bearish. Extreme readings (above 2.0 or below 0.5) signal exhaustion."}),e.jsx(i,{language:"python",title:"NSE Market Breadth Analysis",children:`import pandas as pd
import numpy as np

# Simulated NSE daily breadth data
dates = pd.date_range('2025-01-01', periods=60, freq='B')
np.random.seed(42)

breadth = pd.DataFrame({
    'Date': dates,
    'Advances': np.random.randint(600, 1400, 60),
    'Declines': np.random.randint(400, 1200, 60),
    'Adv_Volume': np.random.randint(100, 500, 60) * 1e6,
    'Dec_Volume': np.random.randint(80, 400, 60) * 1e6,
}).set_index('Date')

breadth['Unchanged'] = 1800 - breadth['Advances'] - breadth['Declines']

# A/D Line (cumulative)
breadth['AD_Diff'] = breadth['Advances'] - breadth['Declines']
breadth['AD_Line'] = breadth['AD_Diff'].cumsum()

# TRIN / Arms Index
breadth['TRIN'] = (
    (breadth['Advances'] / breadth['Declines']) /
    (breadth['Adv_Volume'] / breadth['Dec_Volume'])
)

# Breadth thrust: >70% stocks advancing
breadth['total'] = breadth['Advances'] + breadth['Declines']
breadth['adv_pct'] = breadth['Advances'] / breadth['total'] * 100
breadth['thrust'] = breadth['adv_pct'] > 70

print(breadth[['AD_Diff', 'AD_Line', 'TRIN', 'adv_pct']].tail(10))`}),e.jsx(i,{language:"python",title:"McClellan Oscillator for NSE",children:`# McClellan Oscillator = 19-day EMA(AD Diff) - 39-day EMA(AD Diff)
breadth['EMA_19'] = breadth['AD_Diff'].ewm(span=19, adjust=False).mean()
breadth['EMA_39'] = breadth['AD_Diff'].ewm(span=39, adjust=False).mean()
breadth['McClellan'] = breadth['EMA_19'] - breadth['EMA_39']

# McClellan Summation Index (cumulative)
breadth['McClellan_Sum'] = breadth['McClellan'].cumsum()

# Overbought > +100, Oversold < -100
print("McClellan Oscillator (last 5 days):")
print(breadth[['McClellan', 'McClellan_Sum']].tail())`}),e.jsx(r,{children:"Market breadth data is not available via standard APIs like yfinance. For live NSE breadth, scrape from NSE India website or use paid data feeds like Global Datafeeds or TrueData for real-time advance/decline ticks."}),e.jsx(o,{title:"Breadth Divergence Signal",children:"If Nifty 50 makes a new high but the NSE A/D line does not confirm, the rally is driven by a handful of heavyweight stocks. This breadth divergence preceded corrections in Oct 2021 and Sep 2024 -- always check breadth before aggressively going long at index highs."})]})}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function M(){return e.jsxs(t,{title:"Building Custom Indicators",description:"Creating your own technical indicators in Python with pandas and numpy for NSE trading.",children:[e.jsx(n,{term:"Custom Indicator",children:"A user-defined mathematical transformation of price, volume, or other market data. Custom indicators can combine multiple standard indicators, apply unique smoothing, or incorporate domain-specific logic."}),e.jsx(i,{language:"python",title:"Trend Strength Composite",children:`import pandas as pd
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
print(nifty[['Close', 'TSI']].tail(10))`}),e.jsx(i,{language:"python",title:"Mean Reversion Z-Score Indicator",children:`def zscore_indicator(series, lookback=20):
    """Z-score of price relative to its rolling mean."""
    mean = series.rolling(lookback).mean()
    std = series.rolling(lookback).std()
    return (series - mean) / std

nifty['ZScore'] = zscore_indicator(nifty['Close'])

# Signals: extreme z-scores suggest mean reversion
nifty['z_buy'] = nifty['ZScore'] < -2.0   # Oversold
nifty['z_sell'] = nifty['ZScore'] > 2.0   # Overbought

print(f"Z-score buy signals: {nifty['z_buy'].sum()}")
print(f"Z-score sell signals: {nifty['z_sell'].sum()}")`}),e.jsx(i,{language:"python",title:"Reusable Indicator Framework",children:`class Indicator:
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
print(result[['Close', 'EMA_20', 'RSI', 'ATR']].tail())`}),e.jsx(o,{title:"Building Your Edge",children:"Start with standard indicators, then tweak parameters for Indian market behavior. Nifty tends to mean-revert on daily timeframes (Z-score works well) but trends on weekly charts (composite trend scores shine). Always backtest custom indicators on at least 3 years of NSE data before live deployment."})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"}));export{D as a,R as b,N as c,O as d,B as e,L as f,H as g,E as h,T as i,P as j,F as k,z as l,W as m,K as n,q as o,X as p,U as q,G as r,j as s,Z as t,Y as u};
