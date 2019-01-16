import React from 'react'
import styled from 'styled-components'

import SendVerificationModal from '../UportVerification'
import lightPatternBg from '../../images/configuratorBg.svg'
import myAppsBg from '../../images/myapps-bg.svg'
import successImage from '../../images/success-icon.svg'
import errorIcon from '../../images/error-icon.svg'
import loadingIcon from '../../images/loading.svg'
import { ChromePicker } from 'react-color'
import { Grid, Col, Spacer, medium } from '../../layouts/grid'
import { default as track, trackPage } from '../../utilities/track'
import { isValidHttpsUrl } from '../../utilities/isValidUrl'
import { addFile } from '../../utilities/ipfs'
import spin from '../../utilities/spinanim'
import '../../layouts/css/myapps.css'

class EditModal extends React.Component {
  constructor(props) {
    super(props)
    let appURL = props.app.appURL
      ? `https://${props.app.appURL}`
      : 'https://'
    this.state = {
      appName: props.app.name,
      appURL,
      appDescription: props.app.configuration.description,
      cancelModal: false,
      colorPicker: false,
      file_name: null,
      file_type: null,
      profileImage: props.app.configuration.profileImage,
      ipfsLogoHash: null,
      ipfsBgHash: null,
      accentColor: props.app.configuration.accentColor || '#5C50CA',
      appNameValid: true,
      formSubmitted: false,
      duplicateAppName: false,
      validUrl: appURL === "https://" || isValidHttpsUrl(appURL),
      isUploading: false,
      uportAppNames: props.uportApps.map(app => app.name),
      isBgImageUploading: false,
      sendVerificationModal: false,
      claim: null
    }
    this.handleAppNameChange = this.handleAppNameChange.bind(this)
    this.handleAppURLChange = this.handleAppURLChange.bind(this)
    this.handleAppImageChange = this.handleAppImageChange.bind(this)
    this.handleAccentColorChange = this.handleAccentColorChange.bind(this)
    this.handleBgImageUpload = this.handleBgImageUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    const { appNameValid, validUrl } = this.state
    if(!appNameValid && prevState.appNameValid) {
      this.txtAppName.focus();
    } else if(!validUrl && prevState.validUrl) {
      this.txtAppURL.focus();
    }
  }
  handleClose = () => {
    this.props.onClose()
  }
  hideColorPicker = () => {
    this.setState({ colorPicker: false })
  }
  toggleColorPicker = () => {
    this.setState({ colorPicker: !this.state.colorPicker })
  }
  handleAppNameChange (e) {
    this.setState({appName: e.target.value})
    this.setState({
      appNameValid: !(e.target.value === '' || (this.state.uportAppNames.indexOf(e.target.value) >= 0 && this.state.uportAppNames.indexOf(e.target.value) !== this.props.appIndex)),
      duplicateAppName: (this.state.uportAppNames.indexOf(e.target.value) >= 0 && this.state.uportAppNames.indexOf(e.target.value) !== this.props.appIndex)
    })
  }
  handleAppURLChange (e) {
    this.setState({
      appURL: e.target.value
    })
  }
  validateAppURL = () => {
    const { appURL='' } = this.state
    if(appURL === 'https://')
      this.setState({ validUrl: true })
    else
      this.setState({ validUrl: !appURL || isValidHttpsUrl(appURL) })
  }
  handleAppDescriptionChange (e) {
    this.setState({appDescription: e.target.value})
  }
  handleAppImageChange (e) {
    const photo = e.target.files[0]
    this.setState({ isUploading: true })
    const result = addFile(photo).then(result => {
      this.setState({
        ipfsLogoHash: result.Hash,
        profileImage: `/ipfs/${result.Hash}`,
        isUploading: false
      })
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
    this.setState({ isBgImageUploading: true })
    return new Promise(async (resolve, reject) => {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = this.state.accentColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => {
        addFile(blob).then(result => {
          this.setState({
            ipfsBgHash: result.Hash,
            isBgImageUploading: false
          })
          resolve(result.Hash)
        })
      })
    })
  }
  handleSubmit = ev => {
    if(ev && ev.preventDefault)
      ev.preventDefault()
    if (this.state.appNameValid && this.state.validUrl) {
      let uportApps = this.props.uportApps || {}
      const configuration = {
        network: this.props.app.configuration.network != 'none'
          ? this.props.app.configuration.network
          : '',
        environment: this.props.app.configuration.environment,
        accentColor: this.state.accentColor,
        profileImage: this.state.ipfsLogoHash
          ? '/ipfs/' + this.state.ipfsLogoHash
          : this.state.profileImage || '',
        bannerImage: this.state.ipfsBgHash
          ? '/ipfs/' + this.state.ipfsBgHash
          : '',
        url: this.state.appURL.replace(/^https:\/\//, ''),
        description: this.state.appDescription
      }
      Object.keys(configuration).forEach(key => {
        configuration[key] || delete configuration[key]
      })
      let claim = {
        name: this.state.appName,
        configuration
      }
      if (this.props.uportApps) {
        uportApps[this.props.appIndex] = claim
        claim = {'uport-apps': uportApps}
      } else {
        claim = {'uport-apps': [claim]}
      }
      this.props.onClose()

      // try {
      //   uPortConnect.sendVerification({
      //     sub: this.props.profile.did,
      //     claim
      //   }, 'EDIT-APP', {
      //     notifications: true
      //   })
      //   uPortConnect.onResponse('EDIT-APP').then(payload => {
      //     this.props.setCurrentApp(uportApps[this.props.appIndex], this.props.appIndex)
      //     this.props.saveApps(uportApps)
      //   })
      // } catch (e) {
      //   console.log(e)
      // }
      this.setState({
        claim,
        sendVerificationModal: true
      })
      this.props.setCurrentApp(uportApps[this.props.appIndex], this.props.appIndex)
      this.props.saveApps(uportApps)
    }
  }
  hideUportVerificationModal = () => {
    this.setState({
      claim: null,
      sendVerificationModal: false
    })
  }
  render() {
    const { app, uportApps, children, show } = this.props
    const { isUploading, isBgImageUploading, validUrl, claim, sendVerificationModal } = this.state
    const bgImageStyle = {backgroundImage: this.state.profileImage
      ? `url(https://ipfs.io${this.state.profileImage})`
      : `url(${myAppsBg})`}
    return (<React.Fragment>
      <Modal show={show}>
        <Backdrop />
        <Content>
          <a className='returnLink' onClick={this.handleClose}>Cancel</a>
          <h1>Edit App Details</h1>

          <ModalContent>
            <form onSubmit={this.handleSubmit}>
              <Grid>
                <Spacer span={1} />
                <Col span={10}>
                <label htmlFor='appName'>App Name</label>
                <div className={(!this.state.appNameValid) ? 'fieldError' : ''}>
                  <input
                    type='text'
                    id='appName'
                    placeholder='Give your app a name'
                    value={this.state.appName}
                    onChange={this.handleAppNameChange}
                    ref={r => this.txtAppName=r} />
                    {(!this.state.appNameValid) &&
                      <span className='error'>
                        <img src={errorIcon} />
                        {this.state.duplicateAppName
                          ? 'App name already in use'
                          : 'App name is required'
                        }
                      </span>
                    }
                </div>
              </Col>
              <Spacer span={1} />
              <Spacer span={1} />
              <Col span={10}>
                <LabelRow>
                  <label htmlFor='appURL'>
                    URL Address {" "}
                    <Subtle>(optional)</Subtle>
                  </label>
                  <Tooltip>
                    <Tooltip.Hotspot>?</Tooltip.Hotspot>
                    <Tooltip.Popover>
                      <Tooltip.Body>
                        <Tooltip.Header>Why we ask for URL address?</Tooltip.Header>
                        <p>
                          Providing a URL can help establish trust with
                          your application. Following registration, we include
                          instructions for verifying ownership of your domain.
                        </p>
                      </Tooltip.Body>
                    </Tooltip.Popover>
                  </Tooltip>
                </LabelRow>
                <div className={!this.state.validUrl ? 'fieldError' : ''}>
                  <input
                    type='text'
                    id='appURL'
                    placeholder='https://yourapphomepage.com'
                    value={this.state.appURL}
                    onChange={this.handleAppURLChange}
                    onBlur={this.validateAppURL}
                    ref={r => this.txtAppURL=r} />
                  {validUrl ||
                    <span className='error'>
                      <img src={errorIcon} />
                      Invalid URL
                    </span>}
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
                <Col span={5}>
                  <Grid className='appBranding Grid'>
                    <Col span={12} className='Grid-cell brandingSettings'>
                      <h4>App Branding</h4>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                      <div className='appImage'>
                        <label htmlFor='appImage'>App Profile Image</label>
                        {isUploading
                          ? <UploadProgress>Uploading Photo ...</UploadProgress>
                          : <div className='fileUpload'>
                            <span>Upload Image</span>
                            <input type='file'
                              className='upload'
                              onChange={this.handleAppImageChange} />
                          </div>
                        }
                      </div>
                    </Col>
                  </Grid>
                </Col>
                <Col span={3}>
                  <div className='Grid-cell brandingPreview'>
                    <div className='appItem'>
                      <div className='appCover' style={{backgroundColor: this.state.accentColor}}>&nbsp;</div>
                      <div className={'avatar ' + (this.state.profileImage ? 'uploaded' : 'default')} style={bgImageStyle}>
                        &nbsp;
                      </div>
                      <h3 title={this.state.appName || 'App Name'}>
                        {this.state.appName
                          ? this.state.appName.length > 32
                            ? `${this.state.appName.slice(0, 32)}...`
                            : this.state.appName
                          : 'App Name'}
                      </h3>
                      <span>{this.props.app.configuration.network}</span>
                    </div>
                  </div>
                </Col>
                <Col span={2}>
                  <canvas width='100' height='100' id='canvas' style={{visibility: 'hidden'}} />
                </Col>
                <Spacer span={1} />
              </Grid>
              {this.state.colorPicker ? <ColorPicker.Cover onClick={ this.hideColorPicker } /> : null}
              <hr />
              <CTAButton onClick={this.handleSubmit}
                className={this.state.appNameValid && this.state.validUrl &&
                  !isUploading && !isBgImageUploading ? '' : 'disabled'}
                disabled={isUploading || isBgImageUploading}
              >
                SAVE CHANGES
              </CTAButton>
            </form>
          </ModalContent>
        </Content>
      </Modal>
      <SendVerificationModal
        show={claim && sendVerificationModal}
        onClose={this.hideUportVerificationModal}
        claim={claim} />
    </React.Fragment>)
  }
}

const Modal = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 0.5s, visibility 0.5s;
  z-index: 900;
  ${props => props.show
    ? `
      opacity: 1;
      visibility: visible;
    `
    : `
      opacity: 0;
      visibility: hidden;
    `}
`
const Backdrop = styled.div`
  background: rgba(249, 249, 250, 0.88);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 910;
`
const Content = styled.div`
  max-height: calc(100vh - 40px);
  left: 50%;
  position: relative;
  top: 50%;
  transform: translateX(-50%) translateY(-55%);
  z-index: 920;
  ${props => props.verifying ? '' : 'width: 80vw;'}
  ${medium(`
    ${props => props.verifying ? '' : 'width: 70vw;'}
  `)}

  h1 {
    color: #3f3d4b;
  }
  h5 {
    color: #3f3d4b;
    font-size: 32px;
    line-height: 44px;
    text-align: center;
  }
  .returnLink {
    float:right;
    color: #8986A0;
    margin: 10px 0 0;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    line-height: 32px;
    padding-right: 5px;
    cursor: pointer;
  }
`

const ModalContent = styled.div`
  max-height: 80vh;
  background: #fff;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(139, 139, 139, 0.25);
  padding: 40px 0;
  ${props => props.verifying ? '' : 'width: 80vw;'}
  ${medium(`
    ${props => props.verifying ? '' : 'width: 70vw;'}
  `)}
`

const ButtonClose = styled.button`
  background: none;
  border: none;
  color: #3f3d4b;
  font-size: 2em;
  padding: 0;
  position: absolute;
  right: 20px;
  top: 20px;
`
const Body = styled.div`
  padding: 10px 20px 20px 20px;
  ${medium(`
    padding: 20px 60px 0 60px;
  `)}
`
const Info = styled.p`
  color: #8986A0;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`
const Footer = styled.div`
  padding: 0 20px 30px 20px;
  ${medium(`
    padding: 10px 60px 40px 60px;
  `)}
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
  text-decoration: none;
  width: 80%;
  margin: 10px auto 0;
  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
`
const LabelRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
`
const Subtle = styled.span`
  font-weight: 400;
  text-transform: none;
`
const Tooltip = styled.div`
  position: relative;
  z-index: 2;
`

const RetryButton = styled.button`
  background: none;
  border: solid 2px #5c50ca;
  border-radius: 4px;
  color: #5c50ca;
  font-weight: 700;
  padding: 20px;
  width: 100%;
`
const ResultIcon = styled.img`
  display: block;
  margin: -30px auto 20px;
`
const ResultMessage = styled.p`
  text-align: center;
`

Tooltip.Hotspot = styled.div`
  border: solid 1px #8986A0;
  border-radius: 50%;
  color: #8986A0;
  cursor: pointer;
  font-size: 10px;
  height: 17px;
  line-height: 17px;
  position: relative;
  text-align: center;
  width: 17px;
  z-index: 4;
`
Tooltip.Popover = styled.div`
  opacity: 0;
  padding-top: 35px;
  position: absolute;
  right: -20px;
  top: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  ${Tooltip}:hover & {
    opacity: 1;
    visibility: visible;
  }
`
Tooltip.Body = styled.div`
  background: #fcf2e5;
  border: solid 1px #ffe1bd;
  border-radius: 4px;
  color: #5f5d68;
  padding: 20px;
  width: 237px;
  &:before {
    background: #fcf2e5;
    border-left: solid 1px #ffe1bd;
    border-bottom: solid 1px #ffe1bd;
    content: "";
    display: block;
    height: 16px;
    right: 24px;
    position: absolute;
    top: 28px;
    transform: rotate(135deg);
    width: 16px;
    z-index: 3;
  }
  p {
    font-size: 0.85em;
    margin: 0;
    padding: 0;
  }
`
Tooltip.Header = styled.h5`
  border-bottom: solid 1px rgba(95, 93, 104, 0.5);
  font-size: 0.8em;
  margin: 0 0 10px;
  padding: 0 0 5px;
  text-transform: uppercase;
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
  font-weight: 600;
  padding: 20px 10px;
  text-align: center;
`
const Loading = styled.img`
  ${spin}
  margin: 0 0 0 10px;
  width: 24px;
`

export default EditModal
