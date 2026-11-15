export type Season = {
  slug: string
  title: string
  description: string
  plan: string
  skillIds: string[]
}

export const SEASONS: Season[] = [
  {
    slug: 'back-to-school',
    title: 'Back-to-school math',
    description: 'A first-week packet of review skills already on Practice Packet, from addition through place value.',
    plan: 'Use one skill a day at the medium level. Monday and Tuesday rebuild addition and subtraction. Wednesday is place value. Thursday is a word problem. Friday is the same skill at the easy level for anyone who needs another pass, and the hard level for anyone who finished early.',
    skillIds: ['g1-add-20', 'g2-add-regroup', 'g2-sub-regroup', 'g2-place-hundreds', 'g1-compare', 'g3-add-3'],
  },
  {
    slug: 'halloween',
    title: 'Halloween math practice',
    description: 'October practice using facts, regrouping, and clocks. The skills are the usual pages, chosen because they fit a short October week.',
    plan: 'Keep the pages black and white so they still copy cleanly. A five-day set: two-digit subtraction, quarter hours, multiplication facts through 5, multiplication facts from 6, and a fraction bar. Skip any page your grade has not reached.',
    skillIds: ['g2-sub-regroup', 'g2-time-quarter', 'g3-mul-05', 'g3-mul-610', 'g3-frac-shape'],
  },
  {
    slug: 'thanksgiving',
    title: 'Thanksgiving week math',
    description: 'A short November set: equal groups, coins, and a word problem, using pages already on the site.',
    plan: 'Three sittings is enough for a short week. Count coins on Monday, solve a word problem on Tuesday, and use an array or area page on Wednesday. Send the answer key home only if you want families to check the work.',
    skillIds: ['g2-money', 'g2-word', 'g3-area', 'g1-word-add'],
  },
  {
    slug: 'winter',
    title: 'Winter break review',
    description: 'Skills to send home before a winter break: one page per operation your grade has already taught.',
    plan: 'Print the medium level and staple the answer key behind it, facing in, so a child does not see it on the way home. Grade 1 can stop after addition and subtraction. Grade 3 can add a facts page and a fraction page.',
    skillIds: ['g1-add-20', 'g1-sub-20', 'g2-add-regroup', 'g2-sub-zero', 'g3-div-05', 'g3-frac-line'],
  },
  {
    slug: 'valentines',
    title: "Valentine's week math",
    description: 'A February set of short practice: make ten, even and odd, and basic facts.',
    plan: 'These are one-page skills. Use them as a warm-up rather than a full lesson. Make 10 and even-or-odd take a few minutes. The facts pages take longer, so pick one, not both, if the period is short.',
    skillIds: ['g1-make-10', 'g2-even', 'g3-mul-05', 'g3-missing'],
  },
  {
    slug: 'spring',
    title: 'Spring review',
    description: 'A spring set that reaches measurement and fractions for grades that are ready, and clocks for earlier grades.',
    plan: 'Pair a clock page with a measurement page in the same week so the unit is not only computation. Grade 2 can use quarter hours and coins. Grade 3 can use elapsed time and area. Grade 4 can use perimeter.',
    skillIds: ['g2-time-quarter', 'g2-money', 'g3-elapsed', 'g3-area', 'g4-peri'],
  },
  {
    slug: 'summer',
    title: 'Summer review',
    description: 'A short summer packet drawn from the last skills of grades 1, 2, and 3, plus a grade 5 maintenance page.',
    plan: 'Ten to fifteen minutes is the right length. Send three medium pages, not a stack. Suggest families do one page on two days a week. The hard level is optional and is not required to “finish the summer.”',
    skillIds: ['g1-sub-20', 'g2-sub-regroup', 'g3-mul-610', 'g3-frac-shape', 'g5-ops'],
  },
]
