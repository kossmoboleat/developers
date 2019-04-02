import React, { Component } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import registerResolver from 'https-did-resolver'
import resolve from 'did-resolver'
import CancelModal from '../CancelModal'
import { Container, Grid, Col, Spacer } from '../../../../layouts/grid'
import { default as track, trackPage } from '../../../../utilities/track'

class VerifyFailure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false
    }
  }
  componentDidMount() {
    trackPage('App Configurator Domain Verification', {
      step: 'VerifyDomainFailure'
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
                    <h2>Verify FAILURE</h2>
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

export default VerifyFailure
