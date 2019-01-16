import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql, Link, StaticQuery } from 'gatsby'

import SiteHeader from '../../components/Layout/Header'
import config from '../../../data/SiteConfig'
import '../../layouts/css/myapps.css'

const BodyContainer = styled.div`
background-color: #f9f9fa;
height: 100%;
min-height: 100vh;
.returnLink {
  float: right;
  color: #8986A0;
  margin: 30px 0 0;
  background-color: #735ad2;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  text-decoration: none;
  float: right;
  font-size: 14px;
}
.sampleInstructions h1 {
  margin: 30px 0 40px 0;
}
`

class MyAppsSampleCodePage extends React.Component {
  render () {
    return (
      Object.keys(this.props.profile).length
      ? <div className='index-container myapps'>
        <Helmet title={config.siteTitle} />
        <main>
          <MyAppsHeadContainer>
            <SiteHeader
              activeCategory={''}
              location={this.props.location}
              categories={this.props.data.navCategories} />
          </MyAppsHeadContainer>
          <BodyContainer className='appMgrBody'>

            <div className={'Grid Grid--gutters'}>
              <div className='Grid-cell sidebar'>
                <h4>Register an app</h4>
                <ul>
                  <li><Link to='/myapps/startbuilding'>App Details</Link></li>
                  <li className='active'><a href='#'>App Code</a></li>
                </ul>
              </div>
              <div className='Grid-cell'>
                <div className={'Grid Grid--gutters'}>
                  <div className='Grid-cell sampleInstructions'>
                    <Link to='/myapps/list' className='returnLink'>Go to My Apps</Link>
                    <h1>App Code</h1>
                    <ul>
                      <li>
                        <h3>Install Library</h3>
                        <div className='sampleCode'>
                          <span>npm install uport-connect</span>
                        </div>
                      </li>
                      <li>
                        <h3>Initialize uPort Connect</h3>
                        <div className='sampleCode'>
                          <span>import {'{'} Connect {'}'} from 'uport-connect'</span>
                          {this.props.currentApp.configuration.accountType === 'none'
                            ? <span>const uport = new Connect('{this.props.currentApp.name}')</span>
                            : <span>const uport = new Connect('{this.props.currentApp.name}', {'{'}network: '{this.props.currentApp.configuration.network}'{'}'})</span>
                          }
                        </div>
                      </li>
                      <li>
                        <h3>Request Credentials</h3>
                        <div className='sampleCode'>
                          <pre><code style={{backgroundColor: '#f4f4f7'}} className={`language-javascript`}>
                            {`uport.requestDisclosure({
  requested: ['name','country'],
  notifications: true,
  issc: '${this.props.currentApp.configuration.profile['/']}'
})
uport.onResponse('disclosureReq').then(payload => {
  const address = payload.address
})
                        `}
                          </code></pre>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <footer>
              <a href='https://chat.uport.me/#/home'>Having trouble getting your app set up? Get in touch with us.</a>
            </footer>
          </BodyContainer>
        </main>
      </div>
      : this.props.history.push('/myapps')
    )
  }
}

const MyAppsHeadContainer = styled.div`
  background: ${props => props.theme.brand}
`

const query = graphql`
query AppManagerSnippetQuery {
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

MyAppsSampleCodePage.propTypes = {
  currentApp: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ profile, currentApp }) => {
  return { profile, currentApp }
}

const MyAppsSampleCodePageContainer = connect(mapStateToProps)(MyAppsSampleCodePage)

export default (props => <StaticQuery
  query={query}
  render={data => <MyAppsSampleCodePageContainer {...props} data={data} /> } />)
