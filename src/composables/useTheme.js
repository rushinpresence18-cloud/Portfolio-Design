import { onMounted, ref } from 'vue'
const theme = ref('dark')
export function useTheme() {
  onMounted(() => {
    const saved = localStorage.getItem('rp-theme')
    theme.value = saved || 'dark'
    document.documentElement.dataset.theme = theme.value
  })
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme.value
    localStorage.setItem('rp-theme', theme.value)
  }
  return { theme, toggleTheme }
}
