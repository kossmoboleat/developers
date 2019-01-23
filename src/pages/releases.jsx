import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import SiteFooter from '../components/Layout/Footer'
import styled from 'styled-components'
import config from '../../data/SiteConfig'
import Announcement from '../components/Announcement'
import TableOfContents from '../components/Layout/TableOfContents'
import SecondaryTitle from '../components/Layout/html/SecondaryTitle'
import OrderedList from '../components/Layout/html/OrderedList'
import UnorderedList from '../components/Layout/html/UnorderedList'


import remark from 'remark';
import remarkHtml from 'remark-html';

class ReleasesPage extends React.Component {
  getContentWindow = () => this.contentWindow
  render () {
    console.log(this.props.data.github)
    return (
      <div className='index-container'>
        <Helmet title={'Releases'} />
        <BodyGrid>
          <HeaderContainer style={{backgroundColor: 'rgb(92, 80, 202)'}}>
            <SiteHeader
              location={this.props.location}
            />
          </HeaderContainer>
          <ToCContainer>
          </ToCContainer>
          <BodyContainer ref={ref => this.contentWindow=ref}>
            <Announcement data={this.props.data.annoucement} />
            <h1>Releases</h1>
            {
            this.props.data.github.nodes.map(repository => (
              <div>
                <h3>{repository.name}</h3>
                <p>{repository.releases.edges[1].node.name}</p>
                <div dangerouslySetInnerHTML={{__html: remark().use(remarkHtml).processSync(repository.releases.edges[1].node.description).toString()}} />
              </div>
            ))
            }
          </BodyContainer>
        </BodyGrid>
      </div>
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

export const query = graphql`
  query releasesQuery {
    github {
      nodes(ids: ["MDEwOlJlcG9zaXRvcnk4MDU1NzkxOQ==", "MDEwOlJlcG9zaXRvcnk3ODEzNzA3Nw=="]) {
        id
        ... on GitHub_Repository {
          url
          name
          releases(first: 2) {
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
  }
`

export default ReleasesPage
