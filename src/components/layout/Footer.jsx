import { Link } from 'react-router-dom'
import { Activity, Github, ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-[#FF6600] flex items-center justify-center">
                <Activity size={16} className="text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">NemoClaw Sandbox</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Build autonomous trading systems with security-first architecture on Windows WSL2.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Links</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/shankarpandala/ns" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"><Github size={14} /> GitHub Repo</a></li>
              <li><a href="https://github.com/shankarpandala/quant-finance" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"><ExternalLink size={14} /> Quant Finance</a></li>
              <li><Link to="/progress" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"><ExternalLink size={14} /> My Progress</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Built with</h4>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <li>React 19</li>
              <li>Tailwind CSS 4</li>
              <li>Framer Motion</li>
              <li>Vite</li>
              <li>Zustand</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {year}{' '}<a href="https://www.pandala.in" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">pandala.in</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
