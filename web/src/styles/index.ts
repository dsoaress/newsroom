import { blue, gray, green, red, yellow } from '@radix-ui/colors'
import { createStitches, PropertyValue } from '@stitches/react'

export const { getCssText, globalCss, styled, keyframes } = createStitches({
  theme: {
    colors: {
      ...blue,
      ...gray,
      ...green,
      ...yellow,
      ...red,

      accent1: '$blue1',
      accent2: '$blue2',
      accent3: '$blue3',
      accent4: '$blue4',
      accent5: '$blue5',
      accent6: '$blue6',
      accent7: '$blue7',
      accent8: '$blue8',
      accent9: '$blue9',
      accent10: '$blue10',
      accent11: '$blue11',
      accent12: '$blue12',

      success1: '$green1',
      success2: '$green2',
      success3: '$green3',
      success4: '$green4',
      success5: '$green5',
      success6: '$green6',
      success7: '$green7',
      success8: '$green8',
      success9: '$green9',
      success10: '$green10',
      success11: '$green11',
      success12: '$green12',

      warning1: '$yellow1',
      warning2: '$yellow2',
      warning3: '$yellow3',
      warning4: '$yellow4',
      warning5: '$yellow5',
      warning6: '$yellow6',
      warning7: '$yellow7',
      warning8: '$yellow8',
      warning9: '$yellow9',
      warning10: '$yellow10',
      warning11: '$yellow11',
      warning12: '$yellow12',

      danger1: '$red1',
      danger2: '$red2',
      danger3: '$red3',
      danger4: '$red4',
      danger5: '$red5',
      danger6: '$red6',
      danger7: '$red7',
      danger8: '$red8',
      danger9: '$red9',
      danger10: '$red10',
      danger11: '$red11',
      danger12: '$red12',

      neutral1: '$gray1',
      neutral2: '$gray2',
      neutral3: '$gray3',
      neutral4: '$gray4',
      neutral5: '$gray5',
      neutral6: '$gray6',
      neutral7: '$gray7',
      neutral8: '$gray8',
      neutral9: '$gray9',
      neutral10: '$gray10',
      neutral11: '$gray11',
      neutral12: '$gray12'
    },

    shadows: {
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
    }
  },

  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)'
  },

  utils: {
    py: (value: PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    px: (value: PropertyValue<'padding'>) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    p: (value: PropertyValue<'padding'>) => ({
      padding: value
    }),
    pb: (value: PropertyValue<'padding'>) => ({
      paddingBottom: value
    }),
    pt: (value: PropertyValue<'padding'>) => ({
      paddingTop: value
    }),
    pl: (value: PropertyValue<'padding'>) => ({
      paddingLeft: value
    }),
    pr: (value: PropertyValue<'padding'>) => ({
      paddingRight: value
    }),
    my: (value: PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value
    }),
    mx: (value: PropertyValue<'margin'>) => ({
      marginLeft: value,
      marginRight: value
    }),
    m: (value: PropertyValue<'margin'>) => ({
      margin: value
    }),
    mb: (value: PropertyValue<'margin'>) => ({
      marginBottom: value
    }),
    mt: (value: PropertyValue<'margin'>) => ({
      marginTop: value
    }),
    mr: (value: PropertyValue<'margin'>) => ({
      marginRight: value
    }),
    ml: (value: PropertyValue<'margin'>) => ({
      marginLeft: value
    })
  }
})

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },

  'html, body': {
    fontFamily: "'Radio Canada', sans-serif",
    fontSize: '16px',
    color: '$neutral12',
    backgroundColor: '$neutral3'
  }
})
