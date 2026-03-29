export default {
  id: '01-wsl2-foundation',
  title: 'Windows WSL2 Foundation',
  icon: '🖥️',
  colorHex: '#3b82f6',
  description: 'Set up Windows with WSL2 as a robust development environment for autonomous trading systems.',
  difficulty: 'beginner',
  estimatedHours: 3,
  prerequisites: [],
  chapters: [
    {
      id: 'c1-windows-prep',
      title: 'Windows Preparation',
      description: 'Prepare your Windows machine for WSL2 with virtualization and required features.',
      estimatedMinutes: 45,
      sections: [
        { id: 's1-system-requirements', title: 'System Requirements & BIOS Virtualization', difficulty: 'beginner', readingMinutes: 12, description: 'Hardware requirements, BIOS settings, and Windows version checks.' },
        { id: 's2-windows-features', title: 'Windows Features & Updates', difficulty: 'beginner', readingMinutes: 10, description: 'Enable Hyper-V, Virtual Machine Platform, and WSL feature.' },
        { id: 's3-wsl2-installation', title: 'WSL2 Installation & Kernel Update', difficulty: 'beginner', readingMinutes: 15, description: 'Install WSL2, update the Linux kernel, and set defaults.' },
      ],
    },
    {
      id: 'c2-ubuntu-wsl2',
      title: 'Ubuntu on WSL2',
      description: 'Install and configure Ubuntu as your primary Linux distribution on WSL2.',
      estimatedMinutes: 45,
      sections: [
        { id: 's1-distro-setup', title: 'Distro Installation & Configuration', difficulty: 'beginner', readingMinutes: 12, description: 'Install Ubuntu 22.04, create user, initial setup.' },
        { id: 's2-filesystem-networking', title: 'Filesystem & Networking Basics', difficulty: 'beginner', readingMinutes: 15, description: 'Linux filesystem layout, /mnt/c access, networking in WSL2.' },
        { id: 's3-systemd-services', title: 'systemd & Service Management', difficulty: 'beginner', readingMinutes: 12, description: 'Enable systemd, manage services, auto-start configuration.' },
      ],
    },
    {
      id: 'c3-dev-environment',
      title: 'Development Environment',
      description: 'Set up terminal, version control, and language runtimes for trading development.',
      estimatedMinutes: 45,
      sections: [
        { id: 's1-terminal-setup', title: 'Terminal Setup (Windows Terminal + Zsh)', difficulty: 'beginner', readingMinutes: 15, description: 'Configure Windows Terminal profiles and Oh My Zsh.' },
        { id: 's2-git-ssh-github', title: 'Git, SSH Keys & GitHub CLI', difficulty: 'beginner', readingMinutes: 12, description: 'Git configuration, SSH key generation, and gh CLI setup.' },
        { id: 's3-python-node-packages', title: 'Python, Node.js & Package Managers', difficulty: 'beginner', readingMinutes: 15, description: 'Install pyenv, nvm, pip, and npm for development.' },
      ],
    },
    {
      id: 'c4-docker-wsl2',
      title: 'Docker on WSL2',
      description: 'Install Docker Engine and learn containerization for trading infrastructure.',
      estimatedMinutes: 45,
      sections: [
        { id: 's1-docker-installation', title: 'Docker Desktop vs Docker Engine', difficulty: 'beginner', readingMinutes: 15, description: 'Install Docker Engine directly on WSL2 without Docker Desktop.' },
        { id: 's2-container-fundamentals', title: 'Container Fundamentals', difficulty: 'beginner', readingMinutes: 15, description: 'Images, containers, volumes, and networking basics.' },
        { id: 's3-docker-compose', title: 'Docker Compose & Networking', difficulty: 'beginner', readingMinutes: 15, description: 'Multi-container applications with compose files.' },
      ],
    },
  ],
}
