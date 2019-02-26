import React, { Component } from 'react'
import { Credentials } from 'uport-credentials'
import styled from 'styled-components'
import { ChromePicker } from 'react-color'

import CancelModal from './CancelModal'
import Footer from './Footer'
import { Container, Grid, Col, Spacer } from '../../../layouts/grid'
import { addFile } from '../../../utilities/ipfs'
import { default as track, trackPage } from '../../../utilities/track'
import spin from '../../../utilities/spinanim'
import errorIcon from '../../../images/error-icon.svg'
import loadingIcon from '../../../images/loading.svg'
import myAppsBg from '../../../images/myapps-bg.svg'
import '../../../layouts/css/myapps.css'

class AppDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appName: props.appDetails.appName,
      appDescription: props.appDescription,
      cancelModal: false,
      colorPicker: false,
      file_name: null,
      file_type: null,
      ipfsLogoHash: null,
      ipfsBgHash: null,
      accentColor: '#5C50CA',
      appNameValid: true,
      formSubmitted: false,
      duplicateAppName: false,
      did: null,
      pk: null,
      isUploading: false,
      bgImageUploading: false
    }
    this.handleAppNameChange = this.handleAppNameChange.bind(this)
    this.handleAppImageChange = this.handleAppImageChange.bind(this)
    this.handleAccentColorChange = this.handleAccentColorChange.bind(this)
    this.handleBgImageUpload = this.handleBgImageUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    trackPage('App Configurator', {
      step: 'App Details',
      value: {
        environment: this.props.appEnvironment.environment,
        network: this.props.appEnvironment.network
      }
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const { appNameValid } = this.state
    if(!appNameValid && prevState.appNameValid) {
      this.txtAppName.focus();
    }
  }
  handleAppNameChange (e) {
    this.setState({appName: e.target.value})
    e.target.value !== '' ? this.setState({appNameValid: true}) : this.setState({appNameValid: false})
  }
  handleAppDescriptionChange (e) {
    this.setState({appDescription: e.target.value})
  }
  handleAppImageChange (e) {
    const photo = e.target.files[0]
    this.setState({ isUploading: true })
    const result = addFile(photo).then(result => {
      this.setState({ipfsLogoHash: result.Hash})
      this.setState({ isUploading: false })
      console.log(`Uploaded profileImage: https://ipfs.io/ipfs/${result.Hash}`)
    }).catch(err => {
      console.log('Upload failed')
      this.setState({ isUploading: false })
    })
  }
  handleAccentColorChange (accentColor) {
    this.setState({ accentColor: accentColor.hex || accentColor })
  }
  async handleBgImageUpload () {
    // Generate image from accentColor and upload to IPFS
    return new Promise((resolve, reject) => {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = this.state.accentColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => {
        addFile(blob).then(result => {
          this.setState({ipfsBgHash: result.Hash})
          console.log(`Uploaded bannerImage: https://ipfs.io/ipfs/${result.Hash}`)
          resolve(result.Hash)
        })
      })
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.validateAppURL()
    let uportApps = this.props.uportApps || {}
    let uportAppNames = (Object.keys(uportApps).length > 0
      ? uportApps.map(app => app.name)
      : [])
    this.setState({formSubmitted: true})
    this.state.appName === '' || uportAppNames.indexOf(this.state.appName) >= 0
    ? this.setState({
        appNameValid: false,
        duplicateAppName: (uportAppNames.indexOf(this.state.appName) >= 0)
      })
    : this.setState({ appNameValid: true }, () => {
      if (this.state.appNameValid) {
        const {did, privateKey} = Credentials.createIdentity()
        const credentials = new Credentials({
          appName: this.state.appName,
          did,
          privateKey
        })
        this.setState({ did, pk: privateKey, bgImageUploading: true })
        if ((this.state.accentColor !== '' ||
          this.state.accentColor !== '#5C50CA') &&
          this.state.ipfsBgHash === null
        ) {
          this.handleBgImageUpload().then(() => {
            this.track('App Configurator Submit Clicked', {
              step: 'App Details',
              value: {
                appName: this.state.appName,
                appURL: this.state.appURL
              }
            })
            this.props.getChildState('appDetails', {
              appName: this.state.appName,
              appDescription: this.state.appDescription,
              ipfsLogoHash: this.state.ipfsLogoHash,
              ipfsBgHash: this.state.ipfsBgHash,
              accentColor: this.state.accentColor,
              appIdentity: {
                did: this.state.did,
                pk: this.state.pk
              }
            })
          })
        }
      }
    })
  }
  hideCancelModal = () => {
    this.track('App Configurator Cancel Aborted', {
      step: 'App Details',
      value: {
        environment: this.props.appEnvironment.environment,
        network: this.props.appEnvironment.network
      }
    })
    this.setState({ cancelModal: false })
  }
  hideColorPicker = () => {
    this.setState({ colorPicker: false })
  }
  showCancelModal = () => {
    this.track('App Configurator Cancel Clicked', {
      step: 'App Details',
      value: {
        environment: this.props.appEnvironment.environment,
        network: this.props.appEnvironment.network
      }
    })
    this.setState({ cancelModal: true })
  }
  toggleColorPicker = () => {
    this.setState({ colorPicker: !this.state.colorPicker })
  }
  track = (name, properties={}) => {
    track(name, {
      source: 'App Configurator',
      ...properties
    })
  }
  render () {
    const { cancelModal, isUploading, bgImageUploading } = this.state;
    const bgImageStyle = {backgroundImage: this.state.ipfsLogoHash
      ? `url(https://ipfs.io/ipfs/${this.state.ipfsLogoHash})`
      : `url(${myAppsBg})`}
    return (<div>
      <section className={`startBuilding ${cancelModal ? 'blurred' : ''}`}>
        <Container>
          <Grid>
            <Spacer span={1} />
            <Col span={10}>
              <header>
                <Grid>
                  <Col span={8}>
                    <h2>Add App Details</h2>
                  </Col>
                  <Col span={4}>
                    <button className="btn-cancel" onClick={this.showCancelModal}>Cancel</button>
                  </Col>
                </Grid>
              </header>
              <div className='module'>
                <form onSubmit={this.handleSubmit}>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <label htmlFor='appName'>App Name</label>
                      <div className={(!this.state.appNameValid && this.state.formSubmitted) ? 'fieldError' : ''}>
                        <input
                          type='text'
                          id='appName'
                          placeholder='Give your app a name'
                          value={this.state.appName}
                          onChange={this.handleAppNameChange}
                          ref={r => this.txtAppName=r} />
                        {(!this.state.appNameValid && this.state.formSubmitted) &&
                          <span className='error'>
                            <img src={errorIcon} />
                            {this.state.duplicateAppName
                              ? 'App name already in use'
                              : 'App name is required'}
                          </span>
                        }
                      </div>
                    </Col>
                    <Spacer span={1} />
                    <Spacer span={1} />
                    <Col span={10}>
                      <label htmlFor='appDescription'>
                        App Description {" "}
                        <Subtle>(optional)</Subtle>
                      </label>
                      <textarea
                        rows='4'
                        cols='50'
                        placeholder='Describe what your app can do...'
                        value={this.state.appDescription}
                        onChange={(e) => { this.handleAppDescriptionChange(e) }} />
                    </Col>
                    <Spacer span={1} />
                    <Spacer span={1} />
                    <Col span={10}>
                      <label>App Branding <Subtle>(optional)</Subtle></label>
                      <p style={{color: '#89879f',margin: '10px 0 30px'}}>To make sure your app looks trustworthy and stands out among other apps add your brand accent color and logo.</p>
                      <Grid>
                          <Col span={7}>
                          <div className='colorPicker'>
                            <label htmlFor='accentColor'>App Accent Color</label>
                            <input type='text'
                              id='accentColor'
                              placeholder='#5C50CA'
                              value={this.state.accentColor}
                              onChange={e => this.handleAccentColorChange(e.target.value)} />
                            <ColorPicker>
                              <button className='colorPreview' type='button'
                                style={{backgroundColor: this.state.accentColor}}
                                onClick={this.toggleColorPicker} />

                              {this.state.colorPicker
                                ? <ColorPicker.PopOver>
                                    <ChromePicker color={this.state.accentColor}
                                      onChange={this.handleAccentColorChange} />
                                </ColorPicker.PopOver>
                                : null}

                            </ColorPicker>
                          </div>
                          <div className='appImage'>
                            <label htmlFor='appImage'>App Profile Image</label>
                            {isUploading
                              ? <UploadProgress>Uploading Photo ...</UploadProgress>
                              : <div className='fileUpload'>
                                <span>Upload Image</span>
                                <input type='file'
                                  className='upload'
                                  onChange={this.handleAppImageChange} />
                              </div>}
                            {/*<div className={`imagePreview ' ${this.state.ipfsLogoHash ? 'uploaded' : 'default'}`}
                              style={bgImageStyle} />*/}
                          </div>
                        </Col>
                        <Col span={5}>
                          <div>
                            <label>Preview</label>
                            <div className='appItem'>
                              <div className='appCover' style={{backgroundColor: this.state.accentColor}}>&nbsp;</div>
                              <div className={'avatar ' + (this.state.ipfsLogoHash ? 'uploaded' : 'default')} style={bgImageStyle}>
                                &nbsp;
                              </div>
                              <h3 title={this.state.appName || 'App Name'}>
                                {this.state.appName
                                  ? this.state.appName.length > 32
                                    ? `${this.state.appName.slice(0, 32)}...`
                                    : this.state.appName
                                  : 'App Name'}
                              </h3>
                              <span>{this.props.appEnvironment.network}</span>
                            </div>
                          </div>
                        </Col>
                      </Grid>
                    </Col>
                    <Spacer span={1} />
                  </Grid>
                </form>
              </div>
            </Col>
            <Spacer span={1} />
          </Grid>
          <canvas width='100' height='100' id='canvas' style={{visibility: 'hidden'}} />
        </Container>
        {this.state.colorPicker ? <ColorPicker.Cover onClick={ this.hideColorPicker } /> : null}
      </section>
      <Footer
        Prev={() => (<div>
          APP ENVIRONMENT
          <p>
            {this.props.appEnvironment.environment}
            <span>|</span>
            {this.props.appEnvironment.network}
          </p>
        </div>)}
        Next={() => this.props.appEnvironment.environment === 'server'
          ? <span>
            GENERATE SIGNING KEY
            {bgImageUploading ? <Loading src={loadingIcon} /> : null}
          </span>
          : <span>
            COMPLETE REGISTRATION
            {bgImageUploading ? <Loading src={loadingIcon} /> : null}
          </span>}
        nextEnabled={!bgImageUploading && this.state.appNameValid}
        onNext={this.handleSubmit}
        onPrev={this.props.previousStep} />
      <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
    </div>)
  }
}

const LabelRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
`
const Subtle = styled.span`
  font-weight: 400;
  text-transform: none;
`
const ColorPicker = styled.div`
  position: relative;
`
ColorPicker.PopOver = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  transform: translateX(-40%);
  z-index: 2;
`
ColorPicker.Cover = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`
const UploadProgress = styled.div`
  color: #5C50CA;
  font-weight: 600;
  max-width: 60%;
  padding: 20px 10px;
  text-align: center;
`
const Loading = styled.img`
  ${spin}
  margin: 10px 0;
  width: 24px;
`
export default AppDetails
