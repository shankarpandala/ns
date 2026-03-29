import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Bot, BarChart3, Layers, BookOpen, FileText, Clock } from 'lucide-react'
import { curriculum } from '../subjects/index.js'
import SubjectCard from '../components/navigation/SubjectCard'

const stats = [
  { label: 'Subjects', value: '10', icon: Layers },
  { label: 'Chapters', value: '46', icon: BookOpen },
  { label: 'Sections', value: '172', icon: FileText },
  { label: 'Est. Hours', value: '~43', icon: Clock },
]

const features = [
  { title: 'Security-First Trading', description: 'NemoClaw sandbox protects your API keys, trading data, and execution environment from attacks.', icon: Shield },
  { title: 'AI-Powered Analysis', description: 'Claude Max agents analyze markets, debate strategies, and execute trades with optimized token usage.', icon: Bot },
  { title: 'Advanced Order Flow', description: 'Market microstructure, footprint charts, and institutional flow tracking for Indian markets.', icon: BarChart3 },
  { title: 'Autonomous Execution', description: 'Full execution engine for Zerodha Kite and Delta Exchange with risk controls and kill switches.', icon: TrendingUp },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function HomePage() {
  const firstSubject = curriculum[0]

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6600] via-[#cc5200] to-[#993d00] text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHptMC0xMGg0djRoLTR6bTEwIDEwaDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-28 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            NemoClaw Trading Sandbox
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg sm:text-xl text-white/90 font-medium mb-3 max-w-2xl mx-auto">
            Build autonomous trading systems with security-first architecture
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed">
            From Windows WSL2 setup to production execution &mdash; trade Zerodha Kite and Delta Exchange with NemoClaw security, Claude Max AI, and advanced order flow analysis.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
            {firstSubject && (
              <Link to={`/subjects/${firstSubject.id}`} className="inline-flex items-center gap-2 bg-white text-[#993d00] font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all">
                Get Started <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
              <stat.icon size={20} className="mx-auto mb-2 text-[#FF6600]" />
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Curriculum</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Ten subjects covering WSL2 setup through production autonomous trading.</p>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {curriculum.map((subject) => (
            <motion.div key={subject.id} variants={itemVariants}><SubjectCard subject={subject} /></motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">Why NemoClaw Sandbox?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 text-center">Built for traders who want autonomous systems with uncompromising security.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div key={feature.title} whileHover={{ y: -4 }} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <feature.icon size={24} className="text-[#FF6600] mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
