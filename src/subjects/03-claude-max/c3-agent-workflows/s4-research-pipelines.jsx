import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function ResearchPipelines() {
  return (
    <SectionLayout
      title="Automated Market Research Pipelines"
      subtitle="Building Claude-powered research workflows for market intelligence"
      difficulty="advanced"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">Daily Pre-Market Research Agent</h3>
      <CodeBlock
        language="python"
        title="Pre-market research pipeline"
        code={`import asyncio
from datetime import datetime

async def pre_market_research():
    """Run every trading day at 8:45 AM IST."""
    data = {}

    # Gather data in parallel
    data["global_cues"] = fetch_global_indices()  # SGX, DowF
    data["fii_dii"] = fetch_fii_dii_yesterday()
    data["oi_buildup"] = fetch_nifty_oi_change()
    data["earnings_today"] = fetch_earnings_calendar()
    data["rbi_events"] = fetch_rbi_calendar()

    prompt = f"""Pre-market briefing for {datetime.now():%d %b %Y}.

Global cues: {data['global_cues']}
FII/DII flows: {data['fii_dii']}
NIFTY OI change: {data['oi_buildup']}
Earnings today: {data['earnings_today']}
RBI events: {data['rbi_events']}

Provide: market bias, key levels, sectors to watch,
risk events, and a 1-paragraph summary."""

    briefing = await analyst_agent.run(prompt)
    save_briefing(briefing)
    notify_telegram(briefing["summary"])`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Strategy Backtesting Research</h3>
      <CodeBlock
        language="python"
        title="Iterative strategy improvement with Claude"
        code={`async def research_strategy(base_strategy, backtest_results):
    """Have Claude analyze backtest results and suggest improvements."""
    prompt = f"""Backtest results for {base_strategy['name']}:
Win rate: {backtest_results['win_rate']:.1%}
Sharpe: {backtest_results['sharpe']:.2f}
Max drawdown: {backtest_results['max_dd']:.1%}
Trade log (last 20): {backtest_results['recent_trades']}

Identify the top 3 weaknesses and suggest concrete
parameter or logic changes. Output as JSON."""

    improvements = await analyst_agent.run(prompt)
    return improvements`}
      />

      <NoteBlock type="tip" title="Schedule with Cron">
        <p>Use <code>crontab -e</code> in WSL2 to schedule the pre-market pipeline:
        <code>45 8 * * 1-5 cd ~/nemoclaw && python3 research/premarket.py</code>.
        This runs at 8:45 AM Monday through Friday.</p>
      </NoteBlock>

      <NoteBlock type="info" title="Rate Limit Awareness">
        <p>Research pipelines can be token-heavy. Schedule them during off-peak hours and use
        Sonnet for summaries. Reserve Opus calls for the final synthesis step only.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
