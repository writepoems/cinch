import { defineConfig } from 'vite'

import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'

import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components")
    }
  },

  base: "/cinch/"
})
