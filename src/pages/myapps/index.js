import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql, Link, StaticQuery } from 'gatsby'

import Layout from '../../components/layout'
import LoginModal from '../../components/UportLogin'
import * as actions from '../../actions'
// import { uPortConnect } from '../../utilities/uPortConnectSetup'
import SiteHeader from '../../components/Layout/Header'
import config from '../../../data/SiteConfig'
import myAppsBg from '../../images/myapps-bg.svg'
import greenTick from '../../images/greenTick.svg'
import logo from '../../images/Horizontal-Logo-purple.svg'
import { medium } from '../../layouts/grid'
import '../../layouts/css/myapps.css'

class MyApps extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      environment: null,
      loginModal: false
    }
    this.loginRequest = this.loginRequest.bind(this)
  }
  loginRequest (e) {
    e.preventDefault()
    // const history = this.props.history
    // try {
    //   uPortConnect.requestDisclosure({requested: ['name'], verified: ['uport-apps'], notifications: true})
    //   uPortConnect.onResponse('disclosureReq').then(response => {
    //     this.props.saveProfile({name: response.payload.name, did: response.payload.did, uportApps: response.payload['uport-apps']})
    //     if (this.props.profile.uportApps) {
    //       history.push('/myapps/list')
    //     } else {
    //       history.push('/myapps/configurator')
    //     }
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
    this.setState({ loginModal: true })
  }
  handleLoginSuccess = (profile) => {
    this.setState({ loginModal: false })
    this.props.saveProfile({
      name: profile.name,
      did: profile.did,
      uportApps: profile['uport-apps'] || [],
      pushToken: profile.pushToken,
      publicEncKey: profile.boxPub
    })
    this.props.redirectToAppConfig()
  }
  hideLoginModal = () => {
    this.setState({ loginModal: false })
  }
  hideVerificationModal = () => {
    this.setState({ verif: false })
  }
  render () {
    return (<Layout location={this.props.location}>
      <div className='index-container'>
        <Helmet title={config.siteTitle} />
        <main>
          <BodyContainer>
            <div className={'Grid Grid--gutters'}>
              <div className='Grid-cell myapps-start-left-wrap'>
                <div className='myapps-start-left'>
                  <Link to='/'>
                    <Logo src={logo} className='brand-img' />
                  </Link>
                  <h1 className='title'>Decentralized Identity for Decentralized Applications</h1>
                  <ul>
                    <li>Seamless login.</li>
                    <li>Ethereum transaction signing.</li>
                    <li>User credential issuance and consumption</li>
                  </ul>
                  <div className={`myapps-button`}>
                    <a href='#' onClick={(e) => { this.loginRequest(e) }}>
                      Register Your App with uPort
                    </a>
                  </div>
                  <div className='headsUp'>
                    <p><strong>Heads up!</strong>
                    Have your mobile phone handy.</p>
                  </div>
                </div>
              </div>
              <div className='Grid-cell myapps-start-right'>
                <div className='skewed-bg' />
              </div>
            </div>
          </BodyContainer>
        </main>
        <LoginModal
          show={this.state.loginModal}
          onLoginSuccess={this.handleLoginSuccess}
          onClose={this.hideLoginModal} />
      </div>
    </Layout>)
  }
}

const BodyContainer = styled.div`
  padding: 0;
  overflow: hidden;
  ul {
     margin-top: 1em;
     list-style: none;
     padding-left: 20px;
  }
  ul li {
    line-height: 32px;
    font-size: 20px;
  }
  ul li::before {
    content: '';
    color: #62B482;
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 15px;
    vertical-align: middle;
    text-align: center;
    position: relative;
    bottom: 2px;
    direction: rtl;
    background-image: url(${greenTick});
    background-size: contain;
    background-repeat: no-repeat;
  }
  .myapps-start-left {
    padding: 0;
    ${medium('padding: 0 60px;')}
  }
  .myapps-start-right {
    display: none;
    height: 100vh;
    background-image: url(${myAppsBg});
    padding: 0 !important;
    overflow: hidden;
    ${medium('display: block;')}
  }
  .skewed-bg {
    background: #f9f9fa;
    height: 100vh;
    width: 100px;
    transform: skew(5deg) translateX(-50%);
  }
`
const Logo = styled.img`
  margin-bottom: 20px;
  ${medium(`
    position: absolute;
    top: 30px;
  `)}
  width: 120px;
`

const query = graphql`
query MyAppsQuery {
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

MyApps.propTypes = {
  profile: PropTypes.object.isRequired,
  saveProfile: PropTypes.func.isRequired
}

const mapStateToProps = ({ profile }) => ({
  profile
})

const mapDispatchToProps = dispatch => ({
  redirectToAppConfig() {
    dispatch(actions.redirectToAppConfig())
  },
  redirectToAppList() {
    dispatch(actions.redirectToAppList())
  },
  saveProfile(profile) {
    dispatch(actions.saveProfile(profile))
  }
})

const MyAppsContainer = connect(mapStateToProps, mapDispatchToProps)(MyApps)

export default (props => <StaticQuery
  query={query}
  render={data => <MyAppsContainer {...props} data={data} /> } />)
