<template>
  <section class="section" id="about" aria-labelledby="about-title">
    <div class="about-layout">
      <figure class="about-portrait reveal"><div class="hero-photo-frame"><img :src="`${assetBase}rushin-presence.jpg`" alt="Rushin Presence" loading="lazy"></div><figcaption class="mono">Rushin Presence · Cape Town, South Africa</figcaption></figure>
      <div class="about-copy reveal"><p class="eyebrow mono">A little context</p><h2 class="section-title" id="about-title">About <span class="accent">me.</span></h2><p>I'm an aspiring web developer and a student at <strong>Life Choices Academy</strong>. I enjoy taking an idea from a blank screen to a working experience that feels clear and useful for the people using it.</p><p>Through collaborative projects, I've helped build an HR management system, a catering and event-booking website, and a platform for students to find tutors. These projects have given me practice turning requirements into interface pieces, working with teammates, and connecting what I build to the wider product.</p><p>I feel most confident with HTML, CSS and JavaScript, and I'm continuing to learn tools like Vue.js, Axios and APIs. I like exploring a problem, trying a solution, and improving it through feedback. I'm looking forward to growing with a team and contributing to thoughtful, accessible, responsive websites.</p><h3 class="about-subheading">How I like to work</h3><p>I start by understanding what a page needs to help someone do. Then I break the work into smaller pieces, build and refine the interface, and use feedback to spot what can be clearer.</p><p class="fun-detail"><strong>A small detail about me:</strong> I notice every good button.</p></div>
    </div>
  </section>
</template>

<script setup>
import { inject } from 'vue'

const assetBase = inject('assetBase', '/')
</script>

