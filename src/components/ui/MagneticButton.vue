<script setup>
defineProps({ href: { type: String, default: '#work' } })
</script>
<template><a class="button" :href="href"><slot /> <span aria-hidden="true">↗</span></a></template>
