import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from '@/components/Container'

import { Nav } from './Nav'
import { Button, Content, PreviewModeBanner, Title, Wrapper } from './styles'

export function Header() {
  const { isPreview, push } = useRouter()

  return (
    <Wrapper>
      <PreviewModeBanner isPreview={isPreview}>
        Preview mode
        <Button onClick={() => push('/api/destroy-preview-mode')}>Exit preview</Button>
      </PreviewModeBanner>
      <Content>
        <Container
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Link href="/" passHref>
            <Title>Newsroom</Title>
          </Link>
          <Nav />
        </Container>
      </Content>
    </Wrapper>
  )
}
