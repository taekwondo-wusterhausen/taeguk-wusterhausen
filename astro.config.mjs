import { defineConfig } from 'astro/config'

import sitemap from "@astrojs/sitemap"
import tailwind from '@astrojs/tailwind'
import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
    site: 'https://jneuendorf.github.io',
    experimental: {
        assets: true,
    },
    integrations: [robotsTxt(), sitemap(), tailwind()],
})
