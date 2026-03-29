import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function PythonNodePackages() {
  return (
    <SectionLayout
      title="Python, Node & Package Managers"
      subtitle="Install pyenv for Python version management and nvm for Node.js in your WSL2 environment."
      difficulty="beginner"
      readingMinutes={5}
    >
      <h3 className="text-lg font-semibold mb-2">Python via pyenv</h3>
      <CodeBlock
        language="bash"
        title="Install pyenv and Python 3.11"
        code={`# Install pyenv dependencies
sudo apt install -y make libssl-dev zlib1g-dev libbz2-dev \\
  libreadline-dev libsqlite3-dev libncursesw5-dev xz-utils \\
  tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# Install pyenv
curl https://pyenv.run | bash

# Add to ~/.zshrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc

# Install Python 3.11 (used by NemoClaw)
pyenv install 3.11.9
pyenv global 3.11.9
python --version`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Node.js via nvm</h3>
      <CodeBlock
        language="bash"
        title="Install nvm and Node.js LTS"
        code={`# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

# Install Node.js LTS
nvm install --lts
nvm use --lts
node --version && npm --version`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Trading Python Packages</h3>
      <CodeBlock
        language="bash"
        title="Create a virtual environment for trading"
        code={`# Create project directory and venv
mkdir -p ~/nemoclaw && cd ~/nemoclaw
python -m venv .venv
source .venv/bin/activate

# Install core trading libraries
pip install numpy pandas ta-lib websocket-client
pip install ccxt python-dotenv pydantic
pip install pytest httpx  # for testing`}
      />

      <NoteBlock type="warning" title="Never Use System Python">
        Always use pyenv + virtual environments. System Python conflicts with apt packages
        and makes reproducible trading environments impossible.
      </NoteBlock>

      <NoteBlock type="tip" title="TA-Lib Installation">
        TA-Lib requires a C library. Install it with:
        <code className="block mt-1">sudo apt install -y libta-lib-dev</code>
        before running <code>pip install ta-lib</code>.
      </NoteBlock>
    </SectionLayout>
  )
}
