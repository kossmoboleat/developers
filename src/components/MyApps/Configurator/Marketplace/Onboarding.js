import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../../../../../data/SiteConfig'
import ServiceDetails from './ServiceDetails'
import SelectClaims from './SelectClaims'
import Review from './Review'
import '../../../../layouts/css/myapps.css'

class Onboarding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 1,
      serviceDetails: {
        appUrl: this.props.domainVerification.appUrl,
        serviceName: '',
        serviceDescription: '',
        location: '',
        global: false
      },
      selectClaims: {}
    }
    this.getChildState = this.getChildState.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }
  async getChildState (childName, childState) {
    let childStateObject = {}
    childStateObject[childName] = childState
    this.setState(childStateObject)
    this.nextStep()
  }
  nextStep (e) {
    if (e) e.preventDefault()
    const { step } = this.state
    this.setState({ step: step + 1})
  }
  previousStep (e) {
    e.preventDefault()
    const { step } = this.state
    this.setState({step: step - 1})
  }
  render () {
    const { appDetails } = this.props
    const { serviceDetails, selectClaims } = this.state
    return (
      <div className='index-container' style={{minHeight: '100vh'}}>
        <Helmet title={config.siteTitle} />
        <main>
          <BodyContainer>
            <div className={'configuratorWrap'}>
              {(() => {
                switch (this.state.step) {
                  case 1:
                    return <ServiceDetails
                      appDetails={appDetails}
                      appUrl={this.props.domainVerification.appUrl}
                      serviceDetails={serviceDetails}
                      getChildState={this.getChildState} />
                  case 2:
                    return <SelectClaims
                      appDetails={appDetails}
                      serviceDetails={serviceDetails}
                      getChildState={this.getChildState}
                      selectClaims={selectClaims}
                      previousStep={this.previousStep} />
                  case 3:
                    return <Review
                      appUrl={this.props.domainVerification.appUrl}
                      appDetails={appDetails}
                      serviceDetails={serviceDetails}
                      selectClaims={selectClaims}
                      getChildState={this.getChildState}
                      previousStep={this.previousStep} />
                  default :
                    return <ServiceDetails getChildState={this.getChildState} />
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

export default Onboarding
