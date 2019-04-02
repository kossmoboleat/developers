import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../../../../components/layout'
import config from '../../../../../data/SiteConfig'
import EnterDomain from '../../../../components/MyApps/Configurator/EnterDomain'
import UploadDID from '../../../../components/MyApps/Configurator/UploadDID'
import Verify from '../../../../components/MyApps/Configurator/VerifyDomain/Verify'
import * as actions from '../../../../actions'
import '../../../../layouts/css/myapps.css'

class VerifyDomain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 1,
      enterDomain: {
        appURL: null
      },
      domainVerification: {
        domainVerified: false
      }
    }
    this.getVerifyDomainChildState = this.getVerifyDomainChildState.bind(this)
    this.nextVerifyDomainStep = this.nextVerifyDomainStep.bind(this)
    this.previousVerifyDomainStep = this.previousVerifyDomainStep.bind(this)
    this.handleTryAgain = this.handleTryAgain.bind(this)
  }
  getVerifyDomainChildState (childName, childState) {
    let childStateObject = {}
    childStateObject[childName] = childState
    this.setState(childStateObject)
    this.nextVerifyDomainStep()
  }
  nextVerifyDomainStep (e) {
    if (e) e.preventDefault()
    const { step } = this.state
    this.setState({step: step + 1})
    if (step + 1 === 4) {
      this.props.getChildState('domainVerification', {
        appUrl: this.state.enterDomain.appURL,
        domainVerified: this.state.domainVerification.domainVerified,
        showDomainVerification: false
      })
    }
  }
  handleTryAgain (e) {
    if (e) e.preventDefault()
    this.setState({step: 1})
  }
  previousVerifyDomainStep (e) {
    if (e) e.preventDefault()
    const { step } = this.state
    this.setState({step: step - 1})
  }
  render () {
    return (
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
                      getChildState={this.getVerifyDomainChildState} />
                  case 2:
                    return <UploadDID
                      appURL={this.state.enterDomain.appURL}
                      getChildState={this.getVerifyDomainChildState}
                      currentApp={this.props.currentApp}
                      previousStep={this.previousVerifyDomainStep} />
                  case 3:
                    return <Verify
                      uportApps={this.props.profile['uport-apps'] || []}
                      appURL={this.state.enterDomain.appURL}
                      currentApp={this.props.currentApp}
                      appIndex={this.props.appIndex}
                      handleTryAgain={this.handleTryAgain}
                      getChildState={this.getVerifyDomainChildState}
                      previousStep={this.previousVerifyDomainStep} />
                }
              })()}
            </div>
          </BodyContainer>
        </main>
      </div>
    )
  }
}

const BodyContainer = styled.div``

VerifyDomain.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyDomain)
