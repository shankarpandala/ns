import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function CachingCompression() {
  return (
    <SectionLayout
      title="Caching and Compression Strategies"
      subtitle="Avoid redundant API calls through intelligent caching and deduplication"
      difficulty="intermediate"
      readingMinutes={6}
    >
      <h3 className="text-lg font-semibold mb-2">Response Caching with Redis</h3>
      <CodeBlock
        language="python"
        title="Cache Claude responses by prompt hash"
        code={`import hashlib, json, redis

r = redis.Redis(host='localhost', port=6379, db=2)
TTL_SECONDS = 300  # 5 min cache for market analysis

def cached_claude_call(prompt, model="claude-sonnet-4-20250514"):
    cache_key = f"claude:{hashlib.sha256(prompt.encode()).hexdigest()[:16]}"
    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)

    response = client.messages.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )
    result = response.content[0].text
    r.setex(cache_key, TTL_SECONDS, json.dumps(result))
    return result`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Prompt Deduplication</h3>
      <CodeBlock
        language="python"
        title="Avoid near-duplicate prompts"
        code={`from difflib import SequenceMatcher

class PromptDeduplicator:
    def __init__(self, threshold=0.85):
        self.recent_prompts = []  # (prompt, response) tuples
        self.threshold = threshold

    def check(self, new_prompt):
        for old_prompt, old_response in self.recent_prompts[-50:]:
            ratio = SequenceMatcher(None, new_prompt, old_prompt).ratio()
            if ratio > self.threshold:
                return old_response  # Reuse existing response
        return None  # No match, proceed with API call`}
      />

      <NoteBlock type="tip" title="Prompt Compression for Market Data">
        <p>Strip unnecessary columns before sending. If you only need close prices and volume,
        do not send open/high/low. Compressing a 50-row OHLCV table from 6 columns to 2 saves
        roughly 60% of input tokens.</p>
      </NoteBlock>

      <NoteBlock type="info" title="Anthropic Prompt Caching">
        <p>The Anthropic API supports native prompt caching with cache control headers. Long system
        prompts that do not change between calls are cached server-side, reducing both latency and
        cost. Use <code>cache_control: {`{"type": "ephemeral"}`}</code> on static content blocks.</p>
      </NoteBlock>
    </SectionLayout>
  )
}
