import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center max-w-md">
        <div className="text-7xl font-extrabold text-[#FF6600] mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Page Not Found</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">The page you are looking for does not exist or may have been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6600] text-white font-medium rounded-lg hover:bg-[#cc5200] transition-colors"><Home size={16} />Back to Home</Link>
      </motion.div>
    </div>
  )
}
