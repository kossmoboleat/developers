import React, { Component } from 'react'
import Select from 'react-select'
import { Link } from 'gatsby'
import styled from 'styled-components'
import registerResolver from 'https-did-resolver'
import resolve from 'did-resolver'
import CancelModal from '../CancelModal'
import { Container, Grid, Col, Spacer, medium } from '../../../../layouts/grid'
import { default as track, trackPage } from '../../../../utilities/track'

class Verify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false,
      verified: false,
      message: null
    }
  }
  componentDidMount() {
    trackPage('App Configurator', {
      step: 'VerifyDIDDoc'
    })

    const publicAddress = this.props.currentApp.configuration.did.replace('did:ethr:', '')
    const cleanAppURL = this.props.appURL.replace(/^https?\:\/\//i, "")
    registerResolver()
    resolve('did:https:' + cleanAppURL)
      .then(doc => {
        console.log(doc)
        console.log(doc.publicKey[0].ethereumAddress + ' | ' + publicAddress)
        
        this.setState({verified: true, message: 'SUCCESS'})
        this.updateUportApps()

        /*
        if (doc.publicKey[0].ethereumAddress === publicAddress) {
          this.setState({verified: true, message: 'SUCCESS'})
          this.updateUportApps()
        } else {
          this.setState({verified: false, message: 'Public key does not match'})
        }
        */
        /*
        this.track('App Configurator Verification Success', {
          step: 'App Registration Complete',
          value: {
            name: appDetails.appName,
            appURL: appDetails.appURL
          }
        })
        */
        setTimeout(() => {
          // this.setState({ stage: 2 })
        }, 500)
      })
      .catch(err => {
        console.log('Verification Failed. ', err)
        this.setState({verified: false, message: err})
      })

  }
  updateUportApps = () => {
    console.log('Update uPort Apps')
    this.props.getChildState('domainVerification', {
      domainVerified: true,
      showDomainVerification: false,
      appURL: this.props.appURL
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
  render () {
    const { cancelModal, verified, message } = this.state
    return (<Wrapper>
      <section className={`${cancelModal ? 'blurred' : ''}`}>
        <Container>
          <Grid>
            <Spacer span={1} />
            <Col span={10}>
              <header>
                <Grid>
                  <Col span={10}>
                  {(!verified && message != null) 
                    ? <div className='module'>
                        <Grid>
                          <Spacer span={1} />
                          <Col span={10}>
                            <h2>Uh oh, something went wrong</h2>
                            <p>Please make sure you follow all of the instructions.</p>
                            <p>In case the problem repeats contact us.</p>
                            <LeaveButton onClick={this.props.handleTryAgain}>Try Again</LeaveButton>
                          </Col>
                          <Spacer span={1} /> 
                        </Grid>
                      </div>
                    : <h2>Verifying your URL domain...</h2> 
                  }
                  </Col>
                </Grid>
              </header>
            </Col>
            <Spacer span={1} />
          </Grid>
        </Container>
      </section>
      <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  section {
    padding-bottom: 80px;
  }
`
const LeaveButton = styled.button`
  background-color: #fff;
  border: solid 2px #5c50ca;
  border-radius: 4px;
  display: block;
  padding: 20px;
  margin: 20px 0;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  ${medium(`
    display: inline-block;
    margin: 10px;
    width: 266px;
  `)}`

export default Verify
