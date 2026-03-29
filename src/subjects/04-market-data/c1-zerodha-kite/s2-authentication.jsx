import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import StepByStep from '../../../components/content/StepByStep'

export default function Authentication() {
  return (
    <SectionLayout
      title="Kite Connect Authentication Flow"
      subtitle="Implementing the login flow, 2FA handling, and access token management"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <StepByStep
        title="OAuth-style Login Flow"
        steps={[
          {
            title: 'Redirect user to Kite login',
            content: (
              <CodeBlock language="python" code={`from kiteconnect import KiteConnect
import os

kite = KiteConnect(api_key=os.environ["KITE_API_KEY"])
login_url = kite.login_url()
print(f"Open in browser: {login_url}")`} />
            ),
          },
          {
            title: 'Capture the request token from callback',
            content: (
              <CodeBlock language="python" code={`from flask import Flask, request

app = Flask(__name__)

@app.route("/callback")
def callback():
    request_token = request.args.get("request_token")
    # Exchange for access token
    data = kite.generate_session(
        request_token,
        api_secret=os.environ["KITE_API_SECRET"]
    )
    access_token = data["access_token"]
    save_token(access_token)  # Store securely
    return "Login successful! You can close this tab."`} />
            ),
          },
          {
            title: 'Use the access token for API calls',
            content: (
              <CodeBlock language="python" code={`kite.set_access_token(access_token)
profile = kite.profile()
print(f"Logged in as: {profile['user_name']}")
print(f"Broker: {profile['broker']}")`} />
            ),
          },
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Token Persistence</h3>
      <CodeBlock
        language="python"
        title="Save and reload tokens across sessions"
        code={`import json
from pathlib import Path
from datetime import date

TOKEN_FILE = Path.home() / ".nemoclaw" / "kite_token.json"

def save_token(access_token):
    TOKEN_FILE.parent.mkdir(exist_ok=True)
    TOKEN_FILE.write_text(json.dumps({
        "access_token": access_token,
        "date": str(date.today())
    }))
    TOKEN_FILE.chmod(0o600)  # Owner-only read/write

def load_token():
    if TOKEN_FILE.exists():
        data = json.loads(TOKEN_FILE.read_text())
        if data["date"] == str(date.today()):
            return data["access_token"]
    return None  # Token expired, re-login needed`}
      />

      <NoteBlock type="important" title="Daily Token Expiry">
        <p>Kite access tokens expire at <strong>6:00 AM IST daily</strong>. Your bot must
        re-authenticate every morning before market open. Automate this with a cron job
        or a startup script.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
