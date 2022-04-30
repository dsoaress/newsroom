import { mauve, violet } from '@radix-ui/colors'
import { CaretDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { forwardRef, ReactNode, Ref } from 'react'

import { useGetAllCategoriesQuery } from '@/generated'
import { graphQLClient } from '@/services/graphQLClient'
import { keyframes, styled } from '@/styles'

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 }
})

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 }
})

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 }
})

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 }
})

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 }
})

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 }
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
})

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: 4,
  borderRadius: 6,
  listStyle: 'none'
})

const itemStyles = {
  padding: '8px 12px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: violet.violet11,
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px ${violet.violet7}` },
  '&:hover': { backgroundColor: violet.violet3 }
}

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: 'unset',
  cursor: 'pointer'
})

const StyledCaret = styled(CaretDownIcon, {
  position: 'relative',
  color: violet.violet10,
  top: 1,
  '[data-state=open] &': { transform: 'rotate(-180deg)' },
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'transform 250ms ease'
  }
})

type StyledTriggerWithCaretProps = {
  children: ReactNode
}

const StyledTriggerWithCaret = forwardRef(
  ({ children, ...props }: StyledTriggerWithCaretProps, forwardedRef: Ref<any>) => (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledCaret aria-hidden />
    </StyledTrigger>
  )
)

StyledTriggerWithCaret.displayName = 'StyledTriggerWithCaret'

const StyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 15,
  lineHeight: 1
})

const StyledContent = styled(NavigationMenuPrimitive.Content, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  '@media only screen and (min-width: 600px)': { width: 'auto' },
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '250ms',
    animationTimingFunction: 'ease',
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight }
  }
})

const StyledIndicator = styled(NavigationMenuPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 10,
  top: '100%',
  overflow: 'hidden',
  zIndex: 1,

  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, transform 250ms ease',
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` }
  }
})

const StyledArrow = styled('div', {
  position: 'relative',
  top: '70%',
  backgroundColor: 'white',
  width: 10,
  height: 10,
  transform: 'rotate(45deg)',
  borderTopLeftRadius: 2
})

const StyledIndicatorWithArrow = forwardRef((props, forwardedRef: Ref<any>) => (
  <StyledIndicator {...props} ref={forwardedRef}>
    <StyledArrow />
  </StyledIndicator>
))

StyledIndicatorWithArrow.displayName = 'StyledIndicatorWithArrow'

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: 'relative',
  transformOrigin: 'top center',
  marginTop: 1,
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: '$2xl',
  height: 'var(--radix-navigation-menu-viewport-height)',

  '@media only screen and (min-width: 600px)': {
    width: 'var(--radix-navigation-menu-viewport-width)'
  },
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` }
  }
})

// Exports
const NavigationMenuList = StyledList
const NavigationMenuItem = NavigationMenuPrimitive.Item
const NavigationMenuTrigger = StyledTriggerWithCaret
const NavigationMenuLink = StyledLink
const NavigationMenuContent = StyledContent
const NavigationMenuViewport = StyledViewport
const NavigationMenuIndicator = StyledIndicatorWithArrow

// Your app...
const ContentList = styled('ul', {
  display: 'grid',
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: 'none',

  variants: {
    layout: {
      one: {
        '@media only screen and (min-width: 600px)': {
          width: 500,
          gridTemplateColumns: '.75fr 1fr'
        }
      },
      two: {
        '@media only screen and (min-width: 600px)': {
          width: 600,
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(3, 1fr)'
        }
      }
    }
  }
})

const ListItem = styled('li', {})

const LinkTitle = styled('div', {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: violet.violet12
})

const LinkText = styled('p', {
  all: 'unset',
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: 'initial'
})

type ContentListItemProps = {
  children: ReactNode
  title: string
  href: string
}

const ContentListItem = forwardRef(
  ({ children, title, href, ...props }: ContentListItemProps, forwardedRef: Ref<any>) => (
    <ListItem>
      <NavigationMenuLink
        {...props}
        href={href}
        ref={forwardedRef}
        css={{
          padding: 12,
          borderRadius: 6,
          '&:hover': { backgroundColor: mauve.mauve3 }
        }}
      >
        <LinkTitle>{title}</LinkTitle>
        <LinkText>{children}</LinkText>
      </NavigationMenuLink>
    </ListItem>
  )
)

const HomeLink = styled('a', {
  all: 'unset',
  color: mauve.mauve12,
  textDecoration: 'none',
  mr: 16,
  cursor: 'pointer'
})

function LinkToHome() {
  return (
    <Link href="/" passHref>
      <HomeLink>Home</HomeLink>
    </Link>
  )
}

ContentListItem.displayName = 'ContentListItem'

const ViewportPosition = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'right',
  width: '100%',
  top: '100%',
  right: '1.5rem',
  perspective: '2000px'
})

export function Nav() {
  const { data } = useGetAllCategoriesQuery(graphQLClient, {
    take: 5
  })

  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuList>
        <LinkToHome />
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="two">
              {data?.categories?.map(category => (
                <ContentListItem
                  key={category.id}
                  title={category.name}
                  href={`/categories/${category.slug}`}
                >
                  {category.description}
                </ContentListItem>
              ))}
              <ContentListItem title="See more" href="categories">
                See all categories
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuIndicator />
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuPrimitive.Root>
  )
}
