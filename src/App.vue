<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import FeaturedWork from './components/sections/FeaturedWork.vue'
import SkillsMarquee from './components/sections/SkillsMarquee.vue'
import JourneyTimeline from './components/sections/JourneyTimeline.vue'
import InterestsSection from './components/sections/InterestsSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import BrickBreaker from './components/ui/BrickBreaker.vue'
import { useIntersectionReveal } from './composables/useIntersectionReveal.js'

const clock = ref('')
const gameMode = ref(false)
let timer
const updateClock = () => {
  clock.value = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())
}
onMounted(() => { updateClock(); timer = window.setInterval(updateClock, 30000) })
onUnmounted(() => clearInterval(timer))
useIntersectionReveal()
</script>

<template>
  <div class="site-shell" :class="{ 'game-mode-active': gameMode }">
    <div class="corner-webs" aria-hidden="true">
      <svg class="corner-web corner-web--top-left" viewBox="0 0 160 160" fill="none">
        <path d="M0 0 160 0M0 0 0 160M0 0 160 32M0 0 32 160M0 0 160 64M0 0 64 160M0 0 160 96M0 0 96 160M0 0 160 128M0 0 128 160M0 32A32 32 0 0 0 32 0M0 64A64 64 0 0 0 64 0M0 96A96 96 0 0 0 96 0M0 128A128 128 0 0 0 128 0M0 160A160 160 0 0 0 160 0" />
      </svg>
      <svg class="corner-web corner-web--top-right" viewBox="0 0 160 160" fill="none">
        <path d="M0 0 160 0M0 0 0 160M0 0 160 32M0 0 32 160M0 0 160 64M0 0 64 160M0 0 160 96M0 0 96 160M0 0 160 128M0 0 128 160M0 32A32 32 0 0 0 32 0M0 64A64 64 0 0 0 64 0M0 96A96 96 0 0 0 96 0M0 128A128 128 0 0 0 128 0M0 160A160 160 0 0 0 160 0" />
      </svg>
      <svg class="corner-web corner-web--bottom-left" viewBox="0 0 160 160" fill="none">
        <path d="M0 0 160 0M0 0 0 160M0 0 160 32M0 0 32 160M0 0 160 64M0 0 64 160M0 0 160 96M0 0 96 160M0 0 160 128M0 0 128 160M0 32A32 32 0 0 0 32 0M0 64A64 64 0 0 0 64 0M0 96A96 96 0 0 0 96 0M0 128A128 128 0 0 0 128 0M0 160A160 160 0 0 0 160 0" />
      </svg>
      <svg class="corner-web corner-web--bottom-right" viewBox="0 0 160 160" fill="none">
        <path d="M0 0 160 0M0 0 0 160M0 0 160 32M0 0 32 160M0 0 160 64M0 0 64 160M0 0 160 96M0 0 96 160M0 0 160 128M0 0 128 160M0 32A32 32 0 0 0 32 0M0 64A64 64 0 0 0 64 0M0 96A96 96 0 0 0 96 0M0 128A128 128 0 0 0 128 0M0 160A160 160 0 0 0 160 0" />
      </svg>
    </div>
    <AppHeader />
    <main>
      <div class="game-mode-row">
        <button class="game-mode-toggle mono" type="button" :aria-pressed="gameMode" @click="gameMode = !gameMode">
          <span class="game-mode-dot" aria-hidden="true"></span>
          {{ gameMode ? 'GAME MODE · ON' : 'GAME MODE' }}
        </button>
        <span v-if="gameMode" class="game-mode-hint mono" role="status">Break the bricks and keep the ball in play.</span>
        <div v-if="gameMode" class="game-mode-overlay"><BrickBreaker /></div>
      </div>
      <HeroSection :clock="clock" :game-mode="gameMode" />
      <AboutSection />
      <JourneyTimeline />
      <SkillsMarquee />
      <FeaturedWork />
      <InterestsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
