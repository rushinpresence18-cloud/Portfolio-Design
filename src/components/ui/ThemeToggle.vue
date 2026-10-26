<script setup>
import { useTheme } from '../../composables/useTheme.js'
const { theme, toggleTheme } = useTheme()
</script>
<template><button class="theme-toggle" type="button" @click="toggleTheme" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`">{{ theme === 'dark' ? '◐ Light' : '◑ Dark' }}</button></template>
