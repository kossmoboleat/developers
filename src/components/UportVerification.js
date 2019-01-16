import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import shortId from 'shortid'
import qrImage from 'qr-image'

import * as actions from '../actions'
import { isLoading, getUPortVerification, getUPortMessages, getSavedProfile } from '../selectors'
import { medium } from '../layouts/grid'
import loadingImg from '../images/loading.svg'
import reloadImg from '../images/reload.svg'
import spin from '../utilities/spinanim'

class UportVerification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qrData: null,
      waiting: false
    }
  }
  componentDidMount() {
    this.props.initCredentials()
  }
  componentDidUpdate(prevProps, prevState) {
    const { data, show } = this.props
    if(show && !prevProps.show) {
      this.sendVerification()
    } else if(data.url && data.url !== prevProps.data.url) {
      if(!data.isPush) {
        const pngBuffer = qrImage.imageSync(data.url, { type: 'png' })
        const qrData = 'data:image/png;charset=utf-8;base64, ' + pngBuffer.toString('base64')
        this.setState({ qrData })
      } else {
        this.handleClose()
      }
    }
  }
  sendVerification = () => {
    const { claim } = this.props
    const requestId = shortId.generate()
    this.setState({ qrData: null, requestId })
    this.props.sendVerification(requestId, this.props.profile, claim)
  }
  handleClose = () => {
    this.setState({ qrData: null })
    this.props.onClose()
  }
  render() {
    const { qrData } = this.state
    const { show, data } = this.props
    const { url } = data
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
              <Refresh onClick={this.sendVerification}>
                <img src={reloadImg} />
                Refresh
              </Refresh>
            </React.Fragment>
            : <LoadingIcon src={loadingImg} />}
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
    font-size: 1rem !important;
    margin: 15px 0;
    text-align: center;
  }
`
const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-rows: 50px 1fr 50px;
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
`;
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
`;
const LoadingIcon = styled.img`
  ${spin}
  height: 18px;
  margin-left: 10px;
  width: 18px;
`;

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  profile: getSavedProfile(state),
  data: getUPortVerification(state),
  messages: getUPortMessages(state)
})

const mapDispatchToProp = dispatch => ({
  initCredentials() {
    dispatch(actions.initCredentials())
  },
  sendVerification(id, profile, claim) {
    dispatch(actions.sendVerification(id, profile, claim))
  },
  verifyCredentials(token) {
    dispatch(actions.verifyCredentials(token))
  }
})

export default connect(mapStateToProps, mapDispatchToProp)(UportVerification)
