<script setup>
import { ref } from 'vue'
defineProps({ project: { type: Object, required: true } })
const imageReady = ref(false)
const imageFailed = ref(false)
</script>
<template>
  <article class="project-card reveal">
    <a class="project-image" :href="project.live || project.github" target="_blank" rel="noreferrer" :aria-label="project.live ? `View ${project.title} live site` : `View ${project.title} on GitHub`">
      <div v-if="!imageReady" class="image-fallback" aria-hidden="true"><span class="mono">PROJECT / {{ project.number }}</span><strong>{{ project.title }}</strong><span class="fallback-mark">✳</span></div>
      <img v-if="!imageFailed" :src="project.image" :alt="project.alt" loading="lazy" @load="imageReady = true" @error="imageFailed = true" />
      <span class="image-index mono">{{ project.number }} / 03</span>
    </a>
    <div class="project-meta">
      <div>
        <a class="project-title" :href="project.live || project.github" target="_blank" rel="noreferrer">{{ project.title }} ↗</a>
        <p class="project-desc">{{ project.description }}</p>
      </div>
      <a class="arrow-link" :href="project.live || project.github" target="_blank" rel="noreferrer" :aria-label="project.live ? `Open ${project.title} live site` : `Open ${project.title} on GitHub`">↗</a>
    </div>
    <div class="tags"><span v-for="item in project.stack" :key="item" class="tag">{{ item }}</span></div>
    <p class="project-learned"><span>Takeaway</span>{{ project.learned }}</p>
  </article>
</template>
