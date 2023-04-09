import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
    site: 'https://jneuendorf.github.io',
    base: '/taeguk-wusterhausen',
    experimental: {
        assets: true,
    },
    integrations: [mdx(), sitemap(), tailwind(), robotsTxt()],
    vite: {
        plugins: [yaml()],
    },
})
