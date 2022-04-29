import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSession } from '../../../../hooks/useSession'
import { getTokens } from '../../../../utils/storage'
import { Content, Nav, NavItem, Wrapper } from './styles'

export function Header() {
  const { asPath, push } = useRouter()
  const { clearSession } = useSession()
  const { NEXT_PUBLIC_PREVIEW_MODE_TOKEN } = process.env

  const isActive = (path: string) => {
    return asPath === path
  }

  return (
    <Wrapper>
      <Content>
        Dashboard
        <Nav>
          <Link href="/" passHref>
            <NavItem>Home</NavItem>
          </Link>
          <Link href="/dash" passHref>
            <NavItem active={isActive('/dash')}>Dash</NavItem>
          </Link>
          <Link href="/dash/categories" passHref>
            <NavItem active={isActive('/dash/categories')}>Categories</NavItem>
          </Link>
          <NavItem
            onClick={() => push(`/api/set-preview-mode?secret=${NEXT_PUBLIC_PREVIEW_MODE_TOKEN}`)}
          >
            Open Preview Mode
          </NavItem>
          <NavItem danger onClick={() => clearSession(push)}>
            Logout
          </NavItem>
        </Nav>
      </Content>
    </Wrapper>
  )
}
