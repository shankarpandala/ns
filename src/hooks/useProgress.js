import { useMemo } from 'react'
import useAppStore from '../store/appStore'
import { curriculum } from '../subjects/index.js'
import { getAllSections } from '../utils/curriculum.js'

export default function useProgress() {
  const completedSections = useAppStore((s) => s.completedSections)
  const markSectionComplete = useAppStore((s) => s.markSectionComplete)
  const unmarkSectionComplete = useAppStore((s) => s.unmarkSectionComplete)
  const getSubjectProgress = useAppStore((s) => s.getSubjectProgress)

  const allSections = useMemo(() => getAllSections(), [])
  const totalSections = allSections.length
  const totalCompleted = completedSections.length

  const overallPercentage = totalSections
    ? Math.round((totalCompleted / totalSections) * 100)
    : 0

  const isComplete = (sectionPath) => completedSections.includes(sectionPath)
  const getProgress = (subjectId) => getSubjectProgress(subjectId)

  const getAllSubjectProgress = () =>
    curriculum.map((sub) => ({
      id: sub.id,
      title: sub.title,
      icon: sub.icon,
      colorHex: sub.colorHex,
      ...getSubjectProgress(sub.id),
    }))

  return {
    markComplete: markSectionComplete,
    unmarkComplete: unmarkSectionComplete,
    isComplete,
    getProgress,
    getAllSubjectProgress,
    totalCompleted,
    totalSections,
    overallPercentage,
    completedSections,
  }
}
