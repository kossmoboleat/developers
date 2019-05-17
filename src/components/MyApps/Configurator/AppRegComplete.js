import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import cog from '../../../images/cog.svg'
import tick from '../../../images/greenTick.svg'
import imageBg from '../../../images/Products-BG.svg'
import web3Img from '../../../images/web3monitor.png'
import arrowImg from '../../../images/ArrowBlack.png'
import orangeTick from '../../../images/orange-tick.svg'
import verificationIcon from '../../../images/uport-verification-badge.svg'
import marketplaceBg from '../../../images/uport-marketplace-bg.svg'
import UnorderedList from '../../Layout/html/UnorderedList'
import SendVerificationModal from '../../UportVerification'
import SampleCode from './RegistrationComplete/SampleCode'
import VerifyDomain from './VerifyDomain/VerifyDomain'
import Onboarding from './Marketplace/Onboarding'
import { Container, Grid, Col, medium, large, small } from '../../../layouts/grid'
import track, { trackPage } from '../../../utilities/track'


class AppRegComplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sendVerificationModal: false,
      domainVerification: {
        domainVerified: false,
        showDomainVerification: false,
        appURL: null
      },
      marketplaceOnboarding: {
        showMarketplaceOnboarding: false
      },
      marketplaceOnboardingStarted: false,
      marketplaceOnboardingComplete: false,
      claim: null
    }
    this.getChildState = this.getChildState.bind(this)
  }
  componentDidMount() {
    trackPage('App Configurator', {
      step: 'App Registration Complete',
      value: {
        name: this.props.appDetails.appName
      }
    })
    this.showPopup()
  }
  showPopup = () => {
    let uportApps = this.props.profile.uportApps || {}
    const {domainVerification} = this.state;
    const configuration = {
      network: this.props.appEnvironment.network != 'none'
        ? this.props.appEnvironment.network
        : '',
      environment: this.props.appEnvironment.environment,
      accentColor: this.props.appDetails.accentColor,
      profileImage: this.props.appDetails.ipfsLogoHash
        ? '/ipfs/' + this.props.appDetails.ipfsLogoHash
        : '',
      bannerImage: this.props.appDetails.ipfsBgHash
        ? '/ipfs/' + this.props.appDetails.ipfsBgHash
        : '',
      url: this.state.domainVerification.appUrl
        ? this.state.domainVerification.appUrl
        : '',
      description: this.props.appDetails.appDescription,
      did: this.props.appDetails.appIdentity.did
    }
    Object.keys(configuration).forEach(key => {
      configuration[key] || delete configuration[key]
    })
    let claim = {
      name: this.props.appDetails.appName,
      configuration
    }
    if (this.props.profile.uportApps) {
      if (!domainVerification.domainVerified) {
        console.log(claim)
        this.props.setCurrentApp(claim, uportApps.length)
        uportApps.push(claim)
      } else {
        uportApps[(uportApps.length - 1)] = claim
      }
      claim = {'uport-apps': uportApps}
    } else {
      this.props.setCurrentApp(claim, 0)
      claim = {'uport-apps': [claim]}
    }
    this.setState({
      claim,
      sendVerificationModal: true
    })
    if(Object.keys(uportApps).length)
      this.props.saveApps(uportApps)
    else
      this.props.saveApps(claim['uport-apps'])
  }
  hideUportVerificationModal = () => {
    this.setState({
      claim: null,
      sendVerificationModal: false
    })
  }
  track = (name, properties={}) => {
    track(name, {
      source: 'App Configurator',
      ...properties
    })
  }
  startDomainVerification = (e) => {
    e.preventDefault()
    this.setState({domainVerification: {showDomainVerification: true}})
  }
  startMarketplaceOnboarding = (e) => {
    e.preventDefault()
    this.setState({marketplaceOnboardingStarted: true})
  }
  getChildState (childName, childState) {
    let childStateObject = {}
    childStateObject[childName] = childState
    this.setState(childStateObject)
    if (childName === 'domainVerification') {
      this.showPopup()
    }
  }
  render () {
    const { appDetails, appEnvironment, signingKey, ipfsProfileHash } = this.props
    const { sendVerificationModal, claim, domainVerification, marketplaceOnboardingStarted, marketplaceOnboardingComplete } = this.state;

    if (domainVerification.showDomainVerification) {
      return (<div>
        <Section>
          <VerifyDomain getChildState={this.getChildState} />
        </Section>
      </div>)
    } else if (marketplaceOnboardingStarted) {
      // Marketplace Onboarding
      return (<div>
        <Section>
          <Onboarding
            appDetails={appDetails}
            domainVerification={domainVerification}
            getChildState={this.getChildState}
          />
        </Section>
      </div>)
    } else {
      // Sample Code
      return (<div>
        <Section>
          <Success>
            <Check src={tick} />
            {marketplaceOnboardingComplete
              ? <div>
                <h2>Congratulations</h2>
                <p>
                  {appDetails.appName} has joined uPort Marketplace
                  Start building with the resources below, or take a look at
                  our tutorials and docs.
                </p>
              </div>
              : <div>
                <h2>Registration complete!</h2>
                <p>
                  Congrats! {appDetails.appName} now has an application
                  identity with uPort.  Start building with the resources
                  below, or take a look at our tutorials and docs.
                </p>
              </div>
            }
          </Success>
          <NextSteps>
            <Content>
              <label className='nextsteps-grid-header'>Next Steps</label>
                {!domainVerification.domainVerified
                  ? <Step>
                      <Step.Left bg={verificationIcon} />
                      <Step.Right>
                          <h2>Get uPort verification badge</h2>
                          <p>
                            Verify your App URL domain in 2 easy steps and join
                            the community of verified uPort users. Make your
                            users feel safe while using your app. Protect them
                            against phising.
                          </p>
                          <Step.Link
                            href='#'
                            className='link'
                            onClick={this.startDomainVerification}
                          >
                            Get Started
                          </Step.Link>
                      </Step.Right>
                    </Step>
                  : null}
                {!marketplaceOnboardingComplete
                  ? <Step>
                      <Step.Left bg={marketplaceBg} />
                      <Step.Right>
                          <h2>Join uPort Marketplace</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, set do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim veniam.
                          </p>
                          <Step.Link
                            href='#'
                            className='link'
                            onClick={this.startMarketplaceOnboarding}
                          >
                            Get Started
                          </Step.Link>
                      </Step.Right>
                    </Step>
                  : null}
              </Content>
        </NextSteps>
        <SampleCode
            appDetails={appDetails}
            appEnvironment={appEnvironment}
            signingKey={signingKey}
            ipfsProfileHash={ipfsProfileHash}
          />
          <SendVerificationModal
            show={claim && sendVerificationModal}
            onClose={this.hideUportVerificationModal}
            claim={claim} />
        </Section>
      </div>)
    }
  }
}

const Section = styled.section`
  .configuratorWrap & {
    width: 100%;
    background: #fff;
    padding-bottom: 0;
  }
`
const Success = styled.header`
  .configuratorWrap ${Section} & {
    background-color: #fff;
    margin: 0 auto 100px;
    max-width: 650px;
    text-align: center;
    width: 60%;
  }

  .configuratorWrap ${Section} & h2 {
    float: none;
    font-size: 32px;
    text-align: center;
  }
`
const Check = styled.img`
  display: block;
  height: 50px;
  margin: 0 auto;
  width: 50px;
`
const Icon = styled.img`
  display: block;
  height: 96px;
  margin: 0 auto;
  width: 96px;
`
const CTAButton = styled.button`
  background: linear-gradient(44.17deg, #5c50ca 0%, #7958d8 100%);
  border-radius: 4px;
  color: #fff;
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  padding: 20px;
  text-align: center;
  width: 100%;
`

const NextStepsWrapper = styled.div`
  overflow: hidden;
  position: relative;
  background-color: #f9f9fa;

  .nextsteps-grid {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-gap: 50px;
    padding-top: 10px;
    padding-top: 5vh;
    margin-bottom: 10px;
    position: relative;
    z-index: 4;
  }
  .nextsteps-grid-header {
    padding: 0 0 0 40px;
    margin: 0;
    text-align: left;
    font-size: 14px;
    text-transform: uppercase;
    color: #8986A0;
  }
`
const Content = styled(Container)`
  position: relative;
  z-index: 4;
`
const NextSteps = styled.div`
  background-color: #f2f2f2;
  padding: 60px 20px;

  & > label {
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    text-transform: uppercase;
  }

  ${Container} {
    margin: 0 auto;
    max-width: 790px;
  }
`
const Step = styled.div`
  background: #fff;
  box-shadow: 0 0 10px rgba(139, 139, 139, 0.25);
  display: flex;
  margin: 20px auto;
  & + & {
    margin-top: 40px;
  }
`
Step.Left = styled.div`
  background: transparent url(${props => props.bg}) left bottom no-repeat;
  display: none;
  flex: 3;
  ${medium('display: block;')}
`
Step.Right = styled.div`
  color: #3F3D4B;
  flex: 5;
  padding: 50px;
  h2 {
    font-weight: bold;
    font-size: 22px;
    line-height: 24px;
    margin: 0;
  }
  p {
    font-size: 16px;
    line-height: 26px;
    margin: 15px 0;
  }
`
Step.Link = styled.a`
  color: #5C50CA;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  grid-area: 2 / 1 / 3 / 3;
  text-decoration: none;
  text-transform: uppercase;

  &:after {
    content: "\\2192";
    font-size: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
`

const Background = styled.div`
  bottom: -40px;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 2;
`
const Triangle = styled.svg`
  fill: #fff;
`

export default AppRegComplete
