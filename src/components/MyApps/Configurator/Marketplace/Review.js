import React, { Component } from 'react'
import styled from 'styled-components'
import CancelModal from '../CancelModal'
import Footer from '../Footer'
import { Container, Grid, Col, Spacer, medium } from '../../../../layouts/grid'

class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    this.props.getChildState('review', {complete: true})
  }
  render () {
    const { cancelModal } = this.state
    return (
      <Wrapper>
        <section className={`${cancelModal ? 'blurred' : ''}`}>
          <Container>
            <Grid>
              <Spacer span={1} />
              <Col span={10}>
                <header>
                  <Grid>
                    <Col span={8}>
                      <h2>Review</h2>
                    </Col>
                    <Col span={4}>
                      <button className='btn-cancel' onClick={this.showCancelModal}>Cancel</button>
                    </Col>
                  </Grid>
                </header>
                <div className='module'>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <label>Issuer Name</label>
                    </Col>
                  </Grid>
                </div>
              </Col>
            </Grid>
          </Container>
        </section>
        <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
        <Footer
          Prev={() => (<div>
          CLAIMS
            <p>
              Required (2)
              <span>&nbsp;|&nbsp;</span>
              Issued (3)
            </p>
          </div>)}
          Next={() => <span>Submit</span>}
          nextEnabled={true}
          onNext={this.handleSubmit} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  section {
    padding-bottom: 80px;
  }
  .module .disabled {
    background-color: #F8F8F8;
    border: none;
  }
`

export default Review
