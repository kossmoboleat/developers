import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql, Link, StaticQuery } from 'gatsby'

import SiteHeader from '../../components/Layout/Header'
import Layout from "../../components/layout"
import AppList from '../../components/MyApps/AppList'
import { Container, Grid, Col, Spacer } from '../../layouts/grid'
import config from '../../../data/SiteConfig'
import '../../layouts/css/myapps.css'

const BodyContainer = styled.div`
background-color: #f9f9fa;
height: 100%;
min-height: 100vh;
`

class MyAppsAppListPage extends React.Component {
  componentDidMount () {
    if (Object.keys(this.props.profile).length === 0) {
      this.props.redirectToMyApps()
    }
  }
  render () {
    const { redirectToAppDetails } = this.props
    return (<Layout location={this.props.location}>
      <div className='index-container myAppsWrap appListPage'>
        <Helmet title={config.siteTitle} />
        <Main>
          <AppManagerHeadContainer>
            <SiteHeader
              activeCategory={''}
              location={this.props.location}
              categories={this.props.data.navCategories} />
          </AppManagerHeadContainer>
          <Container>
            <Grid>
              <Spacer span={1} />
              <Col span={5}>
                <h1>My Apps</h1>
              </Col>
              <Col span={5}>
                <Link to='/myapps/configurator' className='register-button'>
                  <span>+</span>
                  Register an App
                </Link>
              </Col>
              <Spacer span={1} />
              <Spacer span={1} />
              <Col span={10}>
                <div className='appList'>
                  {this.props.profile.uportApps
                  ? <AppList redirectToAppDetails={redirectToAppDetails} />
                  : null
                  }
                </div>
              </Col>
              <Spacer span={1} />
            </Grid>
          </Container>
        </Main>
      </div>
    </Layout>)
  }
}

const AppManagerHeadContainer = styled.div`
  background: ${props => props.theme.brand}
`
const Main = styled.main`
  min-height: 100vh;
  padding-bottom: 50px;
`

const query = graphql`
query AppManagerMyAppsQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { type: { eq: "content" }}}
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
  }
`

MyAppsAppListPage.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ profile }) => {
  return { profile }
}
const mapDispatchToProps = dispatch => ({
  redirectToMyApps() {
    dispatch({
      type: 'REDIRECT_MYAPPS'
    })
  },
  redirectToAppDetails() {
    dispatch({
      type: 'REDIRECT_APP_DETAILS'
    })
  }
})

const MyAppsAppListPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyAppsAppListPage)

export default (props => <StaticQuery
  query={query}
  render={data => <MyAppsAppListPageContainer {...props} data={data} /> } />)
