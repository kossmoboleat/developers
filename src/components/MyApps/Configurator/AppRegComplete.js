import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import cog from '../../../images/cog.svg'
import tick from '../../../images/greenTick.svg'
import imageBg from '../../../images/Products-BG.svg'
import UnorderedList from '../../Layout/html/UnorderedList'
import VerificationModal from './VerificationModal'
import CopyButton from './CopyButton'
import SendVerificationModal from '../../UportVerification'
import { Container, Grid, Col, medium } from '../../../layouts/grid'
import copyToClipboard from '../../../helpers/copyToClipboard'
import track, { trackPage } from '../../../utilities/track'

const installCodeServer =
`npm init
npm install --save uport-credentials
`
const installCodeClient =
`npm init
npm install --save uport-connect
`
const initServerCode = (appDetails, appEnvironment, pk) =>
`import { Credentials } from "uport-credentials"

const uport = new Credentials({
  did: "${appDetails.appIdentity.did}",
  privateKey: "${pk}"
})`

const disclosureServerCode = (ipfsProfileHash) =>
`uport.createDisclosureRequest({
  notifications: true,
  callbackUrl: endpoint + '/callback',
  vc: ['/ipfs/${ipfsProfileHash}']
  }).then(requestToken => {
    ...
  })
})`

const initClientCode = (appDetails, appEnvironment) =>
`import { Connect } from "uport-connect"

const uport = new Connect('${appDetails.appName}', {
  network: "${appEnvironment.network}",
  profileImage: {"/": "/ipfs/${appDetails.ipfsLogoHash || ''}"},
  bannerImage: {"/": "/ipfs/${appDetails.ipfsBgHash || ''}"},
  description: "${appDetails.appDescription || ''}"
})`
  .replace(/ +profileImage: {"\/": "\/ipfs\/"},\n/g, '')
  .replace(/ +bannerImage: {"\/": "\/ipfs\/"},\n/g, '')
  .replace(/ +url: "https:\/\/",\n/g, '')
  .replace(/ +description: ""\n/g, '')
  .replace(/ +network: "none",\n/g, '')

const didDoc = (appDetails) => {
  const did = appDetails.appIdentity.did.replace('did:ethr:', '')
  return `{
  "@context": "https://w3id.org/did/v1",
  "id": "did:https:${appDetails.appURL || ''}",
  "publicKey": [{
    "id": "did:https:${appDetails.appURL || ''}#owner",
    "type": "Secp256k1VerificationKey2018",
    "owner": "did:https:${appDetails.appURL || ''}",
    "ethereumAddress": "${did}"
  }],
  "authentication": [{
    "type": "Secp256k1SignatureAuthentication2018",
    "publicKey": "did:https:${appDetails.appURL || ''}#owner"
  }]
}`
  .replace(/ +"id": "did:https:",\n/g, '')
  .replace(/ +"id": "did:https:#owner",\n/g, '')
  .replace(/ +"owner": "did:https:",\n/g, '')
  .replace(/ +"publicKey": "did:https:#owner"\n/g, '')
}

class AppRegComplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      verificationModal: false,
      sendVerificationModal: false,
      claim: null
    }
  }
  componentDidMount() {
    trackPage('App Configurator', {
      step: 'App Registration Complete',
      value: {
        name: this.props.appDetails.appName,
        appURL: this.props.appDetails.appURL
      }
    })
    this.showPopup()
  }
  showPopup = () => {
    let uportApps = this.props.profile.uportApps || {}
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
      url: this.props.appDetails.appURL,
      description: this.props.appDetails.appDescription
    }
    Object.keys(configuration).forEach(key => {
      configuration[key] || delete configuration[key]
    })
    let claim = {
      name: this.props.appDetails.appName,
      configuration
    }
    if (this.props.profile.uportApps) {
      uportApps.push(claim)
      claim = {'uport-apps': uportApps}
    } else {
      claim = {'uport-apps': [claim]}
    }
    // try {
    //   uPortConnect.sendVerification({
    //     sub: this.props.profile.did,
    //     claim
    //   }, 'ADD-APP', {
    //     notifications: true
    //   })
    //   uPortConnect.onResponse('ADD-APP').then(payload => {
    //     Object.keys(uportApps).length > 0
    //       ? this.props.saveApps(uportApps)
    //       : this.props.saveApps(claim['uport-apps'])
    //     this.setState({ done: true })
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
    this.setState({
      claim,
      sendVerificationModal: true
    })
    if(Object.keys(uportApps).length)
      this.props.saveApps(uportApps)
    else
      this.props.saveApps(claim['uport-apps'])
  }
  handleCopy = (str, id) => () => {
    copyToClipboard(str);
    this.track('App Configurator Code Copied', {
      step: 'App Registration Complete',
      value: {
        name: this.props.appDetails.appName,
        appURL: this.props.appDetails.appURL,
        content: id
      }
    })
  }
  hideUportVerificationModal = () => {
    this.setState({
      claim: null,
      sendVerificationModal: false
    })
  }
  hideVerificationModal = () => {
    this.track('App Configurator Verification Modal Closed', {
      step: 'App Registration Complete',
      value: {
        name: this.props.appDetails.appName,
        appURL: this.props.appDetails.appURL
      }
    })
    this.setState({ verificationModal: false })
  }
  showVerificationModal = () => {
    this.track('App Configurator Verification Modal Opened', {
      step: 'App Registration Complete',
      value: {
        name: this.props.appDetails.appName,
        appURL: this.props.appDetails.appURL
      }
    })
    this.setState({ verificationModal: true })
  }
  track = (name, properties={}) => {
    track(name, {
      source: 'App Configurator',
      ...properties
    })
  }
  render () {
    const { appDetails, appEnvironment, signingKey, ipfsProfileHash } = this.props
    const { verificationModal, sendVerificationModal, claim } = this.state;
    return (<div>
      <Section className={verificationModal ? 'blurred' : ''}>
        <Success>
          <Check src={tick} />
          <h2>Registration complete!</h2>
          <p>
            Congrats! {appDetails.appName} now has an application identity with
            uPort.  Start building with the resources below, or take a look
            at our tutorials and docs.
          </p>
        </Success>
        <Body fullWidth={appEnvironment.environment === 'client'}>
          <Container className={'card-container ' + (appEnvironment.environment ? 'card-container-full' : null)}>
            <h3>Start Building with Your App Code</h3>
            <Card>
              <Card.Content>
                <Step>
                  <Step.Number>1</Step.Number>
                  <Step.Label>Install Libraries</Step.Label>
                  <Step.Content>
                    <CodeContainer>
                      <CopyButton onCopy={appEnvironment.environment === 'server'
                        ? this.handleCopy(installCodeServer, 'Install Libraries')
                        : this.handleCopy(installCodeClient, 'Install Libraries')}
                      >
                        Copy
                      </CopyButton>
                      <Pre>
                        <Code>
                          {appEnvironment.environment === 'server'
                            ? installCodeServer
                            : installCodeClient}
                        </Code>
                      </Pre>
                    </CodeContainer>
                  </Step.Content>
                </Step>
                <Step>
                  <Step.Number>2</Step.Number>
                  <Step.Label>Initalize uPort {appEnvironment.environment === 'server' ? 'Credentials' : 'Connect'}</Step.Label>
                  <Step.Content>
                    <CodeContainer>
                      <CopyButton
                        onCopy={appEnvironment.environment === 'server'
                          ? this.handleCopy(
                              initServerCode(appDetails, appEnvironment, signingKey),
                              'Initialize uPort Connect'
                            )
                          : this.handleCopy(
                              initClientCode(appDetails, appEnvironment),
                              'Initialize uPort Connect'
                            )}
                      >
                        Copy
                      </CopyButton>
                      <Pre>
                        <Code data-do-not-track-copy={true}>
                          {appEnvironment.environment === 'server'
                            ? initServerCode(appDetails, appEnvironment, signingKey)
                            : initClientCode(appDetails, appEnvironment)}
                        </Code>
                      </Pre>
                    </CodeContainer>
                  </Step.Content>
                </Step>
                {appEnvironment.environment === 'server'
                ? <Step>
                    <Step.Number>3</Step.Number>
                    <Step.Label>Create a disclosure request</Step.Label>
                    <Step.Content>
                      <CodeContainer>
                        <CopyButton
                          onCopy={this.handleCopy(
                                disclosureServerCode(ipfsProfileHash),
                                'Initialize uPort Connect'
                              )}
                        >
                          Copy
                        </CopyButton>
                        <Pre>
                          <Code data-do-not-track-copy={true}>
                              {disclosureServerCode(ipfsProfileHash)}
                          </Code>
                        </Pre>
                      </CodeContainer>
                    </Step.Content>
                  </Step>
                : null }
              </Card.Content>
              <Card.Footer>
                <CTALink to='/myapps/detail?tab=code'>View Full App Code</CTALink>
              </Card.Footer>
            </Card>
            {appEnvironment.environment === 'server'
              ? <Card>
                {appDetails.appURL
                  ? <Card.Content>
                    <h4>Get uPort Verification Badge</h4>
                    <p>Verify your URL domain in 2 easy steps</p>
                    <Icon src={cog} />
                    <UnorderedList>
                      <li>Make your user feel safe while using your app</li>
                      <li>Protect your user against phishing </li>
                      <li>Join the community of verified uPort users</li>
                    </UnorderedList>
                  </Card.Content>
                  : <Card.Content>
                    <h4>Get uPort Verification Badge</h4>
                    <Icon src={cog} />
                    <p>
                      If you want to build trust and verify your domain,
                      please re-register and add your project’s url
                    </p>
                  </Card.Content>}
                <Card.Footer>
                  {!appDetails.appURL || <CTAButton onClick={this.showVerificationModal}>
                    Learn How to Get the Badge
                  </CTAButton>}
                </Card.Footer>
              </Card>
            : null}
          </Container>
        </Body>
      </Section>
      <VerificationModal
        appDetails={appDetails}
        show={verificationModal}
        onClose={this.hideVerificationModal}
      >
        <p>
          To associate your domain with your App Identity just upload the
          following document to {" "}
          <strong>
            {`https://${appDetails.appURL}/.well-known/did.json`}
          </strong>
        </p>
        <CodeContainer>
          <CopyButton onCopy={this.handleCopy(didDoc(appDetails), 'DID Doc')}>
            Copy
          </CopyButton>
          <Pre>
            <Code className='language-javascript'>
              {didDoc(appDetails)}
            </Code>
          </Pre>
        </CodeContainer>
      </VerificationModal>
      <SendVerificationModal
        show={claim && sendVerificationModal}
        onClose={this.hideUportVerificationModal}
        claim={claim} />
    </div>)
  }
}

const Section = styled.section`
  .configuratorWrap & {
    width: 100%;
    background: #f9f9fa;
  }
`
const Success = styled.header`
  .configuratorWrap ${Section} & {
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
const Body = styled.div`
  background: #5c50ca;
  padding: 40px 0;
  ${medium(`
    background-image: url(${imageBg});
    background-size: cover;
    margin-bottom: 180px;
    padding: 0;
  `)}

  .card-container {
    h3 {
      color: #fff;
      margin: 0 0 20px;
      text-align: center;
    }
    ${medium(`
      ${props => props.fullWidth
        ? ''
        : 'display: grid;'
      }
      grid-template-columns: 2fr minmax(320px, 1fr);
      grid-template-rows: auto auto;
      grid-gap: 1vw 2vw;
      transform: translateY(130px);

      h3 {
        grid-area: 1 / 1 / 2 / 3;
        margin: 0;
        text-align: left;
      }
    `)}
  }
`
const Card = styled.div`
  background: #fff;
  box-shadow: 0 0 10px rgba(139, 139, 139, 0.25);
  display: grid;
  grid-template-rows: 1fr 64px;
  padding: 3vw;
  margin-bottom: 40px;
  ${medium(`
    margin: 0;
  `)}
  h4, p {
    text-align: center;
  }
  li {
    margin-bottom: 20px;
  }
`
Card.Content = styled.div``
Card.Footer = styled.div``

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
const CTALink = styled(Link)`
  background: linear-gradient(44.17deg, #5c50ca 0%, #7958d8 100%);
  border-radius: 4px;
  color: #fff;
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  width: 100%;
`
const Step = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 35px 1fr;
  grid-template-rows: auto auto;
  margin-bottom: 50px;
`
Step.Number = styled.div`
  background: #62b482;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 30px;
`
Step.Label = styled.label`
  color: #3f3d4b;
  font-weight: 800;
  font-size: 16px;
  line-height: 30px;
  text-transform: none;
`
Step.Content = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  overflow: auto;
`
const Code = styled.code``
const Pre = styled.pre`
  background: #f5f5fa;
  border: solid 1px #e3e3e4;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 inset #e3e3e4;
  margin: 0;
  padding: 40px 20px 20px;
`
const CodeContainer = styled.div`
  overflow: auto;
  position: relative;
`

export default AppRegComplete
