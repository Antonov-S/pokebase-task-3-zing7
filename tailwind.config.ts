import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      padding: {
        DEFAULT: "0rem",
        xl: "0rem"
      },
      center: true,
      screens: {
        sm: "1140px"
      }
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      colors: {
        transperent: "rgba(0, 0, 0, 0.05)",
        bcenter: "#fff",
        accent: "#f1d4b3",
        brown: "#292218",
        brown2: "#231d15",
        brown3: "#473a2b",
        brown4: "#322618",
        bheader: "#fbf5ed"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

export default config;
