import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from 'gatsby'

import Layout from "../components/layout"
import PostListing from "../components/PostListing/PostListing";
import styled from 'styled-components'
import RehypeReact from 'rehype-react'
import AutoLinkText from 'react-autolink-text2'
import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import DevSurvey from '../components/Survey'
import config from '../../data/SiteConfig'
import TableOfContents from '../components/Layout/TableOfContents'
import SecondaryTitle from '../components/Layout/html/SecondaryTitle'
import OrderedList from '../components/Layout/html/OrderedList'
import UnorderedList from '../components/Layout/html/UnorderedList'
import CtaButton from '../components/CtaButton'
import Announcement from '../components/Announcement'
import getHeadings from '../utilities/getHeadings'
import { Container, Grid, Col, Spacer, small } from '../layouts/grid'

class CategoryTemplate extends React.Component {
  getContentWindow = () => this.contentWindow
  render() {
    const category = this.props.pageContext.category;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const types = []

    const renderAst = new RehypeReact({
      createElement: React.createElement,
      components: {
        h2: SecondaryTitle,
        ul: UnorderedList,
        ol: OrderedList
      }
    }).Compiler

    let postNode = null
    let slug = null
    const chapterTitles = []
    let post = null
    let type = null
    let index = null

    postEdges.sort((a,b) => b.node.frontmatter.index - a.node.frontmatter.index).forEach((_type) => {
      if (_type.node.frontmatter.index >= 0 && (_type.node.frontmatter.category === category)) {
          index = _type.node.frontmatter.index
          slug = _type.node.fields.slug
          postNode = _type.node
          post = postNode.frontmatter
          type = post.type
          types.push(_type)
          chapterTitles.push(_type.node.frontmatter.title)
      }
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
            <Announcement data={this.props.data} />
            <Container>
              <Grid>
                <ToCContainer>
                  <TableOfContents
                    types={types}
                    post={post}
                    headings={getHeadings(postNode.htmlAst)}
                    getContentWindow={this.getContentWindow}
                  />
                </ToCContainer>
                <Spacer span={1} />
                <Col span={7}>
                  <CtaButton to={`${post.source}`}>
                    Edit
                  </CtaButton>
                  <Grid style={{width: "100%"}}>
                    <Col span={12} style={{width: "100%"}}>
                    <div className={`docSearch-content`}>
                      { renderAst(postNode.htmlAst) }
                    </div>
                    </Col>
                  </Grid>
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
  overflow-y: auto;
  overflow-x: hidden;
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

const query = graphql`
  query CategoryPage($category: String, $slug: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { category: { eq: $category }, index: { ne: null} } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
        }
        htmlAst
        headings  {
          value
          depth
        }
        excerpt
        timeToRead
        frontmatter {
          title
          category
          type
          index
          source
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
        index
        source
      }
      fields {
        slug
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

export default (props => <StaticQuery
  query={query}
  render={data => <CategoryTemplate {...props} data={data} /> } />)
