import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
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
import '../layouts/css/myapps.css'


import remark from 'remark';
import remarkHtml from 'remark-html';

class ReleasesTemplate extends React.Component {
  getContentWindow = () => this.contentWindow
  render () {
    let innerLinks = []
    this.props.data.github.nodes.map(repository => (
      innerLinks.push({
        headingId: `${repository.name.replace(/\s+/g, '-').toLowerCase()}`,
        text: repository.name,
        url: `/releases/${repository.name.replace(/\s+/g, '-').toLowerCase()}`,
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
    let headings = [
      {level: 2, id: "uport-connect", isInView: true, hasScrolledPast: false, active: true}
    ]
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
            <ToCContainer>
              <TableOfContentsUI listItems={listItems} headings={headings} getContentWindow={this.getContentWindow} />
            </ToCContainer>
            <BodyContainer ref={ref => this.contentWindow=ref}>
              <Announcement data={this.props.data.annoucement} />
              <h1>{this.props.data.github.repository.name}</h1>
              <RepoContainer id={`${this.props.data.github.repository.name.replace(/\s+/g, '-').toLowerCase()}`} className={'repository'}>
                {this.props.data.github.repository.releases.edges.map(release => (
                  <div>
                    <div dangerouslySetInnerHTML={{__html: remark().use(remarkHtml).processSync(release.node.description).toString()}} />
                  </div>
                ))}
              </RepoContainer>
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
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin-left: ${props => props.theme.bobbysLeftMarginPreference};
    margin-top: auto;
    margin-right: auto;
    margin-bottom: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
  h2 {
    margin-top: 60px;
  }
  .repository {
    margin-left: 0;
  }
  @media screen and (max-width: 1068px) {
    & > div {
      max-width: ${props => props.theme.contentWidthTablet};
      margin-left: ${props => props.theme.gregsLeftMarginPreference};
    }
  }
  @media screen and (max-width: 768px) {
    & > div {
      max-width: ${props => props.theme.contentWidthLargePhone};
    }
  }
  @media screen and (max-width: 520px) {
    & > div {
      max-width: ${props => props.theme.contentWidthLaptop};
    }
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
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  overflow: scroll;

  ::-webkit-scrollbar-track
  {
    background: ${props => props.theme.lightGrey};
  }
  ::-webkit-scrollbar
  {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb
  {
    background: ${props => props.theme.tocAccent};
  }
  @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
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
    github {
      repository(owner: "uport-project", name: $slug) {
        name
        releases(first: 2, orderBy: {field: CREATED_AT, direction: DESC}) {
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
      nodes(ids: ["MDEwOlJlcG9zaXRvcnk4MDU1NzkxOQ==", "MDEwOlJlcG9zaXRvcnk3ODEzNzA3Nw=="]) {
        ... on GitHub_Repository {
          url
          name
        }
      }
    }
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
            repoId
          }
        }
      }
    }
  }
`

export default ReleasesTemplate
