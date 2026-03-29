import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function PerformanceProfiling() {
  return (
    <SectionLayout
      title="Performance Profiling & Latency"
      description="Measuring and optimizing execution latency across the trading pipeline."
    >
      <DefinitionBlock term="Tick-to-Trade Latency">
        The total time from receiving a market tick to submitting an order to
        the broker API. For Python-based retail algo systems, target under
        50ms for signal generation and under 200ms total including API call.
      </DefinitionBlock>

      <CodeBlock language="python" title="Latency Profiler">
{`import time
import functools
from collections import defaultdict
import statistics

class LatencyProfiler:
    """Measure execution time of trading pipeline stages."""

    def __init__(self):
        self.measurements = defaultdict(list)

    def measure(self, stage_name):
        """Decorator to measure function execution time."""
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                start = time.perf_counter_ns()
                result = func(*args, **kwargs)
                elapsed_us = (time.perf_counter_ns() - start) / 1000
                self.measurements[stage_name].append(elapsed_us)
                return result
            return wrapper
        return decorator

    def report(self):
        report = {}
        for stage, times in self.measurements.items():
            report[stage] = {
                'count': len(times),
                'mean_us': round(statistics.mean(times), 1),
                'p50_us': round(statistics.median(times), 1),
                'p95_us': round(sorted(times)[int(len(times)*0.95)], 1),
                'p99_us': round(sorted(times)[int(len(times)*0.99)], 1),
                'max_us': round(max(times), 1),
            }
        return report

profiler = LatencyProfiler()

@profiler.measure("signal_generation")
def generate_signal(tick_data):
    # Strategy logic here
    return compute_indicators(tick_data)

@profiler.measure("risk_check")
def check_risk(signal):
    return risk_gate.validate(signal)

@profiler.measure("order_submission")
def submit_order(order):
    return broker.place_order(**order)

# After market hours, review latency
for stage, stats in profiler.report().items():
    print(f"{stage}: mean={stats['mean_us']:.0f}us "
          f"p95={stats['p95_us']:.0f}us "
          f"p99={stats['p99_us']:.0f}us")`}
      </CodeBlock>

      <CodeBlock language="python" title="Memory Profiling">
{`import tracemalloc

def profile_memory(func):
    """Profile peak memory usage of a function."""
    tracemalloc.start()
    result = func()
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    print(f"Current: {current/1024:.1f}KB, Peak: {peak/1024:.1f}KB")
    return result

# Profile strategy initialization
profile_memory(lambda: strategy.load_historical_data())`}
      </CodeBlock>

      <NoteBlock title="Optimization Priorities">
        Profile before optimizing. Common bottlenecks in Python trading systems:
        (1) pandas DataFrame operations in hot loops -- use numpy arrays instead,
        (2) JSON serialization/deserialization -- use orjson for 5-10x speedup,
        (3) HTTP API calls -- use connection pooling with requests.Session.
      </NoteBlock>
    </SectionLayout>
  )
}
