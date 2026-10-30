<script setup>
import MagneticButton from '../ui/MagneticButton.vue'
import InteractiveGlobe from '../ui/InteractiveGlobe.vue'
const props = defineProps({ clock: { type: String, default: '' }, gameMode: { type: Boolean, default: false } })
</script>
<template>
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero-visual"><InteractiveGlobe :game-mode="props.gameMode" /></div>
    <div class="hero-copy">
      <p class="hero-kicker eyebrow mono">Upcoming web developer · Cape Town</p>
      <h1 id="hero-title">Hi, <span class="accent">Rushin</span> here.</h1>
      <p class="hero-role">Web developer in training at Life Choices Academy</p>
      <p class="hero-sub">I’m building useful, thoughtful interfaces and growing my skills through hands-on projects. I’m looking for a junior developer placement or internship.</p>
      <div class="hero-focus"><p class="mono">WHAT I’M FOCUSED ON</p><ul><li>Building responsive front-end experiences</li><li>Learning through collaborative projects</li><li>Growing into a thoughtful junior developer</li></ul></div>
      <div class="hero-actions"><MagneticButton href="#contact">Say hi!</MagneticButton><a class="text-link" href="#work">View my work <span aria-hidden="true">&#8599;</span></a></div>
    </div>
    <div class="hero-bottom mono"><p><span class="status-dot"></span>Open to placement</p><p>Local time <span class="accent">{{ props.clock }}</span></p></div>
  </section>
</template>
