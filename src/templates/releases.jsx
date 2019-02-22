import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import remark from 'remark'
import remarkHtml from 'remark-html'
import tick from '../images/greenTick.svg'

import SEO from '../components/SEO/SEO'
import Layout from "../components/layout"
import SiteHeader from '../components/Layout/Header'
import SiteFooter from '../components/Layout/Footer'
import styled from 'styled-components'
import repositories from '../../data/repositories'
import Announcement from '../components/Announcement'
import TableOfContentsUI from '../components/Layout/TableOfContentsUI'
import { Container, Grid, Col, Spacer, small } from '../layouts/grid'
import '../layouts/css/myapps.css'


class ReleasesTemplate extends React.Component {
  getContentWindow = () => this.contentWindow
  render () {
    let headings = [{id: 'releases', level: 1}]
    let listItems = [{
      headingId: 'releases',
      text: 'Releases',
      url: '/releases',
      isPathMatch: false,
      innerLinks: []
    }]
    this.props.data.allSitePage.edges[0].node.context.tocRepos.map(repo => {
      let innerLinks = []
      let repoDomId = repo.name.replace(/\s+/g, '-').toLowerCase().replace('uport-', 'u-port-')
      headings.push({id: `${repoDomId}`,level: 2})
      repo.releases.edges.map(release => {
        let tagAnchor = (this.props.data.allSitePage.edges[0].node.context.slug === 'releases' ? `/releases/${repoDomId}#${release.node.tag.name.replace(/\s+/g, '-').toLowerCase()}` : `#${release.node.tag.name.replace(/\s+/g, '-').toLowerCase()}` )
        innerLinks.push({
          headingId: `${release.node.tag.name.replace(/\s+/g, '-').toLowerCase()}`,
          text: release.node.tag.name,
          url: tagAnchor,
          isPathMatch: false
        })
      })
      listItems.push({
        headingId: `${repoDomId}`,
        text: `${repo.name}`,
        url: `/releases/${repoDomId}`,
        isPathMatch: false,
        innerLinks: innerLinks
      })
    })
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
                    {this.props.data.allSitePage.edges[0].node.context.repositories.map(repository => {
                      let repoId = `${repository.name.replace(/\s+/g, '-').toLowerCase()}`;
                      repoId = repoId.replace('uport-', 'u-port-')
                      return (<RepoContainer key={repoId} className='repository'>
                        <h2 id={repoId} className='repoName'>
                          <a href={`/releases/#${repoId}`} aria-hidden='true' className='anchor'></a>
                          {repository.name}
                        </h2>
                        {repository.releases.edges.map(release => (<div key={release.node.name}>
                          <p id={release.node.tag.name} className='version'>
                            <a href={`#${release.node.tag.name}`} aria-hidden='true' className='anchor'></a>
                            {release.node.name}
                          </p>
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
  margin-top: 60px;
  h1 {
    font-size: 18px;
  }
  h2 {
    margin-top: 0;
    margin-bottom:0;
    color: #5F5D68;
  }
  h3 {
    color: #5F5D68;
    padding-bottom: 10px;
  }
  h2.repoName {
    font-size: 20px;
    font-weight: 800;
  }
  p.version {
    padding-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #5F5D68;
  }
  h2 code {
    font-family: Nunito Sans;
    font-size: 16px;
  }
  p {
    color: #5F5D68;
  }
  ul {
    list-style: none;
    margin: 10px 0 10px 30px;
    padding: 0;
    li {
      margin: 0 0 20px;
      padding-left: 20px;
      position: relative;
      color: #5F5D68;
    }
    li::before {
      background-image: url(${tick});
      background-position: 0 2px;
      background-repeat: no-repeat;
      background-size: contain;
      content: "";
      color: #62b482;
      height: 20px;
      left: -15px;
      text-align: center;
      width: 20px;
      position:absolute;
      top: 0;
    }
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
            tocRepos {
              name,
              url,
              releases {
                edges {
                  node {
                    name,
                    url, 
                    tag {
                      name
                    }
                  }
                }
              }
            },
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
