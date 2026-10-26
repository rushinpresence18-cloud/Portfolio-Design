# Rushin Presence Portfolio

A responsive Vue 3 and Vite portfolio.

## Run locally

```sh
npm install
npm run dev
```

## Deploy to Railway

This project includes a `railway.json` config. Railway builds the Vite site with `npm run build` and serves the production files with `npm start` on Railway's assigned port.

1. Push the project to GitHub.
2. In Railway, create a project and choose **Deploy from GitHub repo**.
3. Select `Portfolio-Design` and wait for the deployment to finish.
4. Open the service's **Settings > Networking** and choose **Generate Domain** to create a public `*.up.railway.app` URL.

## Contact form

Without a `VITE_FORMSPREE_ENDPOINT`, the form opens a prefilled email draft addressed to `rushinpresence18@gmail.com`. To send through Formspree instead, set `VITE_FORMSPREE_ENDPOINT` to your Formspree endpoint in Railway's service variables and redeploy. Keep private `.env` files out of Git.

## Portfolio content

- Section content is in `src/components/sections/`.
- Project descriptions and links are in `src/data/projects.js`.
- Skill groups are in `src/data/skills.js`.
- Journey items are in `src/data/journey.js`.
- Images and the favicon are in `public/`.