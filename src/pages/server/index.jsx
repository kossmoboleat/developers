import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../components/layout'
import SEO from '../../components/SEO/SEO'
import SiteHeader from '../../components/Layout/Header'
import SiteFooter from '../../components/Layout/Footer'
import ServerHero from '../../components/server/ServerHero'
import ServerValueProp from '../../components/server/ServerValueProp'
import ServerSolutions from '../../components/server/ServerSolutions'
import ServerResources from '../../components/server/ServerResources'
import config from '../../../data/SiteConfig'
import heroImg from '../../images/Image.svg'
import AutoLinkText from 'react-autolink-text2'
import bgPattern from '../../images/bg-pattern-gray.svg'

class Server extends React.Component {
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (<Layout location={this.props.location}>
      <React.Fragment>
        <div className='index-container'>
          <Helmet title={config.siteTitle} />
          <SEO postEdges={postEdges} />
            <main>
              <IndexHeadContainer>
                <SiteHeader
                  activeCategory={''}
                  location={this.props.location}
                  categories={this.props.data.navCategories} />
              </IndexHeadContainer>
              <ServerHero />
              <BodyContainer className={`body-container`}>
                <ServerValueProp />
                <ServerSolutions />
                <ServerResources />
              </BodyContainer>
              <FooterContainer>
                <SiteFooter />
              </FooterContainer>
            </main>
        </div>
      </React.Fragment>
    </Layout>);
  }
}

const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
  header {
    width: 90vw;
    margin: 0 auto;
  }
  h4 {
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    font-size: 18px;
  }
  .Grid, .Grid-cell {
    word-wrap: break-word
  }
  .Grid--gutter {

  }
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
  query ServerQuery {
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
  render={data => <Server {...props} data={data} /> } />)
