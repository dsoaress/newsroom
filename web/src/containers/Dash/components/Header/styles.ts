import { styled } from '../../../../styles'

export const Wrapper = styled('header', {
  background: '$accent12',
  color: '$neutral1',
  py: '1rem'
})

export const Content = styled('div', {
  maxWidth: '1200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mx: 'auto',
  px: '1rem'
})

export const Nav = styled('nav', {
  display: 'flex',
  gap: 18
})

export const NavItem = styled('a', {
  color: '$neutral1',
  textDecoration: 'none',
  px: '1rem',
  py: '0.5rem',
  borderRadius: '0.5rem',
  border: '2px solid $accent11',
  cursor: 'pointer',
  transition: 'all 0.25s ease-in-out',

  '&:hover': {
    background: '$accent11'
  },

  variants: {
    active: {
      true: {
        background: '$accent11'
      }
    },

    danger: {
      true: {
        background: '$danger10',
        borderColor: '$danger10',

        '&:hover': {
          background: '$danger11'
        }
      }
    }
  }
})
