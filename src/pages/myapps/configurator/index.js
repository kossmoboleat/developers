import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { connect } from 'react-redux'

import { addFile } from '../../../utilities/ipfs'
import { Credentials } from 'uport-credentials'
import Layout from '../../../components/layout'
import SiteHeader from '../../../components/Layout/Header'
import config from '../../../../data/SiteConfig'
import logo from '../../../images/logo-mark-purple.svg'
import AppEnvironment from '../../../components/MyApps/Configurator/AppEnvironment'
import AppDetails from '../../../components/MyApps/Configurator/AppDetails'
import AppSigningKey from '../../../components/MyApps/Configurator/AppSigningKey'
import AppRegComplete from '../../../components/MyApps/Configurator/AppRegComplete'
import * as actions from '../../../actions'
import '../../../layouts/css/myapps.css'

class MyAppsConfigurator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 1,
      appEnvironment: {
        environment: null,
        network: 'mainnet'
      },
      appDetails: {
        appName: '',
        appDescription: '',
        appIdentity: {}
      },
      appDomain: null,
      appProfileHash: null,
      pk: null
    }
    this.getChildState = this.getChildState.bind(this)
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this)
  }
  componentDidMount() {
    if(!this.props.profile.uportApps)
      this.props.redirectToMyApps()
  }
  async getChildState (childName, childState) {
    let childStateObject = {}
    childStateObject[childName] = childState
    this.setState(childStateObject)
    this.nextStep()
    if (childName === 'appDetails' && this.state.appEnvironment.environment == 'server') {
      await this.buildClaim()
    }
  }
  async buildClaim () {
    let profileClaim = {'name': this.state.appDetails.appName}
    if (this.state.appDetails.ipfsLogoHash) profileClaim['profileImage'] = {'/': `/ipfs/${this.state.appDetails.ipfsLogoHash}`}
    if (this.state.appDetails.ipfsBgHash) profileClaim['bannerImage'] = {'/': `/ipfs/${this.state.appDetails.ipfsBgHash}`}
    if (this.state.appDetails.appDescription) profileClaim['description'] = this.state.appDetails.appDescription

    const credentials = new Credentials({
      did: this.state.appDetails.appIdentity.did,
      privateKey: this.state.appDetails.appIdentity.pk
    })
    const jwt = await credentials.createVerification({
      sub: this.state.appDetails.appIdentity.did,
      claim: profileClaim
    })
    return await this.uploadClaim(jwt)
  }
  async uploadClaim (profileClaim) {
    const result = await addFile(profileClaim)
    this.setState({ipfsProfileHash: result.Hash})
    console.log(`Uploaded profile claim: https://ipfs.io/ipfs/${result.Hash}`)
    return result.Hash
  }
  nextStep (e) {
    if(e)
      e.preventDefault()
    const { step, appEnvironment } = this.state
    if(step === 2 && appEnvironment.environment !== 'server')
      this.setState({ step: step + 2})
    else
      this.setState({ step: step + 1})
  }
  previousStep (e) {
    e.preventDefault()
    const { step, appEnvironment } = this.state
    if(step === 4 && appEnvironment.environment !== 'server')
      this.setState({ step: step - 2})
    else
      this.setState({ step: step - 1})
  }
  saveKey = pk => {
    this.setState({ pk })
  }
  render () {
    return (<Layout location={this.props.location}>
      <div className='index-container' style={{minHeight: '100vh'}}>
        <Helmet title={config.siteTitle} />
        <main>
          {this.state.step == 4
            ? <AppManagerHeadContainer>
                <SiteHeader
                  activeCategory={''}
                  location={this.props.location}
                  categories={this.props.data.navCategories} />
              </AppManagerHeadContainer>
            : null
          }
          <BodyContainer>
            <div className={'configuratorWrap'}>
              {this.state.step !== 4
                ? <span className={`brand w-nav-brand`}>
                    <Link to='/'>
                      <img src={logo} className='brand-img' />
                    </Link>
                  </span>
                : null
              }
              {(() => {
                switch (this.state.step) {
                  case 1:
                    return <AppEnvironment
                      appEnvironment={this.state.appEnvironment}
                      getChildState={this.getChildState} />
                  case 2:
                    return <AppDetails
                      uportApps={this.props.profile.uportApps}
                      appDetails={this.state.appDetails}
                      appEnvironment={this.state.appEnvironment}
                      getChildState={this.getChildState}
                      previousStep={this.previousStep} />
                  case 3:
                    if (this.state.appEnvironment.environment === 'server') {
                      return <AppSigningKey
                        appDetails={this.state.appDetails}
                        appEnvironment={this.state.appEnvironment}
                        getChildState={this.getChildState}
                        previousStep={this.previousStep}
                        onGenerateKey={this.saveKey} />
                    }
                  case 4:
                    return <AppRegComplete
                      profile={this.props.profile}
                      appDetails={this.state.appDetails}
                      appEnvironment={this.state.appEnvironment}
                      getChildState={this.getChildState}
                      saveApps={this.props.saveApps}
                      ipfsProfileHash={this.state.ipfsProfileHash}
                      signingKey={this.state.pk} />
                  default :
                    return <AppEnvironment getChildState={this.getChildState} />
                }
              })()}
            </div>
          </BodyContainer>
        </main>
      </div>
    </Layout>);
  }
}

const BodyContainer = styled.div``

export const query = graphql`
query MyAppsConfiguratorQuery {
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


const AppManagerHeadContainer = styled.div`
  background: ${props => props.theme.brand}
`

MyAppsConfigurator.propTypes = {
  profile: PropTypes.object.isRequired,
  saveProfile: PropTypes.func.isRequired
}

const mapStateToProps = ({ profile }) => ({
  profile
})

const mapDispatchToProps = dispatch => ({
  saveProfile(profile) {
    dispatch(actions.saveProfile(profile))
  },
  saveApps(apps) {
    dispatch(actions.saveApps(apps))
  },
  redirectToMyApps() {
    dispatch(actions.redirectToMyApps())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAppsConfigurator)
