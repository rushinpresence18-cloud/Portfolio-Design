<script setup>
import { ref } from 'vue'
const email = 'rushinpresence18@gmail.com'
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
const status = ref('idle')
const feedback = ref('')
const form = ref(null)
async function submitForm(event) {
  const data = new FormData(event.currentTarget)
  if (data.get('_gotcha')) { status.value = 'success'; feedback.value = 'Thanks — your note is on its way.'; form.value.reset(); return }
  if (!endpoint) {
    const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    status.value = 'success'
    feedback.value = 'Your email app should open with the message ready to send.'
    return
  }
  status.value = 'sending'; feedback.value = 'Sending your message…'
  try {
    const response = await fetch(endpoint, { method: 'POST', body: JSON.stringify(Object.fromEntries(data.entries())), headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
    if (!response.ok) throw new Error('Request failed')
    status.value = 'success'; feedback.value = 'Message sent. I’ll be in touch soon.'; form.value.reset()
  } catch { status.value = 'error'; feedback.value = 'Something went wrong. Please try again or email me directly.' }
}
async function copyEmail() {
  try { await navigator.clipboard.writeText(email); feedback.value = 'Email copied to clipboard.'; status.value = 'success' }
  catch { feedback.value = `Email: ${email}`; status.value = 'error' }
}
</script>
<template>
  <section class="section contact" id="contact" aria-labelledby="contact-title">
    <p class="eyebrow mono">Have a role, idea or hello?</p><h2 class="section-title" id="contact-title">Let’s build<br>something<span>↗</span></h2>
    <div class="contact-grid">
      <div><p class="contact-copy">I’m open to junior web developer placements and internships. If you’re building a team or just want to talk code, I’d love to hear from you.</p><p class="contact-copy">I’m happy to talk about my projects, what I’m learning, or where I could contribute as I grow.</p><p class="contact-availability mono"><span class="status-dot"></span>Currently open to placement opportunities</p>
        <div class="contact-links"><a :href="`mailto:${email}`">{{ email }} ↗</a><button type="button" class="copy-email" @click="copyEmail">Copy email ⧉</button><a href="https://github.com/rushinpresence18-cloud" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/rushin-presence-84b076403" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </div>
      <form ref="form" class="contact-form" @submit.prevent="submitForm">
        <div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required /></div>
        <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required /></div>
        <div class="field"><label for="message">What’s on your mind?</label><textarea id="message" name="message" required></textarea></div>
        <div class="honeypot" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="_gotcha" tabindex="-1" autocomplete="off" /></div>
        <button class="button form-button" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? 'Sending…' : endpoint ? 'Send a message' : 'Open email draft' }} <span aria-hidden="true">↗</span></button>
        <p class="form-note" :class="status" role="status" aria-live="polite">{{ feedback }}</p>
        <p v-if="!endpoint" class="form-note">This opens a draft in your email app. You can also write directly to {{ email }}.</p>
      </form>
    </div>
  </section>
</template>
