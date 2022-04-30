import { styled } from '@/styles'

export const Wrapper = styled('div', {
  position: 'sticky',
  top: 0,
  zIndex: 100
})

export const PreviewModeBanner = styled('div', {
  display: 'none',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  padding: '10px 2rem',
  backgroundColor: '#000',
  color: '#fff',

  variants: {
    isPreview: {
      true: {
        display: 'flex'
      }
    }
  }
})

export const Button = styled('button', {
  all: 'unset',
  backgroundColor: 'transparent',
  border: '1px solid #fff',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  marginLeft: '1rem'
})

export const Content = styled('header', {
  height: '3rem',
  backgroundColor: '$neutral1',
  color: '$neutral12',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '$sm'
})

export const Title = styled('a', {
  fontSize: '1.188rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'none',
  color: '$neutral12'
})
