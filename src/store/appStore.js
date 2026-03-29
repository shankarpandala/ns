import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { curriculum } from '../subjects/index.js'
import { STORAGE_KEY } from '../utils/constants.js'

const useAppStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',

      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'light' ? 'dark' : 'light'
          document.documentElement.classList.toggle('dark', next === 'dark')
          return { theme: next }
        }),

      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      completedSections: [],

      markSectionComplete: (sectionPath) =>
        set((state) => ({
          completedSections: state.completedSections.includes(sectionPath)
            ? state.completedSections
            : [...state.completedSections, sectionPath],
        })),

      unmarkSectionComplete: (sectionPath) =>
        set((state) => ({
          completedSections: state.completedSections.filter((s) => s !== sectionPath),
        })),

      isComplete: (sectionPath) => get().completedSections.includes(sectionPath),

      getSubjectProgress: (subjectId) => {
        const subject = curriculum.find((s) => s.id === subjectId)
        if (!subject) return { completed: 0, total: 0, percentage: 0 }

        let total = 0
        let completed = 0

        for (const ch of subject.chapters) {
          for (const sec of ch.sections) {
            total++
            const path = `${subjectId}/${ch.id}/${sec.id}`
            if (get().completedSections.includes(path)) completed++
          }
        }

        return {
          completed,
          total,
          percentage: total ? Math.round((completed / total) * 100) : 0,
        }
      },

      bookmarks: [],

      toggleBookmark: (sectionPath) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(sectionPath)
            ? state.bookmarks.filter((b) => b !== sectionPath)
            : [...state.bookmarks, sectionPath],
        })),

      isBookmarked: (sectionPath) => get().bookmarks.includes(sectionPath),
    }),
    {
      name: STORAGE_KEY,
      onRehydrate: () => (state) => {
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    },
  ),
)

export default useAppStore
