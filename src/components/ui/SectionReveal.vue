<script setup>
import { onMounted, ref } from 'vue'
const el = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.disconnect() } }, { threshold: .12 })
  observer.observe(el.value)
})
</script>
<template><div ref="el" class="reveal"><slot /></div></template>
