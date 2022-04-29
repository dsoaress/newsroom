import { styled } from '../../styles'

export const Wrapper = styled('div', {
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
