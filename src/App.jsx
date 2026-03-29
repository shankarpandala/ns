import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import useTheme from './hooks/useTheme'

const HomePage = lazy(() => import('./pages/HomePage'))
const SubjectPage = lazy(() => import('./pages/SubjectPage'))
const ChapterPage = lazy(() => import('./pages/ChapterPage'))
const SectionPage = lazy(() => import('./pages/SectionPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-3 border-gray-200 dark:border-gray-700 border-t-[#FF6600] rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  useTheme()

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 min-w-0 transition-all duration-300 lg:ml-[280px]">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/subjects/:subjectId" element={<SubjectPage />} />
                <Route path="/subjects/:subjectId/:chapterId" element={<ChapterPage />} />
                <Route path="/subjects/:subjectId/:chapterId/:sectionId" element={<SectionPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </main>
        </div>
      </div>
    </HashRouter>
  )
}
