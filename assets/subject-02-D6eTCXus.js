import{j as e}from"./vendor-ui-BRJLAnmZ.js";import{S as i,D as s,C as t,N as a,W as p,a as y}from"./subject-01-B5qsZKsm.js";const R={id:"02-nemoclaw-security",title:"NemoClaw Security Sandbox",icon:"🛡️",colorHex:"#ef4444",description:"Deploy NemoClaw as a security-first sandbox to protect trading systems from attacks and data exfiltration.",difficulty:"beginner",estimatedHours:4,prerequisites:["01-wsl2-foundation"],chapters:[{id:"c1-architecture",title:"NemoClaw Architecture",description:"Understand the two-component design and threat model for trading systems.",estimatedMinutes:45,sections:[{id:"s1-two-component-design",title:"Two-Component Design (NemoShell + ClawGuard)",difficulty:"beginner",readingMinutes:15,description:"Architecture overview of NemoShell and ClawGuard components."},{id:"s2-threat-model",title:"Threat Model for Trading Systems",difficulty:"beginner",readingMinutes:15,description:"API key theft, data exfiltration, injection attacks in trading."},{id:"s3-openclaw-vs-nemoclaw",title:"OpenClaw vs NemoClaw Comparison",difficulty:"beginner",readingMinutes:12,description:"Feature comparison and when to use each approach."}]},{id:"c2-installation",title:"NemoClaw Installation on WSL2",description:"Step-by-step installation and verification of NemoClaw on your WSL2 setup.",estimatedMinutes:40,sections:[{id:"s1-prerequisites",title:"Prerequisites & Dependencies",difficulty:"beginner",readingMinutes:10,description:"System requirements and dependency installation."},{id:"s2-install-configure",title:"Installation & Initial Configuration",difficulty:"beginner",readingMinutes:15,description:"Install NemoClaw and configure for trading workloads."},{id:"s3-verification",title:"Verification & Health Checks",difficulty:"beginner",readingMinutes:12,description:"Verify installation with health check commands."}]},{id:"c3-security-policies",title:"Security Policies",description:"Configure network, filesystem, and process isolation policies for trading.",estimatedMinutes:60,sections:[{id:"s1-network-policies",title:"Network Policies (Allowlists, Egress Control)",difficulty:"intermediate",readingMinutes:15,description:"Restrict network access to only trading API endpoints."},{id:"s2-filesystem-policies",title:"Filesystem Policies (Read/Write Boundaries)",difficulty:"intermediate",readingMinutes:12,description:"Define protected paths and read/write boundaries."},{id:"s3-process-isolation",title:"Process Isolation & Resource Limits",difficulty:"intermediate",readingMinutes:15,description:"cgroups, namespace isolation, and resource limits."},{id:"s4-custom-policies",title:"Custom Policy Authoring",difficulty:"intermediate",readingMinutes:15,description:"Write custom YAML policy files for trading scenarios."}]},{id:"c4-secrets-management",title:"Secrets Management",description:"Protect API keys, credentials, and sensitive trading data.",estimatedMinutes:45,sections:[{id:"s1-api-key-encryption",title:"API Key Encryption & Vault Setup",difficulty:"intermediate",readingMinutes:15,description:"Encrypt and vault Zerodha and Delta Exchange API keys."},{id:"s2-env-isolation",title:"Environment Variable Isolation",difficulty:"intermediate",readingMinutes:12,description:"Isolate environment variables between containers."},{id:"s3-credential-rotation",title:"Credential Rotation & Audit Logging",difficulty:"intermediate",readingMinutes:15,description:"Auto-rotate credentials and maintain audit trails."}]},{id:"c5-attack-hardening",title:"Attack Surface Hardening",description:"Harden your trading system against common attack vectors.",estimatedMinutes:45,sections:[{id:"s1-firewall-rules",title:"Port Scanning & Firewall Rules",difficulty:"intermediate",readingMinutes:15,description:"UFW/iptables configuration for trading system ports."},{id:"s2-ssl-tls",title:"SSL/TLS for Local Services",difficulty:"intermediate",readingMinutes:15,description:"SSL/TLS setup for local service communication."},{id:"s3-intrusion-detection",title:"Intrusion Detection & Alerting",difficulty:"intermediate",readingMinutes:12,description:"fail2ban, log monitoring, and alert configuration."}]}]};function f(){return e.jsxs(i,{title:"Two-Component Design",subtitle:"NemoShell provides the execution environment while ClawGuard enforces security boundaries.",difficulty:"intermediate",readingMinutes:5,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"NemoClaw separates concerns into two distinct components that work together to create a secure sandbox for trading operations. This separation ensures that security enforcement cannot be bypassed by application-level code."}),e.jsx(s,{term:"NemoShell",definition:"The execution environment where trading bots, strategies, and data pipelines run. It provides a containerized runtime with controlled access to system resources.",example:"Your Python strategy script runs inside NemoShell with access only to approved network endpoints and file paths."}),e.jsx(s,{term:"ClawGuard",definition:"The security enforcement layer that sits between NemoShell and the host system. It intercepts system calls, network requests, and file operations to enforce security policies.",example:"ClawGuard blocks an outbound connection to an unapproved IP, even if the trading bot code explicitly tries to connect."}),e.jsx("h3",{className:"text-lg font-semibold mt-4 mb-2",children:"Architecture Overview"}),e.jsx(t,{language:"bash",title:"Component interaction",code:`# NemoClaw Architecture (simplified)
#
# ┌─────────────────────────────────┐
# │  Trading Bot / Strategy Code    │  ← Your code runs here
# ├─────────────────────────────────┤
# │         NemoShell               │  ← Execution runtime
# │  (Container + Resource Mgmt)    │
# ├─────────────────────────────────┤
# │         ClawGuard               │  ← Security enforcement
# │  (Syscall filter + Net policy)  │
# ├─────────────────────────────────┤
# │     Host OS (WSL2 Ubuntu)       │
# └─────────────────────────────────┘`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"How They Communicate"}),e.jsx(t,{language:"yaml",title:"ClawGuard policy enforcement",code:`# ClawGuard intercepts via:
# 1. seccomp-bpf filters (syscall level)
# 2. iptables/nftables rules (network level)
# 3. AppArmor profiles (filesystem level)
# 4. cgroup controllers (resource level)

# NemoShell reports to ClawGuard via Unix socket:
clawguard_socket: /var/run/clawguard/control.sock
nemoshell_runtime: containerd`}),e.jsx(a,{type:"info",title:"Defense in Depth",children:"ClawGuard enforces policies at the kernel level, not the application level. Even if a trading bot is compromised, it cannot escalate privileges or exfiltrate data beyond the defined security boundary."})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),u=["bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300","bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300","bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"];function h({title:c,headers:d=[],rows:m=[],highlightDiffs:g=!1}){return e.jsxs("div",{className:"my-4",children:[c&&e.jsx("h3",{className:"text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3",children:c}),e.jsx("div",{className:"hidden sm:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsx("tr",{children:d.map((r,o)=>e.jsx("th",{className:`px-4 py-3 text-left font-semibold ${u[o%u.length]}`,children:r},o))})}),e.jsx("tbody",{children:m.map((r,o)=>e.jsx("tr",{className:o%2===1?"bg-gray-50 dark:bg-gray-800/40":"bg-white dark:bg-gray-900",children:r.map((l,n)=>e.jsx("td",{className:`px-4 py-3 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 ${g&&n>0&&l!==r[0]?"bg-yellow-50 dark:bg-yellow-900/20 font-medium":""}`,children:l},n))},o))})]})}),e.jsx("div",{className:"sm:hidden space-y-3",children:m.map((r,o)=>e.jsx("div",{className:"rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden",children:r.map((l,n)=>e.jsxs("div",{className:`px-4 py-2 ${n===0?"bg-gray-50 dark:bg-gray-800/60 font-medium text-gray-800 dark:text-gray-200":"bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"} ${n>0?"border-t border-gray-100 dark:border-gray-800":""}`,children:[e.jsx("span",{className:"text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-0.5",children:d[n]}),e.jsx("span",{className:"text-sm",children:l})]},n))},o))})]})}function b(){return e.jsxs(i,{title:"Trading System Threat Model",subtitle:"Identify and classify threats specific to algorithmic trading: API key theft, data exfiltration, and code injection.",difficulty:"advanced",readingMinutes:6,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"Trading systems face unique security threats because they combine financial credentials, real-time market data, and automated execution. A compromised bot can drain an account in seconds."}),e.jsx(p,{title:"Financial Risk",children:"Unlike typical development environments, a security breach in a trading system has immediate financial consequences. API keys with withdrawal permissions are the highest-value target."}),e.jsx(h,{title:"Threat Classification",headers:["Threat","Impact","NemoClaw Mitigation"],rows:[["API key exfiltration","Full account drain, unauthorized trades","Encrypted vault + memory-only decryption"],["Data exfiltration","Strategy IP theft, position exposure","Egress allowlists, DNS filtering"],["Code injection","Arbitrary execution, privilege escalation","Seccomp filters, read-only mounts"],["Supply chain attack","Malicious pip/npm packages","Network policy + hash verification"],["Side-channel leaks","Timing attacks on order flow","Process isolation, dedicated cgroups"]]}),e.jsx(s,{term:"Egress Control",definition:"Restricting outbound network connections to a predefined allowlist of endpoints. Prevents compromised code from sending data to unauthorized servers.",example:"Only api.kite.trade and api.delta.exchange are permitted; all other outbound connections are dropped.",seeAlso:["Network Policies","DNS Filtering"]}),e.jsx(s,{term:"Blast Radius",definition:"The extent of damage a single compromised component can cause. NemoClaw minimizes blast radius through container isolation and least-privilege policies.",example:"A compromised data-feed container cannot access the order execution container's API keys."}),e.jsx(a,{type:"tip",title:"Threat Modeling Practice",children:"Review your threat model whenever you add a new exchange integration, expose a new port, or install a new dependency. Each change can introduce new attack vectors."})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function w(){return e.jsxs(i,{title:"OpenClaw vs NemoClaw",subtitle:"Feature comparison between the open-source base and the trading-hardened NemoClaw distribution.",difficulty:"intermediate",readingMinutes:4,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"NemoClaw extends the open-source OpenClaw sandbox framework with trading-specific security features, exchange integrations, and financial compliance tooling."}),e.jsx(s,{term:"OpenClaw",definition:"The open-source container sandboxing framework that provides basic process isolation, network filtering, and filesystem policies. Community-maintained and general-purpose.",seeAlso:["NemoClaw","ClawGuard"]}),e.jsx(h,{title:"Feature Comparison",headers:["Feature","OpenClaw","NemoClaw"],highlightDiffs:!0,rows:[["Process isolation","Namespaces + cgroups","Namespaces + cgroups + seccomp-bpf"],["Network policies","Basic allowlist/denylist","Exchange-aware egress + DNS filtering"],["Secrets management","Environment variables","Encrypted vault with auto-rotation"],["Filesystem policies","Read/write boundaries","Read/write + integrity hashing"],["API key handling","Not included","Memory-only decryption, audit logging"],["Exchange integrations","None","Zerodha, Delta Exchange, Binance presets"],["Compliance logging","Basic stdout","Structured audit trail with timestamps"],["Resource limits","cgroup v1","cgroup v2 with trading-tuned defaults"],["Policy format","JSON","YAML with inheritance and templating"],["Update mechanism","Manual","Signed releases with rollback"]]}),e.jsx(a,{type:"info",title:"When to Use OpenClaw",children:"If you are building a general-purpose sandbox without financial trading requirements, OpenClaw is lighter and simpler. NemoClaw adds overhead that is only justified when handling real money and exchange API credentials."}),e.jsxs(a,{type:"tip",title:"Migration Path",children:["NemoClaw is backward-compatible with OpenClaw policies. You can start with OpenClaw for learning and migrate to NemoClaw when you connect to live exchanges. Import existing policies with ",e.jsx("code",{children:"nemoclaw policy import --from openclaw"}),"."]})]})}const G=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs(i,{title:"Prerequisites",subtitle:"System dependencies and requirements before installing NemoClaw.",difficulty:"beginner",readingMinutes:4,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"System Requirements"}),e.jsxs("ul",{className:"list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4",children:[e.jsx("li",{children:"WSL2 with Ubuntu 22.04 (configured in Subject 01)"}),e.jsx("li",{children:"Docker Engine 24+ with Compose plugin"}),e.jsx("li",{children:"Python 3.11+ (via pyenv)"}),e.jsx("li",{children:"4 GB RAM available for NemoClaw services"}),e.jsx("li",{children:"10 GB free disk space in Linux filesystem"})]}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Verify Dependencies"}),e.jsx(t,{language:"bash",title:"Pre-flight checks",code:`# Check Docker is running
docker version
docker compose version

# Check Python version
python --version  # Should be 3.11+

# Check kernel supports required features
uname -r  # Should be 5.10+ (WSL2 kernel)

# Verify cgroup v2
stat -fc %T /sys/fs/cgroup
# Expected: cgroup2fs

# Check available disk space
df -h ~  # Need 10GB+ free`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Install Additional Dependencies"}),e.jsx(t,{language:"bash",title:"NemoClaw system dependencies",code:`# Security and crypto libraries
sudo apt install -y \\
  libseccomp-dev \\
  apparmor-utils \\
  iptables \\
  nftables \\
  jq \\
  yq \\
  openssl

# Install Rust toolchain (needed for ClawGuard compilation)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustc --version`}),e.jsxs(a,{type:"warning",title:"cgroup v2 Required",children:["NemoClaw requires cgroup v2 for fine-grained resource control. Most WSL2 kernels (5.10+) support this by default. If ",e.jsx("code",{children:"stat -fc %T /sys/fs/cgroup"})," shows",e.jsx("code",{children:"tmpfs"})," instead of ",e.jsx("code",{children:"cgroup2fs"}),", update your WSL kernel with ",e.jsx("code",{children:"wsl --update"}),"."]}),e.jsx(a,{type:"info",title:"Offline Installation",children:"For air-gapped trading environments, NemoClaw provides an offline install bundle. Download it on a connected machine and transfer via USB. See the installation section for details."})]})}const L=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs(i,{title:"Install & Configure NemoClaw",subtitle:"Step-by-step installation and initial configuration of the NemoClaw trading sandbox.",difficulty:"intermediate",readingMinutes:6,children:[e.jsx(y,{title:"Installation Steps",steps:[{title:"Clone the NemoClaw repository",content:e.jsx(t,{code:`git clone git@github.com:nemoclaw/nemoclaw.git ~/nemoclaw
cd ~/nemoclaw
git checkout v2.1-stable`,language:"bash"})},{title:"Run the installer",content:e.jsx(t,{code:`# The installer sets up ClawGuard, NemoShell, and default policies
chmod +x install.sh
sudo ./install.sh --with-trading-presets

# Expected output:
# [OK] ClawGuard installed to /usr/local/bin/clawguard
# [OK] NemoShell runtime configured
# [OK] Default policies installed to /etc/nemoclaw/policies/
# [OK] Vault initialized at /var/lib/nemoclaw/vault/`,language:"bash"})},{title:"Initialize the configuration",content:e.jsx(t,{code:`# Generate the main config file
nemoclaw init --profile trading

# This creates ~/.nemoclaw/config.yaml`,language:"bash"})},{title:"Configure exchange presets",content:e.jsx(t,{code:`# Enable exchange-specific security presets
nemoclaw config set exchanges.zerodha.enabled true
nemoclaw config set exchanges.delta.enabled true`,language:"bash"})}]}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Main Configuration"}),e.jsx(t,{language:"yaml",title:"~/.nemoclaw/config.yaml",code:`runtime:
  shell: nemoshell
  container_engine: docker
  default_image: nemoclaw/trading-base:3.11

security:
  clawguard: true
  policy_dir: /etc/nemoclaw/policies
  audit_log: /var/log/nemoclaw/audit.log
  vault_path: /var/lib/nemoclaw/vault

network:
  egress_mode: allowlist
  dns_filtering: true

resources:
  default_memory: 2G
  default_cpus: 2
  max_containers: 10`}),e.jsxs(a,{type:"tip",title:"Profile Templates",children:["Use ",e.jsx("code",{children:"nemoclaw init --profile"})," with different presets:",e.jsx("code",{className:"block mt-1",children:"trading"})," for live trading,",e.jsx("code",{className:"block",children:"backtest"})," for historical analysis (relaxed network),",e.jsx("code",{className:"block",children:"development"})," for strategy development (most permissive)."]}),e.jsxs(a,{type:"warning",title:"Verify the Installer Hash",children:["Always verify the installer before running it:",e.jsx("code",{className:"block mt-1",children:"sha256sum install.sh"}),"Compare against the hash published in the GitHub release notes."]})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs(i,{title:"Verification & Health Checks",subtitle:"Confirm NemoClaw is correctly installed and all components are operational.",difficulty:"beginner",readingMinutes:4,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Version Check"}),e.jsx(t,{language:"bash",title:"Verify installed components",code:`# Check NemoClaw CLI version
nemoclaw --version
# Expected: nemoclaw v2.1.x

# Check ClawGuard daemon
clawguard --version
clawguard status

# Check NemoShell runtime
nemoshell --version`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Run Built-in Health Checks"}),e.jsx(t,{language:"bash",title:"Comprehensive health check",code:`nemoclaw doctor

# Expected output:
# [PASS] Docker Engine running (v24.0.7)
# [PASS] ClawGuard daemon active
# [PASS] Seccomp filters loaded
# [PASS] AppArmor profiles installed
# [PASS] Network policies active
# [PASS] Vault initialized and sealed
# [PASS] cgroup v2 enabled
# [PASS] Audit logging active
#
# All 8 checks passed. NemoClaw is ready.`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Test Sandbox Isolation"}),e.jsx(t,{language:"bash",title:"Run isolation tests",code:`# Launch a test container with security policies applied
nemoclaw test --suite isolation

# This verifies:
# - Outbound connections to non-allowlisted hosts are blocked
# - Filesystem writes outside permitted paths fail
# - Privileged syscalls are rejected
# - Resource limits are enforced
# - Vault secrets are inaccessible from userspace`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Verify Audit Logging"}),e.jsx(t,{language:"bash",title:"Check audit trail",code:`# View recent audit events
tail -20 /var/log/nemoclaw/audit.log

# Check for policy violations (should be empty on fresh install)
nemoclaw audit --filter violations --last 1h

# Verify log rotation is configured
cat /etc/logrotate.d/nemoclaw`}),e.jsxs(a,{type:"tip",title:"Continuous Health Monitoring",children:["Schedule periodic health checks with cron:",e.jsx("code",{className:"block mt-1",children:`echo "*/30 * * * * nemoclaw doctor --quiet || notify-send NemoClaw 'Health check failed'" | crontab -`})]}),e.jsx(a,{type:"warning",title:"Fix Failures Before Proceeding",children:"Do not connect exchange API keys until all health checks pass. A misconfigured ClawGuard could leave your credentials exposed."})]})}const V=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs(i,{title:"Network Policies",subtitle:"Configure egress allowlists and DNS filtering to restrict trading container network access.",difficulty:"intermediate",readingMinutes:5,children:[e.jsx(s,{term:"Egress Allowlist",definition:"A list of permitted outbound network destinations. All connections to unlisted hosts are blocked by default (deny-all baseline).",example:"Allowing only api.kite.trade:443 and api.delta.exchange:443 for order execution.",seeAlso:["DNS Filtering","Firewall Rules"]}),e.jsx("h3",{className:"text-lg font-semibold mt-4 mb-2",children:"Default Network Policy"}),e.jsx(t,{language:"yaml",title:"/etc/nemoclaw/policies/network.yaml",code:`apiVersion: nemoclaw/v1
kind: NetworkPolicy
metadata:
  name: trading-egress
  description: Allowlist for live trading containers

spec:
  default_action: deny

  egress:
    # Zerodha Kite Connect
    - host: api.kite.trade
      ports: [443]
      protocol: tcp

    # Delta Exchange
    - host: api.delta.exchange
      ports: [443]
      protocol: tcp

    # WebSocket feeds
    - host: ws.kite.trade
      ports: [443]
      protocol: tcp

    # DNS resolution (required)
    - host: "*.dns.google"
      ports: [53, 853]
      protocol: [tcp, udp]

  dns:
    allowed_resolvers:
      - 8.8.8.8
      - 8.8.4.4
    block_dns_over_https: true`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Apply and Test"}),e.jsx(t,{language:"bash",title:"Policy management commands",code:`# Apply the network policy
nemoclaw policy apply /etc/nemoclaw/policies/network.yaml

# List active policies
nemoclaw policy list

# Test that allowed hosts work
nemoclaw exec -- curl -I https://api.kite.trade/health
# Expected: HTTP 200

# Test that blocked hosts are rejected
nemoclaw exec -- curl -I https://evil-exfil.example.com
# Expected: Connection refused / timeout`}),e.jsxs(a,{type:"warning",title:"DNS Exfiltration",children:["Attackers can encode stolen data in DNS queries. Enable ",e.jsx("code",{children:"block_dns_over_https"}),"and restrict resolvers to prevent DNS tunneling. ClawGuard inspects DNS queries for anomalous patterns."]}),e.jsxs(a,{type:"tip",title:"Backtest Profile",children:["For backtesting, use a relaxed network policy that allows package downloads:",e.jsx("code",{className:"block mt-1",children:"nemoclaw policy apply --profile backtest"})]})]})}const W=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function C(){return e.jsxs(i,{title:"Filesystem Policies",subtitle:"Define read/write boundaries and protected paths to prevent unauthorized data access.",difficulty:"intermediate",readingMinutes:5,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"Filesystem policies control which paths a trading container can read from and write to. By default, NemoClaw mounts strategy code as read-only and provides specific writable directories for data output and logs."}),e.jsx(t,{language:"yaml",title:"/etc/nemoclaw/policies/filesystem.yaml",code:`apiVersion: nemoclaw/v1
kind: FilesystemPolicy
metadata:
  name: trading-fs
  description: Filesystem boundaries for trading containers

spec:
  # Read-only mounts (code and config)
  readonly:
    - /app/strategies
    - /app/config
    - /etc/nemoclaw/policies
    - /usr/lib
    - /usr/bin

  # Writable paths (data output only)
  writable:
    - /app/data
    - /app/logs
    - /tmp

  # Completely blocked paths
  denied:
    - /var/lib/nemoclaw/vault
    - /etc/shadow
    - /root
    - /proc/kcore
    - /sys/firmware

  # Integrity monitoring (alert on unexpected changes)
  integrity_check:
    - path: /app/strategies
      hash_algorithm: sha256
      check_interval: 60s`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Apply and Verify"}),e.jsx(t,{language:"bash",title:"Filesystem policy commands",code:`# Apply filesystem policy
nemoclaw policy apply /etc/nemoclaw/policies/filesystem.yaml

# Test read-only enforcement
nemoclaw exec -- touch /app/strategies/test.py
# Expected: Read-only file system

# Test writable paths
nemoclaw exec -- touch /app/data/test.csv
# Expected: Success

# Test denied paths
nemoclaw exec -- cat /var/lib/nemoclaw/vault/master.key
# Expected: Permission denied

# View integrity check status
nemoclaw integrity status`}),e.jsx(a,{type:"important",title:"Strategy Code Protection",children:"Mounting strategies as read-only prevents a compromised process from modifying your trading logic. A tampered strategy could place malicious orders. Always use integrity hashing on strategy directories."}),e.jsxs(a,{type:"tip",title:"Temporary Exceptions",children:["During development, temporarily relax filesystem policies:",e.jsx("code",{className:"block mt-1",children:"nemoclaw exec --policy-override fs.writable+=/app/strategies -- bash"}),"This is logged as a policy override in the audit trail."]})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"}));function S(){return e.jsxs(i,{title:"Process Isolation",subtitle:"Resource limits, cgroups, and namespace isolation for trading containers.",difficulty:"advanced",readingMinutes:5,children:[e.jsx(s,{term:"Linux Namespaces",definition:"Kernel feature that partitions system resources so each container sees its own isolated view of PIDs, network, mounts, and users.",example:"A trading bot in PID namespace 1 cannot see or signal processes in PID namespace 2."}),e.jsx(s,{term:"cgroups v2",definition:"Control groups that limit and account for CPU, memory, I/O, and other resources per container. Prevents a single container from starving others.",example:"Limiting a backtest container to 4 GB RAM prevents it from swapping out the live trading bot."}),e.jsx("h3",{className:"text-lg font-semibold mt-4 mb-2",children:"Resource Limits Policy"}),e.jsx(t,{language:"yaml",title:"/etc/nemoclaw/policies/resources.yaml",code:`apiVersion: nemoclaw/v1
kind: ResourcePolicy
metadata:
  name: trading-resources

spec:
  containers:
    live-trading:
      memory: 2G
      memory_swap: 2G    # No swap (predictable latency)
      cpus: 2
      pids_limit: 256
      io_weight: 500     # Higher I/O priority

    backtest:
      memory: 4G
      memory_swap: 8G
      cpus: 4
      pids_limit: 512
      io_weight: 100     # Lower I/O priority

    data-feed:
      memory: 1G
      memory_swap: 1G
      cpus: 1
      pids_limit: 128
      io_weight: 300`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Seccomp System Call Filtering"}),e.jsx(t,{language:"bash",title:"Inspect active seccomp profile",code:`# View the default trading seccomp profile
cat /etc/nemoclaw/seccomp/trading-default.json | jq '.syscalls | length'
# Shows number of allowed syscalls (typically ~250 of 400+)

# Blocked dangerous syscalls include:
# - mount, umount2 (filesystem manipulation)
# - ptrace (process debugging/injection)
# - kexec_load (kernel replacement)
# - reboot, init_module (system-level ops)

# Test seccomp enforcement
nemoclaw exec -- strace -c ls 2>&1 | head
# strace itself may be blocked by seccomp`}),e.jsxs(a,{type:"warning",title:"Memory Swap for Live Trading",children:["Set ",e.jsx("code",{children:"memory_swap"})," equal to ",e.jsx("code",{children:"memory"})," for live trading containers. This disables swap and ensures deterministic performance. A swapping trading bot can miss critical order windows."]}),e.jsxs(a,{type:"tip",title:"Monitor Resource Usage",children:["Use ",e.jsx("code",{children:"nemoclaw stats"})," to see real-time resource consumption per container, similar to ",e.jsx("code",{children:"docker stats"})," but with policy limit overlays."]})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(i,{title:"Writing Custom Policies",subtitle:"Create YAML policy files with inheritance and templating for your specific trading setup.",difficulty:"advanced",readingMinutes:6,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"NemoClaw policies are composable YAML files. You can inherit from base profiles, override specific rules, and use templates for exchange-specific configurations."}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Policy Structure"}),e.jsx(t,{language:"yaml",title:"Custom policy anatomy",code:`apiVersion: nemoclaw/v1
kind: CompositePolicy
metadata:
  name: my-zerodha-strategy
  description: Custom policy for intraday Nifty options
  labels:
    exchange: zerodha
    strategy: intraday

spec:
  # Inherit from a base profile
  extends: trading-base

  # Override network rules
  network:
    egress:
      - host: api.kite.trade
        ports: [443]
      - host: ws.kite.trade
        ports: [443]
      # Allow market data provider
      - host: api.marketfeed.example.com
        ports: [443]

  # Override resource limits
  resources:
    memory: 3G
    cpus: 2

  # Add custom filesystem rules
  filesystem:
    writable:
      - /app/data/nifty-options
    readonly:
      - /app/strategies/intraday`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Policy Validation"}),e.jsx(t,{language:"bash",title:"Validate before applying",code:`# Dry-run validation
nemoclaw policy validate my-zerodha-strategy.yaml

# Check for conflicts with existing policies
nemoclaw policy diff my-zerodha-strategy.yaml

# Apply with rollback on failure
nemoclaw policy apply my-zerodha-strategy.yaml --atomic

# List all active policies and their inheritance chain
nemoclaw policy list --show-inheritance`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Templated Policies"}),e.jsx(t,{language:"yaml",title:"Policy template with variables",code:`apiVersion: nemoclaw/v1
kind: PolicyTemplate
metadata:
  name: exchange-template

spec:
  parameters:
    - name: EXCHANGE_HOST
    - name: WS_HOST
    - name: MAX_MEMORY
      default: 2G

  template:
    network:
      egress:
        - host: "{{ .EXCHANGE_HOST }}"
          ports: [443]
        - host: "{{ .WS_HOST }}"
          ports: [443]
    resources:
      memory: "{{ .MAX_MEMORY }}"`}),e.jsx(t,{language:"bash",title:"Instantiate a template",code:`nemoclaw policy create --from-template exchange-template \\
  --set EXCHANGE_HOST=api.delta.exchange \\
  --set WS_HOST=socket.delta.exchange \\
  --set MAX_MEMORY=4G \\
  --name delta-live`}),e.jsxs(a,{type:"tip",title:"Version Control Policies",children:["Store all custom policies in your git repository under ",e.jsx("code",{children:"policies/"}),". Use ",e.jsx("code",{children:"nemoclaw policy sync ./policies/"})," to apply them from CI/CD."]})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function N(){return e.jsxs(i,{title:"API Key Encryption",subtitle:"Set up the NemoClaw vault for encrypted storage of Zerodha and Delta Exchange API credentials.",difficulty:"advanced",readingMinutes:6,children:[e.jsx(p,{title:"Never Store Keys in Plain Text",children:"Exchange API keys with trading and withdrawal permissions are equivalent to cash. A leaked Zerodha API key can execute unauthorized trades on your account. Always use the encrypted vault."}),e.jsx("h3",{className:"text-lg font-semibold mt-4 mb-2",children:"Initialize the Vault"}),e.jsx(t,{language:"bash",title:"Vault setup",code:`# Initialize the vault with a master password
nemoclaw vault init
# Enter master password (min 16 characters, use a passphrase)
# This creates an AES-256-GCM encrypted store at:
# /var/lib/nemoclaw/vault/secrets.enc

# Verify vault status
nemoclaw vault status
# Expected: Vault initialized, sealed`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Store Exchange API Keys"}),e.jsx(t,{language:"bash",title:"Add credentials to vault",code:`# Store Zerodha Kite Connect credentials
nemoclaw vault set zerodha/api_key
# (prompts for value - never passed as argument)

nemoclaw vault set zerodha/api_secret
nemoclaw vault set zerodha/request_token

# Store Delta Exchange credentials
nemoclaw vault set delta/api_key
nemoclaw vault set delta/api_secret

# List stored keys (shows names only, not values)
nemoclaw vault list
# zerodha/api_key
# zerodha/api_secret
# zerodha/request_token
# delta/api_key
# delta/api_secret`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Access Keys in Containers"}),e.jsx(t,{language:"python",title:"Python - Accessing vault secrets at runtime",code:`from nemoclaw import vault

# Keys are decrypted in memory only, never written to disk
kite_api_key = vault.get("zerodha/api_key")
kite_secret = vault.get("zerodha/api_secret")

# Use with KiteConnect
from kiteconnect import KiteConnect
kite = KiteConnect(api_key=kite_api_key)
kite.set_access_token(vault.get("zerodha/access_token"))`}),e.jsxs(a,{type:"info",title:"Memory-Only Decryption",children:["Secrets are decrypted into a ",e.jsx("code",{children:"mlock"}),"-ed memory region that cannot be swapped to disk. When the container exits, the memory is securely zeroed. This prevents forensic recovery of credentials from swap files."]}),e.jsxs(a,{type:"tip",title:"Backup the Vault",children:["Back up the encrypted vault file, not the master password:",e.jsx("code",{className:"block mt-1",children:"cp /var/lib/nemoclaw/vault/secrets.enc ~/backups/"}),"Store the master password separately in a password manager."]})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"}));function A(){return e.jsxs(i,{title:"Environment Variable Isolation",subtitle:"Prevent secrets from leaking between containers through environment variable boundaries.",difficulty:"intermediate",readingMinutes:5,children:[e.jsx(s,{term:"Environment Isolation",definition:"Ensuring that environment variables set in one container are completely invisible to other containers, even on the same Docker network.",example:"The Zerodha API key in the order-executor container cannot be read by the data-feed container.",seeAlso:["API Key Encryption","Process Isolation"]}),e.jsx("h3",{className:"text-lg font-semibold mt-4 mb-2",children:"The Problem with Shared Environments"}),e.jsx(t,{language:"bash",title:"Common insecure patterns",code:`# WRONG: Shared .env file with all keys
# .env
# ZERODHA_API_KEY=xxx
# DELTA_API_KEY=yyy
# DB_PASSWORD=zzz
# All containers see ALL secrets

# WRONG: Docker Compose env_file shared across services
# services:
#   bot:
#     env_file: .env     # bot sees DB_PASSWORD
#   database:
#     env_file: .env     # database sees API keys`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"NemoClaw Isolated Environments"}),e.jsx(t,{language:"yaml",title:"Per-container secret injection",code:`# nemoclaw-compose.yaml
services:
  order-executor:
    image: nemoclaw/trading-base:3.11
    secrets:
      vault_keys:
        - zerodha/api_key
        - zerodha/api_secret
    env_isolation: strict

  data-feed:
    image: nemoclaw/trading-base:3.11
    secrets:
      vault_keys:
        - zerodha/api_key   # Read-only market data key
    env_isolation: strict

  database:
    image: postgres:16-alpine
    secrets:
      vault_keys:
        - db/password
    env_isolation: strict`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Verify Isolation"}),e.jsx(t,{language:"bash",title:"Test that secrets are isolated",code:`# From the data-feed container, try to access order secrets
nemoclaw exec data-feed -- printenv | grep -i zerodha
# Should only show the read-only market data key

# Verify /proc/environ is protected
nemoclaw exec data-feed -- cat /proc/1/environ
# Expected: Permission denied (blocked by ClawGuard)`}),e.jsxs(a,{type:"warning",title:"Proc Filesystem Leaks",children:["Without ClawGuard, any process can read ",e.jsx("code",{children:"/proc/[pid]/environ"})," to extract environment variables. NemoClaw's seccomp profile blocks this access path."]}),e.jsxs(a,{type:"tip",title:"Audit Secret Access",children:["Enable secret access logging to track which container accessed which key:",e.jsx("code",{className:"block mt-1",children:"nemoclaw vault audit --last 24h"})]})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));function P(){return e.jsxs(i,{title:"Credential Rotation",subtitle:"Automate API key rotation and maintain audit logs for compliance.",difficulty:"advanced",readingMinutes:5,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"Regular credential rotation limits the window of exposure if a key is compromised. NemoClaw supports automated rotation with zero-downtime container restarts."}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Rotation Policy"}),e.jsx(t,{language:"yaml",title:"/etc/nemoclaw/policies/rotation.yaml",code:`apiVersion: nemoclaw/v1
kind: RotationPolicy
metadata:
  name: trading-rotation

spec:
  secrets:
    zerodha/access_token:
      rotation_interval: 8h    # Kite tokens expire daily
      auto_rotate: true
      rotate_command: nemoclaw-kite-refresh
      notify_on_failure: true

    delta/api_key:
      rotation_interval: 30d
      auto_rotate: false        # Manual rotation with reminder
      notify_before_expiry: 7d

    db/password:
      rotation_interval: 90d
      auto_rotate: true
      rotate_command: nemoclaw-db-rotate

  notifications:
    channel: webhook
    url: http://localhost:9090/alerts`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Manual Rotation"}),e.jsx(t,{language:"bash",title:"Rotate a credential",code:`# Rotate a specific secret
nemoclaw vault rotate zerodha/api_secret
# Prompts for new value, encrypts, and restarts affected containers

# Rotate with zero downtime (blue-green)
nemoclaw vault rotate zerodha/api_secret --zero-downtime
# Spins up new container with new key, drains old container, then removes it

# View rotation history
nemoclaw vault history zerodha/api_secret
# 2026-03-29T10:00:00Z rotated (auto)
# 2026-03-28T10:00:00Z rotated (auto)
# 2026-03-15T14:22:00Z rotated (manual)`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Audit Logging"}),e.jsx(t,{language:"bash",title:"Review audit trail",code:`# View all secret access events
nemoclaw audit --type secret-access --last 7d

# Sample output:
# 2026-03-29T09:15:02Z READ  zerodha/api_key     container=order-executor
# 2026-03-29T09:15:02Z READ  zerodha/api_secret  container=order-executor
# 2026-03-29T10:00:01Z ROTATE zerodha/access_token auto=true
# 2026-03-29T10:00:03Z READ  zerodha/access_token container=order-executor

# Export audit log for compliance
nemoclaw audit export --format csv --output audit-march.csv`}),e.jsxs(a,{type:"warning",title:"Kite Connect Token Expiry",children:["Zerodha Kite access tokens expire daily. Configure auto-rotation with the",e.jsx("code",{children:" nemoclaw-kite-refresh"})," script to avoid trading interruptions during market hours."]}),e.jsxs(a,{type:"tip",title:"Test Rotation in Staging",children:["Always test rotation in a paper-trading environment first:",e.jsx("code",{className:"block mt-1",children:"nemoclaw vault rotate --dry-run zerodha/api_secret"})]})]})}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));function E(){return e.jsxs(i,{title:"Firewall Rules",subtitle:"Configure UFW and iptables to protect trading system ports and restrict inbound access.",difficulty:"intermediate",readingMinutes:5,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"Even within WSL2, a host-level firewall prevents unauthorized access to trading services like Grafana dashboards, Redis caches, and database ports."}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"UFW Setup"}),e.jsx(t,{language:"bash",title:"Basic UFW configuration",code:`# Install and enable UFW
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (if needed for remote access)
sudo ufw allow 22/tcp

# Allow Grafana dashboard (localhost only)
sudo ufw allow from 127.0.0.1 to any port 3000

# Allow NemoClaw health endpoint
sudo ufw allow from 127.0.0.1 to any port 9090

# Enable the firewall
sudo ufw enable
sudo ufw status verbose`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"iptables for Docker Networks"}),e.jsx(t,{language:"bash",title:"Restrict Docker bridge traffic",code:`# Block external access to Docker-published ports
# Only allow localhost connections to trading services
sudo iptables -I DOCKER-USER -i eth0 -j DROP
sudo iptables -I DOCKER-USER -i eth0 -s 127.0.0.1 -j ACCEPT
sudo iptables -I DOCKER-USER -i eth0 -s 172.16.0.0/12 -j ACCEPT

# Save iptables rules to persist across restarts
sudo apt install -y iptables-persistent
sudo netfilter-persistent save

# Verify rules
sudo iptables -L DOCKER-USER -v -n`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Port Inventory"}),e.jsx(t,{language:"bash",title:"Audit open ports",code:`# List all listening ports
sudo ss -tlnp

# Expected trading system ports:
# 3000  - Grafana (monitoring dashboard)
# 5432  - PostgreSQL (historical data)
# 6379  - Redis (cache/pub-sub)
# 8080  - NemoClaw API
# 9090  - Health/metrics endpoint`}),e.jsxs(a,{type:"warning",title:"Docker Bypasses UFW",children:["Docker modifies iptables directly and can bypass UFW rules. Always use the",e.jsx("code",{children:" DOCKER-USER"})," chain for Docker-specific firewall rules, not just UFW."]}),e.jsxs(a,{type:"tip",title:"Bind to Localhost",children:["When possible, bind services to 127.0.0.1 instead of 0.0.0.0 in your docker-compose.yml: ",e.jsx("code",{children:'ports: ["127.0.0.1:3000:3000"]'})]})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));function T(){return e.jsxs(i,{title:"SSL/TLS Configuration",subtitle:"Encrypt local service communication and manage certificates for trading infrastructure.",difficulty:"advanced",readingMinutes:5,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"Even on localhost, TLS prevents packet sniffing of API keys and order data by other processes. This is defense-in-depth against local privilege escalation."}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Generate a Local CA"}),e.jsx(t,{language:"bash",title:"Create a self-signed CA for NemoClaw services",code:`# Create CA directory
mkdir -p ~/.nemoclaw/tls && cd ~/.nemoclaw/tls

# Generate CA private key
openssl genrsa -out ca.key 4096

# Generate CA certificate (valid 3 years)
openssl req -x509 -new -nodes -key ca.key -sha256   -days 1095 -out ca.crt   -subj "/CN=NemoClaw Local CA/O=NemoClaw"`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Generate Service Certificates"}),e.jsx(t,{language:"bash",title:"Certificate for Grafana and internal services",code:`# Generate service key
openssl genrsa -out service.key 2048

# Create certificate signing request
openssl req -new -key service.key -out service.csr   -subj "/CN=localhost/O=NemoClaw"

# Create extension file for SANs
cat > service.ext << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
subjectAltName=@alt_names
[alt_names]
DNS.1 = localhost
DNS.2 = nemoclaw-grafana
DNS.3 = nemoclaw-api
IP.1 = 127.0.0.1
EOF

# Sign with CA
openssl x509 -req -in service.csr -CA ca.crt -CAkey ca.key   -CAcreateserial -out service.crt -days 365   -sha256 -extfile service.ext`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Apply to Services"}),e.jsx(t,{language:"yaml",title:"docker-compose.yml TLS config",code:`services:
  grafana:
    volumes:
      - ~/.nemoclaw/tls/service.crt:/etc/ssl/certs/grafana.crt:ro
      - ~/.nemoclaw/tls/service.key:/etc/ssl/private/grafana.key:ro
    environment:
      GF_SERVER_PROTOCOL: https
      GF_SERVER_CERT_FILE: /etc/ssl/certs/grafana.crt
      GF_SERVER_CERT_KEY: /etc/ssl/private/grafana.key`}),e.jsxs(a,{type:"tip",title:"Trust the CA in Your Browser",children:["Import ",e.jsx("code",{children:"ca.crt"})," into your Windows certificate store to avoid browser warnings:",e.jsx("code",{className:"block mt-1",children:"certutil -addstore Root ca.crt"})]}),e.jsxs(a,{type:"warning",title:"Protect Private Keys",children:["Set strict permissions on key files. Never mount them as writable in containers:",e.jsx("code",{className:"block mt-1",children:"chmod 600 ~/.nemoclaw/tls/*.key"})]})]})}const X=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));function I(){return e.jsxs(i,{title:"Intrusion Detection & Monitoring",subtitle:"Set up alerting, fail2ban, and log monitoring to detect and respond to security events.",difficulty:"advanced",readingMinutes:6,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"NemoClaw Alert System"}),e.jsx(t,{language:"yaml",title:"/etc/nemoclaw/policies/alerts.yaml",code:`apiVersion: nemoclaw/v1
kind: AlertPolicy
metadata:
  name: trading-alerts

spec:
  rules:
    - name: blocked-egress
      condition: network.egress.blocked > 0
      severity: high
      message: "Outbound connection blocked: {{ .destination }}"

    - name: policy-violation
      condition: clawguard.violation.count > 0
      severity: critical
      message: "Security policy violation in {{ .container }}"

    - name: resource-limit-hit
      condition: container.memory.usage > 90%
      severity: warning
      message: "Container {{ .name }} at {{ .usage }}% memory"

  notifications:
    - type: webhook
      url: http://localhost:9090/alerts
    - type: log
      path: /var/log/nemoclaw/alerts.log`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Install and Configure fail2ban"}),e.jsx(t,{language:"bash",title:"Protect exposed services",code:`# Install fail2ban
sudo apt install -y fail2ban

# Create NemoClaw jail configuration
sudo tee /etc/fail2ban/jail.d/nemoclaw.conf << 'EOF'
[nemoclaw-api]
enabled = true
port = 8080
filter = nemoclaw-api
logpath = /var/log/nemoclaw/access.log
maxretry = 5
bantime = 3600
findtime = 600

[nemoclaw-grafana]
enabled = true
port = 3000
filter = grafana
logpath = /var/log/grafana/grafana.log
maxretry = 3
bantime = 7200
EOF

sudo systemctl enable fail2ban
sudo systemctl start fail2ban`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Log Monitoring"}),e.jsx(t,{language:"bash",title:"Real-time monitoring commands",code:`# Watch all NemoClaw security events
nemoclaw monitor --follow

# Watch for specific event types
nemoclaw monitor --filter "severity=critical" --follow

# Aggregate daily security report
nemoclaw audit report --period 24h

# Sample report output:
# Security Report (last 24h)
# ─────────────────────────
# Policy violations:     0
# Blocked connections:   12
# Failed auth attempts:  3
# Credential accesses:   48
# Container restarts:    1`}),e.jsxs(a,{type:"tip",title:"Grafana Dashboard",children:["Import the NemoClaw security dashboard into Grafana for visual monitoring:",e.jsx("code",{className:"block mt-1",children:"nemoclaw grafana import --dashboard security-overview"}),"This shows real-time graphs of blocked connections, policy violations, and resource usage."]}),e.jsx(a,{type:"important",title:"Respond to Critical Alerts",children:'A "policy-violation" alert with severity "critical" means a container attempted a blocked operation. Investigate immediately -- this could indicate a compromised dependency or a misconfigured strategy.'})]})}const $=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"}));export{h as C,D as a,z as b,G as c,L as d,F as e,V as f,W as g,K as h,q as i,B as j,H as k,U as l,Z as m,Y as n,X as o,$ as p,R as s};
