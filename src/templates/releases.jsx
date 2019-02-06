import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import remark from 'remark'
import remarkHtml from 'remark-html'

import SEO from '../components/SEO/SEO'
import Layout from "../components/layout"
import SiteHeader from '../components/Layout/Header'
import SiteFooter from '../components/Layout/Footer'
import styled from 'styled-components'
import repositories from '../../data/repositories'
import Announcement from '../components/Announcement'
import TableOfContentsUI from '../components/Layout/TableOfContentsUI'
import SecondaryTitle from '../components/Layout/html/SecondaryTitle'
import OrderedList from '../components/Layout/html/OrderedList'
import UnorderedList from '../components/Layout/html/UnorderedList'
import { Container, Grid, Col, Spacer, small } from '../layouts/grid'
import '../layouts/css/myapps.css'


class ReleasesTemplate extends React.Component {
  getContentWindow = () => this.contentWindow
  render () {
    let innerLinks = []
    this.props.data.allSitePage.edges[0].node.context.repoNames.map(repoName => (
      innerLinks.push({
        headingId: `${repoName.replace(/\s+/g, '-').toLowerCase()}`,
        text: repoName,
        url: `/releases/${repoName.replace(/\s+/g, '-').toLowerCase()}`,
        isPathMatch: false
      })
    ))
    let listItems = [{
      headingId: 'releases',
      text: 'Releases',
      url: '/releases',
      isPathMatch: false,
      innerLinks: innerLinks
    }]
    let headings = [{
      level: 2,
      id: "u-port-connect",
      isInView: true,
      hasScrolledPast: false,
      active: true
    }]
    return (
      <Layout location={this.props.location}>
        <div className='index-container'>
          <Helmet title={'Releases'} />
          <BodyGrid>
            <HeaderContainer style={{backgroundColor: 'rgb(92, 80, 202)'}}>
              <SiteHeader
                activeSection={''}
                location={this.props.location}
              />
            </HeaderContainer>
            <BodyContainer ref={ref => this.contentWindow=ref}>
              <Container>
                <Grid>
                  <ToCContainer>
                    <TableOfContentsUI
                      listItems={listItems}
                      headings={headings}
                      getContentWindow={this.getContentWindow} />
                  </ToCContainer>
                  <Spacer span={1} />
                  <Col span={7}>
                    <Announcement data={this.props.data.annoucement} />
                    {this.props.data.allSitePage.edges[0].node.context.repositories.length > 1 ? <h1>Releases</h1> : null}
                    {this.props.data.allSitePage.edges[0].node.context.repositories.map(repository => {
                      let repoId = `${repository.name.replace(/\s+/g, '-').toLowerCase()}`;
                      repoId = repoId.replace('uport-', 'u-port-')
                      return (<RepoContainer key={repoId} className='repository'>
                        <h2 id={repoId} className='repoName'>{repository.name}</h2>
                        {repository.releases.edges.map(release => (<div key={release.node.name}>
                          <p>{release.node.name}</p>
                          <div dangerouslySetInnerHTML={{__html: remark().use(remarkHtml).processSync(release.node.description).toString()}} />
                        </div>))}
                      </RepoContainer>)
                    })}
                  </Col>
                </Grid>
              </Container>
            </BodyContainer>
          </BodyGrid>
        </div>
      </Layout>
    )
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
  background: '${props => props.theme.brand}';
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

const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
`

const FooterContainer = styled.footer`
  background-color: #6c59cf;
  clear: all;
`
const RepoContainer = styled.div`
  h1 {
    font-size: 18px;
  }
  h2.repoName {
    font-size: 26px;
  }
`

export const query = graphql`
  query ($slug: String!) {
    announcement:
      allMarkdownRemark(filter: { frontmatter: { announcement: { ne: null } } }) {
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
    allSitePage(filter: {context: {slug: { eq: $slug }}}) {
      edges {
        node {
          path
          context {
            slug,
            repoNames,
            repositories {
              id,
              name,
              url,
              releases {
                edges {
                  node {
                    name
                    description
                    url
                    tag {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ReleasesTemplate
