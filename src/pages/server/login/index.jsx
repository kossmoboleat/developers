import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link, StaticQuery } from 'gatsby'

import Layout from '../../../components/layout'
import SEO from '../../../components/SEO/SEO'
import SiteHeader from '../../../components/Layout/Header'
import SiteFooter from '../../../components/Layout/Footer'
import ServerLoginResources from '../../../components/server/login/ServerLoginResources'
import ServerLoginValueProp from '../../../components/server/login/ServerLoginValueProp'
import config from '../../../../data/SiteConfig'
import AutoLinkText from 'react-autolink-text2'
import track from '../../../utilities/track'

class ServerLogin extends React.Component {
  track = (name, properties={}) => {
    track(name, {
      source: 'Server Login Landing',
      ...properties
    })
  }
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (<Layout location={this.props.location}>
      <IndexContainer>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <main>
          <IndexHeadContainer>
            <SiteHeader
              activeCategory={''}
              location={this.props.location}
              categories={this.props.data.navCategories} />
          </IndexHeadContainer>
          <div className='cta-wrapper'>
            <div className='cta'>
              <h4>SERVER APPS</h4>
              <h1>Login</h1>
              <p>
                The Login Solution for Your Server-side dApp
              </p>
              <Link to='/credentials/login' onClick={this.track("Get Started Clicked")}>
                <div className='cta-button'>
                  GET STARTED
                </div>
              </Link>
            </div>
          </div>
          <BodyContainer className={`body-container`}>
            <ServerLoginValueProp />
            <ServerLoginResources />
          </BodyContainer>
          <FooterContainer>
            <SiteFooter />
          </FooterContainer>
        </main>
      </IndexContainer>
    </Layout>);
  }
}

const IndexContainer = styled.div`
a {
  text-decoration: none;
}
.cta {
  margin: 109px auto 90px;
  padding: 0 20px;
  text-align: center;
}
.cta-button {
  height: 60px;
  width: 260px;
  margin: 31px auto 0 auto;
  background: #4C9EA6;
  border: none;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 800;
  line-height: 58px;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
}
h1 {
  color: #3E3C49;
  font-size: 48px;
  line-height: 72px;
  font-weight: 800;
  margin: unset;
  margin: initial;
}
h4 {
  font-style: normal;
  font-weight: 800;
  line-height: 24px;
  font-size: 18px;
  color: #4C9EA6;
  padding-bottom: 9px;
  margin: unset;
  margin: initial;
}
`

const IndexHeadContainer = styled.div`
background: ${props => props.theme.brand};
`

const BodyContainer = styled.div`
  background-color: #F9F9FA;
  margin: 0 auto;
`

const FooterContainer = styled.footer`
  background-color: #6c59cf;
  clear: all;
`

const query = graphql`
  query ServerLoginQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { type: { ne: null }}}
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
    navCategories:
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
  render={data => <ServerLogin {...props} data={data} /> } />)

