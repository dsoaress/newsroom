import { useRouter } from 'next/router'

import { Button, Wrapper } from './styles'

export function PreviewModeBanner() {
  const { isPreview, push } = useRouter()

  return (
    <Wrapper isPreview={isPreview}>
      Preview mode
      <Button onClick={() => push('/api/destroy-preview-mode')}>Exit preview</Button>
    </Wrapper>
  )
}
