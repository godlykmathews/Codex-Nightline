import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#07090c", panel: "#10151a", signal: "#f1a643", mist: "#91a3a5" },
      boxShadow: { signal: "0 0 18px rgba(241,166,67,.35)" },
      keyframes: { pulseSignal: { "0%, 100%": { opacity: "0.5" }, "50%": { opacity: "1" } } },
      animation: { "pulse-signal": "pulseSignal 2.8s ease-in-out infinite" },
    },
  },
  plugins: [],
};

export default config;
