import { defineConfig, defineGlobalStyles, defineGlobalFontface } from "@pandacss/dev";


const globalFontface = defineGlobalFontface({
  'Space Mono': [{
    src: 'url(/fonts/SpaceMono-Regular.woff2) format("woff2")',
    fontWeight: 400,
    fontStyle: 'normal',
    fontDisplay: 'swap'
  }],
  'TWK Lausanne': [{
    src: 'url(/fonts/TWKLausanne-300.woff2) format("woff2")',
    fontWeight: 300,
    fontStyle: 'normal',
    fontDisplay: 'swap'
  }, {
      src: 'url(/fonts/TWKLausanne-750.woff2) format("woff2")',
      fontWeight: 750,
      fontStyle: 'normal',
      fontDisplay: 'swap'
    }]
})

const globalCss = defineGlobalStyles({
  '*': {
    fontFamily: 'TWK Lausanne, Space Mono, monospace',
    fontWeight: 300,
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
  },
})


export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  globalFontface,
  globalCss,
  globalVars: {
    '--font-lausanne': 'TWK Lausanne, monospace',
    '--font-space-mono': 'Space Mono, monospace',
  },
  theme: {
    extend: {
      tokens: {
        fonts: {
          lausanne: { value: 'var(--font-lausanne), monospace' },
          space: { value: 'var(--font-space), sans-serif' }
        }
      }
    },
  },
  outdir: "styled-system",
});
