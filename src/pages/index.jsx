import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { graphql, StaticQuery } from 'gatsby'

import Layout from "../components/layout"
import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import SiteFooter from '../components/Layout/Footer'
import ServerLanding from '../components/server/ServerLanding'
import BuildingBlocks from '../components/BuildingBlocks'
import Solutions from '../components/Solutions'
import config from '../../data/SiteConfig'
import heroImg from '../images/hero-img.svg'
import backgroundImg from '../images/grey-background.png'
import blueTick from '../images/blue-tick.svg'
import AutoLinkText from 'react-autolink-text2'
import Announcement from '../components/Announcement'
import UnorderedList from '../components/Layout/html/UnorderedList'
import bgPattern from '../images/bg-pattern-gray.svg'
import track from '../utilities/track'
import { Container, Grid, Col, small, medium, large } from '../layouts/grid'

class Index extends React.Component {
  track = (name) => () => {
    track(name, {
      source: 'home'
    })
  }
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (<Layout location={this.props.location}>
      <div className='index-container'>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <main>
          <HeaderGrid>
            <IndexHeadContainer>
              <SiteHeader
                activeSection={''}
                location={this.props.location}
                types={this.props.data.navTypes} />
            </IndexHeadContainer>
            <Announcement data={this.props.data} />
          </HeaderGrid>
          <Hero className={`home-hero`}>
            <Container className='hero-wrapper'>
              <Grid>
                <Col span={7} large>
                  <h1 className='hero-title'>Build User-Centric Ethereum Apps</h1>
                  <ValueProps>
                    <h2>Give your users the sovereignty to manage details about their digital-selves.</h2>
                  </ValueProps>
                </Col>
                <Col span={5} large>
                  <div className={`hero-img`}>
                    <img src={heroImg} />
                  </div>
                </Col>
                <Col span={6}>
                  <div className='hero-feature'>
                    <div className='hero-feature-content'>
                      <h2>Connect Users to Your web3 dApp</h2>
                      <p>Add full support for uPort by adding a single line of code to your web3 dApp.</p>
                      <UnorderedList>
                        <li>Onboard new users within minutes</li>
                        <li>Instantly create a privacy-preserving Ethereum account</li>
                        <li>Build for both desktop and mobile browsers</li>
                      </UnorderedList>
                    </div>
                    <Link className='home-hero-button'
                      to='/guides/gettingstarted'
                      onClick={this.track('Connect With Users Clicked')}
                    >
                      Connect With Your Users
                    </Link>
                  </div>
                </Col>
                <Col span={6} >
                  <div className='hero-feature'>
                    <div className='hero-feature-content'>
                      <h2>Issue & Request Verified Credentials</h2>
                      <p>Help your users build their digital identity by issuing Verified Credentials about them or the things they do in your app.</p>
                      <UnorderedList>
                        <li>Request Ethereum transaction signing with web3</li>
                        <li>Issue and Request Verified Credentials about your users</li>
                      </UnorderedList>
                    </div>
                    <Link to='/uport-credentials/index'
                      className='home-hero-button'
                      onClick={this.track('Issue Credentials Clicked')}
                    >
                      Issue Verified Credentials
                    </Link>
                  </div>
                </Col>
              </Grid>
            </Container>
          </Hero>
          <BodyContainer className={`body-container`}>
            <Solutions />
            <BuildingBlocks />
          </BodyContainer>
          <FooterContainer>
            <SiteFooter />
          </FooterContainer>
        </main>
      </div>
    </Layout>);
  }
}

const AnnouncementContainer = styled.div`
  text-align: center;
  align-self: center;
  margin: auto;
  color: #cc0066;
  padding: 0 10px;
`
const HeaderGrid = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
  aside {
    transform: translateY(-30px);
  }
`
const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
`
const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr;

  ${small(`
    display: flex;
    flex-direction: column;
    height: inherit;
  `)}
`
const ValueProps = styled.div`
  h2 {
     color: #8986a0;
  }
`
const Hero = styled.div`
  background-color: #fff;
  margin-bottom: -20vh;

  h2 {
    font-size 24px;
    margin-top: 0;
  }
  .hero-wrapper {
    padding: 60px 0;
  }
  .hero-img {
    text-align: center;
    ${small('display: none;')}
  }
  .home-hero-button {
    border: 2px solid #5c50ca;
    border-radius: 4px;
    background: linear-gradient(180deg, #7958D8 0%, #5C50CA 100%);
    box-shadow: 0 2px 10px 0 rgba(63,61,75,0.2);
    display: block;
    padding: 20px;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
  }
  .hero-feature {
    background-color: #fff;
    display: grid;
    grid-template-rows: 1fr minmax(60px, auto);
    padding: 20px;
    position: relative;
    z-index: 5;
    ${medium(`
      padding: 40px;
      position: relative;
      top: 100px;
    `)}

    ul {
      margin: 20px 0 0;
      ${large('margin: 20px 0 0 40px;')}
    }
  }
  ${small(`
    h1 {
      font-size: 34px;
      line-height: 40px;
    }
    .hero-wrapper {
      padding: 0;
    }
    .hero-features {
      h2 {
        margin-top: 20px;
      }
    }
  `)}
`

const BodyContainer = styled.div`
  background: #f9f9fa url(${bgPattern});
  background-size: 60%;
  margin: 0 auto;
`
const FooterContainer = styled.footer`
  background-color: #6c59cf;
  clear: all;
`

const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
          }
        }
      }
    }
    navTypes:
    allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null }, index: { ne: null }}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          frontmatter {
            category
            type
            index
          }
        }
      }
    }
    announcement: allMarkdownRemark(
      filter: { frontmatter: { announcement: { ne: null } } }) {
        totalCount
        edges {
          node {
            frontmatter {
              announcement
            }
          }
        }
      }
  }
`

export default (props => <StaticQuery
  query={query}
  render={data => <Index {...props} data={data} /> } />)
