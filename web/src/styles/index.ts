import { createStitches } from '@stitches/react'

export const { getCssText, globalCss, styled } = createStitches()

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },

  'html, body': {
    fontFamily: "'Radio Canada', sans-serif"
  }
})
