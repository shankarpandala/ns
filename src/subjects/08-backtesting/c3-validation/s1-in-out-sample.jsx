import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import DefinitionBlock from '../../../components/content/DefinitionBlock'

export default function InOutSample() {
  return (
    <SectionLayout
      title="In-Sample vs Out-of-Sample Testing"
      description="Properly splitting data to validate strategy robustness and avoid curve-fitting."
    >
      <DefinitionBlock term="In-Sample (IS) Data">
        The portion of historical data used to develop, tune, and optimize a
        trading strategy. Parameters are fitted to this dataset.
      </DefinitionBlock>

      <DefinitionBlock term="Out-of-Sample (OOS) Data">
        Unseen data reserved for validation only. Strategy performance on OOS
        data reveals true predictive power. Never re-optimize on OOS data.
      </DefinitionBlock>

      <CodeBlock language="python" title="Data Splitting for Backtests">
{`import pandas as pd

class DataSplitter:
    """Split time series data preserving temporal order."""

    def __init__(self, df: pd.DataFrame, date_col='datetime'):
        self.df = df.sort_values(date_col)
        self.date_col = date_col

    def simple_split(self, train_pct=0.7):
        n = len(self.df)
        split_idx = int(n * train_pct)
        return self.df.iloc[:split_idx], self.df.iloc[split_idx:]

    def three_way_split(self, train=0.6, val=0.2):
        n = len(self.df)
        train_end = int(n * train)
        val_end = int(n * (train + val))
        return (
            self.df.iloc[:train_end],       # Train (IS)
            self.df.iloc[train_end:val_end], # Validation
            self.df.iloc[val_end:],          # Test (OOS)
        )

    def yearly_split(self):
        """Use each year as a separate fold."""
        self.df['year'] = pd.to_datetime(self.df[self.date_col]).dt.year
        years = sorted(self.df['year'].unique())
        folds = []
        for i, test_year in enumerate(years[1:], 1):
            train = self.df[self.df['year'] < test_year]
            test = self.df[self.df['year'] == test_year]
            folds.append((train, test))
        return folds

# Split 3 years of Nifty data
splitter = DataSplitter(nifty_data)
is_data, oos_data = splitter.simple_split(train_pct=0.7)
print(f"IS: {len(is_data)} bars, OOS: {len(oos_data)} bars")`}
      </CodeBlock>

      <NoteBlock title="Common Mistake">
        Never use OOS data to adjust parameters, then claim the results are
        out-of-sample. This is called data snooping. If you peek at OOS
        results and tweak strategy parameters, the OOS set becomes contaminated
        and you need fresh data to validate.
      </NoteBlock>
    </SectionLayout>
  )
}
