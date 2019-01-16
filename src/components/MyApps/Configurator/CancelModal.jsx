import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { medium } from '../../../layouts/grid'

class CancelModal extends React.Component {
  handleStay = () => {
    this.props.onClose()
  }
  render() {
    const { show } = this.props
    return (<Modal show={show}>
      <Backdrop />
      <Body>
        <h5>Are you sure you want to cancel without saving?</h5>
        <p>Changes you’ve made will not be saved.</p>
        <ButtonBar>
          <StayButton onClick={this.handleStay}>No, Take me Back</StayButton>
          <LeaveButton to='/'>Yes, Cancel</LeaveButton>
        </ButtonBar>
      </Body>
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
  background: rgba(255, 255, 255, 0.5);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 910;
`
const Body = styled.div`
  background: #fff;
  box-shadow: 0 0 10px rgba(139, 139, 139, 0.25);
  left: 50%;
  padding: 40px 20px;
  position: relative;
  text-align: center;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 60%;
  z-index: 920;

  h5 {
    color: #3f3d4b;
    font-size: 32px;
    line-height: 44px;
  }
  p {
    color: #8986A0;
    font-size: 18px;
    line-height: 24px;
  }
  ${medium('padding: 70px;')}
`
const ButtonBar = styled.div`
  margin-top: 50px;
`
const StayButton = styled.button`
  background: linear-gradient(49.62deg, #5c50ca 0%, #7958d8 100%);
  border-radius: 4px;
  color: #fff;
  display: block;
  margin: 20px 0;
  padding: 20px;
  text-transform: uppercase;
  width: 100%;
  ${medium(`
    display: inline-block;
    margin: 10px;
    width: 266px;
  `)}
`
const LeaveButton = styled(Link)`
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
  `)}
`

export default CancelModal
