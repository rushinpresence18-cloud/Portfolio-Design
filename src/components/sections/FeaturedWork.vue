<script setup>
import { projects } from '../../data/projects.js'
import ProjectCard from '../ui/ProjectCard.vue'
</script>
<template>
  <section class="section" id="work" aria-labelledby="work-title">
    <div class="work-head reveal">
      <div><p class="eyebrow mono">Selected work / 001—003</p><h2 class="section-title" id="work-title">Things<br><span class="accent">I’ve made.</span></h2></div>
      <p class="section-intro">Small projects, real practice. Each one is a chance to make something clearer, more useful and a little more me. These team builds gave me experience with front-end components, shared APIs, Git workflows and full-stack product ideas.</p>
    </div>
    <div class="work-grid"><ProjectCard v-for="project in projects" :key="project.number" :project="project" /></div>
  </section>
</template>
