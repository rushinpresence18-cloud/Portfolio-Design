import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const portfolioClass = '.rushin-portfolio-root'

function splitSelectors(selectorList) {
  const selectors = []
  let start = 0
  let depth = 0
  let quote = ''

  for (let index = 0; index < selectorList.length; index++) {
    const character = selectorList[index]
    if (quote) {
      if (character === quote && selectorList[index - 1] !== '\\') quote = ''
    } else if (character === '"' || character === "'") {
      quote = character
    } else if (character === '(' || character === '[') {
      depth++
    } else if (character === ')' || character === ']') {
      depth--
    } else if (character === ',' && depth === 0) {
      selectors.push(selectorList.slice(start, index).trim())
      start = index + 1
    }
  }

  selectors.push(selectorList.slice(start).trim())
  return selectors
}

function scopePortfolioStyles() {
  return {
    postcssPlugin: 'scope-portfolio-styles',
    Once(stylesheet) {
      stylesheet.walkRules((rule) => {
        let parent = rule.parent
        while (parent) {
          if (parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return
          parent = parent.parent
        }

        rule.selector = splitSelectors(rule.selector).map((selector) => {
          if (selector === '*') return `${portfolioClass}, ${portfolioClass} *`
          if (selector.startsWith(':root')) return selector.replace(':root', portfolioClass)
          if (selector.startsWith('#app')) return selector.replace('#app', portfolioClass)
          if (/^(html|body)(?=\b|[.#:[\s>+~])/.test(selector)) {
            return selector.replace(/^(html|body)/, portfolioClass)
          }
          return `${portfolioClass} ${selector}`
        }).join(', ')
      })
    },
  }
}

export default defineConfig({
  plugins: [vue()],
  publicDir: false,
  css: {
    postcss: {
      plugins: [scopePortfolioStyles()],
    },
  },
  build: {
    outDir: 'wordpress/rushin-portfolio/assets',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/wordpress.js',
      name: 'RushinPortfolio',
      formats: ['iife'],
      fileName: () => 'portfolio.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: (asset) => asset.name?.endsWith('.css') ? 'portfolio.css' : '[name][extname]',
      },
    },
  },
})
