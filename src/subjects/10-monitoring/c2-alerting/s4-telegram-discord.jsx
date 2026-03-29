import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function TelegramDiscord() {
  return (
    <SectionLayout
      title="Telegram & Discord Bot Integration"
      description="Sending trading alerts and receiving commands via Telegram and Discord bots."
    >
      <DefinitionBlock term="Trading Alert Bot">
        A messaging bot that pushes real-time notifications (fills, P&L updates,
        risk alerts) and optionally accepts commands (status, kill, positions)
        for remote monitoring and control of the trading system.
      </DefinitionBlock>

      <CodeBlock language="python" title="Telegram Alert Bot">
{`import requests
import asyncio
from telegram import Bot, Update
from telegram.ext import Application, CommandHandler

class TelegramAlertBot:
    """Send alerts and handle commands via Telegram."""

    def __init__(self, token, chat_id):
        self.token = token
        self.chat_id = chat_id
        self.base_url = f"https://api.telegram.org/bot{token}"

    def send(self, title, message, priority='normal'):
        icon = "🔴" if priority == 'urgent' else "📊"
        text = f"{icon} <b>{title}</b>\n{message}"
        requests.post(f"{self.base_url}/sendMessage", json={
            'chat_id': self.chat_id,
            'text': text,
            'parse_mode': 'HTML',
        })

    def send_trade_fill(self, symbol, side, qty, price, pnl=None):
        arrow = "🟢 BUY" if side == 'BUY' else "🔴 SELL"
        msg = f"{arrow} {symbol}\nQty: {qty} @ Rs {price:,.2f}"
        if pnl is not None:
            msg += f"\nP&L: Rs {pnl:,.2f}"
        self.send("Trade Fill", msg)

    def send_daily_summary(self, summary):
        msg = (
            f"Total P&L: Rs {summary['pnl']:,.2f}\n"
            f"Trades: {summary['trades']}\n"
            f"Win Rate: {summary['win_rate']:.0%}\n"
            f"Max Drawdown: Rs {summary['max_dd']:,.2f}"
        )
        self.send("Daily Summary", msg)

# Command handler for remote control
async def handle_status(update: Update, context):
    pnl = trading_system.get_pnl()
    await update.message.reply_text(
        f"P&L: Rs {pnl['total']:,.2f}\n"
        f"Positions: {pnl['open_count']}\n"
        f"System: {'ACTIVE' if trading_system.is_active() else 'HALTED'}"
    )

async def handle_kill(update: Update, context):
    result = trading_system.kill_switch.activate("telegram_command")
    await update.message.reply_text(f"Kill switch activated: {result}")

# Setup bot with commands
app = Application.builder().token("BOT_TOKEN").build()
app.add_handler(CommandHandler("status", handle_status))
app.add_handler(CommandHandler("kill", handle_kill))
app.add_handler(CommandHandler("positions", handle_positions))`}
      </CodeBlock>

      <CodeBlock language="python" title="Discord Webhook for Alerts">
{`import requests

class DiscordNotifier:
    def __init__(self, webhook_url):
        self.webhook_url = webhook_url

    def send(self, title, message, color=0x00ff00):
        payload = {
            "embeds": [{
                "title": title,
                "description": message,
                "color": color,
            }]
        }
        requests.post(self.webhook_url, json=payload)

discord = DiscordNotifier("https://discord.com/api/webhooks/...")`}
      </CodeBlock>

      <NoteBlock title="Security Warning">
        Never expose kill switch or order placement commands without
        authentication. Use Telegram chat_id whitelisting and require a
        confirmation step for destructive commands. Store bot tokens in
        environment variables, never in code.
      </NoteBlock>
    </SectionLayout>
  )
}
