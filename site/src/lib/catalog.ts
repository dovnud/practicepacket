import { SEASONS } from './seasons.ts'
import { byId, publishedSkills } from './skills.ts'

export function liveSeasons() {
  const ids = new Set(publishedSkills().map((s) => s.id))
  return SEASONS.map((season) => {
    const skills = season.skillIds.map((id) => byId(id)).filter((s): s is NonNullable<typeof s> => !!s && ids.has(s.id))
    return { ...season, skills }
  }).filter((season) => season.skills.length >= 3)
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, 'https://practicepacket.com').href,
    })),
  }
}
