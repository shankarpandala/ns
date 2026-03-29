import { curriculum } from '../subjects/index.js'

const MAX_SEARCH_RESULTS = 20

export function getSubjectById(id) {
  return curriculum.find((s) => s.id === id) ?? null
}

export function getChapterById(subjectId, chapterId) {
  const subject = getSubjectById(subjectId)
  return subject?.chapters.find((c) => c.id === chapterId) ?? null
}

export function getSectionById(subjectId, chapterId, sectionId) {
  const chapter = getChapterById(subjectId, chapterId)
  return chapter?.sections.find((s) => s.id === sectionId) ?? null
}

let _allSectionsCache = null

export function getAllSections() {
  if (_allSectionsCache) return _allSectionsCache

  const sections = []
  for (const sub of curriculum) {
    for (const ch of sub.chapters) {
      for (const sec of ch.sections) {
        sections.push({
          ...sec,
          path: `${sub.id}/${ch.id}/${sec.id}`,
          subjectId: sub.id,
          subjectTitle: sub.title,
          subjectColor: sub.colorHex,
          chapterId: ch.id,
          chapterTitle: ch.title,
        })
      }
    }
  }

  _allSectionsCache = sections
  return sections
}

export function getAdjacentSections(subjectId, chapterId, sectionId) {
  const all = getAllSections()
  const idx = all.findIndex(
    (s) => s.subjectId === subjectId && s.chapterId === chapterId && s.id === sectionId,
  )
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export function getSectionByPath(path) {
  const [subjectId, chapterId, sectionId] = path.split('/')
  return {
    subject: getSubjectById(subjectId),
    chapter: getChapterById(subjectId, chapterId),
    section: getSectionById(subjectId, chapterId, sectionId),
  }
}

export function searchContent(query) {
  if (!query || query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  const results = []

  for (const sub of curriculum) {
    if (sub.title.toLowerCase().includes(q) || sub.description?.toLowerCase().includes(q)) {
      results.push({ type: 'subject', id: sub.id, title: sub.title, description: sub.description, icon: sub.icon, colorHex: sub.colorHex, path: sub.id })
    }
    for (const ch of sub.chapters) {
      if (ch.title.toLowerCase().includes(q) || ch.description?.toLowerCase().includes(q)) {
        results.push({ type: 'chapter', id: ch.id, title: ch.title, description: ch.description, subjectId: sub.id, subjectTitle: sub.title, path: `${sub.id}/${ch.id}` })
      }
      for (const sec of ch.sections) {
        if (sec.title.toLowerCase().includes(q) || sec.description?.toLowerCase().includes(q)) {
          results.push({ type: 'section', id: sec.id, title: sec.title, description: sec.description, subjectId: sub.id, subjectTitle: sub.title, chapterId: ch.id, chapterTitle: ch.title, path: `${sub.id}/${ch.id}/${sec.id}` })
        }
      }
    }
  }

  return results.slice(0, MAX_SEARCH_RESULTS)
}
