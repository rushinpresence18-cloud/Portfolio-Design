<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const board = { width: 600, height: 440 }
const paddle = { width: 100, height: 10, x: 250, y: 410, speed: 7 }
const ball = { x: 300, y: 390, radius: 7, vx: 3.1, vy: -4.2 }

const canvas = ref(null)
const score = ref(0)
const lives = ref(3)
const state = ref('playing')

const keys = new Set()
let context
let frame = 0
let lastFrame = 0
let bricks = []

function buildBricks() {
  const columns = 8
  const rows = 5
  const width = 61
  const height = 17
  const gap = 8
  const startX = (board.width - columns * width - (columns - 1) * gap) / 2

  bricks = []
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      bricks.push({
        x: startX + column * (width + gap),
        y: 48 + row * (height + gap),
        width,
        height,
        row,
        alive: true,
      })
    }
  }
}

function getColors() {
  const styles = getComputedStyle(canvas.value.closest('.rushin-portfolio-root, #app'))
  return {
    accent: styles.getPropertyValue('--accent').trim() || '#56f0d0',
    paper: styles.getPropertyValue('--paper').trim() || '#fff',
    surface: styles.getPropertyValue('--surface').trim() || '#141a1f',
  }
}

function drawBricks(colors) {
  const rowColors = [colors.accent, '#73d9ff', '#a99bff', '#ff8dc7', '#ffca72']

  for (const brick of bricks) {
    if (!brick.alive) continue

    context.fillStyle = rowColors[brick.row]
    context.shadowColor = rowColors[brick.row]
    context.shadowBlur = 9
    context.beginPath()
    context.roundRect(brick.x, brick.y, brick.width, brick.height, 4)
    context.fill()
  }
}

function drawPaddleAndBall(colors) {
  context.shadowBlur = 0
  context.fillStyle = colors.paper
  context.shadowColor = colors.accent
  context.shadowBlur = 12
  context.beginPath()
  context.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6)
  context.fill()

  context.fillStyle = colors.accent
  context.beginPath()
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  context.fill()
  context.shadowBlur = 0
}

function drawEndMessage(colors) {
  if (state.value === 'playing') return

  context.fillStyle = 'rgba(5, 9, 13, .72)'
  context.fillRect(0, 0, board.width, board.height)
  context.textAlign = 'center'
  context.fillStyle = colors.paper
  context.font = '600 28px system-ui, sans-serif'
  context.fillText(state.value === 'won' ? 'BOARD CLEARED!' : 'BALL LOST', board.width / 2, board.height / 2 - 8)
  context.fillStyle = colors.accent
  context.font = '14px system-ui, sans-serif'
  context.fillText('Press play again to keep going', board.width / 2, board.height / 2 + 22)
}

function draw() {
  if (!context) return

  const colors = getColors()
  context.clearRect(0, 0, board.width, board.height)
  context.fillStyle = colors.surface
  context.fillRect(0, 0, board.width, board.height)
  context.strokeStyle = `${colors.accent}30`
  context.lineWidth = 1
  context.strokeRect(.5, .5, board.width - 1, board.height - 1)

  drawBricks(colors)
  drawPaddleAndBall(colors)
  drawEndMessage(colors)
}

function resetBall() {
  ball.x = board.width / 2
  ball.y = paddle.y - 20
  ball.vx = Math.random() > .5 ? 3.1 : -3.1
  ball.vy = -4.2
}

function restart() {
  cancelAnimationFrame(frame)
  score.value = 0
  lives.value = 3
  state.value = 'playing'
  paddle.x = (board.width - paddle.width) / 2
  lastFrame = 0
  buildBricks()
  resetBall()
  draw()
  frame = requestAnimationFrame(tick)
}

function movePaddle(clientX) {
  const bounds = canvas.value.getBoundingClientRect()
  const pointerX = (clientX - bounds.left) * board.width / bounds.width
  paddle.x = Math.max(0, Math.min(board.width - paddle.width, pointerX - paddle.width / 2))
}

function onPointerMove(event) {
  movePaddle(event.clientX)
}

function onKeyDown(event) {
  if (document.activeElement !== canvas.value) return
  if (['ArrowLeft', 'ArrowRight', ' '].includes(event.key)) event.preventDefault()
  keys.add(event.key)
}

function onKeyUp(event) {
  keys.delete(event.key)
}

function movePaddleWithKeys(elapsed) {
  if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
    paddle.x -= paddle.speed * elapsed
  }
  if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
    paddle.x += paddle.speed * elapsed
  }

  paddle.x = Math.max(0, Math.min(board.width - paddle.width, paddle.x))
}

function bounceBallFromPaddle() {
  const hitPosition = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)
  const speed = Math.min(7.5, Math.hypot(ball.vx, ball.vy) + .04)

  ball.vx = hitPosition * speed * .85
  ball.vy = -Math.sqrt(speed * speed - ball.vx * ball.vx)
  ball.y = paddle.y - ball.radius
}

function hitBrick() {
  const brick = bricks.find(item => item.alive
    && ball.x + ball.radius >= item.x
    && ball.x - ball.radius <= item.x + item.width
    && ball.y + ball.radius >= item.y
    && ball.y - ball.radius <= item.y + item.height)

  if (!brick) return

  brick.alive = false
  score.value += 10
  ball.vy *= -1
  if (bricks.every(item => !item.alive)) state.value = 'won'
}

function loseLife() {
  lives.value -= 1
  if (lives.value === 0) state.value = 'lost'
  else resetBall()
}

function updateBall(elapsed) {
  ball.x += ball.vx * elapsed
  ball.y += ball.vy * elapsed

  if (ball.x - ball.radius < 0 || ball.x + ball.radius > board.width) ball.vx *= -1
  if (ball.y - ball.radius < 0) ball.vy = Math.abs(ball.vy)

  const hitsPaddle = ball.vy > 0
    && ball.y + ball.radius >= paddle.y
    && ball.y - ball.radius <= paddle.y + paddle.height
    && ball.x >= paddle.x
    && ball.x <= paddle.x + paddle.width
  if (hitsPaddle) bounceBallFromPaddle()

  hitBrick()
  if (ball.y - ball.radius > board.height) loseLife()
}

function tick(time = performance.now()) {
  if (state.value !== 'playing') {
    draw()
    return
  }

  const elapsed = Math.min((time - (lastFrame || time)) / 16.67, 2)
  lastFrame = time
  movePaddleWithKeys(elapsed)
  updateBall(elapsed)
  draw()

  if (state.value === 'playing') frame = requestAnimationFrame(tick)
}

onMounted(() => {
  context = canvas.value.getContext('2d')
  buildBricks()
  resetBall()
  draw()
  frame = requestAnimationFrame(tick)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
})
</script>

<template>
  <div class="brick-breaker">
    <div class="brick-breaker-heading">
      <div>
        <p class="mono">ARCADE MODE</p>
        <h2>Brick breaker</h2>
      </div>
      <div class="brick-breaker-stats mono">
        <span>SCORE <b>{{ score }}</b></span>
        <span>LIVES <b>{{ lives }}</b></span>
      </div>
    </div>

    <canvas
      ref="canvas"
      class="brick-breaker-board"
      :width="board.width"
      :height="board.height"
      tabindex="0"
      aria-label="Brick breaker game. Move the paddle with your pointer, arrow keys or A and D. Break all the bricks and keep the ball on the board."
      @pointermove="onPointerMove"
      @pointerdown="canvas.focus()"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
    ></canvas>

    <div class="brick-breaker-footer">
      <span class="mono">Move pointer &middot; focus board for &larr; &rarr; or A / D</span>
      <button class="brick-breaker-button" type="button" @click="restart">
        {{ state === 'playing' ? 'Restart' : 'Play again' }}
      </button>
    </div>
  </div>
</template>
