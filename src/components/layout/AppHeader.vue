<script setup>
import ThemeToggle from '../ui/ThemeToggle.vue'
</script>
<template>
  <header class="topbar">
    <a class="brand" href="#top" aria-label="Rushin Presence, home">Rushin<span>.</span></a>
    <nav class="nav" aria-label="Main navigation">
      <a href="#top">Home</a><a href="#about">About</a><a href="#journey">Journey</a><a href="#skills">Skills</a><a href="#work">Projects</a><a class="nav-hire" href="#contact">Hire me</a>
      <ThemeToggle />
    </nav>
  </header>
</template>
