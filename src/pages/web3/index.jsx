import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import SEO from '../../components/SEO/SEO'
import SiteHeader from '../../components/Layout/Header'
import SiteFooter from '../../components/Layout/Footer'
import Web3Hero from '../../components/web3/Web3Hero'
import Web3ValueProp from '../../components/web3/Web3ValueProp'
import Web3Solutions from '../../components/web3/Web3Solutions'
import Web3Resources from '../../components/web3/Web3Resources'
import config from '../../../data/SiteConfig'
import AutoLinkText from 'react-autolink-text2'
import bgPattern from '../../images/bg-pattern-gray.svg'

class Web3 extends React.Component {
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (<Layout location={this.props.location}>
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
          <Web3Hero />
          <BodyContainer className={`body-container`}>
            <Web3ValueProp />
            <Web3Solutions />
            <Web3Resources />
          </BodyContainer>
          <FooterContainer>
            <SiteFooter />
          </FooterContainer>
        </main>
      </div>
    </Layout>)
  }
}

export default Web3

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

export const query = graphql`
  query Web3Query {
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
`;
