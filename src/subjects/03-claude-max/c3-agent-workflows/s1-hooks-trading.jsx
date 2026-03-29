import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function HooksTrading() {
  return (
    <SectionLayout
      title="Claude Code Hooks for Trading"
      subtitle="Using pre- and post-hooks to automate trade analysis in Claude Code"
      difficulty="advanced"
      readingMinutes={6}
    >
      <DefinitionBlock
        term="Claude Code Hooks"
        definition="Event-driven scripts that run before or after Claude Code actions. Hooks can intercept file edits, command execution, and conversation events to enforce trading rules."
        example="A PreToolUse hook that validates any generated order parameters before they reach the exchange API."
      />

      <CodeBlock
        language="json"
        title=".claude/settings.json -- Hook configuration"
        code={`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "python3 ~/nemoclaw/hooks/validate_order.py \"$CLAUDE_TOOL_INPUT\""
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "command": "python3 ~/nemoclaw/hooks/log_action.py \"$CLAUDE_TOOL_INPUT\" \"$CLAUDE_TOOL_OUTPUT\""
      }
    ]
  }
}`}
      />

      <CodeBlock
        language="python"
        title="hooks/validate_order.py -- Pre-trade validation"
        code={`#!/usr/bin/env python3
import sys, json

tool_input = json.loads(sys.argv[1])
command = tool_input.get("command", "")

# Block any live order placement during market hours without confirmation
DANGEROUS_PATTERNS = ["place_order", "modify_order", "cancel_all"]
for pattern in DANGEROUS_PATTERNS:
    if pattern in command:
        print(json.dumps({
            "decision": "block",
            "reason": f"Blocked: '{pattern}' requires manual approval"
        }))
        sys.exit(1)

print(json.dumps({"decision": "allow"}))`}
      />

      <NoteBlock type="warning" title="Hooks Run Locally">
        <p>Hooks execute on your WSL2 machine with your user permissions. A hook that calls
        an exchange API will use real credentials. Always test hooks in paper-trading mode first.</p>
      </NoteBlock>

      <NoteBlock type="tip" title="Audit Trail">
        <p>Use the PostToolUse hook to log every Claude action to a local SQLite database.
        This gives you a complete audit trail for post-session review of what the AI suggested.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
