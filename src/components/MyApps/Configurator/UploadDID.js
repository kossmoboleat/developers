import React, { Component } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import CancelModal from './CancelModal'
import Footer from './Footer'
import CopyButton from './CopyButton'
import { Container, Grid, Col, Spacer } from '../../../layouts/grid'
import { default as track, trackPage } from '../../../utilities/track'
import copyToClipboard from '../../../helpers/copyToClipboard'

const didDoc = (currentApp, appURL) => {
  const did = currentApp.configuration.did.replace('did:ethr:', '')
  const cleanAppURL = appURL.replace(/^https?\:\/\//i, "")
  return `{
  "@context": "https://w3id.org/did/v1",
  "id": "did:https:${cleanAppURL || ''}",
  "publicKey": [{
    "id": "did:https:${cleanAppURL || ''}#owner",
    "type": "Secp256k1VerificationKey2018",
    "owner": "did:https:${cleanAppURL || ''}",
    "ethereumAddress": "${did}"
  }],
  "authentication": [{
    "type": "Secp256k1SignatureAuthentication2018",
    "publicKey": "did:https:${cleanAppURL || ''}#owner"
  }]
}`
  .replace(/ +"id": "did:https:",\n/g, '')
  .replace(/ +"id": "did:https:#owner",\n/g, '')
  .replace(/ +"owner": "did:https:",\n/g, '')
  .replace(/ +"publicKey": "did:https:#owner"\n/g, '')
}

class UploadDID extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    trackPage('App Configurator', {
      step: 'UploadDID'
    })
  }
  hideCancelModal = () => {
    this.track('App Configurator Cancel Aborted', {
      step: 'UploadDID'
    })
    this.setState({ cancelModal: false })
  }
  showCancelModal = () => {
    this.track('App Configurator Cancel Clicked', {
      step: 'UploadDID'
    })
    this.setState({ cancelModal: true })
  }
  track = (name, properties={}) => {
    track(name, {
      source: 'App Configurator',
      ...properties
    })
  }
  handleCopy = (str, id) => () => {
    copyToClipboard(str);
    this.track('App Configurator Code Copied', {
      step: 'UploadDID'
    })
  }
  handleSubmit (e) {
    /*
    this.track('App Configurator Submit Clicked', {
      step: 'EnterDomain',
      value: {appURL}
    })
    */
    this.props.getChildState('verifyDID', {
      did: this.props.currentApp.configuration.did
    })
  }
  render () {
    const { cancelModal } = this.state
    return (<Wrapper>
      <section className={`${cancelModal ? 'blurred' : ''}`}>
        <Container>
          <Grid>
            <Spacer span={1} />
            <Col span={10}>
              <header>
                <Grid>
                  <Col span={8}>
                    <h2>Upload the DID Document</h2>
                  </Col>
                  <Col span={4}>
                    <button className="btn-cancel" onClick={this.showCancelModal}>Cancel</button>
                  </Col>
                </Grid>
              </header>
              <div className='module'>
                <Grid>
                  <Spacer span={1} />
                  <Col span={10}>
                    <p>Copy the DID Document below to your clipboard and upload it to https://example.com/well-known/did.json</p>
                    <CodeContainer>
                      <CopyButton onCopy={this.handleCopy(didDoc(this.props.currentApp, this.props.appURL), 'DID Doc')}>
                        Copy
                      </CopyButton>
                      <Pre>
                        <Code className='language-javascript'>
                          {didDoc(this.props.currentApp, this.props.appURL)}
                        </Code>
                      </Pre>
                    </CodeContainer>
                  </Col>
                  <Spacer span={1} /> 
                </Grid>
              </div>
            </Col>
            <Spacer span={1} />
          </Grid>
        </Container>
      </section>
      <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
      <Footer
        Next={() => <span>VERIFY</span>}
        nextEnabled={true}
        onNext={this.handleSubmit} />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  section {
    padding-bottom: 80px;
  }
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

export default UploadDID
