import React, {useState, useEffect} from 'react'
import {graphql, useStaticQuery, Link, withPrefix} from 'gatsby'
import {Menu, Container, Icon} from 'semantic-ui-react'
import ShoppingCartIcon from './ShoppingCartIcon'
import Logo from './Logo'

const DesktopMenu = ({location: {pathname}, token, cartCount, signout}) => {
  const [activeItem, setActiveItem] = useState(pathname)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  const data = useStaticQuery(graphql`
    query DesktopHeaderQuery {
      contentstackHeader {
        title
        links {
          href
          title
        }
      }
    }
  `)

  const header = data.contentstackHeader

  return (
    <Menu size="huge" borderless pointing>
      <Container text>
        <Menu.Item
          active={activeItem === withPrefix('/')}
          as={Link}
          to="/"
          header
        >
          <Logo />
          {header.title}
        </Menu.Item>
        <Menu.Menu position="right">
          {header.links.map((link, i) => {
            return (
              <Menu.Item
                key={i}
                as={Link}
                to={link.href}
                active={activeItem === withPrefix(link.href)}
              >
                {link.title}
              </Menu.Item>
            )
          })}
          <Menu.Item
            as={Link}
            to="/cart/"
            active={activeItem === withPrefix('/cart/')}
          >
            <ShoppingCartIcon cartCount={cartCount} name="Cart" />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default DesktopMenu
