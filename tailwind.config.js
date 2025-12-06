import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#f27f0d",
                "background-light": "#f8f7f5",
                "background-dark": "#221910",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "body": ["Manrope", "sans-serif"],
            },
        },
    },
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: ["light", "dark"],
    },
}
