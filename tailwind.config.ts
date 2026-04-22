import { Config } from "tailwindcss"
import twDefault from "tailwindcss/defaultTheme"

export default {
  theme: {
    extend: {
      fontFamily: {
        display: ["Euphoria Script", ...twDefault.fontFamily.sans],
        sans: ["Inter", ...twDefault.fontFamily.sans]
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in forwards"
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 }
        }
      }
    }
  }
} satisfies Config