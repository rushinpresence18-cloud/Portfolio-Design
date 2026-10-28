export const skillGroups = [
  {
    name: 'Languages',
    items: [
      { name: 'HTML5', level: 'Confident' },
      { name: 'CSS3', level: 'Confident' },
      { name: 'JavaScript', level: 'Confident' },
      { name: 'TypeScript', level: 'Still learning' },
      { name: 'Markdown', level: 'Still learning' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    items: [
      { name: 'React', level: 'Still learning' },
      { name: 'Vue.js', level: 'Still learning' },
      { name: 'Bootstrap', level: 'Still learning' },
      { name: 'Tailwind CSS', level: 'Still learning' },
      { name: 'SASS', level: 'Still learning' },
      { name: 'Axios', level: 'Still learning' },
    ],
  },
  {
    name: 'Front-End Practices',
    items: [
      { name: 'Git', level: 'Confident' },
      { name: 'GitHub', level: 'Confident' },
      { name: 'VS Code', level: 'Confident' },
      { name: 'npm', level: 'Confident' },
      { name: 'Figma', level: 'Confident' },
      { name: 'Frontend and backend design', level: 'Confident' },
    ],
  },
  {
    name: 'Tools & Workflow',
    items: [
      { name: 'Responsive Design', level: 'Still learning' },
      { name: 'Accessibility', level: 'Still learning' },
      { name: 'REST APIs', level: 'Still learning' },
      { name: 'API endpoints', level: 'Still learning' },
      { name: 'UI/UX Basics', level: 'Still learning' },
      { name: 'Cross-Browser Testing', level: 'Still learning' },
    ],
  },
]

export const skills = skillGroups.flatMap(({ items }) => items)
export const marqueeSkills = skills.map(({ name }) => name)
