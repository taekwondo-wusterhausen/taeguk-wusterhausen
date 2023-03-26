/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
}
