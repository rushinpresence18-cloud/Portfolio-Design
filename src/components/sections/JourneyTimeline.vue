<script setup>
import { journey } from '../../data/journey.js'
</script>
<template>
  <section class="section" id="journey" aria-labelledby="journey-title">
    <div class="journey-layout">
      <div class="journey-title reveal"><p class="eyebrow mono">A work in progress</p><h2 class="section-title" id="journey-title">The<br><span class="accent">journey.</span></h2><p class="page-intro">I’m building my skills one project at a time, turning classroom learning into practical experience and preparing for my first developer opportunity.</p></div>
      <div class="journey-list"><article v-for="item in journey" :key="item.date" class="journey-item reveal"><span class="journey-year mono">{{ item.date }}</span><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></article></div>
    </div>
  </section>
</template>
