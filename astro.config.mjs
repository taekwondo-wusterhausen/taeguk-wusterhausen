import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
    site: 'https://taekwondo-wusterhausen.de',
    // Astro 7 default 'jsx' drops whitespace between inline elements.
    compressHTML: true,
    integrations: [mdx(), react(), robotsTxt(), sitemap()],
    vite: {
        plugins: [yaml()],
    },
})
