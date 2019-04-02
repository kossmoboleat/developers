import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../../../components/layout'
import config from '../../../../data/SiteConfig'
import EnterDomain from '../../../components/MyApps/Configurator/EnterDomain'
import UploadDID from '../../../components/MyApps/Configurator/UploadDID'
import Verify from '../../../components/MyApps/Configurator/VerifyDomain/Verify'
import * as actions from '../../../actions'
import '../../../layouts/css/myapps.css'

class MyAppsVerification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 1,
      enterDomain: {
        appURL: null
      },
      verifyDomain: {
        verified: false
      }
    }
    this.getChildState = this.getChildState.bind(this)
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this)
  }
  componentDidMount () {
    if (!this.props.profile.uportApps)
      this.props.redirectToMyApps()
  }
  async getChildState (childName, childState) {
    let childStateObject = {}
    childStateObject[childName] = childState
    console.log(childStateObject)
    this.setState(childStateObject)
    this.nextStep()
  }
  nextStep (e) {
    if (e)
      e.preventDefault()
    const { step } = this.state
    this.setState({ step: step + 1})
  }
  previousStep (e) {
    e.preventDefault()
    const { step } = this.state
    this.setState({ step: step - 1})
  }
  render () {
    return (<Layout location={this.props.location}>
      <div className='index-container' style={{minHeight: '100vh'}}>
        <Helmet title={config.siteTitle} />
        <main>
          <BodyContainer>
            <div className={'configuratorWrap'}>
              {(() => {
                switch (this.state.step) {
                  case 1:
                    return <EnterDomain
                      appURL={this.state.enterDomain.appURL}
                      getChildState={this.getChildState} />
                  case 2:
                    return <UploadDID
                      appURL={this.state.enterDomain.appURL}
                      getChildState={this.getChildState}
                      currentApp={this.props.currentApp}
                      previousStep={this.previousStep} />
                  case 3:
                    return <VerifyDomain
                      uportApps={this.props.profile['uport-apps'] || []}
                      appURL={this.state.enterDomain.appURL}
                      currentApp={this.props.currentApp}
                      appIndex={this.props.appIndex}
                      getChildState={this.getChildState}
                      previousStep={this.previousStep} />
                  default :
                    return <EnterDomain getChildState={this.getChildState} />
                }
              })()}
            </div>
          </BodyContainer>
        </main>
      </div>
    </Layout>)
  }
}

const BodyContainer = styled.div``

export const query = graphql`
query MyAppsVerificationQuery {
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

MyAppsVerification.propTypes = {
  profile: PropTypes.object.isRequired,
  currentApp: PropTypes.object.isRequired
}

const mapStateToProps = ({ profile, currentApp, appIndex }) => ({
  profile,
  currentApp,
  appIndex
})

const mapDispatchToProps = dispatch => ({
  saveApps (apps) {
    dispatch(actions.saveApps(apps))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAppsVerification)
