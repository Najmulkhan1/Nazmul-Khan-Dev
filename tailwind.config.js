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
                "primary": "#00ff41", // Matrix Green / Neon Green
                "secondary": "#003b00", // Dark Green for backgrounds
                "accent": "#008F11", // Standard Green
                "background-light": "#0d1117", // GitHub Dark Dimmed / Terminal Black
                "background-dark": "#000000", // Pure Black
                "text-primary": "#e6edf3",
                "text-muted": "#8b949e",
            },
            fontFamily: {
                "display": ["'Fira Code'", "'Courier New'", "monospace"],
                "body": ["'Fira Code'", "'Courier New'", "monospace"],
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
