<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({ gameMode: { type: Boolean, default: false } })
const canvas = ref(null)
const spinning = ref(false)
const hoveredSkill = ref(null)
const skillMarkers = ref([])
const skills = [
  { id: 'html', name: 'HTML', label: 'Structure', detail: 'I use semantic HTML to give pages a clear, accessible structure.' },
  { id: 'css', name: 'CSS', label: 'Styling', detail: 'I build responsive layouts and bring interfaces to life with CSS.' },
  { id: 'javascript', name: 'JavaScript', label: 'Interaction', detail: 'I use JavaScript to add useful interactions and dynamic behavior.' },
]
let context
let resizeObserver
let frameId = 0
let previousFrame = 0
let width = 0
let height = 0
let yaw = -0.45
let pitch = 0.12
let dragging = false
let previous = { x: 0, y: 0 }
let points = []

function makePoints() {
  points = []
  for (let latitude = -82; latitude <= 82; latitude += 7) {
    const row = Math.round((latitude + 82) / 7)
    const offset = row % 2 ? 4.5 : 0
    for (let longitude = -180 + offset; longitude <= 180; longitude += 9) {
      const lat = latitude * Math.PI / 180
      const lon = longitude * Math.PI / 180
      points.push({ x: Math.cos(lat) * Math.sin(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.cos(lon) })
    }
  }
}

function draw() {
  if (!context || !width || !height) return
  const scale = Math.min(width, height) * .4
  const centerX = width / 2
  const centerY = height / 2
  const cosYaw = Math.cos(yaw)
  const sinYaw = Math.sin(yaw)
  const cosPitch = Math.cos(pitch)
  const sinPitch = Math.sin(pitch)
  const root = canvas.value.closest('.rushin-portfolio-root, #app')
  const accent = getComputedStyle(root).getPropertyValue('--accent').trim() || '#56f0d0'

  skillMarkers.value = skills.map((skill, index) => {
    const longitude = (.45 + (index - 1) * .72)
    const latitude = .08
    const x = Math.cos(latitude) * Math.sin(longitude)
    const y = Math.sin(latitude)
    const z = Math.cos(latitude) * Math.cos(longitude)
    const rotatedX = x * cosYaw + z * sinYaw
    const rotatedZ = -x * sinYaw + z * cosYaw
    const rotatedY = y * cosPitch - rotatedZ * sinPitch
    const depth = y * sinPitch + rotatedZ * cosPitch
    const perspective = .88 + (depth + 1) * .12
    return { ...skill, x: centerX + rotatedX * scale * perspective, y: centerY + rotatedY * scale * perspective, visible: depth > -.05 }
  })

  context.clearRect(0, 0, width, height)
  context.beginPath()
  context.arc(centerX, centerY, scale, 0, Math.PI * 2)
  context.strokeStyle = `${accent}20`
  context.lineWidth = 1
  context.stroke()

  for (const point of points) {
    const rotatedX = point.x * cosYaw + point.z * sinYaw
    const rotatedZ = -point.x * sinYaw + point.z * cosYaw
    const rotatedY = point.y * cosPitch - rotatedZ * sinPitch
    const depth = point.y * sinPitch + rotatedZ * cosPitch
    if (depth < -.16) continue

    const perspective = .88 + (depth + 1) * .12
    const x = centerX + rotatedX * scale * perspective
    const y = centerY + rotatedY * scale * perspective
    const alpha = depth > 0 ? .28 + depth * .65 : .12
    const radius = depth > .35 ? 1.5 : 1.05
    context.globalAlpha = alpha
    context.fillStyle = accent
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
  context.globalAlpha = 1
}

function resize() {
  const element = canvas.value
  if (!element) return
  const rect = element.getBoundingClientRect()
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  width = rect.width
  height = rect.height
  element.width = Math.round(width * pixelRatio)
  element.height = Math.round(height * pixelRatio)
  context = element.getContext('2d')
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  draw()
}

function animate(time = performance.now()) {
  if (!spinning.value) return
  const elapsed = Math.min((time - (previousFrame || time)) / 1000, .05)
  previousFrame = time
  if (!dragging) {
    yaw += .9 * elapsed
    pitch += .28 * elapsed
  }
  draw()
  frameId = requestAnimationFrame(animate)
}

function toggleSpin() {
  spinning.value = !spinning.value
  cancelAnimationFrame(frameId)
  previousFrame = 0
  if (spinning.value) animate()
}

watch(() => props.gameMode, (active) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (active && !spinning.value) toggleSpin()
  if (!active && spinning.value) toggleSpin()
})

function onPointerDown(event) {
  dragging = true
  previous = { x: event.clientX, y: event.clientY }
  event.currentTarget.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging) return
  // The whole canvas is draggable, so the globe can be turned from any point.
  yaw += (event.clientX - previous.x) * .012
  pitch += (event.clientY - previous.y) * .012
  previous = { x: event.clientX, y: event.clientY }
  draw()
}

function onPointerUp() { dragging = false }

function onKeydown(event) {
  const turns = { ArrowLeft: [-.14, 0], ArrowRight: [.14, 0], ArrowUp: [0, -.14], ArrowDown: [0, .14] }
  const turn = turns[event.key]
  if (!turn) return
  event.preventDefault()
  yaw += turn[0]
  pitch += turn[1]
  draw()
}

onMounted(() => {
  makePoints()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.value)
  resize()
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="globe-widget" :class="{ 'globe-game-active': props.gameMode }">
    <div class="globe-stage">
      <canvas ref="canvas" class="interactive-globe" tabindex="0" role="img" aria-label="Interactive dotted globe. Drag anywhere on it to rotate in any direction, or use the arrow keys." @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp" @lostpointercapture="onPointerUp" @keydown="onKeydown"></canvas>
      <button v-for="marker in skillMarkers" :key="marker.id" class="globe-skill-dot" :class="{ 'is-active': hoveredSkill?.id === marker.id }" :style="{ left: `${marker.x / width * 100}%`, top: `${marker.y / height * 100}%` }" type="button" :aria-label="`${marker.name}: ${marker.detail}`" @mouseenter="hoveredSkill = marker" @mouseleave="hoveredSkill = null" @focus="hoveredSkill = marker" @blur="hoveredSkill = null"> <span class="sr-only">{{ marker.name }}</span></button>
      <Transition name="holo">
        <aside v-if="hoveredSkill" class="globe-hologram" aria-live="polite" :aria-label="`${hoveredSkill.name} skill information`">
          <span class="globe-hologram-label mono">CORE SKILL · {{ hoveredSkill.label }}</span>
          <h2>{{ hoveredSkill.name }}</h2>
          <p>{{ hoveredSkill.detail }}</p>
        </aside>
      </Transition>
    </div>
    <div class="globe-controls">
      <button class="globe-toggle" type="button" :aria-pressed="spinning" @click="toggleSpin">{{ spinning ? 'Pause rotation' : 'Spin the globe' }} <span aria-hidden="true">{{ spinning ? 'Ⅱ' : '↻' }}</span></button>
      <span class="globe-hint mono">Tap a dot to explore · drag to rotate</span>
    </div>
  </div>
</template>
