/// <reference types="astro/client" />

// Parsed by @rollup/plugin-yaml (see astro.config.mjs).
declare module '*.yml' {
    const data: unknown
    export default data
}
