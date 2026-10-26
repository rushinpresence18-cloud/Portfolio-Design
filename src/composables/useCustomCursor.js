import { onMounted, onUnmounted } from 'vue'
export function useCustomCursor() {
  let move
  let over
  let out
  onMounted(() => {
    move = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    over = (event) => { if (event.target.closest('a, button, input, textarea')) document.querySelector('.cursor-dot')?.classList.add('is-hover') }
    out = () => document.querySelector('.cursor-dot')?.classList.remove('is-hover')
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
  })
  onUnmounted(() => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); document.removeEventListener('pointerout', out) })
}
