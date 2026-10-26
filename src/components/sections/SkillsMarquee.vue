<script setup>
import { skillGroups } from '../../data/skills.js'
</script>

<template>
  <section id="skills" class="section skills-page" aria-labelledby="skills-title">
    <div class="skills-page-head reveal">
      <div>
        <p class="eyebrow mono">The current toolkit</p>
        <h2 id="skills-title" class="section-title">Skills<span class="accent">.</span></h2>
      </div>
      <div class="skills-legend" aria-label="Skill confidence key">
        <span><i class="skill-dot is-confident"></i>Confident</span>
        <span><i class="skill-dot is-learning"></i>Still learning</span>
      </div>
    </div>

    <p class="skills-intro reveal">My strongest foundations are HTML, CSS and JavaScript. I’m extending them through Vue projects, responsive layouts, API practice and team workflows. The markers show how I currently describe my confidence with each tool.</p>

    <div class="skill-categories">
      <article v-for="(group, index) in skillGroups" :key="group.name" class="skill-category reveal">
        <h3><span class="skill-category-index mono">0{{ index + 1 }}</span>{{ group.name }}</h3>
        <ul class="skill-chips">
          <li v-for="skill in group.items" :key="skill.name" class="skill-chip" :class="skill.level === 'Confident' ? 'is-confident' : 'is-learning'" :title="skill.level">
            <i class="skill-dot" aria-hidden="true"></i>{{ skill.name }}
          </li>
        </ul>
      </article>
    </div>
    <p class="skills-footnote mono">I learn best by putting new tools to use in a real interface and improving the result as I go.</p>
  </section>
</template>
