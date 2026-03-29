import{j as e,C as k,a as w,b as v,c as j,B as f,d as S,T as x,L as N,I as W,e as L}from"./vendor-ui-BRJLAnmZ.js";import{r as m}from"./vendor-react-DsRxi-pb.js";import{h as p,o as C,a as I}from"./vendor-code-CrB9-eEj.js";const q={id:"01-wsl2-foundation",title:"Windows WSL2 Foundation",icon:"🖥️",colorHex:"#3b82f6",description:"Set up Windows with WSL2 as a robust development environment for autonomous trading systems.",difficulty:"beginner",estimatedHours:3,prerequisites:[],chapters:[{id:"c1-windows-prep",title:"Windows Preparation",description:"Prepare your Windows machine for WSL2 with virtualization and required features.",estimatedMinutes:45,sections:[{id:"s1-system-requirements",title:"System Requirements & BIOS Virtualization",difficulty:"beginner",readingMinutes:12,description:"Hardware requirements, BIOS settings, and Windows version checks."},{id:"s2-windows-features",title:"Windows Features & Updates",difficulty:"beginner",readingMinutes:10,description:"Enable Hyper-V, Virtual Machine Platform, and WSL feature."},{id:"s3-wsl2-installation",title:"WSL2 Installation & Kernel Update",difficulty:"beginner",readingMinutes:15,description:"Install WSL2, update the Linux kernel, and set defaults."}]},{id:"c2-ubuntu-wsl2",title:"Ubuntu on WSL2",description:"Install and configure Ubuntu as your primary Linux distribution on WSL2.",estimatedMinutes:45,sections:[{id:"s1-distro-setup",title:"Distro Installation & Configuration",difficulty:"beginner",readingMinutes:12,description:"Install Ubuntu 22.04, create user, initial setup."},{id:"s2-filesystem-networking",title:"Filesystem & Networking Basics",difficulty:"beginner",readingMinutes:15,description:"Linux filesystem layout, /mnt/c access, networking in WSL2."},{id:"s3-systemd-services",title:"systemd & Service Management",difficulty:"beginner",readingMinutes:12,description:"Enable systemd, manage services, auto-start configuration."}]},{id:"c3-dev-environment",title:"Development Environment",description:"Set up terminal, version control, and language runtimes for trading development.",estimatedMinutes:45,sections:[{id:"s1-terminal-setup",title:"Terminal Setup (Windows Terminal + Zsh)",difficulty:"beginner",readingMinutes:15,description:"Configure Windows Terminal profiles and Oh My Zsh."},{id:"s2-git-ssh-github",title:"Git, SSH Keys & GitHub CLI",difficulty:"beginner",readingMinutes:12,description:"Git configuration, SSH key generation, and gh CLI setup."},{id:"s3-python-node-packages",title:"Python, Node.js & Package Managers",difficulty:"beginner",readingMinutes:15,description:"Install pyenv, nvm, pip, and npm for development."}]},{id:"c4-docker-wsl2",title:"Docker on WSL2",description:"Install Docker Engine and learn containerization for trading infrastructure.",estimatedMinutes:45,sections:[{id:"s1-docker-installation",title:"Docker Desktop vs Docker Engine",difficulty:"beginner",readingMinutes:15,description:"Install Docker Engine directly on WSL2 without Docker Desktop."},{id:"s2-container-fundamentals",title:"Container Fundamentals",difficulty:"beginner",readingMinutes:15,description:"Images, containers, volumes, and networking basics."},{id:"s3-docker-compose",title:"Docker Compose & Networking",difficulty:"beginner",readingMinutes:15,description:"Multi-container applications with compose files."}]}]},b={beginner:{label:"Beginner",color:"bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"},intermediate:{label:"Intermediate",color:"bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"},advanced:{label:"Advanced",color:"bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"}};function l({title:r,subtitle:n,difficulty:o,readingMinutes:i,children:d}){const a=b[o]??b.beginner;return e.jsxs("section",{className:"my-8",children:[e.jsxs("div",{className:"rounded-t-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-orange-950/40 dark:via-gray-900 dark:to-amber-950/40 border border-b-0 border-gray-200 dark:border-gray-700 px-6 py-6",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 mb-2",children:[o&&e.jsxs("span",{className:`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${a.color}`,children:[e.jsx(k,{size:12}),a.label]}),i&&e.jsxs("span",{className:"inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400",children:[e.jsx(w,{size:12}),i," min read"]})]}),e.jsx("h2",{className:"text-2xl font-bold text-gray-900 dark:text-gray-100",children:r}),n&&e.jsx("p",{className:"mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-2xl",children:n})]}),e.jsx("div",{className:"rounded-b-2xl border border-t-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-6",children:d})]})}const M={bash:"Bash",yaml:"YAML",python:"Python",json:"JSON",javascript:"JavaScript",toml:"TOML",powershell:"PowerShell"};function t({code:r,language:n="bash",title:o,copyable:i=!0}){const[d,a]=m.useState(!1),u=m.useCallback(async()=>{try{await navigator.clipboard.writeText(r),a(!0),setTimeout(()=>a(!1),2e3)}catch{}},[r]);return e.jsxs("div",{className:"rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 my-4 shadow-sm",children:[o&&e.jsx("div",{className:"flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60",children:e.jsx("span",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:o})}),e.jsxs("div",{className:"relative group",children:[e.jsx("span",{className:"absolute top-3 right-3 z-10 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-200/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 select-none",children:M[n]??n}),i&&e.jsx("button",{onClick:u,"aria-label":d?"Copied":"Copy code",className:"absolute top-3 right-20 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-pointer",children:d?e.jsx(v,{size:14}):e.jsx(j,{size:14})}),e.jsx("div",{className:"block dark:hidden",children:e.jsx(p,{language:n,style:C,showLineNumbers:!0,wrapLongLines:!0,customStyle:{margin:0,padding:"1rem",fontSize:"0.85rem",background:"transparent"},children:r})}),e.jsx("div",{className:"hidden dark:block",children:e.jsx(p,{language:n,style:I,showLineNumbers:!0,wrapLongLines:!0,customStyle:{margin:0,padding:"1rem",fontSize:"0.85rem",background:"transparent"},children:r})})]})]})}const h={info:{icon:W,border:"border-blue-400 dark:border-blue-500",bg:"bg-blue-50 dark:bg-blue-950/40",iconColor:"text-blue-500 dark:text-blue-400",titleColor:"text-blue-800 dark:text-blue-300",defaultTitle:"Info"},tip:{icon:N,border:"border-emerald-400 dark:border-emerald-500",bg:"bg-emerald-50 dark:bg-emerald-950/40",iconColor:"text-emerald-500 dark:text-emerald-400",titleColor:"text-emerald-800 dark:text-emerald-300",defaultTitle:"Tip"},warning:{icon:x,border:"border-amber-400 dark:border-amber-500",bg:"bg-amber-50 dark:bg-amber-950/40",iconColor:"text-amber-500 dark:text-amber-400",titleColor:"text-amber-800 dark:text-amber-300",defaultTitle:"Warning"},important:{icon:S,border:"border-red-400 dark:border-red-500",bg:"bg-red-50 dark:bg-red-950/40",iconColor:"text-red-500 dark:text-red-400",titleColor:"text-red-800 dark:text-red-300",defaultTitle:"Important"},historical:{icon:f,border:"border-purple-400 dark:border-purple-500",bg:"bg-purple-50 dark:bg-purple-950/40",iconColor:"text-purple-500 dark:text-purple-400",titleColor:"text-purple-800 dark:text-purple-300",defaultTitle:"Historical Context"}};function s({type:r="info",title:n,children:o}){const[i,d]=m.useState(!1),a=h[r]??h.info,u=a.icon;return e.jsxs("div",{className:`my-4 rounded-xl border-l-4 ${a.border} ${a.bg} overflow-hidden`,children:[e.jsxs("button",{type:"button",onClick:()=>d(y=>!y),className:"flex w-full items-center gap-2 px-4 py-3 cursor-pointer select-none",children:[e.jsx(u,{size:18,className:a.iconColor}),e.jsx("span",{className:`text-sm font-semibold ${a.titleColor}`,children:n??a.defaultTitle}),e.jsx(L,{size:16,className:`ml-auto transition-transform ${a.iconColor} ${i?"-rotate-90":""}`})]}),!i&&e.jsx("div",{className:"px-4 pb-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed",children:o})]})}function c({term:r,definition:n,example:o,seeAlso:i}){return e.jsxs("div",{className:"my-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm",children:[e.jsxs("div",{className:"flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-gray-700",children:[e.jsx(f,{size:18,className:"text-slate-500 dark:text-slate-400"}),e.jsx("span",{className:"text-base font-bold text-slate-800 dark:text-slate-200",children:r})]}),e.jsxs("div",{className:"px-4 py-4 space-y-3",children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 leading-relaxed",children:n}),o&&e.jsxs("div",{className:"rounded-lg bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border border-gray-100 dark:border-gray-700",children:[e.jsx("span",{className:"block text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1",children:"Example"}),e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300",children:o})]}),i&&i.length>0&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 pt-1",children:[e.jsx("span",{className:"text-xs text-gray-400 dark:text-gray-500",children:"See also:"}),i.map((d,a)=>e.jsx("span",{className:"text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700",children:d},a))]})]})]})}function P(){return e.jsxs(l,{title:"System Requirements",subtitle:"Verify your hardware and Windows version support WSL2 virtualization.",difficulty:"beginner",readingMinutes:4,children:[e.jsx(c,{term:"Hardware Virtualization (VT-x / AMD-V)",definition:"A CPU feature that allows the processor to run multiple isolated virtual machines efficiently. Required by WSL2's Hyper-V backend.",example:"Intel VT-x is enabled in BIOS under Advanced > CPU Configuration."}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Minimum Hardware"}),e.jsxs("ul",{className:"list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300",children:[e.jsx("li",{children:"64-bit processor with Second Level Address Translation (SLAT)"}),e.jsx("li",{children:"8 GB RAM minimum (16 GB recommended for trading workloads)"}),e.jsx("li",{children:"50 GB free disk space on SSD (NVMe preferred for Docker layers)"}),e.jsx("li",{children:"BIOS virtualization enabled (VT-x for Intel, AMD-V for AMD)"})]}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Check BIOS Virtualization from Windows"}),e.jsx(t,{language:"powershell",title:"PowerShell - Check Virtualization Support",code:`# Open Task Manager > Performance > CPU and look for "Virtualization: Enabled"
# Or run from PowerShell:
systeminfo | Select-String "Hyper-V Requirements"

# Expected output should show:
#   VM Monitor Mode Extensions: Yes
#   Virtualization Enabled In Firmware: Yes`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Windows Version Requirements"}),e.jsx(t,{language:"powershell",title:"Verify Windows Build",code:`# Windows 10 version 2004+ (Build 19041+) or Windows 11
winver
# Or via PowerShell:
[System.Environment]::OSVersion.Version

# Minimum builds:
#   Windows 10: Build 19041 (May 2020 Update)
#   Windows 11: Any build supports WSL2`}),e.jsx(s,{type:"warning",title:"Enable Virtualization in BIOS",children:"If virtualization is disabled, reboot into BIOS/UEFI (usually F2, F10, or Del during boot). Navigate to Advanced > CPU Configuration and enable Intel VT-x or AMD SVM Mode. Save and exit. Without this, WSL2 will fail to start."}),e.jsx(s,{type:"tip",title:"RAM Planning for Trading",children:"A typical NemoClaw setup runs Docker containers for data feeds, strategy engines, and monitoring. Budget 4 GB for WSL2, 2 GB for Docker overhead, and 2-4 GB per active trading container."})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));function g({title:r,steps:n}){return e.jsxs("div",{className:"my-6",children:[r&&e.jsx("h4",{className:"font-semibold text-gray-900 dark:text-gray-100 mb-4",children:r}),e.jsx("div",{className:"space-y-4",children:n.map((o,i)=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx("div",{className:"flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6600] text-white flex items-center justify-center font-semibold text-sm",children:i+1}),e.jsxs("div",{className:"flex-1 pt-1",children:[e.jsx("h5",{className:"font-medium text-gray-900 dark:text-gray-100 mb-1",children:o.title}),e.jsx("div",{className:"text-gray-700 dark:text-gray-300 text-sm leading-relaxed",children:o.content})]})]},i))})]})}function T(){return e.jsxs(l,{title:"Enable Windows Features",subtitle:"Activate Hyper-V, Virtual Machine Platform, and WSL before installing a Linux distro.",difficulty:"beginner",readingMinutes:5,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"WSL2 runs a real Linux kernel inside a lightweight Hyper-V virtual machine. Three Windows features must be enabled before installation."}),e.jsx(g,{title:"Enable Required Features",steps:[{title:"Open PowerShell as Administrator",content:'Right-click the Start menu and select "Windows Terminal (Admin)" or "PowerShell (Admin)".'},{title:"Enable Windows Subsystem for Linux",content:e.jsx(t,{code:"dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart",language:"powershell"})},{title:"Enable Virtual Machine Platform",content:e.jsx(t,{code:"dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart",language:"powershell"})},{title:"Enable Hyper-V (Windows Pro/Enterprise)",content:e.jsx(t,{code:`# Only needed on Pro/Enterprise. Home edition uses Virtual Machine Platform only.
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart`,language:"powershell"})},{title:"Restart your machine",content:"A full restart is required for the kernel-level features to take effect."}]}),e.jsx(s,{type:"info",title:"Windows Home Edition",children:"Windows Home does not include Hyper-V, but WSL2 still works using the Virtual Machine Platform feature alone. Skip Step 4 if you are on Home edition."}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Verify Features Are Active"}),e.jsx(t,{language:"powershell",title:"Check enabled features",code:`Get-WindowsOptionalFeature -Online | Where-Object {
  $_.FeatureName -match "Microsoft-Windows-Subsystem-Linux|VirtualMachinePlatform"
} | Select-Object FeatureName, State`}),e.jsx(s,{type:"tip",title:"GUI Alternative",children:'You can also enable these from Control Panel > Programs > Turn Windows features on or off. Check the boxes for "Windows Subsystem for Linux" and "Virtual Machine Platform".'})]})}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));function D(){return e.jsxs(l,{title:"WSL2 Installation",subtitle:"Install WSL2, update the kernel, and set it as the default version.",difficulty:"beginner",readingMinutes:4,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Quick Install (Windows 10 2004+ / Windows 11)"}),e.jsx(t,{language:"powershell",title:"One-command WSL install",code:`# This installs WSL2 with Ubuntu as the default distro
wsl --install

# If you already have WSL1, upgrade to WSL2:
wsl --set-default-version 2`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Update the WSL2 Linux Kernel"}),e.jsx(t,{language:"powershell",title:"Kernel update",code:`# Download and install the latest WSL2 kernel update
wsl --update

# Verify the kernel version
wsl --version`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Set WSL2 as Default"}),e.jsx(t,{language:"powershell",title:"Set default version",code:`# Ensure all future distros use WSL2
wsl --set-default-version 2

# If you have an existing WSL1 distro, convert it:
wsl --set-version Ubuntu 2`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Verify Installation"}),e.jsx(t,{language:"powershell",title:"List installed distributions",code:`wsl --list --verbose

# Expected output:
#   NAME      STATE    VERSION
# * Ubuntu    Running  2`}),e.jsxs(s,{type:"warning",title:"Kernel Update Required",children:["If you see error 0x80370102, the kernel package is missing. Run ",e.jsx("code",{children:"wsl --update"})," and restart. On older Windows 10 builds, you may need to manually download the kernel package from the Microsoft docs site."]}),e.jsxs(s,{type:"tip",title:"WSL Configuration",children:["Create ",e.jsx("code",{children:"%USERPROFILE%\\.wslconfig"})," to control global WSL2 settings like memory limits and swap. This is critical for trading workloads where you want predictable resource allocation."]}),e.jsx(t,{language:"toml",title:"%USERPROFILE%\\\\.wslconfig",code:`[wsl2]
memory=8GB
swap=4GB
processors=4
localhostForwarding=true`})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function O(){return e.jsxs(l,{title:"Ubuntu Distro Setup",subtitle:"Install Ubuntu 22.04 on WSL2 and configure your initial user account.",difficulty:"beginner",readingMinutes:4,children:[e.jsx(g,{title:"Install Ubuntu 22.04 LTS",steps:[{title:"List available distributions",content:e.jsx(t,{code:"wsl --list --online",language:"powershell"})},{title:"Install Ubuntu 22.04",content:e.jsx(t,{code:"wsl --install -d Ubuntu-22.04",language:"powershell"})},{title:"Create your UNIX user",content:"When Ubuntu launches for the first time, enter a username and password. This user gets sudo privileges automatically."},{title:"Update system packages",content:e.jsx(t,{code:"sudo apt update && sudo apt upgrade -y",language:"bash"})}]}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Install Essential Build Tools"}),e.jsx(t,{language:"bash",title:"Core development packages",code:`sudo apt install -y build-essential curl wget git unzip \\
  software-properties-common ca-certificates gnupg lsb-release`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Set Default Distro"}),e.jsx(t,{language:"powershell",title:"From Windows PowerShell",code:`# Make Ubuntu-22.04 the default when you type 'wsl'
wsl --set-default Ubuntu-22.04`}),e.jsxs(s,{type:"tip",title:"Multiple Distros",children:["You can run multiple Linux distros side by side. Use one for development and another for isolated trading bot testing. Switch with ",e.jsx("code",{children:"wsl -d DistroName"}),"."]}),e.jsx(s,{type:"info",title:"Why Ubuntu 22.04?",children:"Ubuntu 22.04 LTS provides long-term support until 2027, has excellent Docker compatibility, and is the most widely documented distro for WSL2 development workflows."})]})}const J=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs(l,{title:"Filesystem & Networking",subtitle:"Understand cross-OS file access, performance implications, and WSL2 network configuration.",difficulty:"beginner",readingMinutes:5,children:[e.jsx(c,{term:"9P Protocol",definition:"The protocol WSL2 uses to mount Windows drives (like /mnt/c) inside Linux. It is significantly slower than the native ext4 Linux filesystem.",example:"Accessing /mnt/c/Users/you/project is 5-10x slower than ~/project inside WSL2."}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Filesystem Layout"}),e.jsx(t,{language:"bash",title:"Key paths",code:`# Windows C: drive (slow - avoid for code/builds)
ls /mnt/c/Users/$USER

# Native Linux home (fast - use this for all projects)
ls ~

# Access WSL files from Windows Explorer:
# \\\\wsl$\\Ubuntu-22.04\\home\\youruser`}),e.jsxs(s,{type:"important",title:"Always Work in the Linux Filesystem",children:["Store all NemoClaw code, Docker volumes, and trading data under your Linux home directory (",e.jsx("code",{children:"~/"}),"). Using ",e.jsx("code",{children:"/mnt/c"})," for development causes severe I/O performance penalties and can break file watchers."]}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Configure /etc/wsl.conf"}),e.jsx(t,{language:"toml",title:"/etc/wsl.conf",code:`[automount]
enabled = true
options = "metadata,umask=22,fmask=11"

[network]
generateResolvConf = true
hostname = nemoclaw-dev

[interop]
enabled = true
appendWindowsPath = false  # Keeps Linux PATH clean

[boot]
systemd = true`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Networking Basics"}),e.jsx(t,{language:"bash",title:"Network access patterns",code:`# WSL2 gets its own IP address via virtual NAT
ip addr show eth0

# Access Windows host from WSL2
cat /etc/resolv.conf  # nameserver line = Windows host IP

# Access WSL2 services from Windows
# localhost forwarding works for most ports automatically
curl http://localhost:8080  # from Windows, hits WSL2`}),e.jsxs(s,{type:"tip",title:"Port Forwarding",children:["With ",e.jsx("code",{children:"localhostForwarding=true"})," in ",e.jsx("code",{children:".wslconfig"}),", services running in WSL2 are accessible from Windows via ",e.jsx("code",{children:"localhost"}),". This is essential for accessing trading dashboards from your Windows browser."]})]})}const Q=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function z(){return e.jsxs(l,{title:"Systemd & Services",subtitle:"Enable systemd in WSL2 to manage background services for trading infrastructure.",difficulty:"intermediate",readingMinutes:4,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"WSL2 supports systemd natively since September 2022. This lets you run Docker, cron jobs, and monitoring agents as proper system services."}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Enable Systemd"}),e.jsx(t,{language:"bash",title:"Enable systemd in /etc/wsl.conf",code:`# Add to /etc/wsl.conf (requires WSL 0.67.6+)
sudo tee -a /etc/wsl.conf <<'EOF'
[boot]
systemd=true
EOF

# Restart WSL from PowerShell:
# wsl --shutdown
# Then reopen your Ubuntu terminal`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Verify Systemd Is Running"}),e.jsx(t,{language:"bash",code:`# Should show "systemd" not "init"
ps -p 1 -o comm=

# Check systemd status
systemctl status`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Managing Services"}),e.jsx(t,{language:"bash",title:"Common systemctl commands",code:`# Start Docker daemon
sudo systemctl start docker
sudo systemctl enable docker  # auto-start on boot

# Check service status
systemctl status docker

# List all running services
systemctl list-units --type=service --state=running

# View service logs
journalctl -u docker -f`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Auto-Start Trading Services"}),e.jsx(t,{language:"bash",title:"Create a custom service",code:`sudo tee /etc/systemd/system/nemoclaw-monitor.service <<'EOF'
[Unit]
Description=NemoClaw Health Monitor
After=docker.service

[Service]
Type=simple
ExecStart=/usr/local/bin/nemoclaw-monitor
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable nemoclaw-monitor`}),e.jsxs(s,{type:"warning",title:"WSL Shutdown Behavior",children:["WSL2 shuts down after a period of inactivity (default 8 seconds after last shell closes). Use ",e.jsx("code",{children:"wsl --shutdown"})," from Windows to cleanly stop all services. For persistent services, keep a terminal session open or adjust idle timeout in ",e.jsx("code",{children:".wslconfig"}),"."]})]})}const X=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"}));function E(){return e.jsxs(l,{title:"Terminal Setup",subtitle:"Configure Windows Terminal with Oh My Zsh for an efficient trading development workflow.",difficulty:"beginner",readingMinutes:5,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Install Windows Terminal"}),e.jsx(t,{language:"powershell",title:"From PowerShell",code:`# Install via winget (built into Windows 11, available for Windows 10)
winget install Microsoft.WindowsTerminal`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Install Zsh and Oh My Zsh"}),e.jsx(t,{language:"bash",title:"Inside WSL2 Ubuntu",code:`# Install Zsh
sudo apt install -y zsh

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Set Zsh as default shell
chsh -s $(which zsh)`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Recommended Plugins"}),e.jsx(t,{language:"bash",title:"Install useful plugins",code:`# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions \\
  \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting \\
  \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`}),e.jsx(t,{language:"bash",title:"~/.zshrc plugin configuration",code:`# Edit ~/.zshrc and update the plugins line:
plugins=(
  git
  docker
  docker-compose
  zsh-autosuggestions
  zsh-syntax-highlighting
  kubectl
)`}),e.jsx(s,{type:"tip",title:"Font Setup",children:"Install a Nerd Font (e.g., FiraCode Nerd Font) on Windows for proper icon rendering. Set it in Windows Terminal Settings > Profiles > Ubuntu > Appearance > Font face."}),e.jsxs(s,{type:"info",title:"Terminal Profiles",children:['Windows Terminal lets you create separate profiles for different WSL distros. Create a dedicated "NemoClaw Dev" profile that starts in ',e.jsx("code",{children:"~/nemoclaw"})," with custom color scheme for easy identification."]})]})}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));function A(){return e.jsxs(l,{title:"Git, SSH & GitHub",subtitle:"Configure Git identity, generate SSH keys, and set up GitHub CLI for repository access.",difficulty:"beginner",readingMinutes:5,children:[e.jsx(g,{title:"Git Configuration",steps:[{title:"Set your identity",content:e.jsx(t,{code:`git config --global user.name "Your Name"
git config --global user.email "you@example.com"`,language:"bash"})},{title:"Set useful defaults",content:e.jsx(t,{code:`git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global core.autocrlf input
git config --global core.editor "code --wait"`,language:"bash"})}]}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Generate SSH Key"}),e.jsx(t,{language:"bash",title:"Ed25519 SSH key for GitHub",code:`# Generate a new SSH key
ssh-keygen -t ed25519 -C "you@example.com" -f ~/.ssh/id_ed25519

# Start the SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard (install xclip first)
sudo apt install -y xclip
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
# Paste this key in GitHub > Settings > SSH and GPG keys`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"GitHub CLI"}),e.jsx(t,{language:"bash",title:"Install and authenticate gh",code:`# Install GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \\
  sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | \\
  sudo tee /etc/apt/sources.list.d/github-cli.list
sudo apt update && sudo apt install -y gh

# Authenticate with GitHub
gh auth login  # Choose SSH protocol

# Verify
gh auth status`}),e.jsxs(s,{type:"warning",title:"SSH Key Security",children:["Never share your private key (",e.jsx("code",{children:"~/.ssh/id_ed25519"}),"). For NemoClaw trading repos containing strategy code, consider using a dedicated deploy key with read-only access."]}),e.jsx(t,{language:"bash",title:"Test SSH connection",code:`ssh -T git@github.com
# Expected: "Hi username! You've successfully authenticated..."`})]})}const te=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));function U(){return e.jsxs(l,{title:"Python, Node & Package Managers",subtitle:"Install pyenv for Python version management and nvm for Node.js in your WSL2 environment.",difficulty:"beginner",readingMinutes:5,children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Python via pyenv"}),e.jsx(t,{language:"bash",title:"Install pyenv and Python 3.11",code:`# Install pyenv dependencies
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
python --version`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Node.js via nvm"}),e.jsx(t,{language:"bash",title:"Install nvm and Node.js LTS",code:`# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

# Install Node.js LTS
nvm install --lts
nvm use --lts
node --version && npm --version`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Trading Python Packages"}),e.jsx(t,{language:"bash",title:"Create a virtual environment for trading",code:`# Create project directory and venv
mkdir -p ~/nemoclaw && cd ~/nemoclaw
python -m venv .venv
source .venv/bin/activate

# Install core trading libraries
pip install numpy pandas ta-lib websocket-client
pip install ccxt python-dotenv pydantic
pip install pytest httpx  # for testing`}),e.jsx(s,{type:"warning",title:"Never Use System Python",children:"Always use pyenv + virtual environments. System Python conflicts with apt packages and makes reproducible trading environments impossible."}),e.jsxs(s,{type:"tip",title:"TA-Lib Installation",children:["TA-Lib requires a C library. Install it with:",e.jsx("code",{className:"block mt-1",children:"sudo apt install -y libta-lib-dev"}),"before running ",e.jsx("code",{children:"pip install ta-lib"}),"."]})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));function V({title:r,children:n}){return e.jsxs("div",{className:"my-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 overflow-hidden shadow-sm",children:[e.jsxs("div",{className:"flex items-center gap-2 px-4 py-3 bg-red-100/60 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800",children:[e.jsx(x,{size:18,className:"text-red-500 dark:text-red-400 shrink-0"}),e.jsx("span",{className:"text-sm font-semibold text-red-800 dark:text-red-300",children:r??"Warning"})]}),e.jsx("div",{className:"px-4 py-3 text-sm text-red-700 dark:text-red-300 leading-relaxed",children:n})]})}function H(){return e.jsxs(l,{title:"Docker Engine Installation",subtitle:"Install Docker Engine directly in WSL2 Ubuntu (without Docker Desktop) for full control.",difficulty:"intermediate",readingMinutes:5,children:[e.jsx(V,{title:"Docker Desktop vs Docker Engine",children:"We install Docker Engine directly in WSL2, not Docker Desktop. This gives you full control over daemon configuration, avoids licensing concerns for commercial trading operations, and integrates better with NemoClaw's security model."}),e.jsx("h3",{className:"text-lg font-semibold mt-4 mb-2",children:"Install Docker Engine"}),e.jsx(t,{language:"bash",title:"Official Docker installation",code:`# Remove any old versions
sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \\
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \\
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io \\
  docker-buildx-plugin docker-compose-plugin`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Post-Install Configuration"}),e.jsx(t,{language:"bash",title:"Run Docker without sudo",code:`# Add your user to the docker group
sudo usermod -aG docker $USER

# Apply group changes (or log out and back in)
newgrp docker

# Verify Docker works
docker run hello-world`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Daemon Configuration"}),e.jsx(t,{language:"json",title:"/etc/docker/daemon.json",code:`{
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-address-pools": [
    { "base": "172.20.0.0/16", "size": 24 }
  ]
}`}),e.jsxs(s,{type:"tip",title:"Auto-Start Docker",children:["With systemd enabled, Docker starts automatically:",e.jsx("code",{className:"block mt-1",children:"sudo systemctl enable docker"})]})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"}));function F(){return e.jsxs(l,{title:"Container Fundamentals",subtitle:"Core Docker concepts: images, containers, volumes, and networks for trading infrastructure.",difficulty:"intermediate",readingMinutes:6,children:[e.jsx(c,{term:"Docker Image",definition:"A read-only template containing application code, runtime, libraries, and configuration. Built from a Dockerfile in layers.",example:"python:3.11-slim is a base image; you build your trading bot image on top of it."}),e.jsx(c,{term:"Docker Volume",definition:"Persistent storage that survives container restarts. Critical for trading data, logs, and database files.",example:"A named volume 'market-data' stores historical OHLCV data across container rebuilds."}),e.jsx("h3",{className:"text-lg font-semibold mt-4 mb-2",children:"Essential Commands"}),e.jsx(t,{language:"bash",title:"Image and container management",code:`# Pull a base image
docker pull python:3.11-slim

# Build an image from Dockerfile
docker build -t nemoclaw-bot:latest .

# Run a container with volume and port mapping
docker run -d --name trading-bot \\
  -v market-data:/app/data \\
  -p 8080:8080 \\
  --restart unless-stopped \\
  nemoclaw-bot:latest

# List running containers
docker ps

# View container logs
docker logs -f trading-bot

# Execute a command inside a running container
docker exec -it trading-bot bash`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Volumes for Trading Data"}),e.jsx(t,{language:"bash",title:"Named volumes",code:`# Create named volumes for persistent data
docker volume create market-data
docker volume create strategy-logs
docker volume create backtest-results

# Inspect volume location
docker volume inspect market-data

# Backup a volume
docker run --rm -v market-data:/data -v $(pwd):/backup \\
  alpine tar czf /backup/market-data-backup.tar.gz -C /data .`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Docker Networks"}),e.jsx(t,{language:"bash",title:"Isolated trading network",code:`# Create a dedicated network for trading services
docker network create --driver bridge trading-net

# Run containers on the same network
docker run -d --name redis --network trading-net redis:7-alpine
docker run -d --name bot --network trading-net nemoclaw-bot:latest

# Containers can reach each other by name: redis:6379`}),e.jsxs(s,{type:"tip",title:"Resource Limits",children:["Always set memory limits on trading containers to prevent a runaway strategy from consuming all WSL2 memory:",e.jsx("code",{className:"block mt-1",children:"docker run -m 2g --cpus=2 nemoclaw-bot:latest"})]})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));function R(){return e.jsxs(l,{title:"Docker Compose",subtitle:"Orchestrate multi-container trading applications with Compose files.",difficulty:"intermediate",readingMinutes:6,children:[e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300 mb-4",children:"Docker Compose lets you define and run multi-container applications from a single YAML file. A typical trading setup includes a strategy engine, Redis for caching, a database for historical data, and a monitoring dashboard."}),e.jsx(t,{language:"yaml",title:"docker-compose.yml - Trading Stack",code:`services:
  trading-bot:
    build: ./bot
    container_name: nemoclaw-bot
    restart: unless-stopped
    env_file: .env
    volumes:
      - market-data:/app/data
      - ./strategies:/app/strategies:ro
    networks:
      - trading-net
    depends_on:
      - redis
      - postgres
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: "2.0"

  redis:
    image: redis:7-alpine
    container_name: nemoclaw-redis
    restart: unless-stopped
    volumes:
      - redis-data:/data
    networks:
      - trading-net

  postgres:
    image: postgres:16-alpine
    container_name: nemoclaw-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: nemoclaw
      POSTGRES_USER: trader
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - pg-data:/var/lib/postgresql/data
    networks:
      - trading-net
    secrets:
      - db_password

  grafana:
    image: grafana/grafana:latest
    container_name: nemoclaw-grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - trading-net

volumes:
  market-data:
  redis-data:
  pg-data:
  grafana-data:

networks:
  trading-net:
    driver: bridge

secrets:
  db_password:
    file: ./secrets/db_password.txt`}),e.jsx("h3",{className:"text-lg font-semibold mt-6 mb-2",children:"Common Operations"}),e.jsx(t,{language:"bash",title:"Compose commands",code:`# Start all services in background
docker compose up -d

# View logs across all services
docker compose logs -f

# Restart a single service
docker compose restart trading-bot

# Stop and remove everything (preserves volumes)
docker compose down

# Stop and remove everything INCLUDING volumes
docker compose down -v`}),e.jsxs(s,{type:"warning",title:"Secrets in Compose",children:["Never put API keys or passwords directly in ",e.jsx("code",{children:"docker-compose.yml"}),". Use Docker secrets, ",e.jsx("code",{children:".env"})," files (excluded from git), or NemoClaw's built-in vault integration covered in Subject 02."]}),e.jsxs(s,{type:"tip",title:"Development Overrides",children:["Use ",e.jsx("code",{children:"docker-compose.override.yml"})," for local dev settings like bind mounts and debug ports. Compose merges it automatically."]})]})}const ae=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));export{t as C,c as D,s as N,l as S,V as W,g as a,Z as b,K as c,J as d,Q as e,X as f,ee as g,te as h,se as i,re as j,ne as k,ae as l,Y as s,q as w};
