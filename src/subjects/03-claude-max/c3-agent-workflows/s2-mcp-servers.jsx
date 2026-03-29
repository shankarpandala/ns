import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function McpServers() {
  return (
    <SectionLayout
      title="MCP Servers for Market Data"
      subtitle="Building Model Context Protocol servers to feed Zerodha and Delta Exchange data to Claude"
      difficulty="advanced"
      readingMinutes={7}
    >
      <DefinitionBlock
        term="MCP (Model Context Protocol)"
        definition="An open protocol that lets AI models interact with external data sources and tools through a standardized server interface. Claude Code natively supports MCP."
        example="An MCP server that exposes get_nifty_price() as a tool Claude can call directly during conversation."
      />

      <CodeBlock
        language="json"
        title=".claude/settings.json -- Register MCP servers"
        code={`{
  "mcpServers": {
    "zerodha": {
      "command": "python3",
      "args": ["/home/user/nemoclaw/mcp/zerodha_server.py"],
      "env": { "KITE_API_KEY": "your_api_key" }
    },
    "delta-exchange": {
      "command": "python3",
      "args": ["/home/user/nemoclaw/mcp/delta_server.py"]
    }
  }
}`}
      />

      <CodeBlock
        language="python"
        title="mcp/zerodha_server.py -- Minimal MCP server"
        code={`from mcp.server.fastmcp import FastMCP
from kiteconnect import KiteConnect

mcp = FastMCP("zerodha-market-data")
kite = KiteConnect(api_key="your_key")

@mcp.tool()
def get_ltp(symbol: str, exchange: str = "NSE") -> dict:
    """Get last traded price for a symbol."""
    instrument = f"{exchange}:{symbol}"
    data = kite.ltp([instrument])
    return data[instrument]

@mcp.tool()
def get_ohlc(symbol: str, interval: str = "5minute",
             days: int = 5) -> list:
    """Get historical OHLC candles."""
    from datetime import datetime, timedelta
    to_date = datetime.now()
    from_date = to_date - timedelta(days=days)
    return kite.historical_data(
        instrument_token=get_token(symbol),
        from_date=from_date, to_date=to_date,
        interval=interval
    )

mcp.run(transport="stdio")`}
      />

      <NoteBlock type="tip" title="Using MCP Tools in Claude Code">
        <p>Once registered, you can ask Claude: "Use the zerodha tool to get the current NIFTY price"
        and it will call <code>get_ltp("NIFTY 50")</code> automatically through the MCP protocol.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
