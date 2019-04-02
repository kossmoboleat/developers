import React, { Component } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import CancelModal from './CancelModal'
import Footer from './Footer'
import { Container, Grid, Col, Spacer } from '../../../layouts/grid'
import { default as track, trackPage } from '../../../utilities/track'
import { isValidHttpsUrl } from '../../../utilities/isValidUrl'
import errorIcon from '../../../images/error-icon.svg'

class EnterDomain extends Component {
  constructor (props) {
    super(props)
    let appURL = props.appURL
      ? `https://${props.appURL}`
      : ''
    this.state = {
      cancelModal: false,
      appURL,
      validUrl: isValidHttpsUrl(appURL),
      formSubmitted: false
    }
    this.handleAppURLChange = this.handleAppURLChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    trackPage('App Configurator', {
      step: 'EnterDomain'
    })
  }
  hideCancelModal = () => {
    this.track('App Configurator Cancel Aborted', {
      step: 'EnterDomain'
    })
    this.setState({ cancelModal: false })
  }
  handleAppURLChange (e) {
    this.setState({
      appURL: e.target.value
    })
  }
  validateAppURL = () => {
    const { appURL='' } = this.state
    this.setState({ validUrl: !appURL || isValidHttpsUrl(appURL) })
  }
  handleSubmit (e) {
    const { appURL } = this.state
    this.setState({formSubmitted: true})
    if (appURL) {
      this.track('App Configurator Submit Clicked', {
        step: 'EnterDomain',
        value: {appURL}
      })
      this.props.getChildState('enterDomain', {
        appURL: appURL
      })
    } else {
      this.track('App Configurator Submit Clicked', {
        step: 'EnterDomain',
        notes: [
          'Required field missing: appUrl'
        ]
      })
    }
  }
  showCancelModal = () => {
    this.track('App Configurator Cancel Clicked', {
      step: 'EnterDomain'
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
    const { cancelModal, validUrl, formSubmitted } = this.state
    return (<Wrapper>
      <section className={`${cancelModal ? 'blurred' : ''}`}>
        <Container>
          <Grid>
            <Spacer span={1} />
            <Col span={10}>
              <header>
                <Grid>
                  <Col span={8}>
                    <h2>Enter your app URL address</h2>
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
                    <label htmlFor='environment'>URL Address</label>
                    <form>
                       <div className={!validUrl && formSubmitted ? 'fieldError' : ''}>
                          <input
                            type='text'
                            id='appURL'
                            placeholder='https://yourapphomepage.com'
                            value={this.state.appURL}
                            onChange={this.handleAppURLChange}
                            onBlur={this.validateAppURL}
                            ref={r => this.txtAppURL=r} />
                          {(!validUrl && formSubmitted) &&
                            <span className='error'>
                              <img src={errorIcon} />
                              Invalid URL
                            </span>}
                        </div>
                    </form>
                    <Explanation>
                      <span>WHY WE ASK FOR URL ADDRESS?</span>
                      <hr />
                      <p>This is how we verify your App. In the next step you’ll be asked to upload a DID-document to your server in order to proove legitimacy of your App and domain. </p>
                    </Explanation>
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
        Next={() => <span>UPLOAD DID DOCUMENT</span>}
        nextEnabled={validUrl}
        onNext={this.handleSubmit} />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  section {
    padding-bottom: 80px;
  }
`
const Explanation = styled.div`
  background-color: #fcf2e5;
  margin-top: 30px;
  padding: 30px;
  margin: 30px auto;
  border-radius: 3px;
  color: #5F5D68;
  span {
    font-size: 14px;
    font-weight: 600;
  }
  p {
    color: #5F5D68;
    font-size: 16px;
    font-weight: 400;
  }
`

export default EnterDomain
