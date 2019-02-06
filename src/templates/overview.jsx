import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import RehypeReact from 'rehype-react'
import AutoLinkText from 'react-autolink-text2'
import { graphql } from 'gatsby'
import _ from 'lodash'

import Layout from "../components/layout"
import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import DevSurvey from '../components/Survey.jsx'
import config from '../../data/SiteConfig'
import TableOfContents from '../components/Layout/TableOfContents'
import TableOfContentsUI from '../components/Layout/TableOfContentsUI'
import SecondaryTitle from '../components/Layout/html/SecondaryTitle'
import OrderedList from '../components/Layout/html/OrderedList'
import UnorderedList from '../components/Layout/html/UnorderedList'
import CtaButton from '../components/CtaButton'
import Announcement from '../components/Announcement'
import getHeadings from "../utilities/getHeadings"
import { Container, Grid, Col, Spacer, small } from '../layouts/grid'
import { cleanDoubleByteChars } from '../helpers/cleanDoubleByteChars'

const fixOverviewPaths = (path='') => path.replace(/^\/overview\/overview$/, '/overview')

class OverviewTemplate extends React.Component {
  getContentWindow = () => this.contentWindow
  render () {
    const renderAst = new RehypeReact({
      createElement: React.createElement,
      components: {
        h2: SecondaryTitle,
        ul: UnorderedList,
        ol: OrderedList
      }
    }).Compiler
    const { slug } = this.props.pageContext
    const postNode = this.props.data.postBySlug
    const post = postNode.frontmatter
    const type = post.type
    const messages = []
    let pathName = ''

    const postNodes = []
    this.props.data.postByCategory.edges.forEach(_type => {
      if (_type.node.frontmatter.type === type) {

        const postNode = {
          title: _type.node.frontmatter.title,
          path: fixOverviewPaths(_type.node.fields.slug),
          indexNumber: _type.node.frontmatter.index,
          category: _type.node.frontmatter.category,
          headings: _type.node.headings
        }
        if (postNode.indexNumber || postNode.indexNumber === 0) {
            postNodes.push(postNode)
        } else if (post.title == _post.node.frontmatter.title ) {
          postNodes.push({
            title: _post.node.frontmatter.title,
            path: fixOverviewPaths(_post.node.fields.slug),
            indexNumber: 0,
            category: _post.node.frontmatter.category,
            headings: _post.node.headings
          })
        }
      }
    })

    const listItems = []
    postNodes.sort((a, b) => a.indexNumber - b.indexNumber).forEach((cat) => {
      const chapterContents = []
      if (cat.headings) {
        cat.headings.forEach(node => {
          if (node.depth === 2) {
            const heading = cleanDoubleByteChars(_.kebabCase(node.value))
            chapterContents.push({
              headingId: heading,
              text: node.value,
              url: `${cat.path}#${heading}`,
              isPathMatch: cat.path === pathName
            })
          }
        })
      }
      const headingId = cleanDoubleByteChars(_.kebabCase(cat.title));
      if(headingId !== "releases") {
        listItems.push({
          headingId,
          text: cat.title.charAt(0).toUpperCase() + cat.title.slice(1),
          url: cat.path,
          innerLinks: chapterContents,
          isPathMatch: cat.path === pathName
        })
      }
    })

    // Manually add releases to Overview ToC
    listItems.push({
      headingId: 'releases',
      text: 'Releases',
      url: '/releases',
      innerLinks: [],
      isPathMatch: false
    })

    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }

    return (<Layout location={this.props.location}>
      <React.Fragment>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader
              activeType={type}
              location={this.props.location}
              types={this.props.navTypes}
            />
          </HeaderContainer>
          <BodyContainer ref={ref => this.contentWindow=ref}>
            <Container>
              <Grid>
                <ToCContainer>
                  <TableOfContentsUI
                    listItems={listItems}
                    headings={getHeadings(postNode.htmlAst)}
                    getContentWindow={this.getContentWindow}
                  />
                </ToCContainer>
                <Spacer span={1} />
                <Col span={7}>
                  <Announcement data={this.props.data} />
                  <CtaButton to={`${post.source}`}>
                    Edit
                  </CtaButton>
                  <div className={`docSearch-content`}>
                    { renderAst(postNode.htmlAst) }
                  </div>
                </Col>
                <Spacer span={4} />
                <Col span={8}>
                  <DevSurvey />
                </Col>
              </Grid>
            </Container>
          </BodyContainer>
        </BodyGrid>
      </React.Fragment>
    </Layout>)
  }
}

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
const BodyContainer = styled.div`
  overflow: auto;
  justify-self: center;
  padding: ${props => props.theme.sitePadding};
  padding-left: 0;
  padding-right: 0;
  width: 100%;

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
  h2 {
    margin-top: 60px;
  }
  code {
    // white-space: normal;
  }
`
const HeaderContainer = styled.div`
  background: ${props => props.theme.brand};
  width: 100vw;
  .Grid {
    width: 90vw;
    margin: 0 auto;
  }
`
const ToCContainer = styled.div`
  grid-area: 1 / 1 / 2 / 4;
  ${small('display: none;')}
`

export const query = graphql`
  query ($slug: String!) {
    allPostTitles: allMarkdownRemark(
      filter: { frontmatter: { index: { ne: null } } }
    ){
      edges {
        node {
          frontmatter {
            title
            index
            type
          }
          fields {
            slug
          }
        }
      }
    }
    navTypes: allMarkdownRemark (
      filter: { frontmatter: { category: { ne: null } } }
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
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      timeToRead
      excerpt
      headings  {
        value
        depth
      }
      frontmatter {
        title
        category
        type
        source
        index
      }
      fields {
        slug
      }
    }
    postByCategory:  allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null }, index: { ne: null } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          excerpt
          timeToRead
          frontmatter {
            title
            category
            index
            type
            source
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
              announcementType
            }
          }
        }
      }
  }
`

export default OverviewTemplate
