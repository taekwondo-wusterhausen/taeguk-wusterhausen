/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                // https://www.tailwindshades.com/#color=203.72881355932205%2C83.09859154929578%2C41.764705882352935&step-up=8&step-down=11&hue-shift=0&name=blue&base-stop=5&v=1&overrides=e30%3D
                'blue': {
                    DEFAULT: '#127DC3',
                    50: '#58B4F0',
                    100: '#4CAEEF',
                    200: '#35A4EC',
                    300: '#1E99EA',
                    400: '#148CDA',
                    500: '#127DC3',
                    600: '#106EAC',
                    700: '#0E5F94',
                    800: '#0C507D',
                    900: '#094166',
                    950: '#083A5A'
                },
            },
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
}
