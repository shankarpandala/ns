import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function StructuredLogging() {
  return (
    <SectionLayout
      title="Structured JSON Logging"
      description="Configuring Python logging for machine-parseable structured output."
    >
      <DefinitionBlock term="Structured Logging">
        Outputting log entries as JSON objects with consistent fields (timestamp,
        level, module, message, context) instead of plain text. Enables automated
        parsing, filtering, and aggregation by log management tools.
      </DefinitionBlock>

      <CodeBlock language="python" title="Structured Logging Setup">
{`import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    """Format log records as JSON lines."""

    def format(self, record):
        log_entry = {
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName,
            'line': record.lineno,
        }

        # Include extra context if provided
        if hasattr(record, 'context'):
            log_entry['context'] = record.context

        # Include exception info
        if record.exc_info and record.exc_info[0]:
            log_entry['exception'] = {
                'type': record.exc_info[0].__name__,
                'message': str(record.exc_info[1]),
                'traceback': self.formatException(record.exc_info),
            }

        return json.dumps(log_entry)

def setup_logging(log_file='logs/nemoclaw.jsonl', level=logging.INFO):
    root = logging.getLogger()
    root.setLevel(level)

    # JSON file handler
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(JSONFormatter())
    root.addHandler(file_handler)

    # Console handler (human-readable)
    console = logging.StreamHandler()
    console.setFormatter(logging.Formatter(
        '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
    ))
    root.addHandler(console)

    return root

# Usage with trading context
setup_logging()
logger = logging.getLogger('strategy.mean_reversion')

class ContextAdapter(logging.LoggerAdapter):
    def process(self, msg, kwargs):
        kwargs.setdefault('extra', {})['context'] = self.extra
        return msg, kwargs

trade_logger = ContextAdapter(logger, {
    'strategy': 'mean_reversion',
    'symbol': 'NIFTY25MARFUT',
})
trade_logger.info("Signal generated: BUY at 22000")`}
      </CodeBlock>

      <NoteBlock title="Log Levels for Trading">
        Use DEBUG for tick-level data and signal calculations. INFO for order
        submissions and fills. WARNING for retries and partial fills. ERROR for
        failed orders and API issues. CRITICAL for kill switch activations and
        system failures. In production, set minimum level to INFO.
      </NoteBlock>
    </SectionLayout>
  )
}
