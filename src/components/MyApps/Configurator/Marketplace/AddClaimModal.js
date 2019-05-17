import React from 'react'
import styled from 'styled-components'
import { medium, Grid, Col } from '../../../../layouts/grid'

class AddClaimModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newClaimType: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNewClaimTypeChange = this.handleNewClaimTypeChange.bind(this)
  }
  handleNewClaimTypeChange (e) {
    this.setState({newClaimType: e.target.value})
  }
  handleSubmit (e) {
    if (e && e.preventDefault) e.preventDefault()
    this.props.handleNewClaimType(this.state.newClaimType, this.props.claimField)
  }
  render () {
    const { show } = this.props
    const { newClaimType } = this.state
    return (<Modal show={show}>
      <Backdrop />
      <Body>
        <h5>Add other claim</h5>
        <p>If you don't see the type of claim that you're issuing in the list, add it below.</p>
        <label htmlFor='claimType'>Claim Type</label>
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Col span={6}>
              <input
                type='text'
                placeholder={``}
                id='serviceName'
                value={newClaimType}
                onChange={this.handleNewClaimTypeChange}
                ref={r => this.txtServiceName=r}
              />
            </Col>
          </Grid>
          <Explanation>
            <span>IMPORTANT</span>
            <hr />
            <p>Make sure the name of a claim you're adding is correct. It will make it easier for users to find it and use your services in the future.</p>
          </Explanation>
          <ButtonBar>
            <StayButton onClick={this.handleSubmit}>Add Claim</StayButton>
          </ButtonBar>
        </form>
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
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 70%;
  z-index: 920;

  h5 {
    color: #3f3d4b;
    font-size: 28px;
    line-height: 36px;
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
    margin: 0;
    width: 100%;
  `)}
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

export default AddClaimModal
