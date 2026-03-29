import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as a,D as i,C as t,N as n}from"./subject-01-B5qsZKsm.js";const B={id:"07-trading-strategies",title:"Trading Strategies",icon:"🎯",colorHex:"#22c55e",description:"Build and deploy intraday, options, swing, and multi-agent trading strategies for Indian markets.",difficulty:"advanced",estimatedHours:6,prerequisites:["05-technical-indicators","06-order-flow"],chapters:[{id:"c1-intraday",title:"Intraday Strategies",description:"Scalp and day-trade Nifty and BankNifty with proven intraday setups.",estimatedMinutes:55,sections:[{id:"s1-orb",title:"Opening Range Breakout",difficulty:"advanced",readingMinutes:15,description:"ORB strategy for Nifty/BankNifty at 9:15 open."},{id:"s2-vwap-reversion",title:"VWAP Reversion",difficulty:"advanced",readingMinutes:12,description:"Mean reversion trades around VWAP levels."},{id:"s3-momentum-scalping",title:"Momentum Scalping",difficulty:"advanced",readingMinutes:12,description:"Scalping with order flow momentum confirmation."},{id:"s4-gap-trading",title:"Gap Trading (NSE Open)",difficulty:"advanced",readingMinutes:12,description:"Trade gap-up and gap-down opens at NSE."}]},{id:"c2-options-strategies",title:"Options Strategies (Nifty/BankNifty)",description:"Trade weekly options with straddles, condors, and gamma scalping.",estimatedMinutes:55,sections:[{id:"s1-straddle-strangle",title:"Straddle & Strangle Selling",difficulty:"advanced",readingMinutes:15,description:"Weekly expiry straddle/strangle selling strategies."},{id:"s2-iron-condor",title:"Iron Condor & Butterfly",difficulty:"advanced",readingMinutes:12,description:"Range-bound strategies with defined risk."},{id:"s3-calendar-diagonal",title:"Calendar & Diagonal Spreads",difficulty:"advanced",readingMinutes:12,description:"Time decay strategies across expiries."},{id:"s4-gamma-scalping",title:"Gamma Scalping",difficulty:"advanced",readingMinutes:15,description:"Dynamic delta hedging and gamma scalping."}]},{id:"c3-swing-positional",title:"Swing & Positional",description:"Multi-day strategies using sector rotation, pairs, and events.",estimatedMinutes:55,sections:[{id:"s1-multi-timeframe",title:"Multi-Timeframe Analysis",difficulty:"advanced",readingMinutes:15,description:"Align signals across daily, 4H, and 1H charts."},{id:"s2-sector-rotation",title:"Sector Rotation Strategies",difficulty:"advanced",readingMinutes:12,description:"Rotate between Indian market sectors."},{id:"s3-pairs-trading",title:"Pairs Trading (Indian Stocks)",difficulty:"advanced",readingMinutes:15,description:"Statistical pairs trading with cointegrated stocks."},{id:"s4-event-driven",title:"Event-Driven (Earnings, RBI Policy)",difficulty:"advanced",readingMinutes:12,description:"Trade around earnings, RBI policy, and elections."}]},{id:"c4-derivatives-delta",title:"Derivatives Strategies (Delta Exchange)",description:"Trade crypto derivatives on Delta Exchange with basis and vol strategies.",estimatedMinutes:55,sections:[{id:"s1-basis-trading",title:"Crypto Futures Basis Trading",difficulty:"advanced",readingMinutes:15,description:"Cash-and-carry arbitrage on Delta Exchange."},{id:"s2-funding-rate",title:"Perpetual Funding Rate Arbitrage",difficulty:"advanced",readingMinutes:12,description:"Harvest funding rates on perpetual contracts."},{id:"s3-vol-strategies",title:"Options Volatility Strategies",difficulty:"advanced",readingMinutes:12,description:"Trade crypto implied volatility on Delta."},{id:"s4-cross-exchange",title:"Cross-Exchange Arbitrage",difficulty:"advanced",readingMinutes:15,description:"Arbitrage opportunities across exchanges."}]},{id:"c5-multi-agent",title:"Multi-Agent Trading",description:"Deploy AI agents that analyze, debate, and trade autonomously.",estimatedMinutes:55,sections:[{id:"s1-analyst-agents",title:"Analyst Agents (Technical, Fundamental, Sentiment)",difficulty:"advanced",readingMinutes:15,description:"Build specialized analyst agents with Claude."},{id:"s2-bull-bear-debate",title:"Bull/Bear Debate Framework",difficulty:"advanced",readingMinutes:12,description:"Structure debates between bull and bear agents."},{id:"s3-risk-agents",title:"Risk Management Agents",difficulty:"advanced",readingMinutes:12,description:"Aggressive, conservative, and neutral risk agents."},{id:"s4-portfolio-manager",title:"Portfolio Manager Agent",difficulty:"advanced",readingMinutes:15,description:"Final approval agent for trade execution."}]},{id:"c6-strategy-combination",title:"Strategy Combination",description:"Combine multiple strategies with signal aggregation and regime detection.",estimatedMinutes:55,sections:[{id:"s1-signal-aggregation",title:"Signal Aggregation & Scoring",difficulty:"advanced",readingMinutes:15,description:"Score and aggregate signals from multiple strategies."},{id:"s2-regime-detection",title:"Regime Detection & Strategy Switching",difficulty:"advanced",readingMinutes:12,description:"Detect market regimes and switch strategies."},{id:"s3-risk-allocation",title:"Portfolio-Level Risk Allocation",difficulty:"advanced",readingMinutes:12,description:"Allocate risk budget across strategies."},{id:"s4-drawdown-management",title:"Drawdown Management",difficulty:"advanced",readingMinutes:15,description:"Manage drawdowns and recovery procedures."}]}]};function r(){return e.jsxs(a,{title:"Opening Range Breakout (ORB)",description:"Trading the first N-minute range breakout on Nifty and BankNifty.",children:[e.jsx(i,{term:"Opening Range Breakout",children:"Define the high and low of the first 15 or 30 minutes after NSE open (9:15 AM). A breakout above the range high triggers a long; below the range low triggers a short. Works best on trending days."}),e.jsx(t,{language:"python",title:"ORB Strategy for Nifty Futures",children:`import pandas as pd
import numpy as np

def orb_strategy(candles_5m, orb_minutes=15):
    """Opening Range Breakout on 5-min Nifty candles."""
    candles = candles_5m.copy()
    candles['date'] = candles['time'].dt.date
    candles['session_min'] = (
        (candles['time'] - candles['time'].dt.normalize())
        .dt.total_seconds() / 60
    )

    results = []
    for date, day in candles.groupby('date'):
        # Opening range: 9:15 to 9:15 + orb_minutes
        orb_mask = day['session_min'] <= (555 + orb_minutes)  # 555 = 9:15
        opening_range = day[orb_mask]
        if opening_range.empty:
            continue

        orb_high = opening_range['high'].max()
        orb_low = opening_range['low'].min()
        orb_range = orb_high - orb_low

        # Trade after ORB period
        trade_bars = day[~orb_mask]
        entry = None
        for _, bar in trade_bars.iterrows():
            if entry is None:
                if bar['high'] > orb_high:
                    entry = {'dir': 'long', 'price': orb_high + 0.5}
                elif bar['low'] < orb_low:
                    entry = {'dir': 'short', 'price': orb_low - 0.5}
            if entry:
                # Exit at 3:15 PM or 1.5x ORB range SL
                sl = orb_range * 1.5
                target = orb_range * 2.0
                results.append({
                    'date': date, 'direction': entry['dir'],
                    'entry': entry['price'], 'orb_range': orb_range,
                    'sl': sl, 'target': target
                })
                break

    return pd.DataFrame(results)

# Backtest would use historical 5-min Nifty futures data
print("ORB typically wins 50-55% with 2:1.5 RR on trending days")`}),e.jsx(n,{title:"ORB Filters for Indian Markets",children:"Avoid ORB on expiry days (Thursday) when Nifty moves are erratic. Best performance is on Monday/Tuesday with a gap open. Filter out days where ORB range is less than 30 points (too narrow, likely choppy) or more than 100 points (late entry risk)."})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:r},Symbol.toStringTag,{value:"Module"}));function s(){return e.jsxs(a,{title:"VWAP Reversion Strategy",description:"Mean reversion trades anchored to VWAP with statistical bands.",children:[e.jsx(i,{term:"VWAP (Volume Weighted Average Price)",children:"The average price weighted by volume, calculated from market open. VWAP acts as the fair price for the day. Institutional algorithms benchmark execution against VWAP, making it a natural mean reversion anchor."}),e.jsx(t,{language:"python",title:"VWAP Reversion Strategy",children:`import pandas as pd
import numpy as np

def compute_vwap_bands(candles, std_mult=2.0):
    """Compute VWAP and standard deviation bands."""
    candles = candles.copy()
    candles['typical'] = (candles['high'] + candles['low'] + candles['close']) / 3
    candles['tp_vol'] = candles['typical'] * candles['volume']
    candles['cum_vol'] = candles['volume'].cumsum()
    candles['cum_tp_vol'] = candles['tp_vol'].cumsum()
    candles['vwap'] = candles['cum_tp_vol'] / candles['cum_vol']

    # VWAP standard deviation bands
    candles['sq_diff'] = (candles['typical'] - candles['vwap'])**2 * candles['volume']
    candles['cum_sq'] = candles['sq_diff'].cumsum()
    candles['vwap_std'] = np.sqrt(candles['cum_sq'] / candles['cum_vol'])
    candles['upper'] = candles['vwap'] + std_mult * candles['vwap_std']
    candles['lower'] = candles['vwap'] - std_mult * candles['vwap_std']
    return candles

def vwap_reversion_signals(candles):
    """Generate mean reversion signals off VWAP bands."""
    c = compute_vwap_bands(candles, std_mult=2.0)
    signals = []

    for i in range(1, len(c)):
        # Short when price touches upper band and reverses
        if c['high'].iloc[i] > c['upper'].iloc[i] and            c['close'].iloc[i] < c['upper'].iloc[i]:
            signals.append({'bar': i, 'signal': 'short',
                           'entry': c['close'].iloc[i],
                           'target': c['vwap'].iloc[i]})

        # Long when price touches lower band and reverses
        elif c['low'].iloc[i] < c['lower'].iloc[i] and              c['close'].iloc[i] > c['lower'].iloc[i]:
            signals.append({'bar': i, 'signal': 'long',
                           'entry': c['close'].iloc[i],
                           'target': c['vwap'].iloc[i]})

    return pd.DataFrame(signals)

print("VWAP reversion works best on range-bound days")
print("Avoid on trending days when price stays above/below VWAP")`}),e.jsx(n,{title:"VWAP Reversion on BankNifty",children:"BankNifty tends to touch VWAP 3-5 times during a session. The best reversion trades occur at the 2-sigma band during 11:00-14:00 when volume is lowest. Target the VWAP itself and trail stop to breakeven once 50% of the move is captured."})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:s},Symbol.toStringTag,{value:"Module"}));function o(){return e.jsxs(a,{title:"Momentum Scalping with Order Flow",description:"Combining momentum indicators with order flow for high-probability scalps.",children:[e.jsx(i,{term:"Momentum Scalping",children:"Ultra-short-term trades (1-10 minutes) that ride a burst of momentum confirmed by order flow imbalance. Enter on momentum ignition, exit on first sign of absorption or delta divergence."}),e.jsx(t,{language:"python",title:"Momentum Scalping Signal Generator",children:`import pandas as pd
import numpy as np

class MomentumScalper:
    def __init__(self, ema_fast=5, ema_slow=13, delta_threshold=500):
        self.ema_fast = ema_fast
        self.ema_slow = ema_slow
        self.delta_threshold = delta_threshold

    def generate_signals(self, candles_1m):
        """1-minute candles with volume delta for scalping."""
        c = candles_1m.copy()

        # EMA momentum
        c['ema_f'] = c['close'].ewm(span=self.ema_fast).mean()
        c['ema_s'] = c['close'].ewm(span=self.ema_slow).mean()
        c['momentum'] = c['ema_f'] - c['ema_s']

        # Volume delta (buy_vol - sell_vol per candle)
        c['cum_delta'] = c['delta'].cumsum()
        c['delta_ma'] = c['delta'].rolling(10).mean()

        signals = []
        for i in range(13, len(c)):
            row = c.iloc[i]
            prev = c.iloc[i-1]

            # Long: momentum turning up + positive delta surge
            if (row['momentum'] > 0 and prev['momentum'] <= 0
                and row['delta'] > self.delta_threshold):
                signals.append({
                    'time': row['time'], 'side': 'long',
                    'entry': row['close'],
                    'sl': row['close'] - 10,
                    'target': row['close'] + 15
                })

            # Short: momentum turning down + negative delta surge
            elif (row['momentum'] < 0 and prev['momentum'] >= 0
                  and row['delta'] < -self.delta_threshold):
                signals.append({
                    'time': row['time'], 'side': 'short',
                    'entry': row['close'],
                    'sl': row['close'] + 10,
                    'target': row['close'] - 15
                })

        return pd.DataFrame(signals)

scalper = MomentumScalper(delta_threshold=300)
print("Feed 1-min candles with 'delta' column from footprint data")`}),e.jsx(n,{title:"Scalping Rules for NSE",children:"Keep scalps under 5 minutes on Nifty futures. Transaction costs (brokerage + STT + GST) on futures are ~Rs 40-60 per lot round trip. You need at least 3-5 points per trade to be profitable after costs. Avoid scalping in the 12:30-13:30 lunch hour -- low volume causes false signals."})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:o},Symbol.toStringTag,{value:"Module"}));function l(){return e.jsxs(a,{title:"Gap Trading at NSE Open",description:"Strategies for trading gap-up and gap-down openings at 9:15 AM.",children:[e.jsx(i,{term:"Gap",children:"When the opening price is significantly different from the previous close. On Nifty, gaps above 50 points are significant. Gaps can fill (price returns to previous close) or continue (trend day)."}),e.jsx(t,{language:"python",title:"Gap Classification and Strategy",children:`import pandas as pd
import numpy as np

def classify_gap(prev_close, open_price, atr_14):
    """Classify gap type for strategy selection."""
    gap = open_price - prev_close
    gap_pct = (gap / prev_close) * 100
    gap_atr = abs(gap) / atr_14

    if abs(gap_pct) < 0.1:
        return 'no_gap', gap
    elif gap_atr < 0.5:
        gtype = 'small'
    elif gap_atr < 1.0:
        gtype = 'medium'
    else:
        gtype = 'large'

    direction = 'up' if gap > 0 else 'down'
    return f'{gtype}_gap_{direction}', gap

def gap_fill_strategy(daily_data):
    """Trade gap fills on Nifty -- fade small/medium gaps."""
    daily = daily_data.copy()
    daily['gap'] = daily['open'] - daily['close'].shift(1)
    daily['gap_pct'] = daily['gap'] / daily['close'].shift(1) * 100
    daily['atr'] = daily['high'].sub(daily['low']).rolling(14).mean()

    signals = []
    for i in range(15, len(daily)):
        row = daily.iloc[i]
        gap_atr = abs(row['gap']) / row['atr']

        # Fade small/medium gaps (0.3-1.0 ATR)
        if 0.3 < gap_atr < 1.0:
            if row['gap'] > 0:  # Gap up -> short for fill
                signals.append({
                    'date': row.name, 'side': 'short',
                    'entry': row['open'],
                    'target': daily.iloc[i-1]['close'],
                    'sl': row['open'] + abs(row['gap'])
                })
            else:  # Gap down -> long for fill
                signals.append({
                    'date': row.name, 'side': 'long',
                    'entry': row['open'],
                    'target': daily.iloc[i-1]['close'],
                    'sl': row['open'] - abs(row['gap'])
                })

    return pd.DataFrame(signals)

print("Gap fill rate on Nifty: ~65% for small gaps, ~40% for large gaps")`}),e.jsx(n,{title:"9:15 AM Gap Trading Tips",children:"Do not trade the first candle blind. Wait for 9:15-9:20 to see if the gap holds. If a gap-up opens and the first 5-min candle closes red, the gap fill probability increases to 70%+. Large gaps (over 1% on Nifty) rarely fill on the same day -- trade continuation instead."})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:l},Symbol.toStringTag,{value:"Module"}));function d(){return e.jsxs(a,{title:"Selling Straddles & Strangles on Weekly Expiry",description:"Premium selling strategies exploiting theta decay on Nifty weekly options.",children:[e.jsx(i,{term:"Short Straddle",children:"Sell ATM call and ATM put at the same strike. Maximum profit if Nifty expires exactly at the strike. Risk is unlimited on both sides. Profitable when realized volatility is less than implied."}),e.jsx(i,{term:"Short Strangle",children:"Sell OTM call and OTM put at different strikes. Wider profit zone than straddle but lower premium collected. The go-to strategy for Nifty weekly expiry sellers."}),e.jsx(t,{language:"python",title:"Short Strangle Setup and P&L",children:`import numpy as np

def short_strangle(spot, call_strike, put_strike,
                   call_premium, put_premium, lot_size=25):
    """Calculate P&L for short strangle on Nifty."""
    total_premium = (call_premium + put_premium) * lot_size

    expiry_range = np.arange(spot - 500, spot + 500, 10)
    pnl = []
    for s in expiry_range:
        call_payout = max(0, s - call_strike) * lot_size
        put_payout = max(0, put_strike - s) * lot_size
        net = total_premium - call_payout - put_payout
        pnl.append({'expiry': s, 'pnl': net})

    upper_be = call_strike + call_premium + put_premium
    lower_be = put_strike - call_premium - put_premium

    return {
        'premium': total_premium,
        'upper_be': upper_be,
        'lower_be': lower_be,
        'max_profit': total_premium,
        'profit_range': upper_be - lower_be,
        'pnl_curve': pnl
    }

# Nifty at 22500, sell 22600 CE and 22400 PE
result = short_strangle(
    spot=22500, call_strike=22600, put_strike=22400,
    call_premium=85, put_premium=90, lot_size=25
)
print(f"Premium collected: Rs {result['premium']:,}")
print(f"Breakevens: {result['lower_be']:.0f} - {result['upper_be']:.0f}")
print(f"Profit range: {result['profit_range']:.0f} points")`}),e.jsx(n,{title:"Weekly Expiry Edge",children:"Nifty weekly options expire every Thursday. Theta decay accelerates from Wednesday afternoon. Selling strangles on Wednesday at 2 PM with strikes 200+ points away captures maximum theta with limited overnight gap risk. Always set stop-loss at 1.5x premium collected."})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"}));function c(){return e.jsxs(a,{title:"Iron Condor & Butterfly Spreads",description:"Defined-risk range-bound strategies on Nifty options.",children:[e.jsx(i,{term:"Iron Condor",children:"Sell an OTM call spread and an OTM put spread simultaneously. Risk is capped at the width of the wider spread minus net premium. Profits when Nifty stays within the short strikes."}),e.jsx(i,{term:"Iron Butterfly",children:"Sell ATM call and put, buy OTM call and put for protection. Tighter profit zone than iron condor but higher premium collected. Best when expecting very low volatility."}),e.jsx(t,{language:"python",title:"Iron Condor on Nifty",children:`import numpy as np

def iron_condor(spot, short_call, long_call, short_put, long_put,
                sc_prem, lc_prem, sp_prem, lp_prem, lots=1):
    """Calculate iron condor metrics for Nifty options."""
    lot_size = 25
    net_credit = (sc_prem - lc_prem + sp_prem - lp_prem) * lot_size * lots

    call_width = (long_call - short_call) * lot_size * lots
    put_width = (short_put - long_put) * lot_size * lots
    max_loss = max(call_width, put_width) - net_credit

    upper_be = short_call + net_credit / (lot_size * lots)
    lower_be = short_put - net_credit / (lot_size * lots)

    return {
        'net_credit': net_credit,
        'max_loss': max_loss,
        'risk_reward': net_credit / max_loss,
        'upper_be': upper_be,
        'lower_be': lower_be,
        'prob_profit': (upper_be - lower_be) / (spot * 0.04)  # rough estimate
    }

# Nifty at 22500
ic = iron_condor(
    spot=22500,
    short_call=22700, long_call=22800,
    short_put=22300, long_put=22200,
    sc_prem=45, lc_prem=20,
    sp_prem=50, lp_prem=22,
    lots=2
)
print(f"Net credit: Rs {ic['net_credit']:,}")
print(f"Max loss: Rs {ic['max_loss']:,}")
print(f"Risk/Reward: {ic['risk_reward']:.2f}")
print(f"Breakevens: {ic['lower_be']:.0f} - {ic['upper_be']:.0f}")`}),e.jsx(n,{title:"Iron Condor Adjustments",children:"If Nifty approaches a short strike, roll that side out by 100 points for a small debit. If both sides are tested, close the position. The best iron condors on Nifty use 100-point wide wings with short strikes at 1-sigma (about 200 points from spot on weekly expiry)."})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs(a,{title:"Calendar & Diagonal Spreads",description:"Trading the term structure of implied volatility on Nifty options.",children:[e.jsx(i,{term:"Calendar Spread",children:"Sell a near-term option and buy the same strike in a later expiry. Profits from faster time decay of the short leg and/or an increase in IV of the long leg. Also called a horizontal or time spread."}),e.jsx(i,{term:"Diagonal Spread",children:"Like a calendar but with different strikes. Sell near-term OTM, buy later-term ATM or slightly OTM. Combines directional bias with time spread characteristics."}),e.jsx(t,{language:"python",title:"Calendar Spread P&L Estimation",children:`from scipy.stats import norm
import numpy as np

def bs_call(S, K, T, r, sigma):
    """Black-Scholes call price."""
    if T <= 0:
        return max(S - K, 0)
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def calendar_spread_pnl(spot, strike, iv_near, iv_far,
                         days_near, days_far, r=0.07):
    """P&L of calendar spread at various spot prices at near expiry."""
    T_near = days_near / 365
    T_far = days_far / 365
    T_far_at_near_exp = (days_far - days_near) / 365

    # Entry cost
    short_entry = bs_call(spot, strike, T_near, r, iv_near)
    long_entry = bs_call(spot, strike, T_far, r, iv_far)
    debit = long_entry - short_entry

    # P&L at near expiry for various spots
    spots = np.arange(spot - 300, spot + 300, 10)
    pnls = []
    for s in spots:
        short_pnl = short_entry - max(s - strike, 0)
        long_val = bs_call(s, strike, T_far_at_near_exp, r, iv_far)
        net = short_pnl + long_val - long_entry
        pnls.append({'spot': s, 'pnl_per_lot': net * 25})

    return pnls, debit * 25

# Nifty calendar: sell weekly 22500 CE, buy monthly 22500 CE
pnls, cost = calendar_spread_pnl(
    spot=22500, strike=22500,
    iv_near=0.14, iv_far=0.15,
    days_near=3, days_far=24
)
print(f"Entry debit per lot: Rs {cost:.0f}")
print(f"Max profit zone: around the strike at near expiry")`}),e.jsx(n,{title:"Calendar Spread on Nifty",children:"The weekly-monthly calendar works best when weekly IV is elevated relative to monthly (sell expensive weekly, buy cheaper monthly). This often occurs before Thursday expiry when weekly options have inflated gamma. Risk is limited to the debit paid."})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs(a,{title:"Gamma Scalping & Delta Hedging",description:"Profiting from realized volatility by dynamically hedging delta.",children:[e.jsx(i,{term:"Gamma Scalping",children:"Buy options (long gamma) and hedge delta with futures. As price moves, gamma creates delta that you scalp by rehedging. Profitable when realized volatility exceeds implied volatility paid."}),e.jsx(t,{language:"python",title:"Delta Hedging Simulation",children:`import numpy as np
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
print(f"Win rate: {sum(1 for p in pnls if p > 0)/len(pnls):.0%}")`}),e.jsx(n,{title:"Gamma Scalping on Nifty",children:"Buy weekly ATM straddle when IV is below 13% (cheap gamma). Hedge delta with Nifty futures every 30-50 point move. The strategy wins on event days (RBI, US CPI) when realized vol exceeds IV by 3%+. Transaction costs from frequent hedging are the main drag."})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs(a,{title:"Multi-Timeframe Analysis",description:"Aligning weekly, daily, and hourly charts for high-conviction swing trades.",children:[e.jsx(i,{term:"Multi-Timeframe Analysis (MTA)",children:"Using higher timeframes to determine trend direction and lower timeframes to find entries. The classic approach: weekly for trend, daily for setup, hourly for entry timing."}),e.jsx(t,{language:"python",title:"Multi-Timeframe Trend Alignment",children:`import pandas as pd
import numpy as np

def multi_tf_signal(weekly, daily, hourly):
    """Generate signals when all three timeframes align."""
    # Weekly trend: 20-week EMA slope
    weekly['ema20'] = weekly['close'].ewm(span=20).mean()
    weekly['weekly_trend'] = np.where(
        weekly['ema20'] > weekly['ema20'].shift(1), 'up', 'down')

    # Daily setup: price pulls back to 20 EMA in uptrend
    daily['ema20'] = daily['close'].ewm(span=20).mean()
    daily['ema50'] = daily['close'].ewm(span=50).mean()
    daily['pullback_long'] = (
        (daily['low'] <= daily['ema20'] * 1.005) &
        (daily['ema20'] > daily['ema50'])
    )
    daily['pullback_short'] = (
        (daily['high'] >= daily['ema20'] * 0.995) &
        (daily['ema20'] < daily['ema50'])
    )

    # Hourly entry: bullish engulfing at daily support
    hourly['body'] = hourly['close'] - hourly['open']
    hourly['prev_body'] = hourly['body'].shift(1)
    hourly['bullish_engulf'] = (
        (hourly['body'] > 0) &
        (hourly['prev_body'] < 0) &
        (hourly['body'] > abs(hourly['prev_body']))
    )

    return weekly, daily, hourly

print("Workflow:")
print("1. Weekly uptrend (EMA20 rising)")
print("2. Daily pullback to EMA20")
print("3. Hourly bullish pattern at support")
print("4. Enter with SL below daily swing low")`}),e.jsx(t,{language:"python",title:"Scoring Timeframe Alignment",children:`def alignment_score(weekly_trend, daily_trend, hourly_trend):
    """Score from -3 to +3 based on alignment."""
    score = 0
    for tf in [weekly_trend, daily_trend, hourly_trend]:
        if tf == 'up':
            score += 1
        elif tf == 'down':
            score -= 1
    return score

# Only take trades when score is +3 (all bullish) or -3 (all bearish)
# Score of +/-2 can work with tighter stops
# Never trade +/-1 or 0 -- conflicting signals`}),e.jsx(n,{title:"Indian Market Timeframes",children:"For Nifty swing trades (3-10 days), use weekly for direction, daily for setup, and 75-minute candles for entry. The 75-minute timeframe divides the NSE session (9:15-15:30) into exactly 5 candles, giving clean intraday structure."})]})}const V=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(a,{title:"Sector Rotation in Indian Markets",description:"Identifying which Nifty sectors are leading and lagging for positional trades.",children:[e.jsx(i,{term:"Sector Rotation",children:"Capital flows between sectors in a cyclical pattern driven by economic cycles, monetary policy, and earnings momentum. In India, key sectors include Banking, IT, Pharma, Auto, FMCG, Metals, and Realty."}),e.jsx(t,{language:"python",title:"Relative Strength Sector Ranking",children:`import pandas as pd
import numpy as np

sectors = {
    'NIFTY_BANK': '^NSEBANK',
    'NIFTY_IT': '^CNXIT',
    'NIFTY_PHARMA': '^CNXPHARMA',
    'NIFTY_AUTO': '^CNXAUTO',
    'NIFTY_METAL': '^CNXMETAL',
    'NIFTY_FMCG': '^CNXFMCG',
    'NIFTY_REALTY': '^CNXREALTY',
}

def rank_sectors(sector_data, lookback=20):
    """Rank sectors by relative performance vs Nifty 50."""
    rankings = {}
    nifty_ret = sector_data['NIFTY50'].pct_change(lookback).iloc[-1]

    for name, col in sector_data.items():
        if name == 'NIFTY50':
            continue
        sector_ret = col.pct_change(lookback).iloc[-1]
        relative_strength = sector_ret - nifty_ret
        momentum = col.pct_change(5).iloc[-1]  # short-term momentum
        rankings[name] = {
            'return_20d': sector_ret,
            'relative_strength': relative_strength,
            'momentum_5d': momentum,
            'score': relative_strength * 0.6 + momentum * 0.4
        }

    ranked = sorted(rankings.items(), key=lambda x: x[1]['score'], reverse=True)
    for i, (name, data) in enumerate(ranked):
        print(f"{i+1}. {name:15s} RS: {data['relative_strength']:+.2%} "
              f"Mom: {data['momentum_5d']:+.2%} Score: {data['score']:+.4f}")

    return ranked

print("Strategy: Go long top 2 sectors, avoid/short bottom 2")
print("Rebalance weekly based on updated rankings")`}),e.jsx(t,{language:"python",title:"RRG (Relative Rotation Graph) Logic",children:`def compute_rrg(sector_vs_nifty, rs_period=10, mom_period=10):
    """Compute RRG quadrant: Leading/Weakening/Lagging/Improving."""
    rs_ratio = sector_vs_nifty.rolling(rs_period).mean()
    rs_momentum = rs_ratio.pct_change(mom_period)

    if rs_ratio.iloc[-1] > 1 and rs_momentum.iloc[-1] > 0:
        return 'Leading'
    elif rs_ratio.iloc[-1] > 1 and rs_momentum.iloc[-1] <= 0:
        return 'Weakening'
    elif rs_ratio.iloc[-1] <= 1 and rs_momentum.iloc[-1] <= 0:
        return 'Lagging'
    else:
        return 'Improving'

# Buy sectors rotating from Improving to Leading
# Exit sectors rotating from Weakening to Lagging`}),e.jsx(n,{title:"Indian Sector Cycles",children:"Banking leads when RBI cuts rates. IT outperforms when INR weakens (export earnings boost). Metals follow global commodity cycles. Watch FII sector-wise allocation data from NSDL for institutional rotation signals. Realty and Auto tend to lead in early recovery phases."})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs(a,{title:"Statistical Pairs Trading",description:"Market-neutral strategy exploiting mean reversion of co-integrated Indian stocks.",children:[e.jsx(i,{term:"Pairs Trading",children:"Simultaneously long one stock and short a correlated stock when their price ratio deviates from the historical mean. Profits from convergence back to the mean, regardless of market direction."}),e.jsx(t,{language:"python",title:"Cointegration-Based Pairs Trading",children:`import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import coint, adfuller

def find_cointegrated_pairs(prices, significance=0.05):
    """Find cointegrated stock pairs from a price matrix."""
    n = prices.shape[1]
    pairs = []

    for i in range(n):
        for j in range(i+1, n):
            score, pvalue, _ = coint(prices.iloc[:, i], prices.iloc[:, j])
            if pvalue < significance:
                pairs.append({
                    'stock_a': prices.columns[i],
                    'stock_b': prices.columns[j],
                    'p_value': pvalue
                })

    return sorted(pairs, key=lambda x: x['p_value'])

def pairs_strategy(price_a, price_b, window=20, entry_z=2.0, exit_z=0.5):
    """Generate pairs trading signals using z-score of spread."""
    # Hedge ratio via OLS
    hedge_ratio = np.polyfit(price_b, price_a, 1)[0]
    spread = price_a - hedge_ratio * price_b

    spread_mean = spread.rolling(window).mean()
    spread_std = spread.rolling(window).std()
    z_score = (spread - spread_mean) / spread_std

    signals = pd.DataFrame(index=price_a.index)
    signals['z_score'] = z_score
    signals['long_entry'] = z_score < -entry_z   # spread too low
    signals['short_entry'] = z_score > entry_z    # spread too high
    signals['exit'] = abs(z_score) < exit_z       # mean reversion

    return signals, hedge_ratio

# Example: HDFC Bank vs ICICI Bank
print("Classic Indian pairs: HDFCBANK/ICICIBANK, TCS/INFY, SBIN/PNB")
print("Entry at z=2.0, exit at z=0.5, stop at z=3.5")`}),e.jsx(n,{title:"Indian Market Pairs Tips",children:"Use F&O stocks only (for shorting via futures). HDFCBANK/ICICIBANK and TCS/INFY have shown strong cointegration historically. Retest cointegration monthly -- regime changes (mergers, regulatory shifts) can break the relationship. Average holding period is 5-15 days."})]})}const W=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs(a,{title:"Event-Driven Trading",description:"Strategies around earnings, RBI policy, budget, and elections in India.",children:[e.jsx(i,{term:"Event-Driven Strategy",children:"Trading around scheduled events that cause volatility expansion. The edge comes from correctly positioning before the event or trading the post-event price adjustment."}),e.jsx(t,{language:"python",title:"Earnings Straddle Strategy",children:`import numpy as np
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
print(f"Breakeven move needed: {result['breakeven_move_pct']:.1f}%")`}),e.jsx(t,{language:"python",title:"RBI Policy Day Framework",children:`rbi_events = {
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
print("Key: position before 9:30 AM, most move happens by 10:15 AM")`}),e.jsx(n,{title:"Election Trading",children:"State and general election results cause 3-5% Nifty moves. Buy straddles 2-3 days before counting day when IV is still affordable. The 2024 general election saw a 1400-point Nifty swing on result day. Position size should be halved for election event trades."})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs(a,{title:"Crypto Futures Basis Trading",description:"Exploiting the premium between spot and futures on Delta Exchange.",children:[e.jsx(i,{term:"Basis",children:"The difference between the futures price and the spot price. In crypto, futures often trade at a premium (contango) due to bullish sentiment and funding costs. Basis trading captures this premium market-neutrally."}),e.jsx(t,{language:"python",title:"Basis Trading Strategy on Delta Exchange",children:`import pandas as pd
import numpy as np

def calculate_basis(spot_price, futures_price, days_to_expiry):
    """Calculate annualized basis for crypto futures."""
    raw_basis = futures_price - spot_price
    basis_pct = (raw_basis / spot_price) * 100
    annualized = basis_pct * (365 / max(days_to_expiry, 1))
    return {
        'raw_basis': raw_basis,
        'basis_pct': basis_pct,
        'annualized_pct': annualized
    }

def basis_trade_signal(basis_history, entry_threshold=15,
                       exit_threshold=3):
    """Signal when annualized basis exceeds threshold."""
    signals = []
    for i, row in basis_history.iterrows():
        if row['annualized_pct'] > entry_threshold:
            signals.append({
                'time': row['time'],
                'action': 'enter',
                'strategy': 'sell_futures_buy_spot',
                'basis': row['annualized_pct']
            })
        elif row['annualized_pct'] < exit_threshold:
            signals.append({
                'time': row['time'],
                'action': 'exit',
                'basis': row['annualized_pct']
            })
    return signals

# Example: BTC quarterly futures on Delta Exchange
basis = calculate_basis(
    spot_price=67500, futures_price=69200, days_to_expiry=45
)
print(f"Raw basis: \${basis['raw_basis']:,.0f}")
print(f"Basis: {basis['basis_pct']:.2f}%")
print(f"Annualized: {basis['annualized_pct']:.1f}%")`}),e.jsx(t,{language:"python",title:"Delta Exchange Basis Monitor",children:`class BasisMonitor:
    def __init__(self, threshold=15):
        self.threshold = threshold
        self.positions = {}

    def check(self, symbol, spot, futures, days_exp):
        b = calculate_basis(spot, futures, days_exp)
        if b['annualized_pct'] > self.threshold and symbol not in self.positions:
            self.positions[symbol] = b
            print(f"TRADE: Short {symbol} futures, long spot "
                  f"@ {b['annualized_pct']:.1f}% annualized")
        return b

monitor = BasisMonitor(threshold=12)
monitor.check('BTCUSD', 67500, 69200, 45)
monitor.check('ETHUSD', 3500, 3580, 45)`}),e.jsx(n,{title:"Basis Trading Risks",children:"Crypto basis can widen before converging, causing mark-to-market losses on the short futures leg. Ensure sufficient margin (3x the basis) to avoid liquidation. Delta Exchange quarterly futures settle to TWAP of spot index, ensuring eventual convergence."})]})}const G=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs(a,{title:"Perpetual Funding Rate Arbitrage",description:"Capturing funding rate payments on Delta Exchange perpetual contracts.",children:[e.jsx(i,{term:"Funding Rate",children:"A periodic payment between longs and shorts on perpetual futures to keep the perp price anchored to spot. When positive, longs pay shorts. On Delta Exchange, funding settles every 8 hours."}),e.jsx(t,{language:"python",title:"Funding Rate Arbitrage Strategy",children:`import numpy as np
import pandas as pd

def funding_arb_pnl(funding_rates, position_size_usd, days=30):
    """Calculate P&L from funding rate arbitrage."""
    # Strategy: short perp (collect positive funding) + long spot
    daily_rates = []
    for rate in funding_rates:  # 8-hourly rates
        daily_rates.append(rate)

    total_funding = sum(daily_rates[:days * 3])  # 3 funding periods/day
    funding_pnl = total_funding * position_size_usd

    # Trading costs
    entry_cost = position_size_usd * 0.001 * 2  # 0.1% maker each side
    slippage = position_size_usd * 0.0005 * 2

    net_pnl = funding_pnl - entry_cost - slippage
    annualized_return = (net_pnl / position_size_usd) * (365 / days) * 100

    return {
        'funding_pnl': funding_pnl,
        'costs': entry_cost + slippage,
        'net_pnl': net_pnl,
        'annualized_return': annualized_return
    }

# BTC perp on Delta with avg 0.03% funding rate (8h)
np.random.seed(42)
funding_rates = np.random.normal(0.0003, 0.0001, 90)  # 30 days * 3

result = funding_arb_pnl(funding_rates, position_size_usd=10000, days=30)
print(f"Funding collected: \${result['funding_pnl']:.2f}")
print(f"Costs: \${result['costs']:.2f}")
print(f"Net P&L: \${result['net_pnl']:.2f}")
print(f"Annualized: {result['annualized_return']:.1f}%")`}),e.jsx(t,{language:"python",title:"Multi-Asset Funding Scanner",children:`def scan_funding_opportunities(assets):
    """Find best funding rate arb across Delta Exchange assets."""
    opportunities = []
    for asset in assets:
        avg_rate = np.mean(asset['funding_history'][-21:])  # 7-day avg
        if avg_rate > 0.0002:  # Min 0.02% per 8h
            annualized = avg_rate * 3 * 365 * 100
            opportunities.append({
                'symbol': asset['symbol'],
                'avg_8h_rate': avg_rate * 100,
                'annualized': annualized,
                'direction': 'short_perp_long_spot'
            })
    return sorted(opportunities, key=lambda x: x['annualized'], reverse=True)`}),e.jsx(n,{title:"Funding Rate Risks",children:"Funding can flip negative during market crashes, causing the short perp to pay instead of receive. Monitor funding rate trend -- exit when the 7-day average drops below 0.01%. Also account for spot hedge slippage during volatile periods."})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs(a,{title:"Options Volatility Strategies on Delta",description:"Trading crypto implied volatility using Delta Exchange options.",children:[e.jsx(i,{term:"Volatility Trading",children:"Instead of betting on price direction, trade the level of implied volatility itself. Buy options when IV is cheap relative to expected realized vol, sell when IV is rich. Delta Exchange offers BTC and ETH options for this purpose."}),e.jsx(t,{language:"python",title:"IV Percentile Strategy",children:`import numpy as np
import pandas as pd

def iv_percentile(iv_history, current_iv, lookback=365):
    """Calculate IV percentile for trade decisions."""
    recent = iv_history[-lookback:]
    percentile = (np.sum(recent < current_iv) / len(recent)) * 100
    return percentile

def vol_strategy_signal(iv_percentile, iv_current, rv_30d):
    """Generate vol strategy signals."""
    iv_rv_spread = iv_current - rv_30d

    if iv_percentile < 20:
        # IV is cheap -> buy vol
        return {
            'signal': 'buy_straddle',
            'reason': f'IV at {iv_percentile:.0f}th percentile',
            'edge': f'IV-RV spread: {iv_rv_spread:.1f}%'
        }
    elif iv_percentile > 80:
        # IV is rich -> sell vol
        return {
            'signal': 'sell_strangle',
            'reason': f'IV at {iv_percentile:.0f}th percentile',
            'edge': f'IV-RV spread: {iv_rv_spread:.1f}%'
        }
    else:
        return {'signal': 'no_trade', 'reason': 'IV in neutral zone'}

# BTC options on Delta Exchange
np.random.seed(42)
iv_history = np.random.uniform(40, 120, 365)  # BTC IV range
current_iv = 45  # Currently low

pct = iv_percentile(iv_history, current_iv)
signal = vol_strategy_signal(pct, current_iv, rv_30d=55)
print(f"IV Percentile: {pct:.0f}")
print(f"Signal: {signal['signal']}")
print(f"Reason: {signal['reason']}")`}),e.jsx(t,{language:"python",title:"Volatility Term Structure Trade",children:`def vol_term_structure_trade(near_iv, far_iv):
    """Trade IV term structure on Delta Exchange options."""
    ratio = near_iv / far_iv

    if ratio > 1.3:  # Inverted: near IV >> far IV
        return {
            'trade': 'sell_near_buy_far',
            'reason': 'Term structure inverted, sell panic premium',
            'ratio': ratio
        }
    elif ratio < 0.8:  # Steep contango
        return {
            'trade': 'buy_near_sell_far',
            'reason': 'Term structure steep, near options underpriced',
            'ratio': ratio
        }
    return {'trade': 'none', 'ratio': ratio}

# BTC: 7-day IV vs 30-day IV
print(vol_term_structure_trade(near_iv=75, far_iv=55))  # inverted`}),e.jsx(n,{title:"Crypto Vol Characteristics",children:"Crypto IV is typically 2-4x equity IV. BTC options on Delta Exchange have American-style exercise. IV tends to spike on Bitcoin halving events, ETF decisions, and major exchange incidents. Selling vol above the 80th percentile has historically been profitable."})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs(a,{title:"Cross-Exchange Arbitrage",description:"Exploiting price discrepancies between Delta Exchange and other venues.",children:[e.jsx(i,{term:"Cross-Exchange Arbitrage",children:"Simultaneously buying on one exchange and selling on another when the same asset trades at different prices. In crypto, price discrepancies arise from liquidity fragmentation, withdrawal delays, and regional demand differences."}),e.jsx(t,{language:"python",title:"Cross-Exchange Price Monitor",children:`import numpy as np
import time

class CrossExchangeArb:
    def __init__(self, min_spread_pct=0.15, fees=0.001):
        self.min_spread = min_spread_pct / 100
        self.fees = fees  # Round-trip fees per exchange

    def check_opportunity(self, prices):
        """Check for arb across multiple exchanges."""
        exchanges = list(prices.keys())
        opps = []

        for i, ex_a in enumerate(exchanges):
            for ex_b in exchanges[i+1:]:
                bid_a, ask_a = prices[ex_a]['bid'], prices[ex_a]['ask']
                bid_b, ask_b = prices[ex_b]['bid'], prices[ex_b]['ask']

                # Buy on A, sell on B
                spread_ab = (bid_b - ask_a) / ask_a
                # Buy on B, sell on A
                spread_ba = (bid_a - ask_b) / ask_b

                total_fees = self.fees * 2  # Both exchanges

                if spread_ab > total_fees + self.min_spread:
                    opps.append({
                        'buy': ex_a, 'sell': ex_b,
                        'spread': spread_ab * 100,
                        'net_profit': (spread_ab - total_fees) * 100
                    })
                if spread_ba > total_fees + self.min_spread:
                    opps.append({
                        'buy': ex_b, 'sell': ex_a,
                        'spread': spread_ba * 100,
                        'net_profit': (spread_ba - total_fees) * 100
                    })

        return opps

arb = CrossExchangeArb(min_spread_pct=0.10)
prices = {
    'Delta': {'bid': 67480, 'ask': 67520},
    'Binance': {'bid': 67550, 'ask': 67570},
    'OKX': {'bid': 67500, 'ask': 67530},
}
opps = arb.check_opportunity(prices)
for opp in opps:
    print(f"Buy {opp['buy']} -> Sell {opp['sell']}: "
          f"{opp['spread']:.3f}% (net {opp['net_profit']:.3f}%)")`}),e.jsx(t,{language:"python",title:"Funding Rate Cross-Exchange Arb",children:`def funding_rate_arb(exchange_rates):
    """Arb funding rates: long on low-rate exchange, short on high."""
    sorted_rates = sorted(exchange_rates.items(), key=lambda x: x[1])
    lowest = sorted_rates[0]
    highest = sorted_rates[-1]
    spread = highest[1] - lowest[1]

    if spread > 0.02:  # 0.02% minimum spread
        return {
            'long_on': lowest[0],
            'short_on': highest[0],
            'spread_pct': spread,
            'annualized': spread * 3 * 365  # 3x daily
        }
    return None

rates = {'Delta': 0.035, 'Binance': 0.010, 'OKX': 0.025}
print(funding_rate_arb(rates))`}),e.jsx(n,{title:"Execution Challenges",children:"Cross-exchange arb requires pre-funded accounts on both exchanges. Latency matters -- Delta Exchange API responds in ~50ms. Account for withdrawal times (BTC: 30-60 min) when sizing positions. The Indian INR premium on local exchanges creates additional arb opportunities vs international USD-based exchanges."})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function w(){return e.jsxs(a,{title:"Technical, Fundamental & Sentiment Analyst Agents",description:"Building specialized AI agents that analyze markets from different perspectives.",children:[e.jsx(i,{term:"Analyst Agent",children:"An AI agent specialized in one analysis domain. Each agent independently evaluates a trading opportunity and provides a structured opinion with conviction level, which is then aggregated for final decisions."}),e.jsx(t,{language:"python",title:"Analyst Agent Framework",children:`from dataclasses import dataclass
from enum import Enum

class Conviction(Enum):
    STRONG_BULL = 2
    BULL = 1
    NEUTRAL = 0
    BEAR = -1
    STRONG_BEAR = -2

@dataclass
class AgentOpinion:
    agent: str
    conviction: Conviction
    reasoning: str
    confidence: float  # 0 to 1

class TechnicalAgent:
    def analyze(self, candles, indicators):
        signals = []
        if indicators['ema_20'] > indicators['ema_50']:
            signals.append('bullish_ema_cross')
        if indicators['rsi'] < 30:
            signals.append('oversold')
        elif indicators['rsi'] > 70:
            signals.append('overbought')
        if indicators['macd_hist'] > 0:
            signals.append('bullish_macd')

        bull_count = sum(1 for s in signals if 'bullish' in s or 'oversold' in s)
        bear_count = sum(1 for s in signals if 'bearish' in s or 'overbought' in s)

        if bull_count >= 2:
            conv = Conviction.BULL
        elif bear_count >= 2:
            conv = Conviction.BEAR
        else:
            conv = Conviction.NEUTRAL

        return AgentOpinion(
            agent='Technical',
            conviction=conv,
            reasoning=f"Signals: {', '.join(signals)}",
            confidence=0.7
        )

class FundamentalAgent:
    def analyze(self, financials):
        score = 0
        if financials.get('pe_ratio', 25) < 20:
            score += 1
        if financials.get('roe', 10) > 15:
            score += 1
        if financials.get('debt_equity', 1) < 0.5:
            score += 1
        if financials.get('earnings_growth', 0) > 15:
            score += 1

        conv = Conviction.BULL if score >= 3 else                Conviction.BEAR if score <= 1 else Conviction.NEUTRAL

        return AgentOpinion(
            agent='Fundamental', conviction=conv,
            reasoning=f"Score: {score}/4", confidence=0.6
        )

class SentimentAgent:
    def analyze(self, news_sentiment, fii_data, options_pcr):
        factors = []
        if news_sentiment > 0.3:
            factors.append('positive_news')
        if fii_data.get('net_buy', 0) > 1000:
            factors.append('fii_buying')
        if options_pcr > 1.2:
            factors.append('bullish_pcr')

        conv = Conviction.BULL if len(factors) >= 2 else Conviction.NEUTRAL
        return AgentOpinion(
            agent='Sentiment', conviction=conv,
            reasoning=f"Factors: {factors}", confidence=0.5
        )`}),e.jsx(n,{title:"Agent Design Principle",children:"Each agent should be independently testable and have a clear domain boundary. The technical agent never looks at fundamentals, and vice versa. This separation prevents overfitting and allows you to measure each agent's predictive contribution independently."})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(a,{title:"Bull/Bear Debate Framework",description:"Structured adversarial analysis for higher-quality trade decisions.",children:[e.jsx(i,{term:"Bull/Bear Debate",children:"Two agents argue opposing sides of a trade. The bull presents the case for going long, the bear argues for short/avoid. A judge agent evaluates both arguments and makes the final call. This reduces confirmation bias."}),e.jsx(t,{language:"python",title:"Debate Framework Implementation",children:`from dataclasses import dataclass, field

@dataclass
class Argument:
    side: str
    points: list
    evidence: list
    conviction: float

@dataclass
class DebateResult:
    winner: str
    score: float
    summary: str
    trade_recommendation: str

class BullAgent:
    def argue(self, data):
        points = []
        evidence = []

        if data.get('trend') == 'up':
            points.append("Primary trend is bullish")
            evidence.append(f"Price above 200 EMA: {data.get('price_vs_200ema')}")
        if data.get('fii_buying', False):
            points.append("Institutional support via FII buying")
            evidence.append(f"FII net: Rs {data.get('fii_net_cr', 0):,} Cr")
        if data.get('rsi', 50) < 40:
            points.append("RSI showing oversold -- bounce opportunity")
        if data.get('support_nearby', False):
            points.append("Strong support zone nearby limits downside")

        conviction = min(len(points) / 4, 1.0)
        return Argument('bull', points, evidence, conviction)

class BearAgent:
    def argue(self, data):
        points = []
        evidence = []

        if data.get('iv_rising', False):
            points.append("Rising IV signals increasing uncertainty")
        if data.get('volume_declining', False):
            points.append("Declining volume on rallies -- weak hands")
        if data.get('global_risk') == 'high':
            points.append("Global risk-off environment")
            evidence.append(f"VIX: {data.get('vix', 'N/A')}")
        if data.get('resistance_nearby', False):
            points.append("Approaching strong resistance zone")

        conviction = min(len(points) / 4, 1.0)
        return Argument('bear', points, evidence, conviction)

class JudgeAgent:
    def evaluate(self, bull_arg, bear_arg):
        bull_score = bull_arg.conviction * len(bull_arg.points)
        bear_score = bear_arg.conviction * len(bear_arg.points)
        net = bull_score - bear_score

        if net > 1.0:
            return DebateResult('bull', net, 'Strong bull case',
                               'BUY with full position')
        elif net > 0.3:
            return DebateResult('bull', net, 'Marginal bull edge',
                               'BUY with half position')
        elif net < -1.0:
            return DebateResult('bear', net, 'Strong bear case',
                               'SHORT or AVOID')
        elif net < -0.3:
            return DebateResult('bear', net, 'Marginal bear edge',
                               'REDUCE or hedge')
        else:
            return DebateResult('neutral', net, 'No clear edge',
                               'WAIT for clarity')

# Run debate on Nifty
data = {'trend': 'up', 'fii_buying': True, 'fii_net_cr': 2500,
        'rsi': 55, 'iv_rising': True, 'global_risk': 'medium',
        'resistance_nearby': True, 'volume_declining': False}

result = JudgeAgent().evaluate(BullAgent().argue(data), BearAgent().argue(data))
print(f"Winner: {result.winner} | Recommendation: {result.trade_recommendation}")`}),e.jsx(n,{title:"Debate Reduces Bias",children:"Without the bear agent, traders tend to only see bullish signals. The structured debate forces both sides to present evidence. Log every debate outcome and actual result to calibrate agent weights over time."})]})}const X=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs(a,{title:"Risk Management Agents",description:"Agents with different risk appetites that size positions and set stops.",children:[e.jsx(i,{term:"Risk Agent",children:"An agent that determines position sizing, stop-loss, and take-profit levels based on its risk personality. Running multiple risk agents in parallel gives a range of position sizes from which the portfolio manager selects."}),e.jsx(t,{language:"python",title:"Risk Agent Implementations",children:`from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class RiskParams:
    position_pct: float     # % of capital to deploy
    stop_loss_pct: float    # SL as % from entry
    take_profit_pct: float  # TP as % from entry
    max_drawdown_pct: float # Kill switch threshold
    risk_per_trade_pct: float

class RiskAgent(ABC):
    @abstractmethod
    def calculate(self, capital, entry_price, volatility, conviction):
        pass

class AggressiveAgent(RiskAgent):
    def calculate(self, capital, entry_price, volatility, conviction):
        risk_pct = min(3.0 * conviction, 5.0)
        sl = volatility * 1.5
        tp = volatility * 4.0

        position_value = (capital * risk_pct / 100) / (sl / 100)
        position_pct = (position_value / capital) * 100

        return RiskParams(
            position_pct=min(position_pct, 30),
            stop_loss_pct=sl,
            take_profit_pct=tp,
            max_drawdown_pct=15,
            risk_per_trade_pct=risk_pct
        )

class ConservativeAgent(RiskAgent):
    def calculate(self, capital, entry_price, volatility, conviction):
        risk_pct = min(0.5 * conviction, 1.0)
        sl = volatility * 2.5
        tp = volatility * 3.0

        position_value = (capital * risk_pct / 100) / (sl / 100)
        position_pct = (position_value / capital) * 100

        return RiskParams(
            position_pct=min(position_pct, 10),
            stop_loss_pct=sl,
            take_profit_pct=tp,
            max_drawdown_pct=5,
            risk_per_trade_pct=risk_pct
        )

class NeutralAgent(RiskAgent):
    def calculate(self, capital, entry_price, volatility, conviction):
        risk_pct = min(1.5 * conviction, 2.5)
        sl = volatility * 2.0
        tp = volatility * 3.5

        position_value = (capital * risk_pct / 100) / (sl / 100)
        position_pct = (position_value / capital) * 100

        return RiskParams(
            position_pct=min(position_pct, 20),
            stop_loss_pct=sl,
            take_profit_pct=tp,
            max_drawdown_pct=10,
            risk_per_trade_pct=risk_pct
        )

# Compare all three agents
capital = 1_000_000  # Rs 10 lakh
for Agent, name in [(AggressiveAgent, 'Aggressive'),
                     (ConservativeAgent, 'Conservative'),
                     (NeutralAgent, 'Neutral')]:
    params = Agent().calculate(capital, 22500, volatility=1.2, conviction=0.8)
    print(f"{name:15s} | Position: {params.position_pct:.1f}% "
          f"SL: {params.stop_loss_pct:.1f}% TP: {params.take_profit_pct:.1f}%")`}),e.jsx(n,{title:"Selecting the Right Risk Agent",children:"Use the conservative agent during high-VIX environments and earnings seasons. Switch to aggressive only when conviction is high and multiple analyst agents agree. The neutral agent is the default for most trades on Nifty futures."})]})}const $=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function S(){return e.jsxs(a,{title:"Portfolio Manager Agent",description:"The final decision-maker that aggregates all agent inputs and approves trades.",children:[e.jsx(i,{term:"Portfolio Manager Agent",children:"The top-level agent that receives opinions from analyst agents, risk parameters from risk agents, and debate outcomes. It makes the final go/no-go decision considering portfolio-level constraints like correlation, exposure limits, and drawdown state."}),e.jsx(t,{language:"python",title:"Portfolio Manager Agent",children:`from dataclasses import dataclass

@dataclass
class TradeProposal:
    symbol: str
    direction: str
    analyst_score: float   # -2 to +2
    risk_params: dict
    debate_winner: str

@dataclass
class TradeDecision:
    approved: bool
    symbol: str
    direction: str
    size_pct: float
    stop_loss: float
    take_profit: float
    reason: str

class PortfolioManagerAgent:
    def __init__(self, max_positions=5, max_exposure_pct=60,
                 max_correlation=0.7, drawdown_limit=10):
        self.max_positions = max_positions
        self.max_exposure = max_exposure_pct
        self.max_corr = max_correlation
        self.drawdown_limit = drawdown_limit
        self.positions = []

    def evaluate(self, proposal, portfolio_state):
        """Final approval decision for a trade."""
        reasons = []

        # Check position limit
        if len(self.positions) >= self.max_positions:
            return TradeDecision(False, proposal.symbol, proposal.direction,
                                0, 0, 0, "Max positions reached")

        # Check exposure limit
        current_exposure = portfolio_state.get('total_exposure_pct', 0)
        if current_exposure + proposal.risk_params['position_pct'] > self.max_exposure:
            reasons.append("Exposure limit would be exceeded")

        # Check drawdown state
        current_dd = portfolio_state.get('current_drawdown_pct', 0)
        if current_dd > self.drawdown_limit * 0.7:
            # Reduce size during drawdown
            size_mult = 0.5
            reasons.append("Reduced size: in drawdown")
        else:
            size_mult = 1.0

        # Check correlation with existing positions
        for pos in self.positions:
            corr = portfolio_state.get('correlations', {}).get(
                (pos['symbol'], proposal.symbol), 0)
            if abs(corr) > self.max_corr:
                reasons.append(f"High correlation with {pos['symbol']}")

        # Minimum conviction threshold
        if abs(proposal.analyst_score) < 0.5:
            return TradeDecision(False, proposal.symbol, proposal.direction,
                                0, 0, 0, "Conviction too low")

        # Approve with adjusted size
        size = proposal.risk_params['position_pct'] * size_mult
        return TradeDecision(
            approved=True,
            symbol=proposal.symbol,
            direction=proposal.direction,
            size_pct=size,
            stop_loss=proposal.risk_params['stop_loss_pct'],
            take_profit=proposal.risk_params['take_profit_pct'],
            reason='; '.join(reasons) if reasons else 'All checks passed'
        )

pm = PortfolioManagerAgent()
proposal = TradeProposal('NIFTY', 'long', 1.5,
                         {'position_pct': 15, 'stop_loss_pct': 1.2,
                          'take_profit_pct': 3.5}, 'bull')
decision = pm.evaluate(proposal, {'total_exposure_pct': 20,
                                   'current_drawdown_pct': 3})
print(f"Approved: {decision.approved} | Size: {decision.size_pct}%")
print(f"Reason: {decision.reason}")`}),e.jsx(n,{title:"PM Agent Best Practices",children:"The PM agent should be the most conservative filter. Even with strong analyst conviction, reject trades that violate portfolio constraints. Log every decision (approved and rejected) to build a track record for agent performance evaluation."})]})}const J=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));function A(){return e.jsxs(a,{title:"Signal Scoring & Aggregation",description:"Combining multiple strategy signals into a single actionable score.",children:[e.jsx(i,{term:"Signal Aggregation",children:"Combining outputs from multiple trading strategies into a composite score. Each strategy contributes a signal (-1 to +1) weighted by its historical accuracy. The aggregate determines position direction and size."}),e.jsx(t,{language:"python",title:"Weighted Signal Aggregator",children:`import numpy as np
from dataclasses import dataclass

@dataclass
class StrategySignal:
    name: str
    signal: float      # -1 (strong sell) to +1 (strong buy)
    confidence: float  # 0 to 1
    weight: float      # Based on historical performance

class SignalAggregator:
    def __init__(self, min_score=0.3, min_strategies=3):
        self.min_score = min_score
        self.min_strategies = min_strategies

    def aggregate(self, signals):
        """Weighted average of strategy signals."""
        if len(signals) < self.min_strategies:
            return {'score': 0, 'action': 'WAIT',
                    'reason': 'Insufficient signals'}

        weighted_sum = sum(
            s.signal * s.confidence * s.weight for s in signals)
        total_weight = sum(s.confidence * s.weight for s in signals)
        score = weighted_sum / max(total_weight, 0.01)

        # Agreement metric: how many strategies agree
        bull = sum(1 for s in signals if s.signal > 0)
        bear = sum(1 for s in signals if s.signal < 0)
        agreement = max(bull, bear) / len(signals)

        if abs(score) < self.min_score:
            action = 'WAIT'
        elif score > 0:
            action = 'BUY' if agreement > 0.6 else 'WEAK_BUY'
        else:
            action = 'SELL' if agreement > 0.6 else 'WEAK_SELL'

        return {
            'score': score,
            'action': action,
            'agreement': agreement,
            'bull_count': bull,
            'bear_count': bear
        }

agg = SignalAggregator()
signals = [
    StrategySignal('ORB', 0.8, 0.7, 1.2),
    StrategySignal('VWAP_Rev', -0.3, 0.5, 1.0),
    StrategySignal('Order_Flow', 0.6, 0.8, 1.5),
    StrategySignal('Momentum', 0.9, 0.6, 1.1),
    StrategySignal('Pairs', 0.0, 0.4, 0.8),
]

result = agg.aggregate(signals)
print(f"Score: {result['score']:+.3f} | Action: {result['action']}")
print(f"Agreement: {result['agreement']:.0%} "
      f"({result['bull_count']}B / {result['bear_count']}S)")`}),e.jsx(n,{title:"Weight Calibration",children:"Update strategy weights monthly using rolling Sharpe ratio of each strategy's standalone performance. A strategy that has been flat for 30 days should have its weight reduced by 50% until it recovers. Never let any single strategy exceed 30% of total weight."})]})}const Q=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));function T(){return e.jsxs(a,{title:"Market Regime Detection",description:"Identifying trending, mean-reverting, and volatile regimes for strategy switching.",children:[e.jsx(i,{term:"Market Regime",children:"A persistent market state characterized by specific statistical properties: trend strength, volatility level, and mean-reversion tendency. Different strategies perform best in different regimes."}),e.jsx(t,{language:"python",title:"HMM-Based Regime Detection",children:`import numpy as np
import pandas as pd

class SimpleRegimeDetector:
    """Detect market regimes using volatility and trend metrics."""

    def __init__(self, vol_lookback=20, trend_lookback=50):
        self.vol_lb = vol_lookback
        self.trend_lb = trend_lookback

    def detect(self, prices):
        df = pd.DataFrame({'price': prices})
        returns = df['price'].pct_change()

        # Volatility regime
        vol = returns.rolling(self.vol_lb).std() * np.sqrt(252) * 100
        vol_median = vol.rolling(100).median()
        df['high_vol'] = vol > vol_median * 1.3

        # Trend regime (ADX proxy)
        df['ema_fast'] = df['price'].ewm(span=10).mean()
        df['ema_slow'] = df['price'].ewm(span=self.trend_lb).mean()
        df['trend_strength'] = abs(df['ema_fast'] - df['ema_slow']) / df['ema_slow']

        # Classify regime
        df['regime'] = 'unknown'
        df.loc[
            (df['trend_strength'] > 0.02) & ~df['high_vol'],
            'regime'] = 'trending'
        df.loc[
            (df['trend_strength'] <= 0.02) & ~df['high_vol'],
            'regime'] = 'mean_reverting'
        df.loc[df['high_vol'], 'regime'] = 'volatile'

        return df['regime']

    def strategy_map(self, regime):
        """Map regime to optimal strategy mix."""
        strategies = {
            'trending': {
                'momentum': 0.4, 'breakout': 0.3,
                'order_flow': 0.2, 'mean_reversion': 0.1},
            'mean_reverting': {
                'mean_reversion': 0.4, 'options_selling': 0.3,
                'pairs': 0.2, 'momentum': 0.1},
            'volatile': {
                'options_buying': 0.3, 'reduce_size': 0.3,
                'hedged': 0.3, 'momentum': 0.1},
        }
        return strategies.get(regime, strategies['mean_reverting'])

detector = SimpleRegimeDetector()
np.random.seed(42)
prices = 22000 + np.cumsum(np.random.normal(0.5, 20, 250))
regimes = detector.detect(prices)
current = regimes.iloc[-1]
print(f"Current regime: {current}")
print(f"Strategy mix: {detector.strategy_map(current)}")`}),e.jsx(n,{title:"Regime in Indian Markets",children:"Nifty typically spends 30% of time in trending regimes, 50% in mean-reverting, and 20% in volatile regimes. Regime transitions cluster around budget week, RBI policy, and global risk events. Detecting the transition early (within 2-3 days) is more valuable than identifying the regime itself."})]})}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs(a,{title:"Portfolio-Level Risk Allocation",description:"Distributing capital across strategies using risk budgeting techniques.",children:[e.jsx(i,{term:"Risk Budgeting",children:"Allocating capital based on each strategy's risk contribution rather than fixed dollar amounts. Strategies with lower volatility and higher Sharpe receive larger allocations. Ensures no single strategy dominates portfolio risk."}),e.jsx(t,{language:"python",title:"Risk Parity Allocation Across Strategies",children:`import numpy as np
import pandas as pd

def risk_parity_allocation(strategy_returns):
    """Allocate inversely proportional to volatility."""
    vols = strategy_returns.std() * np.sqrt(252)
    inv_vol = 1 / vols
    weights = inv_vol / inv_vol.sum()
    return weights

def sharpe_weighted_allocation(strategy_returns, rf=0.07):
    """Allocate proportional to Sharpe ratio."""
    excess = strategy_returns.mean() * 252 - rf
    vols = strategy_returns.std() * np.sqrt(252)
    sharpes = excess / vols
    sharpes = sharpes.clip(lower=0)  # No allocation to negative Sharpe

    if sharpes.sum() == 0:
        return pd.Series(1/len(sharpes), index=sharpes.index)
    return sharpes / sharpes.sum()

# Simulated strategy returns
np.random.seed(42)
strategies = pd.DataFrame({
    'ORB': np.random.normal(0.001, 0.015, 252),
    'VWAP_Rev': np.random.normal(0.0008, 0.008, 252),
    'Options_Sell': np.random.normal(0.0012, 0.010, 252),
    'Pairs': np.random.normal(0.0005, 0.006, 252),
    'Momentum': np.random.normal(0.0015, 0.020, 252),
})

rp_weights = risk_parity_allocation(strategies)
sw_weights = sharpe_weighted_allocation(strategies)

print("Risk Parity Weights:")
for s, w in rp_weights.items():
    print(f"  {s:15s}: {w:.1%}")
print("\\nSharpe-Weighted:")
for s, w in sw_weights.items():
    print(f"  {s:15s}: {w:.1%}")`}),e.jsx(t,{language:"python",title:"Dynamic Rebalancing with Kelly",children:`def kelly_fraction(win_rate, avg_win, avg_loss):
    """Kelly criterion for optimal bet size."""
    if avg_loss == 0:
        return 0
    b = avg_win / avg_loss  # Win/loss ratio
    f = (b * win_rate - (1 - win_rate)) / b
    return max(0, f * 0.5)  # Half-Kelly for safety

# Per-strategy Kelly sizing
stats = {
    'ORB':         {'wr': 0.52, 'avg_w': 25, 'avg_l': 15},
    'VWAP_Rev':    {'wr': 0.60, 'avg_w': 12, 'avg_l': 10},
    'Options_Sell': {'wr': 0.70, 'avg_w': 8, 'avg_l': 20},
}
for name, s in stats.items():
    k = kelly_fraction(s['wr'], s['avg_w'], s['avg_l'])
    print(f"{name}: Kelly = {k:.1%} of capital")`}),e.jsx(n,{title:"Rebalancing Frequency",children:"Rebalance strategy weights weekly on Sunday (for crypto) or Saturday (for Indian equity strategies). More frequent rebalancing increases costs. Less frequent misses regime changes. Weekly is the sweet spot for a portfolio running 3-5 active strategies."})]})}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function R(){return e.jsxs(a,{title:"Drawdown Management & Recovery",description:"Systematic approaches to managing losing streaks and portfolio drawdowns.",children:[e.jsx(i,{term:"Drawdown",children:"The peak-to-trough decline in portfolio value before a new high is reached. Maximum drawdown is the single most important risk metric for active traders. A 50% drawdown requires a 100% gain to recover."}),e.jsx(t,{language:"python",title:"Drawdown Monitor with Auto-Scaling",children:`import numpy as np
import pandas as pd

class DrawdownManager:
    """Automatically scale position size based on drawdown depth."""

    def __init__(self, capital, levels=None):
        self.initial_capital = capital
        self.peak = capital
        self.levels = levels or [
            {'dd_pct': 5,  'size_mult': 0.75, 'action': 'reduce'},
            {'dd_pct': 10, 'size_mult': 0.50, 'action': 'half_size'},
            {'dd_pct': 15, 'size_mult': 0.25, 'action': 'minimal'},
            {'dd_pct': 20, 'size_mult': 0.00, 'action': 'stop_trading'},
        ]

    def update(self, current_capital):
        self.peak = max(self.peak, current_capital)
        dd = (self.peak - current_capital) / self.peak * 100

        size_mult = 1.0
        action = 'normal'

        for level in self.levels:
            if dd >= level['dd_pct']:
                size_mult = level['size_mult']
                action = level['action']

        return {
            'drawdown_pct': dd,
            'peak': self.peak,
            'size_multiplier': size_mult,
            'action': action,
            'recovery_needed': (self.peak / max(current_capital, 1) - 1) * 100
        }

# Simulation
dm = DrawdownManager(capital=1_000_000)
equity = [1_000_000]
np.random.seed(42)

for day in range(60):
    daily_return = np.random.normal(0.001, 0.02)
    new_equity = equity[-1] * (1 + daily_return)
    equity.append(new_equity)

    status = dm.update(new_equity)
    if status['action'] != 'normal':
        print(f"Day {day}: DD={status['drawdown_pct']:.1f}% "
              f"Action={status['action']} "
              f"Size={status['size_multiplier']:.0%}")`}),e.jsx(t,{language:"python",title:"Recovery Protocol",children:`class RecoveryProtocol:
    """Graduated return to full size after drawdown."""

    def __init__(self, recovery_days=10):
        self.recovery_days = recovery_days
        self.consecutive_wins = 0
        self.in_recovery = False

    def update(self, trade_pnl, current_dd_pct):
        if current_dd_pct > 10:
            self.in_recovery = True
            self.consecutive_wins = 0

        if not self.in_recovery:
            return 1.0

        if trade_pnl > 0:
            self.consecutive_wins += 1
        else:
            self.consecutive_wins = max(0, self.consecutive_wins - 2)

        # Graduate back: 25% -> 50% -> 75% -> 100%
        progress = min(self.consecutive_wins / self.recovery_days, 1.0)
        size_mult = 0.25 + 0.75 * progress

        if progress >= 1.0 and current_dd_pct < 5:
            self.in_recovery = False
            return 1.0

        return size_mult

recovery = RecoveryProtocol(recovery_days=8)
# After 3 consecutive wins in recovery mode:
for i in range(5):
    mult = recovery.update(trade_pnl=500, current_dd_pct=8)
    print(f"Win {i+1}: size multiplier = {mult:.0%}")`}),e.jsx(n,{title:"Drawdown Psychology",children:"The hardest part of drawdown management is following the rules. When you are down 15% and see a great trade setup, the temptation to go big for recovery is immense. Automated drawdown managers remove this emotional override. Code the rules, trust the system."})]})}const te=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));export{I as a,P as b,C as c,N as d,D as e,E as f,O as g,F as h,V as i,L as j,W as k,q as l,G as m,K as n,U as o,H as p,Y as q,X as r,B as s,$ as t,J as u,Q as v,Z as w,ee as x,te as y};
