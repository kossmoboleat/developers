import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import shortId from 'shortid'
import qrImage from 'qr-image'

import * as actions from '../actions'
import { isLoading, getUPortLogin, getUPortMessages } from '../selectors'
import { medium } from '../layouts/grid'
import loadingImg from '../images/loading.svg'
import reloadImg from '../images/reload.svg'
import spin from '../utilities/spinanim'

class UportLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qrData: null,
      waiting: false
    }
  }
  componentDidMount() {
    this.props.initCredentials()
    this.props.loadProfile()
  }
  componentDidUpdate(prevProps, prevState) {
    const { login, messages, pollChasqui, show, verifyCredentials } = this.props
    const { waiting } = this.state
    if(show && !prevProps.show) {
      this.handleLogin();
    } else if(!login.profile && login.url && login.url !== prevProps.login.url) {
      // show QR
      const pngBuffer = qrImage.imageSync(login.url, { type: 'png' })
      const qrData = 'data:image/png;charset=utf-8;base64, ' + pngBuffer.toString('base64')
      pollChasqui(login.callbackId)
      this.setState({ qrData })
    } else if(!login.profile && login.url) {
      // check for Chasqui Response
      let message = messages.find(msg => msg.id === login.callbackId)
      if(message && message.loading && !waiting) {
        this.setState({ waiting: true })
      } else if(message && !message.loading && waiting) {
        // verify token
        this.setState({ waiting: false })
        verifyCredentials(message.content)
      }
    } else if(!prevProps.login.profile && login.profile) {
      // logged in!
      this.setState({ qrData: null })
      this.props.onLoginSuccess(login.profile)
    }
  }
  handleClose = () => {
    this.setState({ qrData: null })
    this.props.onClose()
  }
  handleLogin = () => {
    const requestId = shortId.generate()
    this.props.requestDisclosure(requestId)
    this.setState({ requestId })
  }
  render() {
    const { qrData, waiting } = this.state
    const { login={}, show } = this.props
    const { profile, url } = login
    return (<Modal show={show}>
      <Backdrop />
      <Content>
        <Wrapper>
          <div>
            <ButtonClose onClick={this.handleClose}>&times;</ButtonClose>
          </div>
          {qrData
            ? <React.Fragment>
              <div>
                  <p>Scan this QR Code using the uPort App</p>
                <QRWrapper>
                  <a href={url} target='_blank'>
                    <img className='qr' src={qrData} />
                  </a>
                </QRWrapper>
                <p>Or tap to open in a mobile browser</p>
              </div>
            </React.Fragment>
            : <LoadingIcon src={loadingImg} />}
          <Status>
            {!waiting || <Waiting>
              Waiting for login
              <LoadingIcon src={loadingImg} />
            </Waiting>}
            {!qrData || <Refresh onClick={this.handleLogin}>
              <img src={reloadImg} />
              Refresh
            </Refresh>}
          </Status>
        </Wrapper>
      </Content>
    </Modal>)
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
  div {
    margin-top: 0 !important;
  }
`
const Backdrop = styled.div`
  background: rgba(249, 249, 250, 0.8);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 910;
`
const ButtonClose = styled.button`
  background: none;
  border: none;
  color: #3f3d4b;
  font-size: 2em;
  position: absolute;
  right: 10px;
`
const Content = styled.div`
  background: #fff;
  box-shadow: 0 0 10px rgba(139, 139, 139, 0.25);
  left: 50%;
  padding: 0 10px;
  position: relative;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 920;
  ${medium('width: 45vw;')}

  p {
    margin: 15px 0;
    text-align: center;
  }
`
const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-rows: 50px 1fr 100px;
  min-height: 80vh;
  justify-items: center;
`;
const Refresh = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  padding: 10px 0;
  & > img {
    height: 14px;
    margin-right: 5px;
  }
`
const QRWrapper = styled.div`
  align-items: center;
  border: solid 1px #999;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  .qr {
    border-radius: 8px;
    margin: 10px 0;
    max-width: 90vw;
    ${medium(`
      max-width: 38vw;
      max-height: 50vh;
    `)}
  }
`
const LoadingIcon = styled.img`
  ${spin}
  height: 18px;
  margin-left: 10px;
  width: 18px;
`
const Status = styled.div`
  display: flex;
`
const Waiting = styled.div`
  color: #999;
  margin-right: 30px;
  padding: 10px 0;
`

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  login: getUPortLogin(state),
  messages: getUPortMessages(state)
})

const mapDispatchToProp = dispatch => ({
  initCredentials() {
    dispatch(actions.initCredentials())
  },
  loadProfile() {
    dispatch(actions.loadProfile())
  },
  requestDisclosure(id) {
    dispatch(actions.reqDisclosure(id))
  },
  pollChasqui(id) {
    dispatch(actions.pollChasqui(id))
  },
  verifyCredentials(token) {
    dispatch(actions.verifyCredentials(token))
  }
})

export default connect(mapStateToProps, mapDispatchToProp)(UportLogin)
