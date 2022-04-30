import { ReactNode } from 'react'

import { Container } from '@/components/Container'

import { Header } from './Header'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}
