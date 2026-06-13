import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-pink": "rgb(var(--accent-pink) / <alpha-value>)",
        "accent-light": "rgb(var(--accent-light) / <alpha-value>)",
        "accent-dark": "rgb(var(--accent-dark) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / 0.18)",
        "ambient-navy": "rgb(var(--ambient-navy) / <alpha-value>)",
        "ambient-cyan": "rgb(var(--ambient-cyan) / <alpha-value>)",
        "ambient-gold": "rgb(var(--ambient-gold) / <alpha-value>)",
        "ambient-graphite": "rgb(var(--ambient-graphite) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Orbitron", "system-ui", "-apple-system", "sans-serif"],
        display: ["Orbitron", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.08em",
        wide: "0.05em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand": "var(--gradient-brand)",
        "grid-pattern":
          "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "ambient-drift": "ambient-drift 24s ease-in-out infinite",
        "ambient-drift-slow": "ambient-drift 36s ease-in-out infinite",
        "float-y": "float-y 7s ease-in-out infinite",
        sheen: "sheen 1.1s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ambient-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(3%, -2%, 0) scale(1.06)" },
          "66%": { transform: "translate3d(-2%, 2%, 0) scale(0.97)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)", opacity: "0" },
          "40%": { opacity: "0.35" },
          "100%": { transform: "translateX(220%) skewX(-12deg)", opacity: "0" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(157, 78, 221, 0.25)",
        "glow-sm": "0 0 20px rgba(224, 64, 251, 0.15)",
        "glow-pink": "0 0 30px rgba(224, 64, 251, 0.2)",
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};

export default config;
