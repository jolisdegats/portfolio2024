import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        pressArm: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-15deg)' }
        },
        borderHighlight: {
          '0%, 100%': { borderColor: '#333' },
          '50%': { borderColor: '#00ad00' }
        }
      },
      animation: {
        'pressArm': 'pressArm 1s 2 alternate',
        'borderHighlight': 'borderHighlight 2s infinite ease-in-out'
      }
    },
  },
  plugins: [],
};
export default config;
