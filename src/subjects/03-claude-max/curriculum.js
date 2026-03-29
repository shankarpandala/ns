export default {
  id: '03-claude-max',
  title: 'Claude Max Integration',
  icon: '🤖',
  colorHex: '#a855f7',
  description: 'Integrate Claude Max subscription for AI-powered trading analysis with optimized token usage.',
  difficulty: 'intermediate',
  estimatedHours: 3,
  prerequisites: ['02-nemoclaw-security'],
  chapters: [
    {
      id: 'c1-setup',
      title: 'Claude Max Setup',
      description: 'Set up Claude Max subscription and CLI tools for trading workflows.',
      estimatedMinutes: 40,
      sections: [
        { id: 's1-subscription-overview', title: 'Subscription Overview & API Access', difficulty: 'beginner', readingMinutes: 12, description: 'Claude Max features, rate limits, and API access.' },
        { id: 's2-cli-installation', title: 'Claude Code CLI Installation', difficulty: 'beginner', readingMinutes: 12, description: 'Install Claude Code CLI on WSL2 and authenticate.' },
        { id: 's3-model-selection', title: 'Model Selection (Opus/Sonnet/Haiku)', difficulty: 'intermediate', readingMinutes: 15, description: 'Choose the right model for each trading task.' },
      ],
    },
    {
      id: 'c2-token-optimization',
      title: 'Token Optimization',
      description: 'Maximize Claude usage with context management and cost tracking.',
      estimatedMinutes: 55,
      sections: [
        { id: 's1-context-management', title: 'Context Window Management', difficulty: 'intermediate', readingMinutes: 15, description: 'Strategies for managing context in long trading sessions.' },
        { id: 's2-prompt-engineering', title: 'Prompt Engineering for Trading', difficulty: 'intermediate', readingMinutes: 15, description: 'Craft effective prompts for market analysis.' },
        { id: 's3-caching-compression', title: 'Caching & Conversation Compression', difficulty: 'intermediate', readingMinutes: 12, description: 'Cache responses and compress conversation history.' },
        { id: 's4-cost-tracking', title: 'Cost Tracking & Budget Alerts', difficulty: 'intermediate', readingMinutes: 12, description: 'Monitor token usage and set budget alerts.' },
      ],
    },
    {
      id: 'c3-agent-workflows',
      title: 'Agent Workflows',
      description: 'Build automated trading workflows with Claude agents and MCP servers.',
      estimatedMinutes: 55,
      sections: [
        { id: 's1-hooks-trading', title: 'Claude Code Hooks for Trading', difficulty: 'intermediate', readingMinutes: 12, description: 'Set up hooks for pre/post trade analysis.' },
        { id: 's2-mcp-servers', title: 'MCP Servers for Market Data', difficulty: 'intermediate', readingMinutes: 15, description: 'Build MCP servers for Zerodha and Delta Exchange.' },
        { id: 's3-multi-agent', title: 'Multi-Agent Orchestration with Claude', difficulty: 'advanced', readingMinutes: 15, description: 'Orchestrate analyst, trader, and risk agents.' },
        { id: 's4-research-pipelines', title: 'Automated Research Pipelines', difficulty: 'advanced', readingMinutes: 15, description: 'Automated market research with Claude agents.' },
      ],
    },
    {
      id: 'c4-security-claude',
      title: 'Security with Claude',
      description: 'Run Claude safely within NemoClaw sandbox with output validation.',
      estimatedMinutes: 40,
      sections: [
        { id: 's1-sandboxed-execution', title: 'Sandboxed Execution within NemoClaw', difficulty: 'intermediate', readingMinutes: 12, description: 'Run Claude Code within NemoClaw security boundaries.' },
        { id: 's2-output-validation', title: 'Output Validation & Guardrails', difficulty: 'intermediate', readingMinutes: 15, description: 'Validate Claude trading decisions with guardrails.' },
        { id: 's3-prompt-injection', title: 'Prompt Injection Defense', difficulty: 'advanced', readingMinutes: 12, description: 'Defend against prompt injection in trading context.' },
      ],
    },
  ],
}
