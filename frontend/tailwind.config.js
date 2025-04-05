/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                cream: "var(--color-cream)",
                darkBrown: "var(--color-darkBrown)",
                sageGreen: "var(--color-sageGreen)",
                terraCotta: "var(--color-terraCotta)",
                lightGray: "var(--color-lightGray)",
            },
            fontFamily: {
                heading: ["Yatra One", "serif"],
                sans: ["Noto Sans Devanagari", "sans-serif"],
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),],
};
