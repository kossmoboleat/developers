import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import imageBg from '../../../../images/Products-BG.svg'
import CopyButton from '../CopyButton'
import copyToClipboard from '../../../../helpers/copyToClipboard'
import { Container, Grid, Col, medium } from '../../../../layouts/grid'

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

class SampleCode extends Component {
  constructor (props) {
    super(props)
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
  render () {
    const { appDetails, appEnvironment, signingKey, ipfsProfileHash } = this.props
    return (<div>
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
        </Container>
      </Body>
      </div>
    )
  }
}

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

export default SampleCode
