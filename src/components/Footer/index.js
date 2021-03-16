import React from 'react'
import {graphql, useStaticQuery, Link} from 'gatsby'
import {Segment, Container, Grid, List, Header} from 'semantic-ui-react'

const twitterLink = (
  <a href="https://twitter.com/Contentstack" alt="Contentstack's Twitter Link">
    Twitter
  </a>
)
const facebookLink = (
  <a
    href="https://www.facebook.com/contentstack/"
    alt="Contentstack's Facebook Link"
  >
    Facebook
  </a>
)
const emailLink = (
  <a
    href="https://www.contentstack.com/company/contact-us/"
    alt="Contentstack's Contact Link"
  >
    Email
  </a>
)

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      contentstackFooter {
        id
        sections {
          title
          text
          link_list {
            icon
            link {
              href
              title
            }
          }
        }
      }
    }
  `)

  const footer = data.contentstackFooter

  return (
    <Segment
      vertical
      style={{
        padding: '4em 0em',
        marginTop: '3em',
        borderTop: '1px solid #f2f2f2',
      }}
    >
      <Container text>
        <Grid stackable>
          <Grid.Row>
            {footer.sections.map((section, i) => {
              return (
                <Grid.Column width={5}>
                  <Header as="h4" content={section.title} />
                  <List>
                    {section.link_list.map((link_el, i) => {
                      return (
                        <List.Item as={Link} to={link_el.link.href} icon={link_el.icon}>
                          {link_el.link.title}
                        </List.Item>
                      )
                    })}
                  </List>
                </Grid.Column>
              )
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}

export default Footer
