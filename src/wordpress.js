import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/variables.css'
import './assets/styles/utilities.css'
import './assets/styles/main.css'

document.querySelectorAll('.rushin-portfolio-root').forEach((root) => {
  const app = createApp(App)
  app.provide('assetBase', root.dataset.assetBase || '/')
  app.mount(root)
})
